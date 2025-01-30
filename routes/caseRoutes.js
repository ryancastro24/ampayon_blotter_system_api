import { Router } from "express";
import { getCases, addCase } from "../controllers/caseController.js";
const router = Router();

router.get("/", getCases).post("/", addCase);

export default router;
