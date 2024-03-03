const setNotification = (message) => {
    document.getElementById("notification").innerHTML = message;
    setTimeout(() => document.getElementById("notification").innerHTML = "", 10000)
}

const players = {}

const getClientPlayer = () => {
    
}