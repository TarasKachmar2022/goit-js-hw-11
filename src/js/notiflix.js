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