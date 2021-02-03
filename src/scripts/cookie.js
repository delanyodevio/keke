// capture the notice button
var cookieNotice = document.getElementById("cookieNotice"),
  cookieButton = document.getElementById("cookieButton"),
  cookieLink = document.getElementById("cookieLink");

const expiresIn = 365; // days
const cookieName = "kekeCookie";
const cookieValue = 99123026;

// Remove cookie notification when clicked
cookieButton.addEventListener("click", function () {
  setCookie(cookieName, cookieValue, expiresIn);
  cookieNotice.classList.add("disabled");
});

cookieLink.addEventListener("click", function () {
  setCookie(cookieName, cookieValue, expiresIn);

  setTimeout(function () {
    cookieNotice.classList.add("disabled");
  }, 5000);
});

// initialize cookie notice on DOMContentLoaded
document.addEventListener("DOMContentLoaded", function () {
  setTimeout(function () {
    checkCookie();
  }, 10000);
});

// Setting cookie
function setCookie(name, value, days) {
  var today = new Date();
  today.setTime(today.getTime() + days * 24 * 60 * 60 * 1000);

  var expires = "expires=" + today.toUTCString();

  document.cookie = name + "=" + value + ";" + expires + ";path=/";
}

// Test if cookie is there
function getCookie(cname) {
  var name = cname + "=";
  var ca = document.cookie.split(";");

  for (var index = 0; index < ca.length; index++) {
    var c = ca[index];

    while (c.charAt(0) == " ") {
      c = c.substring(1);
    }

    if (c.indexOf(name) == 0) {
      return c.substring(name.length, c.length);
    }
  }
  return "";
}

// check if cookies are enabled
function checkCookie() {
  var visit = getCookie(cookieName);

  if (visit != "") {
    cookieNotice.classList.add("disabled");
  } else {
    cookieNotice.classList.remove("disabled");
  }
}

/**
 * function stringToHash(string) {
  let hash = 0;

  if (string.length == 0) return hash;

  for (index = 0; string.length; index++) {
    char = string.charCodeAt(index);
    hash = (hash << 5) - hash - char;
    hash = hash & hash;
  }

  return hash;
}
 */
