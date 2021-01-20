var accessToken = "9afc34175b394dfba9d685c07c6b63f38752bd2f";
var deviceID = "e00fce68ee8db543fef49e19";
var url = "https://api.spark.io/v1/devices/" + deviceID + "/Temperatura";          // Temperatura

async function getReading() {
    let tempValue = await $.get(url, { access_token: accessToken });
    if (tempValue.result) {
        Temperatura = parseInt(tempValue.result);    //
        g.refresh(Temperatura);                //               
    }
    else {
        alert("There was a problem");
    }
}
var g = new JustGage({  //PWM
    id: 'pwm1',
    value: 0,
    min: 0,
    max: 50,
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
    title: "Temperatura Amb en ºC"
});
let gets = async () => {
    while (true) {
        await getReading()
    }
}

gets();
