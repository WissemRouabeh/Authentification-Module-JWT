import express from "express";
import {
  getServiceSeekerById,
  getServiceSeekers,
  updateServiceSeeker,
  deleteServiceSeeker,
  findServiceSeekerByUserid,
} from "../controllers/serviceSeekerController";
import { postProvider } from "../controllers/providerController";
const router = express.Router();
//GET serviceSeekers populate user
router.route("/").get(getServiceSeekers);
//Get serviceSeeker with id
router.route("/:id").get(getServiceSeekerById);
//POST serviceSeeker
router.route("/").post(postProvider);
//PUT serviceSeeker [:id]
router.route("/:id").put(updateServiceSeeker);
//DELETE user [:id]
router.route("/:id").delete(deleteServiceSeeker);
//Get serviceSeeker with userid
router.route("/:userid").get(findServiceSeekerByUserid);

export default router;
