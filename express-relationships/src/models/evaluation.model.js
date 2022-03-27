const mongoose = require("mongoose");


const evaluateSchema = new mongoose.Schema(
  {
    date_of_evaluation : { type:Date, required: true},
  
    batchId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "batch",
      required: true,
    },
  },
  {
    versionKey: false,
    timestamps: true,
  }
);

module.exports = mongoose.model("evaluate", evaluateSchema); 
