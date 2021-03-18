ig.module(
    'game.entities.autre'
)
.requires(
    'impact.entity'
)

.defines(function(){

    EntityAutre = ig.Entity.extend({

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
        this.currentAnim = this.anims.left;
      }
    });
  })
