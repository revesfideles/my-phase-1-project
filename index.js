// Function to fetch weather data from the API
function fetchWeatherData() {
  const url = 'https://api.open-meteo.com/v1/forecast?latitude=41.0895&longitude=-73.8419&current=temperature_2m,relative_humidity_2m,apparent_temperature,precipitation,rain,showers,snowfall,cloud_cover,wind_speed_10m,wind_direction_10m,wind_gusts_10m&minutely_15=temperature_2m,relative_humidity_2m,precipitation,rain,snowfall,snowfall_height,wind_speed_10m,wind_speed_80m&hourly=temperature_2m,relative_humidity_2m,precipitation_probability,precipitation,rain,showers,snowfall,wind_speed_10m,wind_speed_80m,wind_speed_120m,wind_speed_180m,temperature_80m,temperature_120m,temperature_180m,uv_index&daily=temperature_2m_max,temperature_2m_min,sunrise,sunset,uv_index_max,precipitation_sum,rain_sum,showers_sum,snowfall_sum,precipitation_hours&temperature_unit=fahrenheit&wind_speed_unit=mph&precipitation_unit=inch&past_hours=12&past_minutely_15=12&forecast_hours=12&forecast_minutely_15=48';

  return fetch(url)
    .then(response => response.json())
    .then(data => data)
    .catch(error => {
      console.error('Error:', error);
      throw error;
    });
}

// Function to update HTML elements with weather data
function updateWeatherElements(data) {
  updateTemperature(data.current.temperature_2m);
  updateSunrise(data.daily.sunrise[0]);
  updateSunset(data.daily.sunset[0]);
  updateMinTemperature(data.daily.temperature_2m_min[0]);
  updateMaxTemperature(data.daily.temperature_2m_max[0]);
  updateUVIndexMax(data.daily.uv_index_max[0]);
  updateHumidity(data.current.relative_humidity_2m);
  updateDate();
  updateTime();
  updateAlerts(data.alerts);
  updateHourlyWeatherTable(data.hourly);
  updateAdditionalData(data.current);
}

// Function to update the temperature element
function updateTemperature(temperature) {
  const temperatureElement = document.getElementById('temperature');
  temperatureElement.innerText = `Temperature: ${temperature} °F`;
}

// Function to update the sunrise element and add mouseover and mouseout events
function updateSunrise(sunrise) {
  const sunriseElement = document.getElementById('sunrise');
  sunriseElement.innerText = `Sunrise: ${sunrise}`;

  // Add mouseover effect to the sunrise element
  sunriseElement.addEventListener('mouseover', () => {
    sunriseElement.classList.add('data-element');
  });

  // Add mouseout effect to the sunrise element
  sunriseElement.addEventListener('mouseout', () => {
    sunriseElement.classList.remove('data-element');
  });
}


// Function to update the sunset element
function updateSunset(sunset) {
  const sunsetElement = document.getElementById('sunset');
  sunsetElement.innerText = `Sunset: ${sunset}`;
}

// Function to update the minimum temperature element
function updateMinTemperature(minTemperature) {
  const minTemperatureElement = document.getElementById('min-temperature');
  minTemperatureElement.textContent = `Min Temperature: ${minTemperature} °F`;
}

// Function to update the maximum temperature element
function updateMaxTemperature(maxTemperature) {
  const maxTemperatureElement = document.getElementById('max-temperature');
  maxTemperatureElement.textContent = `Max Temperature: ${maxTemperature} °F`;
}

// Function to update the UV index max element
function updateUVIndexMax(uvIndexMax) {
  const uvIndexMaxElement = document.getElementById('uv-index-max');
  uvIndexMaxElement.innerText = `UV Index Max: ${uvIndexMax}`;
}

// Function to update the humidity element
function updateHumidity(humidity) {
  const humidityElement = document.getElementById('humidity');
  humidityElement.innerText = `Humidity: ${humidity}%`;
}

// Function to update the date element
function updateDate() {
  const currentDate = new Date();
  const dateElement = document.getElementById('date');
  dateElement.innerText = currentDate.toLocaleDateString();
}

// Function to update the time element
function updateTime() {
  const currentDate = new Date();
  const timeElement = document.getElementById('time');
  const currentTime = currentDate.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
  timeElement.innerText = currentTime;
}

