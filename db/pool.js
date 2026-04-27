const { Pool } = require("pg");
const { getPgConfig } = require("./pgConfig");

module.exports = new Pool(getPgConfig());