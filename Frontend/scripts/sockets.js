const notif = document.getElementById("notification")

const socket = io("http://127.0.0.1:8000/")

socket.on("room", (data) => {
    notif.innerHTML = data['text'];
})