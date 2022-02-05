const Announcement = require("../../models/announcement");

// GET ALL ANNOUNCEMENTS
module.exports.announcements_getAll = async (req, res) => {
  try {
    const announcements = await Announcement.find();
    return res.status(200).json(announcements);
  } catch (err) {
    return res.status(400).json(err);
  }
};

// MAKE A NEW ANNOUNCEMENT
module.exports.announcements_post = async (req, res) => {
  const announcement = new Announcement({
    title: req.body.title,
    body: req.body.body,
  });

  try {
    const newAnnouncement = await announcement.save();
    return res.status(200).json(newAnnouncement);
  } catch (err) {
    return res.status(400).json(err);
  }
};

//UPDATE AN ANNOUNCEMENT
module.exports.announcements_update = async (req, res) => {
  try {
    const updatedAnnouncement = await Announcement.findByIdAndUpdate(
      req.params.id,
      {
        title: req.body.title,
        body: req.body.body,
      },
      { new: true }
    );

    return res.status(200).json(updatedAnnouncement);
  } catch (err) {
    return res.status(400).json(err);
  }
};

// DELETE AN ANNOUNCEMENT
module.exports.announcements_delete = async (req, res) => {
  try {
    const deletedAnnouncement = await Announcement.findByIdAndDelete(
      req.params.id
    );
    return res.status(200).json(deletedAnnouncement);
  } catch (err) {
    return res.status(400).json(err);
  }
};

//GET THE NUMBER OF ANNOUNCEMENTS
module.exports.announcements_getCount = async (req, res) => {
  try {
    const announcementCount = await Announcement.countDocuments();
    return res.status(200).json({ count: announcementCount });
  } catch (err) {
    return res.status(400).json(err);
  }
};
