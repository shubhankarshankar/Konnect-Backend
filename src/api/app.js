const express = require("express");
const cors = require("cors");
const authRoutes = require("./routes/auth");
const announcementRoutes = require("./routes/announcements");
const facultyRoutes = require("./routes/faculty");
const studentRoutes = require("./routes/student");
const userRoutes = require("./routes/user");
const classRoutes = require("./routes/class");
const marksRoutes = require("./routes/marks");
const assignmentRoutes = require("./routes/assignment");

const app = express();

app.use(cors());
app.use(express.json());
app.use("/uploads", express.static("uploads"));

//Routes
app.use("/api/auth", authRoutes);
app.use("/api/announcements", announcementRoutes);
app.use("/api/faculty", facultyRoutes);
app.use("/api/student", studentRoutes);
app.use("/api/user", userRoutes);
app.use("/api/class", classRoutes);
app.use("/api/marks", marksRoutes);
app.use("/api/assignment", assignmentRoutes);

module.exports = app;
