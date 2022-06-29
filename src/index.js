import "./css/style.css";
import axios from "axios";
import Notiflix from "notiflix";
import SimpleLightbox from "simplelightbox";
import "simplelightbox/dist/simple-lightbox.min.css";
import { fetchImages, resetPage } from "./js/fetchImages";
import { createImageCards } from "./js/createImageCards";

const refs = {
    form: document.querySelector('.search-form'),
    imagesContainer: document.querySelector('gallery'),
    loadMoreBtn: document.querySelector('.load-more'),
}
let imageName = '';

refs.form.addEventListener('submit', onFormSubmit);

function onFormSubmit(e) {
    e.preventDefault();

    imageName = refs.form.elements.searchQuery.value;

    if (imageName === '') {
        Notiflix.Notify.failure('Sorry, there are no images matching your search query. Please try again.');
    }
    resetPage();
    refs.loadMoreBtn.classList.remove('is-visible');
    fetchImages(imageName).then(images => {
        console.log(images);
        console.log(typeof(createImageCards(images)));
        refs.imagesContainer.innerHTML = createImageCards(images);
        refs.loadMoreBtn.classList.add('is-visible');
    });
}
