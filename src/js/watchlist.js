import { renderMovieList } from './render';
import { getMovieDetails } from './api';
import { KEY_LS } from './refs';
import { removeFromfavorite } from './removeMovie';

const favMovieListElement = document.querySelector('.fav-movie-list');
const isEmpty = document.querySelector('.is-empty');

const watchList = JSON.parse(localStorage.getItem(KEY_LS)) || [];

getMovieDetails(watchList)
  .then(result => {
    if (result.length > 0) {
      favMovieListElement.innerHTML = renderMovieList(result);
      isEmpty.classList.add('hidden');
    }
  })
  .catch(err => {
    console.error(err);
  });

favMovieListElement.addEventListener('click', event => {
  if (event.target.classList.contains('remove-from-watchlist-btn')) {
    removeFromfavorite(event);

    const watchList = JSON.parse(localStorage.getItem(KEY_LS)) || [];
    getMovieDetails(watchList)
      .then(result => {
        favMovieListElement.innerHTML = renderMovieList(result);
        isEmpty.classList.add('hidden');
      })
      .catch(err => {
        console.error(err);
      });
  }
});
