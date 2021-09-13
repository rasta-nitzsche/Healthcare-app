checkLogin()

const userInfo = loadData("userInfo")

$(function () {
  $("#logout").click(logout)

  const html = $("#welcome p").first().html()
  $("#welcome p").first().html(html.replace("{{username}}", userInfo.username))
})
