const addLocalEntry = (key, value) => {
    localStorage.setItem(key, value)
}

const storeUserInfo = (formData) => {
    addLocalEntry("name", formData['name']);
    addLocalEntry('color', formData['color'])
}