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

      // console.log(item.Plot.length);
      // let plot = item.Plot.length > 153 ? `${item.Plot.split()}`
      // let plot;

      // if (item.Plot.length > 153) {
      //   let
      // }

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

export function renderPagination(currentPage, array) {
  return `
    <ul class="pagination">
      <li class="page-item">
        <a class="page-link ${
          currentPage === 1 ? 'disabled' : 'js-page-link'
        }" aria-label="Previous" data-page=${currentPage - 1}>
          &laquo;
        </a>
      </li>
      ${array
        .map(
          value => `
          <li class="page-item">
            <a class="page-link js-page-link ${
              currentPage === value ? 'active' : ''
            }" data-page=${value}>${value}</a>
          </li>
        `
        )
        .join('')}
      <li class="page-item">
        <a class="page-link ${
          currentPage === array[array.length - 1] ? 'disabled' : 'js-page-link'
        }" aria-label="Next" data-page=${currentPage + 1}>
          &raquo;
        </a>
      </li>
    </ul>
  `;
}
