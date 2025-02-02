"use client";
import { Game } from "phaser";
import LaunchScreen from "./scenes/LaunchScreen";
import SceneKey from "./constants/SceneKey";
import Preload from "./scenes/Preload";
import TicTacToe from "./scenes/TicTacToe";

export default class TicTacToeGame extends Game {
  constructor(gameConfig: Phaser.Types.Core.GameConfig) {
    super({
      ...gameConfig,
    });
    this.scene.add(SceneKey.PRELOAD, Preload);
    this.scene.add(SceneKey.LAUNCH_SCREEN, LaunchScreen);
    this.scene.add(SceneKey.TIC_TAC_TOE, TicTacToe);

    this.scene.start(SceneKey.PRELOAD, {
      nextSceneKey: SceneKey.LAUNCH_SCREEN,
      nextSceneData: {
        nextSceneKey: SceneKey.TIC_TAC_TOE,
      },
    });
  }
}
