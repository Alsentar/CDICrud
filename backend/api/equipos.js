
const express = require("express");

const router = express.Router();

const pool = require("../db");

const { generateEntradaWord } = require("../services/wordGenerator");

const supabase = require("../config/supabase");

const { uploadLimiter } = require("../middleware/rateLimiters");

const multer = require("multer");
const path = require("path");

const ALLOWED_MIME_TYPES = [
  "application/pdf",
  "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
];

const ALLOWED_EXTENSIONS = [".pdf", ".docx", ".doc"];

const storage = multer.memoryStorage();

function sanitizeFilename(filename) {
  const ext = path.extname(filename).toLowerCase();
  const base = path.basename(filename, ext);

  const safeBase = base
    .normalize("NFKD")
    .replace(/[^\w\s.-]/g, "")
    .replace(/\s+/g, "_")
    .slice(0, 80);

  return `${safeBase || "archivo"}${ext}`;
}

const upload = multer({
  storage,
  limits: {
    fileSize: 10 * 1024 * 1024, // 10 MB
    files: 1,
  },
  fileFilter: (req, file, cb) => {
    const ext = path.extname(file.originalname).toLowerCase();
    const mimeOk = ALLOWED_MIME_TYPES.includes(file.mimetype);
    const extOk = ALLOWED_EXTENSIONS.includes(ext);

    if (!mimeOk || !extOk) {
      return cb(
        new multer.MulterError("LIMIT_UNEXPECTED_FILE", "Solo se permiten archivos PDF o DOCX")
      );
    }

    cb(null, true);
  },
});

const requireAuth = require("../middleware/requireAuth");


//para jalar un solo equipo por entrada
router.get("/:entradaid", async (req, res) => {

    //logica

    const { entradaid } = req.params;

    if(!entradaid)
    {
        return res.status(400).json({
            error: "entrada_requerida",
        });
    }

    try{

        const query = `
        SELECT
          entradaid,
          equipo,
          marca,
          modelo,
          numeroserial,
          estado,
          accesorios,
          diagnostico
        FROM equipos_en_taller
        WHERE entradaid = $1
        LIMIT 1
        `;

        const result = await pool.query(query, [entradaid]);

        if(result.rows.length === 0){
            return res.status(400).json({
                error: "no_encontrado",
            });
        }

        return res.json(result.rows[0]);


    }
    catch(error){

        console.error("Error en GET /api/equipos/:entradaid", error);

        return res.status(500).json({
            error: "error_interno",
        });

    }
});

//Para meter un equipo a la db
router.post("/", requireAuth, async(req, res) => {

    //WIP
    const client = await pool.connect();

    try {
    //logica
    const {entrada, equipo, marca, modelo, serial, accesorios, estado, nombre, empresa, rnc, phone, mail}  = req.body;

    await client.query("BEGIN");

    const queryone = `
    INSERT INTO equipos_en_taller(entradaid, equipo, marca, modelo, numeroserial, accesorios, estado)
    VALUES ($1, $2, $3, $4, $5, $6, $7)
    RETURNING entradaid
    `;
    const valuesqueryone = [entrada, equipo, marca, modelo, serial, accesorios, estado];

    const equipoResult = await client.query(queryone, valuesqueryone);

    const entradaId = equipoResult.rows[0].entradaid;

    const querytwo = `
    INSERT INTO clientes(nombre, empresa, rnc, telefono, correo)
    VALUES ($1, $2, $3, $4, $5)
    RETURNING id
    `;
    const valuesquerytwo = [nombre, empresa, rnc, phone, mail];

    const clienteResult = await client.query(querytwo, valuesquerytwo);

    const clienteId = clienteResult.rows[0].id;

    const querythree = `
    INSERT INTO entrada_cliente
    (entrada_id, cliente_id)
    VALUES ($1, $2)
    `;

    const querythreevalues = [entradaId, clienteId]

    await client.query(querythree, querythreevalues);

    await client.query("COMMIT");


    res.status(201).json({
        message: "registro creado",
        entradaId,
        clienteId

    });
    
    } catch(error){
        await client.query("ROLLBACK");
        console.error(error);
        res.status(500).json({error: "server error"});
    } finally {
        client.release();
    }

});

//Para jalar a todos los equipos
router.get("/", requireAuth, async(req, res) => {

    try{
        //logica

        const query = `
        SELECT entradaid, equipo, marca, modelo, numeroserial, estado 
        FROM equipos_en_taller
        ORDER BY entradaid DESC`;
        
        const result = await pool.query(query);
        res.status(200).json(result.rows);
    }catch(error)
    {
        console.error(error);
        res.status(500).json({error: "server error"});
    }

});

//Para cambiar estado y diagnostico en la db
router.put("/:id", requireAuth, async (req, res) => {

    try{
        //logica
        const { estado, diagnostico } = req.body;
        const { id } = req.params;

        const query = `
        update equipos_en_taller
        SET estado = $1, diagnostico = $2
        WHERE entradaid = $3
        `;

        await pool.query(query, [estado, diagnostico, id]);

        res.status(200).json({ message: "estado y diagnostico actualizado" })

    }
    catch(error)
    {
        console.error(error);
        res.status(500).json({ error: "server error" });
    }
});

