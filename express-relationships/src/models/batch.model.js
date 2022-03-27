const mongoose = require("mongoose");

const batchSchema = new mongoose.Schema(
  {

    batch_name: { type: String, required: true },
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "user",
      required: true,
    },
  },
  {
    versionKey: false,
    timestamps: true,
  }
);

module.exports = mongoose.model("batch", batchSchema);