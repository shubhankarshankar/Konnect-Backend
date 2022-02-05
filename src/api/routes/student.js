const express = require("express");
const router = express.Router();
const verifyToken = require("../middlewares/verifyToken");
const studentController = require("../controllers/student");

router.get("/", verifyToken, studentController.student_get);
router.get("/count", verifyToken, studentController.student_getCount);
router.get("/:id", verifyToken, studentController.student_getById);
router.put("/:id", verifyToken, studentController.student_update);
router.delete("/:id", verifyToken, studentController.student_delete);

module.exports = router;
