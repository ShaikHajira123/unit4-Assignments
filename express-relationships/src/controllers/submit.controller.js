const express = require("express");

const Submit = require("../models/submission.model");

const crudController = require("./crud.controller");

const router = express.Router();

router.get("", async (req, res) => {
  try {
    const students = await Submit.find({marks:{$gt:8}})
      .lean()
      .exec();

    return res.status(200).send(students);
  } catch (err) {
    return res.status(500).send({ message: err.message });
  }
});

router.post("", crudController.post(Submit));



module.exports = router;