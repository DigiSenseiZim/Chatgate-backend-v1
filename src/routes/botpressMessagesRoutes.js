const express = require("express");
const router = express.Router();
const botpressMessagesController = require("../controllers/botpressMessagesController");

router.post("/", botpressMessagesController.sendMessage);

module.exports = router;
