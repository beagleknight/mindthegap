(function () {
    "use strict";

    define(function () {
        var Spike;

        Spike = function (x, y, group, orientation) {
            this.sprite = group.create(x, y, 'dude', orientation);

            if (orientation === Spike.UP) {
                this.sprite.body.setSize(32, 24, 0, 24);
            } else {
                this.sprite.body.setSize(32, 24);
            }
        };

        Spike.UP = 11;
        Spike.DOWN = 10;

        return Spike;
    });
}());
