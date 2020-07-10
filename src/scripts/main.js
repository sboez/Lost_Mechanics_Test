import phaser from 'phaser'
import GameScene from './game_scene';

const config = {
	type : Phaser.AUTO,
	width : 800,
	heigth : 640,
	debug : true,
	scale : {
		mode : Phaser.Scale.RESIZE,
		autoCenter : Phaser.Scale.CENTER_BOTH
	},
	physics : {
		default : 'arcade',
		arcade : {
			gravity : false
		},
	},
	scene : [
		GameScene
	],
};

const game = new Phaser.Game(config);
