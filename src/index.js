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
let counterImages = 0;

refs.form.addEventListener('submit', onFormSubmit);
refs.loadMoreBtn.addEventListener('click', onLoadMoreBtnClick);

function onFormSubmit(e) {
    e.preventDefault();
    clearGalleryContainer();

    imageName = refs.form.elements.searchQuery.value;

    // if (imageName === '') {
    //     Notiflix.Notify.failure("Sorry, there are no images matching your search query. Please try again.");
    //     refs.loadMoreBtn.classList.remove('is-visible');
    // }
    
    resetPage();
    refs.loadMoreBtn.classList.remove('is-visible');
    fetchImages(imageName).then(({ images }) => {
        refs.imagesContainer.innerHTML = createImageCards(images);
        refs.loadMoreBtn.classList.add('is-visible');
        counterImages = images.length;

        if (images.length === 0 || imageName === '') {
            refs.loadMoreBtn.classList.remove('is-visible');
            Notiflix.Notify.failure("Sorry, there are no images matching your search query. Please try again.");
        }
    })
}

function onLoadMoreBtnClick() {
    fetchImages(imageName).then(({ images, totalHits }) => {
        refs.imagesContainer.insertAdjacentHTML('beforeend', createImageCards(images));
        counterImages += images.length;

        if (counterImages < totalHits) {
            Notiflix.Notify.success(`Hooray! We found ${totalHits} images.`);
        } else {
            refs.loadMoreBtn.classList.remove('is-visible');
            setTimeout(() => {
                Notiflix.Notify.failure("We're sorry, but you've reached the end of search results.");
            }, 2000);
        }
    });
}

function clearGalleryContainer() {
    refs.imagesContainer.innerHTML = '';
}