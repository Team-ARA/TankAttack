/**
 * Created by urukhai on 3/24/15.
 */
var canvas,
    ctx;

canvas = document.getElementById('canvas');
ctx = canvas.getContext('2d');

var input = new Input();
attachListeners(input);
var terrain = new Terrain(0, 0);
var playerLooks = "up";
var rocks = new Array();
for (var i = 1; i < 600; i+=25) {
    rocks.push(new Obstacle(-20, i));
}

for (var i = 1; i < 600; i+=25) {
    rocks.push(new Obstacle(560, i));
}

rocks.push(new Obstacle(100, 150));
rocks.push(new Obstacle(400, 200));
rocks.push(new Obstacle(450, 210));
rocks.push(new Obstacle(500, 200));
rocks.push(new Obstacle(200, 400));
rocks.push(new Obstacle(100, 450));

var enemies = new Array();
var explosionAnim = new Array();
var bullets = new Array();
var enemyBullets = new Array();
enemies.push(new Enemy(Math.random() * canvas.width, canvas.height - 580));
var timer;
function startTimer() {
    timer = setInterval(function () {
        if (Math.random() < 0.0005) {
            enemies.push(new Enemy(Math.random() * canvas.width, canvas.height - 580));
        }
    }, 3000);
}

var player = new Player(canvas.width / 2, canvas.height - 50);
//var enemy = new Enemy(Math.random() * (canvas.width /2), canvas.height - 580);
var lives = player.lives;
var previousTime = Date.now();

var shootOnce = true; //used for restraining the tank of shooting multiple bullets
var shootOnceEnemy = true;

function update() {
    this.tick();
    this.render(ctx);
    requestAnimationFrame(update);
}

function tick() {
    explosionAnimTimer();
    bulletIntersectWithEnemy();
    enemyBulletIntersectWithPlayer();
    bulletIntersectWithObstacles();
    bulletOutOfCanvas();
    enemyBulletOutOfCanvas();
    playerOutOfCanvas();
    enemyOutOfCanvas();
    playerIntersectsWithObstacle();
    movePlayer();
    enemiesShooting();
    startTimer();

    playerLooking();

    player.update();
    bullets.forEach(function (element) {
        element.update();
    });
    enemyBullets.forEach(function (element) {
        element.update();
    });
    enemies.forEach(function (element) {
        element.update();
    });
    terrain.update();
    rocks.forEach(function (element) {
        element.update();
    });
    explosionAnim.forEach(function (element) {
        element.update();
    });
}

function render(ctx) {
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    terrain.render(ctx);

    rocks.forEach(function (element) {
        element.render(ctx);
    });
    bullets.forEach(function (elem) {
        elem.render(ctx);
    });
    enemyBullets.forEach(function (elem) {
        elem.render(ctx);
    });
    player.render(ctx);
    enemies.forEach(function (element) {
        element.render(ctx);
    });
    explosionAnim.forEach(function (element) {
        element.render(ctx);
    });

}

function bulletIntersectWithEnemy() {
    for (var enemyIndex = 0; enemyIndex < enemies.length; enemyIndex++) {
        for (var bulletIndex = 0; bulletIndex < bullets.length; bulletIndex++) {
            if (bullets[bulletIndex].boundingBox.intersects(enemies[enemyIndex].boundingBox)) {
                bullets.splice(bulletIndex, 1);
                explosionAnim.push(new Explosion(enemies[enemyIndex].position.x + 10, enemies[enemyIndex].position.y + 10));
                enemies.splice(enemyIndex, 1);
            }
        }
    }
}

