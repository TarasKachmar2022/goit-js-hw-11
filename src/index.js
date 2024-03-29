import axios from "axios";
import throttle from "lodash.throttle";
import galleryMarkup from "../src/templates/galleryMarkup.hbs";
import SimpleLightbox from "simplelightbox";
import "simplelightbox/dist/simple-lightbox.min.css";
import { FetchImagesApi } from "./js/api-service";
// import { cardMarkup } from "./js/markup";
import { localStorageSaveInputValue, localStorageSavedValue } from "./js/localStorage";
import { notifyNoImages, notifyLastImages, notifySuccess } from './js/notiflix';


const options = {
    root: null,
    rootMargin: '500px',
    threshold: 1.0,
};
let itemsCounter = 0;
let currentInputValue = '';

const fetchImagesApi = new FetchImagesApi();
const simpleLightbox = new SimpleLightbox('.gallery a', { captionsData: 'alt', captionDelay: 300 });
const observer = new IntersectionObserver(loadMoreCards, options);


const refs = {
    formEl: document.querySelector('#search-form'),
    galleryDivEl: document.querySelector('.gallery'),
    loadmoreBtn: document.querySelector('.load-more'),
    inputEl: document.querySelector('.search-form__input'),
    lastElementEl: document.querySelector('.last-element'),
}

refs.formEl.addEventListener('submit', onFormSubmitBtnClick);
refs.loadmoreBtn.addEventListener('click', loadMoreCards);
refs.inputEl.addEventListener('input', throttle(saveInputValue, 500));

localStorageSavedValue(refs.inputEl);

function saveInputValue(event){
    // В цьому випадку сервер відпрацьовує .trim().toLowerCase(); Додано для прикладу!
    currentInputValue = event.target.value.trim().toLowerCase();
    localStorageSaveInputValue(currentInputValue);
}

function onFormSubmitBtnClick(event){
    event.preventDefault();
    
    fetchImagesApi.query = localStorageSavedValue(refs.inputEl);
    // fetchImagesApi.query = event.target.elements.searchQuery.value;
    
    fetchImagesApi.resetPage();
    clearCardsContainer();
    restartItemCounter();
    fetchImagesApi.fetchImages(axios).then(array => {
        fetchImagesApi.incrementPage();
        appendCardsMarkup(array);
        notiflixMessage(array);
    })   
    
}

function loadMoreCards(entries, observer){
    entries.forEach((entry) => {
        if(entry.isIntersecting){
            fetchImagesApi.fetchImages(axios).then(array => {
                fetchImagesApi.incrementPage();
                appendCardsMarkup(array);
                notiflixMessage(array);
            });
        };
    })
}

function appendCardsMarkup(array){
    // refs.galleryDivEl.insertAdjacentHTML("beforeend", cardMarkup(array.hits));
    refs.galleryDivEl.insertAdjacentHTML("beforeend", galleryMarkup(array.hits));
    simpleLightbox.refresh();
}

function clearCardsContainer(){
    refs.galleryDivEl.innerHTML = '';
}

function restartItemCounter(){
    itemsCounter = 40;
}

function notiflixMessage(array){
    if(!array.hits.length){
        // alert("Sorry, there are no images matching your search query. Please try again.")
        notifyNoImages();
        return;
    } else if(itemsCounter >= array.totalHits){
        // } else if(array.hits.length > 0 && array.hits.length < 40){
        notifyLastImages();
        observer.unobserve(refs.lastElementEl);
        return;
    } else {
        itemsCounter += 40;
        observer.observe(refs.lastElementEl);
        return;
    }
}


// Кнопка load-moreBtn


// import axios from "axios";
// import throttle from "lodash.throttle";
// import galleryMarkup from "../src/templates/galleryMarkup.hbs";
// import SimpleLightbox from "simplelightbox";
// import "simplelightbox/dist/simple-lightbox.min.css";
// import { FetchImagesApi } from "./js/api-service";
// // import { cardMarkup } from "./js/markup";
// import { localStorageSaveInputValue, localStorageSavedValue } from "./js/localStorage";
// import { notifyNoImages, notifyLastImages, notifySuccess } from './js/notiflix';
// import { showLoadmoreBtn, hideLoadmoreBtn, lastPageHideLoadmoreBtn } from "./js/load-moreBtn";
// import { smoothScroll } from "./js/smoothScroll";

// const fetchImagesApi = new FetchImagesApi();
// const simpleLightbox = new SimpleLightbox('.gallery a', { captionsData: 'alt', captionDelay: 300 });

// let itemsCounter = 0;
// let currentInputValue = '';

// const refs = {
//     formEl: document.querySelector('#search-form'),
//     galleryDivEl: document.querySelector('.gallery'),
//     loadmoreBtn: document.querySelector('.load-more'),
//     inputEl: document.querySelector('.search-form__input'),
// }

// refs.formEl.addEventListener('submit', onFormSubmitBtnClick);
// refs.loadmoreBtn.addEventListener('click', onLoadmoreBtnClick);
// refs.inputEl.addEventListener('input', throttle(saveInputValue, 500));

// localStorageSavedValue(refs.inputEl);
// document.body.innerHTML = templateFunction();

// function saveInputValue(event){
//     // В цьому випадку сервер відпрацьовує .trim().toLowerCase(); Додано для прикладу!
//     currentInputValue = event.target.value.trim().toLowerCase();
//     localStorageSaveInputValue(currentInputValue);
// }

// function onFormSubmitBtnClick(event){
//     event.preventDefault();
    
//     fetchImagesApi.query = localStorageSavedValue(refs.inputEl);
//     // fetchImagesApi.query = event.target.elements.searchQuery.value;
    
//     console.log(itemsCounter)
//     hideLoadmoreBtn();
//     fetchImagesApi.resetPage();
//     clearCardsContainer();
//     restartItemCounter();
//     fetchImagesApi.fetchImages(axios).then(array => {
//         fetchImagesApi.incrementPage();
//         appendCardsMarkup(array);
//         notiflixMessage(array);
//     })   
// }

// function onLoadmoreBtnClick(){
//     fetchImagesApi.fetchImages(axios).then(array => {
//         hideLoadmoreBtn();
//         fetchImagesApi.incrementPage();
//         appendCardsMarkup(array);
//         showLoadmoreBtn();
//         notiflixMessage(array);
//         smoothScroll();
//     });
// }

// function appendCardsMarkup(array){
//     // refs.galleryDivEl.insertAdjacentHTML("beforeend", cardMarkup(array.hits));
//     refs.galleryDivEl.insertAdjacentHTML("beforeend", galleryMarkup(array.hits));
//     simpleLightbox.refresh();
// }

// function clearCardsContainer(){
//     refs.galleryDivEl.innerHTML = '';
// }

// function restartItemCounter(){
//     itemsCounter = 40;
// }

// function notiflixMessage(array){
//     console.log(itemsCounter)
//     if(!array.hits.length){
//         // alert("Sorry, there are no images matching your search query. Please try again.")
//         hideLoadmoreBtn();
//         notifyNoImages();
//         return;
//     } else if(itemsCounter >= array.totalHits){
//         // } else if(array.hits.length > 0 && array.hits.length < 40){
//         notifyLastImages();
//         lastPageHideLoadmoreBtn();
//         return;
//     } else {
//         itemsCounter += 40;
//         showLoadmoreBtn();
//         notifySuccess(array);
//         return;
//     }
// }