const express = require("express");

const User = require("../models/gallery.model");

const uploads = require("../midlewares/uploads");

const router = express.Router();


  router.post("", uploads.fields({name:"galleryPic",maxCount:5}), async (req, res) => { //can uplaod multiple file number of pics uploaded
    try {
        const pics = await User.create({
            galleryPic : req.file.path,
          });
      return res.status(200).send(pics);
    } catch (error) {
      return res.status(404).send({ message: error.message });
    }
  });


  router.post("", uploads.single("profilePic"), async (req, res) => {
    try {
      const user = await User.findOneAndUpdate({
        profilePic: req.file.path,
      });
      return res.status(200).send(user);
    } catch (error) {
      return res.status(404).send({ message: error.message });
    }
  });

  router.post("", uploads.single("profilePic"), async (req, res) => {
    try {
      const user = await User.findOneAndDelete({
        firstname: req.body.firstname,
        lastname: req.body.lastname,
        profilePic: req.file.path,
      });
      return res.status(200).send(user);
    } catch (error) {
      return res.status(404).send({ message: error.message });
    }
  });
  module.exports = router;