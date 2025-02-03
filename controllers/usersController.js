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
    barangay_name,
    city_name,
    region_name,
  } = req.body;

  if (
    !username ||
    !password ||
    !barangay_code ||
    !barangay_captain ||
    !city_code ||
    !region_code ||
    !barangay_name ||
    !city_name ||
    !region_name
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
    barangay_name,
    city_name,
    region_name,
  });

  return res.status(200).send({ message: "User Succesfully Created!" });
}

export async function getUsers(req, res) {
  const users = await usersModel.find();

  return res.status(200).send(users);
}

// delete user

export async function deleteUser(req, res) {
  try {
    const { id } = req.params;

    const deletedUser = await usersModel.findByIdAndDelete(id);

    if (!deletedUser) {
      return res.status(404).json({ message: "User not found" });
    }

    res.status(200).json({ message: "User deleted successfully", deletedUser });
  } catch (error) {
    res.status(500).json({ message: "Server error", error: error.message });
  }
}

// update user details

export async function updateUser(req, res) {
  try {
    const { id } = req.params;
    const updates = req.body;

    const updatedUser = await usersModel.findByIdAndUpdate(
      id,
      { $set: updates },
      { new: true, runValidators: true }
    );

    if (!updatedUser) {
      return res.status(404).json({ message: "User not found" });
    }

    res.status(200).json({ message: "User updated successfully", updatedUser });
  } catch (error) {
    res.status(500).json({ message: "Server error", error: error.message });
  }
}
