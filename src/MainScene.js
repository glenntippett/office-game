import Player from "./Player.js";
import officeFloor from "./assets/tilesets/Modern_Office_MV_Floors_TILESET_A2.png";
import officeWall from "./assets/tilesets/Room_Builder_Office_32x32.png";
import modernOffice from "./assets/tilesets/Modern_Office_Black_Shadow_32x32.png";
import interiors from "./assets/tilesets/Interiors_free_32x32.png";
import inspireMapJson from "./assets/tilesets/inspire-map.json";
import mage from './assets/images/Mage_Idle_1.png';
import king from './assets/images/King_Idle_1.png';
export default class MainScene extends Phaser.Scene {
  constructor() {
    super("MainScene");
  }

  preload() {
    Player.preload(this);
    this.load.image("floors", officeFloor);
    this.load.image("walls", officeWall);
    this.load.image("desks", modernOffice);
    this.load.image("chairs", modernOffice);
    this.load.image("computers", modernOffice);
    this.load.image("couches", interiors);
    this.load.image("kitchen", interiors);
    this.load.image("plants", interiors);
    this.load.image("mage", mage);
    this.load.image("king", king);
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
    const computerTileset = map.addTilesetImage(
      "Modern_Office_Black_Shadow_32x32",
      "computers"
    );
    const couchesTileset = map.addTilesetImage(
      "Interiors_free_32x32",
      "couches"
    );
    const kitchenTileset = map.addTilesetImage(
      "Interiors_free_32x32",
      "kitchen"
    );
    const plantsTileset = map.addTilesetImage("Interiors_free_32x32", "plants");

    // Layered from bottom -> top
    const floorLayer = map.createLayer("floor", floorTileset, 0, 0);
    const wallLayer = map.createLayer("walls", wallTileSet, 0, 0);
    const chairLayer = map.createLayer("chairs", chairTileset, 0, 0);
    const kitchenLayer = map.createLayer("kitchen", kitchenTileset, 0, 0);
    const deskLayer = map.createLayer("desks", deskTileset, 0, 0);
    const couchLayer = map.createLayer("couches", couchesTileset, 0, 0);
    const computerLayer = map.createLayer("computers", computerTileset, 0, 0);
    const plantLayer = map.createLayer("plants", plantsTileset, 0, 0);

    // Set Collisions
    const collisionLayers = [
      wallLayer,
      deskLayer,
      chairLayer,
      couchLayer,
      kitchenLayer,
      plantLayer,
    ];
    collisionLayers.forEach((layer) => {
      layer.setCollisionByProperty({ collides: true });
      this.matter.world.convertTilemapLayer(layer);
    });

    this.player = new Player({
      scene: this,
      x: 100,
      y: 450,
      texture: "male",
      frame: "townsfolk_m_idle_1",
    });

    // NPC's
    const mage = this.matter.add.sprite(100, 200, 'mage').setScale(2).setStatic(true);
    const king = this.matter.add.sprite(450, 350, 'king').setScale(2).setStatic(true);
    king.flipX = true;

    this.matterCollision.addOnCollideStart({
      objectA: this.player,
      objectB: mage,
      callback: () => alert("That's rad man")
    });

    this.matterCollision.addOnCollideStart({
      objectA: this.player,
      objectB: king,
      callback: () => alert("Have you heard about this Figma plugin?")
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
