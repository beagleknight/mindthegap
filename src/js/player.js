(function () {
    "use strict";

    define(function () {
        var Player;

        Player = function (data, game) {
            this.data = data;
            this.game = game;

            this.sprite = this.game.add.sprite(this.data.x, this.data.y - 48, 'objects');
            this.game.physics.arcade.enable(this.sprite);

            this.sprite.body.bounce.y = 0.2;
            this.sprite.body.gravity.y = 300;
            this.sprite.body.collideWorldBounds = true;

            this.sprite.animations.add('right', [0, 1, 2, 3], 10, true);

            this.sprite.body.velocity.x = 150;
            this.run();

            this.commands = ['jump', 'crouch', 'jump'];
            this.game.camera.follow(this.sprite);
        };

        Player.prototype.update = function (game) {
            switch(this.state) {
                case Player.JUMPING:
                    if (this.sprite.body.touching.down) {
                      this.state = Player.RUNNING;
                    }
                    break;
            }

        };

        Player.prototype.jump = function () {
            this.state = Player.JUMPING;
            this.sprite.body.velocity.y = -225;
        };

        Player.prototype.crouch = function () {
            this.state = Player.CROUCHING;
            this.sprite.body.setSize(32, 24, 0, 24);
            this.sprite.frame = 4;
            this.sprite.animations.stop();
            this.game.time.events.add(2000, function () {
                this.run();
            }, this);
        };

        Player.prototype.run = function () {
            this.sprite.body.setSize(32, 48, 0, 0);
            this.sprite.animations.play('right');
            this.state = Player.RUNNING;
        };

        Player.prototype.performCommand = function () {
            if (this.state === Player.RUNNING) {
                var command = this.commands.shift();
                this[command]();
            }
        };

        Player.RUNNING = 0;
        Player.JUMPING = 1;
        Player.CROUCHING = 2;

        return Player;
    });
}());
