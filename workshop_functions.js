function draw_board(width, height, fillColor) {
    const size = SQUARE_SIZE || 20

    const gameBoard = document.getElementById("gameBoard").getContext("2d");
    gameBoard.canvas.width =  width * size;
    gameBoard.canvas.height = height * size;
    gameBoard.fillStyle = fillColor;
    gameBoard.fillRect(0, 0, width * size, height * size);
}

function draw_square(left, top, fillColor, borderColor) {
    const size = SQUARE_SIZE || 20
    const gameBoard = document.getElementById("gameBoard").getContext("2d");
    gameBoard.fillStyle = fillColor;
    gameBoard.strokeStyle = borderColor;
    gameBoard.lineWidth = 0.2;
    gameBoard.fillRect(left * size, top * size, size, size);
    gameBoard.strokeRect(left * size, top * size, size, size);
}

function loop(speed, callback) {
    setTimeout(function onTick() {
        callback();
        loop(speed, callback);
     }, speed)
}

function update_score(score) {
    const scoreDiv = document.getElementById("score");
    scoreDiv.innerHTML = score;
}

function get_random_number(min, max) {
    return Math.floor(Math.random() * max) + min;
}

function show_game_over() {
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
            onKeyDown(event.code);
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
        accumulator = 0;
        loop();
    }

    draw();

    // Keep requesting new frames
    window.requestAnimationFrame(game_loop);
}


//body

function snake_body_movement(snake_body, snake_length, snake_head, fruit_eaten) {
    snake_body.unshift({x: snake_head.x, y: snake_head.y})
    if (fruit_eaten === false) {
        snake_body.pop()
    }
    if (snake_bite_body(snake_body, snake_head, snake_length) === true) {
        game.status = "stop"
        show_game_over();
    }
}

function snake_bite_body(snake_body, snake_head, snake_length)
{
    for (var i = 1; i < snake_length; i += 1) {
        if (snake_body[i].x === snake_head.x && snake_body[i].y === snake_head.y) {
            return (true)
        }
    }
    return (false)
}

function draw_snake_body(snake_body, snake_length, snake_body_color)
{
    for (var i = 1; i < snake_length; i += 1) {
        draw_square(snake_body[i].x, snake_body[i].y, snake_body_color, GREEN)
    }
}
