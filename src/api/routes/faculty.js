const express = require("express");
const router = express.Router();
const verifyToken = require("../middlewares/verifyToken");
const facultyController = require("../controllers/faculty");

router.get("/", verifyToken, facultyController.faculty_get);
router.get("/count", verifyToken, facultyController.faculty_getCount);
router.get("/:id", verifyToken, facultyController.faculty_getById);
router.post("/", verifyToken, facultyController.faculty_create);
router.put("/:id", verifyToken, facultyController.faculty_update);
router.delete("/:id", verifyToken, facultyController.faculty_delete);

module.exports = router;
