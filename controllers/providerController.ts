import mongoose from "mongoose";
import express, { Request, Response } from "express";
import providerModel from "../models/provider";
import { IProvider } from "../types/";
const router = express.Router();
//GET providers populate user
const getProviders = async function (req: Request, res: Response) {
  await providerModel
    .find()
    .populate("User")
    .then((docs: any) => {
      let providers: Array<IProvider> = docs;
      res.send({ result: true, providers });
    })
    .catch((error: any) => [res.status(400).send({ result: false, error })]);
};
//Get provider with id
const getProviderById = async function (req: Request, res: Response) {
  let id = req.params.id;
  await providerModel
    .findById(id)
    .populate("User")
    .then((doc) => {
      res
        .status(200)
        .send({ result: true, message: "Provider found", provider: doc });
    })
    .catch((err) => {
      res.status(404).send({ result: false, message: "Provider not found" });
    });
};
//POST provider
const postProvider = async function (req: Request, res: Response) {
  let provider: IProvider = req.body;
  provider._id = new mongoose.Types.ObjectId();
  await new providerModel(provider)
    .save()
    .then((data: any) => {
      res
        .status(201)
        .send({ result: true, message: "Provider registred", new: data });
    })
    .catch((error: any) => {
      res
        .status(400)
        .send({ result: false, message: "An error occured", error });
    });
};
//PUT provider [:id]
const updateProvider = async function (req: Request, res: Response) {
  let provider: IProvider = req.body;
  let id = req.params.id;

  await providerModel
    .findByIdAndUpdate(id, provider)
    .then((data: any) => {
      res.status(201).send({
        result: true,
        message: "Provider has been updated",
        old: data,
        new: provider,
      });
    })
    .catch((error: any) => {
      console.log(error);
    })
    .catch((error) =>
      res
        .status(400)
        .send({ result: false, message: "An error occured", error })
    );
};
//DELETE user [:id]
const deleteProvider = async function (req: Request, res: Response) {
  let id = req.params.id;
  await providerModel
    .findByIdAndDelete(id)
    .then((doc: any) => {
      res
        .status(200)
        .send({ result: true, message: "Provider has been deleted", old: doc });
    })
    .catch((error) =>
      res
        .status(400)
        .send({ result: false, message: "An error occured", error })
    );
};
//Get provider with userid
const findProviderByUserId = async function (req: Request, res: Response) {
  let userid = req.params.userid;
  await providerModel
    .find({ User: userid })
    .populate("User")
    .then((docs) => {
      if (docs.length == 0) {
        res.status(404).send({ result: false, message: "Provider not found" });
      } else
        res.status(200).send({
          result: true,
          message: "Provider found",
          provider: docs[0],
        });
    });
};

export {
  postProvider,
  getProviders,
  getProviderById,
  findProviderByUserId,
  deleteProvider,
  updateProvider,
};
