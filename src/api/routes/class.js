const express = require("express");
const router = express.Router();
const verifyToken = require("../middlewares/verifyToken");
const classController = require("../controllers/class");

router.get("/", verifyToken, classController.class_getAll);
router.get("/details", verifyToken, classController.class_getAllDetails);
router.get("/details/:id", verifyToken, classController.class_getDetailsById);
router.get("/faculty/:id", verifyToken, classController.class_getByFaculty);
router.get("/count", verifyToken, classController.class_getCount);
router.post("/", verifyToken, classController.class_add);
router.delete("/:id", verifyToken, classController.class_delete);

module.exports = router;
