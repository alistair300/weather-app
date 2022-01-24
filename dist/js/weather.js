const cityInput = document.querySelector('#city');
const country = document.querySelector('#country');
const weatherIcon = document.querySelector('#icon');
const desc = document.querySelector('#desc');
const tempEl = document.querySelector('#temp');
const toggler = document.querySelector('#toggler');
const feelsLike = document.querySelector('#feels-like');
const high = document.querySelector('#high');
const low = document.querySelector('#low');
const sunriseEl = document.querySelector('#sunrise');
const sunsetEl = document.querySelector('#sunset');
const celsius = document.querySelector('#celsius');
const fahrenheit = document.querySelector('#fahrenheit');

const key = 'd827e041cb5c2725d5b12d56454bbcb7';

// fetch weather data
const getWeather = (city, units) => {
  fetch(
    `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${key}&units=${units}`
  )
    .then((res) => res.json())
    .then((data) => {
      console.log(data);
      displayWeather(data);
    })
    .catch((err) => console.log(err));
};

// display the weather data in the DOM
const displayWeather = (data) => {
  //   console.log(data);
  const { main, name, sys, weather, timezone, time } = data;
  const { temp, feels_like, temp_min, temp_max } = main;
  const { sunrise, sunset } = sys;
  const { description, icon } = weather[0];

  const weatherName = data.weather[0].main;

  cityInput.innerText = titleCase(name);
  country.innerText = data.sys.country;
  weatherIcon.src = `
  http://openweathermap.org/img/wn/${icon}@4x.png
  `;
  desc.innerText = description;
  tempEl.innerText = Math.round(temp);
  feelsLike.innerText = Math.round(feels_like);
  high.innerText = Math.round(temp_max);
  low.innerText = Math.round(temp_min);
  sunriseEl.innerText = moment
    .unix(sunrise + timezone)
    .utc()
    .format('hh:mm A');
  sunsetEl.innerText = moment
    .unix(sunset + timezone)
    .utc()
    .format('hh:mm A');

  setWeatherClass(weatherName);
};

cityInput.addEventListener('keydown', (e) => {
  if (e.key === 'Enter') {
    e.preventDefault();

    const city = titleCase(cityInput.innerText);
    getWeather(city, 'metric');
  }
});

function titleCase(str) {
  return str
    .toLowerCase()
    .split(' ')
    .map((val) => val.replace(val.charAt(0), val.charAt(0).toUpperCase()))
    .join(' ');
}

function toggleUnit() {
  if (celsius.classList.contains('active')) {
    celsius.classList.remove('active');
    fahrenheit.classList.add('active');
    getWeather(cityInput.innerText, 'imperial');
  } else {
    celsius.classList.add('active');
    fahrenheit.classList.remove('active');
    getWeather(cityInput.innerText, 'metric');
  }
}

toggler.addEventListener('click', toggleUnit);

// add weather class to body depending on weather description
const body = document.querySelector('body');

function setWeatherClass(weather, data) {
  if (weather === 'Clear') {
    removeClass();
    getTime(data);
  } else if (weather === 'Clouds') {
    removeClass();
    body.classList.add('clouds');
  } else if (weather === 'Rain' || weather === 'Drizzle') {
    removeClass();
    body.classList.add('rain');
  } else if (weather === 'Thunderstorm') {
    removeClass();
    body.classList.add('thunderstorm');
  } else if (weather === 'Snow') {
    removeClass();
    body.classList.add('snow');
  } else if (
    weather === 'Mist' ||
    weather === 'Smoke' ||
    weather === 'Haze' ||
    weather === 'Dust' ||
    weather === 'Fog'
  ) {
    removeClass();
    body.classList.add('fog');
  }
}

// remove weather class from body when weather description changes
function removeClass() {
  body.classList.remove('clouds');
  body.classList.remove('rain');
  body.classList.remove('thunderstorm');
  body.classList.remove('snow');
  body.classList.remove('fog');
  body.classList.remove('sunny');
  body.classList.remove('night');
}

function getTime(time) {
  const timeNow = moment.unix(time).utc().format('hh');

  if (timeNow >= 6 && timeNow <= 18) {
    removeClass();
    body.classList.add('sunny');
  } else {
    removeClass();
    body.classList.add('night');
  }
}

const close = document.querySelector('#close');
const tooltip = document.querySelector('#tooltip');

close.addEventListener('click', () => {
  tooltip.remove();
});
