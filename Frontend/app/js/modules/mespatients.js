checkLogin()

const userInfo = loadData("userInfo")

const getPatients = async () => {
  const res = await fetch(`${apiBaseUrl}/doctor/patients`, {
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

const getPatientDetails = async (patientId) => {
  const res = await fetch(`${apiBaseUrl}/doctor/patients/${patientId}`, {
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

const renderPatient = (patient) => {
  return `
    <a href="/detailpatient.html" class="col-lg-5 col-md-6 col-sm-10 no-link">
      <div class="fpat" data-id="${patient._id}">
        <h4><i class="fas fa-user m-2"></i> ${patient.user.lastName} ${patient.user.firstName}</h4>
     </div>
    </a>`
}

$(async function () {
  $("#logout").click(logout)

  try {
    const patients = await getPatients()

    const patientsDetailsPromises = patients.map(async (patient) => {
      return await getPatientDetails(patient._id)
    })

    const patientsDetails = await Promise.all(patientsDetailsPromises)

    patientsDetails.forEach((patientDetails) => {
      $("#patients").append(renderPatient(patientDetails))
    })
  } catch (err) {
    console.error(err.message)
  }
})

$(document).on("click", "a.no-link", function () {
  const patientId = $(this).find("div").data("id")
  storeData("patientId", patientId)
})
