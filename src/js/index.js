import { Notify } from 'notiflix/build/notiflix-notify-aio';
import { getMovieList, getMovieDetails } from './api';
import addToFavorite from './addMovie';
import removeFromfavorite from './removeMovie';
import { renderMovieList } from './helper';

const movieListElement = document.querySelector('.movie-list');
const searchForm = document.querySelector('.js-search-form');
const defaultImage = document.querySelector('.start-exploring');
const content = document.querySelector('.content');

searchForm.addEventListener('submit', handleSearch);

async function handleSearch(event) {
  event.preventDefault();

  const { userSearch } = event.currentTarget.elements;
  if (userSearch.value === '') {
    return;
  }

  const searchValue = userSearch.value.split(' ').join('+');

  try {
    const response = await getMovieList(searchValue);
    if (response.Error === 'Movie not found!') {
      Notify.failure(`${response.Error} Please try again.`);
      return;
    }

    const movieIds = response.Search.map(item => item.imdbID);
    const movieList = await getMovieDetails(movieIds);

    defaultImage.classList.add('hidden');
    movieListElement.innerHTML = renderMovieList(movieList);

    movieListElement.addEventListener('click', handleAddRemove);
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
