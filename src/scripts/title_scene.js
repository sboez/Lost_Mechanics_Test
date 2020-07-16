import { Button } from './button';

export default class TitleScene extends Phaser.Scene {
	constructor() {
		super({ key: 'TitleScene' });
	}

	preload() {
		this.load.image('logo', 'assets/Game/logo.png');
		this.load.image('trophy', 'assets/Game/trophee.png');
		this.load.spritesheet('buttons', "assets/Game/buttons_spritesheet.png", { frameWidth: 115, frameHeight: 42 });
		this.load.audio('soundMenu', [ "assets/Sounds/Menu_Navigate.mp3" ]);
	}

	create(config) {
		/* Check if it's desktop or mobile device. With mobile device the game is fullscreen */
		if (this.sys.game.device.os.desktop) this.resizeApp();

		this.clickSound = this.sound.add('soundMenu');

		this.add.image(this.cameras.main.centerX, 180, 'logo');
		const trophy = this.add.image(this.cameras.main.centerX, this.cameras.main.centerY, 'trophy').setScale(.4);

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

	resizeApp () {
		const game_ratio = 328 / 640;

		/* Make div full height of browser and keep the ratio of game resolution */
		const div = document.getElementById('phaser-app');
		div.style.width = (window.innerHeight * game_ratio) + 'px';
		div.style.height = window.innerHeight + 'px';

		/* Check if device DPI messes up the width-height-ratio */
		const canvas = document.getElementsByTagName('canvas')[0];

		const dpi_w = parseInt(div.style.width) / canvas.width;
		const dpi_h = parseInt(div.style.height) / canvas.height;		

		const height = window.innerHeight * (dpi_w / dpi_h);
		const width = height * game_ratio;

		canvas.style.width = width + 'px';
		canvas.style.height	= height + 'px';
	}
}