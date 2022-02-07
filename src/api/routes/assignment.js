const express = require("express");
const router = express.Router();
const verifyToken = require("../middlewares/verifyToken");
const assigmentController = require("../controllers/assignment");

router.post(
  "/:classId",
  verifyToken,
  assigmentController.assignment_uploadQuestion
);
router.get(
  "/details/:id",
  verifyToken,
  assigmentController.assignment_getDetailedAssignmentsById
);
router.get(
  "/:id",
  verifyToken,
  assigmentController.assignment_getDetailedAssignmentsByStudentId
);
router.post(
  "/submission/:classId/:stuId",
  verifyToken,
  assigmentController.assignment_addSubmission
);
router.get(
  "/submission/:classId/:stuId",
  verifyToken,
  assigmentController.assignment_getSubmission
);

module.exports = router;
