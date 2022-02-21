import mongoose, { model, Schema } from "mongoose";
import { IUser } from "../types/";
const userSchema = new Schema<IUser>({
  _id: mongoose.Schema.Types.ObjectId,
  username: String,
  password: { type: String, required: [true, "Password is required"] },
  // email: String,

  email: {
    type: String,
    required: true,
    match: [
      /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
      "email not valid",
    ],
  },
  joinDate: {
    type: Date,
    default: Date.now(),
  },
});
const userModel = model<IUser>("User", userSchema);
export default userModel;
