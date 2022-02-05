const User = require("../../models/user");

//GET ALL FACULTIES
module.exports.faculty_get = async (req, res) => {
  try {
    const facultiesAll = await User.find({ role: "Faculty" });
    if (!facultiesAll)
      return res.status(400).json({ message: "No Faculties Found!" });
    return res.status(200).json(facultiesAll);
  } catch (err) {
    return res(400).json({ message: err });
  }
};

// GET FACULTY BY ID
module.exports.faculty_getById = async (req, res) => {
  try {
    const faculty = await User.findById(req.params.id);
    if (!faculty) return res.status(400).json({ message: "No Faculty Found!" });
    return res.status(200).json(faculty);
  } catch (err) {
    return res(400).json({ message: err });
  }
};

//UPDATE A FACULTY
module.exports.faculty_update = async (req, res) => {
  try {
    const updatedFaculty = await User.findByIdAndUpdate(
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

    if (!updatedFaculty)
      return res.status(400).json({ message: "No Faculty Found." });

    return res.status(200).json(updatedFaculty);
  } catch (err) {
    return res.status(400).json({ message: err.message });
  }
};

// DELETE A FACULTY
module.exports.faculty_delete = async (req, res) => {
  try {
    const deletedFaculty = await User.findByIdAndDelete(req.params.id);
    return res.status(200).json(deletedFaculty);
  } catch (err) {
    return res.status(400).json(err);
  }
};

// COUNT FACULTIES
module.exports.faculty_getCount = async (req, res) => {
  try {
    const facultyCount = await User.countDocuments({ role: "Faculty" });
    return res.status(200).json({ count: facultyCount });
  } catch (err) {
    return res.status(400).json(err);
  }
};
