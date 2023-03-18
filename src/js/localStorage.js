const STORAGE_KEY = "keyValue";

export function localStorageSaveInputValue(currentInputValue){
    localStorage.setItem(STORAGE_KEY, currentInputValue);
};

export function localStorageSavedValue(inputEl){
    const savedValue = localStorage.getItem(STORAGE_KEY);
    inputEl.value = savedValue;
    return savedValue;
}