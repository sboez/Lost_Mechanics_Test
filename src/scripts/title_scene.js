import { Button } from './button';

export default class TitleScene extends Phaser.Scene {
	constructor() {
		super({ key: 'TitleScene' });
	}

	preload() {
		this.load.image('logo', 'assets/Game/logo.png');
		this.load.image('trophy', 'assets/Game/trophee.png');
		this.load.spritesheet('buttons', "assets/Game/spritesheet.png", { frameWidth: 115, frameHeight: 42 });
		this.load.audio('soundMenu', [ "assets/Sounds/Menu_Navigate.mp3" ]);
	}

	create() {
		this.clickSound = this.sound.add('soundMenu');

		this.add.image(this.cameras.main.centerX, 180, 'logo');
		this.add.image(this.cameras.main.centerX, this.cameras.main.centerY, 'trophy').setScale(.4);

		const button = new Button(this, 0, 0, 'buttons', 0, 1, 2).on('pointerup', this.onPressed, this);
		const label = this.add.text(0, 0, "START",
		{
			fontFamily: 'myFont', 
			fontSize: 24
		}).setOrigin(0.5);

		const container = this.add.container(this.cameras.main.centerX, this.cameras.main.centerY + 120, [button, label]);
	}

	onPressed() {
		this.clickSound.play();
		this.scene.start('LoginScene');
	}
}