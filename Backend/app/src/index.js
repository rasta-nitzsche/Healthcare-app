const dotenv = require("dotenv")
dotenv.config()

const registerGlobals = require("./config/globals")
registerGlobals()

const express = require("express")
const { createServer } = require("http")
const cors = require("cors")

const registerLogger = require("./config/logger")
registerLogger()

const connectDatabase = require("./config/db")

const userRoutes = require("./routes/user")
const doctorRoutes = require("./routes/doctor")
const patientRoutes = require("./routes/patient")
const surveyRoutes = require("./routes/survey")

const { notFound, errorHandler } = require("./middleware/errors")

const main = async () => {
  try {
    connectDatabase()

    const app = express()

    /* Register middleware */
    app.use(express.json())
    app.use(cors())

    /* Register routes */
    const routePrefix = global.config.ROUTE_PREFIX
    app.use(`${routePrefix}/users`, userRoutes)
    app.use(`${routePrefix}/doctor`, doctorRoutes)
    app.use(`${routePrefix}/patient`, patientRoutes)
    app.use(`${routePrefix}/surveys`, surveyRoutes)

    /* Register custom middleware */
    app.use(notFound)
    app.use(errorHandler)

    const server = createServer(app)

    server.listen(global.config.NODE_PORT)

    server.on("listening", () => {
      global.logger.info(`Server listening in ${global.config.NODE_ENV} mode on port ${global.config.NODE_PORT}`)
    })

    server.on("close", () => {
      global.logger.info("Server closed")
    })
  } catch (err) {
    global.logger.error(err.stack)
  }
}

main()
