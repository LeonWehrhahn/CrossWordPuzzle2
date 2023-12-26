"usce client";

import { QuestionAnswer } from "@/types/questions/QuestionAnswer";
import React from "react";
import { useTranslation } from "@/providers/TranslationProvider";
import { GeneratorClientTranslations } from "@/translations/TRANSLATION_TABLE";

export default function EditableTable({
  questions,
  setQuestions,
}: {
  questions: QuestionAnswer[];
  setQuestions: React.Dispatch<React.SetStateAction<QuestionAnswer[]>>;
}) {
  const { dictionary } = useTranslation<GeneratorClientTranslations>();

  return (
    <table className="table table-zebra w-full mt-10 bg-white shadow-md rounded-lg border border-solid border-gray-300">
      <colgroup>
        <col style={{ width: "45%" }} />
        <col style={{ width: "45%" }} />
        <col style={{ width: "10%" }} />
      </colgroup>
      <thead>
        <tr className=" text-gray-600 text-sm leading-normal">
          <th className="border px-4 py-2">
            {dictionary.question}
          </th>
          <th className="border px-4 py-2">
            {dictionary.answer}
          </th>
          <th className="border px-4 py-2">
            {dictionary.delete}
          </th>
        </tr>
      </thead>
      <tbody>
        {questions.length === 0 && (
          <tr>
            <td colSpan={3} className="border px-4 py-2 text-center">
              {dictionary.noQuestionsYet}
            </td>
          </tr>
        )}
        {questions.map((question, i) => (
          <tr key={i}>
            <td className="py-2 px-4">
              <textarea
                className="outline-none resize-none w-full bg-transparent"
                placeholder="Question"
                value={question.question}
                contentEditable
                onChange={(e) => {
                  const newQuestions = [...questions];
                  newQuestions[i].question = e.target.value;
                  setQuestions(newQuestions);
                }}
              />
            </td>
            <td className="py-2 px-4">
              <textarea
                className="outline-none resize-none w-full bg-transparent"
                placeholder="Answer"
                value={question.answer}
                onChange={(e) => {
                  const newQuestions = [...questions];
                  newQuestions[i].answer = e.target.value;
                  setQuestions(newQuestions);
                }}
              />
            </td>
            <td className="p-1">
              <button
                className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded-lg"
                onClick={() =>
                  setQuestions(questions.filter((_, j) => j !== i))
                }
              >
                {dictionary.delete}
              </button>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}
