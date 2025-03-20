import express from "express";
import { connectDB } from "./config/db.js";
import colors from "colors";
import userRoutes from "./routes/userRoutes.js";
import caseRoutes from "./routes/caseRoutes.js";
import authRoutes from "./routes/authRoutes.js";
import cors from "cors";
import { v2 as cloudinary } from "cloudinary";
import { CloudinaryStorage } from "multer-storage-cloudinary";
import multer from "multer";
import caseModel from "./models/caseModel.js";

const app = express();

cloudinary.config({
  cloud_name: process.env.CLOUD_NAME,
  api_key: process.env.CLOUD_API_KEY,
  api_secret: process.env.CLOUD_API_SECRET, // Replace with your Cloudinary API secret
});

// Multer-Cloudinary storage setup
const storage = new CloudinaryStorage({
  cloudinary: cloudinary,
  params: {
    folder: "uploads", // Folder name in Cloudinary
    format: async (req, file) => {
      // Dynamically get file extension
      const fileExtension = file.mimetype.split("/")[1]; // e.g., 'jpeg', 'png', 'pdf'
      return fileExtension;
    },
    public_id: (req, file) => Date.now() + "-" + file.originalname, // Generate unique filename
  },
});

const upload = multer({ storage });

connectDB();
app.use(express.json());

app.use(cors());
app.use("/api/users", userRoutes);
app.use("/api/cases", caseRoutes);
app.use("/api/auth", authRoutes);

app.put(
  "/api/cases/uploadDocumentaryImages/:id",
  upload.single("file"), // Ensure "file" matches the form field name in the frontend
  async (req, res) => {
    try {
      const { id } = req.params;

      console.log("this is the file", req.file);

      // ✅ Check if req.file is received
      if (!req.file) {
        return res.status(400).json({ message: "No file uploaded" });
      }

      console.log("Uploaded File:", req.file); // Debugging

      // Find the case by ID
      const caseToUpdate = await caseModel.findById(id);
      if (!caseToUpdate) {
        return res.status(404).json({ message: "Case not found" });
      }

      // ✅ Upload the file to Cloudinary
      const result = await cloudinary.uploader.upload(req.file.path, {
        folder: "documentation_photos", // Optional: Store in a specific Cloudinary folder
      });

      // ✅ Push the uploaded image URL to documentationPhotos
      caseToUpdate.documentationPhotos.push(result.secure_url);

      // Save the updated case
      await caseToUpdate.save();

      res.status(200).json({
        message: "File uploaded and case updated successfully",
        case: caseToUpdate,
      });
    } catch (error) {
      console.error("Error uploading file:", error);
      res.status(500).json({ message: "Internal Server Error" });
    }
  }
);

app.put(
  "/api/cases/caseForms/:id",
  upload.single("file"), // Ensure "file" matches the form field name in the frontend
  async (req, res) => {
    try {
      const { id } = req.params;

      // ✅ Check if req.file is received
      if (!req.file) {
        return res.status(400).json({ message: "No file uploaded" });
      }

      console.log("Uploaded File:", req.file); // Debugging

      // Find the case by ID
      const caseToUpdate = await caseModel.findById(id);
      if (!caseToUpdate) {
        return res.status(404).json({ message: "Case not found" });
      }

      // ✅ Extract the original filename without extension
      const originalName = path.parse(req.file.originalname).name; // Gets the filename without extension
      const safeFileName = originalName
        .replace(/\s+/g, "_")
        .replace(/[^a-zA-Z0-9_-]/g, ""); // Remove spaces and special chars

      // ✅ Upload to Cloudinary using `public_id` to keep filename
      const result = await cloudinary.uploader.upload(req.file.path, {
        folder: "documentation_photos", // Store in a specific folder
        public_id: safeFileName, // Use cleaned filename as public_id
        resource_type: "auto", // Auto-detect file type
      });

      // ✅ Store the formatted URL
      caseToUpdate.caseForms.push(result.secure_url);

      // Save the updated case
      await caseToUpdate.save();

      res.status(200).json({
        message: "File uploaded and case updated successfully",
        case: caseToUpdate,
      });
    } catch (error) {
      console.error("Error uploading file:", error);
      res.status(500).json({ message: "Internal Server Error" });
    }
  }
);

const port = process.env.PORT;
app.listen(port, () => {
  console.log(`running on port ${port}`);
});
