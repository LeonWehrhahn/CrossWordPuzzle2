"use client";

import CrosswordPuzzleGenerator from "@/components/CrosswordPuzzleGenerator";
import QuestionAnswerInputBox from "@/components/QuestionAnswerInputBox";
import Settings from "@/components/Settings";
import { QuestionAnswer } from "@/types/questions/QuestionAnswer";
import { useEffect, useState } from "react";

export default function Home() {
  const [questions, setQuestions] = useState<QuestionAnswer[]>([
    {
      question: "What is the capital of the United States?",
      answer: "Washington",
    },
    {
      question: "What is the capital of the United Kingdom?",
      answer: "London",
    },
    {
      question: "Who is the current president of the United States?",
      answer: "Joe Biden",
    },
    {
      question: "Who is the current prime minister of the United Kingdom?",
      answer: "Boris Johnson",
    },
  ]);

  const [solutionWord, setSolutionWord] = useState<string>("");

  const [box_width, setBoxWidth] = useState(40);

  return (
    <div className="flex flex-col md:flex-row items-stretch gap-4 justify-between">
      <div className="flex flex-col items-center p-4 gap-4 justify-center">
        <img src="https://placehold.jp/220x580.png" />
        <img src="https://placehold.jp/220x580.png" />
      </div>

      <div className="flex flex-col items-center  p-4  gap-4 flex-grow-0">
        <h1 className="text-4xl"> Crossword Puzzle </h1>

        <QuestionAnswerInputBox
          questions={questions}
          setQuestions={setQuestions}
          solutionWord={solutionWord}
          setSolutionWord={setSolutionWord}
        />

        {questions.length === 0 && (
          <div className="my-10">
            <h1 className="text-xl"> Please add some questions! </h1>
          </div>
        )}

        {questions.length > 0 && (
          <>
            <CrosswordPuzzleGenerator
              questions={questions}
              solutionWord={solutionWord}
              box_width={box_width}
            />

            <Settings box_width={box_width} setBoxWidth={setBoxWidth} />
          </>
        )}
      </div>

      <div className="flex flex-col items-center p-4 gap-4 justify-center">
        <img src="https://placehold.jp/220x580.png" />
        <img src="https://placehold.jp/220x580.png" />
      </div>
    </div>
  );
}
