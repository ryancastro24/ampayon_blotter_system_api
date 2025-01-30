import express from "express";
import { connectDB } from "./config/db.js";
import colors from "colors";
import userRoutes from "./routes/userRoutes.js";
import caseRoutes from "./routes/caseRoutes.js";
import authRoutes from "./routes/authRoutes.js";
import cors from "cors";
const app = express();
app.use(cors());
app.use(express.json());
app.use("/api/users", userRoutes);
app.use("/api/cases", caseRoutes);
app.use("/api/auth", authRoutes);

connectDB();
const port = process.env.PORT;
app.listen(port, () => {
  console.log(`running on port ${port}`);
});
