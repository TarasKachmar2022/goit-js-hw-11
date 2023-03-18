import axios from "axios";
import throttle from "lodash.throttle";
// import Handlebars from "handlebars";
import SimpleLightbox from "simplelightbox";
import "simplelightbox/dist/simple-lightbox.min.css";
import { FetchImagesApi } from "./js/api-service";
import { cardMarkup } from "./js/markup";
import { localStorageSaveInputValue, localStorageSavedValue } from "./js/localStorage";
import { notifyNoImages, notifyLastImages, notifySuccess } from './js/notiflix';
import { showLoadmoreBtn, hideLoadmoreBtn, lastPageHideLoadmoreBtn } from "./js/load-moreBtn";

const fetchImagesApi = new FetchImagesApi();
const simpleLightbox = new SimpleLightbox('.gallery a', { captionsData: 'tags' });

let itemsCounter = 0;

const refs = {
    formEl: document.querySelector('#search-form'),
    galleryDivEl: document.querySelector('.gallery'),
    loadmoreBtn: document.querySelector('.load-more'),
    inputEl: document.querySelector('.search-form__input'),
}

refs.formEl.addEventListener('submit', onFormSubmitBtnClick);
refs.loadmoreBtn.addEventListener('click', onLoadmoreBtnClick);
refs.inputEl.addEventListener('input', throttle(saveInputValue, 500));

localStorageSavedValue(refs.inputEl);

function saveInputValue(event){
    currentInputValue = event.target.value;
    localStorageSaveInputValue(currentInputValue);
}

function onFormSubmitBtnClick(event){
    event.preventDefault();
    
    fetchImagesApi.query = localStorageSavedValue(refs.inputEl);
    // fetchImagesApi.query = event.target.elements.searchQuery.value;

    console.log(itemsCounter)
    fetchImagesApi.resetPage();
    clearCardsContainer();
    restartItemCounter();
    fetchImagesApi.fetchImages(axios).then(array => {
        fetchImagesApi.incrementPage();
        notiflixMessage(array);
        appendCardsMarkup(array);
    })   
}

function onLoadmoreBtnClick(){
    hideLoadmoreBtn();
    fetchImagesApi.fetchImages(axios).then(array => {
        fetchImagesApi.incrementPage();
        console.log(fetchImagesApi.page)
        appendCardsMarkup(array);
        showLoadmoreBtn();
        notiflixMessage(array);
    });
}

function appendCardsMarkup(array){
    refs.galleryDivEl.insertAdjacentHTML("beforeend", cardMarkup(array.hits));
    simpleLightbox.refresh();
}

function clearCardsContainer(){
    refs.galleryDivEl.innerHTML = '';
}

function restartItemCounter(){
    itemsCounter = 40;
}

function notiflixMessage(array){
    console.log(itemsCounter)
    if(!array.hits.length){
        // alert("Sorry, there are no images matching your search query. Please try again.")
        hideLoadmoreBtn();
        notifyNoImages();
        return;
    } else if(itemsCounter >= array.totalHits){
        // } else if(array.hits.length > 0 && array.hits.length < 40){
        notifyLastImages();
        lastPageHideLoadmoreBtn();
        return;
    } else {
        itemsCounter += 40;
        showLoadmoreBtn();
        notifySuccess(array);
        return;
    }
}