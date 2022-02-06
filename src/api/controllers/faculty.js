const User = require("../../models/user");

const handleErrors = (err) => {
  let errors = {
    name: null,
    email: null,
    password: null,
    phone: null,
    dob: null,
    gender: null,
    address: null,
    role: null,
  };

  if (err.code === 11000) {
    errors.email = "This email already exists.";
    return errors;
  }

  if (err.message.includes("user validation failed")) {
    Object.values(err.errors).forEach(({ properties }) => {
      errors[properties.path] = properties.message;
    });
  }

  return errors;
};

//GET ALL FACULTIES
module.exports.faculty_get = async (req, res) => {
  try {
    const facultiesAll = await User.find({ role: "Faculty" });
    if (!facultiesAll)
      return res.status(400).json({ message: "No Faculties Found!" });
    return res.status(200).json(facultiesAll);
  } catch (err) {
    return res.status(400).json({ message: err });
  }
};

// GET FACULTY BY ID
module.exports.faculty_getById = async (req, res) => {
  try {
    const faculty = await User.findById(req.params.id);
    if (!faculty) return res.status(400).json({ message: "No Faculty Found!" });
    return res.status(200).json(faculty);
  } catch (err) {
    return res.status(400).json({ message: err });
  }
};

// ADD A FACULTY
module.exports.faculty_create = async (req, res) => {
  const user = new User({
    name: req.body.name,
    email: req.body.email,
    phone: req.body.phone,
    gender: req.body.gender,
    dob: req.body.dob,
    address: req.body.address,
    role: "Faculty",
  });

  try {
    const addedFaculty = await user.save();
    return res.status(200).json(addedFaculty);
  } catch (err) {
    const errors = handleErrors(err);
    return res.status(400).json(errors);
  }
};

module.exports.checkAuth = async (req, res) => {
  try {
    return res.status(200).json({ auth: true });
  } catch (err) {
    return res.status(401).json({ auth: false });
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
