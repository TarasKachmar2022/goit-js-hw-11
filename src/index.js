import axios from "axios";
// import Handlebars from "handlebars";
import SimpleLightbox from "simplelightbox";
import "simplelightbox/dist/simple-lightbox.min.css";
import { FetchImagesApi } from "./js/api-service";
import { cardMarkup } from "./js/markup";
import { notiflixMessage } from "./js/notiflix";

const fetchImagesApi = new FetchImagesApi();
const simpleLightbox = new SimpleLightbox('.gallery a', { captionsData: 'tags' });

const refs = {
    formEl: document.querySelector('#search-form'),
    galleryDivEl: document.querySelector('.gallery'),
    loadmoreBtn: document.querySelector('.load-more')
}

refs.formEl.addEventListener('submit', onFormSubmitBtnClick);
refs.loadmoreBtn.addEventListener('click', onLoadmoreBtnClick);

function onFormSubmitBtnClick(event){
    event.preventDefault();

    fetchImagesApi.query = event.target.elements.searchQuery.value;
    
    fetchImagesApi.resetPage();
    clearCardsContainer();
    fetchImagesApi.fetchImages(axios).then(array => {
        notiflixMessage(array);
        appendCardsMarkup(array);
    })   
}

function onLoadmoreBtnClick(){
    fetchImagesApi.fetchImages(axios).then(array => {
        fetchImagesApi.incrementPage();
        notiflixMessage(array);
        appendCardsMarkup(array);
    });
}

function appendCardsMarkup(array){
    refs.galleryDivEl.insertAdjacentHTML("beforeend", cardMarkup(array.hits));
    simpleLightbox.refresh();
}

function clearCardsContainer(){
    refs.galleryDivEl.innerHTML = '';
}