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
  getCasesGroupedByMonthAndBarangay,
  getCasesGroupedByBarangay,
  getAllCasesStatus,
  getAllCasesPerMonth,
  removeCaseForm,
  removeDocumentationPhotos,
  updateComplainantProfilePicture,
} from "../controllers/caseController.js";
import multer from "multer";

const router = Router();

// Configure multer for file upload
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "uploads/");
  },
  filename: function (req, file, cb) {
    cb(null, Date.now() + "-" + file.originalname);
  },
});

const upload = multer({ storage: storage });

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
router.get(
  "/getCasesByMonthAndBarangay/data/",
  getCasesGroupedByMonthAndBarangay
);
router.get("/getCasesGroupedByBarangay/data/", getCasesGroupedByBarangay);
router.get("/getAllCasesStatus/data/", getAllCasesStatus);
router.get("/getAllCasesPerMonth/data/", getAllCasesPerMonth);
router.post("/remove-case-form", removeCaseForm);
router.post("/remove-documentation-photos", removeDocumentationPhotos);
router.put(
  "/:caseId/complainant-profile-picture",
  upload.single("profile_picture"),
  updateComplainantProfilePicture
);

export default router;
