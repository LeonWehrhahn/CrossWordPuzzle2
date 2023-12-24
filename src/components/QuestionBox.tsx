import { CrossWordPuzzle } from "@/types/crossword/CrossWordPuzzle";
import React from "react";
import { TRANSLATION_TABLE } from "../../public/TRANSLATION_TABLE";

export default function QuestionBox({
  crossword,
  showSolution,
}: {
  crossword: CrossWordPuzzle;
  showSolution: boolean;
}) {
  const locale = "en"
  return (
    <div>
      <table className="table table-zebra w-full my-4 bg-white shadow-md rounded-lg border border-solid border-gray-300">
        <colgroup>
          {showSolution && (
            <>
              <col style={{ width: "10%" }} />
              <col style={{ width: "45%" }} />
              <col style={{ width: "45%" }} />
            </>
          )}
          {!showSolution && (
            <>
              <col style={{ width: "10%" }} />
              <col style={{ width: "90%" }} />
            </>
          )}
        </colgroup>
        <thead className="text-center">
          <tr className=" text-gray-600 text-sm leading-normal">
            <th className="border px-4 py-2 text-center">#</th>
            <th className="border px-4 py-2">
              {TRANSLATION_TABLE[locale ?? "en"].question}
            </th>
            {showSolution && (
              <th className="border px-4 py-2">
                {TRANSLATION_TABLE[locale ?? "en"].answer}
              </th>
            )}
          </tr>
        </thead>

        <tbody>
          {crossword.questions.map((question, i) => (
            <tr
              key={question.question + "," + question.answer}
              className=" text-gray-600 text-sm leading-normal"
            >
              <td className="border px-4 py-2 text-center">{i + 1}</td>
              <td className="border px-4 py-2">{question.question}</td>
              {showSolution && (
                <td className="border px-4 py-2">{question.answer}</td>
              )}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
