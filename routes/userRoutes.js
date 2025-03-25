import { Router } from "express";
import {
  getUsers,
  deleteUser,
  updateUser,
  getUserDetails,
  getUserProfile,
} from "../controllers/usersController.js";
const router = Router();

router.get("/", getUsers);
router
  .delete("/:id", deleteUser)
  .put("/:id", updateUser)
  .get("/:id", getUserDetails);

router.get("/me/:id", getUserProfile);

export default router;
