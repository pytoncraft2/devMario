ig.module (

    'game.entities.joueur',
    'plugins.scale'
)

.requires(

    'impact.entity'
)
.defines(function(){
    var ismove = 0;
    var speed = 100;

    EntityJoueur = ig.Entity.extend({
        size: {x: 18, y: 39},
        direction: 1,
        messagebox: "",
        type: ig.Entity.TYPE.A,
         nettimer: 10,
         name: "player",
        gamename: playername,
                messageboxtimer: 200,

        checkAgainst: ig.Entity.TYPE.NONE,
        collides: ig.Entity.COLLIDES.PASSIVE,

        animSheet: new ig.AnimationSheet( 'media/joueur.png', 18, 38 ),

        init: function( x, y, settings ) {
                this.parent( x, y, settings );

                // Add the animations
                this.addAnim( 'up', 2, [6] );
                this.addAnim( 'down', 2, [6] );
                this.addAnim( 'left', 2, [0,1.23] );
                this.addAnim( 'right',2, [0,1.23] );
                this.addAnim( 'idleup',2, [0,1.23] );
                this.addAnim( 'idledown',2, [0,1.23] );
                this.addAnim( 'idleleft',2, [0,1.23] );
                this.addAnim( 'idleright',2, [0,1.23] );

                  socket.emit('initializeplayer', this.gamename);

        },

                update: function() {


                    var accel = this.standing ? this.accelGround : this.accelAir;
                    if(ig.input.state('left')){
                        this.accel.x = -accel;
                        this.flip = false;
                    } else if(ig.input.state('right')){
                        this.accel.x = accel;
                        this.flip = true;
                    } else
                        this.accel.x = 0;
        
                    // Jumping logic: CASE 1
                    if(this.standing && ig.input.state('saut')) {
                        if(this.vel.y == 0) {
                            this.vel.y = -this.jump;
                            this.falling = false;
        
                        }
                    }
        
                    // Jumping logic: CASE 2
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
                       }
                       else {
                               this.scale.y = 4.5;
                       }
                       
                       }
                       
                       if (this.pos.y > 400 && ig.input.state('up')) {
                       
                       if (this.scale.y >= 1.4) {
                                       this.scale.x = this.scale.x - 0.05;
                                       this.scale.y = this.scale.y - 0.05;
                                       this.setScale();
                                       this.size.y = this.size.y - 4;
                       }
                       else {
                               this.scale.y = 1.4;
                               this.scale.x = 1.4;
                       }
                       }
                       
                       
                                   this.currentAnim.flip.x = this.flip;
                       
                                   this.parent();
                                   if(this.vel.y < 0 && !this.standing)
                                       this.currentAnim = this.anims.jump;
                                   else if(this.pos.y > 400 && ig.input.state('up'))
                                       this.currentAnim = this.anims.dos;
                                   else if(this.vel.y > 0 && !this.standing)
                                       this.currentAnim = this.anims.fall;
                                   else if(this.vel.x != 0)
                                       this.currentAnim = this.anims.run;
                                   else
                                       this.currentAnim = this.anims.idle;
                        
                                



                // move left or right
                //
                if( ig.input.state('left') && ismove != 1 && ismove != 2 && ismove != 4) {
                        this.vel.x = -speed;
                       ismove = 3;
                       this.direction = 3;
                        }
                else if( ig.input.state('right')  && ismove != 1 && ismove != 3 && ismove != 4) {
                        this.vel.x = +speed;
                      ismove = 2;
                       this.direction = 2;
                        }
                else if( ig.input.state('up')  && ismove != 3 && ismove != 2 && ismove != 4) {
                        this.vel.y = -speed;
                        ismove = 1;
                         this.direction = 1;
                        }
                else if( ig.input.state('down')  && ismove != 1 && ismove != 2 && ismove != 3) {
                        this.vel.y = +speed;
                       ismove = 4;
                        this.direction = 4;
                        }
                else {
                        this.vel.x = 0;
                        this.vel.y = 0;
                        ismove = 0;
                }



        /////////////////////////////////////////////////


                ///////////////////////animate/////////////
                if( this.vel.y < 0 ) {
                        this.currentAnim = this.anims.up;
                        currentanimation = 1;
                }
                else if( this.vel.y > 0 ) {
                         this.currentAnim = this.anims.down;
                         currentanimation = 2;
                }
                else if( this.vel.x > 0 ) {
                          this.currentAnim = this.anims.right;
                          currentanimation = 4;
                }
                else if( this.vel.x < 0 ) {
                           this.currentAnim = this.anims.left;
                           currentanimation = 3;
                }
                else {

           if( this.direction == 4 )
           {
            this.currentAnim = this.anims.idledown;
            currentanimation = 6;
           }
           if( this.direction == 3 )
           {
            this.currentAnim = this.anims.idleleft;
            currentanimation = 7;
           }
           if( this.direction == 2 )
           {
            this.currentAnim = this.anims.idleright;
            currentanimation = 8;
           }
           if( this.direction == 1 )
           {
            this.currentAnim = this.anims.idleup;
            currentanimation = 5;
           }
        }

        ////////////////////////////////

        if(this.nettimer < 1)
                {

                    this.nettimer = 5;
                socket.emit('recievedata',this.pos.x,this.pos.y,currentanimation,this.gamename);
                }
                this.nettimer = this.nettimer - 1;


        this.parent();
                }
    });

 ///////////////////////////////Enemy Other Players////////////////////////////////
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


})
