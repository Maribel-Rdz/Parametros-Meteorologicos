var accessToken = "9afc34175b394dfba9d685c07c6b63f38752bd2f";
var deviceID = "e00fce68ee8db543fef49e19";

var url3 = "https://api.spark.io/v1/devices/" + deviceID + "/Humedad";         //Humedad en la planta  

////////////////////////////////Creacion de los medidores/////////////////////////////////////////////////////////////////////

async function getReading4() {
    let humValue = await $.get(url3, { access_token: accessToken });
    if (humValue) {
        Humedad = parseFloat(humValue.result);    //
        //  pwm = pwm.toFixed(2);
        c.refresh(Humedad);                  //        
    }
    else {
        alert("There was a problem");
    }
}

var c = new JustGage({  //PWM
    id: 'rpm',
    value: 0,
    min: 0,
    max: 100,
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
    title: "Humedad planta en %"
});


let get4 = async () => {
    while (true) {
        await getReading4()
    }
}

get4();

/////////////////////////////////////////////////////////////////////////////////////////////////////////////
