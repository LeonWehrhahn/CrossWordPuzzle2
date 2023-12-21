import { createCrossword } from "@/algorithms/crossword_backtracker";
import { crossWordPuzzleToString } from "@/types/CrossWordPuzzle";

export default function CrosswordPuzzle({ words }: { words: string[] }) {
  let crossword = createCrossword(words);

  console.log(crossword);

  if (crossword) {
    console.log(crossWordPuzzleToString(crossword));
    crossWordPuzzleToString(crossword);
  }

  return (
    <div>
      <h1>{crossword ? "Crossword Puzzle" : "Not Possible"}</h1>
    </div>
  );
}
