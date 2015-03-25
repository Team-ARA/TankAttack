/**
 * Created by urukhai on 3/25/15.
 */
function createTerrain() {
    var bgImg = new Image();
    bgImg.src = "images/texture1.jpg";
    var pattern = ctx.createPattern(pic, 'repeat');
    ctx.fillStyle = pattern;
    ctx.fillRect(0, 0, canvas.width, canvas.height);

}