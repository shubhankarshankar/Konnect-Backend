const express = require("express");
const cors = require("cors");
const authRoutes = require("./routes/auth");
const announcementRoutes = require("./routes/announcements");
const facultyRoutes = require("./routes/faculty");
const studentRoutes = require("./routes/student");

const app = express();

app.use(cors());
app.use(express.json());

//Routes
app.use("/api/auth", authRoutes);
app.use("/api/announcements", announcementRoutes);
app.use("/api/faculty", facultyRoutes);
app.use("/api/student", studentRoutes);

module.exports = app;
