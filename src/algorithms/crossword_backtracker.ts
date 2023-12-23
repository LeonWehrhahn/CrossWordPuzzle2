import { Orientation } from "@/types/crossword/Orientation";
import { CrossWordPuzzle } from "../types/crossword/CrossWordPuzzle";

import { HashableMap } from "@/types/HashableMap";
import { QuestionAnswer } from "@/types/questions/QuestionAnswer";

// Creates an iterator that yields all possible crosswords for the given questions
export function* crosswordIterator(
  questions: QuestionAnswer[]
): IterableIterator<CrossWordPuzzle> {
  let escaped_questions = questions.map((question) => {
    return {
      question: question.question,
      answer: question.answer.toUpperCase().replace(" ", "⎵"),
    } as QuestionAnswer;
  });

  const puzzle = new CrossWordPuzzle(
    new HashableMap(),
    escaped_questions,
    new HashableMap()
  );

  yield* createCrosswordHelper(puzzle, 0);
}

// Helper function for crosswordIterator that recursively creates crosswords
function* createCrosswordHelper(
  puzzle: CrossWordPuzzle,
  index: number
): IterableIterator<CrossWordPuzzle> {
  if (index === puzzle.sorted_questions.length) {
    yield puzzle;
    return;
  }

  const word = puzzle.sorted_questions[index].answer;

  for (let offset = 0; offset < word.length; offset++) {
    const char = word[offset];

    for (const possible_pos of puzzle.findPositionsWithLetter(char)) {
      for (const orientation of [
        Orientation.HORIZONTAL,
        Orientation.VERTICAL,
      ]) {
        // place word
        const [success, inserted_positions, start_pos] = puzzle.placeWord(
          word,
          orientation,
          possible_pos,
          offset
        );

        // recurse if successful
        if (success) {
          if (!puzzle.word_starts.has(start_pos)) {
            puzzle.word_starts.set(start_pos, []);
          }

          puzzle.word_starts.get(start_pos)!.push([orientation, index]);

          yield* createCrosswordHelper(puzzle, index + 1);

          puzzle.word_starts.get(start_pos)!.pop();
        }

        // backtrack
        for (const written_pos of inserted_positions) {
          puzzle.grid.delete(written_pos);
        }
      }
    }
  }
}
