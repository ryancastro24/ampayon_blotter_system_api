import caseModel from "../models/caseModel.js";
import mongoose from "mongoose";
const { ObjectId } = mongoose.Types;
export async function getCases(req, res) {
  const cases = await caseModel.find();
  return res.status(200).send(cases);
}

// get all cases
export async function getAllCasesPerBarangay(req, res) {
  const id = req.params.id;
  const userId = new ObjectId(id);
  const cases = await caseModel.find({ userId: userId });
  return res.status(200).send(cases);
}

// get all cases that are still ongoing
export async function getSpecificCases(req, res) {
  const id = req.params.id;
  const userId = new ObjectId(id);
  const cases = await caseModel.find({ userId: userId, status: "ongoing" });
  return res.status(200).send(cases);
}

// get all cases that are failed or settled
export async function getSpecificCasesSettledOrFailed(req, res) {
  try {
    const id = req.params.id;
    const userId = new ObjectId(id);

    const cases = await caseModel.find({
      userId: userId,
      status: { $in: ["settled", "failed"] }, // Match either "settled" or "failed"
    });

    return res.status(200).json(cases);
  } catch (error) {
    console.error("Error fetching cases:", error);
    return res.status(500).json({ message: "Internal Server Error" });
  }
}

export async function getCasesGroupedByUser(req, res) {
  try {
    const cases = await caseModel.aggregate([
      {
        $group: {
          _id: "$userId",
          ongoingCase: {
            $sum: { $cond: [{ $eq: ["$status", "ongoing"] }, 1, 0] },
          },
          failedCase: {
            $sum: { $cond: [{ $eq: ["$status", "failed"] }, 1, 0] },
          },
          settledCase: {
            $sum: { $cond: [{ $eq: ["$status", "settled"] }, 1, 0] },
          },
          totalCases: { $sum: 1 },
        },
      },
      {
        $lookup: {
          from: "users",
          localField: "_id", // Use `_id` directly since it's already an ObjectId
          foreignField: "_id",
          as: "userDetails",
        },
      },
      {
        $unwind: {
          path: "$userDetails",
          preserveNullAndEmptyArrays: true, // Keeps results even if user not found
        },
      },
      {
        $project: {
          _id: 0,
          userId: "$_id",
          ongoingCase: 1,
          failedCase: 1,
          settledCase: 1,
          totalCases: 1,
          userDetails: {
            barangay_name: "$userDetails.barangay_name",
            city_name: "$userDetails.city_name",
          },
        },
      },
    ]);

    return res.status(200).json(cases);
  } catch (error) {
    console.error("Error fetching cases:", error);
    return res.status(500).json({ error: "Internal Server Error" });
  }
}

export async function addCase(req, res) {
  const {
    complainant_name,
    respondent_name,
    case_description,
    barangay_captain,
    barangay_secretary,
    region_name,
    city_name,
    barangay_name,
    userId,
    case_type,
  } = req.body;

  // if there are missing fields  return an error response

  if (
    !complainant_name ||
    !respondent_name ||
    !case_description ||
    !barangay_captain ||
    !barangay_secretary ||
    !region_name ||
    !city_name ||
    !barangay_name ||
    !userId ||
    !case_type
  ) {
    return res.status(400).send({ error: "Missing Fields" });
  }

  // create the case in the database

  const casedata = await caseModel.create(req.body);

  return res.status(200).send(casedata);
}

// get specific case only
// url = api/cases/getSpecificCaseOnly/:id
//method = GET
export async function getSpecificCaseOnly(req, res) {
  const { id } = req.params;

  const caseData = await caseModel.findById(id);

  if (!caseData) {
    return res.status(400).send({ error: "No Case Exist!" });
  }
  return res.status(200).send(caseData);
}

