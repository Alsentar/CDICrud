
const express = require("express");

const router = express.Router();

const pool = require("../db");

const { sendSurveyNotification } = require("../services/email");

const multer = require("multer");

const path = require("path");

const fs = require("fs");

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, "uploads/");
    },
    filename: function (req, file, cb) {
        const uniqueName = Date.now() + path.extname(file.originalname);
        cb(null, uniqueName);
    },
});

const upload = multer({ storage: storage});

router.post("/register", upload.single("kmz"), async (req, res) => {

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
            await sendSurveyNotification(cotiz, req.file);
        } catch (mailErr)
        {
            console.error("Error enviando correo: ", mailErr);
        }

        if (req.file) {
          fs.unlink(req.file.path, (err) => {
            if (err) console.error("Error deleting file:", err);
          });
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
