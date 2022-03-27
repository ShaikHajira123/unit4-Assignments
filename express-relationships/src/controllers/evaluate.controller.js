const express = require("express");

const Evaluate = require("../models/evaluation.model");

const crudController = require("./crud.controller");

const router = express.Router();

router.get("", async (req, res) => {
  try {
    const students = await Evaluate.find()
      .populate({
        path: "userId",
        select: { firstName: 1, type: 1, _id: 0 },
      })
      .lean()
      .exec();

    return res.status(200).send(students);
  } catch (err) {
    return res.status(500).send({ message: err.message });
  }
});

router.post("", crudController.post(Evaluate));



module.exports = router;