export async function updateCase(req, res) {
  try {
    const { id } = req.params;
    const updates = req.body;

    const updatedCases = await caseModel.findByIdAndUpdate(
      id,
      { $set: updates },
      { new: true, runValidators: true }
    );

    if (!updatedCases) {
      return res.status(404).json({ message: "User not found" });
    }

    res
      .status(200)
      .json({ message: "Case updated successfully", updatedCases });
  } catch (error) {
    res.status(500).json({ message: "Server error", error: error.message });
  }
}

export async function deleteCase(req, res) {
  try {
    const { id } = req.params;

    const deletedCase = await caseModel.findByIdAndDelete(id);

    if (!deletedCase) {
      return res.status(404).json({ message: "User not found" });
    }

    res.status(200).json({ message: "User deleted successfully", deletedCase });
  } catch (error) {
    res.status(500).json({ message: "Server error", error: error.message });
  }
}

//update  attempt1
//url :  api/cases/attempt1
export async function updateAttempt1(req, res) {
  const date = new Date();

  try {
    const { id } = req.params;
    const updates = req.body;

    const updateAttempt1 = await caseModel.findByIdAndUpdate(
      id,
      {
        $set: {
          attempt1: true,
          attempt1Date: date.toLocaleDateString(),
        },
      },
      { new: true, runValidators: true }
    );

    if (!updateAttempt1) {
      return res.status(404).json({ message: "Case not found" });
    }

    res
      .status(200)
      .json({ message: "Case updated successfully", updateAttempt1 });
  } catch (error) {
    res.status(500).json({ message: "Server error", error: error.message });
  }
}

//update  attempt2
//url :  api/cases/attempt2
export async function updateAttempt2(req, res) {
  const date = new Date();

  try {
    const { id } = req.params;

    const updateAttempt2 = await caseModel.findByIdAndUpdate(
      id,
      {
        $set: {
          attempt2: true,
          attempt2Date: date.toLocaleDateString(),
        },
      },
      { new: true, runValidators: true }
    );

    if (!updateAttempt2) {
      return res.status(404).json({ message: "Case not found" });
    }

    res
      .status(200)
      .json({ message: "Case updated successfully", updateAttempt2 });
  } catch (error) {
    res.status(500).json({ message: "Server error", error: error.message });
  }
}

//update  attempt3
//url :  api/cases/attempt3
export async function updateAttempt3(req, res) {
  const date = new Date();

  try {
    const { id } = req.params;

    const updateAttempt3 = await caseModel.findByIdAndUpdate(
      id,
      {
        $set: {
          attempt3: true,
          attempt3Date: date.toLocaleDateString(),
        },
      },
      { new: true, runValidators: true }
    );

    if (!updateAttempt3) {
      return res.status(404).json({ message: "Case not found" });
    }

    res
      .status(200)
      .json({ message: "Case updated successfully", updateAttempt3 });
  } catch (error) {
    res.status(500).json({ message: "Server error", error: error.message });
  }
}

// get cases but groupped

export async function getGroupCases(req, res) {
  try {
    const id = req.params.id;
    const userId = new ObjectId(id);

    // Aggregate and count cases based on their status
    const cases = await caseModel.aggregate([
      { $match: { userId: userId } }, // Filter by user ID
      {
        $group: {
          _id: "$status", // Group by status
          count: { $sum: 1 }, // Count cases per status
        },
      },
    ]);

    // Default data with preset colors
    const response = [
      { id: 0, value: 0, label: "Failed", color: "#F44336" },
      { id: 1, value: 0, label: "Ongoing", color: "#FF9800" },
      { id: 2, value: 0, label: "Settled", color: "#4CAF50" },
    ];

    // Map aggregation results into the response array
    cases.forEach((group) => {
      const index = response.findIndex(
        (item) => item.label.toLowerCase() === group._id
      );
      if (index !== -1) {
        response[index].value = group.count;
      }
    });

    return res.status(200).json(response);
  } catch (error) {
    console.error("Error fetching case counts:", error);
    return res.status(500).json({ message: "Internal Server Error" });
  }
}

// get permonth cases

