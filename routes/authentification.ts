import express, { Request, Response } from "express";
import { IUser, IToken } from "../types/user";
import userModel from "../models/user";
import tokenModel from "../models/token";
import mongoose from "mongoose";
import dotenv from "dotenv";
import jwt from "jsonwebtoken";
import bcrypt from "bcryptjs";
dotenv.config();
const router = express.Router();

function generateAccessToken(payload: any) {
  return jwt.sign(
    {
      user: payload,
    },
    process.env.TOKEN_KEY,
    { expiresIn: "30s" }
  );
}

function generateRefreshToken(payload: any) {
  return jwt.sign({ username: payload }, process.env.Refresh_TOKEN_KEY);
}
router.route("/token/:userid").post(async (req: Request, res: Response) => {
  const findRefreshToken = await tokenModel.findOne<IToken>({
    userId: req.params.userid,
  });
  if (!findRefreshToken) {
    res.status(403).send({ result: false, message: "Refresh token not found" });
  } else {
    jwt.verify(
      findRefreshToken.refreshToken,
      process.env.REFRESH_TOKEN_KEY,
      (err: any, data: any) => {
        if (err) return res.sendStatus(403);
        const accessToken = generateAccessToken(data.username);
        res.status(200).send({
          result: true,
          message: "New access token has been generated",
          accessToken: accessToken,
        });
      }
    );
  }
});
router.route("/login").post(async (req: Request, res: Response) => {
  const user: IUser = req.body;
  const userExist = await userModel.findOne({ username: user.username });

  if (userExist) {
    bcrypt
      .compare(user.password, userExist.password)
      .then(function (result: boolean) {
        if (result) {
          const accessToken = generateAccessToken(userExist.username);
          const refreshToken = generateRefreshToken(userExist.username);
          new tokenModel({
            _id: new mongoose.Types.ObjectId(),
            userId: userExist._id,
            refreshToken: refreshToken,
          })
            .save()
            .then((data) =>
              console.log({ saved: true, message: "Refresh token saved", data })
            );
          res
            .header("authorization", "Bearer " + accessToken)
            .status(200)
            .send({ loggedUser: userExist, accessToken, refreshToken });
        } else {
          res.status(204).send("incorrect password");
        }
      });
  }
});
router.route("/logout/:userid").delete((req: Request, res: Response) => {
  tokenModel.findOneAndDelete({ userid: req.params.userid });
  res.status(204).send("Refresh token deleted, logged out");
});
export default router;
