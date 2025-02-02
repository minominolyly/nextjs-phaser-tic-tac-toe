"use client";
import { GameObjects, Scene } from "phaser";
import PhaserComponentColor from "../models/PhaserComponentColor";

const initialProps = {
  align: "center",
  fontSize: "16px",
  fontFamily: "Noto Serif JP",
  height: 480,
  width: 854,
  x: 640,
  y: 360,
};

export default class MessageBox extends GameObjects.Container {
  private text: GameObjects.Text;
  private container: GameObjects.Rectangle;

  constructor(props: MessageBoxProps) {
    const margedProps = { ...initialProps, ...props };
    super(margedProps.scene, margedProps.x, margedProps.y);

    this.scene = margedProps.scene;
    this.scene.add.existing(this);

    this.setSize(margedProps.width, margedProps.height);

    const alignLeft = margedProps.align === "left";

    this.text = this.scene.add
      .text(alignLeft ? -margedProps.width / 2 + 0 : 0, 0, margedProps.text, {
        align: margedProps.align,
        fontSize: margedProps.fontSize,
        color: margedProps.foreColor,
        fontFamily: margedProps.fontFamily,
      })
      .setOrigin(alignLeft ? 0 : 0.5, 0.5)
      .setPadding(0, 0, 0, 0);

    if (props.foreColor) {
      this.text.setColor(props.foreColor);
    }

    this.container = this.scene.add.rectangle(
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
  }
}

interface MessageBoxProps extends PhaserComponentColor {
  scene: Scene;
  x: number;
  y: number;
  text: string;
  width: number;
  height: number;
  align?: "center" | "left" | "right" | "justify";
  fontSize?: string;
  fontFamily?: string | undefined;
}
