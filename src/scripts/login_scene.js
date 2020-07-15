import { Button } from './button';

export default class LoginScene extends Phaser.Scene {
	constructor() {
		super({ key: 'LoginScene' });
	}

	create() {
		this.clickSound = this.sound.add('soundMenu');
		
		this.add.text(30, 200, "Please put your name to play",
			{ 
				align: 'center', 
				fontFamily: 'myFont', 
				fontSize: 24
			});

		this.inputText = this.add.rexInputText(this.cameras.main.centerX, this.cameras.main.centerY, 10, 10, {
			type: 'textarea',
			text: '',
			placeholder: 'name',
			fontSize: '22px',
			border: 1,
			borderColor: '#fff',
			backgroundColor: '#888E8E'
		})
		.resize(200, 40)
		.selectText()
		.on('textchange', inputText => {
			this.yourName = this.inputText.text;
		});

		this.yourName = this.inputText.text;

		new Button(this, this.cameras.main.centerX, this.cameras.main.centerY + 120, 'buttons', 0, 1, 2)
		.on('pointerup', this.checkName, this);

		this.add.text(this.cameras.main.centerX - 10, this.cameras.main.centerY + 110, "OK",
			{ 
				fontFamily: 'myFont', 
				fontSize: 24 
			});
	}

	checkName() {
		this.clickSound.play();
		this.inputText.text === '' ? alert("Your name can't be empty") : this.scene.start('GameScene', { name: this.yourName });
	}
}
