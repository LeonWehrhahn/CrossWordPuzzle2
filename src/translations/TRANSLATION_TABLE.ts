export interface Translation_Content {
  generator: GeneratorClientTranslations;
}

export type GeneratorClientTranslations = {
  pleaseAddQuestions: string;
  generatingCrossword: string;
  noCrosswordsPossible: string;
  noMoreCrosswordsPossible: string;
  tryChangingQuestions: string;
  regenerateCrossword: string;
  hideSolution: string;
  showSolution: string;
  printCrossword: string;
  question: string;
  answer: string;
  delete: string;
  noQuestionsYet: string;
  solutionWordNotContained: string;
  pleaseChangeSolutionWord: string;
  pleaseFillInBothFields: string;
  add: string;
  solutionWord: string;
  box_width: string;
};

export const TRANSLATION_TABLE: {
  [key: string]: Translation_Content;
} = {
  en: {
    generator: {
      pleaseAddQuestions: "Please add some questions!",
      generatingCrossword: "Generating Crossword Puzzle...",
      noCrosswordsPossible: "No Crossword Puzzle possible with these answers!",
      noMoreCrosswordsPossible:
        "No more Crossword Puzzles possible with these answers!",
      tryChangingQuestions: "Try changing the questions and answers.",
      regenerateCrossword: "Regenerate Crossword Puzzle",
      hideSolution: "Hide Solution",
      showSolution: "Show Solution",
      printCrossword: "Print Crossword Puzzle",
      question: "Question",
      answer: "Answer",
      delete: "Delete",
      noQuestionsYet: "No questions yet!",
      solutionWordNotContained: "Solution word not contained in answers!",
      pleaseChangeSolutionWord: "Please change the solution word!",
      pleaseFillInBothFields: "Please fill in both fields!",
      add: "Add",
      solutionWord: "Solution Word",
      box_width: "Box Width",
    },
  },
  de: {
    generator: {
      pleaseAddQuestions: "Bitte füge Fragen hinzu!",
      generatingCrossword: "Generiere Kreuzworträtsel...",
      noCrosswordsPossible:
        "Kein Kreuzworträtsel möglich mit diesen Antworten!",
      noMoreCrosswordsPossible:
        "Keine weiteren Kreuzworträtsel möglich mit diesen Antworten!",
      tryChangingQuestions: "Versuche die Fragen und Antworten zu ändern.",
      regenerateCrossword: "Kreuzworträtsel neu generieren",
      hideSolution: "Lösung verstecken",
      showSolution: "Lösung zeigen",
      printCrossword: "Kreuzworträtsel drucken",
      question: "Frage",
      answer: "Antwort",
      delete: "Löschen",
      noQuestionsYet: "Noch keine Fragen!",
      solutionWordNotContained: "Lösungswort nicht in Antworten enthalten!",
      pleaseChangeSolutionWord: "Bitte ändere das Lösungswort!",
      pleaseFillInBothFields: "Bitte fülle beide Felder aus!",
      add: "Hinzufügen",
      solutionWord: "Lösungswort",
      box_width: "Kästchenbreite",
    },
  },
};
