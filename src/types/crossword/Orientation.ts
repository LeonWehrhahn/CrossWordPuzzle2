import { Vector } from "./Vector";

export enum Orientation {
  HORIZONTAL = "horizontal",
  VERTICAL = "vertical",
}

// Returns the delta vector for the given orientation
export function orientationToDelta(orientation: Orientation): Vector {
  switch (orientation) {
    case Orientation.HORIZONTAL:
      return new Vector(1, 0);
    case Orientation.VERTICAL:
      return new Vector(0, 1);
  }
}

// Returns the String representation of the given orientation
export function orientationToString(orientation: Orientation): string {
  switch (orientation) {
    case Orientation.HORIZONTAL:
      return "ᐅ";
    case Orientation.VERTICAL:
      return "ᐁ";
  }
}
