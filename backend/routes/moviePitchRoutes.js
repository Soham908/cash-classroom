const express = require("express");
const {
	createBotReply,
} = require("../controllers/moviePitchController(another_proj)");

const router = express.Router();

router.post("/create-bot-outline", createBotReply);

module.exports = router;
