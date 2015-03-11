// Define our main state
var main = {
 preload: function() {
  // Load the paddle image
  game.load.image('paddle', 'assets/paddle.png');
     // Load the brick sprite
game.load.image('brick', 'assets/brick.png');
     // Load the ball sprite
game.load.image('ball', 'assets/ball.png');
},

create: function() { 
  // Initialize the physics system of the game
  game.physics.startSystem(Phaser.Physics.ARCADE);

  // Create a variable to handle the arrow keys
  this.cursor = game.input.keyboard.createCursorKeys();

  // Create the paddle at the bottom of the screen
  this.paddle = game.add.sprite(200, 400, 'paddle');

  // Enable the physics system for the paddle
  game.physics.arcade.enable(this.paddle);

  // Make sure the paddle won't move when hit by the ball
  this.paddle.body.immovable = true;
    
    // Create a group that will contain all the bricks
this.bricks = game.add.group();
this.bricks.enableBody = true;

// Create the 16 bricks
for (var i = 0; i < 5; i++)
  for (var j = 0; j < 5; j++)
    game.add.sprite(55+i*60, 55+j*35, 'brick', 0, this.bricks);

// Make sure that the bricks won't move
this.bricks.setAll('body.immovable', true);
    // Create the ball with physics
this.ball = game.add.sprite(200, 300, 'ball');
game.physics.arcade.enable(this.ball);

// Add velocity to the ball
this.ball.body.velocity.x = 200; 
this.ball.body.velocity.y = 200;

// Make the ball bouncy 
this.ball.body.collideWorldBounds = true;
this.ball.body.bounce.x = 1; 
this.ball.body.bounce.y = 1;
},

update: function() {
  // If the right arrow is pressed, move the paddle to the right
  if (this.cursor.right.isDown) 
    this.paddle.body.velocity.x = 350;

  // If the left arrow if pressed, move left
  else if (this.cursor.left.isDown) 
    this.paddle.body.velocity.x = -350;

  // If no arrow is pressed, stop moving
  else 
    this.paddle.body.velocity.x = 0;
    // Make the paddle and the ball collide
game.physics.arcade.collide(this.paddle, this.ball);

// Call the 'hit' function when the ball hit a brick
game.physics.arcade.collide(this.ball, this.bricks, this.hit, null, this);
},
hit: function(ball, brick) {
  // When the ball hits a brick, kill the brick
  brick.kill();
}
};

// Initialize Phaser, and start our 'main' state 
var game = new Phaser.Game(400, 450, Phaser.AUTO, 'gameDiv');
game.state.add('main', main);
game.state.start('main');