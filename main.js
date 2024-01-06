import './style.css'
import popup from './popup.js'
import element from './element.js';
import newCity from './city.js';

let cities = {};

if (localStorage.getItem('pandemic'))
  cities = JSON.parse(localStorage.getItem('pandemic'));

let utils = {};

utils.render = render;
utils.getTotalCards = getTotalCards;
utils.updateCityCards = updateCityCards;
utils.updateLocalStorage = updateLocalStorage;

render();

let addCity = document.body.querySelector('.add-city');

addCity.addEventListener('click', () => {
  popup(
    '<input type="text" class="new-city-input" />',
    () => {
      let input = document.body.querySelector('.new-city-input');
      let cityName = input.value;

      if (!cityName)
        return;

      updateCityCards(cityName, '+');

      updateLocalStorage();

      console.log('cities: ', cities)

      render();
  });
});

let refreshCities = document.body.querySelector('.refresh-cities');

refreshCities.addEventListener('click', () => {
  popup(
    '<div class="text" style="font-size: 20px; text-align: center;">Refresh cards?</div>',
    () => {

      for (let city in cities)
        delete cities[city];

      updateLocalStorage(true);

      render();
  });
});

function render() {
  let scene = document.querySelector('.scene');
  scene.innerHTML = '';

  let cardTotal = element('div', 'cards-total', scene, 'TOTAL CARDS: ' + getTotalCards());
  let citiesContainer = element('div', 'cities-container', scene);

  for (let city in cities)
    newCity(cities[city], citiesContainer, utils);
}

function getTotalCards() {
  return Object.entries(cities).reduce((acc, current) => acc + current[1].cards, 0);
}

function updateCityCards(cityName, value) {
  if (!cities[cityName]) {
    cities[cityName] = {
      cards: 1,
      name: cityName
    }

    return;
  }

  if (value === '+')
    cities[cityName].cards++
  else
    cities[cityName].cards--;

  if (!cities[cityName].cards) {
    delete cities[cityName]

    return;
  }
}

function updateLocalStorage(remove) {

  if (remove) {
    localStorage.removeItem('pandemic');

    return;
  }

  localStorage.setItem('pandemic', JSON.stringify(cities));
}