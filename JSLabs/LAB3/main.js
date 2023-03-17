let modal = document.getElementById("formModal");
let formCallerButton = document.getElementById("callerButton");
let showButton = document.getElementById("showButton");
let inputPassword = document.getElementById("inputPassword")


formCallerButton.addEventListener("click", (event) => {
  modal.style.display = "block";
});

modal.addEventListener("click", (event) => {
  event.stopPropagation();
});

document.body.addEventListener("click", (event) => {
  if (
    event.target.nodeName != "BUTTON" &&
    event.target.id != "formModal"
  ) {
    modal.style.display = "none";
  }
});

showButton.addEventListener("pointerdown", event => {
  inputPassword.type = "text";
});

showButton.addEventListener("pointerup", event => {
  inputPassword.type = "password";
});