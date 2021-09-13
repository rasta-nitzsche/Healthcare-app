const { Router } = require("express")
const { getPatientById, getPatientList } = require("../controllers/doctor")
const { protect, protectDoctor } = require("../middleware/auth")

const router = Router()

/**
 * @description	Get list of patients
 * @route	GET /api/{{VERSION}}/doctor/patients
 * @access Private
 */
router.get("/patients", protect, protectDoctor, getPatientList)

/**
 * @description	Get patient details
 * @route	GET /api/{{VERSION}}/doctor/patients/:id
 * @access Private
 */
router.get("/patients/:id", protect, protectDoctor, getPatientById)

module.exports = router
