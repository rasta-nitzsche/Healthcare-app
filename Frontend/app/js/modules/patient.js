checkLogin()

const userInfo = loadData("userInfo")

const getDoctor = async () => {
  const res = await fetch(`${apiBaseUrl}/patient/doctor`, {
    method: "GET",
    headers: {
      "Content-type": "application/json",
      Authorization: `Bearer ${userInfo.token}`,
    },
  })

  const json = await res.json()

  if (res.status != 200) {
    throw new Error(json.message)
  }

  return json
}

$(async function () {
  $("#logout").click(logout)

  let html = $("#welcome p").first().html()
  $("#welcome p").first().html(html.replace("{{username}}", userInfo.username))

  const doctor = await getDoctor()

  html = $("#bord1 h4").first().html()
  $("#bord1 h4")
    .first()
    .html(html.replace("{{doctorName}}", `${doctor.user.firstName.slice(0, 1)}. ${doctor.user.lastName}`))
})
