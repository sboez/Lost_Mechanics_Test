export default class Button extends Phaser.GameObjects.Sprite {
	constructor(_scene, _x, _y, _img, _upFrame, _downFrame, _overFrame) {
		super(_scene, _x, _y, _img, _upFrame);

		this.upFrame = _upFrame;
		this.downFrame = _downFrame;
		this.overFrame = _overFrame;

		this.setInteractive({ useHandCursor: true });
		this.on('pointerup', this.pointerUp, this);
		this.on('pointerdown', this.pointerDown, this);
		this.on('pointerover', this.pointerOver, this);
		this.on('pointerout', this.pointerOut, this);

		_scene.add.existing(this);
	}

	pointerUp(pointer) {
		this.setFrame(this.upFrame);
	}

	pointerDown(pointer) {
		this.setFrame(this.downFrame);
	}

	pointerOver(pointer) {
		this.setFrame(this.overFrame);
	}

	pointerOut(pointer) {
		this.setFrame(this.upFrame);
	}
}
