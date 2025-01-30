import caseModel from "../models/caseModel.js";

export async function getCases(req, res) {
  const cases = await caseModel.find();
  return res.status(200).send(cases);
}

export async function addCase(req, res) {
  const {
    case_number,
    province_code,
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
  } = req.body;

  // if there are missing fields  return an error response
  if (
    !case_number ||
    !province_code ||
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
    !status
  ) {
    return res.status(400).send({ error: "Missing Fields" });
  }

  // create the case in the database

  const casedata = await caseModel.create(req.body);

  return res.status(200).send(casedata);
}
