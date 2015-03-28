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
rocks.push(new Obstacle(100, 300));
rocks.push(new Obstacle(200, 300));
rocks.push(new Obstacle(500, 200));
rocks.push(new Obstacle(400, 400));
rocks.push(new Obstacle(100, 450));

var enemies = new Array();
var bullets = new Array();
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

var previousTime = Date.now();

var shootOnce = true; //used for restraining the tank of shooting pultiple bullets
//create background image of the canvas

function update() {
    this.tick();
    this.render(ctx);
    requestAnimationFrame(update);
}

function tick() {
    bulletIntersectWithEnemy();
    bulletOutOfCanvas();
    playerOutOfCanvas();
    playerIntersectsWithObstacle();
    movePlayer();
    startTimer();

    playerLooking();

    player.update();
    bullets.forEach(function (element) {
        element.update();
    });
    enemies.forEach(function (element) {
        element.update();
    });
    terrain.update();
    rocks.forEach(function (element) {
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
    player.render(ctx);
    enemies.forEach(function (element) {
        element.render(ctx);
    });

}

function bulletIntersectWithEnemy() {
    //enemies.forEach(function (element) {
    //    bullets.forEach(function (elem) {
    //        console.log(1);
    //        delete element;
    //        enemies.splice(element, 1)
    //    });
    //});
    /*enemies.forEach(function (index) {
        bullets.forEach(function (ind) {
            if (bullets[ind].boundingBox.intersects(enemies[index].boundingBox)) {
                bullets.splice(ind, 1);
                enemies.splice(index, 1);
            }
        });

    });*/
    for (var enemyIndex = 0; enemyIndex < enemies.length; enemyIndex++) {
        for (var bulletIndex = 0; bulletIndex < bullets.length; bulletIndex++) {
            if (bullets[bulletIndex].boundingBox.intersects(enemies[enemyIndex].boundingBox)) {
                bullets.splice(bulletIndex, 1);
                enemies.splice(enemyIndex, 1);
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

       var reloadTime = setTimeout(function() {
           shootOnce = true;
       }, 500)
    }
    
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








update();