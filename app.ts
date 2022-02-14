import express from "express";
import mongoose from "mongoose";
import http from "http";
import cors from "cors";
import user from "./routes/user";
import authentification from "./routes/authentification";
import bodyParser from "body-parser";
import dotenv from "dotenv";
dotenv.config();
const { MONGO_URI, PORT } = process.env;
const app = express();
const server = http.createServer(app);

app.use(bodyParser.json());
app.use(cors());
mongoose.connect(MONGO_URI, () => {
  console.log("Connected");
});
app.use("/api/user/", user);
app.use("/api/authentification/", authentification);
server.listen(PORT, () => {
  console.log("Listening on " + PORT);
});
