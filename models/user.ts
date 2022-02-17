import mongoose, { model, Schema } from "mongoose";
import { IUser } from "../types/";
const userSchema = new Schema<IUser>({
  _id: mongoose.Schema.Types.ObjectId,
  username: String,
  password: String,
  email: String,
  joinDate: {
    type: Date,
    default: Date.now(),
  },
});
const userModel = model<IUser>("User", userSchema);
export default userModel;
