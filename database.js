require("dotenv").config();

const pgp = require("pg-promise")();
const { pguser, pgpassword, pgport } = require("./config");
const { Pool } = require("pg");
const isProduction = process.env.NODE_ENV === "production";

const connectionString = `postgres://${pguser}:${pgpassword}@localhost:${pgport}/todoApp`;

const db = pgp(connectionString);

const pool = new Pool({
  connectionString: isProduction ? process.env.DATABASE_URL : connectionString,
  ssl: isProduction,
});

module.exports = { pool, db };
