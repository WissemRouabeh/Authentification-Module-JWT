import userModel from "../models/user";
import { IUser } from "../types";
import { Request, Response } from "express";
import mongoose from "mongoose";
import bcrypt from "bcryptjs";
const getUsers = async function (req: Request, res: Response) {
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
};
const getUserById = async function (req: Request, res: Response) {
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
};
const registerUser = async function (req: Request, res: Response) {
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
};
const updateUser = async function (req: Request, res: Response) {
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
};
const deleteUser = async function (req: Request, res: Response) {
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
};
export { getUsers, getUserById, updateUser, registerUser, deleteUser };
