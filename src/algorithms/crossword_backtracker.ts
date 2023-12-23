import { Orientation, orientationToDelta } from "@/types/Word";
import { CrossWordPuzzle } from "../types/CrossWordPuzzle";

import { Vector, vectorSub } from "@/types/Vector";
import { HashableMap } from "@/types/HashableMap";

export function* createCrossword(
  words: string[]
): IterableIterator<CrossWordPuzzle> {
  const puzzle = new CrossWordPuzzle(
    new HashableMap(),
    [...words].sort((a, b) => b.length - a.length)
  );

  const crosswords = createCrosswordHelper(puzzle, 0);
  for (const crossword of crosswords) {
    yield crossword;
  }
}

function* createCrosswordHelper(
  puzzle: CrossWordPuzzle,
  index: number
): IterableIterator<CrossWordPuzzle> {
  if (index === puzzle.dictionary.length) {
    yield puzzle;
    return;
  }

  const word = puzzle.dictionary[index];

  for (let offset = 0; offset < word.length; offset++) {
    const char = word[offset];

    for (const possible_pos of puzzle.findPositionsWithLetter(char)) {
      for (const orientation of [
        Orientation.HORIZONTAL,
        Orientation.VERTICAL,
      ]) {
        // place word
        const [success, inserted_positions] = puzzle.placeWord(
          word,
          orientation,
          possible_pos,
          offset
        );

        if (success) {
          // recurse
          const results = createCrosswordHelper(puzzle, index + 1);

          for (const result of results) {
            yield result;
          }
        }

        // backtrack
        for (const written_pos of inserted_positions) {
          puzzle.grid.delete(written_pos);
        }
      }
    }
  }
}
