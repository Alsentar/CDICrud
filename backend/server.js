
const express = require("express");

const cors = require("cors");
require("dotenv").config();

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true}));
app.use(cors());

const endpoint = require("./api/equipos");

app.use("/api/equipos", endpoint);

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {

    console.log(`Servidor corriendo en puerto ${PORT}`);
})