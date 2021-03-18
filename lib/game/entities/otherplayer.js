
ig.module(
    'game.entities.otherplayer'
)
.requires(
    'impact.entity'
)

.defines(function(){
  /*
    EntityGoomba = ig.Entity.extend({
        type: ig.Entity.TYPE.B,
        checkAgainst: ig.Entity.TYPE.A,
        collides: ig.Entity.COLLIDES.PASSIVE,

        animSheet: new ig.AnimationSheet('media/enemies/goomba.png', 25, 26),
        size: {x: 22, y: 19},
        flip: true,
        speed: 50,

        init: function(x, y, settings){
            this.parent(x, y, settings);
            this.addAnim('crawl', 0.20, [0, 1]);
        },

        update: function(){
            var xdir = this.flip ? -1:1;
            this.vel.x = this.speed * xdir;
            this.parent();
        },

        handleMovementTrace: function(res){
            this.parent(res);
            if(res.collision.x){
                console.log(this.flip);
                this.flip = !this.flip;
                this.anims.crawl.flip.x = !this.flip;
            }
        },

        collideWith: function(other, axis){
            if(other instanceof EntityPlayer){
                if(axis === 'y'){
                    this.kill();
                }
                else
                    other.receiveDamage(1, this);
            }
        },
    });
    */

    EntityGoomba = ig.Entity.extend({

      size: {
        x: 18,
        y: 39
      },

      type: ig.Entity.TYPE.B,

      speed: 100,
      name: "otherplayer",
      gamename: "",
      animation: 1,
      //checkAgainst: ig.Entity.TYPE.B,
      collides: ig.Entity.COLLIDES.PASSIVE,

      animSheet: new ig.AnimationSheet('media/joueur.png', 18, 39),

      init: function(x, y, settings) {
        this.parent(x, y, settings);

        this.parent(x, y, settings);
        this.addAnim('up', .21, [6]);
        this.addAnim('down', .21, [6]);
        this.addAnim('left', 0.2, [0, 1.23]);
        this.addAnim('right', 0.2, [0, 1.23]);
        this.addAnim('idleup', 0.2, [0, 1.23]);
        this.addAnim('idledown', 0.2, [0, 1.23]);
        this.addAnim('idleleft', 0.2, [0, 1.23]);
        this.addAnim('idleright', 0.2, [0, 1.23]);


        this.health = 100;

      },

      netmoveplayer: function() {

        this.pos.x = positionx;
        this.pos.y = positiony;


      },

      update: function() {
        // console.log(this.scale.x);
        this.currentAnim = this.anims.left;
      }


    });
  })
