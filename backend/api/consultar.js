
const express = require("express");
const router = express.Router();
const pool = require("../db");
const { consultarLimiter } = require("../middleware/rateLimiters");

router.post("/consultar", consultarLimiter, async (req, res) => {
  const { numero } = req.body;

  if (!numero) {
    return res.status(400).json({
      error: "numero_requerido",
    });
  }

  try {
    const ordenQuery = `
      SELECT entradaid
      FROM equipos_en_taller
      WHERE entradaid = $1
      LIMIT 1
    `;

    const ordenResult = await pool.query(ordenQuery, [numero]);

    if (ordenResult.rows.length > 0) {
      return res.json({
        tipo: "orden",
        entradaid: ordenResult.rows[0].entradaid,
      });
    }

    return res.status(404).json({
      error: "no_encontrado",
    });
  } catch (error) {
    console.error("Error en /api/consultar:", error);

    return res.status(500).json({
      error: "error_interno",
    });
  }
});

module.exports = router;