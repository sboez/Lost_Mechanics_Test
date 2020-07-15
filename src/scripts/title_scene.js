export default class TitleScene extends Phaser.Scene {
	constructor() {
		super({ key: 'TitleScene' });
	}

	preload() {
		this.load.image('logo', 'assets/Game/logo.png');
		this.load.image('btn', 'assets/Game/yes.png');
		this.load.image('hover_btn', 'assets/Game/yes_hover.png');
	}

	create() {
		this.add.image(this.cameras.main.centerX, 200, 'logo');

		this.setButton();

		this.start = this.add.text(this.cameras.main.centerX - 25, this.cameras.main.centerY + 42, "START");
	}

	setButton() {
		const startBtn = this.add.image(this.cameras.main.centerX, this.cameras.main.centerY + 50, 'btn')
		.setInteractive({ useHandCursor: true })
		.on('pointerover', e => this.start.setStyle({ fill: '#000' }))
		.on('pointerout', e => this.start.setStyle({ fill: '#fff' }))
		.on('pointerdown', e => this.start.setStyle({ fill: '#0ff' }))
		.on('pointerup', e => this.scene.start('LoginScene'));
	}
}