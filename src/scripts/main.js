import phaser from 'phaser'

const config = {
	type : Phaser.AUTO,
	width : 800,
	heigth : 640,
	scale : {
		mode : Phaser.Scale.RESIZE,
		autoCenter : Phaser.Scale.CENTER_BOTH
	},
	scene : {
		preload,
		create,
		update,
	},
	physics : {
		default : 'arcade',
		arcade : {
			gravity : false
		},
	}
};

let player, ball, bricks, cursors;

const game = new Phaser.Game(config);

function preload() {
	this.load.image('ball', 'assets/Game/ball.png');
	this.load.image('paddle', 'assets/Game/baton.png');
	this.load.image('brick', 'assets/Game/brique-bleu.png');
}

function create() {
	player = this.physics.add.sprite(
		400,
		730,
		'paddle',
	);

	player.displayWidth = 50;

	ball = this.physics.add.sprite(
		400,
		710,
		'ball'
	);

	bricks = this.physics.add.group();
	for (let i = 0; i < 7; ++i) {
		for (let j = 0; j < 6; ++j) {
			let brick = this.physics.add.sprite(100 + i * 100, 100 + j * 55, 'brick');
			bricks.add(brick);
		}
	}
}

function update() { }
