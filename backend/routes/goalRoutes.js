const express = require("express");
const {
	createGoal,
	getGoalsByUserId,
	updateCurrentAmount,
} = require("../controllers/goalsController");

const router = express.Router();

router.post("/create-goal", createGoal);
router.get("/get-goals-by-user/:userId", getGoalsByUserId);
router.patch("/update-goal", updateCurrentAmount);

module.exports = router;
