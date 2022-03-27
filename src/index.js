import Phaser from "phaser";
import PhaserMatterCollisionPlugin from "phaser-matter-collision-plugin";
import MainScene from "./MainScene";

const config = {
  type: Phaser.AUTO,
  parent: "game",
  width: 500,
  height: 300,
  backgroundColor: "#999999",
  scene: MainScene,
  scale: { zoom: 2 },
  physics: {
    default: "matter",
    matter: {
      debug: false,
      gravity: { y: 0 },
    },
  },
  plugins: {
    scene: [
      {
        key: "matterCollision",
        plugin: PhaserMatterCollisionPlugin,
        mapping: "matterCollision",
      },
    ],
  },
};

new Phaser.Game(config);
