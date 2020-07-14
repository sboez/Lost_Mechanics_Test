import LoginScene from './login_scene';

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
		this.WINNER ? this.add.text(this.cameras.main.width / 2 - 20, this.cameras.main.height / 2 - 50, "BRAVO \n" + this.yourName, { align: 'center' })
					: this.add.text(this.cameras.main.width / 2 - 20, this.cameras.main.height / 2 - 50, "DOMMAGE \n" + this.yourName, { align: 'center' });

		const button = this.add.image(this.cameras.main.width / 2, this.cameras.main.height / 2 + 50, 'button', this, 2, 1, 0)
			.setScale(0.8)
			.setInteractive({ useHandCursor: true })
		    .on('pointerover', e => this.btnRetry.setStyle({ fill: '#000' }))
		    .on('pointerout', e => this.btnRetry.setStyle({ fill: '#fff' }))
		    .on('pointerdown', e => this.btnRetry.setStyle({ fill: '#0ff' }))
			.on('pointerup', e => this.scene.start('GameScene', { name: this.yourName }));

			this.btnRetry = this.add.text(this.cameras.main.width / 2 - 10, this.cameras.main.height / 2 + 42, "RETRY");
	}
}
