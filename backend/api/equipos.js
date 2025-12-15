
const express = require("express");

const router = express.Router();

const pool = require("../db");



router.post("/", async(req, res) => {

    //WIP

    

    try {
    //logica
    const {entrada, equipo, marca, modelo, serial, estado}  = req.body;

    const query = `
    INSERT INTO equipos_en_taller(entradaid, equipo, marca, modelo, numeroserial, estado)
    VALUES ($1, $2, $3, $4, $5, $6)`;
    const values = [entrada, equipo, marca, modelo, serial, estado];

    await pool.query(query, values);

    res.status(201).json({
        message: "registro creado"

    });
    //logica
} catch(error){
    console.error(error);
    res.status(500).json({error: "server error"});
}

});

module.exports = router;