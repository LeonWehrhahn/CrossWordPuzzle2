import { HashableMap } from "../HashableMap";
import { Vector, vectorMul, vectorSub } from "./Vector";
import { Orientation, orientationToDelta } from "./Orientation";
import { QuestionAnswer } from "../questions/QuestionAnswer";

export class CrossWordPuzzle {
  grid: HashableMap<Vector, string>;
  word_starts: HashableMap<Vector, [Orientation, number][]>;
  questions: QuestionAnswer[];

  sorted_questions: QuestionAnswer[];

  constructor(
    grid: HashableMap<Vector, string>,
    questions: QuestionAnswer[],
    word_starts: HashableMap<Vector, [Orientation, number][]>
  ) {
    this.grid = grid;
    this.word_starts = word_starts;
    this.questions = questions;
    this.sorted_questions = [...questions].sort(
      (a, b) => b.answer.length - a.answer.length
    );
  }

  placeWord(
    word: string,
    orientation: Orientation,
    pos_to_match: Vector,
    offset: number
  ): [boolean, Vector[], Vector] {
    const delta = orientationToDelta(orientation);

    const pos_start = vectorSub(pos_to_match, vectorMul(delta, offset));

    // assure if first letter matches
    if (this.grid.has(pos_start) && this.grid.get(pos_start) !== word[0]) {
      return [false, [], pos_start];
    }

    // assure previous space is empty
    const prev_pos = vectorSub(pos_start, delta);
    if (this.grid.has(prev_pos)) {
      return [false, [], pos_start];
    }

    const current_pos = new Vector(pos_start.x, pos_start.y);
    const written_positions = [];
    for (let i = 0; i < word.length; i++) {
      if (!this.grid.has(current_pos)) {
        written_positions.push(new Vector(current_pos.x, current_pos.y));
      } else if (this.grid.get(current_pos) !== word[i]) {
        return [false, written_positions, pos_start];
      }

      this.grid.set(new Vector(current_pos.x, current_pos.y), word[i]);
      current_pos.add(delta);
    }

    // check if next space is empty
    const next_pos = new Vector(current_pos.x, current_pos.y);
    if (this.grid.has(next_pos)) {
      return [false, written_positions, pos_start];
    }

    return [true, written_positions, pos_start];
  }

  findPositionsWithLetter(letter: string): Vector[] {
    if (this.grid.size === 0) {
      return [new Vector(0, 0)];
    }

    // brute force search
    const positions = [];
    for (const [position, grid_letter] of this.grid.entries()) {
      if (grid_letter === letter) {
        positions.push(position);
      }
    }

    if (positions.length === 0) {
      return [];
    }

    // sort by distance from average position, smallest to largest
    function getAveragePosition(positions: Vector[]): Vector {
      const result = new Vector(0, 0);
      for (const position of positions) {
        result.add(position);
      }
      result.div(positions.length);
      return result;
    }

    function getMaxDistanceSq(positions: Vector[], average: Vector): number {
      let result = 1;
      for (const position of positions) {
        result = Math.max(result, vectorSub(position, average).magSq());
      }
      return result;
    }

    const average = getAveragePosition(positions);
    const max_distance_sq = getMaxDistanceSq(positions, average);

    function distanceFromAverage01(position: Vector): number {
      return vectorSub(position, average).magSq() / max_distance_sq;
    }

    positions.sort(
      (a, b) => distanceFromAverage01(a) - distanceFromAverage01(b)
    );

    return positions;
  }

  toFiniteGrid(): [
    (string | null)[][],
    HashableMap<Vector, [Orientation, number][]>
  ] {
    const min_x = Math.min(...Array.from(this.grid.keys()).map((v) => v.x));
    const max_x = Math.max(...Array.from(this.grid.keys()).map((v) => v.x));
    const min_y = Math.min(...Array.from(this.grid.keys()).map((v) => v.y));
    const max_y = Math.max(...Array.from(this.grid.keys()).map((v) => v.y));

    const grid: (string | null)[][] = [];
    const word_starts: HashableMap<Vector, [Orientation, number][]> =
      new HashableMap();

    for (let y = min_y; y <= max_y; y++) {
      grid.push([]);
      for (let x = min_x; x <= max_x; x++) {
        const pos = new Vector(x, y);
        if (this.grid.has(pos)) {
          grid[y - min_y].push(this.grid.get(pos)!);
        } else {
          grid[y - min_y].push(null);
        }
      }
    }

    for (const [position, starts] of this.word_starts.entries()) {
      const new_pos = new Vector(position.x - min_x, position.y - min_y);
      if (!word_starts.has(new_pos)) {
        word_starts.set(new_pos, []);

        for (const [orientation, index] of starts) {
          word_starts.get(new_pos)!.push([orientation, index]);
        }
      }
    }

    return [grid, word_starts];
  }

  toString(): string {
    const [grid, word_starts] = this.toFiniteGrid();

    let result = grid
      .map((row) => row.map((letter) => (letter ? letter : " ")).join(""))
      .join("\n");

    for (const [position, starts] of word_starts.entries()) {
      for (const [orientation, index] of starts) {
        result += `\n${position.x},${position.y} ${orientation} ${this.questions[index]}`;
      }
    }

    return result;
  }

  clone(): CrossWordPuzzle {
    const new_grid = new HashableMap<Vector, string>();
    for (const [position, letter] of this.grid.entries()) {
      new_grid.set(new Vector(position.x, position.y), letter);
    }

    const new_word_starts = new HashableMap<Vector, [Orientation, number][]>();
    for (const [position, starts] of this.word_starts.entries()) {
      new_word_starts.set(new Vector(position.x, position.y), [...starts]);
    }

    return new CrossWordPuzzle(new_grid, [...this.questions], new_word_starts);
  }
}
