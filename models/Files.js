import mongoose from "mongoose";

const FileSchema = new mongoose.Schema(
  {
    filename: {
      type: String,
      required: true,
    },
    path: {
      type: String,
      required: true,
    },
    size: {
      type: Number,
      required: true,
    },
  },
  {
    timestamps: true
  }
);

const file = mongoose.model("file", FileSchema);  

export default file;