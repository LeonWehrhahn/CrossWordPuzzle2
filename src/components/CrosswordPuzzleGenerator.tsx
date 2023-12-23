"use client";

import { crosswordIterator } from "@/algorithms/crossword_backtracker";
import { HashableMap } from "@/types/HashableMap";
import { CrossWordPuzzle } from "@/types/crossword/CrossWordPuzzle";
import { Orientation } from "@/types/crossword/Orientation";
import { Vector } from "@/types/crossword/Vector";
import { QuestionAnswer } from "@/types/questions/QuestionAnswer";
import { useEffect, useMemo, useRef, useState } from "react";
import Grid from "./Grid";
import QuestionBox from "./QuestionBox";
import ReactToPrint, { useReactToPrint } from "react-to-print";

export default function CrosswordPuzzleGenerator({
  questions,
  box_width,
}: {
  questions: QuestionAnswer[];
  box_width: number;
}) {
  const [currentCrossword, setCurrentCrossword] = useState<CrossWordPuzzle>();
  const [showSolution, setShowSolution] = useState(false);

  const crosswords = useMemo(() => {
    return crosswordIterator(questions);
  }, [questions]);

  const proceedToNextCrossword = () => {
    setCurrentCrossword(crosswords.next().value?.clone());
  };

  useEffect(() => {
    console.log(questions);
  }, [questions]);

  useEffect(() => {
    proceedToNextCrossword();
  }, [questions]);

  let componentRef = useRef(null);

  const handlePrint = useReactToPrint({
    content: () => componentRef.current,
    bodyClass: "flex flex-col items-center w-screen h-screen p-4",
    documentTitle: "Crossword Puzzle",
    copyStyles: true,
  });

  return (
    <div className="flex flex-col items-center my-10 w-full">
      {!currentCrossword && (
        <div>
          <h1> It is not possible to generate such a crossword puzzle </h1>
        </div>
      )}
      {currentCrossword && (
        <>
          <div className="flex flex-row gap-4">
            <button
              className="bg-green-500 hover:bg-green-600 my-4 text-white font-bold py-2 px-4 rounded-lg shadow-md"
              onClick={proceedToNextCrossword}
            >
              Regenerate Crossword
            </button>

            <button
              className="bg-blue-500 hover:bg-blue-700 my-4 text-white font-bold py-2 px-4 rounded-lg shadow-md"
              onClick={() => setShowSolution(!showSolution)}
            >
              {showSolution ? "Hide Solution" : "Show Solution"}
            </button>
            <button
              className="bg-blue-500 hover:bg-blue-700 my-4 text-white font-bold py-2 px-4 rounded-lg shadow-md"
              onClick={handlePrint}
            >
              Print Crossword
            </button>
          </div>

          <div ref={componentRef}>
            <Grid
              crossword={currentCrossword}
              showSolution={showSolution}
              box_width={box_width}
            />

            <QuestionBox
              crossword={currentCrossword}
              showSolution={showSolution}
            />
          </div>
        </>
      )}
    </div>
  );
}
