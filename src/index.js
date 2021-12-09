import './css/styles.css';
import API from './api-servic';
import countryCardTpl from '../src/country-card.hbs';
import miniIconCountry from '../src/icon-cards.hbs';
import Notiflix from 'notiflix';
import debounce from 'lodash.debounce';

const DEBOUNCE_DELAY = 300;

const searchForm = document.querySelector('input#search-box');
const cardOfCountry = document.querySelector('.country-info');
const listOfCountries = document.querySelector('.country-list');

searchForm.addEventListener('input', debounce(fetchCountriesAll, DEBOUNCE_DELAY));

function fetchCountriesAll(e) {
  e.preventDefault();
  const form = e.target;

  const name = form.value.trim();

  if (name !== '') {
    API.fetchCountries(name)
      .then(listContries)

      .catch(onFetchError);
  }
  return;
}

function listContries(country) {
  if (country.length > 10) {
    clearContainerAll();
    Notiflix.Notify.info('Too many matches found. Please enter a more specific name.', {
      width: '560px',
    });
  } else {
    renderCountryCards(country);
  }
  renderCountryCard(country);
}

function renderCountryCards(country) {
  if (country.length <= 10 && country.length >= 2) {
    const markup = miniIconCountry(country);

    clearContainer();
    listOfCountries.innerHTML = markup;
  }
}
function renderCountryCard(country) {
  if (country.length == 1) {
    const markup = countryCardTpl(country);
    clearContainerAll();
    cardOfCountry.innerHTML = markup;
  }
}

function onFetchError(error) {
  Notiflix.Notify.warning('Oops, there is no country with that name', {
    width: '560px',
  });
  clearContainer();
  clearContainerAll();
}

function clearContainer() {
  cardOfCountry.innerHTML = '';
}

function clearContainerAll() {
  listOfCountries.innerHTML = '';
}
