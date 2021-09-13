const mongoose = require("mongoose")

const connectDatabase = async () => {
  try {
    const conn = await mongoose.connect(global.config.MONGO_URI, {
      useUnifiedTopology: true,
      useNewUrlParser: true,
      useCreateIndex: true,
      useFindAndModify: false,
    })

    global.logger.info(`MongoDB connected: ${conn.connection.host}`)
  } catch (err) {
    global.logger.error(`Error: ${err.message}`)
    process.exit(1)
  }
}

module.exports = connectDatabase
