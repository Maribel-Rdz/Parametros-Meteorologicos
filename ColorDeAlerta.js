//Estado de alerta
//Funciones que actualizan las imagenes//
var accessToken = "9afc34175b394dfba9d685c07c6b63f38752bd2f";
var deviceID = "e00fce68ee8db543fef49e19";

let sigue = async () => {
    while (true) {
        let value3 = await Leer3()
    }
}

sigue()

// setInterval(Leer, 500);//Leer cada segundo
async function Leer3() { //creando la funcion para leer
    //Esto es para leer la temperatura y mostrr 
    K = "https://api.spark.io/v1/devices/" + deviceID + "/Humedad/?access_token=" + accessToken;
    let json = await $.getJSON(K)
    if (json.result == 0 && json.result < 19) { document.getElementById("M").src = "img/botonrojo2.png" };
    if (json.result >= 20 && json.result < 49) { document.getElementById("M").src = "img/botonnaranja1.jpg" };
    if (json.result >= 50 && json.result < 110) { document.getElementById("M").src = "img/botonverde.png" };
    
    json ? value3 = json : null
    
    return json
}