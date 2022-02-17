import express from "express";
import dotenv from "dotenv";
import { verifyToken } from "../middleware/authentification";
import { Request, Response } from "express";
import { validateUser } from "../validators/userValidator";
import {
  getUsers,
  updateUser,
  getUserById,
  registerUser,
  deleteUser,
} from "../controllers/userController";
dotenv.config();

export interface CustomRequest extends Request {
  user: any;
}

const router = express.Router();

//Get users
router.route("/").get(getUsers);
//Get user with id
router.route("/:id").get(getUserById);
//POST register user
router.route("/").post(validateUser, registerUser);
//PUT update user [:id]
router.route("/:id").put(validateUser, updateUser);
//DELETE user [:id]
router.route("/:id").delete(deleteUser);

//test api
router
  .route("/welcome")
  .get(verifyToken, (req: CustomRequest, res: Response) => {
    res.send("Hello " + req.user);
  });

export default router;
