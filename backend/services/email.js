const nodemailer = require("nodemailer");
require("dotenv").config();

const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: process.env.GMAIL_USER,
    pass: process.env.GMAIL_APP_PASSWORD
  }
});

async function sendSurveyNotification(cotizaciones) {
  const mailOptions = {
    from: `"CDI Web App" <${process.env.GMAIL_USER}>`,
    to: [
      "f.alcantara2103@gmail.com",
      "miguelcordero126@gmail.com"
    ],
    subject: "Nueva solicitud de levantamiento topográfico",
    html: `
      <h2>Nueva solicitud recibida</h2>
      <p><strong>Cliente:</strong> ${cotizaciones.nombre_cliente}</p>
      <p><strong>Empresa:</strong> ${cotizaciones.empresa || "No especificada"}</p>
      <p><strong>Teléfono:</strong> ${cotizaciones.telefono}</p>
      <p><strong>Correo:</strong> ${cotizaciones.correo}</p>
      <h3>Detalles del levantamiento</h3>
      <p><strong>Área:</strong> ${cotizaciones.area_lev} m²</p>
      <p><strong>Distancia:</strong> ${cotizaciones.dist_off} km</p>
      <p><strong>Precio final:</strong> RD$ ${cotizaciones.costo_final}</p>
    `
  };

  try {
    await transporter.sendMail(mailOptions);
    console.log("Correo enviado exitosamente");
  } catch (err) {
    console.error("Error enviando correo:", err);
  }
}

module.exports = { sendSurveyNotification };
