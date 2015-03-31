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
var walls = new Array();

var shootEff = document.getElementById("soundEfx");

/*these are the terrain elements*/
for (var i = 0; i < 600; i += 30) {
    walls.push(new Obstacle(-15, i));
    walls.push(new Obstacle(585, i));
}

walls.push(new Obstacle(120, 90));
walls.push(new Obstacle(120, 120));
walls.push(new Obstacle(120, 150));
walls.push(new Obstacle(150, 90));
walls.push(new Obstacle(180, 90));

walls.push(new Obstacle(120, 450));
walls.push(new Obstacle(120, 420));
walls.push(new Obstacle(120, 390));
walls.push(new Obstacle(150, 450));
walls.push(new Obstacle(180, 450));

walls.push(new Obstacle(480, 450));
walls.push(new Obstacle(480, 420));
walls.push(new Obstacle(480, 390));
walls.push(new Obstacle(450, 450));
walls.push(new Obstacle(420, 450));

walls.push(new Obstacle(480, 90));
walls.push(new Obstacle(480, 120));
walls.push(new Obstacle(480, 150));
walls.push(new Obstacle(450, 90));
walls.push(new Obstacle(420, 90));

walls.push(new Obstacle(15, 270));
walls.push(new Obstacle(45, 270));
walls.push(new Obstacle(75, 270));

walls.push(new Obstacle(555, 270));
walls.push(new Obstacle(525, 270));
walls.push(new Obstacle(495, 270));
/*terain objects end here*/

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
var counter = 0;
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
    enemyBulletIntersectWithObstacles();
    bulletOutOfCanvas();
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
    walls.forEach(function (element) {
        element.update();
    });
    explosionAnim.forEach(function (element) {
        element.update();
    });
}

function render(ctx) {
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    terrain.render(ctx);

    walls.forEach(function (element) {
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
                shootEff.play();
                explosionAnim.push(new Explosion(enemies[enemyIndex].position.x + 10, enemies[enemyIndex].position.y + 10));
                enemies.splice(enemyIndex, 1);
                counter += 1;
                var points = document.getElementById('nums');
                points.innerHTML = counter;
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
            console.log(1);
            if (lives > 0) {
                var life = document.getElementById('life' + lives);
                life.style['display'] = 'none';
                console.log(2);
            }
            if (lives == 0) {
                ctx.fillStyle = 'black';
                ctx.lineWidth = 10;
                ctx.fillText('GAME OVER', 100, 200);
                console.log(3);
            }
            lives--;
        }
    }
}

function bulletIntersectWithObstacles() {
    for (var obstacleIndex = 0; obstacleIndex < walls.length; obstacleIndex++) {
        for (var bulletIndex = 0; bulletIndex < bullets.length; bulletIndex++) {
            if (bullets[bulletIndex].boundingBox.intersects(walls[obstacleIndex].boundingBox)) {
                bullets.splice(bulletIndex, 1);
            }
        }
    }

}

function enemyBulletIntersectWithObstacles() {
    for (var obstacleIndex = 0; obstacleIndex < walls.length; obstacleIndex++) {
        for (var bulletIndex = 0; bulletIndex < enemyBullets.length; bulletIndex++) {
            if (enemyBullets[bulletIndex].boundingBox.intersects(walls[obstacleIndex].boundingBox)) {
                enemyBullets.splice(bulletIndex, 1);
            }
        }
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

        var reloadTime = setTimeout(function () {
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
            }, 2000)

        }
    }
}

function enemyOutOfCanvas() {
    enemies.forEach(function (item, index) {
        if (item.position.y > 600) {
            enemies.splice(index, 1);
        }
    })
}


function bulletOutOfCanvas() {
    bullets.forEach(function (item, index) {
        if (item.position.x < -10) {
            bullets.splice(index, 1);
        }
        if (item.position.x > 600) {
            bullets.splice(index, 1);
        }
        if (item.position.y < -10) {
            bullets.splice(index, 1);
        }
        if (item.position.y > 600) {
            bullets.splice(index, 1);
        }
    })

    enemyBullets.forEach(function (item, index) {
        if (item.position.x < -10) {
            enemyBullets.splice(index, 1);
        }
        if (item.position.x > 580) {
            enemyBullets.splice(index, 1);
        }
        if (item.position.y < -10) {
            enemyBullets.splice(index, 1);
        }
        if (item.position.y > 580) {
            enemyBullets.splice(index, 1);
        }
    })
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

    walls.forEach(function (element, index) {
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