import { Router } from "express";
import {
  addUser,
  getUsers,
  deleteUser,
  updateUser,
} from "../controllers/usersController.js";
const router = Router();

router.post("/", addUser).get("/", getUsers);
router.delete("/:id", deleteUser).put("/:id", updateUser);

export default router;
