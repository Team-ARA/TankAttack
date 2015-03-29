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
        this.animationHit = new Animation(100, 100, 0, 0 , 74, 'images/explosion.png', 20, 9, 8);
        this.boundingBox = new Rectangle(x, y, this.width, this.height)
    }


    Enemy.prototype.update = function () {
         if (this.movement.down) {
            this.position.y += this.velocity + this.velocityModifier;
        }

        this.animation.position.set(this.position.x, this.position.y);
        this.animationHit.position.set(this.position.x-30, this.position.y-30);
        this.boundingBox.x = this.position.x;
        this.boundingBox.y = this.position.y;
        this.animation.update();
        for (var i = 0; i < bullets.length; i++) {
            if(this.boundingBox.intersects(bullets[i].boundingBox)){
                this.animationHit.update();
            }
        }


    };
    Enemy.prototype.render = function (ctx) {
        this.animation.draw(ctx);
        for (var i = 0; i < bullets.length; i++) {
            if(this.boundingBox.intersects(bullets[i].boundingBox)){
                this.animationHit.draw(ctx);
            }
        }
    };

    return Enemy;
}());