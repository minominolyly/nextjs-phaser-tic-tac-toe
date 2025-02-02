/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/no-unused-vars */
"use client";
import numberUtility from "@/utilities/numberUtility";
import { Scene } from "phaser";
import SceneKey from "../constants/SceneKey";
import dateUtility from "@/utilities/dateUtility";
import TicTacToeCell from "../models/TicTacToeCell";
import TicTacToeGameConfig from "../configurations/tic-tac-toe.game.config";
import PlayerMode from "../types/PlayerMode";
import GameMode from "../types/GameMode";
import TicTacToeCellSelectedTurn from "../models/SelectedTurn";
import Button from "../components/Button";
import MessageBox from "../components/MessageBox";
import AppConfig from "@/configurations/app.config";
import ComponentColor from "../constants/ComponentColor";

const textStyle: Phaser.Types.GameObjects.Text.TextStyle = {
  fontFamily: "Potta One",
  fontSize: "32px",
  color: TicTacToeGameConfig.FOREGROUND_COLOR,
};

const BLANK_FRAME = 0;
const PLAYER_1_FRAME = 1;
const PLAYER_2_FRAME = 2;
const PLAYER_1_FINISH_FRAME = 3;
const PLAYER_2_FINISH_FRAME = 4;

export default class TicTacToe extends Scene {
  private playerMode: PlayerMode;
  private gameMode: GameMode;
  private turnPlayer: `Player${number}`;
  private turnPlayerText: Phaser.GameObjects.Text | null;
  private cpuPlayer: `Player${number}`;
  private player1Timer: Phaser.Time.TimerEvent | null;
  private player1TimerText: Phaser.GameObjects.Text | null;
  private player1TimerMs: number;
  private player2Timer: Phaser.Time.TimerEvent | null;
  private player2TimerText: Phaser.GameObjects.Text | null;
  private player2TimerMs: number;
  private turnCounter: number;
  private turnCounterText: Phaser.GameObjects.Text | null;
  private localTimer: Phaser.Time.TimerEvent | null;
  private timerText: Phaser.GameObjects.Text | null;
  private timerMs: number;
  private startButton: Button | null;
  private messageBox: MessageBox | null;
  private group: Phaser.GameObjects.Group | null;
  private dialogBox: MessageBox | null;
  private closeMessageBoxButton: Button | null;
  private saveResultMessageBoxButton: Button | null;
  private okMessageBoxButton: Button | null;
  private cancelMessageBoxButton: Button | null;
  private option1MessageBoxButton: Button | null;
  private option2MessageBoxButton: Button | null;

  constructor() {
    super({
      key: SceneKey.TIC_TAC_TOE,
      active: false,
    });
    this.playerMode = "vs-cpu";
    this.gameMode = "fade";
    this.turnPlayer = "Player1";
    this.turnPlayerText = null;
    this.cpuPlayer = "Player1";
    this.player1Timer = null;
    this.player1TimerText = null;
    this.player1TimerMs = 0;
    this.player2Timer = null;
    this.player2TimerText = null;
    this.player2TimerMs = 0;
    this.localTimer = null;
    this.timerText = null;
    this.timerMs = 0;
    this.turnCounter = 0;
    this.turnCounterText = null;
    this.startButton = null;
    this.messageBox = null;
    this.closeMessageBoxButton = null;
    this.saveResultMessageBoxButton = null;
    this.group = null;
    this.dialogBox = null;
    this.okMessageBoxButton = null;
    this.cancelMessageBoxButton = null;
    this.option1MessageBoxButton = null;
    this.option2MessageBoxButton = null;
  }

  init(_data: any): void {}

  preload(): void {
    this.load.spritesheet(
      "tic-tac-toe",
      `${AppConfig.BASE_URL}/images/tic-tac-toe.webp`,
      {
        frameWidth: 200,
        frameHeight: 200,
        margin: 0,
      }
    );
  }

  create(_data: any): void {
    this.cameras.main.setBackgroundColor(TicTacToeGameConfig.BACKGROUND_COLOR);
    this.createStartButton("Start!");
  }

  update(_time: number, _delta: number): void {}