function enemyBulletIntersectWithPlayer() {

    for (var i = 0; i < enemyBullets.length; i++) {
        if (enemyBullets[i].boundingBox.intersects(player.boundingBox)) {
            explosionAnim.push(new Explosion(player.position.x + 10, player.position.y + 10));
            resetPlayer();
            enemyBullets.splice(i, 1);
            if (player.lives > 0) {
                var life = document.getElementById('life' + player.lives);
                life.style['display'] = 'none';
            }
<<<<<<< HEAD
            if(lives == 0) {
                ctx.fillStyle = 'black';
                ctx.lineWidth = 10;
                ctx.fillText('GAME OVER', 100, 200);
                console.log(3);
=======
            if (player.lives == 0) {
                var text = 'YOU WERE DEFEATED',
                    x = 30,
                    y = 250;
                ctx.font = 'normal 50px Arial bold';
                ctx.fillStyle = 'white';
                ctx.fillText(text, x, y);
                ctx.lineWidth = 6;
>>>>>>> b3c589080678ea25e4884b0ed6e62f3a6ce48a9e
            }
            player.lives--;
        }
    }
}

function bulletIntersectWithObstacles() {
    for (var obstacleIndex = 0; obstacleIndex < rocks.length; obstacleIndex++) {
        for (var bulletIndex = 0; bulletIndex < bullets.length; bulletIndex++) {
            if (bullets[bulletIndex].boundingBox.intersects(rocks[obstacleIndex].boundingBox)) {
                bullets.splice(bulletIndex, 1);
            }
        }
    }

}
function enemyIntersectWithObstacles() {
    for (var enemyIndex = 0; enemyIndex < enemies.length; enemyIndex++) {
        for (var rocksIndex = 0; rocksIndex < rocks.length; rocksIndex++) {
            if (enemies[enemyIndex].boundingBox.intersects(rocks[obstacleIndex].boundingBox)) {
                //enemyMove();
                if (enemies[enemyIndex].watchPos.down) {
                    enemies[enemyIndex].movement.left = true;
                }
            }
        }
    }
}
function enemyMove() {
    if (s) {

    }
}

function movePlayer() {
    //console.log(player.position);

    player.movement.right = !!input.right;
    player.movement.left = !!input.left;
    player.movement.up = !!input.up;
    player.movement.down = !!input.down;

    if (input.space && shootOnce) {
        if (player.watchPos.right == true) {
            playerLooks = "right";
        }
        if (player.watchPos.left == true) {
            playerLooks = "left";
        }
        if (player.watchPos.up == true) {
            playerLooks = "up";
        }

        if (player.watchPos.down == true) {
            playerLooks = "down";
        }
        bullets.push(new Bullet(player.position.x + 10, player.position.y + 10, playerLooks));
        shootOnce = false;

       var reloadTime = setTimeout(function() {
           shootOnce = true;
       }, 500)
    }
    
}


function enemiesShooting() {
    if (shootOnceEnemy) {
        for (var i = 0; i < enemies.length; i++) {
            enemyBullets.push(new Bullet(enemies[i].position.x + 10, enemies[i].position.y + 10, "down"));
            shootOnceEnemy = false;

            var reloadTimeEnemy = setTimeout(function () {
                shootOnceEnemy = true;
            },2000)

        }
    }
}



function enemyOutOfCanvas() {
    enemies.forEach(function (item, index) {
        if (item.position.y > 570) {
            enemies.splice(index, 1);
        }
    });
}


function bulletOutOfCanvas() {
    bullets.forEach(function (item, index) {
        if (item.position.x < 3) {
            bullets.splice(index, 1);
        }
        if (item.position.x > 570) {
            bullets.splice(index, 1);
        }
        if (item.position.y < 2) {
            bullets.splice(index, 1);
        }
        if (item.position.y > 570) {
            bullets.splice(index, 1);
        }
    });
}



function enemyBulletOutOfCanvas() {
    enemyBullets.forEach(function (item, index) {
        if (item.position.x < 3) {
            enemyBullets.splice(index, 1);
        }
        if (item.position.x > 570) {
            enemyBullets.splice(index, 1);
        }
        if (item.position.y < 2) {
            enemyBullets.splice(index, 1);
        }
        if (item.position.y > 570) {
            enemyBullets.splice(index, 1);
        }
    });
}



function playerOutOfCanvas() {
    if (player.position.x < 2) {
        player.position.set(2, player.position.y);
    }
    if (player.position.x > 570) {
        player.position.set(570, player.position.y);
    }
    if (player.position.y < 2) {
        player.position.set(player.position.x, 2);
    }
    if (player.position.y > 570) {
        player.position.set(player.position.x, 570);
    }
}
function playerIntersectsWithObstacle() {

    rocks.forEach(function (element, index) {
        if (player.boundingBox.intersects(element.boundingBox)) {
            console.log("intersected with %d", index);
            if (player.movement.up) {
                player.position.set(player.position.x, player.position.y + 3);
            }
            else if (player.movement.down) {
                player.position.set(player.position.x, player.position.y - 3);
            }
            else if (player.movement.left) {
                player.position.set(player.position.x + 3, player.position.y);
            }
            else if (player.movement.right) {
                player.position.set(player.position.x - 3, player.position.y);
            }
        }
    });
}
function playerLooking() {
    if (player.watchPos.right == true) {
        player.animation = player.animationRight;
    }
    if (player.watchPos.left == true) {
        player.animation = player.animationLeft;
    }
    if (player.watchPos.up == true) {
        player.animation = player.animationUp;
    }
    if (player.watchPos.down == true) {
        player.animation = player.animationDown;
    }
}

function explosionAnimTimer() {
  
    for (var animIndex = 0; animIndex < explosionAnim.length; animIndex++) {
        explosionAnim[animIndex].timer += 0.01;
        if (explosionAnim[animIndex].timer > 1) {
            explosionAnim.splice(animIndex, 1);
        }
    }

}

function resetPlayer() {
    player.position.x = canvas.width / 2;
    player.position.y = canvas.height - 50;
    player.watchPos.up = true;
    player.watchPos.down = false;
    player.watchPos.right = false;
    player.watchPos.left = false;
  
}

update();