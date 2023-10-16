import file from "../models/Files.js";
import multer from "multer";
import path from "path";
import parse from "csv-parser";
import fs from "fs";

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
  console.log("renderFile");
  try {
    const csvFile = await file.findOne({ file: req.params.id });
    if (!csvFile) {
      return res.status(404).json({ error: "File not found" });
    }
    const results_array = [];
    const header = [];
    fs.createReadStream(csvFile.path)
      .pipe(parse())
      .on("headers", (headers) => {
        headers.map((head) => {
          header.push(head);
        });
        console.log(header); //?debug
      })

      .on("data", (data) => results_array.push(data))
      .on("end", () => {
        // console.log(results.length);
        console.log(results_array);
        res.render("list_csv", {
          title: "File Viewer",
          fileName: csvFile.filename,
          head: header,
          data: results_array,
          length: results_array.length,
        });
      });
  } catch (error) {
    console.error("Error in renderFile route:", error);
    res.status(500).json({ error: "Something went wrong" });
  }
};