  startTimer(): void {
    this.timerMs = 0;

    if (this.timerText) {
      this.timerText.destroy();
    }

    this.timerText = this.add.text(
      16,
      16,
      `Time: ${numberUtility.millisecondsToTime(this.timerMs)}`,
      textStyle
    );

    const timerEventConfig: Phaser.Types.Time.TimerEventConfig = {
      delay: 100,
      loop: true,
      startAt: 0,
      timeScale: 1,
      callback: () => {
        if (!this.localTimer || !this.timerText) {
          return;
        }
        this.timerMs += this.localTimer.getElapsed();
        this.timerText.text = `Time: ${numberUtility.millisecondsToTime(
          this.timerMs
        )}`;
      },
    };

    if (this.localTimer) {
      this.localTimer.reset(timerEventConfig);
    } else {
      this.localTimer = this.time.addEvent(timerEventConfig);
    }
  }

  startPlayer1Timer(): void {
    this.player1TimerMs = 0;

    if (this.player1TimerText) {
      this.player1TimerText.destroy();
    }

    this.player1TimerText = this.add.text(
      80,
      360,
      `Time\n${numberUtility.millisecondsToTime(this.player1TimerMs)}`,
      {
        ...textStyle,
        color: "#ffc9ee",
      }
    );

    const timerEventConfig: Phaser.Types.Time.TimerEventConfig = {
      delay: 100,
      loop: true,
      startAt: 0,
      timeScale: 1,
      callback: () => {
        if (!this.player1Timer || !this.player1TimerText) {
          return;
        }
        this.player1TimerMs += this.player1Timer.getElapsed();
        this.player1TimerText.text = `Time\n${numberUtility.millisecondsToTime(
          this.player1TimerMs
        )}`;
      },
    };

    if (this.player1Timer) {
      this.player1Timer.reset(timerEventConfig);
    } else {
      this.player1Timer = this.time.addEvent(timerEventConfig);
    }
  }

  startPlayer2Timer(): void {
    this.player2TimerMs = 0;

    if (this.player2TimerText) {
      this.player2TimerText.destroy();
    }

    this.player2TimerText = this.add.text(
      1020,
      360,
      `Time\n${numberUtility.millisecondsToTime(this.player2TimerMs)}`,
      {
        ...textStyle,
        color: "#baf3ff",
      }
    );

    const timerEventConfig: Phaser.Types.Time.TimerEventConfig = {
      delay: 100,
      loop: true,
      startAt: 0,
      timeScale: 1,
      paused: true,
      callback: () => {
        if (!this.player2Timer || !this.player2TimerText) {
          return;
        }
        this.player2TimerMs += this.player2Timer.getElapsed();
        this.player2TimerText.text = `Time\n${numberUtility.millisecondsToTime(
          this.player2TimerMs
        )}`;
      },
    };

    if (this.player2Timer) {
      this.player2Timer.reset(timerEventConfig);
    } else {
      this.player2Timer = this.time.addEvent(timerEventConfig);
    }
  }

  stopTimer(): void {
    if (!this.localTimer) {
      return;
    }
    this.localTimer.paused = true;

    if (!this.player1Timer) {
      return;
    }

    this.player1Timer.paused = true;

    if (!this.player2Timer) {
      return;
    }

    this.player2Timer.paused = true;
  }

  resetTurnCounter(): void {
    this.turnCounter = 1;
    if (this.turnCounterText) {
      this.turnCounterText.destroy();
    }

    this.turnCounterText = this.add.text(
      320,
      16,
      `Turn Counter: ${this.turnCounter}`,
      textStyle
    );
  }

  addTurnCounter(): void {
    this.turnCounter++;
    if (this.turnCounterText) {
      this.turnCounterText.text = `Turn Counter: ${this.turnCounter}`;
    }
  }

  createTicTacToe(): void {
    if (this.group) {
      this.group.destroy(true, false);
    }
    this.group = this.add.group();

    for (
      let rowIndex = 0;
      rowIndex < TicTacToeGameConfig.ROW_COLUMN_COUNT;
      rowIndex++
    ) {
      for (
        let columnIndex = 0;
        columnIndex < TicTacToeGameConfig.ROW_COLUMN_COUNT;
        columnIndex++
      ) {
        const cellX =
          columnIndex * TicTacToeGameConfig.TIC_TAC_TOE_CELL_SIZE +
          TicTacToeGameConfig.TIC_TAC_TOE_CELL_SIZE / 2 +
          TicTacToeGameConfig.TIC_TAC_TOE_OFFSET_X;

        const cellY =
          rowIndex * TicTacToeGameConfig.TIC_TAC_TOE_CELL_SIZE +
          TicTacToeGameConfig.TIC_TAC_TOE_CELL_SIZE / 2 +
          TicTacToeGameConfig.TIC_TAC_TOE_OFFSET_Y;

        const cell = this.group.create(
          cellX,
          cellY,
          "tic-tac-toe",
          0
        ) as TicTacToeCell;
        cell.rowIndex = rowIndex;
        cell.columnIndex = columnIndex;
        cell.selectedTurnsJson = "[]";
        cell.setInteractive({ useHandCursor: true }).on(
          "pointerdown",
          (
            pointer: Phaser.Input.Pointer,
            localX: number,
            localY: number,
            event: any
          ) => {
            this.setTicTacToeCellState(cell.rowIndex, cell.columnIndex);
          },
          this
        );
        this.setBlankTicTacToeCell(cell);
      }
    }
  }

