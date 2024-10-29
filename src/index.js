import { style } from './style.css';
const btn = document.querySelector('button');
const cityInput = document.querySelector('#cityInput');
const conditionsText = document.querySelector('.conditionsText');
const cityText = document.querySelector('.cityText');
const temperatureText = document.querySelector('.temperatureText');
const feelslikeText = document.querySelector('.feelslikeText');
const humidityText = document.querySelector('.humidityText');
const windspeedText = document.querySelector('.windspeedText');

cityText.style.fontSize = '4rem';
conditionsText.style.fontSize = '2rem';
temperatureText.style.fontSize = '8rem';

btn.addEventListener('click', (e) => {
  createObject();
  e.preventDefault();
});

async function getData() {
  let city = cityInput.value;
  const url = `https://weather.visualcrossing.com/VisualCrossingWebServices/rest/services/timeline/${city}%2CUK?unitGroup=us&key=B7QKQZH98TGTXAPUEC4FTWQT8`;
  try {
    const response = await fetch(url);
    if (!response.ok) {
      throw new Error(`Response status: ${response.status}`);
    }
    const json = await response.json();
    return json;
  } catch (error) {
    console.error(error.message);
  }
}

async function createObject() {
  const obj = {};
  const json = await getData();
  obj.city = json.resolvedAddress;
  obj.conditions = json.currentConditions.conditions;
  obj.temperature = json.currentConditions.temp;
  obj.feelslike = json.currentConditions.feelslike;
  obj.humidity = json.currentConditions.humidity;
  obj.windspeed = json.currentConditions.windspeed;
  console.log(obj);

  cityText.textContent = obj.city;
  conditionsText.textContent = obj.conditions;
  temperatureText.textContent = `${obj.temperature} °F`;
  feelslikeText.textContent = `FEELS LIKE: ${obj.feelslike} °F`;
  humidityText.textContent = `HUMIDITY: ${obj.humidity}%`;
  windspeedText.textContent = `WIND: ${obj.windspeed} MPH`;
}
