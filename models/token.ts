import mongoose, { model, Schema } from "mongoose";
interface token {
  _id: any;
  userId: any;
  refreshToken: string;
}
const tokenSchema = new Schema<token>({
  _id: mongoose.Schema.Types.ObjectId,
  userId: mongoose.Schema.Types.ObjectId,
  refreshToken: String,
});
const tokenModel = model<token>("Token", tokenSchema);
export default tokenModel;
