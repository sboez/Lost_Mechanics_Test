import 'phaser'

class Game extends Phaser.Game {
	constructor() {
		super(500, 500, Phaser.AUTO, 'content', null);
		console.log("hello");
	}
}

new Game();
