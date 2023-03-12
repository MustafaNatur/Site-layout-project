let modal = document.getElementById("formModal");
let formCallerButton = document.getElementById("callerButton");
let showButton = document.getElementById("showButton");

let body;

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