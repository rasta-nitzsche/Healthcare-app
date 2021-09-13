const asyncHandler = require("express-async-handler")
const { ObjectId } = require("mongoose").Types

const Patient = require("../models/patient")
const Doctor = require("../models/doctor")
const Survey = require("../models/survey")
const SurveyResult = require("../models/surveyResult")
const User = require("../models/user")

const getPatientByUserId = async (userId) => {
  const patient = await Patient.findOne({
    user: ObjectId(userId),
  })

  return patient
}

/**
 * @description	Get doctor
 * @route	GET /api/{{VERSION}}/patient/doctor
 * @access Private
 */
const getDoctor = asyncHandler(async (req, res) => {
  const patient = await getPatientByUserId(req.user._id)

  const doctor = await Doctor.findById(patient.doctor)
  const doctorUser = await User.findById(doctor.user)

  res.json({
    ...doctor.toJSON(),
    user: doctorUser,
  })
})

/**
 * @description	Get survey results
 * @route	GET /api/{{VERSION}}/patient/surveys
 * @access Private
 */
const getSurveyResultList = asyncHandler(async (req, res) => {
  const patient = await getPatientByUserId(req.user._id)

  const surveyResults = await SurveyResult.find({
    _id: { $in: patient.surveyResults.map((surveyResultId) => ObjectId(surveyResultId)) },
  })

  res.json(surveyResults)
})

/**
 * @description	Get survey result by id
 * @route	GET /api/{{VERSION}}/patient/surveys/:id
 * @access Private
 */
const getSurveyResultById = asyncHandler(async (req, res) => {
  const patient = await getPatientByUserId(req.user._id)
  const surveyResultId = req.params.id

  if (!patient.surveyResults.includes(surveyResultId)) {
    res.status(404)
    throw new Error(global.errorMessages.NOT_FOUND)
  }

  const surveyResult = await SurveyResult.findById(surveyResultId)

  res.json(surveyResult)
})

/**
 * @description	Submit survey result
 * @route	POST /api/{{VERSION}}/patient/surveys
 * @param surveyId Survey id
 * @param answers Survey answers
 * @access Private
 */
const postSurveyResult = asyncHandler(async (req, res) => {
  const { surveyId, answers } = req.body
  console.log("answers")
  console.log(answers)
  if (!surveyId || !answers) {
    res.status(400)
    throw new Error(global.errorMessages.REQUIRED_PARAMETER)
  }

  const surveyExists = Survey.exists({
    _id: surveyId,
  })

  if (!surveyExists) {
    res.status(404)
    throw new Error(global.errorMessages.NOT_FOUND)
  }

  const patient = await getPatientByUserId(req.user._id)

  // surveyResult = new SurveyResult()
  // surveyResult.patient = ObjectId(patient._id)
  // surveyResult.survey = ObjectId(surveyId)
  // surveyResult.answers = answers
  // const createdSurveyResult = await surveyResult.save()
  const createdSurveyResult = await SurveyResult.create({
    patient: ObjectId(patient._id),
    survey: ObjectId(surveyId),
    answers,
  })
  console.log("createdSurveyResult")
  console.log(createdSurveyResult)
  console.log("createdSurveyResult.answers")
  console.log(createdSurveyResult.answers)
  // for (let i = 0; i < answers.length; i++) {
  //   const answer = createdSurveyResult[i]
  //   createdSurveyResult
  // }
  // createdSurveyResult.answers = createdSurveyResult.answers.map((answer, i) => {
  //   return {
  //     ...answer,
  //     answer: answers[i].answer,
  //   }
  // })
  // createdSurveyResult.markModified("answers")
  // const foo = await createdSurveyResult.save()
  // console.log("foo")
  // console.log(foo)

  await Patient.findByIdAndUpdate(patient._id, {
    surveyResults: [...patient.surveyResults, ObjectId(createdSurveyResult._id)],
  })

  res.status(204).send()
})

module.exports = {
  getDoctor,
  getSurveyResultList,
  getSurveyResultById,
  postSurveyResult,
}
