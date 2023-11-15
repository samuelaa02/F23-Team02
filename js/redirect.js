document.getElementById("nav-account").addEventListener("click", function() {
  redirect("nav-account");
});

document.getElementById("nav-dashboard").addEventListener("click", function() {
  redirect("nav-dashboard");
});

function redirect(location) {
  switch (location) {
    case "nav-account":
      window.location.href = "driver_settings.html";
      break;

    case "nav-dashboard":
      window.location.href = "driver_dashboard.html";
      break;
  }
}