  setBlankTicTacToeCell(cell: TicTacToeCell) {
    cell.state = "blank";
    cell.setTexture("tic-tac-toe", BLANK_FRAME);
  }

  setTicTacToeCellsInteractive(enable: boolean) {
    if (!this.group) {
      return;
    }
    const cells = this.group.getChildren() as TicTacToeCell[];
    for (const cell of cells) {
      if (enable) {
        if (cell.state === "blank") {
          cell.setInteractive();
        } else {
          cell.disableInteractive(true);
        }
      } else {
        cell.disableInteractive(true);
      }
    }
  }

  setTicTacToeCellState(rowIndex: number, columnIndex: number) {
    if (!this.group) {
      return;
    }

    const cell = this.getTicTacToeCell(rowIndex, columnIndex);
    if (!cell) {
      return;
    }

    if (cell.state !== "blank") {
      return;
    }

    if (this.turnPlayer === "Player1") {
      cell.state = "Player1";
      cell.setTexture("tic-tac-toe", PLAYER_1_FRAME);
    } else if (this.turnPlayer === "Player2") {
      cell.state = "Player2";
      cell.setTexture("tic-tac-toe", PLAYER_2_FRAME);
    }

    this.tweens.add({
      targets: cell,
      scaleX: 1.1,
      scaleY: 1.1,
      duration: 100,
      yoyo: true,
      repeat: 0,
      ease: "Sine.easeInOut",
    });

    this.setTicTacToeCellsInteractive(false);

    const selectedTurns = JSON.parse(
      cell.selectedTurnsJson
    ) as TicTacToeCellSelectedTurn[];
    selectedTurns.push({ player: this.turnPlayer, turn: this.turnCounter });
    cell.selectedTurnsJson = JSON.stringify(selectedTurns);

    const result = this.checkFinish();
    if (result === false) {
      if (this.gameMode === "fade") {
        const children = this.group.getChildren() as TicTacToeCell[];
        for (const child of children) {
          const selectedTurns = JSON.parse(
            child.selectedTurnsJson
          ) as TicTacToeCellSelectedTurn[];
          const fadeTargetCell = selectedTurns.find(
            (val) =>
              val.player === this.turnPlayer &&
              val.turn === this.turnCounter - 3
          );
          if (fadeTargetCell) {
            this.setBlankTicTacToeCell(child);
          }
        }
      }

      if (this.turnPlayer === "Player2") {
        this.addTurnCounter();
      }

      this.switchPlayerTurn();

      if (this.playerMode === "vs-cpu") {
        if (this.turnPlayer === this.cpuPlayer) {
          this.cpuPlay();
        } else {
          this.setTicTacToeCellsInteractive(true);
        }
      } else {
        this.setTicTacToeCellsInteractive(true);
      }
      return;
    }

    this.setTicTacToeCellsInteractive(false);
    this.stopTimer();

    if (result === "draw") {
      this.createMessageBox(
        `Draw!\nTime: ${numberUtility.millisecondsToTime(
          this.timerMs
        )}\nTurn Counter: ${this.turnCounter}`
      );
    } else {
      if (this.playerMode === "vs-cpu") {
        if (this.cpuPlayer === result) {
          this.createMessageBox(
            `Winner CPU🤖\nTime: ${numberUtility.millisecondsToTime(
              this.timerMs
            )}\nTurn Counter: ${this.turnCounter}`
          );
        } else {
          this.createMessageBox(
            `Winner Player🦸🏻\nTime: ${numberUtility.millisecondsToTime(
              this.timerMs
            )}\nTurn Counter: ${this.turnCounter}`
          );
        }
      } else {
        this.createMessageBox(
          `Winner ${result}🎉\nTime: ${numberUtility.millisecondsToTime(
            this.timerMs
          )}\nTurn Counter: ${this.turnCounter}`
        );
      }
    }
  }

