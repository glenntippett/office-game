import maleImg from "./assets/images/male.png";
import maleAtlas from "./assets/images/male_atlas.json";
import maleAnim from "./assets/images/male_anim.json";

export default class Player extends Phaser.Physics.Matter.Sprite {
  constructor(data) {
    const { scene, x, y, texture, frame } = data;
    super(scene.matter.world, x, y, texture, frame);
    scene.add.existing(this);
    const { Body, Bodies } = Phaser.Physics.Matter.Matter;
    const playerCollider = Bodies.circle(this.x, this.y, this.width / 2, {
      isSensor: false,
      label: "playerCollider",
    });
    const playerSensor = Bodies.circle(this.x, this.y, this.width, {
      isSensor: true,
      label: "playerSensor",
    });
    const compoundBody = Body.create({
      parts: [playerCollider, playerSensor],
      frictionAir: 0.35,
    });
    this.setScale(2);
    this.setExistingBody(compoundBody);
    this.setFixedRotation();    
  }

  static preload(scene) {
    scene.load.atlas("male", maleImg, maleAtlas);
    scene.load.animation("male_anim", maleAnim);
  }

  get velocity() {
    return this.body.velocity;
  }

  update() {
    const speed = 4;
    const velocity = 1;
    let playerVelocity = new Phaser.Math.Vector2();
    if (this.inputKeys.left.isDown) {
      playerVelocity.x = -velocity;
      this.flipX = true;
    }
    if (this.inputKeys.right.isDown) {
      playerVelocity.x = velocity;
      this.flipX = false;
    }
    if (this.inputKeys.up.isDown) {
      playerVelocity.y = -velocity;
    }
    if (this.inputKeys.down.isDown) {
      playerVelocity.y = velocity;
    }
    playerVelocity.normalize(); // Makes sure magnitude of vector is always 1 - fixes diagonal speed.
    playerVelocity.scale(speed);
    this.setVelocity(playerVelocity.x, playerVelocity.y);
    if (Math.abs(this.velocity.x) > 0.1 || Math.abs(this.velocity.y) > 0.1) {
      this.anims.play("male_walk", true);
    } else {
      this.anims.play("male_idle", true);
    }
  }
}
