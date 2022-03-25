import Player from "./Player.js";
import natureTileSet from './assets/tilesets/RPG-Nature-Tileset.png';
import mapJson from './assets/tilesets/map.json';

export default class MainScene extends Phaser.Scene {
  constructor() {
    super("MainScene");
  }

  preload() {
    Player.preload(this);
    this.load.image("tiles", natureTileSet);
    this.load.tilemapTiledJSON("map", mapJson);
  }

  create() {
    const map = this.make.tilemap({ key: "map" });
    const tileset = map.addTilesetImage("RPG-Nature-Tileset", "tiles", 32, 32, 0, 0);
    const layer1 = map.createLayer("Tile Layer 1", tileset, 0, 0);
    const layer2 = map.createLayer("Tile Layer 2", tileset, 0, 0);
    this.player = new Player({
      scene: this,
      x: 0,
      y: 0,
      texture: "male",
      frame: "townsfolk_m_idle_1",
    });
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
