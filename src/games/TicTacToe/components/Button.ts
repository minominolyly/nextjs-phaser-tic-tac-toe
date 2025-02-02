/* eslint-disable @typescript-eslint/no-unused-vars */
"use client";
import { GameObjects, Scene } from "phaser";
import ComponentColor from "../constants/ComponentColor";
import PhaserComponentColor from "../models/PhaserComponentColor";

const initialProps = {
  align: "center",
  fontSize: "16px",
  fontFamily: "Noto Serif JP",
  ...ComponentColor.Button.gray,
};

export default class Button extends GameObjects.Container {
  private text: GameObjects.Text;
  private container: GameObjects.Rectangle;
  private pointerdowned: boolean;

  constructor(props: ButtonProps) {
    const margedProps = { ...initialProps, ...props };
    super(margedProps.scene, margedProps.x, margedProps.y);

    this.scene = margedProps.scene;
    this.scene.add.existing(this);

    this.setSize(margedProps.width, margedProps.height);
    this.setInteractive({ useHandCursor: true });

    const alignLeft = margedProps.align === "left";

    this.text = this.scene.add
      .text(alignLeft ? -margedProps.width / 2 + 0 : 0, -1, margedProps.text, {
        align: margedProps.align,
        fontSize: margedProps.fontSize,
        color: margedProps.foreColor,
        fontFamily: margedProps.fontFamily,
      })
      .setOrigin(alignLeft ? 0 : 0.5, 0.5)
      .setPadding(0, 2, 0, 0);

    this.container = margedProps.scene.add.rectangle(
      0,
      0,
      margedProps.width,
      margedProps.height,
      margedProps.backColor,
      margedProps.backAlpha
    );
    this.container
      .setStrokeStyle(1, margedProps.borderColor)
      .setOrigin(alignLeft ? 0 : 0.5, 0.5);

    this.add([this.container, this.text]);

    this.pointerdowned = false;

    this.on("pointerover", () => {
      this.updateButtonColor(
        "pointer over",
        margedProps.foreOverColor,
        margedProps.backOverColor,
        margedProps.borderOverColor
      );
    });

    this.on("pointerout", () => {
      this.updateButtonColor(
        "pointer out",
        margedProps.foreColor,
        margedProps.backColor,
        margedProps.borderColor
      );
    });

    this.on("pointerdown", () => {
      this.updateButtonColor(
        "pointer down",
        margedProps.foreDownColor,
        margedProps.backDownColor,
        margedProps.borderDownColor
      );
      this.pointerdowned = true;
      // this.scene.tweens.add({
      //   targets: this,
      //   scaleX: 1.1,
      //   scaleY: 1.1,
      //   duration: 100,
      //   yoyo: true,
      //   repeat: 0,
      //   ease: "Sine.easeInOut",
      // });
    });

    this.on("pointerup", () => {
      if (this.pointerdowned) {
        this.updateButtonColor(
          "pointer up",
          margedProps.foreUpColor,
          margedProps.backUpColor,
          margedProps.borderUpColor
        );
        margedProps.onClick();
        this.pointerdowned = false;
      }
    });
  }

  updateButtonColor(
    message: string,
    foreColor?: string,
    backColor?: number | undefined,
    _borderColor?: number | undefined
  ): void {
    console.debug(message);
    if (foreColor !== undefined) {
      this.text.setColor(foreColor);
    }
    if (backColor !== undefined) {
      this.container.setFillStyle(backColor);
    }
    // NOTE: 更新すると画面全体の色が変わってしまうのでコメントアウト
    // if (borderColor !== undefined) {
    //   this.container.setStrokeStyle(borderColor);
    // }
  }
}

interface ButtonProps extends PhaserComponentColor {
  scene: Scene;
  x: number;
  y: number;
  text: string;
  width: number;
  height: number;
  align?: "center" | "left" | "right" | "justify";
  fontSize?: string;
  fontFamily?: string | undefined;
  onClick: () => void;
}
