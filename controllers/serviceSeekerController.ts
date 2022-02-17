import mongoose from "mongoose";
import { Request, Response } from "express";
import serviceSeekerModel from "../models/serviceSeeker";
import { IServiceSeeker } from "../types/";
//GET serviceSeekers populate user
const getServiceSeekers = async function (req: Request, res: Response) {
  await serviceSeekerModel
    .find()
    .populate("User")
    .then((docs: any) => {
      let serviceSeekers: Array<IServiceSeeker> = docs;
      res.send({ result: true, serviceSeekers });
    })
    .catch((error: any) => [res.status(400).send({ result: false, error })]);
};
//Get serviceSeeker with id
const getServiceSeekerById = async function (req: Request, res: Response) {
  let id = req.params.id;
  await serviceSeekerModel
    .findById(id)
    .populate("User")
    .then((doc) => {
      res
        .status(200)
        .send({ result: true, message: "Service seeker found", provider: doc });
    })
    .catch((err) => {
      res
        .status(404)
        .send({ result: false, message: "Service seeker not found" });
    });
};
//POST serviceSeeker
const postServiceSeeker = async function (req: Request, res: Response) {
  let serviceSeeker: IServiceSeeker = req.body;
  serviceSeeker._id = new mongoose.Types.ObjectId();
  await new serviceSeekerModel(serviceSeeker)
    .save()
    .then((data: any) => {
      res
        .status(201)
        .send({ result: true, message: "Service seeker registred", new: data });
    })
    .catch((error: any) => {
      res
        .status(400)
        .send({ result: false, message: "An error occured", error });
    });
};
//PUT serviceSeeker [:id]
const updateServiceSeeker = async function (req: Request, res: Response) {
  let serviceSeeker: IServiceSeeker = req.body;
  let id = req.params.id;

  await serviceSeekerModel
    .findByIdAndUpdate(id, serviceSeeker)
    .then((data: any) => {
      res.status(201).send({
        result: true,
        message: "Service seeker has been updated",
        old: data,
        new: serviceSeeker,
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
const deleteServiceSeeker = async function (req: Request, res: Response) {
  let id = req.params.id;
  await serviceSeekerModel
    .findByIdAndDelete(id)
    .then((doc: any) => {
      res.status(200).send({
        result: true,
        message: "Service seeker has been deleted",
        old: doc,
      });
    })
    .catch((error) =>
      res
        .status(400)
        .send({ result: false, message: "An error occured", error })
    );
};
//Get serviceSeeker with userid
const findServiceSeekerByUserid = async function (req: Request, res: Response) {
  let userid = req.params.userid;
  await serviceSeekerModel
    .find({ User: userid })
    .populate("User")
    .then((docs) => {
      if (docs.length == 0) {
        res.status(404).send({ result: false, message: "User not found" });
      } else
        res
          .status(200)
          .send({ result: true, message: "User found", user: docs[0] });
    });
};

export {
  getServiceSeekerById,
  getServiceSeekers,
  updateServiceSeeker,
  deleteServiceSeeker,
  findServiceSeekerByUserid,
};
