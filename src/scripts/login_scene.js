export default class LoginScene extends Phaser.Scene {
	constructor() {
		super({ key: 'LoginScene' });
	}

	preload () {
		this.load.image('button','assets/Game/yes.png');
	}

	create() {
		this.add.text(30, 200, "Please tap your name to play");

		let inputText = this.add.rexInputText(this.physics.world.bounds.width / 2, 250, 10, 10, {
			type: 'textarea',
			text: '',
			fontSize: '22px',
			border: 1,
			borderColor: '#fff',
			backgroundColor: '#888E8E'
		})
		.resize(200, 40)
		.selectText()
		.on('textchange', inputText => {
			this.yourName = inputText.text;
		});

		this.yourName = inputText.text;

		const button = this.add.image(this.physics.world.bounds.width / 2, 350, 'button', this, 2, 1, 0)
		.setScale(0.8)
		.setInteractive({ useHandCursor: true })
	    .on('pointerover', e => this.btnOk.setStyle({ fill: '#000' }))
	    .on('pointerout', e => this.btnOk.setStyle({ fill: '#fff' }))
	    .on('pointerdown', e => this.btnOk.setStyle({ fill: '#0ff' }))
		.on('pointerup', e => this.scene.start('GameScene'));

		this.btnOk = this.add.text(this.physics.world.bounds.width / 2 - 10, 340, "OK");
	}
}