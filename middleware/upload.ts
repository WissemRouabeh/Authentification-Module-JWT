import multer from "multer";
import path from "path";
import { Request, Response } from "express";
import dotenv from "dotenv";
dotenv.config();
const uploadDirectory = process.env.IMAGE_DIR;
function isDirectoryExist(req: Request, res: Response, next: any) {
  var fs = require("fs");
  var dir = `.${uploadDirectory}`;

  if (!fs.existsSync(dir)) {
    fs.mkdirSync(dir, { recursive: true });
  }
  next();
}
const multerStorage = multer.diskStorage({
  destination: (req, file, setDestination) => {
    setDestination(null, path.join(__dirname, `..${uploadDirectory}`));
  },
  filename: (req, file, setFilename) => {
    setFilename(null, `image-${Date.now()}-${file.originalname}`);
  },
});

const preUpload = multer({ storage: multerStorage });
const upload = preUpload.single("file");
export { upload, isDirectoryExist };
