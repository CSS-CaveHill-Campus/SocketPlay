const notif = document.getElementById("notification")

const socket = io("http://127.0.0.1:8000/")

const setupRoom = () => {
    let url = window.location.search;
    let getQuery = url.split("?")[1]
    let params = getQuery.split("&")
    
    for (let param of params){
        const [key, value] = param.split('=')
        if (key == "roomCode"){
            addLocalEntry(key, value);
            break
        }
    }
}

setupRoom()

socket.on("roomAsk", () => {
    let roomCode = getLocalEntry("roomCode");
    if (roomCode === null){
        window.location.href = "/";
        return
    }

    socket.emit("joinRoom", {roomCode})
})

socket.on("roomJoined", ({roomCode}) => {
    document.getElementById("roomCode").innerHTML = roomCode;
    setNotification(`Successfully joined room: ${roomCode}`)
})