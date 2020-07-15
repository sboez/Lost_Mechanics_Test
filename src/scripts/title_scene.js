import { Button } from './button';

export default class TitleScene extends Phaser.Scene {
	constructor() {
		super({ key: 'TitleScene' });
	}

	preload() {
		this.load.image('logo', 'assets/Game/logo.png');
		this.load.spritesheet('buttons', "assets/Game/spritesheet.png", { frameWidth: 115, frameHeight: 42 });
		this.load.audio('soundMenu', [ "assets/Sounds/Menu_Navigate.mp3" ]);
	}

	create() {
		this.clickSound = this.sound.add('soundMenu');

		this.add.image(this.cameras.main.centerX, 200, 'logo');

		new Button(this, this.cameras.main.centerX, this.cameras.main.centerY + 120, 'buttons', 0, 1, 2)
		.on('pointerup', this.onPressed, this);

		this.add.text(this.cameras.main.centerX - 24, this.cameras.main.centerY + 110, "START", 
			{ 
				fontFamily: 'myFont', 
				fontSize: 24 
			});
	}

	onPressed() {
		this.clickSound.play();
		this.scene.start('LoginScene');
	}
}