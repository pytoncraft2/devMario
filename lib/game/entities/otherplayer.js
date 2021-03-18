ig.module(
    'game.entities.otherplayer'
)
.requires(
    'impact.entity'
)
.defines(function(){
    EntityOtherplayer = ig.Entity.extend({

      EntityOtherplayer = ig.Entity.extend({
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

          /*
                          this.addAnim('idle', 1, [0]);
                          this.addAnim('run', 0.2, [0,1.23]);
                          this.addAnim('jump', 1, [0]);
                          this.addAnim('fall', 0.2, [0,1.23]);
                          this.addAnim('dos', 0.10, [3.38,2.38,4.38]);
          		*/


          this.health = 100;

          // Add the animations

          // Add the animations
          /*
          this.addAnim( 'up', .21, [9,10,11] );
          this.addAnim( 'down', .21, [0,1,2] );
          this.addAnim( 'left', .21, [3,4,5] );
          this.addAnim( 'right', .21, [0,1.23] );
           this.addAnim( 'idleup', 0.1, [10] );
           this.addAnim( 'idledown', 0.1, [1] );
           this.addAnim( 'idleleft', 0.1, [4] );
           this.addAnim( 'idleright', 0.1, [7] );
           */
        },

        netmoveplayer: function() {

          this.pos.x = positionx;
          this.pos.y = positiony;


        },

        update: function() {
          // console.log(this.scale.x);
          /*
             switch(this.animation)
             {
              case 1:
                   this.currentAnim = this.anims.dos;
                   break;
              case 2:
                   this.currentAnim = this.anims.down;
                   break;
              case 3:
                   this.currentAnim = this.anims.run;
                   break;
               case 4:
                   this.currentAnim = this.anims.run;
                   break;
               case 5:
                   this.currentAnim = this.anims.right;
                   break;
               case 6:
                   this.currentAnim = this.anims.right;
                   break;
               case 7:
                   this.currentAnim = this.anims.left;
                   break;
               case 8:
                   this.currentAnim = this.anims.right;
                   break;



             }
  	   */

          this.currentAnim = this.anims.left;
        }



      });





    });
alert("Hey");
});
