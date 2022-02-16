import mongoose, { Date } from "mongoose";

export interface IUser {
  _id: mongoose.Types.ObjectId;
  username: string;
  password: string;
  email: string;
  joinDate?: Date;
}
export interface IToken {
  _id: any;
  userId: any;
  refreshToken: string;
}