  cpuPlay() {
    if (this.playerMode !== "vs-cpu") {
      return;
    }
    if (this.turnPlayer !== this.cpuPlayer) {
      return;
    }

    this.setTicTacToeCellsInteractive(false);

    const cpuTimer = this.time.delayedCall(
      2000,
      () => {
        if (!this.group) {
          cpuTimer.destroy();
          return;
        }

        const checkCells = (targetCells: TicTacToeCell[]): boolean => {
          if (targetCells.length !== TicTacToeGameConfig.ROW_COLUMN_COUNT) {
            return false;
          }
          const notBlankCells = targetCells.filter(
            (targetCell) => targetCell.state !== "blank"
          );
          if (notBlankCells.length === TicTacToeGameConfig.ROW_COLUMN_COUNT) {
            return false;
          }

          const cpuPlayersCells = targetCells.filter(
            (targetCell) => targetCell.state === this.cpuPlayer
          );
          if (cpuPlayersCells.length == 2) {
            const targetCell = targetCells.find(
              (targetCell) => targetCell.state === "blank"
            );
            if (targetCell) {
              this.setTicTacToeCellState(
                targetCell.rowIndex,
                targetCell.columnIndex
              );
              return true;
            }
          }
          const playersCells = targetCells.filter(
            (targetCell) =>
              targetCell.state !== this.cpuPlayer &&
              targetCell.state !== "blank"
          );
          if (playersCells.length == 2) {
            const targetCell = targetCells.find(
              (targetCell) => targetCell.state === "blank"
            );
            if (targetCell) {
              this.setTicTacToeCellState(
                targetCell.rowIndex,
                targetCell.columnIndex
              );
              return true;
            }
          }

          return false;
        };
        let finishCpuTurn = false;

        //#region row check
        for (
          let rowIndex = 0;
          rowIndex < TicTacToeGameConfig.ROW_COLUMN_COUNT;
          rowIndex++
        ) {
          const targetCells: TicTacToeCell[] = [];
          for (
            let columnIndex = 0;
            columnIndex < TicTacToeGameConfig.ROW_COLUMN_COUNT;
            columnIndex++
          ) {
            const cell = this.getTicTacToeCell(rowIndex, columnIndex);
            if (cell) {
              targetCells.push(cell);
            }
          }

          finishCpuTurn = checkCells(targetCells);
          if (finishCpuTurn) {
            cpuTimer.destroy();
            return;
          }
        }
        //#endregion row check

        //#region column check
        for (
          let columnIndex = 0;
          columnIndex < TicTacToeGameConfig.ROW_COLUMN_COUNT;
          columnIndex++
        ) {
          const targetCells: TicTacToeCell[] = [];
          for (
            let rowIndex = 0;
            rowIndex < TicTacToeGameConfig.ROW_COLUMN_COUNT;
            rowIndex++
          ) {
            const cell = this.getTicTacToeCell(rowIndex, columnIndex);
            if (cell) {
              targetCells.push(cell);
            }
          }

          finishCpuTurn = checkCells(targetCells);
          if (finishCpuTurn) {
            cpuTimer.destroy();
            return;
          }
        }
        //#endregion column check

        //#region top-left to bottom-right check
        {
          const targetCells: TicTacToeCell[] = [];
          for (
            let rowColumnIndex = 0;
            rowColumnIndex < TicTacToeGameConfig.ROW_COLUMN_COUNT;
            rowColumnIndex++
          ) {
            const cell = this.getTicTacToeCell(rowColumnIndex, rowColumnIndex);
            if (cell) {
              targetCells.push(cell);
            }
          }

          finishCpuTurn = checkCells(targetCells);
          if (finishCpuTurn) {
            cpuTimer.destroy();
            return;
          }
        }
        //#endregion top-left to bottom-right check

        //#region top-right to bottom-left check
        {
          const targetCells: TicTacToeCell[] = [];
          for (
            let rowColumnIndex = 0;
            rowColumnIndex < TicTacToeGameConfig.ROW_COLUMN_COUNT;
            rowColumnIndex++
          ) {
            const cell = this.getTicTacToeCell(
              rowColumnIndex,
              TicTacToeGameConfig.ROW_COLUMN_COUNT - rowColumnIndex - 1
            );
            if (cell) {
              targetCells.push(cell);
            }
          }

          finishCpuTurn = checkCells(targetCells);
          if (finishCpuTurn) {
            cpuTimer.destroy();
            return;
          }
        }
        //#endregion top-right to bottom-left check

        const cells = this.group.getChildren() as TicTacToeCell[];
        const blankCells = cells.filter((cell) => cell.state === "blank");
        if (blankCells.length > 0) {
          const blankCellIndex = Math.floor(Math.random() * blankCells.length);
          const blankCell = blankCells[blankCellIndex];
          this.setTicTacToeCellState(blankCell.rowIndex, blankCell.columnIndex);
        }

        cpuTimer.destroy();
      },
      [],
      this
    );
  }

