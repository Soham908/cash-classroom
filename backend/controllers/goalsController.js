const Goals = require("./../models/goals");

exports.createGoal = async (req, res) => {
	try {
		const goal = await Goals.create({
			name: req.body.name,
			target: req.body.target,
			img: req.body.img ? req.body.img : null,
			currentAmount: req.body.currentAmount ? req.body.currentAmount : 0,
			userId: req.body.userId,
		});

		if (!goal) {
			return res.json({
				success: false,
				message: "Server Error creating goals",
			});
		}

		res.json({
			success: true,
			message: "Goal created successfully",
			goal,
		});
	} catch (err) {
		console.log(err);
		res.json({
			success: false,
			err,
		});
	}
};

exports.getGoalsByUserId = async (req, res) => {
	try {
		const goals = await Goals.find({ userId: req.params.userId });
		res.json({
			success: true,
			goals,
		});
	} catch (err) {
		console.log(err);
		res.json({
			success: false,
			err,
		});
	}
};

exports.updateCurrentAmount = async (req, res) => {
	try {
		const updatedGoal = await Goals.findByIdAndUpdate(
			req.body.id,
			{ currentAmount: req.body.updatedAmount },
			{ new: true }
		);
		if (!updatedGoal) {
			return res.json({
				success: false,
				updatedGoal,
			});
		}

		res.json({
			success: true,
			updatedGoal,
			message: "Goal Updated Successfully",
		});
	} catch (err) {
		console.log(err);
		res.json({
			success: false,
			err,
		});
	}
};

exports.deleteGoalsById = async (req, res) => {
	try {
		await Goals.findByIdAndDelete(req.params.goalId);
		res.json({
			success: true,
		});
	} catch (err) {
		console.log(err);
		res.json({
			success: false,
			err,
		});
	}
};
