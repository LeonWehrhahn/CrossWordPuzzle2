import CrosswordPuzzle from "@/components/CrosswordPuzzle";

export default function Home() {
  return (
    <>
      <div>
        <h1>Home</h1>
      </div>
      <CrosswordPuzzle words={["hello", "world"]} />
    </>
  );
}
