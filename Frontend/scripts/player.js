const SPEED = 5;

class Player{
    constructor(playerID, name, color, x_pos, y_pos){
        this.playerID = playerID;
        this.name = name;
        this.color = color;
        this.x_pos = x_pos;
        this.y_pos = y_pos;
    }

    moveCharacter = (direction) => {
        switch(direction) {
            case "ArrowLeft":
                this.x_pos -= SPEED;
                break;
            case "ArrowRight":
                this.x_pos += SPEED;
                break;
            case "ArrowUp":
                this.y_pos -= SPEED;
                break;
            case "ArrowDown":
                this.y_pos += SPEED;
                break;
        }
    }
}

let playerID = "player1";
let player = null;
let player_y = Math.floor(Math.random() * window.innerHeight) + 1;
let player_x = Math.floor(Math.random() * window.innerWidth) + 1;
let player_size = 10

const MAX_SIZE = 50

const moveLeft = () => {
    player.style.left = Math.floor(parseInt(player.style.left) - SPEED) + "px";
}

const moveRight = () => {
    player.style.left = Math.floor(parseInt(player.style.left) + SPEED) + "px";
}

const moveUp = () => {
    player.style.top = Math.floor(parseInt(player.style.top) - SPEED) + "px";
}

const moveDown = () => {
    player.style.top = Math.floor(parseInt(player.style.top) + SPEED) + "px";
}

const moveMap = {
    "DOWN": moveDown,
    "LEFT": moveLeft,
    "RIGHT": moveRight,
    "UP": moveUp
}

let moveID = null
const onPlayerMoveStart = (direction) =>{
    moving = true;
    moveID = setInterval(() => movePlayer(direction), SPEED * 5);
}

const onPlayerMoveEnd = () => {
    if (moveID)
        clearInterval(moveID)
}


const movePlayer = (move_key) => {
    moveMap[move_key]();
}

const handleKeyPress = (e) => {
   
}

window.onload = (ev) => {
    player = document.getElementById(playerID);
    player.style.top = player_y + "px";
    player.style.left = player_x + "px";
    window.addEventListener("keydown", handleKeyPress);
}

document.addEventListener("DOMContentLoaded", function() {
    const buttonsContainer = document.querySelector('.buttons');
    const buttons = buttonsContainer.querySelectorAll('button');

    buttons.forEach(button => {
        button.addEventListener('touchstart', function() {
            const direction = button.dataset.direction.toUpperCase();
            onPlayerMoveStart(direction);
        });

        button.addEventListener('touchend', onPlayerMoveEnd);
    });
});