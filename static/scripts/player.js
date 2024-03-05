const SPEED = 5;
const socket = io()

const CANVAS_HEIGHT = 500
const CANVAS_WIDTH = 1024

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
        if (this.xPos > CANVAS_WIDTH - 30){
            this.xPos = CANVAS_WIDTH - 30
        }
        if(this.xPos < 0){
            this.xPos = 0
        }

        if (this.yPos < 0){
            this.yPos = 0;
        }

        if (this.yPos > CANVAS_HEIGHT - 30){
            this.yPos = CANVAS_HEIGHT - 30
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
    if (e.key in moveMap){
        player.moveCharacter(moveMap[e.key])
    }
}

window.onload = (ev) => {
    setTimeout(() => {
        window.addEventListener("keydown", handleKeyPress);
    }, 2000)
}

let interval = null

const onPlayerMoveStart = (direction) => {
    interval = setInterval(
        (direction) => {
            player.moveCharacter(moveMap[direction])
        }, 
        1000 / 30,
        direction
    )
}

const onPlayerMoveEnd = () => {
    if (interval){
        clearInterval(interval)
        interval = null
    }
}

document.addEventListener("DOMContentLoaded", function() {
    const buttonsContainer = document.querySelector('.buttons');
    const buttons = buttonsContainer.querySelectorAll('button');

    buttons.forEach(button => {
        button.addEventListener('touchstart', function() {
            const direction = button.dataset.direction;
            moving = true
            onPlayerMoveStart(direction);
        });

        button.addEventListener('touchend', onPlayerMoveEnd);
    });
});