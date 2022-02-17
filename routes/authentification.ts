import express from "express";
import dotenv from "dotenv";
import {
  generateToken,
  login,
  logout,
} from "../controllers/authentificationController";
dotenv.config();
const router = express.Router();

router.route("/token/:userid").post(generateToken);
router.route("/login").post(login);
router.route("/logout/:userid").delete(logout);
export default router;