  getTicTacToeCell(
    rowIndex: number,
    columnIndex: number
  ): TicTacToeCell | null {
    if (!this.group) {
      return null;
    }
    const children = this.group.getChildren() as TicTacToeCell[];
    for (const element of children) {
      if (
        element.columnIndex === columnIndex &&
        element.rowIndex === rowIndex
      ) {
        return element;
      }
    }
    return null;
  }

  checkFinish(): `Player${number}` | "draw" | false {
    const checkCells = (
      targetCells: TicTacToeCell[]
    ): `Player${number}` | false => {
      if (targetCells.length !== TicTacToeGameConfig.ROW_COLUMN_COUNT) {
        return false;
      }

      if (
        targetCells.filter((cell) => cell.state === "Player1").length ===
        TicTacToeGameConfig.ROW_COLUMN_COUNT
      ) {
        return "Player1";
      }

      if (
        targetCells.filter((cell) => cell.state === "Player2").length ===
        TicTacToeGameConfig.ROW_COLUMN_COUNT
      ) {
        return "Player2";
      }

      return false;
    };

    const setTextures = (targetCells: TicTacToeCell[]) => {
      targetCells.forEach((cell) => {
        if (cell.state === "Player1") {
          cell.setTexture("tic-tac-toe", PLAYER_1_FINISH_FRAME);
        } else if (cell.state === "Player2") {
          cell.setTexture("tic-tac-toe", PLAYER_2_FINISH_FRAME);
        }
      });
    };

    //#region draw check
    if (this.group) {
      const children = this.group.getChildren() as TicTacToeCell[];
      const blankCells = children.filter((cell) => cell.state === "blank");
      if (blankCells.length === 0) {
        return "draw";
      }
    }
    //#endregion draw check

    //#region row check
    for (
      let rowIndex = 0;
      rowIndex < TicTacToeGameConfig.ROW_COLUMN_COUNT;
      rowIndex++
    ) {
      const targetCells: TicTacToeCell[] = [];
      for (
        let columnIndex = 0;
        columnIndex < TicTacToeGameConfig.ROW_COLUMN_COUNT;
        columnIndex++
      ) {
        const cell = this.getTicTacToeCell(rowIndex, columnIndex);
        if (cell) {
          targetCells.push(cell);
        }
      }

      const result = checkCells(targetCells);
      if (result) {
        setTextures(targetCells);
        return result;
      }
    }
    //#endregion row check

    //#region column check
    for (
      let columnIndex = 0;
      columnIndex < TicTacToeGameConfig.ROW_COLUMN_COUNT;
      columnIndex++
    ) {
      const targetCells: TicTacToeCell[] = [];
      for (
        let rowIndex = 0;
        rowIndex < TicTacToeGameConfig.ROW_COLUMN_COUNT;
        rowIndex++
      ) {
        const cell = this.getTicTacToeCell(rowIndex, columnIndex);
        if (cell) {
          targetCells.push(cell);
        }
      }

      const result = checkCells(targetCells);
      if (result) {
        setTextures(targetCells);
        return result;
      }
    }
    //#endregion column check

    //#region top-left to bottom-right check
    {
      const targetCells: TicTacToeCell[] = [];
      for (
        let rowColumnIndex = 0;
        rowColumnIndex < TicTacToeGameConfig.ROW_COLUMN_COUNT;
        rowColumnIndex++
      ) {
        const cell = this.getTicTacToeCell(rowColumnIndex, rowColumnIndex);
        if (cell) {
          targetCells.push(cell);
        }
      }
      const result = checkCells(targetCells);
      if (result) {
        setTextures(targetCells);
        return result;
      }
    }
    //#endregion top-left to bottom-right check

    //#region top-right to bottom-left check
    {
      const targetCells: TicTacToeCell[] = [];
      for (
        let rowColumnIndex = 0;
        rowColumnIndex < TicTacToeGameConfig.ROW_COLUMN_COUNT;
        rowColumnIndex++
      ) {
        const cell = this.getTicTacToeCell(
          rowColumnIndex,
          TicTacToeGameConfig.ROW_COLUMN_COUNT - rowColumnIndex - 1
        );
        if (cell) {
          targetCells.push(cell);
        }
      }
      const result = checkCells(targetCells);
      if (result) {
        setTextures(targetCells);
        return result;
      }
    }
    //#endregion top-right to bottom-left check

    return false;
  }

