/**
 * Single entry for the database layer. Loads env before pool/queries so
 * DATABASE_URL is set even if this module is required before app.js runs.
 */
require("dotenv").config();

module.exports = require("./queries");
