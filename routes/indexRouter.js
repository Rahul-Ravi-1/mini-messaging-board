const express = require("express");
const indexController = require("../controllers/indexController");

const indexRouter = express.Router();


indexRouter.get("/", indexController.getIndex);

indexRouter.get("/new", indexController.getForm);

indexRouter.get("/messages/:id", indexController.getMessage);

indexRouter.post("/new", indexController.postForm);

indexRouter.post("/messages/:id/delete", indexController.deleteMessage);

module.exports = indexRouter;
