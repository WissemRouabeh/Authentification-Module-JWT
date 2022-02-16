import mongoose from "mongoose";
export interface IProvider {
  _id: mongoose.Types.ObjectId;
  firstname: string;
  lastname: string;
  phone: number;
  User: mongoose.Types.ObjectId;
}
