import { Router } from "express";
import {
  getCases,
  addCase,
  updateCase,
  deleteCase,
  getSpecificCases,
} from "../controllers/caseController.js";
const router = Router();

router.get("/", getCases).post("/", addCase);
router
  .put("/:id", updateCase)
  .delete("/:id", deleteCase)
  .get("/:id", getSpecificCases);

export default router;
