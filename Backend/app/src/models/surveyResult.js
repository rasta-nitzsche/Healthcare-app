const mongoose = require("mongoose")

/* Schema definition */

const surveyResultSchema = mongoose.Schema(
  {
    patient: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: "Patient",
    },
    survey: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Survey",
    },
    answers: [Boolean],
  },
  {
    timestamps: true,
  }
)

const SurveyResult = mongoose.model("SurveyResult", surveyResultSchema)

module.exports = SurveyResult
