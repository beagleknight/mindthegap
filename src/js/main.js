(function () {
    "use strict";

    //var platforms, player, cursors, stars, star;
    //var score = 0;
    //var scoreText;
    var game,
        player,
        goal,
        platforms,
        spikes;

    game = new Phaser.Game(800, 600, Phaser.AUTO, 'game');

    game.state.add('level', {
        preload: function (game) {
            game.load.image('ground', 'assets/images/platform.png');
            game.load.spritesheet('dude', 'assets/images/dude.png', 32, 48);
        },
        create: function (game) {
            var platform, ledge, spike;

            game.world.setBounds(0, 0, 1600, 600);
            game.stage.backgroundColor = '#ffffff';
            game.physics.startSystem(Phaser.Physics.ARCADE);
            platforms = game.add.group();
            platforms.enableBody = true;

            platform = platforms.create(0, game.world.height - 64, 'ground');
            platform.scale.setTo(0.6, 2);
            platform.body.immovable = true;

            platform = platforms.create(400, game.world.height - 64, 'ground');
            platform.scale.setTo(4, 2);
            platform.body.immovable = true;

            platform = platforms.create(525, 455, 'ground');
            platform.scale.setTo(0.5, 1);
            platform.body.immovable = true;

            player = game.add.sprite(32, 488, 'dude');
            game.camera.follow(player);
            game.physics.arcade.enable(player);
            player.body.bounce.y = 0.2;
            player.body.gravity.y = 300;
            player.body.collideWorldBounds = true;
            player.animations.add('right', [0, 1, 2, 3], 10, true);

            goal = game.add.sprite(1000, 488, 'dude', 9)
            game.physics.arcade.enable(goal);

            // scoreText = game.add.text(16, 16, 'score: 0', { fontSize: '32px', fill: '#000' });
            spikes = game.add.group();
            spikes.enableBody = true;

            spike = spikes.create(238, 550, 'dude', 11)
            spike.body.setSize(32, 24, 0, 24);
            spike = spikes.create(268, 550, 'dude', 11)
            spike.body.setSize(32, 24, 0, 24);
            spike = spikes.create(300, 550, 'dude', 11)
            spike.body.setSize(32, 24, 0, 24);
            spike = spikes.create(334, 550, 'dude', 11)
            spike.body.setSize(32, 24, 0, 24);
            spike = spikes.create(368, 550, 'dude', 11)
            spike.body.setSize(32, 24, 0, 24);

            spike = spikes.create(526, 485, 'dude', 10)
            spike.body.setSize(32, 24);
            spike = spikes.create(554, 485, 'dude', 10)
            spike.body.setSize(32, 24);
            spike = spikes.create(586, 485, 'dude', 10)
            spike.body.setSize(32, 24);
            spike = spikes.create(610, 485, 'dude', 10)
            spike.body.setSize(32, 24);
            spike = spikes.create(640, 485, 'dude', 10)
            spike.body.setSize(32, 24);
            spike = spikes.create(672, 485, 'dude', 10)
            spike.body.setSize(32, 24);
        },
        update: function (game) {
            player.body.velocity.x = 150;

            player.animations.play('right');

            game.physics.arcade.collide(player, platforms);

            game.physics.arcade.overlap(player, goal, function (player, goal) {
                game.state.start('level', true, false);
            }, null, this);

            game.physics.arcade.overlap(player, spikes, function (player, spike) {
                game.state.start('level', true, false);
            }, null, this);

            if (game.input.keyboard.isDown(Phaser.Keyboard.W) && player.body.touching.down) {
                player.body.velocity.y = -200;
            }

            if (game.input.keyboard.isDown(Phaser.Keyboard.S)) {
                player.body.setSize(32, 24, 0 , 24)
                player.frame = 4;
            } else {
                player.body.setSize(32, 48, 0, 0)
            }
        }
    });

    game.state.start('level');
}());
