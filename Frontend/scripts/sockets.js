const notif = document.getElementById("notification")

const socket = io("http://127.0.0.1:8000/")
let sid = null

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

const getSocketID = () => {
    return getLocalEntry("sid")
}

socket.on("roomAsk", () => {
    let roomCode = getLocalEntry("roomCode");
    if (roomCode === null){
        window.location.href = "/";
        return
    }

    socket.emit("joinRoom", {roomCode})
})

socket.on("roomJoined", ({sid, roomCode}) => {
    document.getElementById("roomCode").innerHTML = roomCode;
    addLocalEntry("roomCode", roomCode)
    addLocalEntry("sid", sid)

    let name = getLocalEntry("name")
    let color = getLocalEntry("color")

    player = new Player(sid, name, color, 0, 0)
    addPlayer(player)
    
    setNotification(`Successfully joined room: ${roomCode}`)
    socket.emit("createPlayer", {roomCode, name, color, "xPos": 0, "yPos":0})
})

socket.on("gameState", ({gameState}) => {
    drawCanvas(gameState)
})