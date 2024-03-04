const mongoose = require("mongoose");

const GoalsSchema = new mongoose.Schema({
	name: {
		type: String,
		required: true,
	},
	target: {
		type: Number,
		required: true,
	},
	status: {
		type: Boolean,
		default: false,
	},
	currentAmount: {
		type: Number,
		required: true,
	},
	img: {
		type: String,
		default: null,
		// required: true,
	},
	userId: {
		type: mongoose.Schema.Types.ObjectId,
		required: true,
	},
});

module.exports = mongoose.model("Goals", GoalsSchema);
