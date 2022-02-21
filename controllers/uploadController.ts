import { Request, Response } from "express";
import fs from "fs";
import path from "path";
import url from "url";
import { IImage } from "../types";
import imageModel from "../models/image";
import mongoose from "mongoose";
import catchAsync from "../utils/catchAsync";
import GlobalError from "../utils/GlobalError";
const uploadDirectory = process.env.IMAGE_DIR;

function getFullUrl(req, filename) {
  const baseUrl: string = url.format({
    protocol: req.protocol,
    host: req.get("host"),
  });
  const fullUrl: string = `${baseUrl}${uploadDirectory}/${filename}`;
  return fullUrl;
}
const getImageById = catchAsync(
  async (req: Request, res: Response, next: any) => {
    const id = req.params.id;
    const image: IImage = await imageModel.findById(id).exec();
    if (!image) return next(new GlobalError(`No image with id:${id}`, 404));
    res.status(200).send({
      result: true,
      status: "success",
      message: "Image found succesfully",
      new: image,
    });
  }
);
const uploadImage = catchAsync(
  async (req: Request, res: Response, next: any) => {
    if (req.file === undefined)
      return next(new GlobalError("Please select an image", 400));
    const imageToUpload: IImage = {
      _id: new mongoose.Types.ObjectId(),
      source: getFullUrl(req, req.file.filename),
      imageName: req.file.filename,
    };
    const uploadedImage = await new imageModel(imageToUpload).save();
    res
      .status(201)
      .send({ result: true, message: "Image uploaded", new: uploadedImage });
  }
);

const deleteImageByName = catchAsync(
  async (req: Request, res: Response, next: any) => {
    const filename = req.params.filename;
    const pathFileToDelete = path.join(
      __dirname,
      `..${uploadDirectory}/${filename}`
    );
    let isDeleted: boolean = false;
    const imageToDelete = await imageModel.findOneAndDelete({
      sourceName: filename,
    });
    if (!imageToDelete) isDeleted = true;
    fs.unlink(pathFileToDelete, (error: any) => {
      if (error) {
        isDeleted = true;
      }
    });
    if (!isDeleted)
      res.send({
        result: true,
        message: `../${filename} deleted `,
      });
    else {
      return next(new GlobalError("Image already deleted", 400));
    }
  }
);
export { uploadImage, deleteImageByName, getImageById };
