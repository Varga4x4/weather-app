// -* Data should comming from https://www.weatherapi.com/docs/
//
// HOME WORK
// - Next to units, there should be button 'Show' favs', after pressing it should become 'Show all' and only favs cities should be shown in grid (units, more/less and searching should still work on favs)

// CONFIG
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
]

const BUTTON_LABELS = {
  controls: {
    less: 'Less',
    more: 'More',
  },
  unitButtons: {
    metric: 'Metric',
    imperial: 'Imperial',
  },
  showAll: 'Show all',
  showFavs: 'Show favourites',
}

//

// CONSTANTS
const unitSwitchButtonElement = document.getElementById('units-button')
const moreButtonElement = document.getElementById('more-or-less-button')
const mainElement = document.querySelector('main')
const searchFieldElement = document.getElementById('search-field')
const searchButtonElement = document.querySelector('#search-button')
const clearButtonElement = document.querySelector('#clear-button')
const favouriteButtonElement = document.querySelector('#favourite-button')
//

// HELPERS
const getShouldDisplayImperial = () =>
  unitSwitchButtonElement.innerText === BUTTON_LABELS.unitButtons.metric
const getSearchQuery = () => searchFieldElement.value
const getShouldShowAll = () =>
  moreButtonElement.innerText === BUTTON_LABELS.controls.less
const getShouldShowFavsOnly = () =>
  favouriteButtonElement.innerText === BUTTON_LABELS.showAll
