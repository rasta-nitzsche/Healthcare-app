const asyncHandler = require("express-async-handler")
const { ObjectId } = require("mongoose").Types

const Doctor = require("../models/doctor")
const Patient = require("../models/patient")
const User = require("../models/user")
const SurveyResult = require("../models/surveyResult")

const getDoctorByUserId = async (userId) => {
  const doctor = await Doctor.findOne({
    user: ObjectId(userId),
  })

  return doctor
}

/**
 * @description	Get list of patients
 * @route	GET /api/{{VERSION}}/doctor/patients
 * @access Private
 */
const getPatientList = asyncHandler(async (req, res) => {
  const doctor = await getDoctorByUserId(req.user._id)

  const patients = await Patient.find({
    _id: { $in: doctor.patients.map((patientId) => ObjectId(patientId)) },
  })

  res.json(patients)
})

/**
 * @description	Get patient details
 * @route	GET /api/{{VERSION}}/doctor/patients/:id
 * @access Private
 */
const getPatientById = asyncHandler(async (req, res) => {
  const doctor = await getDoctorByUserId(req.user._id)
  const patientId = req.params.id

  if (!doctor.patients.includes(patientId)) {
    res.status(404)
    throw new Error(global.errorMessages.NOT_FOUND)
  }

  const patient = await Patient.findById(patientId)
  const patientUser = await User.findById(patient.user)
  const patientSurveyResults = await SurveyResult.find({
    _id: { $in: patient.surveyResults.map((surveyResult) => ObjectId(surveyResult)) },
  })

  res.json({
    ...patient.toJSON(),
    user: patientUser,
    surveyResults: patientSurveyResults,
  })
})

module.exports = {
  getPatientList,
  getPatientById,
}
