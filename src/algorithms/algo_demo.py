from typing import Generator, Iterator, List, Tuple, Dict, Union
from enum import Enum

# Orientation


class Orientation(Enum):
    ACROSS = 1
    DOWN = 2


def orientationToDelta(orientation):
    if orientation == Orientation.ACROSS:
        return Vector(1, 0)
    elif orientation == Orientation.DOWN:
        return Vector(0, 1)


# Vector


class Vector:
    def __init__(self, x, y):
        self.x = x
        self.y = y

    def add(self, other):
        self.x += other.x
        self.y += other.y

    def div(self, value):
        self.x /= value
        self.y /= value

    def magSq(self):
        return self.x**2 + self.y**2

    def __str__(self):
        return f"({self.x}, {self.y})"

    def __repr__(self):
        return str(self)

    def __eq__(self, other):
        return self.x == other.x and self.y == other.y

    def __hash__(self):
        return hash((self.x, self.y))


def vectorSub(a, b):
    return Vector(a.x - b.x, a.y - b.y)


def vectorMul(a, b):
    return Vector(a.x * b, a.y * b)

# Crossword Puzzle


class CrossWordPuzzle:
    def __init__(self):
        self.dictionary = []
        self.grid = {}

    def __str__(self):
        x_min = y_min = float("inf")
        x_max = y_max = float("-inf")

        for position in self.grid:
            x_min = min(x_min, position.x)
            x_max = max(x_max, position.x)
            y_min = min(y_min, position.y)
            y_max = max(y_max, position.y)

        result = "-" * (x_max - x_min + 1) + "\n"
        for y in range(y_min, y_max + 1):
            for x in range(x_min, x_max + 1):
                if Vector(x, y) in self.grid:
                    result += self.grid[Vector(x, y)]
                else:
                    result += " "
            result += "\n"

        result += "-" * (x_max - x_min + 1) + "\n"

        return result

    def placeWord(self, word, orientation, pos_to_match, offset):
        delta = orientationToDelta(orientation)

        pos = Vector(pos_to_match.x, pos_to_match.y)
        pos.add(vectorMul(delta, -offset))

        if pos in self.grid and self.grid[pos] != word[0]:
            return False, []

        current_pos = Vector(pos.x, pos.y)
        written_positions = []
        for i in range(len(word)):
            if current_pos not in self.grid:
                written_positions.append(Vector(current_pos.x, current_pos.y))
            elif self.grid[current_pos] != word[i]:
                return False, written_positions

            self.grid[Vector(current_pos.x, current_pos.y)] = word[i]

            current_pos.add(delta)

        # check next step is inside grid
        if self.grid.get(current_pos) is not None:
            return False, written_positions

        return True, written_positions

    def findPositionsWithChr(self, char):
        if not self.grid:
            return [Vector(0, 0)]

        positions = []
        average_position = Vector(0, 0)
        count = 0

        for position, letter in self.grid.items():
            if letter == char:
                positions.append(Vector(position.x, position.y))
                average_position.add(position)
                count += 1

        if (count == 0):
            return []

        average_position.div(count)

        # Ideas:
        # sort by distance from center to encourage symmetry
        # punish positions that are too close to each other or even on top of each other
        # punish connections from the start or end of a word
        #

        # sort by distance from average position, smallest to largest
        positions.sort(
            key=lambda pos: vectorSub(pos, average_position).magSq()
        )

        return positions


def createCrosswordHelper(puzzle, rows, cols, index) -> Generator[CrossWordPuzzle, None, None]:
    if index == len(puzzle.dictionary):
        yield puzzle
        return

    for [offset, char] in enumerate(puzzle.dictionary[index]):
        for possible_pos in puzzle.findPositionsWithChr(char):
            for orientation in Orientation:

                # place word
                success, inserted_positions = puzzle.placeWord(
                    puzzle.dictionary[index],
                    orientation,
                    possible_pos,
                    offset
                )

                print("index", index)
                print(puzzle)
                print()

                if success:
                    # recurse
                    for result in createCrosswordHelper(puzzle, rows, cols, index + 1):
                        yield result

                # backtrack
                for written_pos in inserted_positions:
                    del puzzle.grid[written_pos]


def createCrossword(words):
    puzzle = CrossWordPuzzle()

    for word in words:
        puzzle.dictionary.append(word)

    return createCrosswordHelper(puzzle, 0, 0, 0)


def main():
    words = [
        "THIS",
        "IS",
        "HELLO",
        "WORLD",
        "TEST",
        "EXAMPLE",
        "SOLUTION",
        "ACROSS",
    ]

    print("Creating crossword puzzle from words:")
    print(words)

    solutions = createCrossword(words)

    print("Solutions:")

    if solutions is None:
        print("No solution found")
    else:
        for crossword in solutions:
            print(crossword)
            input("Press enter to go to next solution")


main()
