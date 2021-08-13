c = document.getElementById('c'),
    ctx = c.getContext('2d');
var levelWidth = 800;
var levelHeight = 600;
var bulletMove = false;
var angleX = 0;
var angleY = 0;
var bulletOutOfBounds = false;
var bullet = [];
c.width = levelWidth;
c.height = levelHeight;
var score = 0;
var highScore = score;
var mousePosX = levelWidth / 2;
var mousePosY = levelHeight / 2;

addEventListener('mousemove', function (e) {
    mousePosX = e.clientX;
    mousePosY = e.clientY;
});

addEventListener('click', function (e) {
    bullet.push(new projectile(eye.x, eye.y, 2, angleX, angleY, 5));
    bulletMove = true;
});

var apple = {
    x: 0,
    y: 0,
    radius: 10
}

var eye = {
    x: 0,
    y: 0,
    radius: 5
}

var snake = new player(levelWidth, levelHeight, 10);
var simpleEnemy = new enemy(levelWidth/2, levelHeight, 5);

var resetGame = function () {
    snake = new player(levelWidth, levelHeight, 10);
    bullet = [];
    eye.x = snake.x + snake.radius;
    eye.y = snake.x + snake.radius;
    if (score > highScore) {
        highScore = score;
    }
    score = 0;
    apple.x = Math.round(levelWidth * 0.7);
    apple.y = Math.round(levelHeight * 0.6);
}

var GameLoop = function () {

    simpleEnemy.move();
    snake.move();
    for (var i = 0; i < bullet.length; i++) {
        bullet[i].move();

        //check if bullet is OB
        bulletOutOfBounds = bullet[i].x < 0 || bullet[i].x >= levelWidth || bullet[i].y < 0 || bullet[i].y >= levelHeight;
        if (bulletOutOfBounds) {
            bulletMove = false;
        }

        //collision bullet / apple?
        var checken = Math.pow(bullet[i].x - apple.x, 2) + Math.pow(bullet[i].y - apple.y, 2);
        if (Math.sqrt(checken) < bullet[i].radius + apple.radius) {
            score++;
            snake.radius = snake.radius + 5;
            apple.x = Math.floor(Math.random() * levelWidth);
            apple.y = Math.floor(Math.random() * levelHeight);
        }
    }
    
    //check if snake is PB
    var snakeOutOfBounds = snake.x < 0 || snake.x >= levelWidth || snake.y < 0 || snake.y >= levelHeight;
    if (snakeOutOfBounds) {
        resetGame();
    }

    // Collision Snake / apple? 
    var checken = Math.pow(snake.x - apple.x, 2) + Math.pow(snake.y - apple.y, 2);
    if (Math.sqrt(checken) < snake.radius + apple.radius) {
        resetGame();
    }

    //background
    ctx.fillStyle = "#2f2f2f";
    ctx.fillRect(0, 0, c.width, c.height);

    //apple
    ctx.fillStyle = "#843535";
    ctx.beginPath();
    ctx.arc(apple.x, apple.y, apple.radius, 0, 2 * Math.PI);
    ctx.fill();

     //simpleEnemy
     ctx.fillStyle = "#843535";
     ctx.beginPath();
     ctx.arc(simpleEnemy.x, simpleEnemy.y, simpleEnemy.radius, 0, 2 * Math.PI);
     ctx.fill();

    //PLayer
    ctx.fillStyle = "#556046";
    ctx.beginPath();
    ctx.arc(snake.x, snake.y, snake.radius, 0, 2 * Math.PI);
    ctx.fill();

    //bullet
    for (var i = 0; i < bullet.length; i++) {
        ctx.fillStyle = "#f2f2f2";
        ctx.beginPath();
        ctx.arc(bullet[i].x, bullet[i].y, bullet[i].radius, 0, 2 * Math.PI);
        ctx.fill();
    }

    //eye
    ctx.fillStyle = "#f5f5f5";
    ctx.beginPath();
    ctx.arc(eye.x, eye.y, eye.radius, 0, 2 * Math.PI);
    ctx.fill();

    //text
    ctx.fillStyle = "#fff";
    ctx.font = "15px Arial";
    ctx.fillText("Score: " + score, 10, c.height - 15);
    ctx.fillText("size: " + snake.radius, c.width - 400, c.height - 15);
    ctx.fillText("High score: " + highScore, c.width - 200, c.height - 15);
    setTimeout(GameLoop, 10);
    return;
}
GameLoop();