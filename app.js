const express = require('express');
const https = require('https');
const bodyParser = require("body-parser");

const app = express();
app.use(bodyParser.urlencoded({
  extended: true
}));



app.get("/", function(req, res) {

  res.sendFile(__dirname + "/index.html");

});

app.post("/", function(req, res) {

      const query = req.body.cityName;



      const url = `https://api.openweathermap.org/data/2.5/weather?q=${query}&appid=3256707f569aea5e74fe2aabeedfaea6&units=metric`;

      https.get(url, function(response) {


        response.on("data", function(data) {

          const weatherData = JSON.parse(data);
          const temp = weatherData.main.temp;
          const description = weatherData.weather[0].description;
          const icon = weatherData.weather[0].icon;
          const imageIcon = `http://openweathermap.org/img/wn/${icon}@2x.png`
          res.write(`<p>The weather is currently ${description}</p>`);
          res.write(`<h1>The temperature in ${query} is ${temp} degrees Celcius.</h1>`);

          res.write(`<img src="${imageIcon}">`);
          res.send();



      
        })
      })
})



      // https://api.openweathermap.org/data/2.5/weather?q={city name}&appid={API key}
      // e72ca729af228beadb5d20e3b77a9713





      app.listen(3000, function() {
        console.log("Server is running on port 3000.")
      });
