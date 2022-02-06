const express = require("express");
const router = express.Router();
const verifyToken = require("../middlewares/verifyToken");
const marksController = require("../controllers/marks");

router.get(
  "/:classId/:stuId",
  verifyToken,
  marksController.marks_getMarksByStudentIdAndClassId
);
router.post("/:classId/:stuId", verifyToken, marksController.marks_add);
router.get(
  "/:id",
  verifyToken,
  marksController.marks_getDetailedMarksByStudentId
);

module.exports = router;
