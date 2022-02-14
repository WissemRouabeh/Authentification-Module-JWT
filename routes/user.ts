import express from "express";
import mongoose from "mongoose";
import userModel from "../models/user";
import dotenv from "dotenv";
import { verifyToken, testMiddleware } from "../middleware/auth";
import { Request, Response } from "express";
import { validateUser } from "../controls/userValidator";
import bcrypt from "bcryptjs";
dotenv.config();

const router = express.Router();

interface CustomRequest extends Request {
  user: any;
}

interface IUser {
  _id: mongoose.Types.ObjectId;
  username: string;
  password: string;
}

router
  .route("/register")
  .post(testMiddleware, async (req: Request, res: Response) => {
    const user: IUser = req.body;

    await bcrypt.hash(user.password, 10, async function (err, hash) {
      user._id = new mongoose.Types.ObjectId();
      user.password = hash;
      if (err) {
        res.sendStatus(204);
      }
      await new userModel(user)
        .save()
        .then((data: any) => {
          res.status(201).send(data);
        })
        .catch((error: any) => {
          console.log(error);
        });
    });
  });

//test api
router
  .route("/welcome")
  .get(verifyToken, (req: CustomRequest, res: Response) => {
    res.send("Hello " + req.user);
  });
router.route("/validate").post(validateUser, (req, res) => {
  res.send("okay");
});

export default router;
