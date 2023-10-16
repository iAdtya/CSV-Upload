import express from "express";

import home from "../controllers/home_controller.js";

import {
  uploadFile,
  upload,
  renderFile,
  deleteFile
} from "../controllers/upload_controller.js";

const router = express.Router();

router.get("/", home);
router.post("/upload", upload.single("uploaded_file"), uploadFile);
router.get("/view/:id", renderFile);
router.get("/delete/:id", deleteFile);

console.log("router loaded");

export default router;
