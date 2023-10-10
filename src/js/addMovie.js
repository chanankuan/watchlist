import swal from 'sweetalert2';
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
  swal.fire({
    position: 'top-end',
    heightAuto: 100,
    icon: 'success',
    title: 'Movie has been saved',
    showConfirmButton: false,
    timer: 1500,
  });
}
