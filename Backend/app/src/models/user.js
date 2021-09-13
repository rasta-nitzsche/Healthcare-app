const mongoose = require("mongoose")
const bcrypt = require("bcryptjs")

/* Schema definition */

const userSchema = mongoose.Schema(
  {
    username: {
      type: String,
      required: true,
      unique: true,
    },
    firstName: {
      type: String,
      required: true,
    },
    lastName: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: false,
      unique: true,
    },
    phoneNumber: {
      type: String,
      required: true,
      unique: true,
    },
    password: {
      type: String,
      required: true,
    },
    type: {
      enum: Object.values(global.userTypes),
      type: String,
      default: global.userTypes.PATIENT,
      required: true,
    },
  },
  {
    timestamps: true,
  }
)

/* Methods */

userSchema.methods.matchPassword = async function (password) {
  return bcrypt.compare(password, this.password)
}

/* Override toJSON method */
userSchema.methods.toJSON = function () {
  const obj = this.toObject()
  delete obj.password
  return obj
}

/* Pre methods */

userSchema.pre("save", async function (next) {
  if (!this.isModified("password")) {
    next()
  }

  const salt = await bcrypt.genSalt(10)
  this.password = await bcrypt.hash(this.password, salt)
})

const User = mongoose.model("User", userSchema)

module.exports = User
