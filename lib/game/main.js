ig.module(
    'game.main'
)
.requires(
    'impact.game',
    'impact.debug.debug',
    'game.levels.basic'
)

.defines(function(){
    MyGame = ig.Game.extend({
        font: new ig.Font('media/04b03.font.png'),
        gravity: 300,
        //titleImage: new ig.Image( 'media/bg/star.png' ),
        init: function(){
            ig.input.bind(ig.KEY.LEFT_ARROW, 'left');
            ig.input.bind(ig.KEY.RIGHT_ARROW, 'right');
            ig.input.bind(ig.KEY.X, 'jump');
            ig.input.bind(ig.KEY.UP_ARROW, 'up' ); //ajout action fleche haut
            ig.input.bind(ig.KEY.DOWN_ARROW, 'down' ); //* fleche bas
            ig.input.bind(ig.KEY.SPACE, 'centrer' ); //* fleche bas

            this.loadLevel(LevelBasic);
        },

        draw: function(){
                var player = ig.game.getEntitiesByType('EntityPlayer')[0];
		if (player.pos.x > ig.system.width / 2){

		this.screen.x = player.pos.x - ig.system.width/2;
		this.screen.y = player.pos.y - ig.system.height/2;
            }
	//this.titleImage.draw(0,0);
        this.parent();
        }
        
    });

    ig.main('#canvas', MyGame, 90, 920, 290, 2);
});
