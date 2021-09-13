const { generateSecret } = require("../utils/misc")

/* Environment variables */
const noUndefined = ["API_VERSION", "MONGO_URI", "JWT_SECRET"]
for (envVar of noUndefined) {
  if (process.env[envVar] === undefined) {
    throw new Error(`${envVar} undefined`)
  }
}

const config = {
  NODE_ENV: process.env.NODE_ENV || "development",
  NODE_PORT: process.env.NODE_PORT || 5000,
  LOG_DIR: process.env.LOG_DIR || "logs",
  ROUTE_PREFIX: `/api/${process.env.API_VERSION}`,
  MONGO_URI: process.env.MONGO_URI,
  JWT_SECRET: process.env.JWT_SECRET || generateSecret(),
  /* 30 days */
  TOKEN_EXPIRESIN: "30d",
}

/* User types */
const userTypes = {
  PATIENT: "patient",
  DOCTOR: "doctor",
  ADMIN: "admin",
}

/* Survey types */
const surveyTypes = {
  COVID: "covid",
  DEFAULT: "default",
}

/* Error messages */
const errorMessages = {
  INVALID_CREDS: "Invalid credentials",
  USER_EXISTS: "User already exists",
  INVALID_USER_DATA: "Invalid user data",
  INVALID_TOKEN: "Invalid token",
  NO_TOKEN: "No token found",
  INVALID_USER: "Invalid user",
  NOT_FOUND: "Resource not found",
  NOT_AUTHORIZED: "Not authorized",
  REQUIRED_PARAMETER: "Required parameter not specified",
  GENERIC_ERROR: "Error",
}

/* Function to register globals */
const registerGlobals = () => {
  global.config = config
  global.userTypes = userTypes
  global.errorMessages = errorMessages
  global.surveyTypes = surveyTypes
}

/* Exports */
module.exports = registerGlobals
