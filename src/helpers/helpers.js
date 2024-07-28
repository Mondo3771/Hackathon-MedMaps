const setLocalStorage = ({key,value}) => {
    return localStorage.setItem(key,JSON.stringify(value))
}

const fetchLocalStorage = ({key}) => {
 return JSON.parse(localStorage.getItem(key))
}

export {setLocalStorage , fetchLocalStorage}