export async function getPermonthCases(req, res) {
  try {
    const id = req.params.id;
    const userId = new ObjectId(id);

    // Get current month (1-12)
    const currentMonth = new Date().getMonth() + 1;

    // Define month ranges based on current month
    const isFirstHalf = currentMonth <= 6;
    const monthRange = isFirstHalf
      ? [1, 2, 3, 4, 5, 6] // Jan - Jun
      : [7, 8, 9, 10, 11, 12]; // Jul - Dec

    const monthLabels = {
      1: "Jan",
      2: "Feb",
      3: "Mar",
      4: "Apr",
      5: "May",
      6: "Jun",
      7: "Jul",
      8: "Aug",
      9: "Sep",
      10: "Oct",
      11: "Nov",
      12: "Dec",
    };

    // Aggregate cases grouped by month
    const cases = await caseModel.aggregate([
      { $match: { userId: userId } },
      {
        $group: {
          _id: { $month: "$createdAt" }, // Group by month
          count: { $sum: 1 },
        },
      },
    ]);

    // Default data structure with 0 cases for each selected month range
    const caseData = monthRange.map((month) => ({
      label: monthLabels[month],
      value: 0,
    }));

    // Map aggregation results to the correct month in the range
    cases.forEach((group) => {
      const index = monthRange.indexOf(group._id);
      if (index !== -1) {
        caseData[index].value = group.count;
      }
    });

    const response = {
      xAxis: [
        {
          id: "barCategories",
          data: caseData.map((entry) => entry.label), // Extract month names
          scaleType: "band",
        },
      ],
      series: [
        {
          data: caseData.map((entry) => entry.value), // Extract case counts
          color: "#2196F3",
        },
      ],
      width: 500,
      height: 300,
    };

    return res.status(200).json(response);
  } catch (error) {
    console.error("Error fetching per-month case counts:", error);
    return res.status(500).json({ message: "Internal Server Error" });
  }
}

export const getCasesGroupedByMonthAndBarangay = async (req, res) => {
  try {
    const cases = await caseModel.aggregate([
      {
        $group: {
          _id: {
            month: { $month: "$createdAt" },
            barangay: "$barangay_name",
          },
          count: { $sum: 1 },
        },
      },
      {
        $sort: { "_id.month": 1 },
      },
    ]);

    // Formatting the result into a structured object
    const groupedCases = {};
    cases.forEach(({ _id, count }) => {
      const monthName = new Date(2025, _id.month - 1).toLocaleString("en-US", {
        month: "long",
      });

      if (!groupedCases[monthName]) {
        groupedCases[monthName] = {};
      }
      groupedCases[monthName][_id.barangay] = count;
    });

    res.status(200).json({ success: true, data: groupedCases });
  } catch (error) {
    console.error("Error fetching cases:", error);
    res.status(500).json({ success: false, message: "Server error" });
  }
};
export async function getCasesGroupedByBarangay(req, res) {
  try {
    const cases = await caseModel.aggregate([
      {
        $group: {
          _id: "$barangay_name", // Group by barangay_name
          failed: { $sum: { $cond: [{ $eq: ["$status", "failed"] }, 1, 0] } },
          settled: { $sum: { $cond: [{ $eq: ["$status", "settled"] }, 1, 0] } },
          ongoing: { $sum: { $cond: [{ $eq: ["$status", "ongoing"] }, 1, 0] } },
        },
      },
      {
        $match: {
          $or: [
            { failed: { $gt: 0 } },
            { settled: { $gt: 0 } },
            { ongoing: { $gt: 0 } },
          ],
        },
      },
      {
        $project: {
          _id: 0, // Exclude _id field
          barangay_name: "$_id", // Rename _id to barangay_name
          failed: 1,
          settled: 1,
          ongoing: 1,
        },
      },
      { $sort: { barangay_name: 1 } }, // Sort by barangay_name alphabetically
    ]);

    if (!cases.length) {
      return res.status(400).json({ error: "No Cases Exist!" });
    }

    return res.status(200).json(cases);
  } catch (error) {
    return res
      .status(500)
      .json({ error: "Internal Server Error", details: error.message });
  }
}

