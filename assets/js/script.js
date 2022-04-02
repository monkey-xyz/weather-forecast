var searchForm = document.querySelector("#city-form");
var forecastInfo = document.querySelector("#forecast-info");
var searchHistory = document.querySelector("#search-history");
var cityInput = document.querySelector("#city-search")
var fiveDayForecast = document.querySelector("#forecast-five");

var submitCity = function (event) {
    event.preventDefault();

    var city = cityInput.value.trim();

    if (city) {
        globalSearch(city);
        saveSearch(city);

    } else {
        alert("Please enter a city.")
    }
}


var globalSearch = function (city) {
    var geoCodeApi = 'http://api.openweathermap.org/geo/1.0/direct?q=' + city + '&limit=5&appid=4956f3dda9aec433400a8f2f8bb5d4cd'

    fetch(geoCodeApi)
    .then (function (response) {
        if (response.ok) {
            response.json().then(function (data) {
                console.log(data);
                var lon = data[0].lon;
                var lat = data[0].lat;

                weatherSearch(lat,lon);
            });
        } else {
            alert("Please enter a real city name.")
        }
    })
    .catch(function(error) {
        alert("Unable to connect.")
    })
};

var weatherSearch = function (lat, lon) {
    var weatherApi = 'https://api.openweathermap.org/data/2.5/onecall?lat=' + lat + '&lon=' + lon + '&exclude=minutely,hourly,alerts&units=imperial&appid=4956f3dda9aec433400a8f2f8bb5d4cd'

    fetch(weatherApi)
    .then (function (response) {
        if (response.ok) {
            console.log(response);
            response.json().then(function (data) {
                console.log(data);
                todaysForecast(data);
            })
        }
    })
};

var todaysForecast = function(data) {

    document.querySelector("#weather-info").classList.remove("hidden");

    var cityHeading = document.querySelector("#city-name");
    var temperature = document.querySelector("#weather-temp");
    var wind = document.querySelector("#weather-wind");
    var humidity = document.querySelector("#weather-humid");
    var uvIndex = document.querySelector("#weather-uvi");
    var weatherIcon = document.querySelector("#weather-icon");

    cityHeading.textContent = cityInput.value.trim();

    temperature.textContent = "Temp: " + data.current.temp + "°F";
    wind.textContent = "Wind: " + data.current.wind_speed + "MPH";
    humidity.textContent = "Humidity: " + data.current.humidity + "%";
    weatherIcon.src = "http://openweathermap.org/img/wn/" + data.current.weather[0].icon + "@2x.png" ;
    uvIndex.textContent = "UV Index: " + data.current.uvi;
    cityHeading.textContent = cityInput.value;

    if (data.current.uvi < 3) {
        uvIndex.setAttribute("style", "background: green;")
    } else if (data.current.uvi > 3 && data.current.uvi < 6) {
        uvIndex.setAttribute("style", "background: yellow;")
    } else {
        uvIndex.setAttribute("style", "background: red;")
    }
};

var fiveForecast = function(data) {
    const popCard = document.createElement("div");
    const popImage = document.createElement("img");
    const popUL = document.createElement("ul");
    const popTemp = document.createElement("li");
    const popWind = document.createElement("li");
    const popHumid = document.createElement("li");

    //for (var i = 0; i < data.daily.length; i++) {

    //}

    temperature.textContent = "Temp: " + data.daily[i].temp + "°F";
    wind.textContent = "Wind: " + data.daily[i].wind_speed + "MPH";
    humidity.textContent = "Humidity: " + data.daily[i].humidity + "%";
    weatherIcon.src = "http://openweathermap.org/img/wn/" + data.daily[i].weather[0].icon + "@2x.png" ;
}


function saveSearch(city) {

    var getLocation = document.createElement("button");
    getLocation.classList.add("city-button");
    getLocation.textContent = city;

    searchHistory.appendChild(getLocation);

    localStorage.setItem("location", JSON.stringify(city));

}

function pullSearch() {
    JSON.parse(localStorage.getItem("location"));
}

var buttonSearch = function(event) {
    event.preventDefault();
    var city = this.innerText;

    globalSearch(city);
}

pullSearch();

searchForm.addEventListener("submit", submitCity);
searchHistory.addEventListener("click", buttonSearch);