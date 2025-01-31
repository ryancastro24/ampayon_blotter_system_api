import mongoose from "mongoose";

const usersSchema = mongoose.Schema(
  {
    username: {
      type: String,
      required: true,
      unique: true,
    },
    password: {
      type: String,
      required: true,
    },
    barangay_code: {
      type: String,
      required: true,
    },

    barangay_name: {
      type: String,
      required: true,
    },
    barangay_captain: {
      type: String,
      required: true,
    },

    barangay_secretary: {
      type: String,
      required: true,
    },
    city_code: {
      type: String,
      required: true,
    },

    city_name: {
      type: String,
      required: true,
    },
    region_code: {
      type: String,
      required: true,
    },

    region_name: {
      type: String,
      required: true,
    },
    barangay_logo: {
      type: String,
    },
  },
  {
    timestamps: true,
  }
);

export default mongoose.model("users", usersSchema);
