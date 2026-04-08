const cookieParser = require("cookie-parser");

const path = require("path");

const cors = require("cors");
require("dotenv").config();

const express = require("express");

const app = express();

//Middleware del servidor
app.use(express.json());
app.use(express.urlencoded({ extended: true}));
app.use(cors({
  origin: "http://localhost:5173",
  credentials: true,
}));
app.use(cookieParser());


//Frontend estatico
app.use(express.static(path.join(__dirname, "../frontend-react/dist")));

app.get("/", (req, res) => {
    res.sendFile(path.join(__dirname, "../frontend-react/dist/index.html"));
});


//rutas de la API
const endpoint = require("./api/equipos");

app.use("/api/equipos", endpoint);

const consultasRouter = require("./api/consultar");

app.use(express.json());
app.use("/api", consultasRouter);

const enviarcot = require("./api/cotizar")
app.use("/api/cotizar", enviarcot);

const authRouter = require("./api/auth");
app.use("/api/auth", authRouter);


//Servidor
const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {

    console.log(`Servidor corriendo en puerto ${PORT}`);
})