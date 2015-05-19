(function () {
    "use strict";

    require(['game'], function (game) {
        game.state.start('level', true, false, 'tutorial');
    });
}());
