
var accessToken = "9afc34175b394dfba9d685c07c6b63f38752bd2f";
var deviceID = "e00fce68ee8db543fef49e19";

setInterval(Leermari,10000);//Leer cada segundo

function Leermari(){ //creando la funcion para leer

  //Esto es para recibir la temperatura
  G = "https://api.spark.io/v1/devices/" + DeviceID + "/Temperatura/?access_token=" + accessToken;
  $.getJSON(G, function(json){
  document.getElementById("Cel").innerHTML = json.result + " °C";
  Temperatura = document.getElementById("Cel").innerHTML = json.result + " °C";
  }) ;

  //esto es para leer la presion
  P = "https://api.spark.io/v1/devices/" + DeviceID + "/Presion/?access_token=" + accessToken;
  $.getJSON(P, function(json){
  document.getElementById("pres").innerHTML = json.result + " mBar";
  Presion = document.getElementById("pres").innerHTML = json.result + " mBar";
  });

  //esto es para leer la humedad
  H = "https://api.spark.io/v1/devices/" + DeviceID + "/HumedadAmb/?access_token=" + accessToken;
  $.getJSON(H, function(json){
  document.getElementById("hum").innerHTML = json.result + " %";
  HumedadAmb = document.getElementById("hum").innerHTML = json.result + " %";
  });

  R = "https://api.spark.io/v1/devices/" + DeviceID + "/Humedad/?access_token=" + accessToken;
  $.getJSON(R, function(json){
  document.getElementById("humK").innerHTML = json.result + " %";
  Humedad = document.getElementById("humK").innerHTML = json.result + " %";
  });
  


}

   FusionCharts.ready(function () {
        var myChart = new FusionCharts({
            type: 'realtimelinedy',
            id: 'electricitymeter1',
            renderAt: 'Grafica5',
            width: '100%',
            height: '100%',
            dataFormat: 'json',
            dataSource: {
                "chart": {
                    "caption": "Sensores",
                    "showRealTimeValue": "0",
                    "setadaptiveymin": "1",
                    "setadaptivesymin": "1",
                    "yAxisName": "Temperatura",
                    "sYAxisName": "HumedadAmb",
                    "labeldisplay": "Rotate",
                    "numDisplaySets": "24",
                    "theme": "fusion",

                    "exportEnabled": "1",
                    "exportMode": "auto",
                    "exportFormats": "PNG=Export Image|PDF=Export PDF",
                    "exportTargetWindow": "_self",
                    "exportAtClient": "1",
                    "exportShowMenuItem": "1",
                    "exportAction": "download"
                },
                "categories": [{
                    "category": [{
                        "label": "Start"
                    }]
                }],
                "dataset": [{

                    "seriesname": "Temperatura",
                    "plotToolText": "<b>$label</b><br>$seriesName: <b>$dataValue RPM</b>",
                    "data": [{
                        "value": "0"
                    }]
                }, {
                    "seriesname": "HumedadAmb",
                    "parentyaxis": "S",
                    "plotToolText": "<b>$label</b><br>$seriesName: <b>$dataValue RPM</b>",
                    "data": [{
                        "value": "0"
                    }]

                },{
                	"seriesname": "Presion",
                    "parentyaxis": "S",
                    "plotToolText": "<b>$label</b><br>$seriesName: <b>$dataValue RPM</b>",
                    "data": [{
                        "value": "0"
                        }]

                },{
                  "seriesname": "Humedad",
                    "parentyaxis": "S",
                    "plotToolText": "<b>$label</b><br>$seriesName: <b>$dataValue RPM</b>",
                    "data": [{
                        "value": "0"
                    }]
                }
                ]
            },
            "events": {
                "initialized": function (e) {
                    function formatTime(num) {
                        return (num <= 9) ? ("0" + num) : num;
                    }

                    function updateData() {
                        // Get reference to the chart using its ID
                        var chartRef = FusionCharts("electricitymeter1");

                        var d = new Date(),
                          h = (d.getHours() < 10 ? '0' : '') + d.getHours(),
                          m = (d.getMinutes() < 10 ? '0' : '') + d.getMinutes(),
                      label = h + ':' + m,

                        ds1 = Temperatura;
                        ds2 = HumedadAmb;
                        ds3 = Presion;
                        ds4 = Humedad;

                        //Build Data String in format &label=...&value=...
                        strData = "&label=" + label + "&value=" + ds1 + "|" + ds2 + "|" + ds3 + "|" + ds4;
                        //Feed it to chart.
                        chartRef.feedData(strData);
                    }
                    var myVar = setInterval(function () {
                        updateData();
                    }, 10000);
                }
            }
        }).render();
    });


//Otros parametros
window.onload = function() {
  //variables
  var ipUrl = "https://ipinfo.io/json";       
  var appid = "appid=8e1880f460a20463565be25bc573bdc6";
  var location = document.getElementById("location"); 
  var currentDate = new Date();

  //setting the date
  var dateElem = document.getElementById("date");
  dateElem.innerHTML = currentDate.toDateString();
  //calling ipinfo.io/json function
  httpReqIpAsync(ipUrl);

  //to ipinfo.io/json
  function httpReqIpAsync(url, callback) {
    var httpReqIp = new XMLHttpRequest();
    httpReqIp.open("GET", url, true)
      httpReqIp.onreadystatechange = function() {
        if(httpReqIp.readyState == 4 && httpReqIp.status == 200) {
          var jsonIp = JSON.parse(httpReqIp.responseText)
          var ip = jsonIp.ip;
          var city = jsonIp.city;
          var country = jsonIp.country;
          location.innerHTML = `${city}, ${country}`;
          var lat = jsonIp.loc.split(",")[0];
          var lon = jsonIp.loc.split(",")[1];
          console.log(lat+" "+lon)
          var weatherApi = `http://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&${appid}`;
          //calling openweathermap api function
          httpReqWeatherAsync(weatherApi);
        }
      }
    httpReqIp.send();       
}

function httpReqWeatherAsync(url, callback) {
    var httpReqWeather = new XMLHttpRequest();
    httpReqWeather.open("GET", url, true);
    httpReqWeather.onreadystatechange = function() {
      if(httpReqWeather.readyState == 4 && httpReqWeather.status == 200) {
   var jsCLIMA = JSON.parse(httpReqWeather.responseText);
        console.log(jsCLIMA)
        var weatherDesc = jsCLIMA.weather[0].description;
        var id = jsCLIMA.weather[0].id;
        var icon = `<i class="wi wi-owm-${id}"></i>`
        
        var windSpeed = jsCLIMA.wind.speed;
        //find whether is day or night
        var sunSet = jsCLIMA.sys.sunset;
        //sunset is 10 digits and currentDate 13 so div by 1000
        var timeNow = Math.round(currentDate / 1000);
        
        console.log(timeNow + "<" + sunSet +" = "+(timeNow < sunSet))
        dayNight = (timeNow < sunSet) ? "day" : "night";
        //insert into html page
        var description = document.getElementById("description");
        description.innerHTML = `<i id="icon-desc" class="wi wi-owm-${dayNight}-${id}"></i><p>${weatherDesc}</p>`;
        
        var windElement = document.getElementById("wind");
        windElement.innerHTML = `${windSpeed} km/h`;
      }
    }
    httpReqWeather.send();
  }

}

