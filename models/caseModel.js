import mongoose from "mongoose";
import AutoIncrement from "mongoose-sequence"; // Import the package
const caseSchema = mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "users", // Reference to the users collection
      required: true, // Ensure a user is associated with the case
    },
    case_number: {
      type: Number,
      unique: true, // Ensure uniqueness
    },
    barangay_name: {
      type: String,
      required: true,
    },
    region_name: {
      type: String,
      required: true,
    },

    city_name: {
      type: String,
      required: true,
    },
    complainant_name: {
      type: String,
      required: true,
    },
    complainant_number: {
      type: String,
      default: "No Number Available",
    },

    complainant_email: {
      type: String,
      default: "No Email Available",
    },

    complainant_profile_picture: {
      type: String,
    },
    complainant_address: {
      type: String,
    },
    respondent_name: {
      type: String,
      required: true,
    },
    respondent_number: {
      type: String,
      default: "No Number Available",
    },
    respondent_email: {
      type: String,
      default: "No Email Available",
    },
    respondent_address: {
      type: String,
    },
    respondent_profile_picture: {
      type: String,
    },
    case_description: {
      type: String,
      required: true,
    },

    documentationPhotos: {
      type: [String], // Array of string URLs
      default: [], // Default empty array
    },
    caseForms: {
      type: [String], // Array of string URLs
      default: [], // Default empty array
    },
    case_type: {
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

    status: {
      type: String,
      default: "ongoing",
    },
    attempt1: {
      type: Boolean,
      default: false,
    },
    attempt1Date: {
      type: String,
    },
    attempt2: {
      type: Boolean,
      default: false,
    },

    attempt2Date: {
      type: String,
    },
    attempt3: {
      type: Boolean,
      default: false,
    },
    attempt3Date: {
      type: String,
    },
    date_filed: {
      type: String,
    },
    date_of_settlement: {
      type: String,
    },

    nature_of_the_case: {
      type: String,
    },
    point_of_agreement: {
      type: String,
    },
    status_of_agreement: {
      type: String,
    },
    remarks: {
      type: String,
    },
  },
  {
    timestamps: true,
  }
);

caseSchema.plugin(AutoIncrement(mongoose), { inc_field: "case_number" });
export default mongoose.model("cases", caseSchema);
