(function () {
    "use strict";

    //var platforms, player, cursors, stars, star;
    //var score = 0;
    //var scoreText;
    var game,
        player,
        goal,
        platforms,
        ground;

    game = new Phaser.Game(800, 600, Phaser.AUTO, 'game');

    game.state.add('level', {
        preload: function (game) {
            game.load.image('ground', 'assets/images/platform.png');
            game.load.spritesheet('dude', 'assets/images/dude.png', 32, 48);
        },
        create: function (game) {
            game.world.setBounds(0, 0, 1600, 600);
            game.stage.backgroundColor = '#ffffff';
            game.physics.startSystem(Phaser.Physics.ARCADE);
            platforms = game.add.group();
            platforms.enableBody = true;
            ground = platforms.create(0, game.world.height - 64, 'ground');
            ground.scale.setTo(4, 2);
            ground.body.immovable = true;

            //  Now let's create two ledges
            //var ledge = platforms.create(400, 400, 'ground');

            //ledge.body.immovable = true;

            //ledge = platforms.create(-150, 250, 'ground');

            //ledge.body.immovable = true;

            // The player and its settings
            player = game.add.sprite(32, 488, 'dude');

            //  We need to enable physics on the player
            game.physics.arcade.enable(player);

            //  Player physics properties. Give the little guy a slight bounce.
            player.body.bounce.y = 0.2;
            player.body.gravity.y = 300;
            player.body.collideWorldBounds = true;

            //  Our two animations, walking left and right.
            player.animations.add('left', [0, 1, 2, 3], 10, true);
            player.animations.add('right', [5, 6, 7, 8], 10, true);

            //stars = game.add.group();

            goal = game.add.sprite(600, 488, 'dude', 9)
            game.physics.arcade.enable(goal);

            //  Here we'll create 12 of them evenly spaced apart
            // for (var i = 0; i < 12; i++) {
            //     //  Create a star inside of the 'stars' group
            //     star = stars.create(i * 70, 0, 'star');
            //
            //     //  Let gravity do its thing
            //     star.body.gravity.y = 300;
            //
            //     //  This just gives each star a slightly random bounce value
            //     star.body.bounce.y = 0.2;
            // }

            // scoreText = game.add.text(16, 16, 'score: 0', { fontSize: '32px', fill: '#000' });

            // cursors = game.input.keyboard.createCursorKeys();
            game.camera.follow(player);
        },
        update: function (game) {
            player.body.velocity.x = 150;
            player.animations.play('right');
            game.physics.arcade.collide(player, platforms);
            //game.physics.arcade.collide(player, goal);
            game.physics.arcade.overlap(player, goal, function (player, goal) {
                game.state.start('level', true, false);
            }, null, this);

            // function collectStar (player, star) {
            //     // Removes the star from the screen
            //     star.kill();
            //     //  Add and update the score
            //     score += 10;
            //     scoreText.text = 'Score: ' + score;
            // }
            //
            // //  Collide the player and the stars with the platforms



            // if (cursors.left.isDown) {
            //     //  Move to the left
            //     player.body.velocity.x = -150;
            //
            //     player.animations.play('left');
            // } else if (cursors.right.isDown) {
            //     //  Move to the right
            //     player.body.velocity.x = 150;
            //
            //     player.animations.play('right');
            // } else {
            //     //  Stand still
            //     player.animations.stop();
            //
            //     player.frame = 4;
            // }
            //
            // //  Allow the player to jump if they are touching the ground.
            // if (cursors.up.isDown && player.body.touching.down)
            // {
            //     player.body.velocity.y = -350;
            // }
        }
    });

    game.state.start('level');
}());
