import CrosswordPuzzle from "@/components/CrosswordPuzzle";

export default function Home() {
  return (
    <>
      <div>
        <h1> Crossword Puzzle </h1>
      </div>
      <CrosswordPuzzle
        words={[
          "THIS",
          "IS",
          "HELLO",
          "WORLD",
          "TEST",
          "EXAMPLE",
          "SOLUTION",
          "ACROSS",
        ]}
      />
    </>
  );
}
