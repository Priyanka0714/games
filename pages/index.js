// Game Constants & Variables
let movedir = {x: 0, y: 0}; 
const foodSound = new Audio('sounds/food.mp3');
const gameOverSound = new Audio('sounds/gameover.mp3');
const moveSound = new Audio('sounds/move.mp3');
const musicSound = new Audio('sounds/music.mp3');
let speed = 5;
let score = 0;
let lastPaintTime = 0;
//snake head at 13, 15
let snakeArr = [{x: 13, y: 15}];

food = {x: 3, y: 4};

// Game Functions
function gameFunction(currtime) {
    window.requestAnimationFrame(gameFunction);
    //current time -- last until if false don't render and then 
    //lastpainttime = curr time
    if((currtime - lastPaintTime)/1000 < 1/speed){
        return;
    }
    lastPaintTime = currtime;
    runSnake();
}

function isCollide(snake) {
    // If you bump into yourself 
    for (let i = 1; i < snakeArr.length; i++) {
        if(snake[i].x === snake[0].x && snake[i].y === snake[0].y){
            return true;
        }
    }
    // If you bump into the wall
    if(snake[0].x >= 18 || snake[0].x <=0 || snake[0].y >= 18 || snake[0].y <=0){
        return true;
    }  
    return false;
}

function runSnake(){
    // Part 1: Updating the snake variable/array & Food
    if(isCollide(snakeArr)){
        gameOverSound.play();
        musicSound.pause();
        movedir =  {x: 0, y: 0}; 
        alert("Game Over. Press any key to play again!");
        //if anyone restart then reset snakearr and start
        snakeArr = [{x: 13, y: 15}];
        musicSound.play();
        score = 0; 
    }

    // If you have eaten the food, increment the score and regenerate the food
    //when snake head (cordinate)= food head(coordinate)
    if(snakeArr[0].y === food.y && snakeArr[0].x ===food.x){
        foodSound.play();
        score += 1;
        if(score>hiscoreval){
            hiscoreval = score;
            localStorage.setItem("hiscore", JSON.stringify(hiscoreval));
            hiscoreBox.innerHTML = "HiScore: " + hiscoreval;
        }
        scoreBox.innerHTML = "Score: " + score;
        //add food to snake  head
        snakeArr.unshift({x: snakeArr[0].x + movedir.x, y: snakeArr[0].y + movedir.y});
        let a = 2;
        let b = 16;
        //random generate new  food(random num b/w a and b)
        food = {x: Math.round(a + (b-a)* Math.random()), y: Math.round(a + (b-a)* Math.random())}
    }

    // Moving the snake
    for (let i = snakeArr.length - 2; i>=0; i--) { 
        snakeArr[i+1] = {...snakeArr[i]}; //make arr i+1 equal to i
        //... b/c want to add a new object
    }
    snakeArr[0].x += movedir.x;
    snakeArr[0].y += movedir.y;

    // Part 2: Display/render the snake and Food
    // Display the snake
    board.innerHTML = ""; // empty board
    snakeArr.forEach((e, index)=>{
        snakeElement = document.createElement('div');//create a new div elements
        //add some css to elemnt grid start e.y topleft-to -bottom left
        //e.x --- topleft- to right left
        snakeElement.style.gridRowStart = e.y;
        snakeElement.style.gridColumnStart = e.x;
        
        //add some class to give different color to head, snake,food
        //if inx = 0 add head else snake and add to board
        if(index === 0){
            snakeElement.classList.add('head');
        }
        else{
            snakeElement.classList.add('snake');
        }
        board.appendChild(snakeElement);
    });
    // Display the food , food start -- food.y, food.x
    foodElement = document.createElement('div');
    foodElement.style.gridRowStart = food.y;
    foodElement.style.gridColumnStart = food.x;

    foodElement.classList.add('food')
    board.appendChild(foodElement); // add food to board


}


// Main logic starts here
//musicSound.play();
let hiscore = localStorage.getItem("hiscore");
if(hiscore === null){
    hiscoreval = 0;
    localStorage.setItem("hiscore", JSON.stringify(hiscoreval))
}
else{
    hiscoreval = JSON.parse(hiscore);
    hiscoreBox.innerHTML = "HiScore: " + hiscore;
}

window.requestAnimationFrame(gameFunction);
//as anyone press key on windows listen
window.addEventListener('keydown', e =>{
    // Start the game if any button pressed move to down
    movedir = {x: 0, y: 1} 
    moveSound.play();//give start/play sound
    //tell user which key have been pressed
    switch (e.key) {
        case "ArrowUp":
            console.log("ArrowUp");
            movedir.x = 0;
            movedir.y = -1;
            break;

        case "ArrowDown":
            console.log("ArrowDown");
            movedir.x = 0;
            movedir.y = 1;
            break;

        case "ArrowLeft":
            console.log("ArrowLeft");
            movedir.x = -1;
            movedir.y = 0;
            break;

        case "ArrowRight":
            console.log("ArrowRight");
            movedir.x = 1;
            movedir.y = 0;
            break;
        default:
            break;
    }

});