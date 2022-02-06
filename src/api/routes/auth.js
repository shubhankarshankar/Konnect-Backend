const express = require("express");
const router = express.Router();
const authController = require("../controllers/auth");
const verifyToken = require("../middlewares/verifyToken");

router.post("/login", authController.login);
router.post("/register", authController.register);
router.get("/checkauth", verifyToken, authController.checkAuth);

module.exports = router;
