var Player = (function () {
    function Player(x, y) {
        this.position = new Vector2(x, y);
        this.watchPos = { left: false, right: false, up: false, down: false };
        this.movement = { left: false, right: false, up: false, down: false };
        this.velocity = 3;
        this.width = 32;
        this.height = 32;
        this.lives = 5;
        this.animation = new Animation(this.width, this.height, 0, 0, 1, 'images/Tanks.png', 4, 0, 0);
        this.animationDown = new Animation(this.width, this.width, 0, 1, 4, 'images/Tanks.png', 4, 1, 1);
        this.animationUp = new Animation(this.width, this.width, 0, 0, 1, 'images/Tanks.png', 4, 0, 0);
        this.animationRight = new Animation(this.width, this.width, 1, 0, 1, 'images/Tanks.png', 4, 1, 0);
        this.animationLeft = new Animation(this.width, this.width, 1, 1, 1, 'images/Tanks.png', 4, 0, 0);
        this.animationHit = new Animation(100, 100, 0, 0 , 74, 'images/explosion.png', 20, 9, 8);
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
        } else if (this.movement.up) {
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
        this.animationHit.position.set(this.position.x-30, this.position.y-30);
        this.boundingBox.x = this.position.x;
        this.boundingBox.y = this.position.y;
        this.animation.update();
        for (var i = 0; i < enemyBullets.length; i++) {
            if(this.boundingBox.intersects(enemyBullets[i].boundingBox)){
                this.animationHit.update();
            }
        }
    };
    Player.prototype.render = function (ctx) {
        this.animation.draw(ctx);
        for (var i = 0; i < enemyBullets.length; i++) {
            if(this.boundingBox.intersects(enemyBullets[i].boundingBox)){
                this.animationHit.draw(ctx);
            }
        }
    };
   
    return Player;
}());