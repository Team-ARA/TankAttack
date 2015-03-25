/**
 * Created by urukhai on 3/25/15.
 */
var Terrain = (function () {
    function Terrain(x, y) {
        this.position = new Vector2(x, y);
<<<<<<< HEAD
        this.animation = new Animation(600, 600, 0, 0, 1, 'images/texture1.jpg', 22, 0, 0);
    }
    Terrain.prototype.update = function () {
      
=======
        this.animation = new Animation(600, 600, 0, 0, 1, 'images/terrain2.jpg', 22, 0, 0);
    }
    Terrain.prototype.update = function () {

>>>>>>> 39519f77a58f342551e841fa2b00c69c28277bd5
        this.animation.position.set(this.position.x, this.position.y);
        this.animation.update();
    };
    Terrain.prototype.render = function (ctx) {
        this.animation.draw(ctx);
    };
    return Terrain;
<<<<<<< HEAD
}());


=======
}());
>>>>>>> 39519f77a58f342551e841fa2b00c69c28277bd5