// Function to update the alerts element
function updateAlerts(alerts) {
  const alertsList = document.getElementById('alerts-list');
  alertsList.innerHTML = '';

  if (alerts && alerts.length > 0) {
    alerts.forEach(alert => {
      const alertItem = document.createElement('li');
      alertItem.innerText = alert;
      alertsList.appendChild(alertItem);
    });
  } else {
    alertsList.innerText = 'No alerts';
  }
}

// Function to update the hourly weather table
function updateHourlyWeatherTable(hourlyData) {
  const hourlyWeatherTable = document.getElementById('hourly-weather-data');
  hourlyWeatherTable.innerHTML = '';

    // Create the table header row
    const tableHeaderRow = document.createElement('tr');
    tableHeaderRow.innerHTML = `
      <th>Time</th>
      <th>Temperature</th>
      <th>UV Index</th>
      <th>Wind Speed</th>
      <th>Relative Humidity</th>
    `;
    hourlyWeatherTable.appendChild(tableHeaderRow);  

  hourlyData.time.forEach((timestamp, index) => {
    const tableRow = document.createElement('tr');

    tableRow.innerHTML = `
      <td>${new Date(timestamp).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}</td>
      <td>${hourlyData.temperature_2m[index]}</td>
      <td>${hourlyData.uv_index[index]}</td>
      <td>${hourlyData.wind_speed_120m[index]}</td>
      <td>${hourlyData.relative_humidity_2m[index]}</td>
    `;

    hourlyWeatherTable.appendChild(tableRow);
  });
}

// Function to update additional data
function updateAdditionalData(currentData) {
  const apparentTemperature = document.getElementById('apparent-temperature');
  apparentTemperature.innerText = `Apparent Temperature: ${currentData.apparent_temperature} °F`;

  const cloudCover = document.getElementById('cloud-cover');
  cloudCover.innerText = `Cloud Cover: ${currentData.cloud_cover}%`;

  const windDirection = document.getElementById('wind-direction');
  windDirection.innerText = `Wind Direction: ${currentData.wind_direction_10m} MPH`;

  const windGusts = document.getElementById('wind-gusts');
  windGusts.innerText = `Wind Gusts: ${currentData.wind_gusts_10m} MPH`;

  const windSpeed = document.getElementById('wind-speed');
  windSpeed.innerText = `Wind Speed: ${currentData.wind_speed_10m} MPH`;
}

function updateWeatherAnimation(weatherCondition) {
  const weatherAnimationElement = document.getElementById("weather-animation");

  // Remove existing classes
  weatherAnimationElement.className = "";

  // Add the appropriate class based on the weather condition
  if (weatherCondition === "sunny") {
    weatherAnimationElement.classList.add("sunny");
  } else if (weatherCondition === "cloudy") {
    weatherAnimationElement.classList.add("cloudy");
  } else if (weatherCondition === "rainy") {
    weatherAnimationElement.classList.add("rainy");
  }

  showWeatherAnimation(); // Call the function to show the weather animation
}

// Function to show the weather animation
function showWeatherAnimation() {
  const weatherAnimationElement = document.getElementById("weather-animation");
  weatherAnimationElement.style.display = "block";
}

// Call the function to get and update the weather animation
fetchWeatherData().then((weatherData) => {
  const weatherCondition = weatherData.condition; // Assuming the API response provides the weather condition

  updateWeatherAnimation(weatherCondition);
});

// Function to handle errors
function handleError(error) {
  console.error('Error:', error);
  // Display error message to the user or perform other error handling actions
}

// Function to initialize the app
function initApp() {
  fetchWeatherData()
    .then(data => {
      updateWeatherElements(data);

      const sunriseContainer = document.getElementById('sunrise-container');
      const sunrise = document.getElementById('sunrise');
      const sunset = document.getElementById('sunset');
      const weatherCondition = data.weatherCondition; // Replace with the actual weather condition value from the API response
      updateWeatherAnimation(weatherCondition);

      let isSunriseDataVisible = false;

      sunriseContainer.addEventListener('click', () => {
        sunrise.classList.toggle('hidden');
        sunset.classList.toggle('hidden');
        isSunriseDataVisible = !isSunriseDataVisible;
      });
    })
    .catch(handleError);
}

// Call the initApp function to start the application
initApp();