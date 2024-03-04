const setNotification = (message) => {
    let notif = document.getElementById("notification")
    notif.innerHTML = message;
    setTimeout(() => notif.innerHTML = "", 5000)
}

const joinRoom = (code) => {
    window.location.href = `/game?roomCode=${code}`
}