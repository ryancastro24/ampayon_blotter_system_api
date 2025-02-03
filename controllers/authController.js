import usersModel from "../models/usersModel.js";
import jwt from "jsonwebtoken";
import bcrypt from "bcryptjs";
export async function loginUser(req, res) {
  const { username, password } = req.body;

  const user = await usersModel.findOne({ username: username });

  if (!user) {
    return res.status(200).json({ error: "User doesnt exist!" });
  }
  const isCorrectPassword = await bcrypt.compare(password, user.password);

  if (user && isCorrectPassword) {
    return res.status(200).json({
      id: user._id,
      name: user.name,
      token: generateToken(user._id),
    });
  } else {
    return res.status(200).json({ error: "Incorrect password" });
  }
}

const generateToken = (id) => {
  return jwt.sign({ id }, process.env.JWT_SECRET, {
    expiresIn: "5h", // Example expiration
  });
};
