import mongoose, { Mongoose } from "mongoose";
import express from "express";
import serviceSeekerModel from "../models/serviceSeeker";
import { IServiceSeeker } from "../types/serviceSeeker";
import { Request, Response } from "express";
const router = express.Router();
//GET serviceSeekers populate user
router.route("/").get(async (req: Request, res: Response) => {
  await serviceSeekerModel
    .find()
    .populate("User")
    .then((docs: any) => {
      let serviceSeekers: Array<IServiceSeeker> = docs;
      res.send({ result: true, serviceSeekers });
    })
    .catch((error: any) => [res.status(400).send({ result: false, error })]);
});
//Get serviceSeeker with id
router.route("/:id").get(async (req: Request, res: Response) => {
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
});
//POST serviceSeeker
router.route("/").post(async (req: Request, res: Response) => {
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
});
//PUT serviceSeeker [:id]
router.route("/:id").put(async (req: Request, res: Response) => {
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
});
//DELETE user [:id]
router.route("/:id").delete(async (req: Request, res: Response) => {
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
});
//Get serviceSeeker with userid
router.route("/:userid").get(async (req: Request, res: Response) => {
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
});

export default router;
