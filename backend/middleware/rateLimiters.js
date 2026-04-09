
const rateLimit = require("express-rate-limit");

const standardMessage = (message) => ({
  error: message,
});

const loginLimiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 min
  limit: 5,
  standardHeaders: true,
  legacyHeaders: false,
  message: standardMessage("Demasiados intentos de inicio de sesión. Intenta más tarde."),
});

const consultarLimiter = rateLimit({
  windowMs: 10 * 60 * 1000, // 10 min
  limit: 20,
  standardHeaders: true,
  legacyHeaders: false,
  message: standardMessage("Demasiadas consultas en poco tiempo. Intenta más tarde."),
});

const cotizarLimiter = rateLimit({
  windowMs: 10 * 60 * 1000,
  limit: 10,
  standardHeaders: true,
  legacyHeaders: false,
  message: standardMessage("Demasiadas cotizaciones enviadas. Intenta más tarde."),
});

const uploadLimiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  limit: 10,
  standardHeaders: true,
  legacyHeaders: false,
  message: standardMessage("Demasiadas subidas de archivo. Intenta más tarde."),
});

module.exports = {
  loginLimiter,
  consultarLimiter,
  cotizarLimiter,
  uploadLimiter,
};