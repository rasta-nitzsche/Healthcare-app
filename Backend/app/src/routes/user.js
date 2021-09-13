const { Router } = require("express")
const { authUser, registerUser, getUserProfile } = require("../controllers/user")
const { protect } = require("../middleware/auth")

const router = Router()

/**
 * @description	Register user
 * @route	POST /api/{{VERSION}}/users/
 * @access	Public
 */
router.post("/", registerUser)

/**
 * @description	Auth user & get token
 * @route	POST /api/{{VERSION}}/users/login
 * @access	Public
 */
router.post("/login", authUser)

/**
 * @description	Get user profile
 * @route	GET /api/{{VERSION}}/users/profile
 * @access	Private
 */
router.get("/profile", protect, getUserProfile)

module.exports = router
