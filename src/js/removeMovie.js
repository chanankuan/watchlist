import swal from 'sweetalert2';
import { KEY_LS } from './refs';
import { setToLocalStorage } from './helper';

export default function removeFromfavorite(event) {
  let watchList = JSON.parse(localStorage.getItem(KEY_LS)) || [];
  const movieId = event.target.dataset.id;

  watchList = watchList.filter(id => id !== movieId);
  setToLocalStorage(watchList);
  swal.fire({
    position: 'top-end',
    heightAuto: 100,
    icon: 'success',
    title: 'Movie has been removed from your watchlist',
    showConfirmButton: false,
    timer: 1500,
  });
}
