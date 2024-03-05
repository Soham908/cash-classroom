const Users = require("./../models/users");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const signToken = (id) => {
  return jwt.sign({ id }, process.env.JWT_SECRET, {
    expiresIn: "90d",
  });
};

exports.register = async (req, res) => {
  try {
    const { name, email, password } = req.body;
    const hashedPassword = await bcrypt.hash(password, 12);

    const existingUser = await Users.findOne({ email });
    if (existingUser) {
      return res.json({
        success: false,
        message: "User already exists",
      });
    }

    const createdUser = await Users.create({
      name,
      email,
      password: hashedPassword,
    });
    const token = signToken(createdUser._id);

    res.json({
      success: true,
      data: {
        token,
      },
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
      { $push: { enrolledCourses: { course: req.body.courseName } } },
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

// exports.completedLesson = async (req, res) => {
//   try {
//     // {
//     // $inc: { 'enrolledCourses.$.lessonsCompleted': 1 }, // Increment lessonsCompleted by 1
//     // $push: { lessons: lessonData },
//     const decrypt = jwt.verify(req.body.id, process.env.JWT_SECRET);
//     const user = await Users.findOneAndUpdate(
//       { _id: decrypt.id, "enrolledCourses.course": req.body.course },
//       {
//         $push: {
//           lessonsCompleted: {
//             lessonName: req.body.lessonName,
//             lessonId: req.body.lessonId,
//           },
//           $inc: { "enrolledCourses.$.lessonsCompleted": 1 },
//         },
//       },
//       { new: true }
//     );
//     const newUser = await Users.findById(decrypt.id);
//     // console.log(newUser);
//     console.log(req.body);
//     res.json({
//       success: true,
//       // userObject
//     });
//   } catch (error) {
//     console.log(error);
//   }
// };
exports.completedLesson = async (req, res) => {
  try {
    const decrypt = jwt.verify(req.body.id, process.env.JWT_SECRET);

    let courseName = req.body.course;
    const userId = decrypt.id;

    try {
      const user = await Users.findById(userId);

      if (!user) {
        console.log("User not found");
        return;
      }

      for (const course of user.enrolledCourses) {
        console.log(
          `Course: ${course.course}, Lessons Completed: ${course.lessonsCompleted}`
        );
        if (course.course === courseName) {
          const result = await Users.updateOne(
            {
              _id: userId,
              "enrolledCourses.course": courseName,
            },
            {
              $push: {
                lessonsCompleted: {
                  lessonName: req.body.lessonName,
                  lessonId: req.body.lessonId,
                },
              },
              $inc: { "enrolledCourses.$.lessonsCompleted": 1 },
            }
          );
        }
      }
    } catch (error) {
      console.error(error);
    }

    // const user = await Users.findOneAndUpdate(
    //   { _id: decrypt.id, "enrolledCourses.course": req.body.course },
    //   {
    //     $push: {
    //       lessonsCompleted: {
    //         lessonName: req.body.lessonName,
    //         lessonId: req.body.lessonId,
    //       },
    //     },
    //     $inc: { "enrolledCourses.$.lessonsCompleted": 1 },
    //   },
    //   { new: true }
    // );

    const newUser = await Users.findById(decrypt.id);

    console.log(req.body);
    res.json({
      success: true,
      // userObject
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, error: "Internal Server Error" });
  }
};
