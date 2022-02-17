import mongoose, { Date, model, Schema } from "mongoose";
import { IServiceSeeker } from "../types/";
const serviceSeekerSchema = new Schema<IServiceSeeker>({
  _id: mongoose.Types.ObjectId,
  firstname: String,
  lastname: String,
  phone: Number,
  User: { type: mongoose.Types.ObjectId, ref: "User" },
});
const serviceSeekerModel = model<IServiceSeeker>(
  "serviceSeeker",
  serviceSeekerSchema
);
export default serviceSeekerModel;
