
const express = require("express");

const router = express.Router();

const pool = require("../db");



router.post("/consultar", async(req, res) => {

    //logica
    const { numero } = req.body;

    if (!numero) {
        return res.status(400).json({
            error: "numero_requerido",
        });
    }

    try {
        //logica
        if (numero === "21032001") {
            return res.json({
                tipo: "empleado",
                empleadoId: numero,
            });
        }
        
        
        const ordenQuery = `
        SELECT entradaid
        FROM equipos_en_taller
        WHERE entradaid = $1
        LIMIT 1
        `;

        const ordenResult = await pool.query(ordenQuery, [numero]);

        if(ordenResult.rows.length > 0)
        {
            return res.json({
                tipo: "orden",
                entradaid: ordenResult.rows[0].entradaid,
            });
        }

        return res.status(404).json({
            error: "no_encontrado",
        });


    }
    catch(error)
    {
        //logica de error
        console.error("Error en /api/consultar:", error);

        return res.status(500).json({
            error: "error_interno",
        });
    }


});



module.exports = router;