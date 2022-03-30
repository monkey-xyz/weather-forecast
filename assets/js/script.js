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

    }
}


var globalSearch = function (city) {
    var geoCodeApi = 'http://api.openweathermap.org/geo/1.0/direct?q=' + city + ',US&limit=5&appid=4956f3dda9aec433400a8f2f8bb5d4cd'

    fetch(geoCodeApi)
    .then (function (response) {
        if (response.ok) {
            response.json().then(function (data) {
                console.log(data);
                for (var i = 0; i < data.length; i++) {
                    var lon = data[i].lon;
                    var lat = data[i].lat;

                    weatherSearch(lat,lon);
               }
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
    var weatherApi = 'https://api.openweathermap.org/data/2.5/onecall?lat=' + lat + '&lon=' + lon + '&exclude=minutely,hourly,alerts&appid=4956f3dda9aec433400a8f2f8bb5d4cd'

    fetch(weatherApi)
    .then (function (response) {
        if (response.ok) {
            console.log(response);
            response.json().then(function (data) {
                console.log(data);
                todaysForecast(data.current)
            })
        }
    })
};

var todaysForecast = function(data) {
    var cityHeading = document.querySelector("#city-name");
    var temperature = document.querySelector("#weather-temp");
    var wind = document.querySelector("#weather-wind");
    var humidity = document.querySelector("#weather-humid");
    var uvIndex = document.querySelector("#weather-uvi");
    var weatherIcon = document.querySelector("#weather-icon")

    cityHeading.textContent = cityInput.value.trim();

    for (var i = 0; i < data.length;) {
        temperature.textContent = "Temp: " + data[i].current.temp + "°F";
        wind.textContent = "Wind: " + data[i].current.wind_speed + "MPH";
        humidity.textContent = "Humidity: " + data[i].current.humidity + "%";
        weatherIcon.src = "http://openweathermap.org/img/wn/" + data[i].current.weather.icon + ".png";
        uvIndex.textContent = "UV Index: " + data[i].current.uvi;
        cityName.textContent = cityInput.value;
    }
};


function saveSearch() {
    localStorage.setItem();
}


searchForm.addEventListener("submit", submitCity);
//searchHistory.addEventListener("click");