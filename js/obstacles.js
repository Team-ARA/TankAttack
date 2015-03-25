/**
 * Created by urukhai on 3/25/15.
 */
var Obstacle = (function () {
    function Obstacle(x, y) {
        this.position = new Vector2(x, y);

        this.animation = new Animation(100, 100, 0, 0, 1, 'images/stones.png', 22, 0, 0);
        this.boundingBox = new Rectangle(x, y, this.width, this.height);
    }
    Obstacle.prototype.update = function () {


        this.animation.position.set(this.position.x, this.position.y);
        this.animation.update();
    };
    Obstacle.prototype.render = function (ctx) {
        this.animation.draw(ctx);
    };
    return Obstacle;
}());