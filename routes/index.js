const express = require('express');
const router = express.Router();
const axios = require('axios');

router.get('/', function (req, res, next) {
    //set variable city to Almere, when you visit the site you see the weather of Almere
    let city = 'Almere';
    //api url with variable city
    let url = 'https://api.openweathermap.org/data/2.5/weather?q=' + city + ',nl&lang=nl&APPID=db2fd51d2c86a07027c7d35b557b0274';

    const getWeatherAPI = () =>{
        try {
            return axios.get(url);
        }catch (error){
            console.error(error)
        }
    };

    const weather = getWeatherAPI()
        .then(response => {
            if (response.data){
                return response.data
            }
        })
        .catch(error => {
            console.log(error)
        });

    //call function Weather and load the page index with below variables
    weather.then(function (result) {
    res.render('index', {
        title: 'Weer app',
        data: result.weather[0].description,
        temp: (result.main.temp -273.15).toFixed(1),
        minTemp: (result.main.temp_min -273.15).toFixed(1),
        maxTemp: (result.main.temp_max -273.15).toFixed(1),
        bft: (result.wind.speed * 1.9438).toFixed(1),
        humidity: (result.main.humidity).toFixed(1),
        wind: (result.wind.speed *3.61).toFixed(1),
        place: result.name
    });
  })
});

router.post('/', function(req, res, next){
    //set variable city with variable you get from the post form
    let city = req.body.city;
    //api url with variable city
    let url = 'https://api.openweathermap.org/data/2.5/weather?q=' + city + ',nl&lang=nl&APPID=db2fd51d2c86a07027c7d35b557b0274';

    //const new functions because otherwise it keeps getting "Almere" as city
    const getCity= () =>{
        try{
            return axios.get(url);
        }catch (error){
            console.error(error)
        }
    };

    const weatherCity = getCity()
        .then(response => {
            if (response.data) {
                return response.data
            }
        })
        .catch(error => {
            console.log(error)
        });

    //call function WeatherCity and load the page index with below variables
    weatherCity.then(function (result) {
        res.render('index', {
            title: 'Weer app',
            data: result.weather[0].description,
            temp: (result.main.temp -273.15).toFixed(1),
            minTemp: (result.main.temp_min -273.15).toFixed(1),
            maxTemp: (result.main.temp_max -273.15).toFixed(1),
            bft: (result.wind.speed * 1.9438).toFixed(1),
            humidity: (result.main.humidity).toFixed(1),
            wind: (result.wind.speed *3.61).toFixed(1),
            place: result.name
        });
    })
});

module.exports = router;
