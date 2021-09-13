const asyncHandler = require("express-async-handler")
const jwt = require("jsonwebtoken")
const { ObjectId } = require("mongoose").Types

const User = require("../models/user")
const Doctor = require("../models/doctor")
const Patient = require("../models/patient")

const protect = asyncHandler(async (req, res, next) => {
  let token
  const authorizationHeader = req.headers.authorization

  if (authorizationHeader && authorizationHeader.startsWith("Bearer ")) {
    try {
      token = authorizationHeader.split(" ")[1]

      const decoded = jwt.verify(token, global.config.JWT_SECRET)

      req.user = await User.findById(decoded.id)

      next()
    } catch (err) {
      global.logger.error(err)
      res.status(401)
      throw new Error(global.errorMessages.INVALID_TOKEN)
    }
  }

  if (!token) {
    res.status(401)
    throw new Error(global.errorMessages.NO_TOKEN)
  }
})

/* Requires `protect` */
const protectDoctor = asyncHandler(async (req, res, next) => {
  const userId = req.user._id
  const doctorExists = await Doctor.exists({
    user: ObjectId(userId),
  })

  if (doctorExists) {
    next()
  } else {
    res.status(401)
    throw new Error(global.errorMessages.NOT_AUTHORIZED)
  }
})

/* Requires `protect` */
const protectPatient = asyncHandler(async (req, res, next) => {
  const userId = req.user._id
  const patientExists = await Patient.exists({
    user: ObjectId(userId),
  })

  if (patientExists) {
    next()
  } else {
    res.status(401)
    throw new Error(global.errorMessages.NOT_AUTHORIZED)
  }
})

module.exports = {
  protect,
  protectDoctor,
  protectPatient,
}
