import { Router } from "express";
import {
  addUser,
  getUsers,
  deleteUser,
  updateUser,
  getUserDetails,
} from "../controllers/usersController.js";
const router = Router();

router.post("/", addUser).get("/", getUsers);
router
  .delete("/:id", deleteUser)
  .put("/:id", updateUser)
  .get("/:id", getUserDetails);

export default router;
