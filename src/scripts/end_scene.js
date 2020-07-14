export default class EndScene extends Phaser.Scene {
	constructor() {
		super({ key: 'EndScene' });
	}

	create() {
		this.WINNER ? this.add.text(this.physics.world.bounds.width / 2 - 25, 300, "BRAVO " + + this.yourName)
					: this.add.text(this.physics.world.bounds.width / 2 - 25, 300, "DOMMAGE " + this.yourName);

		console.log("WINNER : ", this.WINNER);
		console.log("LOOSER : ", this.LOOSER);
	}
}