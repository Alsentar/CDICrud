
const express = require("express");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const pool = require("../db");
const { loginLimiter } = require("../middleware/rateLimiters");

const router = express.Router();

router.post("/login", loginLimiter, async (req, res) => {
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

    const result = await pool.query(query, [username]);

    if (result.rows.length === 0) {
      return res.status(401).json({
        error: "Credenciales inválidas",
      });
    }

    const empleado = result.rows[0];

    if (!empleado.activo) {
      return res.status(403).json({
        error: "Credenciales inválidas",
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
      secure: process.env.NODE_ENV === "production",
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

router.get("/me", (req, res) => {
  try {
    if (!process.env.JWT_SECRET) {
      throw new Error("JWT_SECRET no está definido");
    }

    const token = req.cookies.auth_token;

    if (!token) {
      return res.status(401).json({
        error: "No autenticado",
      });
    }

    const payload = jwt.verify(token, process.env.JWT_SECRET);

    return res.json({
      authenticated: true,
      user: {
        id: payload.sub,
        username: payload.username,
        nombre: payload.nombre,
      },
    });
  } catch (error) {
    return res.status(401).json({
      error: "Sesión inválida o expirada",
    });
  }
});

router.post("/logout", (req, res) => {
  res.clearCookie("auth_token", {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "lax",
  });

  return res.json({ ok: true });
});

module.exports = router;