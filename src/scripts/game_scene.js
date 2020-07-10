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
		this.player = this.physics.add.sprite(400, 730, 'paddle');

		this.player.displayWidth = 70;
		this.player.displayHeight = 10;

		this.ball = this.physics.add.sprite(400, 710, 'ball');
		this.ball.displayWidth = 20;
		this.ball.displayHeight = 20;

		this.bricks = this.physics.add.group({
			immovable: true
		});
		for (let i = 0; i < 7; ++i) {
			for (let j = 0; j < 6; ++j) {
				const brick = this.physics.add.sprite(100 + i * 100, 100 + j * 55, 'brick');
				this.bricks.add(brick);
			}
		}

		this.cursors = this.input.keyboard.createCursorKeys();

		this.player.setCollideWorldBounds(true);
		this.ball.setCollideWorldBounds(true);
		this.ball.setBounce(1, 1);

		this.physics.world.checkCollision.down = false;

		this.physics.add.collider(this.ball, this.bricks, this.hitBrick, null, this);
	}

	hitBrick(ball, brick) {
		brick.disableBody(true, true);

		if (this.ball.body.velocity.x === 0) {
			let randNum = Math.random();
			if (randNum >= 0.5) {
				this.ball.body.setVelocityX(150);
			} else {
				this.ball.body.setVelocityX(-150);
			}
		}
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