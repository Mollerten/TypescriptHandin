// const { Navigator } = require("node-navigator");
// const navigator = new Navigator();
// const axios = require("axios");

function getLocation() {
    return new Promise((resolve, reject) => {
        if (navigator.geolocation) {
            navigator.geolocation.getCurrentPosition(
                (position) => resolve(position.coords),
                (error) => reject(new Error("Failed to retrieve geolocation."))
            );
        } else {
            reject(new Error("Geolocation is not supported by this browser."));
        }
    });
}

async function getWeather(coords) {
    const apiKey = "249af63cc6c466cb2d0360e204ba237e";
    const url = `http://api.openweathermap.org/data/2.5/weather?lat=${coords.latitude}&lon=${coords.longitude}&apiKey=${apiKey}`;

    try {
        const response = await fetch(url);
        const weather = await response.json();
        return weather;
    } catch (error) {
        throw new Error(error.message);
    }
}

async function main() {
    try {
        const coords = await getLocation();
        const weather = await getWeather(coords);
        document.getElementById('weather').innerHTML = weather.main.temp + ' ' + weather.weather[0].description;
        console.log(weather);
    } catch (error) {
        console.error("Error:", error.message);
    }
}

main();

