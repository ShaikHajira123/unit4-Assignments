const mongoose = require("mongoose");


const submitSchema = new mongoose.Schema(
  {
    marks : { type:Number, required: true},
    evaluateId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "evaluate",
      required: true,
    },
    studentId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "student",
      required: true,
    },
  },
  {
    versionKey: false,
    timestamps: true,
  }
);

module.exports = mongoose.model("submit", submitSchema); 