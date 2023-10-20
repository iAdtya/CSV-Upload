import express from "express";
import multer from "multer";  
import home from "../controllers/home_controller.js";

import {
  uploadFile,
  renderFile,
  deleteFile,
  sendParsedData,
} from "../controllers/upload_controller.js";

const router = express.Router();
const upload = multer({ dest: "uploads/files" });

router.get("/", home);
router.post("/upload", upload.single("uploaded_file"), uploadFile);
router.get("/view/:id", renderFile);
router.get("/delete/:id", deleteFile);
router.get("/data/:id", sendParsedData);

console.log("router loaded");

export default router;
