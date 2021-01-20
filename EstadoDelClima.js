//Funciones que actualizan las imagenes//
var accessToken = "9afc34175b394dfba9d685c07c6b63f38752bd2f";
var deviceID = "e00fce68ee8db543fef49e19";

let inicio = async () => {
    while (true) {
        let value = await Leer()
    }
}

inicio()

// setInterval(Leer, 500);//Leer cada segundo
async function Leer() { //creando la funcion para leer
    //Esto es para leer la temperatura y mostrr 
    G = "https://api.spark.io/v1/devices/" + deviceID + "/Temperatura/?access_token=" + accessToken;
    let json = await $.getJSON(G)
    if (json.result == 0 && json.result < 4.99) { document.getElementById("A").src = "img/nieve.png" };//
    if (json.result >= 5 && json.result < 9.99) { document.getElementById("A").src = "img/lluvioso.png" };//
    if (json.result >= 10 && json.result < 14.99) { document.getElementById("A").src = "img/brumoso.png" };//
    if (json.result >= 15 && json.result < 19.99) { document.getElementById("A").src = "img/nublado1.png" };//
    if (json.result >= 20 && json.result < 24.99) { document.getElementById("A").src = "img/parcialmentenublado.png" };
    if (json.result >= 25 && json.result < 29.99) { document.getElementById("A").src = "img/parcialmentesoleado.png" };
    if (json.result >= 30 && json.result < 34.99) { document.getElementById("A").src = "img/despejado.png" };//
    if (json.result >= 35 && json.result < 39.99) { document.getElementById("A").src = "img/soleado.png" };
    if (json.result >= 40 && json.result < 45) { document.getElementById("A").src = "img/soleado.png" };
    
    json ? value = json : null
    
    return json
}