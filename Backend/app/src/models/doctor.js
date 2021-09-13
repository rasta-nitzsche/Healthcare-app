const mongoose = require("mongoose")

/* Schema definition */

const doctorSchema = mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: "User",
    },
    patients: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Patient",
      },
    ],
  },
  {
    timestamps: true,
  }
)

const Doctor = mongoose.model("Doctor", doctorSchema)

module.exports = Doctor
