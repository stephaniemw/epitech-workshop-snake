// var keyPressedHandled = false;

function draw_board(width, height, fillColor) {
    const size = SQUARE_SIZE || 20

    const gameBoard = document.getElementById("gameBoard").getContext("2d");
    gameBoard.canvas.width =  width * size;
    gameBoard.canvas.height = height * size;
    gameBoard.fillStyle = fillColor;
    // gameBoard.strokeStyle =  borderColor;
    // gameBoard.lineWidth = 5;
    gameBoard.fillRect(0, 0, width * size, height * size);
    // gameBoard.strokeRect(0, 0, width, height);
}

function draw_square(top, left, fillColor, borderColor) {
    const size = SQUARE_SIZE || 20
    // if (SQUARE_SIZE)
    const gameBoard = document.getElementById("gameBoard").getContext("2d");
    gameBoard.fillStyle = fillColor;
    gameBoard.strokeStyle = borderColor;
    gameBoard.lineWidth = 0.2;
    gameBoard.fillRect(top * size, left * size, size, size);
    gameBoard.strokeRect(top * size, left * size, size, size);
}

function loop(speed, callback) {
    setTimeout(function onTick() {
        // console.log("tick");
        callback();
        loop(speed, callback);
     }, speed)
}

function print_score(score) {
    const scoreDiv = document.getElementById("score");
    scoreDiv.innerHTML = score;

}

function get_random_number(min, max) {
    return Math.floor(Math.random() * max) + min;
}

function add_block_to_snake_head(block) {
    snake.positions.unshift(block)
}

function remove_last_snake_block() {
    snake.positions.pop();
}

function show_game_over() {
    window.fetch("http://192.168.1.8:3000/scores").then((res) => res.json()).then((val) => console.log(val))
    const div = document.getElementById('game-over');
    div.style.visibility = "visible"
}

// Game Loop related variables & functions
var canvas;
var context;
var oldTimeStamp;
var accumulator = 0;

window.onload = init;

function init(){
    canvas = document.getElementById('gameBoard');
    context = canvas.getContext('2d');

    // Start the first frame request
    window.requestAnimationFrame(game_loop);
    document.addEventListener("keydown", (event) => {
        event.preventDefault();
        // if (!keyPressedHandled)
            onKeyDown(event.code);
        // keyPressedHandled = true;
    });
}

function game_loop(timeStamp) {
    //Calculate the number of seconds passed
    //since the last frame
    var secondsPassed = (timeStamp - oldTimeStamp) / 1000;
    oldTimeStamp = timeStamp;

    if (secondsPassed) {
        accumulator = accumulator + (secondsPassed * 1000)
    }
    const speed = game && game.speed ? game.speed : 100;
    if (accumulator >  speed) {
        console.log("tick")
        accumulator = 0;
        loop();
        // keyPressedHandled = false;
    }

    draw();

    // Keep requesting new frames
    window.requestAnimationFrame(game_loop);
}
