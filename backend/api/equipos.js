
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

module.exports = router;