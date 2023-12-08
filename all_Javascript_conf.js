const accessToken = "0b108a382c4de6ed9cc41e240df301736c4f27e6";
const deviceID = "e00fce680fc0e5b73b2899b8";
const url = "https://api.particle.io/v1/devices/" + deviceID;
var form, razaA, razaP, humedad_mala, humedad_buena, prog, hour, minute, heading, hourP, minuteP;

window.addEventListener("load", (event) => {
    form = document.getElementById("formulario");
    razaP = document.getElementById("razas");
    razaA = document.getElementById("tam_dog");
    hour = document.getElementById("hour");
    minute = document.getElementById("minute");
    heading = document.getElementById('label');
    humedad_mala = document.getElementById('Humedad_mala');
    humedad_buena = document.getElementById('Humedad_buena');
    prog = document.getElementById('prog');
    getEstadoServo();
    getHumedad();
    getProgramada();

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
     
    if (razaA.selectedIndex == 0){
        $.post(url + "/alimentarP", { params: "on", access_token: accessToken }, function (data) {
            if (data.return_value == -2) {
                heading.classList.remove('textOn');
                heading.innerHTML = 'Error: Revisa la comida<br>Tiene mucha humedad!';
                heading.classList.add('textError');
                wait(4000);
                heading.classList.remove('textError');
                heading.innerHTML = 'En espera';
                heading.classList.add('textOff');
            }
            else if (data.return_value == 1) {
                heading.innerHTML = 'Alimentando...';
                $.post(url + "/alimentarP", { params: "off", access_token: accessToken }, function (data) {
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
    else if (razaA.selectedIndex == 1){
        $.post(url + "/alimentarM", { params: "on", access_token: accessToken }, function (data) {
            if (data.return_value == -2) {
                heading.classList.remove('textOn');
                heading.innerHTML = 'Error: Revisa la comida<br>Tiene mucha humedad!';
                heading.classList.add('textError');
                wait(4000);
                heading.classList.remove('textError');
                heading.innerHTML = 'En espera';
                heading.classList.add('textOff');
            }
            else if (data.return_value == 1) {
                heading.innerHTML = 'Alimentando...';
            $.post(url + "/alimentarM", { params: "off", access_token: accessToken }, function (data) {
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
    if (razaA.selectedIndex == 2){
        $.post(url + "/alimentarG", { params: "on", access_token: accessToken }, function (data) {
            if (data.return_value == -2) {
                heading.classList.remove('textOn');
                heading.innerHTML = 'Error: Revisa la comida<br>Tiene mucha humedad!';
                heading.classList.add('textError');
                wait(4000);
                heading.classList.remove('textError');
                heading.innerHTML = 'En espera';
                heading.classList.add('textOff');
            }
            else if (data.return_value == 1) {
                heading.innerHTML = 'Alimentando...';
                $.post(url + "/alimentarG", { params: "off", access_token: accessToken }, function (data) {
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


}

function programar(){
    $.post(url + "/setRazaP", { params: razaP.selectedIndex, access_token: accessToken }, "json").then(function(data){
        if (data.return_value == 1){
            $.post(url + "/setHora", { params: hour.value, access_token: accessToken }, "json").then(function(data){
                if (data.return_value == 1){
                    $.post(url + "/setMinuto", { params: minute.value, access_token: accessToken }, "json").then(function(data){
                    if (data.return_value == 1){
                        alert("El dispensador se activara cada:\n" + hour.value + ":" + minute.value);
                        razaP.selectedIndex = 0;
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
        }});
}

function getEstadoServo(){
    $.get(url + "/flagServo", {access_token: accessToken}).then(function(data){
        if (data.result == 1){
        heading.classList.remove('textError');
        heading.classList.remove('textOff');
        heading.classList.add('textOn');
        heading.innerHTML = 'Alimentando...';
        setTimeout(getEstadoServo, 1000);
            }
            else if (data.result == -1){
                heading.classList.remove('textError');
                heading.classList.remove('textOn');
                heading.classList.add('textError');
                heading.innerHTML = 'Error: Revisa la comida<br>Tiene mucha humedad!';
                setTimeout(getEstadoServo, 1000);
            }
            else{
                heading.classList.remove('textError');
                heading.classList.remove('textOn');
                heading.classList.add('textOff');
                heading.innerHTML = 'En espera';
                setTimeout(getEstadoServo, 1000);
                };
            })
}

function getHumedad(){
    $.get(url + "/humedad", {access_token: accessToken}).then(function(data){
        console.log(data.result)
        if (data.result < 12){
            humedad_mala.classList.remove('textOff');
            humedad_mala.classList.add('humedad1');
            humedad_buena.classList.remove('humedad2');
            humedad_buena.classList.add('textOn');
            setTimeout(getHumedad, 1000);
        }
        else{
            humedad_buena.classList.remove('textOn');
            humedad_mala.classList.remove('humedad1');
            humedad_buena.classList.add('humedad2');
            humedad_mala.classList.add('textOff');
            setTimeout(getHumedad, 1000);
        }
    });
}

function getProgramada(){
    $.get(url + "/flag", {access_token: accessToken}).then(function(data){
        if (data.result == 1){
            $.get(url + "/hora", {access_token: accessToken}).then(function(data){
                if (data.result > 10){
                    hourP = data.result.toString();
                }
                else{
                    hourP = data.result.toString();
                    hourP = "0" + hourP;
                }
            });
            $.get(url + "/minuto", {access_token: accessToken}).then(function(data){
                if (data.result > 10){
                    minuteP = data.result.toString();
                }
                else{
                    minuteP = data.result.toString();
                    minuteP = "0" + minuteP;
                }
            });

            prog.innerHTML = hourP + ":" + minuteP;
            }
        else{
            prog.innerHTML = "No programada aún";
        }});

    setTimeout(getProgramada, 1000);
}
