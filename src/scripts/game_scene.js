export default class GameScene extends Phaser.Scene {
	constructor() {
		super({ key: 'GameScene' });

		this.WINNER = false;
		this.LOOSER = false;
	}

	preload() {
		this.load.image('background', 'assets/Courts/training_court.png');
		this.load.image('ball', 'assets/Game/ball.png');
		this.load.image('paddle', 'assets/Game/baton.png');
		this.load.image('brick', 'assets/Game/brique-bleu.png');
	}

	init(data) {
		this.yourName = data.name;
	}

	create() {
		this.START = false;
		this.TAP = false;
		this.score = 0;
		this.lives = 3;

		this.add.image(0, 0, 'background').setOrigin(0).setScale(0.3);
		this.setPlayer();
		this.setBall();
		this.setBricks();

		this.physics.world.checkCollision.down = false;
		this.physics.add.collider(this.ball, this.bricks, this.hitBrick, null, this);
		this.physics.add.collider(this.ball, this.player, this.hitPlayer, null, this);

		this.setControls();
		this.setText();
	}

	setBricks() {
		this.bricks = this.physics.add.group({
			immovable: true
		});

		for (let i = 0; i < 7; ++i) {
			for (let j = 0; j < 6; ++j) {
				const brick = this.physics.add.sprite(60 + i * 30, 150 + j * 20, 'brick').setOrigin(0).setScale(0.3);
				this.bricks.add(brick);
			}
		}
	}

	setPlayer() {
		this.player = this.physics.add.sprite(400, 550, 'paddle');
		this.player.displayWidth = 70;
		this.player.displayHeight = 10;

		this.player.setCollideWorldBounds(true);
		this.player.setImmovable(true);
	}

	setBall() {
		this.ball = this.physics.add.sprite(400, 520, 'ball');
		this.ball.displayWidth = 12;
		this.ball.displayHeight = 12;

		this.ball.setCollideWorldBounds(true);
		this.ball.setBounce(1, 1);
		this.ball.setData('onPlayer', true);
	}

	setControls() {
		this.cursors = this.input.keyboard.createCursorKeys();

		this.input.on('pointermove', pointer => {
			this.player.x = Phaser.Math.Clamp(
			pointer.x,
			35,
			this.physics.world.bounds.width - (this.player.displayWidth / 2));

			if (this.ball.getData('onPlayer')) this.ball.x = this.player.x;
		}, this);

		this.input.on('pointerup', pointer => {
			if (this.ball.getData('onPlayer')) this.TAP = true;
		}, this);
	}

	setText() {
		this.scoreText = this.add.text(60, 16, 'Score: 0', 
			{ 
				align: 'center', 
				fontFamily: 'myFont', 
				fontSize: '24px', 
				fill: '#000' 
			});

		this.livesText = this.add.text(180, 16, 'Lives: 3', 
			{ 
				align: 'center', 
				fontFamily: 'myFont', 
				fontSize: '24px', 
				fill: '#000' 
			});

		this.startText = this.add.text(
			this.physics.world.bounds.width / 2,
			this.physics.world.bounds.height / 2,
			'Press SPACE or TAP to Start',
			{
				align: 'center', 
				fontFamily: 'myFont',
				fontSize: '24px',
				fill: '#000'
			})
		.setOrigin(0.5);

	}

	/* Hide brick after collision, a brick give 20 score pts */
	hitBrick(ball, brick) {
		brick.disableBody(true, true);

		this.score += 20;
		this.scoreText.setText('Score: ' + this.score);
	}

	/* Set reverse ball direction compared to player */
	hitPlayer(ball, player) {
		let diff = 0;

		if (this.ball.x < this.player.x)
		{
			diff = this.player.x - this.ball.x;
			this.ball.setVelocityX(-5 * diff);
		}
		else if (this.ball.x > this.player.x)
		{
			diff = this.ball.x -this.player.x;
			this.ball.setVelocityX(5 * diff);
		}
		else this.ball.setVelocityX(2 + Math.random() * 8);
	}

	isGameOver(world) {
		return this.ball.body.y > world.bounds.height;
	}

	isWon() {
		return this.bricks.countActive() === 0;
	}

	resetBall() {
		this.ball.setVelocity(0);
		this.ball.setPosition(this.player.x, 520);
		this.ball.setData('onPlayer', true);
	}

	reset() {
		this.resetBall();
		this.START = false;
		this.TAP = false;
		this.lives -= 1;
		this.livesText.setText('Lives: ' + this.lives);
		if (this.lives < 0) this.gameOver();
	}

	gameOver() {
		this.LOOSER = true;
		this.scene.start('EndScene', { win: this.WINNER, loose: this.LOOSER, name: this.yourName });
	}

	update() {
		this.player.body.setVelocityX(0);

		if (this.cursors.left.isDown) this.player.body.setVelocityX(-500);
		else if (this.cursors.right.isDown) this.player.body.setVelocityX(500);

		if (!this.START) {
			this.ball.setX(this.player.x);

			if (this.cursors.space.isDown || this.TAP) {
				this.START = true;
				this.ball.setData('onPlayer', false);
				this.ball.setVelocity(-75, -300);
				this.startText.setVisible(false);
			}
		}

		if (this.isGameOver(this.physics.world)) this.reset();
		else if (this.isWon()) {
			this.WINNER = true;
			this.scene.start('EndScene', { win: this.WINNER, loose: this.LOOSER, name: this.yourName });
		};
	}
}