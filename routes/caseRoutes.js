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
  getCasesGroupedByUser,
  getSpecificCasesSettledOrFailed,
  getGroupCases,
  getPermonthCases,
  getAllCasesPerBarangay,
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
router.get("/usercases/cases/data", getCasesGroupedByUser);
router.get("/archivecases/cases/data/:id", getSpecificCasesSettledOrFailed);
router.get("/groupedcases/cases/data/:id", getGroupCases);
router.get("/permonthCases/cases/data/:id", getPermonthCases);
router.get("/allCasesPerBarangay/cases/data/:id", getAllCasesPerBarangay);

export default router;
