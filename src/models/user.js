const mongoose = require("mongoose");
const bcrypt = require("bcrypt");

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, "Name is required"],
    trim: true,
  },
  email: {
    type: String,
    lowercase: true,
    required: [true, "Email is required."],
    validate: [
      function (v) {
        var re = /^[a-zA-Z0-9+_.-]+@[a-zA-Z0-9.-]+$/;
        return re.test(v);
      },
      "Please enter a valid Email ID.",
    ],
  },
  phone: {
    type: Number,
    required: [true, "Phone Number is required"],
  },
  gender: {
    type: String,
    required: [true, "Gender is required."],
  },
  dob: {
    type: Date,
    required: [true, "Date of Birth is required"],
  },
  password: {
    type: String,
    default: "Test@123",
    minlength: [8, "Password should be at least 8 characters long."],
    validate: [
      function (v) {
        var re =
          /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%^&*_=+-]).{8,32}$/;
        return re.test(v);
      },
      "Password is not strong enough.",
    ],
  },
  address: {
    type: String,
    required: [true, "Address is Required."],
  },
  role: {
    type: String,
    default: "Student",
    enum: ["Admin", "Student", "Faculty"],
  },
  marks: [{ type: mongoose.Schema.Types.ObjectId, ref: "Marks", default: [] }],
  assignments: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Assignment",
      default: [],
    },
  ],
});

userSchema.pre("save", async function (next) {
  const salt = await bcrypt.genSalt(10);
  this.password = await bcrypt.hash(this.password, salt);
  next();
});

module.exports = mongoose.model("User", userSchema);
