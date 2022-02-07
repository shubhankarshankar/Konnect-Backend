const mongoose = require("mongoose");

const assignmentSchema = mongoose.Schema({
  studentIds: [{ type: mongoose.Schema.Types.ObjectId, ref: "User" }],
  classId: { type: mongoose.Schema.Types.ObjectId, ref: "Class" },
  assignmentName: { type: String, required: true },
  assignmentDescription: { type: String },
  dueDate: { type: Date, required: true },
  submissions: [
    { type: mongoose.Schema.Types.ObjectId, ref: "Submission", default: [] },
  ],
  questionUploadPath: { type: String },
});

module.exports = mongoose.model("Assignment", assignmentSchema);

// user {
//     role: stu,
//     assigments: [
//         {
//             assignment_question_id,
//             assignementAnswerURL,
//             marks
//         }
//     ],
// }

// reading and writting streams
