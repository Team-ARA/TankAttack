/**
 * Created by urukhai on 3/25/15.
 */
var Terrain = (function () {
    function createTerrain() {
        var bgImg = new Image();
        bgImg.src = "images/texture1.jpg";
        var pattern = ctx.createPattern(pic, 'repeat');
        ctx.fillStyle = pattern;
        ctx.fillRect(0, 0, canvas.width, canvas.height);
    }
    Terrain.prototype.render = function (ctx) {
        this.animation.draw(ctx);
    };
    return Terrain;
});