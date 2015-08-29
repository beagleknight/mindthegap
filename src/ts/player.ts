enum PlayerStates { running, jumping, crouching };

export class Player extends Phaser.Sprite {
    NEXT_COMMAND_TIME : number = 2000;
    commands: Array<string>;
    state: PlayerStates;

    constructor(game, x, y) {
        super(game, x, y - 48, 'objects');

        this.game.physics.arcade.enable(this);

        this.body.bounce.y = 0.2;
        this.body.gravity.y = 300;
        this.body.collideWorldBounds = true;

        this.animations.add('right', [0, 1, 2, 3], 10, true);

        this.commands = [];

        this.game.add.existing(this);
    }

    jump() {
        this.state = PlayerStates.jumping;
        this.body.velocity.y = -225;
    }

    crouch() {
        this.state = PlayerStates.crouching;
        this.body.setSize(32, 24, 0, 24);
        this.frame = 4;
        this.animations.stop();
    }

    run() {
        this.body.setSize(32, 48, 0, 0);
        this.body.velocity.x = 150;
        this.animations.play('right');
        this.state = PlayerStates.running;
    }

    performCommand() {
        if (this.state === PlayerStates.running) {
            var command = this.commands.shift();
            this[command]();
            this.game.time.events.add(this.NEXT_COMMAND_TIME, function () {
                this.run();
            }, this);
        }
    }
}
