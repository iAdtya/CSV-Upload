import file from "../models/Files.js";
import multer from "multer";
import path from "path";
import parse from "csv-parser";

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

export const uploadFile = async (req, res) => {
  console.log(req.file);
  try {
    if (!req.file) {
      return res.status(400).send("Please upload a file");
    }
    if (req.file.mimetype != "text/csv") {
      return res.status(400).send("Select CSV files only.");
    }

    const newfile = file.create({
      filename: req.file.originalname,
      path: req.file.path,
      size: req.file.size,
      file: req.file.filename,
    });
    return res.status(200).send(`File uploaded successfully: ${newfile}`);
  } catch (error) {
    res.status(500).json({ error: "Something went wrong" });
  }
};

export const renderFile = async (req, res) => {
  try {
  } catch (error) {
    res.status(500).json({ error: "Something went wrong" });
  }
};
