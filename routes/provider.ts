import express from "express";
import {
  postProvider,
  getProviders,
  getProviderById,
  findProviderByUserId,
  deleteProvider,
  updateProvider,
} from "../controllers/providerController";
const router = express.Router();
//GET providers populate user
router.route("/").get(getProviders);
//Get provider with id
router.route("/:id").get(getProviderById);
//Get provider with userid
router.route("/findbyuserid/:userid").get(findProviderByUserId);
//POST provider
router.route("/").post(postProvider);
//PUT provider [:id]
router.route("/:id").put(updateProvider);
//DELETE user [:id]
router.route("/:id").delete(deleteProvider);

export default router;
