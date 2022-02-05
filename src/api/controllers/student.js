const User = require("../../models/user");

//GET ALL STUDENTS
module.exports.student_get = async (req, res) => {
  try {
    const studentsAll = await User.find({ role: "Student" });
    if (!studentsAll)
      return res.status(400).json({ message: "No Students Found!" });
    return res.status(200).json(studentsAll);
  } catch (err) {
    return res(400).json({ message: err });
  }
};

// GET STUDENT BY ID
module.exports.student_getById = async (req, res) => {
  try {
    const student = await User.findById(req.params.id);
    if (!student) return res.status(400).json({ message: "No Student Found!" });
    return res.status(200).json(student);
  } catch (err) {
    return res(400).json({ message: err });
  }
};

//UPDATE A STUDENT
module.exports.student_update = async (req, res) => {
  try {
    const updatedStudent = await User.findByIdAndUpdate(
      req.params.id,
      {
        name: req.body.name,
        email: req.body.email,
        phone: req.body.phone,
        gender: req.body.gender,
        dob: req.body.dob,
        address: req.body.address,
      },
      { new: true }
    );

    if (!updatedStudent)
      return res.status(400).json({ message: "No Student Found." });

    return res.status(200).json(updatedStudent);
  } catch (err) {
    return res.status(400).json({ message: err.message });
  }
};

// DELETE A STUDENT
module.exports.student_delete = async (req, res) => {
  try {
    const deletedStudent = await User.findByIdAndDelete(req.params.id);
    return res.status(200).json(deletedStudent);
  } catch (err) {
    return res.status(400).json(err);
  }
};

//COUNT STUDENTS
module.exports.student_getCount = async (req, res) => {
  try {
    const studentCount = await User.countDocuments({ role: "Student" });
    return res.status(200).json({ count: studentCount });
  } catch (err) {
    return res.status(400).json(err);
  }
};
