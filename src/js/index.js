import { Notify } from 'notiflix/build/notiflix-notify-aio';

import { returnPaginationRange } from '../utils/appUtils';
import { getMovieList, getMovieDetails } from './api';
import { addToFavorite } from './addMovie';
import { removeFromfavorite } from './removeMovie';
import { renderMovieList, renderPagination } from './render';

const movieListElement = document.querySelector('.movie-list');
const searchForm = document.querySelector('.js-search-form');
const defaultImage = document.querySelector('.start-exploring');
const content = document.querySelector('.content');
const pagination = document.querySelector('.pagination-nav');
const loader = document.querySelector('.loader');
const limit = 10;
let searchValue;
let page;

searchForm.addEventListener('submit', handleSearch);

async function handleSearch(event) {
  event.preventDefault();
  page = 1;

  const { userSearch } = event.currentTarget.elements;
  if (userSearch.value === '') {
    return;
  }

  defaultImage.classList.add('hidden');
  loader.classList.remove('hidden');

  searchValue = userSearch.value.split(' ').join('+');
  try {
    const response = await getMovieList(searchValue, page);
    if (response.Error === 'Movie not found!') {
      Notify.failure(`${response.Error} Please try again.`);
      loader.classList.add('hidden');
      return;
    }

    const movieIds = response.Search.map(item => item.imdbID);
    const movieList = await getMovieDetails(movieIds);

    movieListElement.innerHTML = renderMovieList(movieList);

    const totalPages = Math.ceil(response.totalResults / limit);
    let array = returnPaginationRange(totalPages, page);
    pagination.innerHTML = renderPagination(page, array);
    pagination.addEventListener('click', onPage);

    movieListElement.addEventListener('click', handleAddRemove);
    loader.classList.add('hidden');
  } catch (error) {
    console.error(error);
    content.innerHTML = 'Oops. Something went wrong';
  }
}

async function onPage(event) {
  let page = event.target.dataset.page;
  if (page === '...' || !event.target.classList.contains('page-link')) {
    return;
  }
  page = Number(page);

  try {
    const response = await getMovieList(searchValue, page);
    const movieIds = response.Search.map(item => item.imdbID);
    const movieList = await getMovieDetails(movieIds);
    const totalPages = Math.ceil(response.totalResults / limit);
    const array = returnPaginationRange(totalPages, page);

    movieListElement.innerHTML = renderMovieList(movieList);
    movieListElement.addEventListener('click', handleAddRemove);

    pagination.innerHTML = renderPagination(page, array);
    window.scrollTo({ top: 0 });
  } catch (error) {
    console.error(error);
    content.innerHTML = 'Oops. Something went wrong';
  }
}

function handleAddRemove(event) {
  if (event.target.classList.contains('add-to-watchlist-btn')) {
    addToFavorite(event);
    event.target.classList.replace(
      'add-to-watchlist-btn',
      'remove-from-watchlist-btn'
    );
    return;
  }

  if (event.target.classList.contains('remove-from-watchlist-btn')) {
    removeFromfavorite(event);
    event.target.classList.replace(
      'remove-from-watchlist-btn',
      'add-to-watchlist-btn'
    );
    return;
  }
}
