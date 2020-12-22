const pass = document.querySelector(".password");
const reveal = document.querySelector(".show-password");

reveal.addEventListener("click", function () {
  if (pass.type === "password") {
    pass.type = "text";
    reveal.innerHTML = '<i class="far fa-eye"></i>';
  } else {
    pass.type = "password";
    reveal.innerHTML = '<i class="far fa-eye-slash"></i>';
  }
});
