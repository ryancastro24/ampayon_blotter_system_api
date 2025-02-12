import caseModel from "../models/caseModel.js";
import mongoose from "mongoose";
const { ObjectId } = mongoose.Types;
export async function getCases(req, res) {
  const cases = await caseModel.find();
  return res.status(200).send(cases);
}

export async function getSpecificCases(req, res) {
  const id = req.params.id;
  const userId = new ObjectId(id);
  const cases = await caseModel.find({ userId: userId });
  return res.status(200).send(cases);
}

export async function addCase(req, res) {
  const {
    complainant_name,
    respondent_name,
    case_description,
    barangay_captain,
    barangay_secretary,
    region_name,
    city_name,
    barangay_name,
    userId,
    case_type,
  } = req.body;

  // if there are missing fields  return an error response

  if (
    !complainant_name ||
    !respondent_name ||
    !case_description ||
    !barangay_captain ||
    !barangay_secretary ||
    !region_name ||
    !city_name ||
    !barangay_name ||
    !userId ||
    !case_type
  ) {
    return res.status(400).send({ error: "Missing Fields" });
  }

  // create the case in the database

  const casedata = await caseModel.create(req.body);

  return res.status(200).send(casedata);
}

// get specific case only
// url = api/cases/getSpecificCaseOnly/:id
//method = GET
export async function getSpecificCaseOnly(req, res) {
  const { id } = req.params;

  const caseData = await caseModel.findById(id);

  if (!caseData) {
    return res.status(400).send({ error: "No Case Exist!" });
  }
  return res.status(200).send(caseData);
}

export async function updateCase(req, res) {
  try {
    const { id } = req.params;
    const updates = req.body;

    const updatedCases = await caseModel.findByIdAndUpdate(
      id,
      { $set: updates },
      { new: true, runValidators: true }
    );

    if (!updatedCases) {
      return res.status(404).json({ message: "User not found" });
    }

    res
      .status(200)
      .json({ message: "Case updated successfully", updatedCases });
  } catch (error) {
    res.status(500).json({ message: "Server error", error: error.message });
  }
}

export async function deleteCase(req, res) {
  try {
    const { id } = req.params;

    const deletedCase = await caseModel.findByIdAndDelete(id);

    if (!deletedCase) {
      return res.status(404).json({ message: "User not found" });
    }

    res.status(200).json({ message: "User deleted successfully", deletedCase });
  } catch (error) {
    res.status(500).json({ message: "Server error", error: error.message });
  }
}

//update  attempt1
//url :  api/cases/attempt1
export async function updateAttempt1(req, res) {
  const date = new Date();

  try {
    const { id } = req.params;
    const updates = req.body;

    const updateAttempt1 = await caseModel.findByIdAndUpdate(
      id,
      {
        $set: {
          attempt1: true,
          attempt1Date: date.toLocaleDateString(),
        },
      },
      { new: true, runValidators: true }
    );

    if (!updateAttempt1) {
      return res.status(404).json({ message: "Case not found" });
    }

    res
      .status(200)
      .json({ message: "Case updated successfully", updateAttempt1 });
  } catch (error) {
    res.status(500).json({ message: "Server error", error: error.message });
  }
}

//update  attempt2
//url :  api/cases/attempt2
export async function updateAttempt2(req, res) {
  const date = new Date();

  try {
    const { id } = req.params;

    const updateAttempt2 = await caseModel.findByIdAndUpdate(
      id,
      {
        $set: {
          attempt2: true,
          attempt2Date: date.toLocaleDateString(),
        },
      },
      { new: true, runValidators: true }
    );

    if (!updateAttempt2) {
      return res.status(404).json({ message: "Case not found" });
    }

    res
      .status(200)
      .json({ message: "Case updated successfully", updateAttempt2 });
  } catch (error) {
    res.status(500).json({ message: "Server error", error: error.message });
  }
}

//update  attempt3
//url :  api/cases/attempt3
export async function updateAttempt3(req, res) {
  const date = new Date();

  try {
    const { id } = req.params;

    const updateAttempt3 = await caseModel.findByIdAndUpdate(
      id,
      {
        $set: {
          attempt3: true,
          attempt3Date: date.toLocaleDateString(),
        },
      },
      { new: true, runValidators: true }
    );

    if (!updateAttempt3) {
      return res.status(404).json({ message: "Case not found" });
    }

    res
      .status(200)
      .json({ message: "Case updated successfully", updateAttempt3 });
  } catch (error) {
    res.status(500).json({ message: "Server error", error: error.message });
  }
}
