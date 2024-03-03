const setNotification = (message) => {
    document.getElementById("notification").innerHTML = message;
    setTimeout(() => document.getElementById("notification").innerHTML = "", 10000)
}

let ctx = null

const players = []

const draw = () => {
    const canvas = document.getElementById("mainGame")
    if (canvas.getContext){
        ctx = canvas.getContext('2d')

        ctx.fillRect(0, 0, 30, 30)
    }

}

window.addEventListener('load', draw)