  resetState() {
    this.turnPlayer = "Player1";

    if (this.turnPlayerText) {
      this.turnPlayerText.destroy(true);
    }
    this.turnPlayerText = this.add.text(
      620,
      16,
      `Turn Player: ${this.turnPlayer}`,
      textStyle
    );
    this.startPlayer1Timer();
    this.startPlayer2Timer();
    this.resetTurnCounter();
  }

  switchPlayerTurn() {
    if (this.turnPlayer === "Player1") {
      this.turnPlayer = "Player2";
      if (this.player1Timer) {
        this.player1Timer.paused = true;
      }
      if (this.player2Timer) {
        this.player2Timer.paused = false;
      }
    } else if (this.turnPlayer === "Player2") {
      this.turnPlayer = "Player1";
      if (this.player1Timer) {
        this.player1Timer.paused = false;
      }
      if (this.player2Timer) {
        this.player2Timer.paused = true;
      }
    }

    if (this.turnPlayerText) {
      this.turnPlayerText.text = `Turn Player: ${this.turnPlayer}`;
    }
  }

  createStartButton(text: string): void {
    if (this.startButton) {
      this.startButton.destroy(true);
    }
    this.startButton = new Button({
      scene: this,
      fontSize: "32px",
      height: 98,
      width: 180,
      text: text,
      x: 1140,
      y: 98,
      onClick: () => {
        this.createDialogBox(
          `Start the new game?`,
          () => {
            this.createGameModeMessageBox();
          },
          () => {}
        );
      },
    });
  }

  startPlay() {
    this.resetState();
    this.createTicTacToe();
    this.createStartButton("Re:start!");
    this.startTimer();
    if (this.playerMode === "vs-cpu") {
      if (this.cpuPlayer === this.turnPlayer) {
        this.cpuPlay();
        return;
      }
    }

    this.setTicTacToeCellsInteractive(true);
  }

  createGameModeMessageBox() {
    const destroyComponents = () => {
      if (this.messageBox) {
        this.messageBox.destroy(true);
      }
      if (this.option1MessageBoxButton) {
        this.option1MessageBoxButton.destroy(true);
      }
      if (this.option2MessageBoxButton) {
        this.option2MessageBoxButton.destroy(true);
      }
    };
    destroyComponents();
    this.messageBox = new MessageBox({
      scene: this,
      foreColor: "#f1eeff",
      fontSize: "32px",
      fontFamily: "Potte One",
      text: "ゲームモードをえらんでください",
      backColor: 0x1c1915,
      backAlpha: 0.9,
      borderColor: 0x1c1915,
      height: 480,
      width: 854,
      x: 640,
      y: 360,
    });

    this.option1MessageBoxButton = new Button({
      scene: this,
      fontSize: "48px",
      text: "ノーマル",
      height: 90,
      width: 360,
      x: TicTacToeGameConfig.CANVAS_WIDTH / 2 - 360 / 2 - 16,
      y: 540,
      ...ComponentColor.Button.blue,
      onClick: () => {
        destroyComponents();
        this.gameMode = "normal";
        this.createPlayerModeMessageBox();
      },
    });
    this.option2MessageBoxButton = new Button({
      scene: this,
      fontSize: "48px",
      text: "フェイド",
      height: 90,
      width: 360,
      x: TicTacToeGameConfig.CANVAS_WIDTH / 2 + 360 / 2 + 16,
      y: 540,
      ...ComponentColor.Button.gray,
      onClick: () => {
        destroyComponents();
        this.gameMode = "fade";
        this.createPlayerModeMessageBox();
      },
    });
  }

