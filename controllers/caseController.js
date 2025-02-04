import caseModel from "../models/caseModel.js";

export async function getCases(req, res) {
  const cases = await caseModel.find();
  return res.status(200).send(cases);
}

export async function addCase(req, res) {
  const {
    case_number,
    region_code,
    city_code,
    barangay_code,
    complanant_name,
    complanant_number,
    respondent_name,
    respondent_number,
    complain,
    appointment_date,
    barangay_captain,
    barangay_secretary,
    status,
    region_name,
    city_name,
    barangay_name,
  } = req.body;

  // if there are missing fields  return an error response
  if (
    !case_number ||
    !region_code ||
    !city_code ||
    !barangay_code ||
    !complanant_name ||
    !complanant_number ||
    !respondent_name ||
    !respondent_number ||
    !complain ||
    !appointment_date ||
    !barangay_captain ||
    !barangay_secretary ||
    !status ||
    !region_name ||
    !city_name ||
    !barangay_name
  ) {
    return res.status(400).send({ error: "Missing Fields" });
  }

  // create the case in the database

  const casedata = await caseModel.create(req.body);

  return res.status(200).send(casedata);
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
