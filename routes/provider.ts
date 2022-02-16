import mongoose, { Mongoose } from "mongoose";
import express from "express";
import providerModel from "../models/provider";
import { IProvider } from "../types/provider";
import { Request, Response } from "express";
const router = express.Router();
//GET providers populate user
router.route("/").get(async (req: Request, res: Response) => {
  await providerModel
    .find()
    .populate("User")
    .then((docs: any) => {
      let providers: Array<IProvider> = docs;
      res.send({ result: true, providers });
    })
    .catch((error: any) => [res.status(400).send({ result: false, error })]);
});
//Get provider with id
router.route("/:id").get(async (req: Request, res: Response) => {
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
});
//POST provider
router.route("/").post(async (req: Request, res: Response) => {
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
});
//PUT provider [:id]
router.route("/:id").put(async (req: Request, res: Response) => {
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
});
//DELETE user [:id]
router.route("/:id").delete(async (req: Request, res: Response) => {
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
});
//Get provider with userid
router
  .route("/findbyuserid/:userid")
  .get(async (req: Request, res: Response) => {
    let userid = req.params.userid;
    await providerModel
      .find({ User: userid })
      .populate("User")
      .then((docs) => {
        if (docs.length == 0) {
          res
            .status(404)
            .send({ result: false, message: "Provider not found" });
        } else
          res.status(200).send({
            result: true,
            message: "Provider found",
            provider: docs[0],
          });
      });
  });

export default router;
