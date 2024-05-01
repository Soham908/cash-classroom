const express = require("express");
const cors = require("cors");
const path = require("path");
const morgan = require("morgan");
const mongoose = require("mongoose");
const userRouter = require("./routes/userRoutes");
const dataRouter = require("./routes/fetchdataRoute");
const courseRouter = require("./routes/courseRoutes");
const lessonRouter = require("./routes/lessonRoute");
const goalsRouter = require("./routes/goalRoutes");
const blogsRouter = require("./routes/blogRoutes");
const chatRouter = require("./routes/chatRoutes");

require("dotenv").config(); // Load environment variables from a .env file

const app = express();

app.use(cors());
app.use(morgan("dev"));
app.use(express.json());
app.use("/auth", userRouter);
app.use("/data", dataRouter);
app.use("/course", courseRouter);
app.use("/lesson", lessonRouter);
app.use("/goals", goalsRouter);
app.use("/blogs", blogsRouter);
app.use("/chat", chatRouter);

const imagesPath = path.join(__dirname, "images");
app.use("/images", express.static(imagesPath));

const dbUri = process.env.MONGODB_URI;
mongoose
	.connect(dbUri, { useNewUrlParser: true, useUnifiedTopology: true })
	.then(() => console.log("connected"))
	.catch((err) => console.log(err));
// const db = mongoose.connection;

// db.on("error", (error) => {
// 	console.error("MongoDB connection error:", error);
// });

// db.once("open", () => {
// 	console.log("Connected to MongoDB");
// });

// Start the server
const port = process.env.PORT || 8000;
app.listen(port, () => {
	console.log(`Server is running on port ${port}`);
});

module.exports = app;
