import { Player } from './../player';
import { Spike } from './../spike';

enum LevelStates { readingCommands, running, levelLookup };

export class LevelState extends Phaser.State {
    levelId: string;
    state: LevelStates;
    player: Player;
    map: Phaser.Tilemap;
    layer: Phaser.TilemapLayer;
    spikes: Phaser.Group;
    pods: Phaser.Group;
    goal: Phaser.Sprite;
    commands: Phaser.Group;

    constructor() {
        super();
    }

    init () {
        this.levelId = arguments[0];
        this.scale.scaleMode = Phaser.ScaleManager.SHOW_ALL;
        this.scale.pageAlignHorizontally = true;
        this.scale.pageAlignVertically = true;
    }

    preload () {
        this.load.spritesheet('tileset', '/assets/images/tileset.png', 20, 20);
        this.load.spritesheet('objects', '/assets/images/objects.png', 32, 48);
        this.load.tilemap('tutorial', '/assets/levels/tutorial.json', null, Phaser.Tilemap.TILED_JSON);
    }

    create () {
        var i, l, object;

        this.world.setBounds(0, 0, 1600, 600);
        this.stage.backgroundColor = '#7EC0EE';
        this.physics.startSystem(Phaser.Physics.ARCADE);

        this.map = this.game.add.tilemap(this.levelId);
        this.map.addTilesetImage('tileset', 'tileset');
        this.layer = this.map.createLayer('scenario');
        this.layer.resizeWorld();
        this.map.setCollisionBetween(1, 2, true, this.layer.index, true);

        this.spikes = this.game.add.group();
        this.spikes.enableBody = true;
        this.pods = this.game.add.group();
        this.pods.enableBody = true;

        for (i = 0, l = this.map.objects['objects'].length; i < l; i += 1) {
            object = this.map.objects['objects'][i];
            if (object.name === 'player') {
                this.player = new Player(this.game, object.x, object.y);
            } else if (object.name === 'goal'){
                this.goal = this.game.add.sprite(object.x, object.y - 48, 'objects', 9);
                this.game.physics.arcade.enable(this.goal);
            } else if (object.type === 'spike'){
                new Spike(this.game, object.x, object.y, object.properties.orientation, this.spikes);
            } else if (object.type === 'pod'){
                this.pods.create(object.x, object.y - 48, 'objects', 12);
            }
        }

        this.commands = this.game.add.group();
        this.input.keyboard.addKey(Phaser.Keyboard.W).onDown.add(this.addCommand("jump", 5), this);
        this.input.keyboard.addKey(Phaser.Keyboard.S).onDown.add(this.addCommand("crouch", 6), this);

        var cameraLookup = this.game.add.tween(this.camera);
        cameraLookup.to({x: 1600}, 3000, Phaser.Easing.Default, true, 1000, 0, true);
        cameraLookup.onComplete.add(function () {
            this.camera.follow(this.player);
            this.state = LevelStates.readingCommands;
        }, this);
        cameraLookup.start();

        this.state = LevelStates.levelLookup;
    }

    update () {
        this.physics.arcade.collide(this.player, this.layer);

        if (this.state === LevelStates.readingCommands) {
            if (this.player.commands.length === this.pods.length) {
                this.state = LevelStates.running;
                this.player.run();
            }
        } else if (this.state === LevelStates.running) {
            this.game.physics.arcade.overlap(this.player, this.spikes, this.restartLevel, null, this);
            this.game.physics.arcade.overlap(this.player, this.pods, this.player.performCommand, null, this.player);
            this.game.physics.arcade.overlap(this.player, this.goal, this.restartLevel, null, this);
        }
    }

    addCommand (command, commandSpriteFrame) {
        return function () {
            if (this.state === LevelStates.readingCommands) {
                var commandImage = this.commands.create(this.commands.length * 40, 550, 'objects', commandSpriteFrame);
                commandImage.fixedToCamera = true;
                this.player.commands.push(command);
            }
        };
    }

    restartLevel () {
        this.game.state.start('level', true, false, 'tutorial');
    }
}
