import { HashableMap } from "@/types/HashableMap";
import { CrossWordPuzzle } from "@/types/crossword/CrossWordPuzzle";
import {
  Orientation,
  orientationToString,
} from "@/types/crossword/Orientation";
import { Vector } from "@/types/crossword/Vector";
import React from "react";

function Block({
  letter,
  pos,
  word_starts,
  showSolution,
}: {
  letter: string;
  pos: Vector;
  word_starts: HashableMap<Vector, [Orientation, number][]>;
  showSolution: boolean;
}) {
  let starts: [Orientation, number][] = [];

  if (word_starts.has(pos)) {
    starts = word_starts.get(pos)!;
  }

  return (
    <div className="w-full h-full border-gray-800 border-2 flex justify-center items-center border-r-4 border-b-4 relative">
      <>
        <span className="absolute top-0 left-0 text-xs px-1 text-gray-600">
          {starts.map(([orientation, index]) => (
            <span key={orientationToString(orientation) + "," + index}>
              {index + 1}
              <br />
            </span>
          ))}
        </span>

        <span className="absolute top-0 right-0 text-xs px-1 text-gray-600">
          {starts.map(([orientation, index]) => (
            <span key={orientationToString(orientation) + "," + index}>
              {orientationToString(orientation)}
              <br />
            </span>
          ))}
        </span>
      </>

      {showSolution && (
        <span className="text-2x font-bold text-black">{letter}</span>
      )}
    </div>
  );
}

export default function Grid({
  crossword,
  showSolution,
  box_width,
}: {
  crossword: CrossWordPuzzle;
  showSolution: boolean;
  box_width: number;
}) {
  const [grid, word_starts] = crossword.toFiniteGrid();

  return (
    <div className="flex flex-col my-4">
      {grid.map((row, i) => (
        <div key={i} className="flex flex-row">
          {row.map((letter, j) => (
            <div
              key={j}
              className={`m-1`}
              style={{ width: box_width + "px", height: box_width + "px" }}
            >
              {letter && (
                <Block
                  letter={letter}
                  pos={new Vector(j, i)}
                  word_starts={word_starts}
                  showSolution={showSolution}
                />
              )}
            </div>
          ))}
        </div>
      ))}
    </div>
  );
}
