// JavaScript source code
var DestObstacle = (function () {
    function DestObstacle(x, y) {
        this.position = new Vector2(x, y);

        this.width = 48;
        this.height = 48;
        this.animation = new Animation(this.width, this.height, 0, 0, 1, 'images/brick-wall.png', 1, 0, 0);
        this.boundingBox = new Rectangle(x, y, this.width, this.height);
    }

    DestObstacle.prototype.update = function () {

        this.animation.position.set(this.position.x, this.position.y);
        this.boundingBox.x = this.position.x;
        this.boundingBox.y = this.position.y;
        this.animation.update();
    };
    DestObstacle.prototype.render = function (ctx) {
        this.animation.draw(ctx);
    };
    return DestObstacle;
}());