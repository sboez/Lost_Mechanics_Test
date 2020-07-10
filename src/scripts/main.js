import phaser from 'phaser'
import GameScene from './game_scene';

const config = {
	type : Phaser.AUTO,
	scale : {
		mode : Phaser.Scale.FIT,
		parent: 'phaser-example',
		autoCenter : Phaser.Scale.CENTER_BOTH,
		width : 438,
		heigth : 600
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
