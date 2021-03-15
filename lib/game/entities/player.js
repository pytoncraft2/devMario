ig.module(

    'game.entities.player'
  )

  .requires(

    'impact.entity',
    'plugins.scale'
  )
  .defines(function() {
    // var ismove = 0;
    var speed = 100;

    EntityPlayer = ig.Entity.extend({


      type: ig.Entity.TYPE.A,
      checkAgainst: ig.Entity.TYPE.NONE,
      collides: ig.Entity.COLLIDES.ACTIVE,

      accelGround: 3500,
      accelAir: 2500,



      size: {
        x: 18,
        y: 39
      },
      direction: 1,
      messagebox: "",
      nettimer: 10,
      name: "player",
      gamename: playername,
      messageboxtimer: 200,

      animSheet: new ig.AnimationSheet('media/joueur.png', 18, 38),

      init: function(x, y, settings) {
        this.parent(x, y, settings);

        this.addAnim('up', .21, [6]);
        this.addAnim('down', .21, [6]);
        this.addAnim('left', 0.2, [0, 1.23]);
        this.addAnim('right', 0.2, [0, 1.23]);
        this.addAnim('dos', 0.10, [3.38,2.38,4.38]);

    // the variable is defined
        // socket.emit('initializeplayer', this.gamename);

      },

      update: function() {


        var accel = this.standing ? this.accelGround : this.accelAir;
        if (ig.input.state('left')) {
          this.accel.x = -accel;
          this.flip = false;
        } else if (ig.input.state('right')) {
          this.accel.x = accel;
          this.flip = true;
        } else
          this.accel.x = 0;

        // Jumping logic: CASE 1
            if(this.standing && ig.input.state('saut')){
                if(this.vel.y == 0){
                    this.vel.y = -this.jump;
                    this.falling = false;
                }
            }

            else if(!this.standing && !ig.input.state('saut') && !this.falling){
    this.vel.y = Math.floor(this.vel.y/3);
    this.falling = true;
}

        if (this.pos.y > 400 && ig.input.state('down')) {
          if (this.scale.y < 4.5) {
            this.scale.x = this.scale.x + 0.2;
            this.scale.y = this.scale.y + 0.2;
            this.setScale();
            this.size.y = this.size.y + 4;
            this.size.x = this.size.x + 4;
          } else {
            this.scale.y = 4.5;
          }

        }

        if (this.pos.y > 400 && ig.input.state('up')) {

          if (this.scale.y >= 1.4) {
            this.scale.x = this.scale.x - 0.05;
            this.scale.y = this.scale.y - 0.05;
            this.setScale();
            this.size.y = this.size.y - 4;
          } else {
            this.scale.y = 1.4;
            this.scale.x = 1.4;
          }
        }


        this.currentAnim.flip.x = this.flip;

        this.parent();

   if(this.pos.y > 400 && ig.input.state('up')) {
           this.currentAnim = this.anims.dos;
         }
         else {

        this.currentAnim = this.anims.right;
         }


var dir = ['avance','stop','gauche','droite'];

        if (ig.input.pressed('left')) {
          console.log(dir[0]);
          console.log('direction: '+dir[2]);
          // this.vel.x = -speed;
          // ismove = 3;
          this.direction = 3;
        }
        else if (ig.input.released('left')) {
          console.log(dir[1]);
          // this.vel.x = -speed;
          // ismove = 3;
          this.direction = 3;
        }

        else if (ig.input.pressed('right')) {
          console.log('direction: '+dir[3]);
          console.log(dir[0]);
          // socket.emit('')
          this.vel.x = -speed;
          // ismove = 3;
          this.direction = 3;
        }
        else if (ig.input.released('right')) {
          console.log(dir[1]);
          // this.vel.x = -speed;
          // ismove = 3;
          this.direction = 3;
        }
        else {
           this.vel.x = 0;
           ismove = 3;

        }


         if (ig.input.state('right')) {
          // this.vel.x = +speed;
          // ismove = 2;
          this.direction = 2;
        } else {
          // this.vel.x = 0;
          // this.vel.y = 0;
          // ismove = 0;
        }



        /////////////////////////////////////////////////


        ///////////////////////animate/////////////
        if (this.nettimer < 7) {

          this.nettimer = 5;
          // socket.emit('recievedata', this.pos.x, this.pos.y, currentanimation, this.gamename);
        }
        this.nettimer = this.nettimer - 1;


        this.parent();
      }
    });

    ///////////////////////////////Enemy Other Players////////////////////////////////
    /*
    EntityOtherplayer = ig.Entity.extend({
      size: {
        x: 18,
        y: 39
      },

      type: ig.Entity.TYPE.B,

      collides: ig.Entity.COLLIDES.ACTIVE,


      speed: 100,
      name: "otherplayer",
      gamename: "",
      animation: 1,

      animSheet: new ig.AnimationSheet('media/joueur.png', 18, 39),

      init: function(x, y, settings) {
        this.parent(x, y, settings);

        this.parent(x, y, settings);
        this.addAnim('up', .21, [6]);
        this.addAnim('down', .21, [6]);
        this.addAnim('left', 0.2, [0, 1.23]);
        this.addAnim('right', 0.2, [0, 1.23]);

        this.health = 100;
      },

      netmoveplayer: function() {

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

             case 9:
                 this.currentAnim = this.anims.dos;
                 break;



           }

        // this.currentAnim = this.anims.right;
      }



    });
           */


  })