  createPlayerModeMessageBox() {
    const destroyComponents = () => {
      if (this.messageBox) {
        this.messageBox.destroy(true);
      }
      if (this.option1MessageBoxButton) {
        this.option1MessageBoxButton.destroy(true);
      }
      if (this.option2MessageBoxButton) {
        this.option2MessageBoxButton.destroy(true);
      }
    };

    destroyComponents();

    this.messageBox = new MessageBox({
      scene: this,
      foreColor: "#f1eeff",
      fontSize: "32px",
      fontFamily: "Potte One",
      text: "対戦モードをえらんでください",
      backColor: 0x1c1915,
      backAlpha: 0.9,
      borderColor: 0x1c1915,
      height: 480,
      width: 854,
      x: 640,
      y: 360,
    });

    this.option1MessageBoxButton = new Button({
      scene: this,
      fontSize: "48px",
      text: "vs CPU🤖",
      height: 90,
      width: 360,
      x: TicTacToeGameConfig.CANVAS_WIDTH / 2 - 360 / 2 - 16,
      y: 540,
      ...ComponentColor.Button.gray,
      onClick: () => {
        destroyComponents();
        this.playerMode = "vs-cpu";
        this.createCpuPlayerOrderMessageBox();
      },
    });
    this.option2MessageBoxButton = new Button({
      scene: this,
      fontSize: "48px",
      text: "二人で対戦✌🏻",
      height: 90,
      width: 360,
      x: TicTacToeGameConfig.CANVAS_WIDTH / 2 + 360 / 2 + 16,
      y: 540,
      ...ComponentColor.Button.blue,
      onClick: () => {
        destroyComponents();
        this.playerMode = "vs-player";
        this.createConfirmStartPlayMessageBox();
      },
    });
  }

  createCpuPlayerOrderMessageBox() {
    const destroyComponents = () => {
      if (this.messageBox) {
        this.messageBox.destroy(true);
      }
      if (this.option1MessageBoxButton) {
        this.option1MessageBoxButton.destroy(true);
      }
      if (this.option2MessageBoxButton) {
        this.option2MessageBoxButton.destroy(true);
      }
    };
    destroyComponents();

    const BUTTON_HEIGHT = 90;
    const BUTTON_WIDTH = 360;
    const BUTTON_OFFSET = 16;

    this.messageBox = new MessageBox({
      scene: this,
      foreColor: "#f1eeff",
      fontSize: "32px",
      fontFamily: "Potte One",
      text: "先攻・後攻をえらんでください",
      backColor: 0x1c1915,
      backAlpha: 0.9,
      borderColor: 0x1c1915,
      height: 480,
      width: 854,
      x: 640,
      y: 360,
    });

    this.option1MessageBoxButton = new Button({
      scene: this,
      fontSize: "48px",
      text: "先攻",
      height: BUTTON_HEIGHT,
      width: BUTTON_WIDTH,
      x: TicTacToeGameConfig.CANVAS_WIDTH / 2 - BUTTON_WIDTH / 2 - BUTTON_OFFSET,
      y: 540,
      ...ComponentColor.Button.red,
      onClick: () => {
        destroyComponents();
        this.cpuPlayer = "Player2";
        this.createConfirmStartPlayMessageBox();
      },
    });
    this.option2MessageBoxButton = new Button({
      scene: this,
      fontSize: "48px",
      text: "後攻",
      height: BUTTON_HEIGHT,
      width: BUTTON_WIDTH,
      x: TicTacToeGameConfig.CANVAS_WIDTH / 2 + BUTTON_WIDTH / 2 + BUTTON_OFFSET,
      y: 540,
      ...ComponentColor.Button.blue,
      onClick: () => {
        destroyComponents();
        this.cpuPlayer = "Player1";
        this.createConfirmStartPlayMessageBox();
      },
    });
  }

  createConfirmStartPlayMessageBox(): void {
    const destroyComponents = () => {
      if (this.messageBox) {
        this.messageBox.destroy(true);
      }
      if (this.option1MessageBoxButton) {
        this.option1MessageBoxButton.destroy(true);
      }
      if (this.option2MessageBoxButton) {
        this.option2MessageBoxButton.destroy(true);
      }
    };

    destroyComponents();

    const BUTTON_HEIGHT = 90;
    const BUTTON_WIDTH = 360;
    const BUTTON_OFFSET = 16;

    this.messageBox = new MessageBox({
      scene: this,
      foreColor: "#f1eeff",
      fontSize: "32px",
      fontFamily: "Potte One",
      text: "ゲームを開始します！",
      backColor: 0x1c1915,
      backAlpha: 0.9,
      borderColor: 0x1c1915,
      height: 480,
      width: 854,
      x: 640,
      y: 360,
    });

    this.option1MessageBoxButton = new Button({
      scene: this,
      fontSize: "48px",
      text: "OK",
      height: BUTTON_HEIGHT,
      width: BUTTON_WIDTH,
      x: TicTacToeGameConfig.CANVAS_WIDTH / 2 - BUTTON_WIDTH / 2 - BUTTON_OFFSET,
      y: 540,
      ...ComponentColor.Button.red,
      onClick: () => {
        destroyComponents();
        this.startPlay();
      },
    });
    this.option2MessageBoxButton = new Button({
      scene: this,
      fontSize: "48px",
      text: "Cancel",
      height: BUTTON_HEIGHT,
      width: BUTTON_WIDTH,
      x: TicTacToeGameConfig.CANVAS_WIDTH / 2 + BUTTON_WIDTH / 2 + BUTTON_OFFSET,
      y: 540,
      ...ComponentColor.Button.yellow,
      onClick: () => {
        destroyComponents();
      },
    });
  }

