"use client";

import CrosswordPuzzleGenerator from "@/components/CrosswordPuzzleGenerator";
import QuestionAnswerInputBox from "@/components/QuestionAnswerInputBox";
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

  const [box_width, setBoxWidth] = useState(40);

  return (
    <div className="flex flex-col items-center w-screen p-4">
      <h1 className="text-4xl"> Crossword Puzzle </h1>

      <QuestionAnswerInputBox
        questions={questions}
        setQuestions={setQuestions}
      />

      {questions.length === 0 && (
        <div className="my-10">
          <h1 className="text-xl"> Please add some questions! </h1>
        </div>
      )}

      {questions.length > 0 && (
        <CrosswordPuzzleGenerator questions={questions} box_width={box_width} />
      )}
    </div>
  );
}
