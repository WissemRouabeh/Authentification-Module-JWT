import mongoose, { model, Schema } from "mongoose";
import { IUser } from "../types/";
const userSchema = new Schema<IUser>({
  _id: mongoose.Schema.Types.ObjectId,
  username: { type: String, required: [true, "Username is required"] },
  password: {
    type: String,
    select: false,
    required: [true, "Password is required"],
  },

  email: {
    type: String,
    required: true,
    match: [
      /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
      "email not valid",
    ],
  },
  pending: { type: Boolean, default: false },
  accountStatus: { type: Boolean, default: false },
  joinDate: {
    type: Date,
    default: Date.now(),
  },
});

const userModel = model<IUser>("User", userSchema);
export default userModel;
