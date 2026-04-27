const path = require("path");
const queries = require(path.join(__dirname, "..", "db"));

function rowToMessage(row) {
  return {
    id: row.id,
    user: row.username,
    text: row.text,
    createdAt: row.added,
  };
}

async function getIndex(req, res, next) {
  try {
    const rows = await queries.getAllMessages();
    res.render("index", { messages: rows.map(rowToMessage) });
  } catch (err) {
    next(err);
  }
}

function getForm(req, res) {
  res.render("form");
}

async function getMessage(req, res, next) {
  const id = Number(req.params.id);

  if (!Number.isInteger(id) || id < 1) {
    return res.sendStatus(400);
  }

  try {
    const row = await queries.getMessageById(id);
    if (!row) {
      return res.sendStatus(404);
    }
    res.render("message", { message: rowToMessage(row) });
  } catch (err) {
    next(err);
  }
}

async function postForm(req, res, next) {
  try {
    await queries.insertMessage(req.body.user, req.body.text);
    res.redirect(303, "/");
  } catch (err) {
    next(err);
  }
}

async function deleteMessage(req, res, next) {
  const id = Number(req.params.id);
  if (!Number.isInteger(id) || id < 1) {
    return res.sendStatus(400);
  }

  try {
    const deleted = await queries.deleteMessageById(id);
    if (!deleted) {
      return res.sendStatus(404);
    }
    res.redirect(303, "/");
  } catch (err) {
    next(err);
  }
}

module.exports = { getIndex, getForm, getMessage, postForm, deleteMessage };