/**
 * Created by urukhai on 3/25/15.
 */
var Obstacle = (function () {
    function Obstacle(x, y) {
        this.position = new Vector2(x, y);

        this.width = 100;
        this.height = 100;
        this.animation = new Animation(this.width, this.height, 0, 0, 1, 'images/stones.png', 22, 0, 0);
        this.boundingBox = new Rectangle(x, y, this.width, this.height)

    }

    Obstacle.prototype.update = function () {

        this.animation.position.set(this.position.x, this.position.y);
        this.boundingBox.x = this.position.x;
        this.boundingBox.y = this.position.y;
        this.animation.update();
    };
    Obstacle.prototype.render = function (ctx) {
        this.animation.draw(ctx);
    };
    return Obstacle;
}());