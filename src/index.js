import Phaser from "phaser";
import PhaserMatterCollisionPlugin from "phaser-matter-collision-plugin";
import MainScene from "./MainScene";

const config = {
  type: Phaser.AUTO,
  parent: "game",
  width: 500,
  height: 300,
  backgroundColor: "#F0F0F0",
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

if (/Android|webOS|iPhone|iPad|iPod|BlackBerry/i.test(navigator.userAgent) ||
   (/Android|webOS|iPhone|iPad|iPod|BlackBerry/i.test(navigator.platform))) {
    alert('Please visit on a Desktop device')
} else {
  new Phaser.Game(config);
}
