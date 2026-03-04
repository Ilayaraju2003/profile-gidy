const express = require("express");
const cors = require("cors");
const dotenv = require("dotenv");
const profileRoutes = require("./routes/profile");

dotenv.config();

const app = express();

app.use(cors());
app.use(express.json());

app.use("/api/profile", profileRoutes);

app.listen(5000, () => {
  console.log("Server running on http://localhost:5000");
});