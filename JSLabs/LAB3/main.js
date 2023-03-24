let modal = document.getElementById("formModal");
let formCallerButton = document.getElementById("callerButton");
let showButton = document.getElementById("showButton");
let inputPassword = document.getElementById("inputPassword");
let inputEmail = document.getElementById("inputMail");
let emailError = document.getElementById("error")
let errorText = document.getElementById("errorText");
let mainDiv = document.getElementById("mainDiv");
const sendButtton = document.getElementById("loginButton");


formCallerButton.addEventListener("click", (event) => {
  clean();
  mainDiv.style.display = "block";
});

mainDiv.addEventListener("click", (event) => {
  event.stopPropagation();
});

document.body.addEventListener("click", (event) => {
  if (
    event.target.nodeName != "BUTTON" &&
    event.target.id != "formModal"
  ) {
    mainDiv.style.display = "none";
  }
});

showButton.addEventListener("pointerdown", event => {
  inputPassword.type = "text";
});

showButton.addEventListener("pointerup", event => {
  inputPassword.type = "password";
});


inputEmail.addEventListener("input", (event) => {
  if (inputEmail.validity.typeMismatch) {
    inputEmail.setCustomValidity("Entered value needs to be an email address.");
  } else if (inputEmail.validity.valueMissing) {
    inputEmail.setCustomValidity("You need to enter an email address.");
  } else {
    inputEmail.setCustomValidity("");
  }
});

sendButtton.addEventListener('click', (e) => {
  // prevent the form from submitting
  //

  // show the form values
  const formData = new FormData(form);
  const values = [...formData.entries()];
  console.log(values);
  //e.preventDefault();
});








inputEmail.addEventListener("input", (event) => {
  // Each time the user types something, we check if the
  // form fields are valid.

  if (inputEmail.validity.valid) {
    // In case there is an error message visible, if the field
    // is valid, we remove the error message.
    //emailError.textContent = ""; // Reset the content of the message
    emailError.className = "errorDivDisable"; // Reset the visual state of the message
  } else {
    // If there is still an error, show the correct error
    emailError.className = "errorDiv";
    showError();
  }
});


function showError() {
  if (inputEmail.validity.valueMissing) {
    // If the field is empty,
    // display the following error message.
    emailError.style.width = "220px";
    errorText.textContent = "You need to enter an email address.";
  } else if (inputEmail.validity.typeMismatch) {
    // If the field doesn't contain an email address,
    // display the following error message.
    emailError.style.width = "260px";
    errorText.textContent = "Entered value needs to be an email address.";
  }
}

function clean() {
  inputEmail.value = "";
  inputPassword.value = "";
  emailError.className = "errorDivDisable";
}