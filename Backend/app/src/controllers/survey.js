const asyncHandler = require("express-async-handler")

const Survey = require("../models/survey")

/**
 * @description	Get all surveys
 * @route	GET /api/{{VERSION}}/surveys/all
 * @access Private
 */
const getSurveyList = asyncHandler(async (req, res) => {
  const surveys = await Survey.find()

  res.json(surveys)
})

/**
 * @description	Get survey by id
 * @route	GET /api/{{VERSION}}/surveys/:id
 * @access Private
 */
const getSurveyById = asyncHandler(async (req, res) => {
  const surveyId = req.params.id

  const survey = await Survey.findById(surveyId)

  if (survey) {
    res.json(survey)
  } else {
    res.status(404)
    throw new Error(global.errorMessages.NOT_FOUND)
  }
})

/**
 * @description	Get survey by options (type)
 * @route	GET /api/{{VERSION}}/surveys/
 * @param type Survey type
 * @access Private
 */
const getSurvey = asyncHandler(async (req, res) => {
  const type = req.query.type
  if (!type) {
    res.status(400)
    throw new Error(global.errorMessages.REQUIRED_PARAMETER)
  }

  const survey = await Survey.findOne({
    type,
  })

  if (survey) {
    res.json(survey)
  } else {
    res.status(404)
    throw new Error(global.errorMessages.NOT_FOUND)
  }
})

module.exports = {
  getSurveyList,
  getSurveyById,
  getSurvey,
}
