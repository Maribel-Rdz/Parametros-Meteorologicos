
var url2 = "https://api.spark.io/v1/devices/" + deviceID + "/Presion";        // Presion

////////////////////////////////Creacion de los medidores/////////////////////////////////////////////////////////////////////

async function getReading3() {
    let presionValue = await $.get(url2, { access_token: accessToken });
    if (presionValue.result) {
        Presion = parseFloat(presionValue.result);    //
        //  pwm = pwm.toFixed(2);
        b.refresh(Presion);                  //
    }
    else {
        alert("There was a problem");
    }
}


var b = new JustGage({  //PWM
    id: 'ampe',
    value: 0,
    min: 0,
    max: 2000,
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
    title: "Presion Atm en mB"
});


let get3 = async () => {
    while (true) {
        await getReading3()
    }
}

get3();

/////////////////////////////////////////////////////////////////////////////////////////////////////////////
