import { Hashable } from "../HashableMap";

// Represents a 2D vector
export class Vector implements Hashable {
  x: number;
  y: number;

  constructor(x: number, y: number) {
    this.x = x;
    this.y = y;
  }

  add(other: Vector): void {
    this.x += other.x;
    this.y += other.y;
  }

  sub(other: Vector): void {
    this.x -= other.x;
    this.y -= other.y;
  }

  div(n: number): void {
    this.x /= n;
    this.y /= n;
  }

  magSq(): number {
    return this.x ** 2 + this.y ** 2;
  }

  mag(): number {
    return Math.sqrt(this.magSq());
  }

  hash(): any {
    return `${this.x},${this.y}`;
  }
}

export function vectorAdd(a: Vector, b: Vector): Vector {
  return new Vector(a.x + b.x, a.y + b.y);
}

export function vectorSub(a: Vector, b: Vector): Vector {
  return new Vector(a.x - b.x, a.y - b.y);
}

export function vectorDiv(v: Vector, n: number): Vector {
  return new Vector(v.x / n, v.y / n);
}

export function vectorMul(v: Vector, n: number): Vector {
  return new Vector(v.x * n, v.y * n);
}

export type VectorHash = string;
