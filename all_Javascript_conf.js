const accessToken = "0b108a382c4de6ed9cc41e240df301736c4f27e6";
const deviceID = "e00fce680fc0e5b73b2899b8";
const url = "https://api.particle.io/v1/devices/" + deviceID;
var form, year, month, day, hour, minute, heading;

window.addEventListener("load", (event) => {
    form = document.getElementById("formulario");
    year = document.getElementById("year");
    month = document.getElementById("month");
    day = document.getElementById("day");
    hour = document.getElementById("hour");
    minute = document.getElementById("minute");
    heading = document.getElementById('label');
    getEstadoServo();

    form.addEventListener("submit", (e) => {
        e.preventDefault();
        programar();
    });
});

function switchOn() {
    heading.classList.remove('textOff');
    heading.classList.remove('textOn');
    heading.classList.remove('textError');
    heading.innerHTML = 'Alimentando...';
    heading.classList.add('textOn');
    $.post(url + "/alimentar", { params: "on", access_token: accessToken }, function (data) {
        if (data.return_value == 1) {
            heading.innerHTML = 'Alimentando...';
            $.post(url + "/alimentar", { params: "off", access_token: accessToken }, function (data) {
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

function programar(){
    $.post(url + "/setHora", { params: hour.value, access_token: accessToken }, "json").then(function(data){
        if (data.return_value == 1){
            $.post(url + "/setMinuto", { params: minute.value, access_token: accessToken }, "json").then(function(data){
            if (data.return_value == 1){
                alert("El dispensador se activara cada:\n" + hour.value + ":" + minute.value)
                hour.selectedIndex = 0;
                minute.selectedIndex = 0;
                }
                else{
                    alert("Hubo un error al programar el dispensador");
                }
                });
            }
            else{
                alert("Hubo un error al programar el dispensador");
                }
    });
}

function getEstadoServo(){
    $.get(url + "/flagServo", {access_token: accessToken}, callbackServo).then(function(data){
        console.log(data.result)
        if (data.result == 1){
        heading.classList.remove('textOff');
        heading.innerHTML = 'Alimentando...';
        heading.classList.add('textOn');
        setTimeout(getEstadoServo, 1000);
            }
            else{
                heading.classList.remove('textOn');
                heading.innerHTML = 'En espera';
                heading.classList.add('textOff');
                setTimeout(getEstadoServo, 1000);
                });
}
