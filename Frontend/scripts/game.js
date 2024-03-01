let playerID = "player1";
let player = null;
let player_y = Math.floor(Math.random() * window.innerHeight) + 1;
let player_x = Math.floor(Math.random() * window.innerWidth) + 1;
let player_size = 10

const MAX_SIZE = 50

const SPEED = 5;

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
    switch(e.key) {
        case "ArrowLeft":
            moveLeft();
            break;
        case "ArrowRight":
            moveRight();
            break;
        case "ArrowUp":
            moveUp();
            break;
        case "ArrowDown":
            moveDown();
            break;
    }
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