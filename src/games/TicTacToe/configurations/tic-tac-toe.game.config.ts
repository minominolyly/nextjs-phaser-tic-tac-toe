const ROW_COLUMN_COUNT: number = 3;
const FOREGROUND_COLOR: string = "#d7c0a3";
const BACKGROUND_COLOR: string = "#191510";
const CANVAS_WIDTH: number = 1280;
const CANVAS_HEIGHT: number = 720;
const TIC_TAC_TOE_CELL_SIZE: number = 200;
const TIC_TAC_TOE_WIDTH: number = ROW_COLUMN_COUNT * TIC_TAC_TOE_CELL_SIZE;
const TIC_TAC_TOE_HEIGHT: number = ROW_COLUMN_COUNT * TIC_TAC_TOE_CELL_SIZE;
const TIC_TAC_TOE_OFFSET_X: number = (CANVAS_WIDTH / 2) - (TIC_TAC_TOE_WIDTH / 2);
const TIC_TAC_TOE_OFFSET_Y: number = (CANVAS_HEIGHT / 2) - (TIC_TAC_TOE_HEIGHT / 2);

const TicTacToeGameConfig = {
  ROW_COLUMN_COUNT,
  FOREGROUND_COLOR,
  BACKGROUND_COLOR,
  CANVAS_WIDTH,
  CANVAS_HEIGHT,
  TIC_TAC_TOE_CELL_SIZE,
  TIC_TAC_TOE_WIDTH,
  TIC_TAC_TOE_HEIGHT,
  TIC_TAC_TOE_OFFSET_X,
  TIC_TAC_TOE_OFFSET_Y,
};

export default TicTacToeGameConfig;
