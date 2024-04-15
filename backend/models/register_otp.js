const mongoose = require("mongoose");

const registerOTPSchema = new mongoose.Schema({
	email: {
		type: String,
		trim: true,
	},
	otp: {
		type: Number,
		trim: true,
	},
});

const registerOTP = mongoose.model("Register-OTP", registerOTPSchema);

module.exports = registerOTP;
