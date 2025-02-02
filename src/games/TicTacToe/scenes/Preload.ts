/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/no-unused-vars */
"use client";
import { Scene } from "phaser";
import SceneKey from "../constants/SceneKey";
import TicTacToeGameConfig from "../configurations/tic-tac-toe.game.config";

const sceneSettingConfig: Phaser.Types.Scenes.SettingsConfig = {
  key: SceneKey.PRELOAD,
  active: true,
};

export default class Preload extends Scene {
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

  preload(): void {}

  create(data: any): void {
    this.cameras.main.setBackgroundColor(TicTacToeGameConfig.BACKGROUND_COLOR);
    this.scene.start(this.nextSceneKey, this.nextSceneData);
  }

  update(): void {}
}
