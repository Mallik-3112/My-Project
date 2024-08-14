//Weather Api.
const apiUrl = "https://api.openweathermap.org/data/2.5/weather?&units=metric&q=";
const apiKey = "8237f5fa8e0d66b723f9f0a8d84522c0";

const searchBox = document.querySelector(".search input");
const searchBtn = document.querySelector(".search button");
const weatherIcon = document.querySelector(".weather-icon");
const errorMsg = document.querySelector(".error");

async function checkWeather(city) {
    const response = await fetch(apiUrl + city + `&appid=${apiKey}`);

    if (response.status === 404) {
        document.querySelector(".error").style.display = "block";//Error handeling
    } else {
        var data = await response.json();//Fetching response from API.
        var cityName = await searchBox.value;//Fething response from search input.

    document.querySelector(".city").innerHTML = data.name;
    document.querySelector(".weather h1").innerHTML = Math.round(data.main.temp) + "°c";
    document.querySelector(".hum-percent").innerHTML = data.main.humidity + "%";
    document.querySelector(".wind-speed").innerHTML = data.wind.speed + " Km/hr";

    if(data.description == "Heavy rain with thunderstorm") {//rain icon display condition 
        weatherIcon.src = "images/rain.png";
    }
    else if(data.description == "Partly cloudy") {//cloud icon display condition
        weatherIcon.src = "images/clouds.png";
    }
    else if(data.description == "Mist, rain") {//mist icon display condition
        weatherIcon.src = "images/mist.png";
    }
    else if(data.description == "Moderate or heavy rain shower" || "Haze, rain with thunderstorm") {
        weatherIcon.src = "images/rain.png";
    }
    else if(data.description == "Patchy light drizzle" || "Light rain with thunderstorm") {//light drizzle icon display condition
        weatherIcon.src = "images/drizzle.png";
    }
    else if(data.description == "Sunny" || "Clear") {//sunny icon display condition
        weatherIcon.src = "images/clear.png";
    }
    else{
        weatherIcon.src = "images/snow.png"//snow icon display condition
    }
    document.querySelector(".error").style.display = "none";
    }
}
checkWeather();
searchBtn.addEventListener("click", () =>{// search button click response
    checkWeather(searchBox.value);
})