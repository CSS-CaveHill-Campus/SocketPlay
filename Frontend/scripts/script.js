const promptForRoomCode = () => {
    document.getElementById("helpText").innerHTML = "If you have a room code, enter it below, otherwise create your own room!"
}

const joinSomeRoom = (e) => {
    window.location.href = "/game.html";
}