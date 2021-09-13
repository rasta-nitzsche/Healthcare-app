const survey = {
  title: "Formulaire de suivi d'état de santé COVID-19",
  description: "Avez-vous actuellement, ou avez-vous eu au cours de ces dernières 24 heures, l'un des symptômes suivants?",
  type: global.surveyTypes.COVID,
  questions: [
    {
      text: "Fièvre",
    },
    {
      text: "Toux",
    },
    {
      text: "Essoufflement ou difficulté à respirer",
    },
    {
      text: "Gorge irritée",
    },
    {
      text: "Nouvelle perte de goût ou d'odorat",
    },
    {
      text: "Frissons",
    },
    {
      text: "Maux de tête ou de muscles",
    },
    {
      text: "Nausées, diarrhée, vomissements",
    },
  ],
}

module.exports = survey
