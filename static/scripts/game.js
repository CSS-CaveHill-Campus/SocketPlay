const setNotification = (message) => {
    document.getElementById("notification").innerHTML = message;
    setTimeout(() => document.getElementById("notification").innerHTML = "", 10000)
}

let ctx = null

const canvas = document.getElementById("mainGame")

const drawCanvas = (players) => {
    if (canvas.getContext){
        ctx = canvas.getContext('2d')
        ctx.clearRect(0, 0, 1024, 500)

        for (let player of players){
            ctx.fillStyle = player.color;
            ctx.strokeText(player.name, player.x_pos + 5, player.y_pos - 5)
            ctx.fillRect(player.x_pos, player.y_pos, player.size, player.size)
        }
    }
}