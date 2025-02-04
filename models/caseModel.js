import mongoose from "mongoose";

const caseSchema = mongoose.Schema(
  {
    case_number: {
      type: Number,
      required: true,
    },
    region_code: {
      type: String,
      required: true,
    },
    city_code: {
      type: String,
      required: true,
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
    barangay_code: {
      type: String,
      required: true,
    },
    complanant_name: {
      type: String,
      required: true,
    },
    complanant_number: {
      type: String,
      required: true,
    },
    respondent_name: {
      type: String,
      required: true,
    },
    respondent_number: {
      type: String,
      required: true,
    },
    complain: {
      type: String,
      required: true,
    },
    appointment_date: {
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
      required: true,
    },
    attempt1: {
      type: Boolean,
      required: true,
      default: false,
    },
    attempt2: {
      type: Boolean,
      required: true,
      default: false,
    },
    attempt3: {
      type: Boolean,
      required: true,
      default: false,
    },
  },
  {
    timestamps: true,
  }
);

export default mongoose.model("cases", caseSchema);
