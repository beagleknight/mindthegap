export class Spike extends Phaser.Sprite {
    constructor(game, x, y, orientation, group : Phaser.Group) {
        super(game, x, y - 48, 'objects', orientation === 'up' ? 11 : 10);

        group.add(this);

        if (orientation === 'up') {
            this.body.setSize(32, 24, 0, 24);
        } else {
            this.body.setSize(32, 24);
        }
    }
}
