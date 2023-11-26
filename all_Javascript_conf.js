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
