const setNotification = (message) => {
    let notif = document.getElementById("notification")
    notif.innerHTML = message;
    setTimeout(() => notif.innerHTML = "", 5000)
}