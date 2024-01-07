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

let circle = {
  size: 50,
  colors: [
    '7E2553',
    'FF004D',
    'F8E559',
    '6DA4AA',
    'DC84F3',
    'A1EEBD'
  ],
  colorIndex: 0,
  items: {}
}

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

let selectPlayerBtn = document.body.querySelector('.select-player');
let selectPlayerScene = document.body.querySelector('.select-player-scene');

selectPlayerScene.addEventListener('touchstart', touchStart);
selectPlayerScene.addEventListener('touchmove', touchMove);
selectPlayerScene.addEventListener('touchend', touchEnd);


function touchStart(event) {
  for (let i = 0; i < event.touches.length; i++) {
    let touch = event.touches[i];

    let circleUI = element('div', 'player-circle', selectPlayerScene);
    circleUI.style.width = circle.size + 'px';
    circleUI.style.height = circle.size + 'px';
    circleUI.style.left = touch.pageX - circle.size / 2 + 'px';
    circleUI.style.top = touch.pageY - circle.size / 2 + 'px';
    circleUI.style.backgroundColor = '#' + circle.colors[circle.colorIndex];

    circle.colorIndex++;

    if (circle.colorIndex >= circle.colors.length)
      circle.colorIndex = 0;

    circle.items[touch.identifier] = {
      ui: circleUI
    }

  }
}

function touchMove(event) {
  for (let i = 0; i < event.touches.length; i++) {
    let touch = event.touches[i];

    circle.items[touch.identifier].ui.style.left = touch.pageX - circle.size / 2 + 'px';
    circle.items[touch.identifier].ui.style.top = touch.pageY - circle.size / 2 + 'px';
  }
}

function touchEnd(event) {
  for (let i = 0; i < event.changedTouches.length; i++) {
    let touch = event.changedTouches[i];

    circle.items[touch.identifier].ui.parentNode.removeChild(circle.items[touch.identifier].ui);

    delete circle.items[touch.identifier];
  }
}

selectPlayerBtn.addEventListener('click', function() {
  popup(
    '<div class="text" style="font-size: 20px; text-align: center;">Select first player?</div>',
    selectFirstPlayer
  );
});

function render() {
  let scene = document.querySelector('.scene');
  scene.innerHTML = '';

  let cardTotal = element('div', 'cards-total', scene, 'TOTAL CARDS: ' + getTotalCards());
  let citiesContainer = element('div', 'cities-container', scene);

  for (let city in cities)
    newCity(cities[city], citiesContainer, utils);
}

function selectFirstPlayer() {
  selectPlayerScene.classList.add('shown');
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