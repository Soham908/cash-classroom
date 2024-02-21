const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
const userRouter = require("./routes/userRoutes")
const dataRouter = require('./routes/fetchdataRoute')
require('dotenv').config(); // Load environment variables from a .env file

const app = express();

app.use(cors());
app.use(express.json());
app.use("/auth",userRouter)
app.use("/data", dataRouter)

const dbUri = process.env.MONGODB_URI ;
mongoose.connect(dbUri, { useNewUrlParser: true, useUnifiedTopology: true });
const db = mongoose.connection;

db.on('error', (error) => {
  console.error('MongoDB connection error:', error);
});

db.once('open', () => {
  console.log('Connected to MongoDB');
});


// Start the server
const port = process.env.PORT || 8000;
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
