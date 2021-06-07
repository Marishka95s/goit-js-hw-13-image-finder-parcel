var debounce = require('lodash.debounce');
import PicturesApiService from './components/apiService.js';
import galleryTpl from './templates/galleryTpl.hbs';
import LoadMoreBtn from './components/load-more-btn.js';

// import pontyfy styles and js
import '@pnotify/core/dist/BrightTheme.css';
import '@pnotify/core/dist/PNotify.css';
import '@pnotify/mobile/dist/PNotifyMobile.css';
import {error} from '@pnotify/core/dist/PNotify.js';

import './sass/main.scss';

// Основний функціонал
const loadMoreBtn = new LoadMoreBtn({
    selector: '[data-action="load-more"]',
    hidden: true,
  });


const resultsContainer = document.querySelector('.js-gallery');
const inputEl = document.querySelector('input');
inputEl.addEventListener('input', debounce(onInputChange, 500));
loadMoreBtn.refs.button.addEventListener('click', fetchPictures);

const picturesApiService = new PicturesApiService();

function onInputChange(){
    picturesApiService.query = inputEl.value;
    console.log('input changed');

    if (inputEl.value !== '' && inputEl.value !== ' ' && inputEl.value !== '.'){
        loadMoreBtn.show();
        picturesApiService.resetPage();
        clearPicturesContainer();
        fetchPictures();
    } else {
        error({
            title: "Empty query. Try to type something",
            delay: 1500,
          });
    }
}

function fetchPictures() {
    loadMoreBtn.disable();
    picturesApiService.fetchPictures().then(data => {
        appendPicturesMarkup(data);
        loadMoreBtn.enable();
        loadMoreBtn.refs.button.scrollIntoView({ behavior: 'smooth', block: 'end', });
    })
}

function appendPicturesMarkup(data) {
    resultsContainer.insertAdjacentHTML('beforeend', galleryTpl(data));
}

function clearPicturesContainer() {
    resultsContainer.innerHTML = '';
}

const galleryContainer = document.querySelector('.js-gallery');
const modalLightbox = document.querySelector('.js-lightbox');
const closeModalBtn = document.querySelector('.lightbox__button');
const lightboxOverlay = modalLightbox.querySelector('.lightbox__overlay');
const necessaryImg = modalLightbox.querySelector('.lightbox__image');

galleryContainer.addEventListener('click', onGalleryContainerClick);
let currentSlide = 0;


function onGalleryContainerClick(evt) {
    if (!evt.target.classList.contains('gallery__image')) { return };

    currentSlide = evt.target;

    imgAttributesChanging(currentSlide)
    
    if (!modalLightbox.classList.contains('is-open')) {
        modalLightbox.classList.add('is-open');
    }

    if (modalLightbox.classList.contains('is-open')) {
        window.addEventListener('keydown', onChangingImgKeyPress);
    };

    closeModalBtn.addEventListener('click', onCloseModal);
    lightboxOverlay.addEventListener('click', onCloseModal)
    window.addEventListener('keydown', onEscKeyPress);   
};

function imgAttributesChanging(currentSlide) {
    necessaryImg.src = currentSlide.dataset.url;
    necessaryImg.alt = currentSlide.alt;
    console.log(currentSlide); 
};

function onEscKeyPress(event) {
    const ESC_KEY_CODE = 'Escape';
    const isEscKey = event.code === ESC_KEY_CODE;
    if (isEscKey) { onCloseModal() }   
};

function onCloseModal() {
    modalLightbox.classList.remove('is-open');
    lightboxImageSrcCleaning();
    window.removeEventListener('keydown', onChangingImgKeyPress);
}

function lightboxImageSrcCleaning() {
    necessaryImg.src = '';
};

function onChangingImgKeyPress(event) {
    const PREV_IMG_KEY_CODE = 'ArrowLeft';
    const NEXT_IMG_KEY_CODE = 'ArrowRight';
    let isPrevImgKey = event.code === PREV_IMG_KEY_CODE;
    let isNextImgKey = event.code === NEXT_IMG_KEY_CODE;
    if (isPrevImgKey) {
        console.log('Pressed ArrowLeft');
        showPrevImg();
    } else if (isNextImgKey) {
        console.log('Pressed ArrowRight');
        showNextImg();
    }
};

function showPrevImg() {
    let slides = document.querySelectorAll('.gallery__image');
    if ((currentSlide.id-1) > 0) {
        currentSlide = slides[currentSlide.id - 2];
    } else { currentSlide = slides[slides.length - 1]}
    necessaryImg.src = currentSlide.dataset.url;
    necessaryImg.alt = currentSlide.alt;
    console.log(`Текущий слайд № ${currentSlide.id}`);
};
function showNextImg() {
    let slides = document.querySelectorAll('.gallery__image');
    if ((currentSlide.id-1) < (slides.length-1)) {
        currentSlide = slides[currentSlide.id];
    } else { currentSlide = slides[0]}
    necessaryImg.src = currentSlide.dataset.url;
    necessaryImg.alt = currentSlide.alt;
    console.log(`Текущий слайд № ${currentSlide.id}`);
};