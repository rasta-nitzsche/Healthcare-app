const asyncHandler = require("express-async-handler")

const User = require("../models/user")
const generateToken = require("../utils/token")

/**
 * @description	Auth user & get token
 * @route	POST /api/{{VERSION}}/users/login
 * @access	Public
 */
const authUser = asyncHandler(async (req, res) => {
  const { username, email, phoneNumber, password } = req.body

  if ((!username && !email && !phoneNumber) || !password) {
    res.status(400)
    throw new Error(global.errorMessages.REQUIRED_PARAMETER)
  }

  const user = await User.findOne({ $or: [{ username }, { email }, { phoneNumber }] })

  if (user && (await user.matchPassword(password))) {
    const token = generateToken(user._id)

    res.json({
      ...user.toJSON(),
      token,
    })
  } else {
    res.status(401)
    throw new Error(global.errorMessages.INVALID_CREDS)
  }
})

/**
 * @description	Register user
 * @route	POST /api/{{VERSION}}/users/
 * @access	Public
 */
const registerUser = asyncHandler(async (req, res) => {
  const { username, firstName, lastName, email, phoneNumber, password } = req.body
  const type = global.userTypes.PATIENT

  const userObj = {
    username,
    firstName,
    lastName,
    email,
    phoneNumber,
    password,
    type,
  }

  const userExists = await User.exists({ $or: [{ username }, { email }, { phoneNumber }] })

  if (userExists) {
    res.status(400)
    throw new Error(global.errorMessages.USER_EXISTS)
  } else {
    const user = User.create(userObj)

    if (user) {
      const token = generateToken(user._id)

      res.status(201).json({
        ...user.toJSON(),
        token,
      })
    } else {
      res.status(400)
      throw new Error(global.errorMessages.INVALID_USER_DATA)
    }
  }
})

/**
 * @description	Get user profile
 * @route	GET /api/{{VERSION}}/users/profile
 * @access	Private
 */
const getUserProfile = asyncHandler(async (req, res) => {
  const id = req.user._id
  const user = await User.findById(id)

  if (user) {
    res.json(user)
  } else {
    res.status(404)
    throw new Error(global.errorMessages.NOT_FOUND)
  }
})

module.exports = {
  authUser,
  registerUser,
  getUserProfile,
}
