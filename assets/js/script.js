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

var todaysForecast = function(current) {
    var cityHeading = document.querySelector("#city-name");
    var temperature = document.querySelector("#weather-temp");
    var wind = document.querySelector("#weather-wind");
    var humidity = document.querySelector("#weather-humid");
    var uvIndex = document.querySelector("#weather-uvi");
    var weatherIcon = document.querySelector("#weather-icon");

    cityHeading.textContent = cityInput.value.trim();

    document.querySelector("#weather-info").setAttribute("display","block")

        temperature.textContent = "Temp: " + current.temp + "°F";
        wind.textContent = "Wind: " + current.wind_speed + "MPH";
        humidity.textContent = "Humidity: " + current.humidity + "&deg;";
        weatherIcon.src = "http://openweathermap.org/img/wn/" + current.weather.icon ;
        uvIndex.textContent = "UV Index: " + current.uvi;
        cityName.textContent = cityInput.value;
};


function saveSearch() {
    localStorage.setItem();
}


searchForm.addEventListener("submit", submitCity);
//searchHistory.addEventListener("click");