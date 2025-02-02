"use client";
import AppConfig from "@/configurations/app.config";
import TicTacToeGameConfig from "@/games/TicTacToe/configurations/tic-tac-toe.game.config";
import TicTacToeGame from "@/games/TicTacToe/TicTacToeGame";
import { AUTO } from "phaser";
import { useEffect, useRef, useState } from "react";

export default function TicTacToe() {
  const [game, setGame] = useState<TicTacToeGame | null>(null);
  const gameDivRef = useRef<HTMLDivElement>(null);
  useEffect(() => {
    if (!gameDivRef.current) {
      return;
    }
    if (game === null) {
      const newGame = new TicTacToeGame({
        type: AUTO,
        width: 1280,
        height: 720,
        url: `${AppConfig.BASE_URL}`,
        parent: gameDivRef.current,
        scale: {
          mode: Phaser.Scale.ScaleModes.FIT,
          autoCenter: Phaser.Scale.Center.CENTER_HORIZONTALLY,
          parent: gameDivRef.current,
          zoom: Phaser.Scale.Zoom.MAX_ZOOM,
        },
        backgroundColor: TicTacToeGameConfig.BACKGROUND_COLOR,
        preserveDrawingBuffer: true,
      });
      setGame(newGame);
    }

    return () => {
      if (game) {
        game.destroy(true);
        setGame(null);
      }
    };
  }, [game]);

  return (
    <div className="game-container" style={{ width: "100%", height: "auto" }}>
      <div ref={gameDivRef} className="game tic-tac-toe" />
    </div>
  );
}
