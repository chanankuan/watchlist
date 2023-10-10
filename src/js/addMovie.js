import { Notify } from 'notiflix/build/notiflix-notify-aio';
import { KEY_LS } from './refs';
import { setToLocalStorage } from './helper';

export default function addToFavorite(event) {
  const watchList = JSON.parse(localStorage.getItem(KEY_LS)) || [];
  const movieId = event.target.dataset.id;

  if (watchList.some(id => id === movieId)) {
    return;
  }

  watchList.push(movieId);
  setToLocalStorage(watchList);
  Notify.success('Movie has been saved');
}
