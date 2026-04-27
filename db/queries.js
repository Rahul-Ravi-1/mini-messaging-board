const path = require("path");
const pool = require(path.join(__dirname, "pool"));

async function getAllMessages() {
  const { rows } = await pool.query(
    "SELECT * FROM messages ORDER BY added DESC"
  );
  return rows;
}

async function getMessageById(id) {
  const { rows } = await pool.query(
    "SELECT * FROM messages WHERE id = $1",
    [id]
  );
  return rows[0] ?? null;
}

async function insertMessage(username, text) {
  await pool.query(
    "INSERT INTO messages (username, text) VALUES ($1, $2)",
    [username, text]
  );
}

async function deleteMessageById(id) {
  const result = await pool.query("DELETE FROM messages WHERE id = $1", [id]);
  return result.rowCount > 0;
}

module.exports = {
  getAllMessages,
  getMessageById,
  insertMessage,
  deleteMessageById,
};