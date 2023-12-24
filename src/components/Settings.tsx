import React from "react";
import { TRANSLATION_TABLE } from "../../public/TRANSLATION_TABLE";

export default function Settings({
  box_width,
  setBoxWidth,
}: {
  box_width: number;
  setBoxWidth: (box_width: number) => void;
}) {
  const locale = "en";
  return (
    <div className="flex flex-col gap-4">
      <div className="flex flex-row gap-2 items-center">
        <span className="font-semibold">
          {TRANSLATION_TABLE[locale ?? "en"].box_width} [px]:{" "}
        </span>
        <input
          type="number"
          className="w-20 h-10"
          value={box_width}
          min={20}
          onChange={(e) =>
            setBoxWidth(Math.max(20, Math.min(100, parseInt(e.target.value))))
          }
        />
      </div>
    </div>
  );
}
