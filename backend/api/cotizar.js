
const express = require("express");

const router = express.Router();

const pool = require("../db");

const { sendSurveyNotification } = require("../services/email");

router.post("/register", async (req, res) => {

    try {
        const { nombre_cliente, empresa, telefono, correo, area_lev, dist_off, costo_final } = req.body;

        //nombre_cliente,empresa,telefono,correo,area_lev,dist_off,costo_final

        const result = await pool.query(
            `INSERT INTO cotizaciones (nombre_cliente, empresa, telefono, correo, area_lev, dist_off, costo_final)
             VALUES ($1, $2, $3, $4, $5, $6, $7) RETURNING *`,
            [nombre_cliente, empresa, telefono, correo, area_lev, dist_off, costo_final]
        );

        const cotiz = result.rows[0];

        try {
            await sendSurveyNotification(cotiz);
        } catch (mailErr)
        {
            console.error("Error enviando correo: ", mailErr);
        }

        res.status(201).json({
            success: true,
            cotiz
        });

    } catch (err) {
        console.error(err);
        res.status(500).json({ success: false, error: "Database error" });
    }
});

module.exports = router;
