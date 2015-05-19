(function () {
    "use strict";

    define(['player', 'spike'], function (Player, Spike) {
        var levelState = {
            init: function (levelId) {
                this.levelId = levelId;
            },
            preload: function (game) {
                game.load.spritesheet('tileset', '/assets/images/tileset.png', 20, 20);
                game.load.spritesheet('objects', '/assets/images/objects.png', 32, 48);
                game.load.tilemap('tutorial', '/assets/levels/tutorial.json', null, Phaser.Tilemap.TILED_JSON);
            },
            create: function (game) {
                var i, l, object;

                game.world.setBounds(0, 0, 1600, 600);
                game.stage.backgroundColor = '#7EC0EE';
                game.physics.startSystem(Phaser.Physics.ARCADE);

                this.map = game.add.tilemap(this.levelId);
                this.map.addTilesetImage('tileset', 'tileset');
                this.layer = this.map.createLayer('scenario');
                this.layer.resizeWorld();
                this.map.setCollisionBetween(1, 2, true, this.layer.index, true);

                this.spikes = game.add.group();
                this.spikes.enableBody = true;
                this.pods = game.add.group();
                this.pods.enableBody = true;

                for (i = 0, l = this.map.objects.objects.length; i < l; i += 1) {
                    object = this.map.objects.objects[i];
                    if (object.name === 'player') {
                        this.player = new Player(object, game);
                    } else if (object.name === 'goal'){
                        this.goal = game.add.sprite(object.x, object.y - 48, 'objects', 9);
                        game.physics.arcade.enable(this.goal);
                    } else if (object.type === 'spike'){
                        new Spike(object.x, object.y, this.spikes, object.properties.orientation);
                    } else if (object.type === 'pod'){
                        this.pods.create(object.x, object.y - 48, 'objects', 12);
                    }
                }
            },
            update: function (game) {
                this.player.update(game);

                game.physics.arcade.collide(this.player.sprite, this.layer, function () {
                    if (this.player.state === Player.JUMPING) {
                        this.player.run();
                    }
                }, null, this);

                game.physics.arcade.overlap(this.player.sprite, this.spikes, function () {
                    game.state.start('level', true, false, 'tutorial');
                }, null, this);

                game.physics.arcade.overlap(this.player.sprite, this.pods, function () {
                    this.player.performCommand();
                }, null, this);

                game.physics.arcade.overlap(this.player.sprite, this.goal, function () {
                    game.state.start('level', true, false, 'tutorial');
                }, null, this);
            }
        };

        return levelState;
    });
}());
