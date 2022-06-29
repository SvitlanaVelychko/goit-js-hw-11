import "./css/style.css";
import axios from "axios";
import Notiflix from "notiflix";
import SimpleLightbox from "simplelightbox";
import "simplelightbox/dist/simple-lightbox.min.css";
import { fetchImages, resetPage } from "./js/fetchImages";
import { createImageCards } from "./js/createImageCards";

const refs = {
    form: document.querySelector('.search-form'),
    imagesContainer: document.querySelector('.gallery'),
    loadMoreBtn: document.querySelector('.load-more'),
}
let imageName = '';

refs.form.addEventListener('submit', onFormSubmit);
refs.loadMoreBtn.addEventListener('click', onLoadMoreBtnClick);

function onFormSubmit(e) {
    e.preventDefault();
    clearGalleryContainer();

    imageName = refs.form.elements.searchQuery.value;

    if (imageName === '') {
        Notiflix.Notify.failure("Sorry, there are no images matching your search query. Please try again.");
    }
    resetPage();
    refs.loadMoreBtn.classList.remove('is-visible');
    fetchImages(imageName).then(({images}) => {
        refs.imagesContainer.innerHTML = createImageCards(images);
        refs.loadMoreBtn.classList.add('is-visible');
    })
}

function onLoadMoreBtnClick() {
    fetchImages(imageName).then(({ images, totalHits }) => {
        refs.imagesContainer.insertAdjacentHTML('beforeend', createImageCards(images));

        if (totalHits < 40) {
            refs.loadMoreBtn.classList.remove('is-visible');
            Notiflix.Notify.failure("We're sorry, but you've reached the end of search results.");
        } else {
            Notiflix.Notify.success(`Hooray! We found ${totalHits} images.`);
        }
    });
}

function clearGalleryContainer() {
    refs.imagesContainer.innerHTML = '';
}