  createMessageBox(text: string): void {
    const destroyComponents = () => {
      if (this.messageBox) {
        this.messageBox.destroy(true);
      }
      if (this.closeMessageBoxButton) {
        this.closeMessageBoxButton.destroy(true);
      }
      if (this.saveResultMessageBoxButton) {
        this.saveResultMessageBoxButton.destroy(true);
      }
    };

    destroyComponents();

    const BUTTON_HEIGHT = 90;
    const BUTTON_WIDTH = 240;

    this.messageBox = new MessageBox({
      scene: this,
      foreColor: TicTacToeGameConfig.FOREGROUND_COLOR,
      fontSize: "32px",
      fontFamily: "Potte One",
      text: text,
      backColor: 0x1c1915,
      backAlpha: 0.9,
      borderColor: 0x1c1915,
      height: 480,
      width: 854,
      x: 640,
      y: 360,
    });

    this.saveResultMessageBoxButton = new Button({
      scene: this,
      fontSize: "36px",
      text: "Save Image",
      height: BUTTON_HEIGHT,
      width: BUTTON_WIDTH,
      x: 480,
      y: 540,
      ...ComponentColor.Button.blue,
      onClick: () => {
        const canvas = document.querySelector<HTMLCanvasElement>(
          ".tic-tac-toe canvas"
        );
        if (canvas) {
          const link = document.createElement("a");
          link.href = canvas.toDataURL("image/png");
          link.download = `${dateUtility.getFileDateString(
            new Date()
          )}--tic-tac-toe-result.png`;
          link.click();
        }
      },
    });

    this.closeMessageBoxButton = new Button({
      scene: this,
      fontSize: "36px",
      text: "Close",
      height: BUTTON_HEIGHT,
      width: BUTTON_WIDTH,
      x: 800,
      y: 540,
      onClick: () => {
        destroyComponents();
      },
    });
  }

  createDialogBox(
    text: string,
    okHandleClick?: () => void,
    cancelHandleClick?: () => void
  ): void {
    if (this.dialogBox) {
      this.dialogBox.destroy(true);
    }
    if (this.okMessageBoxButton) {
      this.okMessageBoxButton.destroy(true);
    }
    if (this.cancelMessageBoxButton) {
      this.cancelMessageBoxButton.destroy(true);
    }

    this.dialogBox = new MessageBox({
      scene: this,
      foreColor: TicTacToeGameConfig.FOREGROUND_COLOR,
      fontSize: "32px",
      fontFamily: "Potte One",
      text: text,
      backColor: 0x1c1915,
      height: 480,
      width: 854,
      x: 640,
      y: 360,
    });
    this.okMessageBoxButton = new Button({
      scene: this,
      fontSize: "48px",
      text: "OK",
      height: 90,
      width: 180,
      x: 540,
      y: 540,
      ...ComponentColor.Button.blue,
      onClick: () => {
        if (this.dialogBox) {
          this.dialogBox.destroy(true);
        }
        if (this.okMessageBoxButton) {
          this.okMessageBoxButton.destroy(true);
        }
        if (this.cancelMessageBoxButton) {
          this.cancelMessageBoxButton.destroy(true);
        }
        if (okHandleClick) {
          okHandleClick();
        }
      },
    });
    this.cancelMessageBoxButton = new Button({
      scene: this,
      fontSize: "48px",
      text: "Cancel",
      height: 90,
      width: 180,
      x: 740,
      y: 540,
      ...ComponentColor.Button.yellow,
      onClick: () => {
        if (this.dialogBox) {
          this.dialogBox.destroy(true);
        }
        if (this.okMessageBoxButton) {
          this.okMessageBoxButton.destroy(true);
        }
        if (this.cancelMessageBoxButton) {
          this.cancelMessageBoxButton.destroy(true);
        }
        if (cancelHandleClick) {
          cancelHandleClick();
        }
      },
    });
  }
}
