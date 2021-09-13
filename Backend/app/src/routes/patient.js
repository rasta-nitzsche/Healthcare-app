const { Router } = require("express")
const { getDoctor, getSurveyResultById, getSurveyResultList, postSurveyResult } = require("../controllers/patient")
const { protect, protectPatient } = require("../middleware/auth")

const router = Router()

/**
 * @description	Get doctor
 * @route	GET /api/{{VERSION}}/patient/doctor
 * @access Private
 */
router.get("/doctor", protect, protectPatient, getDoctor)

/**
 * @description	Get survey results
 * @route	GET /api/{{VERSION}}/patient/surveys
 * @access Private
 */
router.route("/surveys").get(protect, protectPatient, getSurveyResultList)

/**
 * @description	Get survey result by id
 * @route	GET /api/{{VERSION}}/patient/surveys/:id
 * @access Private
 */
router.get("/surveys/:id", protect, protectPatient, getSurveyResultById)

/**
 * @description	Submit survey result
 * @route	POST /api/{{VERSION}}/patient/surveys
 * @param surveyId Survey id
 * @param answers Survey answers
 * @access Private
 */
router.route("/surveys").post(protect, protectPatient, postSurveyResult)

module.exports = router
