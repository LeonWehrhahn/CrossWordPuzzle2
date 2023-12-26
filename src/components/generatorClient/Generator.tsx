"use client";

import { useGeneratorTranslations } from "@/providers/TranslationProvider";
import { QuestionAnswer } from "@/types/questions/QuestionAnswer";
import { useState } from "react";
import CrosswordPuzzleGenerator from "./CrosswordPuzzleGenerator";
import QuestionAnswerInputBox from "./QuestionAnswerInputBox";
import Settings from "./Settings";

export default function Generator() {
  const { dictionary } = useGeneratorTranslations();
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

  const [solutionWord, setSolutionWord] = useState<string>("Leon");

  const [box_width, setBoxWidth] = useState(40);

  return (
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
          <h1 className="text-xl">
            {dictionary.pleaseAddQuestions}
          </h1>
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
  );
}
