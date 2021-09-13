const { randomBytes } = require("crypto")

const generateSecret = () => {
  return randomBytes(256).hexSlice(0)
}

const zip = (arr, ...arrs) => arr.map((val, i) => arrs.reduce((a, arr) => [...a, arr[i]], [val]))

module.exports = {
  generateSecret,
  zip,
}
