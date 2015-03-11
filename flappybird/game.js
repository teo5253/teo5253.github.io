/*global Phaser*/
/*jslint sloppy:true, browser: true, devel: true, eqeq: true, vars: true, white: true*/
var game;

var mainState = {
    // Here we add all the functions we need for our state
    // For this project we will just have 3 functions
    preload: function() {
        // This function will be executed at the beginning
        // That's where we load the game's assets
        game.load.spritesheet('bird', 'images/bird_sheet.png', 68, 48);
        game.load.image('floor', 'images/floor.png');

    },
    create: function() {
        // This function is called after the preload function
        // Here we set up the game, display sprites, etc.

        // Create a game sprite from the logo image positioned
        // at the center of the game world
        this.sprite = game.add.sprite(game.world.centerX, game.world.centerY, 'bird');
        // The position of the sprite should be based on the
        // center of the image (default is top-left)
        this.sprite.anchor.setTo(0.5, 0.5);
        this.sprite.animations.add('flap', [0, 1, 2, 1], 10, true);
        this.sprite.animations.play('flap');
        // Change background color to a gray color
        game.stage.backgroundColor = '#999999';
        game.physics.enable(this.sprite);
        game.physics.arcade.gravity.y = 100;
        // Stop the bird from falling off the screen, for now
        this.sprite.body.collideWorldBounds = true;
        // keep space from scrolling the page
        game.input.keyboard.addKeyCapture([Phaser.Keyboard.SPACEBAR]);
        this.floor.tileScale.set(0.5);
        this.floor.tilePosition.x -= 200;
        this.obstacles = game.add.group();
        this.obstacles.add(this.floor);
        game.physics.enable(this.floor);
        this.floor.body.immovable = true;
        this.floor.body.allowGravity = false;

    },
    update: function() {
        // This function is called 60 times per second
        // It contains the game's logic
        if (game.input.keyboard.justPressed(Phaser.Keyboard.SPACEBAR)) {
            this.sprite.body.velocity.y = -100;
        }
        this.floor = game.add.tileSprite(0, game.world.height - 40, game.world.width, game.world.height, 'floor');
        if (game.physics.arcade.collide(this.sprite, this.obstacles)) {
            console.log('Game over man, game over!');
            game.paused = true;
        }

    }
};

// Initialize Phaser
game = new Phaser.Game(640, 480, Phaser.AUTO, 'gameDiv');

// And finally we tell Phaser to add and start our 'main' state
game.state.add('main', mainState);
game.state.start('main');