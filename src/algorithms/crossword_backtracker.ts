import { Orientation, orientationToDelta } from "@/types/Word";
import {
  CrossWordPuzzle,
  crossWordPuzzleToString,
} from "../types/CrossWordPuzzle";

import { Vector, vectorSub } from "@/types/Vector";

export function createCrossword(words: string[]): CrossWordPuzzle | null {
  let puzzle: CrossWordPuzzle = {
    dictionary: [],
    grid: new Map(),
  };

  for (let word of words) {
    puzzle.dictionary.push(word);
  }

  return null;
}
