import Notiflix from 'notiflix';

export function notifyNoImages(){
    return Notiflix.Notify.failure(
            "Sorry, there are no images matching your search query. Please try again.",
            {
                timeout: 6000,
                clickToClose: true,
                pauseOnHover: true,
            },
        );
}

export function notifyLastImages(){
    return Notiflix.Notify.failure(
            "We're sorry, but you've reached the end of search results.",
            {
                timeout: 6000,
                clickToClose: true,
                pauseOnHover: true,
            },
        );
}

export function notifySuccess(array){
    return Notiflix.Notify.success(
        `Hooray! We found ${array.totalHits} images.`,
        {
            timeout: 6000,
            clickToClose: true,
            pauseOnHover: true,
        },
    );
}

// import {showLoadmoreBtn, hideLoadmoreBtn, lastPageHideLoadmoreBtn} from "./load-moreBtn"

// let items = 0;

// export function notiflixMessage(array){
    
// console.log(items)
//     if(!array.hits.length){
//         // alert("Sorry, there are no images matching your search query. Please try again.")
//         hideLoadmoreBtn();
//         items = 0;
//         Notiflix.Notify.failure(
//             "Sorry, there are no images matching your search query. Please try again.",
//             {
//                 timeout: 6000,
//                 clickToClose: true,
//                 pauseOnHover: true,
//             },
//         );
//         return;
//     } 
//     else if(items >= array.totalHits){
//     // } else if(array.hits.length > 0 && array.hits.length < 40){
//         lastPageHideLoadmoreBtn();
//         Notiflix.Notify.failure(
//             "We're sorry, but you've reached the end of search results.",
//             {
//                 timeout: 6000,
//                 clickToClose: true,
//                 pauseOnHover: true,
//             },
//         );
//         return;
//     }
//     showLoadmoreBtn();
//     items += 40;
//     Notiflix.Notify.success(
//         `Hooray! We found ${array.totalHits} images.`,
//         {
//             timeout: 6000,
//             clickToClose: true,
//             pauseOnHover: true,
//         },
//     );
// }