/**
 * Created by urukhai on 3/27/15.
 */
var Enemy = (function () {
    function Enemy(x, y) {
        this.position = new Vector2(x, y);
        this.movement = { left: false, right: false, up: false, down: true };
        this.velocity = 1;
        this.velocityModifier = 0;
        this.width = 32;
        this.height = 32;
        this.animation = new Animation(32, 32, 0, 1, 4, 'images/Enemies.png', 4, 1, 1);
        this.boundingBox = new Rectangle(x, y, this.width, this.height)
    }
    Enemy.prototype.update = function () {
         if (this.movement.down) {
            this.position.y += this.velocity + this.velocityModifier;
        }

        this.animation.position.set(this.position.x, this.position.y);
        this.boundingBox.x = this.position.x;
        this.boundingBox.y = this.position.y;
        this.animation.update();
    };
    Enemy.prototype.render = function (ctx) {
        this.animation.draw(ctx);
    };

    return Enemy;
}());