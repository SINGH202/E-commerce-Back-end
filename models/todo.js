const mongoose = require("mongoose");
const todoSchema = new mongoose.Schema(
  {
    title: { type: String, required: true, unique: false },
    date: { type: String, required: true, unique: false },
    time: { type: String, required: true, unique: false },
    status: { type: Boolean, required: false },
  },
  {
    timestamps: true,
    versionKey: false,
  }
);

module.exports = mongoose.model("Todo", todoSchema);
