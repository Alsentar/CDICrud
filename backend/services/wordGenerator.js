
const fs = require("fs");
const path = require("path");
const PizZip = require("pizzip");
const Docxtemplater = require("docxtemplater");


function generateEntradaWord(data) {
  try {
    
    const templatePath = path.join(
      __dirname,
      "../templates/entrada_taller.docx"
    );

    // Leer el archivo .docx
    const content = fs.readFileSync(templatePath, "binary");

    // Cargar el zip interno del docx
    const zip = new PizZip(content);

    // Inicializar docxtemplater
    const doc = new Docxtemplater(zip, {
      paragraphLoop: true,
      linebreaks: true
    });

    // Inyectar datos en la plantilla
    doc.setData({
      nombre_cliente: data.nombre_cliente,
      numero_orden: data.numero_orden,
      fecha_entrada: data.fecha_entrada,
      empresa: data.empresa,
      rnc: data.rnc,
      telefono: data.telefono,
      email: data.email,
      equipo: data.equipo,
      marca: data.marca,
      modelo: data.modelo,
      serial: data.serial,
      accesorios: data.accesorios || "N/A",
      diagnostico: data.diagnostico || "N/A"
    });

    // Renderizar el documento
    doc.render();

    // Generar el buffer final
    const buffer = doc
      .getZip()
      .generate({ type: "nodebuffer" });

    return buffer;

  } catch (error) {
    console.error("Error generando documento Word:", error);
    throw error;
  }
}

module.exports = {
  generateEntradaWord
};
