const setNotification = (message) => {
    document.getElementById("notification").innerHTML = message;
    setTimeout(() => document.getElementById("notification").innerHTML = "", 10000)
}

let ctx = null

const players = []

const addPlayer = (player) => {
    players.push(player)
}

const canvas = document.getElementById("mainGame")

const drawCanvas = (gameState) => {
    if (canvas.getContext){
        ctx = canvas.getContext('2d')

        for (let player of gameState.players){
            if (player.sid == players[0].playerID) continue;
            ctx.fillStyle = player.color;
            ctx.fillRect(player.x_pos, player.y_pos, player.size, player.size)
        }
    }
}