
// --------------------------------
// ------- GLOBAL VARIABLES -------
// --------------------------------

// size of square tiles in pixels
const SQUARE_SIZE = 20

// Informations about the game status
const game = {
    status: "playing",
    score: 0,
    speed: 100
}

// Game boards characteristcs
const width = 24
const height = 24
const color = GREEN

// Snake characteristics
const snake = {
    head: {x: width/2, y: height/2},
    color: "yellow",
    length: 3,
    body: [
        {x: width / 2, y: height / 2},
        {x: width / 2 - 1, y: height / 2},
        {x: width / 2 - 2, y: height / 2},
    ],
    direction: RIGHT
}

//fruit
const fruit = {
    spawned: false,
    position: {x:0, y: 0},
    color: "red",
}

// set the fruit's position


// -------------------------
// ------- FUNCTIONS -------
// -------------------------

// Main Drawing function, you should put all of the things that you want to draw in this function
function draw() {
    draw_board(width, height, color)
    draw_fruit()
    draw_snake()
}

// Main loop function, this function is called every "game.speed" milliseconds.
function loop() {
    if (game.status == "playing") {
        spawn_fruit()
        move_snake()
        const fruit_eaten = eat_fruit()
        manage_body(snake, fruit_eaten)
    }
}

// This function is called when a key is pressed
function onKeyDown(key_pressed) {
    if (key_pressed === ARROW_UP && snake.direction !== DOWN) {
        snake.direction = UP
    }
    if (key_pressed === ARROW_RIGHT && snake.direction !== LEFT) {
        snake.direction = RIGHT
    }
    if (key_pressed === ARROW_DOWN && snake.direction !== UP) {
        snake.direction = DOWN
    }
    if (key_pressed === ARROW_LEFT && snake.direction !== RIGHT) {
        snake.direction = LEFT
    }
}

// --- Functions that they will have to do ---

//fruit
function draw_fruit() {
    if (fruit.spawned === true) {
        draw_square(fruit.position.x, fruit.position.y, fruit.color, "green")
    }
}

function spawn_fruit() {
    if (fruit.spawned === false) {
        fruit.position.x = get_random_number(0, width - 1)
        fruit.position.y = get_random_number(0, height - 1)
        fruit.spawned = true
    }
}

// Handle the movement of the snake
function draw_snake() {
    draw_square(snake.head.x, snake.head.y, snake.color, "green")
    draw_snake_body(snake)
}

function move_snake() {
    if (snake.direction === UP) {
        if (snake.head.y !== 0) {
            snake.head.y = snake.head.y - 1
        } else {
            snake.head.y = height - 1
        }
    }
    if (snake.direction === RIGHT) {
        if (snake.head.x !== width - 1) {
            snake.head.x = snake.head.x + 1
        } else {
            snake.head.x = 0
        }
    }
    if (snake.direction === DOWN) {
        if (snake.head.y !== height - 1) {
            snake.head.y = snake.head.y + 1
        } else {
            snake.head.y = 0
        }
    }
    if (snake.direction === LEFT) {
        if (snake.head.x !== 0) {
            snake.head.x = snake.head.x - 1
        } else {
            snake.head.x = width - 1
        }
    }
}

function eat_fruit() {
    if (snake.head.x === fruit.position.x && snake.head.y === fruit.position.y) {
        fruit.spawned = false
        game.score = game.score + 10
        print_score(game.score)
        snake.length = snake.length + 1
        return (true)
    }
    return (false)
}
