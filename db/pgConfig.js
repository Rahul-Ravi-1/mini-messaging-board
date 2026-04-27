/** Shared options for pg Pool and one-off Client (e.g. populatedb). */
function getPgConfig() {
  const connectionString = process.env.DATABASE_URL;
  const config = { connectionString };

  const explicitSsl = process.env.DATABASE_SSL === "true";
  const urlSuggestsSsl =
    typeof connectionString === "string" &&
    (/sslmode=require/i.test(connectionString) ||
      /\.render\.com\b/i.test(connectionString) ||
      /\.neon\.tech\b/i.test(connectionString));

  if (explicitSsl || urlSuggestsSsl) {
    // Hosted DBs (Render, etc.) often need TLS without strict CA verify from dev machines.
    config.ssl = {
      rejectUnauthorized: process.env.PGSSL_REJECT_UNAUTHORIZED === "true",
    };
  }

  return config;
}

module.exports = { getPgConfig };
