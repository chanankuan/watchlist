import { Notify } from 'notiflix/build/notiflix-notify-aio';
import { KEY_LS } from './refs';
import { setToLocalStorage } from './helper';

export default function removeFromfavorite(event) {
  let watchList = JSON.parse(localStorage.getItem(KEY_LS)) || [];
  const movieId = event.target.dataset.id;

  watchList = watchList.filter(id => id !== movieId);
  setToLocalStorage(watchList);
  Notify.success('Movie has been removed from your watchlist');
}
