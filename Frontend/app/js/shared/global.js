/* Global variables */

const apiBaseDomain = "http://localhost:5000"
const apiBaseUrl = `${apiBaseDomain}/api/v1`

const userTypes = {
  DOCTOR: "doctor",
  PATIENT: "patient",
}

const alertMessages = {
  NOT_LOGGED_IN: "Not logged in",
  LOGGED_OUT: "Logged out",
  DEFAULT: "Error",
}

/* Local Storage */

const loadData = (key) => {
  return JSON.parse(localStorage.getItem(key))
}

const storeData = (key, data) => {
  localStorage.setItem(key, JSON.stringify(data))
}

const clearData = (key) => {
  const data = loadData(key)
  localStorage.removeItem(key)
  return data
}

const handleData = (key, handler) => {
  let data = loadData(key)
  data = handler(data)
  storeData(key, data)
}

/* Initialization */

if (!loadData("alerts")) {
  storeData("alerts", [])
}

/* Auth */

const checkData = (dataKey, page, alertMessage, el) => {
  const data = loadData(dataKey)
  if (data === null) {
    window.location.replace(`/${page}`)
    if (alertMessage !== undefined && el !== undefined) {
      new Alert("danger", alertMessage, el)
    }
  }
}

const checkLogin = () => {
  return checkData("userInfo", "connexion.html", alertMessages.NOT_LOGGED_IN, "#title")
}

const checkPatientId = () => {
  return checkData("patientId", "mespatients.html")
}

// const checkLogin = () => {
//   const userInfo = loadData("userInfo")
//   if (userInfo === null) {
//     window.location.replace("/connexion.html")
//     new Alert("danger", alertMessages.NOT_LOGGED_IN, "#title")
//   }
// }

const logout = () => {
  clearData("userInfo")
  window.location.replace("/connexion.html")
  new Alert("info", alertMessages.LOGGED_OUT, "#title")
}

/* Alert system */

class Alert {
  constructor(level, message, el) {
    this.level = level
    this.message = message
    this.el = el
    handleData("alerts", (alerts) => {
      alerts.push(this)
      return alerts
    })
  }

  render() {
    return `<div class="alert alert-${this.level} alert-dismissible fade show" role="alert">${this.message}</div>`
  }

  show() {
    this.newEl = $(this.render()).insertAfter(this.el)
    handleData("alerts", (alerts) => {
      alerts.shift()
      return alerts
    })
  }

  hide() {
    this.newEl.alert("close")
  }
}

const showAlerts = () => {
  handleData("alerts", (alerts) => {
    for (alert of alerts) {
      alert.render = Alert.prototype.render
      alert.show = Alert.prototype.show
      alert.hide = Alert.prototype.hide
      alert.show()
    }

    return []
  })
}

const hideAlerts = () => {
  $(".alert").alert("close")
}
