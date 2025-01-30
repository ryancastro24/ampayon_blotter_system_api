import { Router } from "express";
import { addUser, getUsers } from "../controllers/usersController.js";
const router = Router();

router.post("/", addUser).get("/", getUsers);

export default router;
