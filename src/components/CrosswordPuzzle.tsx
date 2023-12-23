"use client";

import { createCrossword } from "@/algorithms/crossword_backtracker";
import { CrossWordPuzzle } from "@/types/CrossWordPuzzle";
import { useEffect, useState } from "react";

function renderCrossword(crossword: (string | null)[][]) {
  return (
    <div className="flex flex-col">
      {crossword.map((row, i) => (
        <div key={i} className="flex flex-row">
          {row.map((letter, j) => (
            <div className="w-10 h-10 border-2 border-black flex justify-center items-center">
              <span> {letter || " "}</span>
            </div>
          ))}
        </div>
      ))}
    </div>
  );
}

export default function CrosswordPuzzle({ words }: { words: string[] }) {
  const [currCrosswordNumber, setCurrCrosswordNumber] = useState(0);

  const [crossword_generator, setCrosswordGenerator] = useState<
    IterableIterator<CrossWordPuzzle>
  >(createCrossword(words));

  const [currentCrossword, setCurrentCrossword] =
    useState<CrossWordPuzzle | null>(null);

  useEffect(() => {
    const next = crossword_generator.next();
    if (next.done) {
      const newCrosswordGenerator = createCrossword(words);
      setCrosswordGenerator(newCrosswordGenerator);
      setCurrentCrossword(newCrosswordGenerator.next().value);
    } else {
      setCurrentCrossword(next.value);
    }
  }, [currCrosswordNumber]);

  return (
    <div>
      <h1>{currentCrossword ? "Crossword Puzzle" : "Not Possible"}</h1>
      {currentCrossword && renderCrossword(currentCrossword.to2DArray())}
      <button onClick={() => setCurrCrosswordNumber(currCrosswordNumber + 1)}>
        Next
      </button>
    </div>
  );
}
