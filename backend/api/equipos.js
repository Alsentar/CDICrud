
const express = require("express");

const router = express.Router();

const pool = require("../db");

const { generateEntradaWord } = require("../services/wordGenerator");


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
          estado
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

router.post("/", async(req, res) => {

    //WIP
    const client = await pool.connect();

    try {
    //logica
    const {entrada, equipo, marca, modelo, serial, estado, nombre, empresa, rnc, phone, mail}  = req.body;

    await client.query("BEGIN");

    const queryone = `
    INSERT INTO equipos_en_taller(entradaid, equipo, marca, modelo, numeroserial, estado)
    VALUES ($1, $2, $3, $4, $5, $6)
    RETURNING entradaid
    `;
    const valuesqueryone = [entrada, equipo, marca, modelo, serial, estado];

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

router.get("/", async(req, res) => {

    try{
        //logica

        const query = `
        SELECT entradaid, equipo, marca, modelo, numeroserial, estado FROM equipos_en_taller`;
        
        const result = await pool.query(query);
        res.status(200).json(result.rows);
    }catch(error)
    {
        console.error(error);
        res.status(500).json({error: "server error"});
    }

});

router.put("/:id", async (req, res) => {

    try{
        //logica
        const { estado } = req.body;
        const { id } = req.params;

        const query = `
        update equipos_en_taller
        SET estado = $1
        WHERE entradaid = $2
        `;

        await pool.query(query, [estado, id]);

        res.status(200).json({ message: "estado actualizado" })

    }
    catch(error)
    {
        console.error(error);
        res.status(500).json({ error: "server error" });
    }
});

router.delete("/:id", async (req, res) => {

    try{

        console.log("Debug: llamada a delete");

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



router.get("/:id/documento", async (req, res) => {
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
      accesorios: row.accesorios || "N/A"
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


module.exports = router;