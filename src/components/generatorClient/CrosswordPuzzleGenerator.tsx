"use client";

import { crosswordIterator } from "@/algorithms/crossword_backtracker";
import { CrossWordPuzzle } from "@/types/crossword/CrossWordPuzzle";
import { QuestionAnswer } from "@/types/questions/QuestionAnswer";
import { useEffect, useMemo, useRef, useState } from "react";
import Grid from "./Grid";
import QuestionBox from "./QuestionBox";
import { useReactToPrint } from "react-to-print";
import { useTranslation } from "@/providers/TranslationProvider";
import { GeneratorClientTranslations } from "@/translations/TRANSLATION_TABLE";

export default function CrosswordPuzzleGenerator({
  questions,
  solutionWord,
  box_width,
}: {
  questions: QuestionAnswer[];
  solutionWord: string;
  box_width: number;
}) {
  const { dictionary } = useTranslation<GeneratorClientTranslations>();

  const [currentCrossword, setCurrentCrossword] = useState<
    CrossWordPuzzle | undefined | null
  >(undefined);
  const [showSolution, setShowSolution] = useState(false);

  const [atleastOneSolution, setAtleastOneSolution] = useState(false);

  const crosswords = useMemo(() => {
    return crosswordIterator(questions);
  }, [questions]);

  const proceedToNextCrossword = () => {
    let next = crosswords.next().value;
    if (!next) {
      setCurrentCrossword(null);
    } else {
      setAtleastOneSolution(true);
      setCurrentCrossword(next.clone());
    }
  };

  useEffect(() => {
    proceedToNextCrossword();
    setAtleastOneSolution(false);
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
      {currentCrossword === undefined && (
        <div>
          <h1>{dictionary.generatingCrossword}</h1>
        </div>
      )}
      {currentCrossword === null && (
        <div>
          {atleastOneSolution && (
            <>
              <h1 className="text-xl">
                {dictionary.noMoreCrosswordsPossible}
              </h1>
              <> {dictionary.tryChangingQuestions} </>
            </>
          )}
          {!atleastOneSolution && (
            <h1 className="text-xl">
              {dictionary.noCrosswordsPossible}
            </h1>
          )}
        </div>
      )}
      {currentCrossword && (
        <>
          <div className="flex flex-row gap-4">
            <button
              className="bg-green-500 hover:bg-green-600 my-4 text-white font-bold py-2 px-4 rounded-lg shadow-md"
              onClick={() => proceedToNextCrossword()}
            >
              {dictionary.regenerateCrossword}
            </button>

            <button
              className="bg-blue-500 hover:bg-blue-700 my-4 text-white font-bold py-2 px-4 rounded-lg shadow-md"
              onClick={() => setShowSolution(!showSolution)}
            >
              {showSolution
                ? dictionary.hideSolution
                : dictionary.showSolution}
            </button>
            <button
              className="bg-blue-500 hover:bg-blue-700 my-4 text-white font-bold py-2 px-4 rounded-lg shadow-md"
              onClick={handlePrint}
            >
              {dictionary.printCrossword}
            </button>
          </div>

          <div ref={componentRef}>
            <Grid
              crossword={currentCrossword}
              solutionWord={solutionWord}
              showSolution={showSolution}
              box_width={box_width}
            />

            {/* force page break when printing */}
            <div className="break-after-page" />

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
