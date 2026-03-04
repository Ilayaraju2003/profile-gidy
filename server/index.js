const express = require("express");
const cors = require("cors");
require("dotenv").config();

const profileRoutes = require("./routes/profile");

const app = express();

app.use(cors());
app.use(express.json());

app.use("/api/profile", profileRoutes);

app.listen(5000, () => {
  console.log("Server running on https://profile-gidy.onrender.com/api/profile");
});