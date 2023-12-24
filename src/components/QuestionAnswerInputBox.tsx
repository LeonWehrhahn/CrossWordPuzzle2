import { QuestionAnswer } from "@/types/questions/QuestionAnswer";
import React from "react";
import EditableTable from "./EditableTable";
import { TRANSLATION_TABLE } from "../../public/TRANSLATION_TABLE";

export default function QuestionAnswerInputBox({
  questions,
  setQuestions,
  solutionWord,
  setSolutionWord,
}: {
  questions: QuestionAnswer[];
  setQuestions: React.Dispatch<React.SetStateAction<QuestionAnswer[]>>;
  solutionWord: string;
  setSolutionWord: React.Dispatch<React.SetStateAction<string>>;
}) {
  const locale = "en"
  const [question, setQuestion] = React.useState("");
  const [answer, setAnswer] = React.useState("");

  return (
    <div className="flex flex-col my-4">
      <div className="flex flex-row gap-4">
        <input
          type="text"
          className="p-2 rounded-lg shadow-md"
          placeholder={TRANSLATION_TABLE[locale ?? "en"].question}
          value={question}
          onChange={(e) => setQuestion(e.target.value)}
        />
        <input
          type="text"
          className="p-2 rounded-lg shadow-md"
          placeholder={TRANSLATION_TABLE[locale ?? "en"].answer}
          value={answer}
          onChange={(e) => setAnswer(e.target.value)}
        />
        <button
          className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-lg shadow-md"
          onClick={() => {
            if (question === "" || answer === "") {
              alert(TRANSLATION_TABLE[locale ?? "en"].pleaseFillInBothFields);
              return;
            }

            setQuestions([...questions, { question, answer }]);
            setQuestion("");
            setAnswer("");
          }}
        >
          {TRANSLATION_TABLE[locale ?? "en"].add}
        </button>
      </div>

      <EditableTable questions={questions} setQuestions={setQuestions} />

      <div className="flex items-center justify-center my-4">
        <span className="mr-4 font-semibold">
          {TRANSLATION_TABLE[locale ?? "en"].solutionWord}:{" "}
        </span>
        <input
          type="text"
          className="p-2 rounded-lg shadow-md"
          placeholder="Solution Word"
          value={solutionWord}
          onChange={(e) => setSolutionWord(e.target.value)}
        />
      </div>
    </div>
  );
}
