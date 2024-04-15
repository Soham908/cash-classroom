const nodemailer = require("nodemailer");
require("dotenv").config({
	path: "./../.env",
});

exports.sendMail = async (to, otp) => {
	const transporter = nodemailer.createTransport({
		service: "Gmail",
		host: "smtp.gmail.com",
		port: 465,
		secure: true,
		auth: {
			user: process.env.GMAIL,
			pass: process.env.APP_PASS,
		},
	});

	const mailOptions = {
		from: process.env.GMAIL,
		to: to,
		subject: "Registration of email",
		text: `OTP : ${otp}`,
	};

	const response = transporter
		.sendMail(mailOptions)
		.then((info) => {
			return { success: true, response: info.response };
		})
		.catch((err) => {
			return { success: false, err };
		});

	return response;
};
