const pg = require("pg");
const dns = require("dns");

dns.setDefaultResultOrder("ipv4first");

const Pool = pg.Pool;

require("dotenv").config();

const pool = new Pool({

    connectionString: process.env.DATABASE_URL,
    ssl: {rejectUnauthorized: false}

});

pool.on("connect", () =>{
    console.log("Conectado a Postgre");
});

module.exports = pool;

