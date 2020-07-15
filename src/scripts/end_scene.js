import { Button } from './button';

export default class EndScene extends Phaser.Scene {
	constructor() {
		super({ key: 'EndScene' });
	}

	init(data) {
		this.WINNER = data.win;
		this.LOOSER = data.loose;
		this.yourName = data.name;
	}

	create() {
		this.WINNER ? this.add.text(this.cameras.main.centerX - 20, this.cameras.main.centerY - 50, "BRAVO \n" + this.yourName, { align: 'center' })
					: this.add.text(this.cameras.main.centerX - 20, this.cameras.main.centerY - 50, "DAMAGE \n" + this.yourName, { align: 'center' });

		new Button(this, this.cameras.main.centerX, this.cameras.main.centerY + 120, 'buttons', 0, 1, 2)
		.on('pointerup', this.onPressed, this);

		this.add.text(this.cameras.main.centerX - 20, this.cameras.main.centerY + 112, "RETRY");
	}

	onPressed() {
		this.scene.start('GameScene', { name: this.yourName });
	}
}
