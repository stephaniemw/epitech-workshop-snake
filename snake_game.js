
// --------------------------------
// ------- GLOBAL VARIABLES -------
// --------------------------------

// size of square tiles in pixels
const SQUARE_SIZE = 20;

// Informations about the game status
const game = {
    status: "playing",
    score: 0,
    speed: 70
}

// Game boards characteristcs
const board_color = "green"; 
const width = 20;
const height = 20;


// Snake characteristics
const snake = { 
    color: "white",
    bodycolor: "orange",
    x: width/2,
    y: height/2, 
    direction: RIGHT,
    length: 3,
    body: [
        {x: width/2, y: height/2}, 
        {x: width/2, y: height/2}, 
        {x: width/2, y: height/2}, 
    ]
}

// fruit object
const fruit = {
    x: get_random_number(0, width -1),
    y: get_random_number(0, height -1),
    color: "red"
}

// -------------------------
// ------- FUNCTIONS -------
// -------------------------

// Main Drawing function, you should put all of the things that you want to draw in this function
function draw() {
    draw_board (width, height, board_color)
    draw_snake (snake.x, snake.y, snake.color)
    draw_square (fruit.x, fruit.y, fruit.color)    
    
    // console.log("drawing");
}

// Main loop function, this function is called every "game.speed" milliseconds.
function loop() {
    if (game.status === "playing") 
    {
    move_snake(); 
     const fruit_eaten = isSnakeOnFruit();
     if (fruit_eaten === true) {
         game.score = game.score +10;
         update_score(game.score)
         fruit.x = get_random_number(0, width-1); 
         fruit.y = get_random_number(0, height-1);
         snake.length = snake.length + 1
     }
     snake_body_movement(snake.body, snake.length, {x: snake.x, y: snake.y}, fruit_eaten) 
 }
}
function move_snake() {
    if (snake.direction === DOWN) {
        if (snake.y < height)
            snake.y = snake.y + 1;
        else
            snake.y = 0
    }
    if (snake.direction === UP) {
        if (snake.y > 0)
            snake.y = snake.y - 1;
        else 
            snake.y = height
    }
    if (snake.direction === LEFT) {
        if (snake.x > 0)
            snake.x = snake.x - 1;
        else 
            snake.x = width
    }
     if (snake.direction === RIGHT) {
         if (snake.x < width)
            snake.x = snake.x + 1;
         else 
            snake.x = 0
     }
}

// This function is called when a key is pressed
function onKeyDown(key_pressed) {
   if (key_pressed === ARROW_DOWN && snake.direction !== UP) {
       snake.direction = DOWN;
   }
   if (key_pressed === ARROW_UP && snake.direction !== DOWN) {
       snake.direction = UP;
   }
   if (key_pressed === ARROW_LEFT && snake.direction !== RIGHT) {
       snake.direction = LEFT;
   }
    if (key_pressed === ARROW_RIGHT && snake.direction !== LEFT) {
        snake.direction = RIGHT;
    }   
}

// --- Functions that they will have to do ---

// Handle the snake
    function draw_snake () {
         draw_square (snake.x, snake.y, snake.color),
         draw_snake_body (snake.body, snake.length, snake.bodycolor)
}

// Handle the fruit

    function isSnakeOnFruit(){
     if (snake.x === fruit.x && snake.y === fruit.y)
        {return true}
             else 
                {return false}
}
