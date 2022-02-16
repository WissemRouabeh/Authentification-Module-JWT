import express from "express";
import mongoose from "mongoose";
import userModel from "../models/user";
import dotenv from "dotenv";
import { verifyToken } from "../middleware/auth";
import { Request, Response } from "express";
import { validateUser } from "../controls/userValidator";
import { IUser } from "../types/user";
import bcrypt from "bcryptjs";
dotenv.config();

export interface CustomRequest extends Request {
  user: any;
}

const router = express.Router();

//Get users
router.route("/").get(async (req: Request, res: Response) => {
  userModel
    .find()
    .then((docs: any) => {
      let users: Array<IUser> = docs;
      res.send(users);
    })
    .catch((error) => {
      res.status(400).send({
        result: false,
        message: "An error occured",
        error,
      });
    });
});
//Get user with id
router.route("/:id").get(async (req: Request, res: Response) => {
  let id = req.params.id;
  await userModel
    .findById(id)
    .then((doc) => {
      res
        .status(200)
        .send({ result: true, message: "User found", provider: doc });
    })
    .catch((err) => {
      res.status(404).send({ result: false, message: "User not found" });
    });
});
//POST register user
router.route("/").post(validateUser, async (req: Request, res: Response) => {
  const user: IUser = req.body;

  await bcrypt.hash(user.password, 10, async function (err: any, hash: any) {
    user._id = new mongoose.Types.ObjectId();
    user.password = hash;
    if (err) {
      res.sendStatus(204);
    }
    await new userModel(user)
      .save()
      .then((data: any) => {
        res
          .status(201)
          .send({ result: true, message: "User registred", new: data });
      })
      .catch((error: any) => {
        res
          .status(400)
          .send({ result: false, message: "An error occured", error });
      });
  });
});

//PUT update user [:id]
router.route("/:id").put(validateUser, async (req: Request, res: Response) => {
  let user: IUser = req.body;
  let id = req.params.id;
  await bcrypt.hash(user.password, 10, async (err: any, hash: any) => {
    user.password = hash;
    if (err) {
      res.sendStatus(204);
    }
    await userModel
      .findByIdAndUpdate(id, user)
      .then((data: any) => {
        res.status(201).send({
          result: true,
          message: "User has been updated",
          old: data,
          new: user,
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
});
//DELETE user [:id]
router.route("/:id").delete(async (req: Request, res: Response) => {
  let id = req.params.id;
  await userModel
    .findByIdAndDelete(id)
    .then((doc: any) => {
      res
        .status(200)
        .send({ result: true, message: "User has been deleted", old: doc });
    })
    .catch((error) =>
      res
        .status(400)
        .send({ result: false, message: "An error occured", error })
    );
});

//test api
router
  .route("/welcome")
  .get(verifyToken, (req: CustomRequest, res: Response) => {
    res.send("Hello " + req.user);
  });

export default router;
