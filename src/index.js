// -* Data should comming from https://www.weatherapi.com/docs/

// HOME WORK
// - Next to units, there should be button 'Show' favs', after pressing it should become 'Show all' and only favs cities should be shown in grid (units, more/less and searching should still work on favs)

const CONTROL_BUTTON_LABEL = {
  more: 'More',
  less: 'Less',
};

const UNITS_BUTTON_LABEL = {
  metric: 'Metric',
  imperial: 'Imperial',
};

const DATA = [
  {
    cityName: 'Southend-on-Sea',
    countryName: 'United Kingdom',
    temperatureInC: -5,
    temperatureInF: 100,
    precipitation: 78,
    humidity: 75,
    windInMph: 4,
    windInKph: 80,
    conditionText: 'cloudy',
  },
  {
    cityName: 'London',
    countryName: 'United Kingdom',
    temperatureInC: -5,
    temperatureInF: 100,
    precipitation: 78,
    humidity: 75,
    windInMph: 4,
    windInKph: 80,
    conditionText: 'cloudy',
  },
  {
    cityName: 'Barcelona',
    countryName: 'Spain',
    temperatureInC: -5,
    temperatureInF: 100,
    precipitation: 78,
    humidity: 75,
    windInMph: 4,
    windInKph: 80,
    conditionText: 'cloudy',
  },
  {
    cityName: 'Roma',
    countryName: 'Italy',
    temperatureInC: -5,
    temperatureInF: 100,
    precipitation: 78,
    humidity: 75,
    windInMph: 4,
    windInKph: 80,
    conditionText: 'cloudy',
  },
  {
    cityName: 'Moscow',
    countryName: 'Russia',
    temperatureInC: -5,
    temperatureInF: 100,
    precipitation: 78,
    humidity: 75,
    windInMph: 4,
    windInKph: 80,
    conditionText: 'cloudy',
  },
  {
    cityName: 'Berlin',
    countryName: 'Germany',
    temperatureInC: -5,
    temperatureInF: 100,
    precipitation: 78,
    humidity: 75,
    windInMph: 4,
    windInKph: 80,
    conditionText: 'cloudy',
  },
  {
    cityName: 'Luxemburg',
    countryName: 'Luxemburg',
    temperatureInC: -5,
    temperatureInF: 100,
    precipitation: 78,
    humidity: 75,
    windInMph: 4,
    windInKph: 80,
    conditionText: 'cloudy',
  },
  {
    cityName: 'Athenes',
    countryName: 'Greece',
    temperatureInC: -5,
    temperatureInF: 100,
    precipitation: 78,
    humidity: 75,
    windInMph: 4,
    windInKph: 80,
    conditionText: 'cloudy',
  },
  {
    cityName: 'Paris',
    countryName: 'France',
    temperatureInC: -5,
    temperatureInF: 100,
    precipitation: 78,
    humidity: 75,
    windInMph: 4,
    windInKph: 80,
    conditionText: 'cloudy',
  },
  {
    cityName: 'Paris2',
    countryName: 'France',
    temperatureInC: -5,
    temperatureInF: 100,
    precipitation: 78,
    humidity: 75,
    windInMph: 4,
    windInKph: 80,
    conditionText: 'cloudy',
  },
];

const ALFA = 'Show favourites';
const BETA = 'Show all';

