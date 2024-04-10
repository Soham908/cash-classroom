const express = require("express");
const {
	createGoal,
	getGoalsByUserId,
	updateCurrentAmount,
	deleteGoalsById,
} = require("../controllers/goalsController");

const router = express.Router();

router.post("/create-goal", createGoal);
router.get("/get-goals-by-user/:userId", getGoalsByUserId);
router.patch("/update-goal", updateCurrentAmount);
router.delete("/delete-goal/:goalId", deleteGoalsById);

module.exports = router;
