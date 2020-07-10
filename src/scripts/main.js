import phaser from 'phaser'
import GameScene from './game_scene';
import TitleScene from './title_scene';

const config = {
	type : Phaser.AUTO,
	scale : {
		mode : Phaser.Scale.FIT,
		parent: 'phaser-example',
		autoCenter : Phaser.Scale.CENTER_BOTH,
		width : 328,
		height : 600
	},
	physics : {
		default : 'arcade',
		arcade : {
			gravity : false
		},
	},
	scene : [
		TitleScene,
		GameScene
	],
};

const game = new Phaser.Game(config);
