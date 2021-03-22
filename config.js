const dotenv = require("dotenv");

dotenv.config();

module.exports = {
  PORT: process.env.PORT,
  pguser: process.env.PGUSER,
  pgpassword: process.env.PGPASSWORD,
  pgport: process.env.PGPORT,
};
