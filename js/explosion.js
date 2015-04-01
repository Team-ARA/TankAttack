/**
 * Created by urukhai on 3/27/15.
 */
var Explosion = (function () {
    function Explosion(x, y) {
        this.position = new Vector2(x, y);
        this.animation = new Animation(100, 100, 0, 0, 74, 'images/explosion.png', 40, 9, 8);
        this.timer = 0.0;
    }


    Explosion.prototype.update = function () {
        this.animation.position.set(this.position.x - 30, this.position.y - 30);
     
        this.animation.update();
      

    };
    Explosion.prototype.render = function (ctx) {
        this.animation.draw(ctx);
       
    };

    return Explosion;
}());