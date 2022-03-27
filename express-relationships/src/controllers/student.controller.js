const express = require("express");

const Student = require("../models/student.model");

const crudController = require("./crud.controller");

const router = express.Router();

router.get("/:id", async (req, res) => {
  try {
    const students = await Student.find()
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

router.post("", crudController.post(Student));



module.exports = router;
