(function () {
    "use strict";

    define(['states/level'], function (levelState) {
        var game = new Phaser.Game(800, 600, Phaser.AUTO, 'game');

        game.state.add('level', levelState);

        return game;
    });
}());
