import { LevelState } from './states/level';

export class Game extends Phaser.Game {
    constructor() {
        super(800, 600, Phaser.AUTO, 'game');
        this.state.add('level', new LevelState());
    }
}
