var accessToken = "0b108a382c4de6ed9cc41e240df301736c4f27e6";
var deviceID = "e00fce680fc0e5b73b2899b8";
var url = "https://api.particle.io/v1/devices/" + deviceID + "/alimentar";

const year = document.getElementById("year");
const yearError = document.querySelector("#year + span.error");

year.addEventListener("input", function (event) {
  // Cada vez que el usuario escribe algo, verificamos si
  // los campos del formulario son válidos.

  if (year.validity.valid) {
    // En caso de que haya un mensaje de error visible, si el campo
    // es válido, eliminamos el mensaje de error.
    yearError.innerHTML = ""; // Restablece el contenido del mensaje
    yearError.className = "error"; // Restablece el estado visual del mensaje
  } else {
    // Si todavía hay un error, muestra el error exacto
    showError();
  }
});

form.addEventListener("submit", function (event) {
  // si el campo de correo electrónico es válido, dejamos que el formulario se envíe

  if (!year.validity.valid) {
    // Si no es así, mostramos un mensaje de error apropiado
    showError();
    // Luego evitamos que se envíe el formulario cancelando el evento
    event.preventDefault();
  }
});

function showError() {
  if (year.validity.valueMissing) {
    // Si el campo está vacío
    // muestra el mensaje de error siguiente.
    yearError.textContent =
      "Debe introducir una año";
  } else if (email.validity.tooShort) {
    // Si los datos son demasiado cortos
    // muestra el mensaje de error siguiente.
    yearError.textContent =
      "El año debe ser de al menos 4 digitos";
  }

  // Establece el estilo apropiado
  yearError.className = "error activo";
}

function switchOn() {
    var heading = document.getElementById('label');
    heading.classList.remove('textOff');
    heading.classList.remove('textOn');
    heading.classList.remove('textError');
    heading.innerHTML = 'Alimentando...';
    heading.classList.add('textOn');
    $.post(url, { params: "on", access_token: accessToken }, function (data) {
        if (data.return_value == 1) {
            heading.innerHTML = 'Alimentando...';
            $.post(url, { params: "off", access_token: accessToken }, function (data) {
                if (data.return_value == 0) {
                    heading.classList.remove('textOn');
                    heading.innerHTML = 'En espera';
                    heading.classList.add('textOff');
                }
                else{
                    heading.classList.remove('textOn');
                    heading.innerHTML = 'Error!';
                    heading.classList.add('textError');
                }
            }, "json");
        }
        else{
            heading.classList.remove('textOn');
            heading.innerHTML = 'Error!';
            heading.classList.add('textError');
        }
    }, "json");
}
