ig.module(
    'game.main'
)
.requires(
    'impact.game',
    'impact.debug.debug',
    //'game.entities.joueur',
    //'game.entities.other',
    'game.levels.test2'
)

.defines(function(){
    MyGame = ig.Game.extend({
        font: new ig.Font('media/04b03.font.png'),
        gravity: 300,
        //titleImage: new ig.Image( 'media/bg/star.png' ),
        init: function(){
            ig.input.bind(ig.KEY.Z, 'haut');
            ig.input.bind(ig.KEY.S, 'bas');
            ig.input.bind(ig.KEY.D, 'droite');
            ig.input.bind(ig.KEY.Q, 'gauche');
            ig.input.bind(ig.KEY.LEFT_ARROW, 'left');
            ig.input.bind(ig.KEY.RIGHT_ARROW, 'right');
	    ig.input.bind(ig.KEY.X, 'jump');
            ig.input.bind(ig.KEY.UP_ARROW, 'up' ); //ajout action fleche haut
            ig.input.bind(ig.KEY.DOWN_ARROW, 'down' ); //* fleche bas
            ig.input.bind(ig.KEY.SPACE, 'saut' ); //* fleche bas

            this.loadLevel(LevelTest2);
        },
	              update: function() {

              // Send commands to server.
              var commands = ['UP', 'DOWN', 'LEFT', 'RIGHT', 'ATTACK'];
              for(var i=0; i<commands.length; i++) {
                  var command = commands[i];
                  if(ig.input.pressed(command))
                      //ig.game.socket.emit('command', '+' + command);
                      socket.emit('command', '+' + command);
                  if(ig.input.released(command))
                      //ig.game.socket.emit('command', '-' + command);
                      socket.emit('command', '-' + command);
              }

              this.parent();

              // Send attack angle to server.

              // Update camera position.
          },


        draw: function(){
		this.parent();
                var player = ig.game.getEntitiesByType('EntityPlayer')[0];
//		if (player.pos.x > ig.system.width / 2){

		this.screen.x = player.pos.x - ig.system.width/2;
		this.screen.y = player.pos.y - ig.system.height/2;
 //           }


		if (player.pos.y > 468 && !ig.input.state('bas')) {
		player.falling = false;
		}
			if (player.pos.y > 468 && ig.input.state('haut')) {
		player.falling = false;
			}
		else if (player.pos.y > 468) {
			player.falling = false;
			this.gravity = 0;
		}
		else if(player.pos.y < 468) {
			this.gravity = 300;
			player.falling = true;
		}
          var x = ig.system.width/2,
          y = ig.system.height/2;


                //this.font.draw( player.messagebox, 350, 10);

		//this.font.draw( player.messagebox, x, y, ig.Font.ALIGN.CENTER );
	//this.titleImage.draw(0,0);
        }
        
    });

    ig.main('#canvas', MyGame, 90, 920, 290, 2);
});
