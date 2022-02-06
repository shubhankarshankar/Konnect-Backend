const express = require("express");
const router = express.Router();
const verifyToken = require("../middlewares/verifyToken");
const userController = require("../controllers/user");

router.put("/:id", verifyToken, userController.user_update);

module.exports = router;
