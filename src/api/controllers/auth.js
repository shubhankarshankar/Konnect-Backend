const User = require("../../models/user");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

//Handle Errors
const handleErrors = (err) => {
  let errors = {
    name: "",
    email: "",
    password: "",
    phone: "",
    dob: "",
    gender: "",
    address: "",
    role: "",
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

module.exports.login = async (req, res) => {
  try {
    const loggingUser = await User.findOne({ email: req.body.email });
    if (!loggingUser)
      return res.status(401).json({ err: "Invalid Credentials" });
    const passwordMatch = await bcrypt.compare(
      req.body.password,
      loggingUser.password
    );
    if (!passwordMatch)
      return res.status(401).json({ err: "Invalid Credentials" });

    const loggedInUser = {
      name: loggingUser.name,
      email: loggingUser.email,
      phone: loggingUser.phone,
      dob: loggingUser.dob,
      gender: loggingUser.gender,
      address: loggingUser.address,
      role: loggingUser.role,
    };

    const token = jwt.sign({ _id: loggingUser._id }, process.env.TOKEN_SECRET);
    res.header("auth-token", token);
    return res.send(token);
  } catch (err) {
    return res.status(400).json({ err: "Error Occured" });
  }
};

module.exports.register = async (req, res) => {
  const user = new User({
    name: req.body.name,
    email: req.body.email,
    phone: req.body.phone,
    gender: req.body.gender,
    dob: req.body.dob,
    password: req.body.password,
    address: req.body.address,
    role: req.body.role,
  });

  try {
    const addedUser = await user.save();
    return res.status(200).json(addedUser);
  } catch (err) {
    const errors = handleErrors(err);
    return res.status(400).json(errors);
  }
};
