import mongoose from "mongoose";
import { Request, Response } from "express";
import serviceSeekerModel from "../models/serviceSeeker";
import { IServiceSeeker } from "../types/";
import catchAsync from "../utils/catchAsync";
import GlobalError from "../utils/GlobalError";

const getServiceSeekers = catchAsync(
  async (req: Request, res: Response, next: any) => {
    const serviceSeekers: Array<IServiceSeeker> = await serviceSeekerModel
      .find()
      .populate("User")
      .exec();
    if (serviceSeekers.length == 0)
      return next(new GlobalError("Empty list of service seekers", 204));
    res.status(200).send({
      status: "success",
      result: true,
      rows: serviceSeekers.length,
      serviceSeekers,
    });
  }
);
const getServiceSeekerById = catchAsync(
  async (req: Request, res: Response, next: any) => {
    let id = req.params.id;
    const serviceSeeker = await serviceSeekerModel
      .findById(id)
      .populate("User")
      .exec();
    if (!serviceSeeker)
      return next(
        new GlobalError("No service seeker found with id " + id, 404)
      );
    res.status(200).send({
      status: "success",
      result: true,
      message: "Service seeker found",
      serviceSeeker,
    });
  }
);

const postServiceSeeker = catchAsync(
  async (req: Request, res: Response, next: any) => {
    const serviceSeeker: IServiceSeeker = req.body;
    serviceSeeker._id = new mongoose.Types.ObjectId();
    const newServiceSeeker = new serviceSeekerModel(serviceSeeker);
    await newServiceSeeker.save();
    res.status(201).send({
      result: true,
      message: "Service seeker has been registred",
      new: newServiceSeeker,
    });
  }
);

//PUT service seeker [:id]
const updateServiceSeeker = catchAsync(
  async (req: Request, res: Response, next: any) => {
    let serviceSeeker: IServiceSeeker = req.body;
    let id = req.params.id;

    const serviceSeekerToUpdate = await serviceSeekerModel
      .findByIdAndUpdate(id, serviceSeeker)
      .exec();
    if (!serviceSeekerToUpdate)
      if (!serviceSeeker)
        next(new GlobalError("No service seeker found with id " + id, 404));

    res.status(201).send({
      result: true,
      message: "Service seeker has been updated",
      old: serviceSeekerToUpdate,
      new: serviceSeeker,
    });
  }
);
//DELETE user [:id]
const deleteServiceSeeker = catchAsync(
  async (req: Request, res: Response, next: any) => {
    let id = req.params.id;
    const serivceSeeker = await serviceSeekerModel.findByIdAndDelete(id).exec();
    if (!serivceSeeker)
      return next(new GlobalError("No service seeker found with id" + id, 404));
    res.status(201).send({
      status: "success",
      result: true,
      message: "Service seeker has been deleted",
      old: serivceSeeker,
    });
  }
);
//Get service seeker with userid
const findServiceSeekerByUserid = catchAsync(
  async (req: Request, res: Response, next: any) => {
    let userid = req.params.userid;
    const serviceSeeker = await serviceSeekerModel
      .find({ User: userid })
      .populate("User")
      .exec();
    if (!serviceSeeker)
      return next(new GlobalError("No service seeker found with user id", 404));

    res.status(200).send({
      result: true,
      message: "Service seeker found",
      serviceSeeker,
    });
  }
);

export {
  postServiceSeeker,
  getServiceSeekers,
  getServiceSeekerById,
  findServiceSeekerByUserid,
  deleteServiceSeeker,
  updateServiceSeeker,
};
