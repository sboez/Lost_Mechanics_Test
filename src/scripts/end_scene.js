import { Button } from './button';

export default class EndScene extends Phaser.Scene {
	constructor() {
		super({ key: 'EndScene' });
	}

	init(data) {
		this.WINNER = data.win;
		this.LOOSER = data.lose;
		this.yourName = data.name;
	}

	preload() {
		this.load.audio('winner', [ "assets/Sounds/Jingle_Achievement.mp3" ]);
		this.load.audio('looser', [ "assets/Sounds/Jingle_Lose.mp3" ]);
	}

	create() {
		this.winnerSound = this.sound.add('winner');
		this.looserSound = this.sound.add('looser');
		this.clickSound = this.sound.add('soundMenu');

		if (this.WINNER) {
			this.winnerSound.play();

			this.add.text(this.cameras.main.centerX - 20, this.cameras.main.centerY - 50, 
				"BRAVO \n" + this.yourName, 
				{ 
					align: 'center', 
					fontFamily: 'myFont', 
					fontSize: 24 
				});
		}

		else {
			this.looserSound.play();

			this.add.text(this.cameras.main.centerX - 20, this.cameras.main.centerY - 50, 
				"DAMAGE \n" + this.yourName, 
				{
					align: 'center', 
					fontFamily: 'myFont', 
					fontSize: 24 
				});
		}

		const button = new Button(this, 0, 0, 'buttons', 0, 1, 2).on('pointerup', this.onPressed, this);
		const label = this.add.text(0, 0, "RETRY",
		{
			fontFamily: 'myFont', 
			fontSize: 24
		}).setOrigin(0.5);

		const container = this.add.container(this.cameras.main.centerX, this.cameras.main.centerY + 120, [button, label]);
	}

	onPressed() {
		this.WINNER ? this.winnerSound.stop() : this.looserSound.stop();
		this.clickSound.play();
		this.scene.start('GameScene', { name: this.yourName });
	}
}
