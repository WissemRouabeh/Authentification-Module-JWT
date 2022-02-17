import mongoose, { Schema, model } from "mongoose";
import { IImage } from "../types/";
const imageSchema = new Schema<IImage>({
  _id: mongoose.Types.ObjectId,
  source: String,
  imageName: String,
  uploadDate: {
    type: Date,
    default: Date.now(),
  },
});

const imageModel = model<IImage>("Image", imageSchema);
export default imageModel;
