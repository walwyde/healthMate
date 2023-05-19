const express = require("express");
const connectDB = require("./config/database");
const morgan = require("morgan");
const authRoutes = require("./routes/api/auth");
const profileRoutes = require("./routes/api/profile");
const postsRoutes = require("./routes/api/posts");
const userRoutes = require("./routes/api/users");
const workerRoutes = require("./routes/api/workers");

const app = express();

app.use(function (req, res, next) {
  res.header("Access-Control-Allow-Origin", "http://localhost:5173");
  res.header(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, x-auth-token, Accept"
  );
  next();
});
app.use(morgan("dev"));
app.use(express.json({ extended: false }));
app.use(express.urlencoded({ extended: false }));

const PORT = process.env.PORT || 5005;

app.use("/api/auth", authRoutes);
app.use("/api/profile", profileRoutes);
app.use("/api/posts", postsRoutes);
app.use("/api/users", userRoutes);
app.use("/api/workers", workerRoutes);

app.listen(PORT, () => {
  console.log(`api running on port ${PORT}`);
  connectDB();
});
