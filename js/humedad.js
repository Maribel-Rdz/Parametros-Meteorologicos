var accessToken = "9afc34175b394dfba9d685c07c6b63f38752bd2f";
var deviceID = "e00fce68ee8db543fef49e19";
var url1 = "https://api.spark.io/v1/devices/" + deviceID + "/HumedadAmb";         // Temperatura en Fahrenheit  

////////////////////////////////Creacion de los medidores/////////////////////////////////////////////////////////////////////

async function getReading2() {
    let humeValue = await $.get(url1, { access_token: accessToken });
    if (humeValue.result) {
        HumedadAmb = parseFloat(humeValue.result);    //
        //  pwm = pwm.toFixed(2);
        a.refresh(HumedadAmb);                  //               
    }
    else {
        alert("There was a problem");
    }
}

var a = new JustGage({  //PWM
    id: 'volt',
    value: 0,
    min: 0,
    max: 200,
    pointer: true,
    gaugeWidthScale: 2,
    pointerOptions: {
        toplength: 10,
        bottomlength: 10,
        bottomwidth: 8,
        color: '#000000'
    },
    counter: true,
    relativeGaugeSize: true,
    title: "Humedad Amb en %"
});

//

let get = async () => {
    while (true) {
        await getReading2()
    }
}

get();
/////////////////////////////////////////////////////////////////////////////////////////////////////////////
