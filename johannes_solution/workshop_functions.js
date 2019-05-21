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

function draw_square(left, top, fillColor, borderColor) {
    const size = SQUARE_SIZE || 20
    // if (SQUARE_SIZE)
    const gameBoard = document.getElementById("gameBoard").getContext("2d");
    gameBoard.fillStyle = fillColor;
    gameBoard.strokeStyle = borderColor;
    gameBoard.lineWidth = 0.2;
    gameBoard.fillRect(left * size, top * size, size, size);
    gameBoard.strokeRect(left * size, top * size, size, size);
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
    snake.body.unshift(block)
}

function remove_last_snake_block() {
    snake.body.pop();
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
        //console.log("tick")
        accumulator = 0;
        loop();
        // keyPressedHandled = false;
    }

    draw();

    // Keep requesting new frames
    window.requestAnimationFrame(game_loop);
}


//body Johannes

function manage_body(snake, fruit_eaten) {
    snake.body.unshift({x: snake.head.x, y: snake.head.y})
    if (fruit_eaten === true) {
        snake.body.pop()
    }
    if (snake_bite_body(snake) == true) {
        game.status = "stop"
        show_game_over();
        prompt("Enter your username")
    }
}

function snake_bite_body(snake)
{
    var i = 1

    while (i < snake.length) {
        if (snake.body[i].x === snake.head.x && snake.body[i].y === snake.head.y) {
            return (true)
        }
        i += 1
    }
    return (false)
}

function draw_snake_body(snake)
{
    var i = 1
    while (i < snake.length) {
        draw_square(snake.body[i].x, snake.body[i].y, snake.color, "green")
        i += 1
    }
}
