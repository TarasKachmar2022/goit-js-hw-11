
// Шаблонні строки


// export function cardMarkup(array){
//     return array.map(({webformatURL, largeImageURL, tags, likes, views, comments, downloads}) => {
//         return `<article class="photo-card">
//             <a class="gallery__link" href="${largeImageURL}">
//                 <img class="gallery__image" src="${webformatURL}" alt="${tags}" loading="lazy" width="370" height="294"/>
//             </a>
//             <div class="info">
//                 <p class="info-item">
//                     <b>Likes</b> ${likes}
//                 </p>
//                 <p class="info-item">
//                     <b>Views</b> ${views}
//                 </p>
//                 <p class="info-item">
//                     <b>Comments</b> ${comments}
//                 </p>
//                 <p class="info-item">
//                     <b>Downloads</b> ${downloads}
//                 </p>
//             </div>
//         </article>`
//     }).join('');
// }