import { HashableMap } from "./HashableMap";
import { Vector, vectorMul, vectorSub } from "./Vector";
import { Orientation, orientationToDelta } from "./Word";

export class CrossWordPuzzle {
  grid: HashableMap<Vector, string>;
  dictionary: string[];

  grids: Record<string, string[][]> = {};

  constructor(grid: HashableMap<Vector, string>, dictionary: string[]) {
    this.grid = grid;

    this.dictionary = dictionary;
  }

  placeWord(
    word: string,
    orientation: Orientation,
    pos_to_match: Vector,
    offset: number
  ): [boolean, Vector[]] {
    const delta = orientationToDelta(orientation);

    const pos = new Vector(pos_to_match.x, pos_to_match.y);
    pos.add(vectorMul(delta, -offset));

    // assure if first letter matches
    if (this.grid.has(pos) && this.grid.get(pos) !== word[0]) {
      return [false, []];
    }

    // assure previous space is empty
    const prev_pos = new Vector(pos.x, pos.y);
    prev_pos.sub(delta);
    if (this.grid.has(prev_pos)) {
      return [false, []];
    }

    const current_pos = new Vector(pos.x, pos.y);
    const written_positions = [];
    for (let i = 0; i < word.length; i++) {
      if (!this.grid.has(current_pos)) {
        written_positions.push(new Vector(current_pos.x, current_pos.y));
      } else if (this.grid.get(current_pos) !== word[i]) {
        return [false, written_positions];
      }

      this.grid.set(new Vector(current_pos.x, current_pos.y), word[i]);
      current_pos.add(delta);
    }

    // check if next space is empty
    const next_pos = new Vector(current_pos.x, current_pos.y);
    if (this.grid.has(next_pos)) {
      return [false, written_positions];
    }

    return [true, written_positions];
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

  to2DArray(): (string | null)[][] {
    const min_x = Math.min(...Array.from(this.grid.keys()).map((v) => v.x));
    const max_x = Math.max(...Array.from(this.grid.keys()).map((v) => v.x));
    const min_y = Math.min(...Array.from(this.grid.keys()).map((v) => v.y));
    const max_y = Math.max(...Array.from(this.grid.keys()).map((v) => v.y));

    const result: (string | null)[][] = [];

    for (let y = min_y; y <= max_y; y++) {
      result.push([]);
      for (let x = min_x; x <= max_x; x++) {
        const pos = new Vector(x, y);
        if (this.grid.has(pos)) {
          result[y - min_y].push(this.grid.get(pos)!);
        } else {
          result[y - min_y].push(null);
        }
      }
    }

    return result;
  }

  toString(): string {
    const result = this.to2DArray()
      .map((row) => row.map((letter) => (letter ? letter : " ")).join(""))
      .join("\n");
    return result;
  }
}
