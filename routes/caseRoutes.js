import { Router } from "express";
import {
  getCases,
  addCase,
  updateCase,
  deleteCase,
  updateAttempt1,
  updateAttempt2,
  updateAttempt3,
  getSpecificCases,
} from "../controllers/caseController.js";
const router = Router();

router.get("/", getCases).post("/", addCase);
router
  .put("/:id", updateCase)
  .delete("/:id", deleteCase)
  .get("/:id", getSpecificCases);

router.put("/attempt1/:id", updateAttempt1);
router.put("/attempt2/:id", updateAttempt2);
router.put("/attempt3/:id", updateAttempt3);

export default router;
