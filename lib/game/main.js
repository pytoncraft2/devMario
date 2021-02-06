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
        titleImage: new ig.Image( 'media/bg/star.png' ),
        init: function(){
            ig.input.bind(ig.KEY.LEFT_ARROW, 'left');
            ig.input.bind(ig.KEY.RIGHT_ARROW, 'right');
            ig.input.bind(ig.KEY.X, 'jump');
            ig.input.bind(ig.KEY.UP_ARROW, 'up' ); //ajout action fleche haut
            ig.input.bind(ig.KEY.DOWN_ARROW, 'down' ); //* fleche bas

            this.loadLevel(LevelBasic);
        },

        draw: function(){
                var player = ig.game.getEntitiesByType('EntityPlayer')[0];
        this.titleImage.draw(0,0);
        this.parent();
        }
        
    });

    ig.main('#canvas', MyGame, 60, 320, 240, 2);
});