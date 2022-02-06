const mongoose = require("mongoose");

const assignmentSchema = mongoose.Schema({
  classId: { type: mongoose.Schema.Types.ObjectId, ref: "Class" },
  assignmentName: { type: String, required: true },
  assignmentDescription: { type: String, required: true },
  dueDate: { type: Date, required: true },
  submissions: [{ type: mongoose.Schema.Types.ObjectId, ref: "Submission" }],
  //   marks: [{ nameStudent: String, marks: number }],
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
