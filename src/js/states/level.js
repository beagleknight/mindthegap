(function () {
    "use strict";

    define(['player', 'spike'], function (Player, Spike) {
        var levelState = {
            preload: function (game) {
                game.load.image('ground', 'assets/images/platform.png');
                game.load.spritesheet('dude', 'assets/images/dude.png', 32, 48);
            },
            create: function (game) {
                var platform, ledge, spike;

                game.world.setBounds(0, 0, 1600, 600);
                game.stage.backgroundColor = '#7EC0EE';
                game.physics.startSystem(Phaser.Physics.ARCADE);

                this.platforms = game.add.group();
                this.platforms.enableBody = true;

                platform = this.platforms.create(0, game.world.height - 64, 'ground');
                platform.scale.setTo(0.6, 2);
                platform.body.immovable = true;

                platform = this.platforms.create(400, game.world.height - 64, 'ground');
                platform.scale.setTo(4, 2);
                platform.body.immovable = true;

                platform = this.platforms.create(525, 455, 'ground');
                platform.scale.setTo(0.5, 1);
                platform.body.immovable = true;

                this.player = new Player(game);

                this.goal = game.add.sprite(1000, 488, 'dude', 9);
                game.physics.arcade.enable(this.goal);

                this.spikes = game.add.group();
                this.spikes.enableBody = true;

                [[238, 550], [268, 550], [300, 550], [334, 550], [368, 550]].forEach(function (coords) {
                    new Spike(coords[0], coords[1], this.spikes, Spike.UP);
                }.bind(this));

                [[554, 485], [554, 485], [586, 485], [610, 485], [640, 485], [640, 485], [672, 485]].forEach(function (coords) {
                    new Spike(coords[0], coords[1], this.spikes, Spike.DOWN);
                }.bind(this));
            },
            update: function (game) {
                game.physics.arcade.collide(this.player.sprite, this.platforms);

                this.player.update(game);

                game.physics.arcade.overlap(this.player.sprite, this.goal, function () {
                    game.state.start('level', true, false);
                }, null, this);

                game.physics.arcade.overlap(this.player.sprite, this.spikes, function () {
                    game.state.start('level', true, false);
                }, null, this);
            }
        };

        return levelState;
    });
}());
