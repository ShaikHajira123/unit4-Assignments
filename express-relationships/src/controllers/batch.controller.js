const express = require("express");

const Batch = require("../models/batch.model");

const crudController = require("./crud.controller");

const router = express.Router();


router.get("", async (req, res) => {
  try {
    const batch = await Batch.find()
      .populate({
        path: "userId",
        select: ["firstName"],
      
      })
      .populate({ path: "userId", select: ["firstName"] })
      .lean()
      .exec();

    return res.status(200).send(batch);
  } catch (err) {
    return res.status(500).send({ message: err.message });
  }
});

router.post("", crudController.post(Batch));



module.exports = router;
