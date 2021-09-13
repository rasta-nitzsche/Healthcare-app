checkLogin()
checkPatientId()

const userInfo = loadData("userInfo")

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

const getSurvey = async (surveyId) => {
  const res = await fetch(`${apiBaseUrl}/surveys/${surveyId}`, {
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
    <p style="margin-top: 2%"><b>Nom :</b> ${patient.user.lastName}</p>
    <p><b>Prénom :</b> ${patient.user.firstName}</p>
    <p><b>Email :</b> ${patient.user.email}</p>
    <p><b>Téléphone :</b> ${patient.user.phoneNumber}</p>
  `
}

const renderSurvey = (survey) => {
  const template = `
    <p><b>Résultats du dernier suivi :</b></p>
    <form id="fm" data-id="{{id}}">
      {{questions}}
    </form>
  `
  const questionTemplate = `
    <label for="field{{i}}"><input type="checkbox" class="no-pointer" name="field{{i}} readonly" /> {{question}}</label><br />
  `

  const questions = survey.questions
    .map((question, i) => {
      return questionTemplate.replace("{{i}}", i).replace("{{question}}", question.text)
    })
    .join("")

  return template
    .replace("{{id}}", survey._id)
    .replace("{{title}}", survey.title)
    .replace("{{description}}", survey.description)
    .replace("{{questions}}", questions)
}

$(async function () {
  $("#logout").click(logout)

  try {
    const patientId = loadData("patientId")
    const patientDetails = await getPatientDetails(patientId)

    $("#infod-in").prepend(renderPatient(patientDetails))

    const surveyResults = patientDetails.surveyResults
    console.log("surveyResults")
    console.log(surveyResults)
    const length = surveyResults.length
    if (length > 0) {
      const surveyResult = surveyResults[length - 1]
      const survey = await getSurvey(surveyResult.survey)
      const html = $("#infod-in").html()
      $("#infod-in").html(html + renderSurvey(survey))

      const answers = surveyResult.answers
      console.log("answers")
      console.log(answers)
      for (let i = 0; i < answers.length; i++) {
        $($("input:checkbox")[i]).prop("checked", answers[i])
      }
    }
  } catch (err) {
    console.error(err.message)
  }
})
