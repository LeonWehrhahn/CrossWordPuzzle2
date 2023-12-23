import { HashableMap } from "@/types/HashableMap";
import { CrossWordPuzzle } from "@/types/crossword/CrossWordPuzzle";
import {
  Orientation,
  orientationToString,
} from "@/types/crossword/Orientation";
import { Vector } from "@/types/crossword/Vector";
import React from "react";

function cyrb128(str: string) {
  let h1 = 1779033703,
    h2 = 3144134277,
    h3 = 1013904242,
    h4 = 2773480762;
  for (let i = 0, k; i < str.length; i++) {
    k = str.charCodeAt(i);
    h1 = h2 ^ Math.imul(h1 ^ k, 597399067);
    h2 = h3 ^ Math.imul(h2 ^ k, 2869860233);
    h3 = h4 ^ Math.imul(h3 ^ k, 951274213);
    h4 = h1 ^ Math.imul(h4 ^ k, 2716044179);
  }
  h1 = Math.imul(h3 ^ (h1 >>> 18), 597399067);
  h2 = Math.imul(h4 ^ (h2 >>> 22), 2869860233);
  h3 = Math.imul(h1 ^ (h3 >>> 17), 951274213);
  h4 = Math.imul(h2 ^ (h4 >>> 19), 2716044179);
  (h1 ^= h2 ^ h3 ^ h4), (h2 ^= h1), (h3 ^= h1), (h4 ^= h1);
  return [h1 >>> 0, h2 >>> 0, h3 >>> 0, h4 >>> 0];
}

function sfc32(a: number, b: number, c: number, d: number) {
  return function () {
    a |= 0;
    b |= 0;
    c |= 0;
    d |= 0;
    var t = (((a + b) | 0) + d) | 0;
    d = (d + 1) | 0;
    a = b ^ (b >>> 9);
    b = (c + (c << 3)) | 0;
    c = (c << 21) | (c >>> 11);
    c = (c + t) | 0;
    return (t >>> 0) / 4294967296;
  };
}

function Block({
  letter,
  pos,
  word_starts,
  solutionWordPositions,
  showSolution,
}: {
  letter: string;
  pos: Vector;
  word_starts: HashableMap<Vector, [Orientation, number][]>;
  solutionWordPositions: HashableMap<Vector, number>;
  showSolution: boolean;
}) {
  let starts: [Orientation, number][] = [];

  if (word_starts.has(pos)) {
    starts = word_starts.get(pos)!;
  }

  let isSolutionPosition = solutionWordPositions.has(pos);

  return (
    <div
      className={`w-full h-full border-gray-800 border-2 flex justify-center items-center border-r-4 border-b-4 relative ${
        isSolutionPosition ? "bg-yellow-200" : ""
      }`}
    >
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

      {isSolutionPosition && (
        <span className="absolute bottom-0 right-0 text-xs px-1 text-red-600">
          {solutionWordPositions.get(pos)! + 1}
        </span>
      )}

      {showSolution && (
        <span className="text-2x font-bold text-black">{letter}</span>
      )}
    </div>
  );
}

export default function Grid({
  crossword,
  solutionWord,
  showSolution,
  box_width,
}: {
  crossword: CrossWordPuzzle;
  solutionWord: string;
  showSolution: boolean;
  box_width: number;
}) {
  const escapedSolutionWord = solutionWord.toUpperCase().replace(" ", "⎵");
  const [grid, word_starts] = crossword.toFiniteGrid();

  //find random positions for the solution word
  const solutionWordPositions: HashableMap<Vector, number> = new HashableMap();

  const seed = cyrb128(escapedSolutionWord);
  var rand = sfc32(seed[0], seed[1], seed[2], seed[3]);

  let positions: Map<string, Vector[]> = new Map();

  for (let i = 0; i < grid.length; i++) {
    for (let j = 0; j < grid[0].length; j++) {
      const vector = new Vector(j, i);
      const letter = grid[i][j];
      if (letter && escapedSolutionWord.includes(letter)) {
        positions.set(letter, [...(positions.get(letter) ?? []), vector]);
      }
    }
  }

  for (let i = 0; i < escapedSolutionWord.length; i++) {
    const letter = escapedSolutionWord[i];
    const possiblePositions = positions.get(letter);
    if (possiblePositions && possiblePositions.length > 0) {
      const randomIndex = Math.floor(rand() * possiblePositions.length);
      const randomPosition = possiblePositions[randomIndex];
      solutionWordPositions.set(randomPosition, i);
      positions.set(
        letter,
        possiblePositions.filter((_, j) => j !== randomIndex)
      );
    } else {
      return (
        <div className="my-14">
          <h1 className="text-xl font-bold text-center ">
            The solution word is not present in the crossword puzzle!
          </h1>
          <p> Please try again with a different solution word. </p>
        </div>
      );
    }
  }

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
                  solutionWordPositions={solutionWordPositions}
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
