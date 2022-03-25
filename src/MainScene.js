import maleImg from "./assets/images/male.png";
import maleAtlas from "./assets/images/male_atlas.json";

export default class MainScene extends Phaser.Scene {
  constructor() {
    super();
  }

  preload() {
    this.load.atlas("male", maleImg, maleAtlas);
  }

  create() {
    this.player = new Phaser.Physics.Matter.Sprite(
      this.matter.world,
      0,
      0,
      "male",
      "townsfolk_m_idle_1"
    );
    this.add.existing(this.player);
    this.inputKeys = this.input.keyboard.addKeys({
      up: Phaser.Input.Keyboard.KeyCodes.W,
      down: Phaser.Input.Keyboard.KeyCodes.S,
      left: Phaser.Input.Keyboard.KeyCodes.A,
      right: Phaser.Input.Keyboard.KeyCodes.D,
    });
  }

  update() {
    const speed = 2.5;
    const velocity = 1;
    let playerVelocity = new Phaser.Math.Vector2();
    if (this.inputKeys.left.isDown) {
      playerVelocity.x = -velocity;
    }
    if (this.inputKeys.right.isDown) {
      playerVelocity.x = velocity;
    }
    if (this.inputKeys.up.isDown) {
      playerVelocity.y = -velocity;
    }
    if (this.inputKeys.down.isDown) {
      playerVelocity.y = velocity;
    }
    playerVelocity.normalize(); // Makes sure magnitude of vector is always 1 - fixes diagonal speed.
    playerVelocity.scale(speed);
    this.player.setVelocity(playerVelocity.x, playerVelocity.y);
  }
}