//Para borrar un solo equipo de la db por entrada
router.delete("/:id", requireAuth, async (req, res) => {

    try{

        console.log("Debug: llamada a delete");
        console.log("DELETE recibido id:", req.params.id);

        const { id } = req.params;

        const query = `
        DELETE FROM equipos_en_taller
        WHERE entradaid = $1
        `;

        await pool.query(query, [id]);

        res.status(200).json({ message: "registro eliminado"});

    }
    catch(error)
    {
        console.error(error);
        res.status(500).json({ error: "server error" });
    }
});


//Para jalar la info de un equipo y generar el doc. de entrada
router.get("/:id/documento", requireAuth, async (req, res) => {
  try {
    const { id } = req.params;

    // Query con JOIN
    const query = `
      SELECT
        e.entradaid,
        e.equipo,
        e.marca,
        e.modelo,
        e.numeroserial,
        e.estado,
        e.accesorios,
        e.diagnostico,
        c.nombre AS nombre_cliente,
        c.empresa,
        c.rnc,
        c.telefono,
        c.correo,
        c.created_at
      FROM equipos_en_taller e
      JOIN entrada_cliente ec ON ec.entrada_id = e.entradaid
      JOIN clientes c ON c.id = ec.cliente_id
      WHERE e.entradaid = $1
    `;

    const result = await pool.query(query, [id]);

    if (result.rows.length === 0) {
      return res.status(404).json({ error: "Entrada no encontrada" });
    }

    const row = result.rows[0];

    // Formatear fecha
    const fechaEntrada = row.created_at
      ? new Date(row.created_at).toLocaleDateString("es-DO")
      : new Date().toLocaleDateString("es-DO");

    // Construir objeto para Word
    const wordData = {
      nombre_cliente: row.nombre_cliente,
      numero_orden: row.entradaid,
      fecha_entrada: fechaEntrada,
      empresa: row.empresa || "",
      rnc: row.rnc || "",
      telefono: row.telefono || "",
      email: row.correo || "",
      equipo: row.equipo,
      marca: row.marca,
      modelo: row.modelo,
      serial: row.numeroserial,
      accesorios: row.accesorios || "N/A",
      diagnostico: row.diagnostico || "N/A"
    };

    // Generar Word
    const buffer = generateEntradaWord(wordData);

    // Forzar descarga
    res.setHeader(
      "Content-Disposition",
      `attachment; filename=entrada_${row.entradaid}.docx`
    );
    res.setHeader(
      "Content-Type",
      "application/vnd.openxmlformats-officedocument.wordprocessingml.document"
    );

    res.send(buffer);

  } catch (error) {
    console.error("Error generando documento:", error);
    res.status(500).json({ error: "Error generando documento" });
  }
});




router.post("/:id/certificado",  requireAuth, 
  upload.single("certificado"),
  async (req, res) => {
    const entradaId = req.params.id;

    try {
      // Validaciones básicas
      if (!req.file) {
        return res.status(400).json({ error: "No se envió ningún archivo" });
      }

      const file = req.file;
      const filename = file.originalname;
      const filePath = `entradas/${entradaId}/${Date.now()}_${filename}`;

      // Subir archivo a Supabase Storage
      const { error: uploadError } = await supabase.storage
        .from("certificados-calibracion")
        .upload(filePath, file.buffer, {
          contentType: file.mimetype,
          upsert: false
        });

      if (uploadError) {
        throw uploadError;
      }

      // Guardar metadata en la DB
      const query = `
        INSERT INTO certificados_calibracion
        (entrada_id, filename, storage_path, uploaded_by)
        VALUES ($1, $2, $3, $4)
      `;

      await pool.query(query, [
        entradaId,
        filename,
        filePath,
        req.user.username 
      ]);

      res.status(201).json({
        message: "Certificado subido correctamente"
      });

    } catch (error) {
      console.error("Error subiendo certificado:", error);
      res.status(500).json({ error: "Error al subir el certificado" });
    }
  }
);

router.get("/:id/certificado", async (req, res) => {

  const entradaId = req.params.id;

  try {
    //logica
    //buscar cert asociado a la entrada
    const query = `
    SELECT filename, storage_path
    FROM certificados_calibracion
    WHERE entrada_id = $1
    ORDER BY created_at DESC
    LIMIT 1
    `;

    const result = await pool.query(query, [entradaId]);

    if(result.rows.length === 0)
    {
      return res.status(404).json({
        error: "No existe certificado para esta entrada"
      });
    }

    const { filename, storage_path } = result.rows[0];

    //generar url de descarga

    const { data, error } = await supabase.storage.from("certificados-calibracion").createSignedUrl(storage_path, 300);

    if(error) {
      throw error;
    }

    res.setHeader(
      "Content-Disposition",
      `attachment: filename="${filename}"`
    );

    return res.redirect(data.signedUrl);

  }
  catch (error)
  {
    //logica de error
    console.error("Error descargando certificado: ", error);
    res.status(500).json({
      error: "Error al descargar el certificado"
    });
  }

});


router.use((err, req, res, next) => {
  if (err instanceof multer.MulterError) {
    if (err.code === "LIMIT_FILE_SIZE") {
      return res.status(400).json({
        error: "El archivo excede el tamaño máximo permitido (10 MB)",
      });
    }

    if (err.code === "LIMIT_UNEXPECTED_FILE") {
      return res.status(400).json({
        error: "Archivo no permitido. Solo se aceptan PDF o DOCX",
      });
    }

    return res.status(400).json({
      error: "Error al procesar el archivo",
    });
  }

  return next(err);
});



module.exports = router;