const mongoose = require("mongoose")

/* Schema definition */

const surveySchema = mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
    },
    description: {
      type: String,
      required: true,
    },
    type: {
      enum: Object.values(global.surveyTypes),
      type: String,
      default: global.surveyTypes.DEFAULT,
      required: true,
    },
    questions: [
      {
        text: {
          type: String,
          required: true,
        },
        note: {
          type: String,
          required: false,
        },
      },
    ],
  },
  {
    timestamps: true,
  }
)

const Survey = mongoose.model("Survey", surveySchema)

module.exports = Survey
