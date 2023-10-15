import express from "express";

import { upload } from "../controllers/upload_controller.js";

import home from "../controllers/home_controller.js";

import uploadFile from "../controllers/upload_controller.js";

const router = express.Router();

router.get("/", home);
router.post("/upload",upload.single("uploaded_file"),  uploadFile);

console.log("router loaded");

export default router;
