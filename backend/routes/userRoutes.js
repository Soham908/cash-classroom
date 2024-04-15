const express = require("express");
const {
	register,
	login,
	registerOTP,
	enrollCourse,
	completedLesson,
	unEnrollCourse,
	updateUserCourseMilestones,
} = require("./../controllers/userController");

const router = express.Router();

router.post("/register", register);
router.post("/register-otp", registerOTP);
router.post("/login", login);
router.patch("/enroll-course", enrollCourse);
router.patch("/unenroll-course", unEnrollCourse);
router.patch("/lesson-completed", completedLesson);
router.patch("/update-milestone", updateUserCourseMilestones);
module.exports = router;
