"use client";
import { GameObjects } from "phaser";

export default class TicTacToeCell extends GameObjects.Sprite {
  constructor(
    scene: Phaser.Scene,
    x: number,
    y: number,
    texture: string | Phaser.Textures.Texture,
    frame?: string | number
  ) {
    super(scene, x, y, texture, frame);
    this.state = "blank";
    this.rowIndex = 0;
    this.columnIndex = 0;
    this.selectedTurnsJson = "[]";
  }

  state: "blank" | `Player${number}`;
  rowIndex: number;
  columnIndex: number;
  selectedTurnsJson: string;
}
