const express = require("express");
const router = express.Router();
const { getResponse } = require("./../controllers/chatController");

router.post("/get-response", getResponse);

module.exports = router;
