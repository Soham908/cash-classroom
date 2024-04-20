const express = require("express");
const multer = require("multer");
const path = require("path");
const {
	register,
	login,
	registerOTP,
	enrollCourse,
	completedLesson,
	unEnrollCourse,
	updateUserCourseMilestones,
	updateUserProfile,
} = require("./../controllers/userController");

const storage = multer.diskStorage({
	destination: function (req, file, cb) {
		cb(null, "images/");
	},
	filename: function (req, file, cb) {
		cb(
			null,
			file.fieldname + "-" + Date.now() + path.extname(file.originalname)
		);
	},
});

const upload = multer({ storage: storage });

const router = express.Router();

router.post("/register", register);
router.post("/register-otp", registerOTP);
router.post("/login", login);
router.patch("/enroll-course", enrollCourse);
router.patch("/unenroll-course", unEnrollCourse);
router.patch("/lesson-completed", completedLesson);
router.patch("/update-milestone", updateUserCourseMilestones);
router.post("/update-profile", upload.single("image"), updateUserProfile);
module.exports = router;
