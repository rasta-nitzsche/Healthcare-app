const { Router } = require("express")
const { getSurvey, getSurveyById, getSurveyList } = require("../controllers/survey")
const { protect } = require("../middleware/auth")

const router = Router()

/**
 * @description	Get all surveys
 * @route	GET /api/{{VERSION}}/surveys/all
 * @access Private
 */
router.get("/all", protect, getSurveyList)

/**
 * @description	Get survey by id
 * @route	GET /api/{{VERSION}}/surveys/:id
 * @access Private
 */
router.get("/:id", protect, getSurveyById)

/**
 * @description	Get survey by options (type)
 * @route	GET /api/{{VERSION}}/surveys/
 * @param type Survey type
 * @access Private
 */
router.get("/", protect, getSurvey)

module.exports = router
