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
  getSpecificCaseOnly,
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
router.get("/getSpecificCaseOnly/:id", getSpecificCaseOnly);

export default router;
