EntityOtherplayer = ig.Entity.extend({
         size: {x: 18, y: 39},

         type: ig.Entity.TYPE.B,

        speed: 100,
        name: "otherplayer",
        gamename: "",
        animation: 1,
        //checkAgainst: ig.Entity.TYPE.B,
        collides: ig.Entity.COLLIDES.PASSIVE,

         animSheet: new ig.AnimationSheet( 'media/joueur.png', 18, 39 ),



        init: function( x, y, settings ) {
                this.parent( x, y, settings );

                this.parent(x, y, settings);

                this.addAnim('idle', 1, [0]);
                this.addAnim('run', 0.2, [0,1.23]);
                this.addAnim('jump', 1, [0]);
                this.addAnim('fall', 0.2, [0,1.23]);
                this.addAnim('dos', 0.10, [3.38,2.38,4.38]);
  

                 this.health = 100;

        },

        netmoveplayer: function()
        {

      this.pos.x = positionx;
      this.pos.y = positiony;


        },

         update: function() {
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
                 this.currentAnim = this.anims.run;
                 break;
             case 6:
                 this.currentAnim = this.anims.run;
                 break;
             case 7:
                 this.currentAnim = this.anims.run;
                 break;
             case 8:
                 this.currentAnim = this.anims.run;
                 break;



           }
         }

});
