import { Vector } from "./Vector";

export enum Orientation {
  HORIZONTAL = "horizontal",
  VERTICAL = "vertical",
}

export function orientationToDelta(orientation: Orientation): Vector {
  switch (orientation) {
    case Orientation.HORIZONTAL:
      return new Vector(1, 0);
    case Orientation.VERTICAL:
      return new Vector(0, 1);
  }
}
