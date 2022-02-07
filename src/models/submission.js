const mongoose = require("mongoose");

const submissionSchema = mongoose.Schema({
  classId: { type: mongoose.Schema.Types.ObjectId, ref: "Class" },
  studentId: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
  answerUploadPath: { type: String, required: true },
});

module.exports = mongoose.model("Submission", submissionSchema);
