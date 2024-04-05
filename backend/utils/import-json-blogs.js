const Blog = require("./../models/blog");
const fs = require("fs");
const mongoose = require("mongoose");
const path = "./../data/blogsData.json";

require("dotenv").config({
  path: "./../.env",
});

mongoose
  .connect(process.env.MONGODB_URI)
  .then(() => {
    console.log("Connected");
  })
  .catch((err) => {
    console.log(err);
  });

let jsonBlogsData = JSON.parse(fs.readFileSync(path));
console.log(jsonBlogsData)

const insertBlogs = async () => {
    const blogs = await Blog.create(jsonBlogsData);
    if (blogs) {
      console.log("Inserted");
      process.exit(0)
    } else {
        console.log("Not inserted");
        process.exit(1)
    }
  };

insertBlogs()