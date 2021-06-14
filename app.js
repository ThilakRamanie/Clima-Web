const express = require("express");
const https = require("https");
const app = express();
const body = require("body-parser");
const bodyParser = require("body-parser");

app.get("/",function(req,res) {
    res.sendFile(__dirname+"/index.html");
})

app.use(bodyParser.urlencoded({extended:true}));

app.post("/",function(req,res) {
    var city = req.body.city;
    const url = "https://api.openweathermap.org/data/2.5/weather?q="+city+"&appid=352894939553479100fed867030cc55c&units=metric";
    https.get(url,function(response) {
        response.on("data", function(data) {
            const weatherData = JSON.parse(data);
            const temp = weatherData.main.temp;
            const description = weatherData.weather[0].description;
            const icon = weatherData.weather[0].icon;
            const iconUrl = "https://openweathermap.org/img/wn/"+icon+"@2x.png";
            console.log(temp+" "+description);
            res.write("<h1>Temperature in "+ city+" is: " +temp+"</h1>");
            res.write("<p>The Weather currently is: " +description+"</p>");
            res.write("<img src="+iconUrl+">");
            res.send();
        })
    })
})


app.listen(3000);