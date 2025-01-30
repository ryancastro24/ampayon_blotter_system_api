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
    barangay_captain: {
      type: String,
      required: true,
    },
    city_code: {
      type: String,
      required: true,
    },
    province_code: {
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
