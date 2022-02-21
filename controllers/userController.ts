import userModel from "../models/user";
import { IUser } from "../types";
import { Request, Response } from "express";
import mongoose from "mongoose";
import bcrypt from "bcryptjs";
import catchAsync from "../utils/catchAsync";
import GlobalError from "../utils/GlobalError";
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

const registerUser = catchAsync(
  async (req: Request, res: Response, next: any) => {
    const user: IUser = req.body;
    user._id = new mongoose.Types.ObjectId();
    try {
      user.password = await bcrypt.hash(user.password, 10);
    } catch (error: any) {
      next(
        new GlobalError(
          "An error occured while hashing password\nerr: " + error,
          400
        )
      );
    }

    const newUser = new userModel(user);
    await newUser.save();
    res
      .status(201)
      .send({ result: true, message: "User registred", new: newUser });
  }
);
const updateUser = catchAsync(
  async (req: Request, res: Response, next: any) => {
    let id = req.params.id;
    const user: IUser = req.body;
    const updatedUser = await userModel.findByIdAndUpdate(id, user).exec();

    if (updatedUser == null)
      return next(new GlobalError("No user found with this id:" + id, 404));
    else
      res.status(201).send({
        result: true,
        message: "User updated succesfully",
        old: updatedUser,
      });
  }
);
const deleteUser = catchAsync(
  async (req: Request, res: Response, next: any) => {
    let id = req.params.id;
    const deletedUser = await userModel.findByIdAndDelete(id).exec();

    if (deletedUser == null)
      return next(new GlobalError("No user found with this id:" + id, 404));
    else
      res.status(201).send({
        result: true,
        message: "User deleted succesfully",
        old: deletedUser,
      });
  }
);
export { getUsers, getUserById, updateUser, registerUser, deleteUser };
