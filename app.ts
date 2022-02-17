import express from "express";
import path from "path";
import http from "http";
import cors from "cors";
import user from "./routes/user";
import provider from "./routes/provider";
import serviceSeeker from "./routes/serviceSeeker";
import authentification from "./routes/authentification";
import bodyParser from "body-parser";
import connexionMongo from "./config/db";
import dotenv from "dotenv";
import upload from "./routes/upload";

dotenv.config();

const { MONGO_URI, PORT } = process.env;
const app = express();
const server = http.createServer(app);

connexionMongo();
app.use(bodyParser.json());
app.use(cors());
app.use("/file/", upload);
app.use("/api/user/", user);
app.use("/api/provider/", provider);
app.use("/api/serviceSeeker/", serviceSeeker);
app.use("/api/authentification/", authentification);

app.use(express.static(__dirname));

server.listen(PORT, () => {
  console.log("Listening on " + PORT);
});