//
;(() => {
  // HELPERS
  const renderTiles = (
    shouldShowAll,
    shouldDisplayImperial,
    searchQuery,
    shouldShowFavsOnly
  ) => {
    // Remove existing tiles
    document.querySelectorAll('.tile').forEach((oldTile) => oldTile.remove())

    // Render new tiles
    DATA.filter((city) => {
      const isThisCityFavourite = favouriteCities.includes(city.cityName)
      const favsCondition = shouldShowFavsOnly ? isThisCityFavourite : true
      const queryCondition = searchQuery
        ? city.cityName.toLowerCase().includes(searchQuery.toLowerCase())
        : true

      return queryCondition && favsCondition
    }).forEach((tile, index) => {
      const shouldThisTileBeVisible = shouldShowAll ? true : index < 8

      // TITLES WRAPPER
      const titlesWrapperElement = document.createElement('div')
      titlesWrapperElement.className = 'titles-wrapper'

      const tileCityElement = document.createElement('h2')
      tileCityElement.innerHTML = tile.cityName
      titlesWrapperElement.appendChild(tileCityElement)

      const tileCountryElement = document.createElement('p')
      tileCountryElement.innerHTML = tile.countryName
      titlesWrapperElement.appendChild(tileCountryElement)
      //

      // HEADER
      const tileHeaderElement = document.createElement('header')
      const tileIconElement = document.createElement('div')
      tileIconElement.className = 'weather-icon'

      tileHeaderElement.appendChild(titlesWrapperElement)
      tileHeaderElement.appendChild(tileIconElement)
      //

      // TEMP
      const TILE_LABELS = {
        _separator: ': ',
        condition: 'Condition',
        humidity: 'Humidity',
        precipitation: 'Precipitation',
        temperature: {
          inC: 'Temperature in C',
          inF: 'Temperature in F',
        },
        wind: {
          inKpH: 'Wind in KpH',
          inMpH: 'Wind in MpH',
        },
      }

      // DATA WRAPPER
      const tileDataWrapperElement = document.createElement('main')

      const tileTemperatureElement = document.createElement('p')
      tileTemperatureElement.innerHTML =
        TILE_LABELS.temperature[shouldDisplayImperial ? 'inF' : 'inC'] +
        TILE_LABELS._separator +
        tile[shouldDisplayImperial ? 'temperatureInF' : 'temperatureInC']

      const tilePrecipitationElement = document.createElement('p')
      tilePrecipitationElement.innerHTML =
        TILE_LABELS.precipitation + TILE_LABELS._separator + tile.precipitation

      const tileHumidityElement = document.createElement('p')
      tileHumidityElement.innerHTML =
        TILE_LABELS.humidity + TILE_LABELS._separator + tile.humidity

      const tileWindInMphElement = document.createElement('p')
      tileWindInMphElement.innerHTML =
        TILE_LABELS.wind[shouldDisplayImperial ? 'inMpH' : 'inKpH'] +
        TILE_LABELS._separator +
        tile[shouldDisplayImperial ? 'windInMph' : 'windInKph']

      const tileConditionTextElement = document.createElement('p')
      tileConditionTextElement.innerHTML =
        TILE_LABELS.condition + TILE_LABELS._separator + tile.conditionText

      tileDataWrapperElement.appendChild(tileTemperatureElement)
      tileDataWrapperElement.appendChild(tilePrecipitationElement)
      tileDataWrapperElement.appendChild(tileHumidityElement)
      tileDataWrapperElement.appendChild(tileWindInMphElement)
      tileDataWrapperElement.appendChild(tileConditionTextElement)
      //

      // FAVOURITE BUTTON
      const favouriteButtonWrapperElement = document.createElement('footer')

      const favouriteButtonElement = document.createElement('button')
      const isThisCityFavourite = favouriteCities.includes(tile.cityName)
      favouriteButtonElement.classList.add(
        'favourite-button',
        isThisCityFavourite ? 'remove' : 'add'
      )
      favouriteButtonElement.innerText = isThisCityFavourite ? '-' : '+'

      favouriteButtonElement.onclick = () => {
        if (isThisCityFavourite) {
          favouriteCities = favouriteCities.filter(
            (city) => city !== tile.cityName
          )
        } else {
          favouriteCities.push(tile.cityName)
        }

        const currentShouldShowAll = getShouldShowAll()
        const shouldDisplayImperial = getShouldDisplayImperial()
        const searchQuery = getSearchQuery()
        renderTiles(currentShouldShowAll, shouldDisplayImperial, searchQuery)
      }

      favouriteButtonWrapperElement.appendChild(favouriteButtonElement)
      //

      // TILE
      const tileElement = document.createElement('div')
      tileElement.className = 'tile'
      tileElement.style.display = shouldThisTileBeVisible ? 'flex' : 'none'

      tileElement.appendChild(tileHeaderElement)
      tileElement.appendChild(tileDataWrapperElement)
      tileElement.appendChild(favouriteButtonWrapperElement)
      //

      mainElement.appendChild(tileElement)
    })
  }
  //

  let favouriteCities = []

  // CLEAR_BUTTON_ELEMENT
  clearButtonElement.disabled = true
  //

  // FAVOURITE_BUTTON_ELEMENT
  favouriteButtonElement.innerText = BUTTON_LABELS.showFavs
  favouriteButtonElement.onclick = () => {
    const currentShouldShowAll = getShouldShowAll()
    const shouldDisplayImperial = getShouldDisplayImperial()
    const searchQuery = getSearchQuery()
    const shouldShowFavsOnly = getShouldShowFavsOnly()

    renderTiles(
      currentShouldShowAll,
      shouldDisplayImperial,
      searchQuery,
      shouldShowFavsOnly
    )
  }
  //

  // MORE_BUTTON_ELEMENT
  moreButtonElement.innerText = BUTTON_LABELS.controls.more
  moreButtonElement.onclick = () => {
    console.log('onclick')

    const shouldShowAll = !getShouldShowAll()
    moreButtonElement.innerText =
      BUTTON_LABELS.controls[shouldShowAll ? 'less' : 'more']
    const shouldDisplayImperial = getShouldDisplayImperial()
    const searchQuery = getSearchQuery()
    const shouldShowFavsOnly = getShouldShowFavsOnly()

    console.log({
      shouldShowAll,
      shouldDisplayImperial,
      searchQuery,
      shouldShowFavsOnly,
    })

    renderTiles(
      shouldShowAll,
      shouldDisplayImperial,
      searchQuery,
      shouldShowFavsOnly
    )
  }
  //

  // UNIT_SWITCH_BUTTON_ELEMENT
  unitSwitchButtonElement.innerText = BUTTON_LABELS.unitButtons.imperial
  unitSwitchButtonElement.onclick = () => {
    const currentShouldDisplayImperial = getShouldDisplayImperial()
    unitSwitchButtonElement.innerText =
      BUTTON_LABELS.unitButtons[
        currentShouldDisplayImperial ? 'imperial' : 'metric'
      ]
    const newShouldDisplayImperial = !currentShouldDisplayImperial
    const shouldShowAll = getShouldShowAll()
    const searchQuery = getSearchQuery()
    const shouldShowFavsOnly = getShouldShowFavsOnly()

    renderTiles(
      shouldShowAll,
      newShouldDisplayImperial,
      searchQuery,
      shouldShowFavsOnly
    )
  }
  //

  // SEARCH_BUTTON_ELEMENT
  searchButtonElement.disabled = true
  searchButtonElement.onclick = () => {
    const searchQuery = getSearchQuery()
    const shouldShowAll = getShouldShowAll()
    const shouldDisplayImperial = getShouldDisplayImperial()
    const shouldShowFavsOnly = getShouldShowFavsOnly()

    renderTiles(
      shouldShowAll,
      shouldDisplayImperial,
      searchQuery,
      shouldShowFavsOnly
    )
  }
  //

  // INPUT_EVENT_LISTENER
  searchFieldElement.addEventListener('input', () => {
    const currentNumberOfCharsInSearchField = searchFieldElement.value.length

    searchButtonElement.disabled = !(currentNumberOfCharsInSearchField > 2)
    clearButtonElement.disabled = !currentNumberOfCharsInSearchField
  })

  // INITAL_TILES_RENDER
  renderTiles()
})()
