import Player from "./Player.js";
import officeFloor from "./assets/tilesets/Modern_Office_MV_Floors_TILESET_A2.png";
import officeWall from "./assets/tilesets/Room_Builder_Office_32x32.png";
import desks from "./assets/tilesets/Modern_Office_Black_Shadow_32x32.png";
import chairs from "./assets/tilesets/Modern_Office_Black_Shadow_32x32.png";
import inspireMapJson from "./assets/tilesets/inspire-map.json";

export default class MainScene extends Phaser.Scene {
  constructor() {
    super("MainScene");
  }

  preload() {
    Player.preload(this);
    this.load.image("floors", officeFloor);
    this.load.image("walls", officeWall);
    this.load.image("desks", desks);
    this.load.image("chairs", desks);
    this.load.tilemapTiledJSON("inspireMap", inspireMapJson);
  }

  create() {
    const map = this.make.tilemap({ key: "inspireMap" });
    const floorTileset = map.addTilesetImage(
      "Modern_Office_MV_Floors_TILESET_A2",
      "floors"
    );
    const wallTileSet = map.addTilesetImage(
      "Room_Builder_Office_32x32",
      "walls"
    );
    const deskTileset = map.addTilesetImage(
      "Modern_Office_Black_Shadow_32x32",
      "desks"
    );
    const chairTileset = map.addTilesetImage(
      "Modern_Office_Black_Shadow_32x32",
      "chairs"
    );

    // Layered from bottom -> top
    const floorLayer = map.createLayer("floor", floorTileset, 0, 0);
    const wallLayer = map.createLayer("walls", wallTileSet, 0, 0);
    const chairLayer = map.createLayer("chairs", chairTileset, 0, 0);
    const deskLayer = map.createLayer("desks", deskTileset, 0, 0);

    // Set Collisions
    const collisionLayers = [wallLayer, deskLayer, chairLayer];
    collisionLayers.forEach(layer => {
      layer.setCollisionByProperty({ collides: true });
      this.matter.world.convertTilemapLayer(layer);
    })

    this.player = new Player({
      scene: this,
      x: 100,
      y: 100,
      texture: "male",
      frame: "townsfolk_m_idle_1",
    });
    this.cameras.main.startFollow(this.player);
    this.cameras.main.roundPixels = true;
    this.add.existing(this.player);
    this.player.inputKeys = this.input.keyboard.addKeys({
      up: Phaser.Input.Keyboard.KeyCodes.W,
      down: Phaser.Input.Keyboard.KeyCodes.S,
      left: Phaser.Input.Keyboard.KeyCodes.A,
      right: Phaser.Input.Keyboard.KeyCodes.D,
    });
  }

  update() {
    this.player.update();
  }
}
