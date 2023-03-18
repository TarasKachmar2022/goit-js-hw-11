const refs = {
    loadmoreBtn: document.querySelector('.load-more'),
}

export function showLoadmoreBtn(){
    return refs.loadmoreBtn.classList.remove('is-hidden');
}

export function hideLoadmoreBtn(){
    return refs.loadmoreBtn.classList.add('is-hidden');
}

export function lastPageHideLoadmoreBtn(){
    return refs.loadmoreBtn.classList.add('is-hidden');
}