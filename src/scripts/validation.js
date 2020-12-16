var password = document.querySelector(".password");
var reveal = document.querySelector(".show-password");

reveal.addEventListener("click", function () {
  if (password.type === "password") {
    password.type = "text";
    reveal.innerHTML = '<i class="far fa-eye"></i>';
  } else {
    password.type = "password";
    reveal.innerHTML = '<i class="far fa-eye-slash"></i>';
  }
});
