import mongoose from "mongoose";
export interface IServiceSeeker {
  _id: mongoose.Types.ObjectId;
  firstname: string;
  lastname: string;
  phone: number;
  address: string;
  User: mongoose.Types.ObjectId;
}
