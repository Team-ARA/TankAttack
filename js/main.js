/**
 * Created by urukhai on 3/24/15.
 */
var canvas,
    ctx;

canvas = document.getElementById('canvas');
ctx = canvas.getContext('2d');


var input = new Input();
attachListeners(input);
var terrain = new Terrain(0,0);
var player = new Player(canvas.width - 50, 100);


var previousTime = Date.now();



//create background image of the canvas

function update() {
    this.tick();
    this.render(ctx);
    requestAnimationFrame(update);
}

function tick() {
    movePlayer();
    playerOutOfCanvas();
    player.update();
    terrain.update();
}

function render(ctx) {
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    terrain.render(ctx);
    player.render(ctx);

}

function movePlayer() {
    player.movement.right = !!input.right;
    if (input.right) {
        console.log(1);

    }
    player.movement.left = !!input.left;
    player.movement.up = !!input.up;
    player.movement.down = !!input.down;
}
function playerOutOfCanvas() {
    if (player.position.x < 2) {
        player.position.x = 2;
    }
    if (player.position.x > 570) {
        player.position.x = 570;
    }
    if (player.position.y < 2) {
        player.position.y = 2;
    }
    if (player.position.y > 570) {
        player.position.y = 570;
    }


}



update();