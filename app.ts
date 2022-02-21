import express, { request, Request, response, Response } from "express";
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
import GlobalError from "./utils/GlobalError";
import globalErrorHandler from "./controllers/errorController";
dotenv.config();

const { PORT } = process.env;
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
//error handling section

app.use("*", (req: Request, res: Response, next: any) => {
  next(new GlobalError(`Can't find ${req.originalUrl} on server`, 404));
});
app.use(globalErrorHandler);
server.listen(PORT, () => {
  console.log("Listening on " + PORT);
});
