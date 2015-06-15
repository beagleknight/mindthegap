(function () {
    "use strict";

    define(['player', 'spike'], function (Player, Spike) {
        var READING_COMMANDS = 0;
        var RUNNING = 1;
        var LEVEL_LOOKUP = 2;
        var levelState = {
            init: function (levelId) {
                this.levelId = levelId;
                this.scale.scaleMode = Phaser.ScaleManager.SHOW_ALL;
                this.scale.pageAlignHorizontally = true;
                this.scale.pageAlignVertically = true;
            },
            preload: function () {
                this.game.load.spritesheet('tileset', '/assets/images/tileset.png', 20, 20);
                this.game.load.spritesheet('objects', '/assets/images/objects.png', 32, 48);
                this.game.load.tilemap('tutorial', '/assets/levels/tutorial.json', null, Phaser.Tilemap.TILED_JSON);
            },
            create: function () {
                var i, l, object;

                this.game.world.setBounds(0, 0, 1600, 600);
                this.game.stage.backgroundColor = '#7EC0EE';
                this.game.physics.startSystem(Phaser.Physics.ARCADE);

                this.map = this.game.add.tilemap(this.levelId);
                this.map.addTilesetImage('tileset', 'tileset');
                this.layer = this.map.createLayer('scenario');
                this.layer.resizeWorld();
                this.map.setCollisionBetween(1, 2, true, this.layer.index, true);

                this.spikes = this.game.add.group();
                this.spikes.enableBody = true;
                this.pods = this.game.add.group();
                this.pods.enableBody = true;

                for (i = 0, l = this.map.objects.objects.length; i < l; i += 1) {
                    object = this.map.objects.objects[i];
                    if (object.name === 'player') {
                        this.player = new Player(object, this.game);
                    } else if (object.name === 'goal'){
                        this.goal = this.game.add.sprite(object.x, object.y - 48, 'objects', 9);
                        this.game.physics.arcade.enable(this.goal);
                    } else if (object.type === 'spike'){
                        new Spike(object.x, object.y, this.spikes, object.properties.orientation);
                    } else if (object.type === 'pod'){
                        this.pods.create(object.x, object.y - 48, 'objects', 12);
                    }
                }

                this.commands = this.game.add.group();
                this.game.input.keyboard.addKey(Phaser.Keyboard.W).onDown.add(this.addCommand("jump", 5), this);
                this.game.input.keyboard.addKey(Phaser.Keyboard.S).onDown.add(this.addCommand("crouch", 6), this);

                var cameraLookup = this.game.add.tween(this.camera);
                cameraLookup.to({x: 1600}, 3000, Phaser.Easing.Default, true, 1000, 0, true);
                cameraLookup.onComplete.add(function () {
                    this.camera.follow(this.player.sprite);
                    this.state = READING_COMMANDS;
                }, this);
                cameraLookup.start();

                this.state = LEVEL_LOOKUP;
            },
            update: function () {
                this.game.physics.arcade.collide(this.player.sprite, this.layer);

                if (this.state === READING_COMMANDS) {
                    if (this.player.commands.length === this.pods.length) {
                        this.state = RUNNING;
                        this.player.run();
                    }
                } else if (this.state === RUNNING) {
                    this.game.physics.arcade.overlap(this.player.sprite, this.spikes, this.restartLevel, null, this);
                    this.game.physics.arcade.overlap(this.player.sprite, this.pods, this.player.performCommand, null, this.player);
                    this.game.physics.arcade.overlap(this.player.sprite, this.goal, this.restartLevel, null, this);
                }
            },
            addCommand: function (command, commandSpriteFrame) {
                return function () {
                    if (this.state === READING_COMMANDS) {
                        var commandImage = this.commands.create(this.commands.length * 40, 550, 'objects', commandSpriteFrame);
                        commandImage.fixedToCamera = true;
                        this.player.commands.push(command);
                    }
                };
            },
            restartLevel: function () {
                this.game.state.start('level', true, false, 'tutorial');
            }
        };

        return levelState;
    });
}());
