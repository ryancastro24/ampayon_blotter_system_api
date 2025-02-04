import { Router } from "express";
import {
  getCases,
  addCase,
  updateCase,
  deleteCase,
} from "../controllers/caseController.js";
const router = Router();

router.get("/", getCases).post("/", addCase);
router.put("/:id", updateCase).delete("/:id", deleteCase);

export default router;
