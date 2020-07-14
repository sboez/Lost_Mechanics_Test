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
		this.add.image(this.physics.world.bounds.width / 2, 200, 'logo');

		this.setButton();

		this.start = this.add.text(this.physics.world.bounds.width / 2 - 25, 390, "START");
	}

	setButton() {
		const startBtn = this.add.image(this.physics.world.bounds.width / 2, 400, 'btn')
		.setInteractive({ useHandCursor: true })
		.on('pointerover', e => this.start.setStyle({ fill: '#000' }))
		.on('pointerout', e => this.start.setStyle({ fill: '#fff' }))
		.on('pointerdown', e => this.start.setStyle({ fill: '#0ff' }))
		.on('pointerup', e => this.scene.start('LoginScene'));
	}
}