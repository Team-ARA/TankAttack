/**
 * Created by urukhai on 3/27/15.
 */
var Enemy = (function () {
    function Enemy(x, y) {
        this.position = new Vector2(x, y);
        this.watchPos = { left: false, right: false, up: false, down: false };
        this.movement = { left: false, right: false, up: false, down: true };
        this.velocity = 1;
        this.velocityModifier = 0;
        this.width = 32;
        this.height = 32;
        this.animation = new Animation(32, 32, 0, 1, 4, 'images/Enemies.png', 4, 1, 1);
        this.animationDown = new Animation(this.width, this.width, 0, 1, 4, 'images/Enemies.png', 4, 1, 1);
        this.animationUp = new Animation(this.width, this.width, 0, 0, 1, 'images/Enemies.png', 4, 0, 0);
        this.animationRight = new Animation(this.width, this.width, 1, 0, 1, 'images/Enemies.png', 4, 1, 0);
        this.animationLeft = new Animation(this.width, this.width, 1, 1, 1, 'images/Enemies.png', 4, 0, 0);
        this.boundingBox = new Rectangle(x, y, this.width, this.height)
    }


    Enemy.prototype.update = function () {
        if (this.movement.up) {
            this.watchPos.right = false;
            this.watchPos.left = false;
            this.watchPos.down = false;
            this.watchPos.up = true;
            this.animation = this.animationUp;
            this.position.y -= this.velocity + this.velocityModifier;
         }
        if (this.movement.down) {
            this.animation = this.animationDown;
            this.watchPos.right = false;
            this.watchPos.left = false;
            this.watchPos.up = false;
            this.watchPos.down = true;
            this.position.y += this.velocity + this.velocityModifier;
        }
        if (this.movement.left) {
            this.animation = this.animationLeft;
            this.watchPos.right = false;
            this.watchPos.up = false;
            this.watchPos.down = false;
            this.watchPos.left = true;
            this.position.x -= this.velocity + this.velocityModifier;
        }
        if (this.movement.right) {
            this.animation = this.animationRight;
            this.watchPos.left = false;
            this.watchPos.up = false;
            this.watchPos.down = false;
            this.watchPos.right = true;
            this.position.x += this.velocity + this.velocityModifier;
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

