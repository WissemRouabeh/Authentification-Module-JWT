import mongoose, { Date, model, Schema } from "mongoose";
interface user {
  _id?: any;
  username: string;
  password: string;
  joinDate?: Date;
}
const userSchema = new Schema<user>({
  _id: mongoose.Schema.Types.ObjectId,
  username: String,
  password: String,
  joinDate: {
    type: Date,
    default: Date.now(),
  },
});
const userModel = model<user>("User", userSchema);
export default userModel;
