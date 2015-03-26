var Player = (function () {
    function Player(x, y) {
        this.position = new Vector2(x, y);
        this.watchPos = { left: false, right: false, up: false, down: false };
        this.movement = { left: false, right: false, up: false, down: false };
        this.velocity = 3;
        this.width = 32;
        this.height = 32;
        this.animation = new Animation(32, 32, 0, 0, 1, 'images/Tanks.png', 4, 0, 0);
        this.animationDown = new Animation(32, 32, 0, 1, 4, 'images/Tanks.png', 4, 1, 1);
        this.animationUp = new Animation(32, 32, 0, 0, 1, 'images/Tanks.png', 4, 0, 0);
        this.animationRight = new Animation(32, 32, 1, 0, 1, 'images/Tanks.png', 4, 1, 0);
        this.animationLeft = new Animation(32, 32, 1, 1, 1, 'images/Tanks.png', 4, 0, 0);
        this.boundingBox = new Rectangle(x, y, this.width, this.height)
    }
    Player.prototype.update = function () {
        if (this.movement.right) {
            this.watchPos.right = true;
            this.watchPos.left = false;
            this.watchPos.up = false;
            this.watchPos.down = false;
            //this.position.x += this.velocity;
            this.position.set(this.position.x + this.velocity, this.position.y);
        } else if (this.movement.left) {
            this.watchPos.right = false;
            this.watchPos.left = true;
            this.watchPos.up = false;
            this.watchPos.down = false;
            //this.position.x -= this.velocity;
            this.position.set(this.position.x - this.velocity, this.position.y);
        }
        else if (this.movement.up) {
            this.watchPos.right = false;
            this.watchPos.left = false;
            this.watchPos.up = true;
            this.watchPos.down = false;
            //this.position.y -= this.velocity;
            this.position.set(this.position.x, this.position.y - this.velocity);
        } else if (this.movement.down) {
            this.watchPos.right = false;
            this.watchPos.left = false;
            this.watchPos.up = false;
            this.watchPos.down = true;
            //this.position.y += this.velocity;
            this.position.set(this.position.x, this.position.y + this.velocity);
        }
       
        this.animation.position.set(this.position.x, this.position.y);
        this.boundingBox.x = this.position.x;
        this.boundingBox.y = this.position.y;
        this.animation.update();
    };
    Player.prototype.render = function (ctx) {
        this.animation.draw(ctx);
    };
   
    return Player;
}());