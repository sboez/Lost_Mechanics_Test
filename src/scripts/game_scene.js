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
		this.player.displayWidth = 90;
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

		this.player.setImmovable(true);
		this.physics.add.collider(this.ball, this.player, this.hitPlayer, null, this);
	}

	/* Hide brick after collision 
		Give ball velocity depending to the rd number value */
	hitBrick(ball, brick) {
		brick.disableBody(true, true);

		if (this.ball.body.velocity.x === 0) {
			let rdNum = Math.random();
			if (rdNum >= 0.5) this.ball.body.setVelocityX(150);
			else this.ball.body.setVelocityX(-150);
		}
	}

	/* Increase the velocity of the ball after bounce
		Set reverse ball direction compared to player */
	hitPlayer(ball, player) {
		this.ball.setVelocityY(this.ball.body.velocity.y - 15);

		const newVelocity = Math.abs(this.ball.body.velocity.x) + 15;

		if (this.ball.x < this.player.x) this.ball.setVelocityX(-newVelocity);
		else this.ball.setVelocityX(newVelocity);
	}

	update() {
		this.player.body.setVelocityX(0);

		if (this.cursors.left.isDown) this.player.body.setVelocityX(-350);
		else if (this.cursors.right.isDown) this.player.body.setVelocityX(350);

		if (!this.START) {
			this.ball.setX(this.player.x);
			
			if (this.cursors.space.isDown) {
				this.START = true;
				this.ball.setVelocityY(-200);
			}
		}
	}
}