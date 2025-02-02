"use client";
import dynamic from "next/dynamic";

export default function GameElement() {
  const TicTacToe = dynamic(() => import("./TicTacToe"), {
    ssr: false,
    loading: () => (
      <div>
        <div className="centering">
          {"loading..."}
        </div>
      </div>
    ),
  });
  return <TicTacToe />;
}
