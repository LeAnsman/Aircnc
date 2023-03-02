import express from "express";
import imageDownloader from "image-downloader";
import fs from "fs";
import { photosMiddleware } from "../middlewares/photosMiddleware.js";
import { __dirname } from "../server.js";

const router = express.Router();

router.post("/upload", photosMiddleware.array("photos", 35), (req, res) => {
  const uploadedFiles = [];
  for (let i = 0; i < req.files.length; i++) {
    const { path, originalname } = req.files[i];
    const parts = originalname.split(".");
    const extension = parts[parts.length - 1];
    const newPath = path + "." + extension;
    fs.renameSync(path, newPath);
    uploadedFiles.push(newPath.replace("uploads/", ""));
  }

  res.json(uploadedFiles);
});

router.post("/upload-by-link", async (req, res) => {
  const { link } = req.body;
  const newName = "photo-" + Date.now() + ".jpg";
  await imageDownloader.image({
    url: link,
    dest: __dirname + "uploads/" + newName,
  });
  res.json(newName);
});

export default router;
