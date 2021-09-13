const dotenv = require("dotenv")
dotenv.config()

const registerGlobals = require("./config/globals")
registerGlobals()

const registerLogger = require("./config/logger")
registerLogger()

const doctors = require("../data/doctors")
const patients = require("../data/patients")
const survey = require("../data/survey")

const User = require("./models/user")
const Doctor = require("./models/doctor")
const Patient = require("./models/patient")
const Survey = require("./models/survey")
const SurveyResult = require("./models/surveyResult")

// const { zip } = require("./utils/misc")

const connectDatabase = require("./config/db")

connectDatabase()

const deleteData = async () => {
  try {
    await User.deleteMany()
    await Doctor.deleteMany()
    await Patient.deleteMany()
    await Survey.deleteMany()
    await SurveyResult.deleteMany()
  } catch (err) {
    global.logger.error(err)
    process.exit(1)
  }
}

const importData = async () => {
  await deleteData()

  try {
    /* Create users */
    const users = [...doctors, ...patients].map((x) => x.user)
    const createdUsers = []
    for (const user of users) {
      createdUsers.push(await User.create(user))
    }

    /* Create doctors */
    const createdDoctors = []
    for (let i = 0; i < 2; i++) {
      const createdDoctor = await Doctor.create({
        user: createdUsers[i]._id,
      })
      createdDoctors.push(createdDoctor)
    }

    /* Create patients */
    const createdPatients = []
    for (let i = 2; i < 5; i++) {
      const createdPatient = await Patient.create({
        user: createdUsers[i]._id,
      })
      createdPatients.push(createdPatient)
    }

    /* Assign doctors to patients */
    createdPatients[0].doctor = createdDoctors[0]._id
    createdPatients[1].doctor = createdDoctors[0]._id
    createdPatients[2].doctor = createdDoctors[1]._id
    for (const patient of createdPatients) {
      await Patient.findByIdAndUpdate(patient._id, patient)
    }

    /* Assign patients to doctors */
    createdDoctors[0].patients = [createdPatients[0]._id, createdPatients[1]._id]
    createdDoctors[1].patients = [createdPatients[2]._id]
    for (const doctor of createdDoctors) {
      await Doctor.findByIdAndUpdate(doctor._id, doctor)
    }

    /* Create COVID survey */
    await Survey.create(survey)

    // const createdUsersIds = createdUsers.map((user) => user._id)
    // const usersWithIds = zip([...doctors, ...patients], createdUsersIds)
    // usersWithIds.forEach((userWithId) => {
    //   const [user, id] = userWithId
    //   const models

    //   models[global.userTypes.DOCTOR] = Doctor
    //   models[global.userTypes.PATIENT] = Patient

    //   const createdUser = models[user.type].create
    // })

    logger.info("Data imported")
    process.exit()
  } catch (err) {
    logger.error(err)
    process.exit(1)
  }
}

const destroyData = async () => {
  await deleteData()

  logger.info("Data destroyed")
  process.exit()
}

const showData = async () => {
  const users = await User.find()
  const doctors = await Doctor.find()
  const patients = await Patient.find()
  const survey = await Survey.findOne()

  logger.info("Users:")
  console.log(users)
  logger.info("Doctors:")
  console.log(doctors)
  logger.info("Patients:")
  console.log(patients)
  logger.info("Survey:")
  console.log(survey)

  process.exit()
}

switch (process.argv[2]) {
  case "-d":
    destroyData()
    break
  case "-s":
    showData()
    break
  default:
    importData()
}
