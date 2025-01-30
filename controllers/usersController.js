import usersModel from "../models/usersModel.js";
import bcrypt from "bcryptjs";
export async function addUser(req, res) {
  const {
    username,
    password,
    barangay_code,
    barangay_captain,
    city_code,
    region_code,
    barangay_secretary,
  } = req.body;

  if (
    !username ||
    !password ||
    !barangay_code ||
    !barangay_captain ||
    !city_code ||
    !region_code
  ) {
    return res.status(400).send({ error: "Missing Fields" });
  }

  const salt = await bcrypt.genSalt(10);
  const hashedPassword = await bcrypt.hash(password, salt);

  const user = await usersModel.create({
    username,
    password: hashedPassword,
    barangay_code,
    barangay_captain,
    city_code,
    region_code,
    barangay_secretary,
  });

  return res.status(200).send({ message: "User Succesfully Created!" });
}

export async function getUsers(req, res) {
  const users = await usersModel.find();

  return res.status(200).send(users);
}
