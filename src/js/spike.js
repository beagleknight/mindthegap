(function () {
    "use strict";

    define(function () {
        var Spike;

        Spike = function (x, y, group, orientation) {
            this.sprite = group.create(x, y - 48, 'objects', orientation === Spike.UP ? 11 : 10);

            if (orientation === Spike.UP) {
                this.sprite.body.setSize(32, 24, 0, 24);
            } else {
                this.sprite.body.setSize(32, 24);
            }
        };

        Spike.UP = 'up';
        Spike.DOWN = 'down';

        return Spike;
    });
}());
