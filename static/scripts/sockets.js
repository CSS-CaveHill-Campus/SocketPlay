const notif = document.getElementById("notification")
let sid = null

const setupRoom = () => {
    let roomCode = document.getElementById("roomCode").value
    addLocalEntry("roomCode", roomCode)
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

    player = new Player(sid, name, color, Math.floor(Math.random() * 400), Math.floor(Math.random() * 300), roomCode)
    
    setNotification(`Successfully joined room: ${roomCode}`)
    socket.emit("createPlayer", {roomCode, name, color, "xPos": player.xPos, "yPos": player.yPos, "size": player.size})
})

socket.on("gameState", ({players}) => {
    drawCanvas(players)
})