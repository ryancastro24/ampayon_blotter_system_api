import mongoose from "mongoose";

const usersSchema = mongoose.Schema(
  {
    username: {
      type: String,
    },
    password: {
      type: String,
    },
    barangay_code: {
      type: String,
    },
    barangay_name: {
      type: String,
    },
    barangay_captain: {
      type: String,
    },

    barangay_captain_contact_number: {
      type: String,
    },
    barangay_secretary: {
      type: String,
    },

    barangay_secretary_contact_number: {
      type: String,
    },

    barangay_email: {
      type: String,
    },
    city_code: {
      type: String,
    },

    city_name: {
      type: String,
    },
    province_name: {
      type: String,
    },

    province_code: {
      type: String,
    },

    region_code: {
      type: String,
    },

    region_name: {
      type: String,
    },

    barangay_logo: {
      type: String,
    },

    userType: {
      type: String,
      default: "user",
    },
  },
  {
    timestamps: true,
  }
);

export default mongoose.model("users", usersSchema);
