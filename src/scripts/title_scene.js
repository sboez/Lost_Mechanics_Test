import { Button } from './button';

export default class TitleScene extends Phaser.Scene {
	constructor() {
		super({ key: 'TitleScene' });
	}

	preload() {
		this.load.image('logo', 'assets/Game/logo.png');
		this.load.spritesheet("buttons", "assets/Game/spritesheet.png", { frameWidth: 115, frameHeight: 42 });
	}

	create() {
		this.add.image(this.cameras.main.centerX, 200, 'logo');

		new Button(this, this.cameras.main.centerX, this.cameras.main.centerY + 120, 'buttons', 0, 1, 2)
		.on('pointerup', this.onPressed, this);

		this.add.text(this.cameras.main.centerX - 20, this.cameras.main.centerY + 112, "START");
	}

	onPressed() {
		this.scene.start('LoginScene');
	}
}