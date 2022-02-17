import mongoose, { Date } from "mongoose";

export interface IImage {
  _id?: mongoose.Types.ObjectId;
  source: string;
  imageName: string;
  uploadDate?: Date;
}

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
export interface IProvider {
  _id: mongoose.Types.ObjectId;
  firstname: string;
  lastname: string;
  phone: number;
  User: mongoose.Types.ObjectId;
}
export interface IServiceSeeker {
  _id: mongoose.Types.ObjectId;
  firstname: string;
  lastname: string;
  phone: number;
  address: string;
  User: mongoose.Types.ObjectId;
}
