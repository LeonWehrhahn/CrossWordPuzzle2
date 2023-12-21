import { Word } from "./Word";
import { Vector } from "./Vector";

export interface CrossWordPuzzle {
  dictionary: string[];
  grid: Map<Vector, string>;
}

export function crossWordPuzzleToString(puzzle: CrossWordPuzzle): string {
  let x_min = Number.MAX_SAFE_INTEGER;
  let x_max = Number.MIN_SAFE_INTEGER;

  let y_min = Number.MAX_SAFE_INTEGER;
  let y_max = Number.MIN_SAFE_INTEGER;

  for (let pos of puzzle.grid.keys()) {
    x_min = Math.min(x_min, pos.x);
    x_max = Math.max(x_max, pos.x);

    y_min = Math.min(y_min, pos.y);
    y_max = Math.max(y_max, pos.y);
  }

  let grid: string[][] = [];
  for (let i = 0; i <= y_max - y_min; i++) {
    grid.push([]);
    for (let j = 0; j <= x_max - x_min; j++) {
      grid[i].push(".");
    }
  }

  console.log(puzzle);
  for (let [pos, char] of puzzle.grid.entries()) {
    grid[pos.y - y_min][pos.x - x_min] = char;
  }

  let output = "";
  for (let row of grid) {
    output += row.join("") + "\n";
  }

  return output;
}
