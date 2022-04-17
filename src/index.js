let now = new Date();
let currenttimeday = document.querySelector("li.currenttimeday");
let hours = now.getHours();
let minutes = now.getMinutes();
if (minutes < 10) {
  minutes = `0${minutes}`;
}
let days = [
  "Sunday",
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday"
];
debugger;

let day = days[now.getDay()];
currenttimeday.innerHTML = `${day} ${hours}:${minutes}`;

function formatDay(timestamp){
  let date = new Date(timestamp * 1000);
  let day = date.getDay();
  let days = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];

  return days[day];
}

function displayForecast(response){
  let forecast = response.data.daily;
  let forecastElement = document.querySelector("#forecast");


  let forecastHTML = `<div class="row">`;
  forecast.forEach(function (forecastDay, index) {
    if (index < 6){
    forecastHTML =
      forecastHTML +
      `
      <div class="col-2">
        <div class="weather-forecast-date">${formatDay(forecastDay.dt)}</div>
        <img
          src="http://openweathermap.org/img/wn${forecastDay.weather[0].icon}@2x.png"
          alt=""
          width="42"
        />
        <div class="weather-forecast-temperatures">
          <span class="weather-forecast-temperature-max"> ${Math.round(forecastDay.temp.max)}°</span>
          <span class="weather-forecast-temperature-min"> ${Math.round(forecastDay.temp.min)}°</span>
        </div>
      </div>
  `;
    }
  });

  forecastHTML = forecastHTML + `</div>`;
  forecastElement.innerHTML = forecastHTML;
}

function getForecast(coordinates){
console.log(coordinates);
let apiKey = "f7fa5fb6284592ffde91f927588e92e2";
let apiUrl = `https://api.openweathermap.org/data/2.5/onecall?lat=${coordinates.lat}&lon=${coordinates.lon}&appid=${apiKey}&units=metric`;
console.log(apiUrl);
axios.get(apiUrl).then(displayForecast);
}


function search(event) {
  event.preventDefault();
  let searchInput = document.querySelector("#search-text-input");
  console.log(searchInput.value);
  let h4 = document.querySelector("h4");
  h4.innerHTML = `${searchInput.value}`;
}

let form = document.querySelector("#search-form");
form.addEventListener("submit", search);

function displayWeatherCondition(response) {
  console.log(response.data);
  document.querySelector("#city").innerHTML = response.data.name;
  document.querySelector("#temperature").innerHTML = `${Math.round(
    response.data.main.temp
  )}°C`;
  document.querySelector("#humidity").innerHTML = response.data.main.humidity;
  document.querySelector("#wind").innerHTML = Math.round(
    response.data.wind.speed
  );
  document.querySelector("#description").innerHTML =
    response.data.weather[0].main;
  
    celsiusTemperature = response.data.main.temp;

}

function searchCity(event) {
  event.preventDefault();
  let searchInput = document.querySelector("#search-text-input");
  let city = searchInput.value;
  let units = "metric";
  let apiKey = "f7fa5fb6284592ffde91f927588e92e2";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=${units}`;

  axios.get(apiUrl).then(displayIconTemperature);
  axios.get(apiUrl).then(displayWeatherCondition);

}

let searchForm = document.querySelector("#search-form");
searchForm.addEventListener("submit", searchCity);

function searchLocation(position) {
  let apiKey = "f7fa5fb6284592ffde91f927588e92e2";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${position.coords.latitude}&lon=${position.coords.longitude}&appid=${apiKey}&units=metric`;

  axios.get(apiUrl).then(displayWeatherCondition);
}

function getCurrentLocation(event) {
  event.preventDefault();
  navigator.geolocation.getCurrentPosition(searchLocation);
}

let currentLocationButton = document.querySelector("#current-location-button");
currentLocationButton.addEventListener("click", getCurrentLocation);

function displayIconTemperature(response){
  let iconElement = document.querySelector("#icon");
  iconElement.setAttribute("src", `http://openweathermap.org/img/wn/${response.data.weather[0].icon}@2x.png`);
  iconElement.setAttribute("alt", response.data.weather[0].description);

    getForecast(response.data.coord);

}

//displayForecast();
