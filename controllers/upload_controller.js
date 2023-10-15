import file from "../models/Files.js";
import multer from "multer";
import path from "path";
import { parse } from "csv-parse";

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "uploads/");
  },
  filename: (req, file, cb) => {
    const uniqueSuffix = Date.now() + "-" + Math.round(Math.random() * 1e9);
    cb(
      null,
      file.fieldname + "-" + uniqueSuffix + path.extname(file.originalname)
    );
  },
});

export const upload = multer({ storage: storage });

const uploadFile = async (req, res) => {
  console.log(req.file,req.body);
  try {
    if (!req.file) {
      return res.status(400).send("Please upload a file");
    }
    const newfile = new file({
      filename: req.file.originalname,
      path: req.file.path,
      size: req.file.size,
    });
    await newfile.save();
    return res.status(200).send(`File uploaded successfully: ${newfile}`);
  } catch (error) {
    res.status(500).json({ error: "Something went wrong" });
  }
};

export default uploadFile;
