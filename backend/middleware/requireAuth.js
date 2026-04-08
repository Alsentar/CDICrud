
const jwt = require("jsonwebtoken");

function requireAuth(req, res, next) {
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

    req.user = {
      id: payload.sub,
      username: payload.username,
      nombre: payload.nombre,
    };

    next();
  } catch (error) {
    return res.status(401).json({
      error: "Sesión inválida o expirada",
    });
  }
}

module.exports = requireAuth;