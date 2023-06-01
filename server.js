const express = require("express");
const connectDB = require("./config/database");
const morgan = require("morgan");
const authRoutes = require("./routes/api/auth");
const profileRoutes = require("./routes/api/profile");
const userRoutes = require("./routes/api/users");
const appointmentRoutes = require("./routes/api/appointment");
const cors = require("cors");

const app = express();

app.use(cors());
app.use(morgan("dev"));
app.use(express.json({ extended: false }));
app.use(express.urlencoded({ extended: false }));

const PORT = process.env.PORT || 5005;

app.use("/api/auth", authRoutes);
app.use("/api/profile", profileRoutes);
app.use("/api/users", userRoutes);
app.use("/api/appointment", appointmentRoutes);

app.listen(PORT, () => {
  console.log(`api running on port ${PORT}`);
  connectDB();
});
