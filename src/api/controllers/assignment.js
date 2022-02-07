const Submission = require("../../models/submission");
const Assignment = require("../../models/assignment");
const Classes = require("../../models/class");
const User = require("../../models/user");

// UPLOAD ASSIGNMENT QUESTION
module.exports.assignment_uploadQuestion = async (req, res) => {
  try {
    const classroom = await Classes.findById(req.params.classId);
    if (!classroom) return res.status(404).json({ message: "No Such Class" });

    const prevAssignment = await Assignment.findOne({
      classId: req.params.classId,
    });

    if (prevAssignment) {
      const updatedAssignment = await Assignment.findByIdAndUpdate(
        prevAssignment._id,
        {
          assignmentName: req.body.assignmentName,
          assignmentDescription: req.body.assignmentDescription,
          dueDate: req.body.dueDate,
          questionUploadPath: req.body.path,
        },
        { new: true }
      );

      return res.status(200).json({ assignment: updatedAssignment });
    }

    const students = classroom.students;

    const newAssignment = new Assignment({
      studentIds: students,
      classId: req.params.classId,
      assignmentName: req.body.assignmentName,
      assignmentDescription: req.body.assignmentDescription,
      dueDate: req.body.dueDate,
      questionUploadPath: req.body.path,
    });

    const addedAssignment = await newAssignment.save();

    students.forEach(async (student) => {
      await User.findByIdAndUpdate(
        student,
        {
          $push: { assignments: addedAssignment._id },
        },
        { upsert: true }
      );
    });

    return res.status(200).json({ assignment: addedAssignment });
  } catch (err) {
    console.log(err);
    return res.status(400).json(err);
  }
};

// GET ASSIGNMENTS FOR A PARTICULAR STUDENT
module.exports.assignment_getDetailedAssignmentsByStudentId = async (
  req,
  res
) => {
  User.findById(req.params.id)
    .populate({
      path: "assignments",
      populate: {
        path: "classId",
        model: "Class",
      },
    })
    .exec(function (err, data) {
      if (err) return res.status(400).json(err);
      return res.status(200).json(data);
    });
};

// GET ASSIGNMENT BY ID
module.exports.assignment_getDetailedAssignmentsById = async (req, res) => {
  Assignment.findById(req.params.id)
    .populate({
      path: "classId",
      model: "Class",
    })
    .exec(function (err, data) {
      if (err) return res.status(400).json(err);
      return res.status(200).json(data);
    });
};

// ACCEPT ASSIGNMENT SUBMISSION
module.exports.assignment_addSubmission = async (req, res) => {
  try {
    const prevSubmission = await Submission.findOne({
      classId: req.params.classId,
      studentId: req.params.stuId,
    });

    if (prevSubmission) {
      const updatedSubmission = await Submission.findByIdAndUpdate(
        prevSubmission._id,
        { answerUploadPath: req.body.path },
        { new: true }
      );

      return res.status(200).json({ submission: updatedSubmission });
    }

    const newSubmission = new Submission({
      studentId: req.params.stuId,
      classId: req.params.classId,
      answerUploadPath: req.body.path,
    });

    const addedSubmission = await newSubmission.save();

    return res.status(200).json({ submission: addedSubmission });
  } catch (err) {
    console.log(err);
    return res.status(400).json(err);
  }
};

// RETRIEVE ASSIGNMENT
module.exports.assignment_getSubmission = async (req, res) => {
  try {
    const submission = await Submission.findOne({
      classId: req.params.classId,
      studentId: req.params.stuId,
    });
    if (!submission) return res.status(400).json({ message: "No Submission" });
    return res.status(200).json(submission);
  } catch (err) {
    console.log(err);
    return res.status(400).json(err);
  }
};

// module.exports.assignment_uploadQuestion = async (req, res) => {
//   try {
//     const classroom = await Classes.findById(req.params.classId);
//     if (!classroom) return res.status(404).json({ message: "No Such Class" });

//     const students = classroom.students;

//     const newAssignment = new Assignment({
//       studentIds: students,
//       classId: req.params.classId,
//       assignmentName: req.body.assignmentName,
//       assignmentDescription: req.body.assignmentDescription,
//       dueDate: req.body.dueDate,
//       questionUploadPath: req.file.path,
//     });

//     const addedAssignment = await newAssignment.save();

//     students.forEach(async (student) => {
//       await User.findByIdAndUpdate(
//         student,
//         {
//           $push: { assignments: addedAssignment._id },
//         },
//         { upsert: true }
//       );
//     });

//     return res.status(200).json({ assignment: addedAssignment });
//   } catch (err) {
//     console.log(err);
//     return res.status(400).json(err);
//   }
// };
