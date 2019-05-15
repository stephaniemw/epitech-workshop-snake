
// --------------------------------
// ------- GLOBAL VARIABLES -------
// --------------------------------

// size of square tiles in pixels
const SQUARE_SIZE = 20;

// Informations about the game status
const game = {
    status: "playing",
    score: 0,
    speed: 100
}

// Game boards characteristcs
const width = 24;
const height = 24;
const background_color = "#78AB46";

// Snake characteristics
let snake = {
    color: "yellow",
    positions: [
        { x: width / 2, y: height / 2 },
        { x: width / 2 - 1, y: height / 2 },
        { x: width / 2 - 2, y: height / 2 }
    ],
    direction: "west"
};

// set the fruit's position
const fruit = {
    show: false,
    x: -1,
    y: -1
}

const colors = [
    "#ffe900",
    "#FFC300",
    "#FF5733",
    "#C70039",
    "#581845",
    "#C70039",
    "#FF5733",
]

// -------------------------
// ------- FUNCTIONS -------
// -------------------------

// Main Drawing function, you should put all of the things that you want to draw in this function
function draw() {
    draw_board(width, height, background_color);

    draw_fruit(fruit);
    draw_snake(snake);
}

// Main loop function, this function is called every "game.speed" milliseconds.
function loop() {
    if (game.status === "playing") {
        move_snake(snake, width, height);
        handle_interaction(snake, fruit, game);
        randomly_spawn_fruit(fruit, width, height);
        print_score(game.score);
    }
}

// This function is called when a key is pressed
function onKeyDown(key_pressed) {
    console.log(key_pressed);
    if (key_pressed === "ArrowRight" && snake.direction !== "east") {
        snake.direction = "west"
    }
    if (key_pressed === "ArrowLeft" && snake.direction !== "west") {
        snake.direction = "east"
    }
    if (key_pressed === "ArrowDown" && snake.direction !== "north") {
        snake.direction = "south"
    }
    if (key_pressed === "ArrowUp" && snake.direction !== "south") {
        snake.direction = "north"
    }
}

// --- Functions that they will have to do ---

// Handle the movement of the snake
function move_snake(snake, width, height) {
    const head = snake.positions[0];

    if (snake.direction === "west") {
        if (head.x + 1 === width)
            add_block_to_snake_head({ x: 0, y: head.y })
        else
            add_block_to_snake_head({ x: head.x + 1, y: head.y })
    }
    if (snake.direction === "east") {
        if (head.x - 1 < 0)
            add_block_to_snake_head({ x: width - 1, y: head.y })
        else
            add_block_to_snake_head({ x: head.x - 1, y: head.y })
    }
    if (snake.direction === "south") {
        if (head.y + 1 === height)
            add_block_to_snake_head({ x: head.x, y: 0 })
        else
            add_block_to_snake_head({ x: head.x, y: head.y + 1 })
    }
    if (snake.direction === "north") {
        if (head.y - 1 < 0) 
            add_block_to_snake_head({ x: head.x, y: height - 1 })
        else
            add_block_to_snake_head({ x: head.x, y: head.y - 1 })
    }
}

function handle_interaction(snake, fruit, game) {
    if (did_snake_bite_itself(snake) === true) {
        game.status = "stop"
        show_game_over();
        prompt("Enter your username")
    }
    if (did_snake_eat_fruit(snake, fruit, game) === true) {
        game.score = game.score + 10;
        // game.speed = game.speed - 10;
        fruit.show = false;
    } else {
        remove_last_snake_block(); // remove tail
    }
}

function draw_snake(snake) {
    const length = snake.positions.length;
    let i = 0;
    while (i < length) {
        const position = snake.positions[i];
        let color_index = i % colors.length;
        draw_square(position.x, position.y, i === 0 ? snake.color : colors[color_index]);
        i = i + 1;
    }
}

function draw_fruit(fruit) {
    if (fruit.show === true) {
        draw_square(fruit.x, fruit.y, "red");
    }
}

function did_snake_eat_fruit(snake, fruit) {
    const snake_head = snake.positions[0];
    if (fruit.show === true && snake_head.x === fruit.x && snake_head.y === fruit.y) {
        return true;
    }
    return false;
}

function did_snake_bite_itself(snake) {
    const head = snake.positions[0];
    const length = snake.positions.length;
    let i = 1;
    while (i < length) {
        const position = snake.positions[i];
        if (head.x === position.x && head.y === position.y)
            return true;
        i = i + 1;
    }
    return false;
}

function randomly_spawn_fruit(fruit, width, height) {
    if (fruit.show === false) {
        const random = get_random_number(0, 5);
        if (random === 0) {
            fruit.show = true;
            fruit.x = get_random_number(0, width - 1);
            fruit.y = get_random_number(0, height - 1);
        }
    }
}