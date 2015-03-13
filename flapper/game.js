/*global Phaser*/
/*jslint sloppy:true, browser: true, devel: true, eqeq: true, vars: true, white: true*/
var game;

// pipe function
function makePipePair(group, offsetX, newOffsetX) {
    var top = group.create(0, 0, 'pipe_top');
    var bottom = group.create(0, 0, 'pipe_bottom');
    top.anchor.set(0, 1);
    var spacing = 125;
    function addPhysics(pipe) {
        game.physics.enable(pipe);
        pipe.body.immovable = true;
        pipe.body.allowGravity = false;
        pipe.body.velocity.x = -200;
    }
    function positionPipes(top, bottom) {
        var center = game.rnd.integerInRange(50, game.world.height - 50);
        var left = game.world.width;
        top.x = left;    
        bottom.x = left;
        top.y = center - spacing;
        bottom.y = center + spacing;
    }
    addPhysics(top);
    addPhysics(bottom);
    positionPipes(top, bottom);
    top.x += offsetX;
    bottom.x += offsetX;
    top.checkWorldBounds = true;
    top.events.onOutOfBounds.add(function () {
        if (top.x < 0) {
            positionPipes(top, bottom);
            top.x += newOffsetX;
            bottom.x += newOffsetX;
        }
    });
}
                       

var mainState = {
    // Here we add all the functions we need for our state
    // For this project we will just have 3 functions
    
    // PRELOAD FUNCTION
    preload: function () {
        // This function will be executed at the beginning
        // That's where we load the game's assets
        game.load.spritesheet('bird', 'images/bird_sheet.png', 68, 48);
        // loads the floor
        game.load.image('floor', 'images/floor.png');
        // loads top pipe
        game.load.image('pipe_top', 'images/pipe_top.png');
        // loads bottom pipe
        game.load.image('pipe_bottom', 'images/pipe_bottom.png');
        game.load.image('game_over', 'images/game_over.png');
    },
    
    // CREATE FUNCTION
    create: function () {
        // This function is called after the preload function
        // Here we set up the game, display sprites, etc.
        
        // Create a game sprite from the logo image positioned
        // at the center of the game world
        this.sprite = game.add.sprite(game.world.centerX, game.world.centerY, 'bird');
        // The position of the sprite should be based on the
        // center of the image (default is top-left)
        this.sprite.anchor.setTo(0.5, 0.5);
        // This is the animation of the spritesheet
        this.sprite.animations.add('flap', [0,1,2,1], 10, true);
        this.sprite.animations.play('flap');
        // Change background color to a gray color
        game.stage.backgroundColor = '#999999';
        // These are the Physics of it all
        game.physics.enable(this.sprite);
        game.physics.arcade.gravity.y = 200;
        // Stop bird from falling off screen for now
        this.sprite.body.collideWorldBounds = true;
        // keep spacebar from scrolling the page
        game.input.keyboard.addKeyCapture([Phaser.Keyboard.SPACEBAR]);
        // creates the floor
        this.floor = game.add.tileSprite(0, game.world.height - 40, game.world.width, game.world.height, 'floor');
        this.floor.tileScale.set(0.5);
        // floor physics
        this.obstacles = game.add.group();
        this.obstacles.add(this.floor);
        game.physics.enable(this.floor);
        this.floor.body.immovable = true;
        this.floor.body.allowGravity = false;
        //pipes
        var pipeSpacing = 550  ;
        var numPipes = 10;
        for(var i = 0; i < numPipes; i++) {
            makePipePair(this.obstacles, i * pipeSpacing, pipeSpacing * numPipes - game.world.width);
        }      
        
    },
    
    // UPDATE FUNCTION
    update: function () {
        // This function is called 60 times per second
        // It contains the game's logic
        
        // Controls the birds velocity
        if (game.input.keyboard.justPressed(Phaser.Keyboard.SPACEBAR)) {
            this.sprite.body.velocity.y = -100;
        }
        // gives floor illusion of movement
        this.floor.tilePosition.x -= 100;
        // check for collisions
        if (game.physics.arcade.collide(this.sprite, this.obstacles)) {
            console.log('Game over man, game over!');
            this.game_over = game.add.sprite(game.world.centerX, game.world.centerY, 'game_over');
            this.game_over .anchor.setTo(0.5, 0.5);
            game.paused = true;
        }
            
                                            
    }
};

// Initialize Phaser
game = new Phaser.Game(640, 480, Phaser.AUTO, 'gameDiv');

// And finally we tell Phaser to add and start our 'main' state
game.state.add('main', mainState);
game.state.start('main');
