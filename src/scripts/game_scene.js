export default class GameScene extends Phaser.Scene {
	constructor() {
		super({
            key: 'GameScene'
        });

		this.START = false;
	}

	preload() {
		this.load.image('ball', 'assets/Game/ball.png');
		this.load.image('paddle', 'assets/Game/baton.png');
		this.load.image('brick', 'assets/Game/brique-bleu.png');
	}

	create() {
		this.player = this.physics.add.sprite(
			400,
			730,
			'paddle',
		);

		this.player.displayWidth = 50;

		this.ball = this.physics.add.sprite(
			400,
			710,
			'ball'
		);

		this.bricks = this.physics.add.group();
		for (let i = 0; i < 7; ++i) {
			for (let j = 0; j < 6; ++j) {
				let brick = this.physics.add.sprite(100 + i * 100, 100 + j * 55, 'brick');
				this.bricks.add(brick);
			}
		}

		this.cursors = this.input.keyboard.createCursorKeys();
	}

	update() {
		this.player.body.setVelocityX(0);

		if (this.cursors.left.isDown) {
			this.player.body.setVelocityX(-350);
		} else if (this.cursors.right.isDown) {
			this.player.body.setVelocityX(350);
		}

		if (!this.START) {
			this.ball.setX(this.player.x);
			
			if (this.cursors.space.isDown) {
				this.START = true;
				this.ball.setVelocityY(-200);
			}
		}
	}
}