const addLocalEntry = (key, value) => {
    localStorage.setItem(key, value)
}

const storeUserInfo = (formData) => {
    addLocalEntry("name", formData['name']);
    addLocalEntry('color', formData['color'])
}

const getLocalEntry = (key) => {
    let item = localStorage.getItem(key)
    return item
}