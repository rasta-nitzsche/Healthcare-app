checkLogin()

const userInfo = loadData("userInfo")

const surveyType = "covid"

const getSurvey = async () => {
  const res = await fetch(`${apiBaseUrl}/surveys/?type=${surveyType}`, {
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

const postSurveyResult = async (surveyId, answers) => {
  const res = await fetch(`${apiBaseUrl}/patient/surveys`, {
    method: "POST",
    headers: {
      "Content-type": "application/json",
      Authorization: `Bearer ${userInfo.token}`,
    },
    body: JSON.stringify({
      surveyId,
      answers,
    }),
  })

  let json
  try {
    json = await res.json()
  } catch (err) {}

  if (res.status != 204) {
    throw new Error(json.message)
  }
}

const renderForm = (survey) => {
  const template = `
    <div class="row" style="margin-top: 4%; background-color: white; margin: 5%" data-id="{{id}}">
      <h2 style="margin-left: 18%; margin-top: 1%">{{title}}</h2>
      <p style="margin-top: 2%">
        {{description}}
      </p>

      <form id="fm">
        {{questions}}
      </form>

      <button id="sf"><span style="margin-top: 2%; font-size: 20px; font-weight: 700"> Envoyer</span></button>
    </div>
  `
  const questionTemplate = `
    <label for="field{{i}}"><input type="checkbox" name="field{{i}}" /> {{question}}</label><br />
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
    const survey = await getSurvey()
    $("#form-container").html(renderForm(survey))
  } catch (err) {
    console.error(err.message)
  }

  $("#sf").click(async function () {
    const surveyId = $("#form-container div").data("id")

    const answers = Array.from(
      $("input:checkbox").map(function () {
        return $(this).prop("checked")
      })
    )

    try {
      await postSurveyResult(surveyId, answers)

      window.location.replace("/patient.html")
    } catch (err) {
      console.error(err.message)
    }
  })
})
