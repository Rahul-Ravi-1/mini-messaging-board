let nextMessageId = 1;

const messages = [
  {
    id: nextMessageId++,
    text: "Hi there!",
    user: "Amando",
  },
  {
    id: nextMessageId++,
    text: "Hello World!",
    user: "Charles",
  },
];

function getIndex(req, res) {
  res.render("index", { messages: messages });
}

function getForm(req, res) {
  res.render("form");
}

function getMessage(req, res) {
  const id = Number(req.params.id);
  
  if (!Number.isInteger(id) || id < 1) {
    return res.sendStatus(400);
  }
  const message = messages.find((m) => m.id === id);
  if (!message) {
    return res.sendStatus(404);
  }
  res.render("message", { message });
}

function postForm(req, res) {
  messages.push({
    id: nextMessageId++,
    text: req.body.text,
    user: req.body.user,
  });
  res.redirect(303, "/");
}

function deleteMessage(req, res){
  const id = Number(req.params.id);
  if(!Number.isInteger(id) || id < 1)
  {
    return res.sendStatus(400);
  }
  const index = messages.findIndex((m) => m.id === id);
  if (index === -1) {
    return res.sendStatus(404);
  }
  messages.splice(index, 1);
  res.redirect(303, "/");
}

module.exports = { getIndex, getForm, getMessage, postForm, deleteMessage };
