const BASE_URL = 'https://pixabay.com/';
const API_KEY = 'key=34422207-170011de97ccd8f3047fd820d';

export class FetchImagesApi{
    constructor(){
        this.searchQuery = '';
        this.page = 1;
    }

    async fetchImages(axios) {
        try{
        const response = await axios.get(`${BASE_URL}api/?${API_KEY}&q=${this.searchQuery}&image_type=photo&orientation=horizontal&safesearch=true&per_page=40&page=${this.page}`)
        
        const data = response.data;
        return data;
        }
        catch{error => console.error(error)}
    }

    incrementPage(){
        this.page += 1;
    }

    resetPage(){
        this.page = 1;
    }

    get query(){
        return this.searchQuery;
    }

    set query(newQuery){
        this.searchQuery = newQuery;
    }
}



// Axios, Проміс


// const BASE_URL = 'https://pixabay.com/';
// const API_KEY = 'key=34422207-170011de97ccd8f3047fd820d';

// export class FetchImagesApi{
//     constructor(){
//         this.searchQuery = '';
//         this.page = 1;
//     }

//     fetchImages(axios) {
//         return axios.get(`${BASE_URL}api/?${API_KEY}&q=${this.searchQuery}&image_type=photo&orientation=horizontal&safesearch=true&per_page=4&page=${this.page}`).then(response => {
//             this.incrementPage();
//             const {data} = response;
//             return data;
//         })
//         .catch(error => console.error(error));
//     }

//     incrementPage(){
//         this.page += 1;
//     }

//     resetPage(){
//         this.page = 1;
//     }

//     get query(){
//         return this.searchQuery;
//     }

//     set query(newQuery){
//         this.searchQuery = newQuery;
//     }
// }



// fetch, Проміс


// const BASE_URL = 'https://pixabay.com/';
// const API_KEY = 'key=34422207-170011de97ccd8f3047fd820d';

// export class FetchImagesApi{
//     constructor(){
//         this.searchQuery = '';
//         this.page = 1;
//     }

//     fetchImages() {
//         return fetch(`${BASE_URL}api/?${API_KEY}&q=${this.searchQuery}&image_type=photo&orientation=horizontal&safesearch=true&per_page=4&page=${this.page}`).then(response => {
//             if(!response.ok){
//                 throw new Error(response.statusText);
//             }
//             return response.json();
//         })
//         .then(data => {
//             this.incrementPage();
//             return data;
//         }).catch(error => console.error(error));
//     }

//     incrementPage(){
//         this.page += 1;
//     }

//     resetPage(){
//         this.page = 1;
//     }

//     get query(){
//         return this.searchQuery;
//     }

//     set query(newQuery){
//         this.searchQuery = newQuery;
//     }
// }