document.getElementById("nav-account").addEventListener("click", function() {
  redirect("nav-account");
});

document.getElementById("nav-dashboard").addEventListener("click", function() {
  redirect("nav-dashboard");
});

document.getElementById("nav-catalog").addEventListener("click", function() {
  redirect("nav-catalog");
});

document.getElementById("nav-logout").addEventListener("click", function() {
  redirect("nav-logout");
});

document.getElementById("nav-about").addEventListener("click", function() {
  redirect("nav-about");
});

function redirect(location) {
  switch (location) {
    case "nav-account":
      window.location.href = "driver_settings.html";
      break;

    case "nav-dashboard":
      window.location.href = "driver_dashboard.html";
      break;

    case "nav-catalog":
      window.location.href = "driver_catalog.html";
      break;

    case "nav-logout":
      window.location.href = "../signIn.html";
      break;

    case "nav-about":
      window.location.href = "../aboutPage.html";
      break;
  }
}