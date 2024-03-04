const SPEED = 5;
const socket = io("http://127.0.0.1:8000/")


class Player{
    constructor(playerID, name, color, xPos, yPos, roomCode){
        this.playerID = playerID;
        this.name = name;
        this.color = color;
        this.xPos = xPos;
        this.yPos = yPos;
        this.roomCode = roomCode
        this.size = 30;
    }

    moveCharacter = (direction) => {
        switch(direction) {
            case "moveLeft":
                this.xPos -= SPEED;
                break;
            case "moveRight":
                this.xPos += SPEED;
                break;
            case "moveUp":
                this.yPos -= SPEED;
                break;
            case "moveDown":
                this.yPos += SPEED;
                break;
        }

        socket.emit("playerMove", {"xPos": this.xPos, "yPos": this.yPos, "roomCode": this.roomCode})
    }
}

let player = null;

const moveMap = {
    "ArrowUp": "moveUp",
    "ArrowLeft": "moveLeft",
    "ArrowRight": "moveRight",
    "ArrowDown": "moveDown"
}

const handleKeyPress = (e) => {
    console.log("Hello");
    if (e.key in moveMap){
        player.moveCharacter(moveMap[e.key])
    }
}

window.onload = (ev) => {
    setTimeout(() => {
        window.addEventListener("keydown", handleKeyPress);
    }, 2000)
}

// document.addEventListener("DOMContentLoaded", function() {
//     const buttonsContainer = document.querySelector('.buttons');
//     const buttons = buttonsContainer.querySelectorAll('button');

//     buttons.forEach(button => {
//         button.addEventListener('touchstart', function() {
//             const direction = button.dataset.direction.toUpperCase();
//             onPlayerMoveStart(direction);
//         });

//         button.addEventListener('touchend', onPlayerMoveEnd);
//     });
// });