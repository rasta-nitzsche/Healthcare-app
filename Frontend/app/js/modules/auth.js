const authUser = async (emailOrUsernameOrPhone, password) => {
  const res = await fetch(`${apiBaseUrl}/users/login`, {
    method: "POST",
    headers: {
      "Content-type": "application/json",
    },
    body: JSON.stringify({
      email: emailOrUsernameOrPhone,
      username: emailOrUsernameOrPhone,
      phoneNumber: emailOrUsernameOrPhone,
      password: password,
    }),
  })

  const json = await res.json()

  if (res.status != 200) {
    throw new Error(json.message)
  }

  return json
}

$(function () {
  showAlerts()

  $("#authForm").submit(async function (e) {
    e.preventDefault()

    hideAlerts()

    const emailOrUsernameOrPhone = $("#mail").val()
    const password = $("#password").val()

    try {
      const userInfo = await authUser(emailOrUsernameOrPhone, password)
      storeData("userInfo", userInfo)
      const page = userInfo.type == userTypes.DOCTOR ? "medecin" : "patient"
      window.location.replace(`/${page}.html`)
    } catch (err) {
      const a = new Alert("danger", err.message, "#title")
      a.show()
    }
  })
})
