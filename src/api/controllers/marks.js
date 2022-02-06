const Marks = require("../../models/marks");
const User = require("../../models/user");
const Classes = require("../../models/class");

module.exports.marks_add = async (req, res) => {
  try {
    const student = await User.findById(req.params.stuId);
    const classroom = await Classes.findById(req.params.classId);
    if (!classroom || !student)
      return res.status(404).json({ message: "No Such Class or Student." });

    const className = classroom.subject;

    const prevMarks = await Marks.findOne({
      student: req.params.stuId,
      class: req.params.classId,
    });

    if (prevMarks) {
      const updatedMarks = await Marks.findByIdAndUpdate(
        prevMarks._id,
        { marks: req.body.marks },
        { new: true }
      );

      return res.status(200).json({ marks: updatedMarks });
    }

    const newMarks = new Marks({
      subject: className,
      class: req.params.classId,
      student: req.params.stuId,
      marks: req.body.marks,
    });

    const addedMarks = await newMarks.save();
    const updatedStudent = await User.findByIdAndUpdate(
      req.params.stuId,
      {
        $push: { marks: addedMarks._id },
      },
      { upsert: true, new: true }
    );

    return res.status(200).json({ marks: addedMarks });
  } catch (err) {
    return res.status(400).json(err);
  }
};

module.exports.marks_getDetailedMarksByStudentId = async (req, res) => {
  User.findById(req.params.id)
    .populate({
      path: "marks",
      populate: {
        path: "class",
        model: "Class",
      },
    })
    .exec(function (err, data) {
      if (err) return res.status(400).json(err);
      return res.status(200).json(data);
    });
};

// GET MARKS FOR A PARTICULAR STUDENT IN PARTICULAR CLASS
module.exports.marks_getMarksByStudentIdAndClassId = async (req, res) => {
  try {
    const marks = await Marks.findOne({
      student: req.params.stuId,
      class: req.params.classId,
    });
    return res.status(200).json(marks);
  } catch (err) {
    return res.status(400).json(err);
  }
};
