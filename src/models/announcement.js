const mongoose = require("mongoose");

const announcementSchema = new mongoose.Schema({
  title: {
    type: String,
    required: [true, "Title is required"],
    trim: true,
  },
  body: {
    type: String,
    default: "This announcement doesn't have a body.",
  },
});

module.exports = mongoose.model("announcement", announcementSchema);
