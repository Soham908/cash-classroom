const Users = require("./../models/users");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const RegisterOTP = require("./../models/register_otp");
const { sendMail } = require("./../utils/gmail");

const signToken = (id) => {
	return jwt.sign({ id }, process.env.JWT_SECRET, {
		expiresIn: "90d",
	});
};

function generateRandomNumber() {
	// Generate a random number between 1000 and 9999 (inclusive)
	const randomNumber = Math.floor(Math.random() * 9000) + 1000;

	return randomNumber.toString(); // Convert number to string
}

exports.registerOTP = async (req, res) => {
	try {
		const otp = generateRandomNumber();
		const user = await Users.findOne({ email: req.body.email });
		if (user) {
			return res.json({
				success: false,
				message: "User already exists",
			});
		} else {
			let register_user;
			register_user = await RegisterOTP.findOne({ email: req.body.email });
			if (register_user) {
				register_user = await RegisterOTP.findByIdAndUpdate(
					register_user._id,
					{ otp: otp },
					{ new: true }
				);
			} else {
				register_user = await RegisterOTP.create({
					email: req.body.email,
					otp: otp,
				});
			}

			const response = await sendMail(req.body.email, otp);
			console.log(response);
			if (response.success) {
				return res.json({
					success: true,
					message: "OTP has been sent to the mail " + req.body.email,
				});
			} else {
				return res.json({
					success: false,
					message: "Server down",
				});
			}
		}
	} catch (err) {
		console.log(err);
		res.json({
			success: false,
			err: err,
		});
	}
};

exports.register = async (req, res) => {
	try {
		const register_user = await RegisterOTP.findOne({ email: req.body.email });
		if (register_user.otp != req.body.otp * 1) {
			return res.json({
				success: false,
				message: "Wrong OTP",
			});
		}
		const { name, email, password } = req.body;
		const hashedPassword = await bcrypt.hash(password, 12);

		// const existingUser = await Users.findOne({ email });
		// if (existingUser) {
		// 	return res.json({
		// 		success: false,
		// 		message: "User already exists",
		// 	});
		// }

		const createdUser = await Users.create({
			name,
			email,
			password: hashedPassword,
		});
		const token = signToken(createdUser._id);
		const userObject = createdUser.toObject();
		delete userObject.password;
		res.json({
			success: true,
			userObject,
		});
	} catch (err) {
		console.log(err);
		res.json({
			success: false,
			message: err,
		});
	}
};

exports.login = async (req, res) => {
	try {
		const { email, password } = req.body;
		const user = await Users.findOne({ email });

		if (!user) {
			return res.json({
				success: false,
				message: "User doesn't exist",
			});
		}

		if (!(await bcrypt.compare(password, user.password))) {
			return res.json({
				success: false,
				message: "Wrong password",
			});
		}

		const token = signToken(user._id);
		const userObject = user.toObject();
		delete userObject.password;
		res.json({
			success: true,
			token,
			userObject,
		});
	} catch (err) {
		console.log(err);
		res.json({
			success: false,
			err,
		});
	}
};

exports.enrollCourse = async (req, res) => {
	try {
		const decrypt = jwt.verify(req.body.id, process.env.JWT_SECRET);
		console.log(decrypt);
		const user = await Users.findByIdAndUpdate(
			decrypt.id,
			{
				$push: {
					enrolledCourses: {
						course: req.body.courseName,
						totalLessons: req.body.totalLessons,
					},
				},
			},
			{ new: true }
		);
		const userObject = user.toObject();
		delete userObject.password;
		res.json({
			success: true,
			userObject,
		});
	} catch (error) {
		console.log(error);
	}
};

exports.unEnrollCourse = async (req, res) => {
	try {
		const decrypt = jwt.verify(req.body.id, process.env.JWT_SECRET);
		const user = await Users.findByIdAndUpdate(
			decrypt.id,
			{ $pull: { enrolledCourses: { course: req.body.courseName } } },
			{ new: true }
		);
		const userObject = user.toObject();
		delete userObject.password;
		res.json({
			sucess: true,
			userObject,
		});
	} catch (error) {
		console.log(error);
	}
};

exports.completedLesson = async (req, res) => {
	try {
		const decrypt = jwt.verify(req.body.id, process.env.JWT_SECRET);

		const user = await Users.findOneAndUpdate(
			{
				_id: decrypt.id,
				"enrolledCourses.course": req.body.course,
			},
			{
				$push: {
					lessonsCompleted: {
						lessonName: req.body.lessonName,
						courseName: req.body.course,
						lessonId: req.body.lessonId,
						quizMarks: req.body.quizMarks,
						totalQuestions: req.body.totalQuestions,
					},
				},
				$inc: { "enrolledCourses.$.lessonsCompleted": 1 },
			},
			{ new: true }
		);
		const userObject = user.toObject();
		delete userObject.password;

		res.json({
			success: true,
			userObject,
		});
	} catch (error) {
		console.log(error);
	}
};

exports.updateUserCourseMilestones = async (req, res) => {
	try {
		const decrypt = jwt.verify(req.body.id, process.env.JWT_SECRET);
		console.log(req.body);
		console.log(req.body.milestone * 1 === 50);
		let update = {
			"enrolledCourses.$.is100MilestoneShown": true,
		};
		if (req.body.milestone * 1 === 50) {
			update = {
				"enrolledCourses.$.is50MilestoneShown": true,
			};
		}
		const user = await Users.findOneAndUpdate(
			{
				_id: decrypt.id,
				"enrolledCourses.course": req.body.course,
			},
			update,
			{ new: true }
		);
		const userObject = user.toObject();
		delete userObject.password;

		res.json({
			success: true,
			userObject,
		});
	} catch (error) {
		console.log(error);
		res.json({
			success: false,
			error,
		});
	}
};
