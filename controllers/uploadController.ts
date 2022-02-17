import { Request, Response } from "express";
import fs from "fs";
import path from "path";
import url from "url";
import { IImage } from "../types";
import imageModel from "../models/image";
import mongoose from "mongoose";
const uploadDirectory = process.env.IMAGE_DIR;

function getFullUrl(req, filename) {
  const baseUrl: string = url.format({
    protocol: req.protocol,
    host: req.get("host"),
  });
  const fullUrl: string = `${baseUrl}${uploadDirectory}/${filename}`;
  return fullUrl;
}

const uploadImage = async function (req: Request, res: Response) {
  if (req.file === undefined)
    return res.send({ result: false, message: "Please select an image" });
  const imageToUpload: IImage = {
    _id: new mongoose.Types.ObjectId(),
    source: getFullUrl(req, req.file.filename),
    imageName: req.file.filename,
  };

  await new imageModel(imageToUpload)
    .save()
    .then((data: any) => {
      res
        .status(201)
        .send({ result: true, message: "Image uploaded", new: data });
    })
    .catch((error) => {
      res
        .status(400)
        .send({ result: false, message: "An error occured", error });
    });
};
const deleteImageByName = async function (req: Request, res: Response) {
  const filename = req.params.filename;

  const pathFileToDelete = path.join(
    __dirname,
    `..${uploadDirectory}${filename}`
  );
  fs.unlink(pathFileToDelete, (error: any) => {
    if (error) {
      console.log(error);
      res.send({
        result: false,
        message: "An error occured",
      });
    }
    res.send({
      result: true,
      message: `../${filename} deleted `,
    });
  });
};
export { uploadImage, deleteImageByName };
