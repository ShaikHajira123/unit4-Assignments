const mongoose = require("mongoose");

const gallerySchema = new mongoose.Schema(
  {
    galleryPic: [{ type: String, required: false }],
    user_id: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "user",
      required: true,
    },
  },
  {
    timestamps: true,
    versionKey: false,
  }
);

module.exports = mongoose.model("gallery", gallerySchema);