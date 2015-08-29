/// <reference path="../../bower_components/phaser/typescript/phaser.d.ts"/>

import { Game } from './game';

var game = new Game();
game.state.start('level', true, false, 'tutorial');
