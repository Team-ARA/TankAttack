/**
 * Created by urukhai on 3/25/15.
 */
var Terrain = (function () {
    function Terrain(x, y) {
        this.position = new Vector2(x, y);
        this.animation = new Animation(600, 600, 0, 0, 1, 'images/texture1.jpg', 22, 0, 0);
    }
    Terrain.prototype.update = function () {
      
        this.animation.position.set(this.position.x, this.position.y);
        this.animation.update();
    };
    Terrain.prototype.render = function (ctx) {
        this.animation.draw(ctx);
    };
    return Terrain;
}());


