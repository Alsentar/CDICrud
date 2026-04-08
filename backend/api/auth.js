
const express = require("express");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const pool = require("../db");


const router = express.Router();

router.post("/login", async (req, res) => {
  try {
    const { username, password } = req.body;

    if (!username || !password) {
      return res.status(400).json({
        error: "Usuario y contraseña son requeridos",
      });
    }

    const query = `
      SELECT id, username, password_hash, nombre, activo
      FROM empleados
      WHERE username = $1
      LIMIT 1
    `;

    const values = [username];

    const result = await pool.query(query, values);

    if (result.rows.length === 0) {
      return res.status(401).json({
        error: "Credenciales inválidas",
      });
    }

    const empleado = result.rows[0];

    if (!empleado.activo) {
      return res.status(403).json({
        error: "Credenciales Invalidas",
      });
    }

    const passwordValida = await bcrypt.compare(
      password,
      empleado.password_hash
    );

    if (!passwordValida) {
      return res.status(401).json({
        error: "Credenciales inválidas",
      });
    }

    const token = jwt.sign(
      {
        sub: empleado.id,
        username: empleado.username,
        nombre: empleado.nombre,
      },
      process.env.JWT_SECRET,
      { expiresIn: "8h" }
    );

    res.cookie("auth_token", token, {
      httpOnly: true,
      secure: false,
      sameSite: "lax",
      maxAge: 8 * 60 * 60 * 1000,
    });

    return res.json({
      ok: true,
      user: {
        id: empleado.id,
        username: empleado.username,
        nombre: empleado.nombre,
      },
    });
  } catch (error) {
    console.error("Error en login:", error);
    return res.status(500).json({
      error: "Error interno del servidor",
    });
  }
});

export default router;