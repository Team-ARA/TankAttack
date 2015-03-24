/**
 * Created by urukhai on 3/24/15.
 */
var canvas,
    ctx,
    cWidth,
    cHeight;
var pic = new Image();
pic.src = "images/texture1.jpg";

function draw() {
    createPattern();
    //clear();
}

//create background image of the canvas
function createPattern(){
    var pattern = ctx.createPattern(pic, 'repeat');
    ctx.fillStyle = pattern;
    ctx.fillRect(0, 0, cWidth, cHeight);
}

//clear the canvas
function clear(){
    ctx.clearRect(0, 0, cWidth, cHeight);
}

//initialize canvas
function init() {
    canvas = document.getElementById('canvas');
    ctx = canvas.getContext('2d');
    cWidth = canvas.width;
    cHeight = canvas.height;

    draw();
}

window.addEventListener('load', init);