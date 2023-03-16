import Notiflix from 'notiflix';
export function notiflixMessage(array){
    if(array.hits.length < 1){
        // alert("Sorry, there are no images matching your search query. Please try again.")
        Notiflix.Notify.failure(
            "Sorry, there are no images matching your search query. Please try again.",
            {
                timeout: 6000,
                clickToClose: true,
                pauseOnHover: true,
            },
        );
        return;
    }

    Notiflix.Notify.success(
        `Hooray! We found ${array.totalHits} images.`,
        {
            timeout: 6000,
            clickToClose: true,
            pauseOnHover: true,
        },
    );
}