// Add imports above this line
import { galleryItems } from './gallery-items';
// Change code below this line
import SimpleLightbox from 'simplelightbox';
import 'simplelightbox/dist/simple-lightbox.min.css';

const refs = {
  gallery: document.querySelector('.gallery'),
};

renderMarkup(galleryItems);

let modal = new SimpleLightbox('.gallery a', {
  captionsData: 'alt',
  captionDelay: 250,
});

refs.gallery.addEventListener('click', galleryItemClick);

function renderMarkup(array) {
  const markup = array
    .map(({ preview, original, description }) => {
      return `
        <a class="gallery__item" href="${original}">
            <img class="gallery__image" src="${preview}" alt="${description}" title="its title" />
        </a>
        `;
    })
    .join('');

  refs.gallery.insertAdjacentHTML('afterbegin', markup);
}

function galleryItemClick(e) {
  e.preventDefault();

  if (e.target === e.currentTarget) return;

  openModal();
}

function openModal() {
  modal.on('show.simplelightbox');
}
