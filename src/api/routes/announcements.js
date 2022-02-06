const express = require("express");
const router = express.Router();
const verifyToken = require("../middlewares/verifyToken");
const announcementController = require("../controllers/announcements");

router.get("/", verifyToken, announcementController.announcements_getAll);
router.get(
  "/count",
  verifyToken,
  announcementController.announcements_getCount
);
router.get("/:id", verifyToken, announcementController.announcements_getById);
router.post("/", verifyToken, announcementController.announcements_post);
router.put("/:id", verifyToken, announcementController.announcements_update);
router.delete("/:id", verifyToken, announcementController.announcements_delete);

module.exports = router;
