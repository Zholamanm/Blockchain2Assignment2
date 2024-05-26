const mongoose = require('mongoose');
const express = require('express');
const cors = require('cors');
const cookieParser = require('cookie-parser');

const authRoutes = require("./routes/authRoutes");
const userRoutes = require("./routes/userRoutes");
const postRoutes = require("./routes/postRoutes");

const app = express();

const PORT = process.env.PORT || 8080;
const DB_URL = "mongodb+srv://zholaman223:SeqevtFE4u9dotdv@cluster0.rgbcvam.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0";

app.use(cors({
  credentials: true
}));
app.use(express.json());
app.use(cookieParser());

const BASE_URL = "/api/v1";

app.use(`${BASE_URL}/auth`, authRoutes);
app.use(`${BASE_URL}/user`, userRoutes);
app.use(`${BASE_URL}/post`, postRoutes);

const start = async () => {
  try {
    // Connect to MongoDB
    await mongoose.connect(DB_URL);

    // Start the server
    app.listen(PORT, () => {
      console.log(`Server started on port ${PORT}`);
    });
  } catch (error) {
    console.error("Error starting the server:", error);
  }
};


start();