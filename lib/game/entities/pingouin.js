ig.module(
    'game.entities.pingouin'
)
.requires(
    'impact.entity'
)
.defines(function(){
    EntityPingouin = ig.Entity.extend({

        collides: ig.Entity.COLLIDES.NONE,
        type: ig.Entity.TYPE.B,
        checkAgainst: ig.Entity.TYPE.A,

        animSheet: new ig.AnimationSheet('media/enemies/pingouin.png', 36, 36),
        size: {x: 36, y: 36},
        speed: 100, 

        init: function(x, y, settings){
            this.parent(x, y, settings);
            this.addAnim('idle', 0.20, [0,1]);
        },
        update: function(){
            var xdir = this.flip ? -1 : 1;
            this.vel.x = this.speed * xdir;
            this.parent();
        },

        handleMovementTrace: function(res){
            this.parent(res);
            if(res.collision.x){
                this.flip = !this.flip;
                this.anims.idle.flip.x = this.flip;
            }
        },

/*        check: function(other){
            other.receiveDamage(-10, this);
            this.kill();
        }
        */

    });
});
