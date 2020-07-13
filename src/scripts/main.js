import phaser from 'phaser'
import TitleScene from './title_scene';
import GameScene from './game_scene';
import EndScene from './end_scene';

const config = {
	type : Phaser.AUTO,
	scale : {
		mode : Phaser.Scale.FIT,
		parent: 'phaser-example',
		autoCenter : Phaser.Scale.CENTER_BOTH,
		width : 328,
		height : 600
	},
	dom: {
        createContainer: true
    },
	physics : {
		default : 'arcade',
		arcade : {
			gravity : false
		},
	},
	scene : [
		TitleScene,
		GameScene,
		EndScene
	],
};

const game = new Phaser.Game(config);
