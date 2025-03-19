import usersModel from "../models/usersModel.js";
import bcrypt from "bcryptjs";

export async function getUserDetails(req, res) {
  const { id } = req.params;

  const user = await usersModel.findById(id);

  console.log(user);

  return res.status(200).send(user);
}

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
    province_name,
    province_code,
    city_name,
    barangay_captain_contact_number,
    barangay_secretary_contact_number,
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
    !region_name ||
    !province_name ||
    !province_code
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
    province_name,
    province_code,
    barangay_secretary,
    barangay_name,
    city_name,
    region_name,
    barangay_secretary_contact_number,
    barangay_captain_contact_number,
  });

  return res.status(200).send({ message: "User Succesfully Created!" });
}

export async function getUsers(req, res) {
  try {
    const users = await usersModel.aggregate([
      {
        $match: { userType: "user" }, // Get only users with userType "user"
      },
      {
        $lookup: {
          from: "cases", // Collection storing cases
          localField: "_id", // Match users._id
          foreignField: "userId", // Match cases.userId
          as: "cases", // Store results in `cases` array
        },
      },
      {
        $addFields: {
          ongoingCase: {
            $size: {
              $filter: {
                input: "$cases",
                as: "case",
                cond: { $eq: ["$$case.status", "ongoing"] },
              },
            },
          },
          failedCase: {
            $size: {
              $filter: {
                input: "$cases",
                as: "case",
                cond: { $eq: ["$$case.status", "failed"] },
              },
            },
          },
          settledCase: {
            $size: {
              $filter: {
                input: "$cases",
                as: "case",
                cond: { $eq: ["$$case.status", "settled"] },
              },
            },
          },
          totalCases: { $size: "$cases" }, // Count all cases
        },
      },
      {
        $project: {
          _id: 1,
          barangay_name: 1,
          username: 1,
          region_name: 1,
          city_name: 1,
          barangay_code: 1,
          city_code: 1,
          region_code: 1,
          region_name: 1,
          userType: 1,
          barangay_captain: 1,
          barangay_secretary: 1,
          createdAt: 1,
          updatedAt: 1,
          ongoingCase: 1,
          failedCase: 1,
          settledCase: 1,
          totalCases: 1,
        },
      },
    ]);

    return res.status(200).json(users);
  } catch (error) {
    console.error("Error fetching users with cases:", error);
    return res.status(500).json({ error: "Internal Server Error" });
  }
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
    let updates = req.body;

    // Filter out empty values
    Object.keys(updates).forEach((key) => {
      if (
        updates[key] === "" ||
        updates[key] === null ||
        updates[key] === undefined
      ) {
        delete updates[key];
      }
    });

    // If a password is provided and is not empty, hash it
    if (updates.password) {
      const saltRounds = 10;
      updates.password = await bcrypt.hash(updates.password, saltRounds);
    }

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
