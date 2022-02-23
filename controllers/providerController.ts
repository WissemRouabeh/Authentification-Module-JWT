import mongoose from "mongoose";
import express, { request, Request, Response } from "express";
import providerModel from "../models/provider";
import { IProvider } from "../types/";
import catchAsync from "../utils/catchAsync";
import GlobalError from "../utils/GlobalError";

const getProviders = catchAsync(
  async (req: Request, res: Response, next: any) => {
    const providers: Array<IProvider> = await providerModel
      .find()
      .populate("User")
      .exec();
    if (providers.length == 0)
      return next(new GlobalError("Empty list of providers", 204));
    res.status(200).send({
      status: "success",
      result: true,
      rows: providers.length,
      providers,
    });
  }
);
const getProviderById = catchAsync(
  async (req: Request, res: Response, next: any) => {
    let id = req.params.id;
    const provider = await providerModel.findById(id).populate("User").exec();
    if (!provider)
      return next(new GlobalError("No provider found with id " + id, 404));
    res
      .status(200)
      .send({
        status: "success",
        result: true,
        message: "Provider found",
        provider,
      });
  }
);

const postProvider = catchAsync(
  async (req: Request, res: Response, next: any) => {
    let provider: IProvider = req.body;
    provider._id = new mongoose.Types.ObjectId();
    const newProvider = new providerModel(provider);
    await newProvider.save();
    res
      .status(201)
      .send({
        status: "success",
        result: true,
        message: "Provider registred",
        new: newProvider,
      });
  }
);

//PUT provider [:id]
const updateProvider = catchAsync(
  async (req: Request, res: Response, next: any) => {
    let provider: IProvider = req.body;
    let id = req.params.id;

    const providerToUpdate = await providerModel
      .findByIdAndUpdate(id, provider)
      .exec();
    if (!providerToUpdate)
      if (!provider) next(new GlobalError("No user found with id " + id, 404));

    res
      .status(201)
      .send({
        status: "success",
        result: true,
        message: "Provider has been updated",
        old: providerToUpdate,
        new: provider,
      });
  }
);
//DELETE user [:id]
const deleteProvider = catchAsync(
  async (req: Request, res: Response, next: any) => {
    let id = req.params.id;
    const provider = await providerModel.findByIdAndDelete(id).exec();
    if (!provider)
      return next(new GlobalError("No provider found with id" + id, 404));
    res.status(201).send({
      status: "success",
      result: true,
      message: "Provider has been deleted",
      old: provider,
    });
  }
);
//Get provider with userid
const findProviderByUserId = catchAsync(
  async (req: Request, res: Response, next: any) => {
    let userid = req.params.userid;
    const provider = await providerModel
      .find({ User: userid })
      .populate("User")
      .exec();
    if (!provider)
      return next(new GlobalError("No provider found with user id", 404));

    res
      .status(200)
      .send({
        status: "success",
        result: true,
        message: "Provider found",
        provider: provider,
      });
  }
);

export {
  postProvider,
  getProviders,
  getProviderById,
  findProviderByUserId,
  deleteProvider,
  updateProvider,
};
