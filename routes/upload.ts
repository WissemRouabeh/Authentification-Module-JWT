import { upload, isDirectoryExist } from "../middleware/upload";
import express from "express";
import {
  uploadImage,
  deleteImageByName,
} from "../controllers/uploadController";
const router = express.Router();

//POST delete by name with two middlewares
router.route("/upload").post(isDirectoryExist, upload, uploadImage);
router.route("/:filename").delete(deleteImageByName);
export default router;
