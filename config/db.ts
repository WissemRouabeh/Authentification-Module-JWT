import mongoose from "mongoose";
import dotenv from "dotenv";
dotenv.config();
const { MONGO_URI } = process.env;

async function connexion() {
  await mongoose.connect(MONGO_URI, () => {
    console.log("Connected");
  });
}
export default connexion;
