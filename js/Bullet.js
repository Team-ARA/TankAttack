var Bullet = (function () {
    function Bullet(x, y,playerLooks) {
        this.position = new Vector2(x, y);
        this.watchPos = { left: false, right: false, up: false, down: false };
        this.movement = { left: false, right: false, up: false, down: false };
        this.velocity = 6;
        this.looking = playerLooks;
        this.width = 15;
        this.height = 15;
        this.animation = new Animation(15, 15, 0, 0, 1, 'images/bul.png', 4, 0, 0);
        this.boundingBox = new Rectangle(x, y, this.width, this.height)
    }
    Bullet.prototype.update = function () {
        if (this.looking == "right") {
            this.position.set(this.position.x + this.velocity, this.position.y);
        }
        else if (this.looking == "left") {
            this.position.set(this.position.x - this.velocity, this.position.y);
        }
        else if (this.looking == "up") {
            this.position.set(this.position.x, this.position.y - this.velocity);
        }
        else if (this.looking == "down") {
            this.position.set(this.position.x, this.position.y + this.velocity);
        }

        this.animation.position.set(this.position.x, this.position.y);
        this.boundingBox.x = this.position.x;
        this.boundingBox.y = this.position.y;
        this.animation.update();
    };
    Bullet.prototype.render = function (ctx) {
        this.animation.draw(ctx);
    };

    return Bullet;
}());