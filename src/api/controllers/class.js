const Classes = require("../../models/class");

// GET ALL CLASSES
module.exports.class_getAll = async (req, res) => {
  Classes.find()
    .populate("faculty")
    .exec(function (err, data) {
      if (err) return res.status(400).json(err);
      return res.status(200).json(data);
    });
};

// ADD A CLASS
module.exports.class_add = async (req, res) => {
  const newClass = new Classes({
    subject: req.body.subject,
    faculty: req.body.faculty,
    students: req.body.students,
  });

  try {
    const addedClass = await newClass.save();
    return res.status(200).json(addedClass);
  } catch (err) {
    return res.status(400).json(err);
  }
};

// GET THE NUMBER OF CLASSES
module.exports.class_getCount = async (req, res) => {
  try {
    const classCount = await Classes.countDocuments();
    return res.status(200).json({ count: classCount });
  } catch (err) {
    return res.status(400).json(err);
  }
};

// GET DEATILED CLASSES
module.exports.class_getAllDetails = async (req, res) => {
  Classes.find()
    .populate("faculty")
    .populate("students")
    .exec(function (err, data) {
      if (err) return res.status(400).json(err);
      return res.status(200).json(data);
    });
};

// GET A PARTICULAR DETIALED CLASS
module.exports.class_getDetailsById = async (req, res) => {
  Classes.findById(req.params.id)
    .populate("faculty")
    .populate("students")
    .exec(function (err, data) {
      if (err) return res.status(400).json(err);
      return res.status(200).json(data);
    });
};

//GET A PARTICULAR FACULTY'S CLASS
module.exports.class_getByFaculty = async (req, res) => {
  try {
    const facultyClasses = await Classes.find({ faculty: req.params.id });
    return res.status(200).json(facultyClasses);
  } catch (err) {
    return res.status(400).json({ message: err });
  }
};

// DELETE CLASS
module.exports.class_delete = async (req, res) => {
  try {
    const deletedClass = await Classes.findByIdAndDelete(req.params.id);
    return res.status(200).json(deletedClass);
  } catch (err) {
    return res.status(400).json(err);
  }
};
