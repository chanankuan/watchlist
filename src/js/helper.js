import { KEY_LS } from './refs';
import starIcon from '../img/star-icon.svg';
import defaultPoster from '../img/default-movie-poster.jpeg';

export function renderMovieList(arr) {
  const movieIds = JSON.parse(localStorage.getItem(KEY_LS)) || [];

  return arr
    .map(item => {
      let isSaved;

      if (movieIds.some(id => id === item.imdbID)) {
        isSaved = true;
      }

      return `
      <li class="movie-item">
        <div class="movie-poster">
          <img
            src=${item.Poster === 'N/A' ? defaultPoster : item.Poster}
            alt=${item.Title}
          />
        </div>
        <div class="movie-content">
          <div class="title-wrapper">
            <h3 class="movie-title">
              ${item.Title}
            </h3>
            <p class="movie-rating">
              <img src=${starIcon} alt="star" />
              <span>${item.imdbRating}</span>
            </p>
          </div>
          <div class="wrapper">
            <p class="movie-runtime">${item.Runtime}</p>
            <p class="movie-genre">${item.Genre}</p>
            <button class="watchlist-btn ${
              isSaved ? 'remove-from-watchlist-btn' : 'add-to-watchlist-btn'
            }" data-id=${item.imdbID} >
              Watchlist
            </button>
          </div>
          <p class="movie-plot">${item.Plot}</p>
        </div>
      </li>
      `;
    })
    .join('');
}

export function setToLocalStorage(list) {
  localStorage.setItem(KEY_LS, JSON.stringify(list));
}