export async function getAllCasesStatus(req, res) {
  try {
    const totalCases = await caseModel.aggregate([
      {
        $group: {
          _id: null, // Merge all data into one
          total_failed: {
            $sum: { $cond: [{ $eq: ["$status", "failed"] }, 1, 0] },
          },
          total_settled: {
            $sum: { $cond: [{ $eq: ["$status", "settled"] }, 1, 0] },
          },
          total_ongoing: {
            $sum: { $cond: [{ $eq: ["$status", "ongoing"] }, 1, 0] },
          },
        },
      },
      {
        $project: {
          _id: 0, // Exclude _id field
          total_failed: 1,
          total_settled: 1,
          total_ongoing: 1,
        },
      },
    ]);

    if (!totalCases.length) {
      return res.status(400).json({ error: "No Cases Exist!" });
    }

    return res.status(200).json(totalCases[0]); // Return a single object, not an array
  } catch (error) {
    return res
      .status(500)
      .json({ error: "Internal Server Error", details: error.message });
  }
}

export async function getAllCasesPerMonth(req, res) {
  try {
    const casesPerMonth = await caseModel.aggregate([
      {
        $group: {
          _id: {
            year: { $year: "$createdAt" }, // Extract year from createdAt
            month: { $month: "$createdAt" }, // Extract month from createdAt
          },
          failed: { $sum: { $cond: [{ $eq: ["$status", "failed"] }, 1, 0] } },
          settled: { $sum: { $cond: [{ $eq: ["$status", "settled"] }, 1, 0] } },
          ongoing: { $sum: { $cond: [{ $eq: ["$status", "ongoing"] }, 1, 0] } },
        },
      },
      {
        $project: {
          _id: 0, // Exclude _id field
          month: "$_id.month",
          year: "$_id.year",
          failed: 1,
          settled: 1,
          ongoing: 1,
        },
      },
      { $sort: { year: 1, month: 1 } }, // Sort by year and month
    ]);

    if (!casesPerMonth.length) {
      return res.status(400).json({ error: "No Cases Exist!" });
    }

    return res.status(200).json(casesPerMonth);
  } catch (error) {
    return res
      .status(500)
      .json({ error: "Internal Server Error", details: error.message });
  }
}

export const removeCaseForm = async (req, res) => {
  try {
    const { caseId, itemUrl } = req.body;

    // Find the case and update it
    const updatedCase = await caseModel.findByIdAndUpdate(
      caseId,
      { $pull: { caseForms: itemUrl } },
      { new: true }
    );

    if (!updatedCase) {
      return res.status(404).json({ message: "Case not found" });
    }

    res.status(200).json({
      message: "Case form removed successfully",
      updatedArray: updatedCase.caseForms,
    });
  } catch (error) {
    console.error("Error removing case form:", error);
    res.status(500).json({
      message: "Error removing case form",
      error: error.message,
    });
  }
};

export const removeDocumentationPhotos = async (req, res) => {
  try {
    const { caseId, photoUrls } = req.body;

    console.log(photoUrls);

    if (!Array.isArray(photoUrls)) {
      return res.status(400).json({
        message: "photoUrls must be an array of URLs to remove",
      });
    }

    // Find the case and update it
    const updatedCase = await caseModel.findByIdAndUpdate(
      caseId,
      { $pull: { documentationPhotos: { $in: photoUrls } } },
      { new: true }
    );

    if (!updatedCase) {
      return res.status(404).json({ message: "Case not found" });
    }

    res.status(200).json({
      message: "Documentation photos removed successfully",
      updatedArray: updatedCase.documentationPhotos,
    });
  } catch (error) {
    console.error("Error removing documentation photos:", error);
    res.status(500).json({
      message: "Error removing documentation photos",
      error: error.message,
    });
  }
};
