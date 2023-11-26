// definimos variables
var fallbackPicker = document.querySelector(".fallbackDatePicker");

var yearSelect = document.querySelector("#year");
var monthSelect = document.querySelector("#month");
var daySelect = document.querySelector("#day");

function populateDays(month) {
  // borra la actual muestra de elementos <option> que quedan fuera
  // del <select> para el día, listo para que los siguentes días sean inyectados
  while (daySelect.firstChild) {
    daySelect.removeChild(daySelect.firstChild);
  }

  // Crea una variable que guarda el nuevo número de días a ser inyectados.
  var dayNum;

  // ¿Son 31 o 30 días?
  if (
    (month === "Enero") |
    (month === "Marzo") |
    (month === "Mayo") |
    (month === "Julio") |
    (month === "Agosto") |
    (month === "Octubre") |
    (month === "Diciembre")
  ) {
    dayNum = 31;
  } else if (
    (month === "Abril") |
    (month === "Junio") |
    (month === "Septiembre") |
    (month === "Noviembre")
  ) {
    dayNum = 30;
  } else {
    // Si el mes es febrero, calcula si el año es bisiesto o no.
    var year = yearSelect.value;
    var isLeap = new Date(year, 1, 29).getMonth() == 1;
    isLeap ? (dayNum = 29) : (dayNum = 28);
  }

  // Inyecta el número adecuado de nuevos elementos <option> dentro del <select> para los días
  for (i = 1; i <= dayNum; i++) {
    var option = document.createElement("option");
    option.textContent = i;
    daySelect.appendChild(option);
  }

  // Si el día previo ya ha sido establecido, establece el valor de daySelect
  // a ese día, para evitar saltar a uno cuando
  // el año cambie
  if (previousDay) {
    daySelect.value = previousDay;

    // Si el día anterior fue establecido en un número alto, digamos 31, y luego
    // y elegimos un mes con menos días (por ejemplo febrero),
    // esta parte del código se asegura de que el día con el valor más grande sea seleccionado
    // en vez de  mostrat un daySelect en blanco.
    if (daySelect.value === "") {
      daySelect.value = previousDay - 1;
    }

    if (daySelect.value === "") {
      daySelect.value = previousDay - 2;
    }

    if (daySelect.value === "") {
      daySelect.value = previousDay - 3;
    }
  }
}

function populateYears() {
  // tomar este año como un número
  var date = new Date();
  var year = date.getFullYear();

  // Hacer que este año y los cien años anteriores estén en el <select>
  for (var i = 0; i <= 100; i++) {
    var option = document.createElement("option");
    option.textContent = year - i;
    yearSelect.appendChild(option);
  }
}

// cuando los valores del los elementos <select> del año o el mes son cambiados, vuelve a correr populateDays()
// en el caso de que el cambio afecte al número de días disponible
yearSelect.onchange = function () {
  populateDays(monthSelect.value);
};

monthSelect.onchange = function () {
  populateDays(monthSelect.value);
};

//preserva el día seleccionado
var previousDay;

// actualiza que día ha sido establecido anteriormente
// fíjate en el final de populateDays() para entender el uso
daySelect.onchange = function () {
  previousDay = daySelect.value;
};

var accessToken = "0b108a382c4de6ed9cc41e240df301736c4f27e6";
var deviceID = "e00fce680fc0e5b73b2899b8";
var url = "https://api.particle.io/v1/devices/" + deviceID + "/alimentar";

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
