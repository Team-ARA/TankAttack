/**
 * Created by urukhai on 3/24/15.
 */
var canvas,
    ctx;

canvas = document.getElementById('canvas');
ctx = canvas.getContext('2d');

var pic = new Image();
pic.src = "images/texture1.jpg";


var input = new Input();
attachListeners(input);

var player = new Player(canvas.width - 50, 100);


var previousTime = Date.now();



//create background image of the canvas
function createPattern(){
    var pattern = ctx.createPattern(pic, 'repeat');
    ctx.fillStyle = pattern;
    ctx.fillRect(0, 0, cWidth, cHeight);
}

function update() {
    this.tick();
    this.render(ctx);
    requestAnimationFrame(update);
}

function tick() {
    movePlayer();
    player.update();
}

function render(ctx) {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
   
    
    player.render(ctx);

}

function movePlayer() {
    player.movement.right = !!input.right;
    player.movement.left = !!input.left;
    player.movement.up = !!input.up;
    player.movement.down = !!input.down;
}



update();