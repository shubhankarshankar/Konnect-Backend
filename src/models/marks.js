const mongoose = require("mongoose");

const marksSchema = new mongoose.Schema({
  subject: { type: String, required: true },
  class: { type: mongoose.Schema.Types.ObjectId, ref: "Class" },
  student: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
  marks: { type: Number },
});

module.exports = mongoose.model("Marks", marksSchema);
