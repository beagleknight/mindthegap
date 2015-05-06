(function () {
    "use strict";

    define(function () {
        var Player;

        Player = function (game) {
            this.sprite = game.add.sprite(32, 488, 'dude');

            game.physics.arcade.enable(this.sprite);

            this.sprite.body.bounce.y = 0.2;
            this.sprite.body.gravity.y = 300;
            this.sprite.body.collideWorldBounds = true;

            this.sprite.animations.add('right', [0, 1, 2, 3], 10, true);

            game.camera.follow(this.sprite);
        };

        Player.prototype.update = function (game) {
            this.sprite.body.velocity.x = 150;
            this.sprite.animations.play('right');
            this.sprite.body.setSize(32, 48, 0, 0);

            if (game.input.keyboard.isDown(Phaser.Keyboard.W)) {
                this.jump();
            }

            if (game.input.keyboard.isDown(Phaser.Keyboard.S)) {
                this.crouch();
            }
        };

        Player.prototype.jump = function () {
            if (this.sprite.body.touching.down) {
                this.sprite.body.velocity.y = -225;
            }
        };

        Player.prototype.crouch = function () {
            this.sprite.body.setSize(32, 24, 0, 24);
            this.sprite.frame = 4;
        };

        return Player;
    });
}());
