const mongoose = require("mongoose")

/* Schema definition */

const patientSchema = mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: "User",
    },
    doctor: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Doctor",
    },
    surveyResults: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "SurveyResult",
      },
    ],
  },
  {
    timestamps: true,
  }
)

const Patient = mongoose.model("Patient", patientSchema)

module.exports = Patient
