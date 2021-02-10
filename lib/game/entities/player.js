ig.module(
    'game.entities.player'
)
.requires(
    'impact.entity'
)
.defines(function(){
    EntityPlayer = ig.Entity.extend({

        type: ig.Entity.TYPE.A,
        checkAgainst: ig.Entity.TYPE.NONE,
        collides: ig.Entity.COLLIDES.ACTIVE,
        
        animSheet: new ig.AnimationSheet('media/joueur.png', 20, 39),
        size: {x: 20, y: 39},
        flip: true,
        accelGround: 401,
        accelAir: 410,
        jump: 360,
        friction: {x: 500, y: 0},
        maxVel: {x: 100, y: 260}, //acceleration


        init: function(x, y, settings){
            this.parent(x, y, settings);
            this.addAnim('idle', 1, [0]);
            this.addAnim('run', 0.10, [0,0,0,1,1,1,1]);
            this.addAnim('jump', 1, [0]);
            this.addAnim('fall', 0.4, [0]);
        },

        update: function(){
            // Add left/right movement logic
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
            if(this.standing && ig.input.state('up')) {
                if(this.vel.y == 0) {
                    this.vel.y = -this.jump;
                    this.falling = false;
                }
            }

            // Jumping logic: CASE 2
            else if(!this.standing && !ig.input.state('up') && !this.falling){
                this.vel.y = Math.floor(this.vel.y/3);
                this.falling = true;
            }

/*ajout saut bas
            if(this.standing && ig.input.state('down')) {
             this.size.y -= 9;
            }
*/

/*ajout saut 
            if(this.standing && ig.input.state('up')) {
             this.size.y++;
            }
*/

            this.currentAnim.flip.x = this.flip;

            this.parent();
            
            if(this.vel.y < 0 && !this.standing)
                this.currentAnim = this.anims.jump;
            else if(this.vel.y > 0 && !this.standing)
                this.currentAnim = this.anims.fall;
            else if(this.vel.x != 0)
                this.currentAnim = this.anims.run;
            else
                this.currentAnim = this.anims.idle;

        },

    });
});
