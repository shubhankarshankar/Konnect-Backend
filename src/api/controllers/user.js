const User = require("../../models/user");

module.exports.user_update = async (req, res) => {
  try {
    const updatedUser = await User.findByIdAndUpdate(
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

    if (!updatedUser)
      return res.status(400).json({ message: "No User Found." });

    return res.status(200).json(updatedUser);
  } catch (err) {
    return res.status(400).json({ message: err.message });
  }
};
