export default class GameScene extends Phaser.Scene {
	constructor() {
		super({
            key: 'GameScene'
        });

		this.START = false;
		this.TAP = false;
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

		this.player.setCollideWorldBounds(true);
		this.ball.setCollideWorldBounds(true);
		this.ball.setBounce(1, 1);
		this.ball.setData('onPaddle', true);

		this.physics.world.checkCollision.down = false;

		this.physics.add.collider(this.ball, this.bricks, this.hitBrick, null, this);

		this.player.setImmovable(true);
		this.physics.add.collider(this.ball, this.player, this.hitPlayer, null, this);

		this.setControls();
        this.setText();
	}

	setControls() {
		this.cursors = this.input.keyboard.createCursorKeys();

		this.input.on('pointermove', pointer => {
            this.player.x = Phaser.Math.Clamp(pointer.x, 52, 748);

            if (this.ball.getData('onPaddle')) this.ball.x = this.player.x;

        }, this);

        this.input.on('pointerup', pointer => {

            if (this.ball.getData('onPaddle')) this.TAP = true;

        }, this);
	}

	setText() {
		this.startText = this.add.text(
			this.physics.world.bounds.width / 2,
			this.physics.world.bounds.height / 2,
			'Press SPACE or TAP to Start',
			{
				fontFamily: 'Lucida Console, Courier, monospace',
				fontSize: '35px',
				fill: '#fff'
			}
		);
		this.startText.setOrigin(0.5);
	}

	/* Hide brick after collision */
	hitBrick(ball, brick) {
		brick.disableBody(true, true);
	}

	/* Set reverse ball direction compared to player */
	hitPlayer(ball, player) {
		let diff = 0;

        if (this.ball.x < this.player.x)
        {
            diff = this.player.x - this.ball.x;
            this.ball.setVelocityX(-10 * diff);
        }
        else if (this.ball.x > this.player.x)
        {
            diff = this.ball.x -this.player.x;
            this.ball.setVelocityX(10 * diff);
        }
        else this.ball.setVelocityX(2 + Math.random() * 8);
	}

	update() {
		this.player.body.setVelocityX(0);

		if (this.cursors.left.isDown) this.player.body.setVelocityX(-350);
		else if (this.cursors.right.isDown) this.player.body.setVelocityX(350);

		if (!this.START) {
			this.ball.setX(this.player.x);

			if (this.cursors.space.isDown || this.TAP) {
				this.START = true;
				this.ball.setData('onPaddle', false);
				this.ball.setVelocity(-75, -300);
				this.startText.setVisible(false);
			}
		}

	}
}