(() => {
  const unitSwitchButtonElement = document.getElementById('units-button');
  const moreButtonElement = document.getElementById('more-or-less-button');
  const mainElement = document.querySelector('main');
  const searchFieldElement = document.getElementById('search-field');
  const searchButtonElement = document.querySelector('#search-button');
  const clearButtonElement = document.querySelector('#clear-button');
  const favouriteButtonElement = document.querySelector('#favourite-button');

  let favouriteCities = [];

  clearButtonElement.disabled = true;

  const getShouldDisplayImperial = () =>
    unitSwitchButtonElement.innerText === UNITS_BUTTON_LABEL.metric;
  const getShouldShowAll = () =>
    moreButtonElement.innerText === CONTROL_BUTTON_LABEL.less;
  const getSearchQuery = () => searchFieldElement.value;
  const getShouldShowFavsOnly = () =>
    favouriteButtonElement.innerText === ALFABETA;

  const renderTiles = (
    shouldShowAll,
    shouldDisplayImperial,
    searchQuery,
    shouldShowFavsOnly
  ) => {
    const oldTiles = document.querySelectorAll('.tile');
    oldTiles.forEach((oldTile) => oldTile.remove());

    const filteredData = DATA.filter((city) => {
      const isThisCityFavourite = favouriteCities.includes(city.cityName);

      let favsCondition;
      if (shouldShowFavsOnly) {
        favsCondition = isThisCityFavourite;
      } else {
        favsCondition = true;
      }

      let queryCondition;
      if (searchQuery) {
        queryCondition = city.cityName
          .toLowerCase()
          .includes(searchQuery.toLowerCase());
      } else {
        queryCondition = true;
      }

      return queryCondition && favsCondition;
    });
    filteredData.forEach((tile, index) => {
      const shouldThisTileBeVisible = shouldShowAll ? true : index < 8;
      const shouldDisplayImperial = getShouldDisplayImperial();

      // TITLES WRAPPER
      const titlesWrapperElement = document.createElement('div');
      titlesWrapperElement.className = 'titles-wrapper';

      const tileCityElement = document.createElement('h2');
      tileCityElement.innerHTML = tile.cityName;
      titlesWrapperElement.appendChild(tileCityElement);

      const tileCountryElement = document.createElement('p');
      tileCountryElement.innerHTML = tile.countryName;
      titlesWrapperElement.appendChild(tileCountryElement);
      //

      // HEADER
      const tileHeaderElement = document.createElement('header');
      const tileIconElement = document.createElement('div');
      tileIconElement.className = 'weather-icon';

      tileHeaderElement.appendChild(titlesWrapperElement);
      tileHeaderElement.appendChild(tileIconElement);
      //

      // DATA WRAPPER
      const tileDataWrapperElement = document.createElement('main');

      const tileTemperatureElement = document.createElement('p');
      if (shouldDisplayImperial) {
        tileTemperatureElement.innerHTML =
          'Temperature in F: ' + tile.temperatureInF;
      } else {
        tileTemperatureElement.innerHTML =
          'Temperature in C: ' + tile.temperatureInC;
      }

      const tilePrecipitationElement = document.createElement('p');
      tilePrecipitationElement.innerHTML =
        'Precipitation: ' + tile.precipitation;

      const tileHumidityElement = document.createElement('p');
      tileHumidityElement.innerHTML = 'Humidity: ' + tile.humidity;

      const tileWindInMphElement = document.createElement('p');
      if (shouldDisplayImperial) {
        tileWindInMphElement.innerHTML = 'Wind in MpH: ' + tile.windInMph;
      } else {
        tileWindInMphElement.innerHTML = 'Wind in KpH: ' + tile.windInKph;
      }

      const tileConditionTextElement = document.createElement('p');
      tileConditionTextElement.innerHTML = 'Condition: ' + tile.conditionText;

      tileDataWrapperElement.appendChild(tileTemperatureElement);
      tileDataWrapperElement.appendChild(tilePrecipitationElement);
      tileDataWrapperElement.appendChild(tileHumidityElement);
      tileDataWrapperElement.appendChild(tileWindInMphElement);
      tileDataWrapperElement.appendChild(tileConditionTextElement);
      //

      // FAVOURITE BUTTON
      const favouriteButtonWrapperElement = document.createElement('footer');

      const favouriteButtonElement = document.createElement('button');
      const isThisCityFavourite = favouriteCities.includes(tile.cityName);
      favouriteButtonElement.classList.add(
        'favourite-button',
        isThisCityFavourite ? 'remove' : 'add'
      );
      favouriteButtonElement.innerText = isThisCityFavourite ? '-' : '+';

      favouriteButtonElement.onclick = () => {
        if (isThisCityFavourite) {
          favouriteCities = favouriteCities.filter(
            (city) => city !== tile.cityName
          );
        } else {
          favouriteCities.push(tile.cityName);
        }

        const currentShouldShowAll = getShouldShowAll();
        const shouldDisplayImperial = getShouldDisplayImperial();
        const searchQuery = getSearchQuery();
        renderTiles(currentShouldShowAll, shouldDisplayImperial, searchQuery);
      };

      favouriteButtonWrapperElement.appendChild(favouriteButtonElement);
      //

      // TILE
      const tileElement = document.createElement('div');
      tileElement.className = 'tile';
      tileElement.style.display = shouldThisTileBeVisible ? 'flex' : 'none';

      tileElement.appendChild(tileHeaderElement);
      tileElement.appendChild(tileDataWrapperElement);
      tileElement.appendChild(favouriteButtonWrapperElement);
      //

      mainElement.appendChild(tileElement);
    });
  };

  favouriteButtonElement.innerText = ALFA;
  favouriteButtonElement.onclick = () => {
    const currentShouldShowAll = getShouldShowAll();
    const shouldDisplayImperial = getShouldDisplayImperial();
    const searchQuery = getSearchQuery();
    const shouldShowFavsOnly = getShouldShowFavsOnly();

    renderTiles(
      currentShouldShowAll,
      shouldDisplayImperial,
      searchQuery,
      shouldShowFavsOnly
    );
  };

  moreButtonElement.innerText = CONTROL_BUTTON_LABEL.more;
  moreButtonElement.onclick = () => {
    const currentShouldShowAll = getShouldShowAll();
    moreButtonElement.innerText =
      CONTROL_BUTTON_LABEL[currentShouldShowAll ? 'more' : 'less'];
    const newShouldShowAll = !currentShouldShowAll;
    const shouldDisplayImperial = getShouldDisplayImperial();
    const searchQuery = getSearchQuery();
    const shouldShowFavsOnly = getShouldShowFavsOnly();

    renderTiles(
      newShouldShowAll,
      shouldDisplayImperial,
      searchQuery,
      shouldShowFavsOnly
    );
  };

  unitSwitchButtonElement.innerText = UNITS_BUTTON_LABEL.imperial;
  unitSwitchButtonElement.onclick = () => {
    const currentShouldDisplayImperial = getShouldDisplayImperial();
    unitSwitchButtonElement.innerText =
      UNITS_BUTTON_LABEL[currentShouldDisplayImperial ? 'imperial' : 'metric'];
    const newShouldDisplayImperial = !currentShouldDisplayImperial;
    const shouldShowAll = getShouldShowAll();
    const searchQuery = getSearchQuery();
    const shouldShowFavsOnly = getShouldShowFavsOnly();

    renderTiles(
      shouldShowAll,
      newShouldDisplayImperial,
      searchQuery,
      shouldShowFavsOnly
    );
  };

  searchButtonElement.disabled = true;
  searchButtonElement.onclick = () => {
    const searchQuery = getSearchQuery();
    const shouldShowAll = getShouldShowAll();
    const shouldDisplayImperial = getShouldDisplayImperial();
    const shouldShowFavsOnly = getShouldShowFavsOnly();

    renderTiles(
      shouldShowAll,
      shouldDisplayImperial,
      searchQuery,
      shouldShowFavsOnly
    );
  };

  const handleSearchFieldElementOnChange = () => {
    const currentNumberOfCharsInSearchField = searchFieldElement.value.length;

    searchButtonElement.disabled = !(currentNumberOfCharsInSearchField > 2);
    clearButtonElement.disabled = !currentNumberOfCharsInSearchField;
  };
  searchFieldElement.addEventListener(
    'input',
    handleSearchFieldElementOnChange
  );

  renderTiles();
})();
