import mongoose, { Date, model, Schema } from "mongoose";
import { IProvider } from "../types/provider";
const providerSchema = new Schema<IProvider>({
  _id: mongoose.Types.ObjectId,
  firstname: String,
  lastname: String,
  phone: Number,
  User: { type: mongoose.Types.ObjectId, ref: "User" },
});
const providerModel = model<IProvider>("Provider", providerSchema);
export default providerModel;
