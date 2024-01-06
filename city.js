import element from './element.js'

export default function newCity(city, parentUI, utils) {
    let cityUI = element('div', 'city', parentUI);

    let name = element('div', 'city-name', cityUI, city.name);
    let cardsCount = element('div', 'city-cards right', cityUI, city.cards);
    let percent = element('div', 'city-percent', cityUI, Math.floor(100 / utils.getTotalCards() * city.cards));

    let decreaseBtn = element('div', 'city-btn', cityUI, '-');
    let increaseBtn = element('div', 'city-btn', cityUI, '+');

    decreaseBtn.addEventListener('click', function(){
        utils.updateCityCards(city.name, '-');
        utils.updateLocalStorage();
        utils.render();
    });

    increaseBtn.addEventListener('click', function(){
        utils.updateCityCards(city.name, '+');
        utils.updateLocalStorage();
        utils.render();
    });
}