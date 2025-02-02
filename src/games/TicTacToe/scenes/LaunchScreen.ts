/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/no-unused-vars */
"use client";

import AppConfig from "@/configurations/app.config";
import TicTacToeGameConfig from "../configurations/tic-tac-toe.game.config";

const sceneSettingConfig: Phaser.Types.Scenes.SettingsConfig = {};

export default class LaunchScreen extends Phaser.Scene {
  private nextSceneKey: string;
  private nextSceneData: object;

  constructor() {
    super(sceneSettingConfig);
    this.nextSceneKey = "";
    this.nextSceneData = {};
  }

  init(data: any): void {
    this.nextSceneKey = data.nextSceneKey;
    this.nextSceneData = data.nextSceneData;
  }

  preload(): void {
    this.load.image({
      key: "eyecatch",
      url: `${AppConfig.BASE_URL}/images/eyecatch.webp`,
    });
  }

  create(data: any): void {
    this.cameras.main.setBackgroundColor(TicTacToeGameConfig.BACKGROUND_COLOR);

    const image = this.add.image(
      this.cameras.main.centerX,
      this.cameras.main.centerY,
      "eyecatch"
    );
    image.setScale(0.75);

    const canvasWidth = this.game.canvas.width;
    const canvasHeight = this.game.canvas.height;

    const zone = this.add.zone(
      this.cameras.main.centerX,
      this.cameras.main.centerY,
      canvasWidth,
      canvasHeight
    );

    zone.setInteractive({
      useHandCursor: true,
    });

    zone.on("pointerdown", () => {
      zone.removeInteractive();
      this.scene.start(this.nextSceneKey, this.nextSceneData);
    });

    this.cameras.main.fadeIn(1000, 0, 0, 0);

    this.cameras.main.on(Phaser.Cameras.Scene2D.Events.FADE_IN_COMPLETE, () => {
      this.time.delayedCall(2000, () => {
        this.cameras.main.fadeOut(1000, 0, 0, 0);
      });
    });

    this.cameras.main.on(
      Phaser.Cameras.Scene2D.Events.FADE_OUT_COMPLETE,
      () => {
        this.scene.start(this.nextSceneKey, this.nextSceneData);
      }
    );
  }

  update(): void {}
}
