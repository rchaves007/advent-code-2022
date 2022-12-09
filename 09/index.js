const { readFileSync } = require("fs");

const moves = readFileSync("./data.txt", "utf-8")
  .split("\r\n")
  .map((s) => s.split(" "));

const directions = {
  R: [1, 0],
  L: [-1, 0],
  U: [0, 1],
  D: [0, -1],
};

const moveRope = (ropeSize) => {
  let rope = Array.from({ length: ropeSize }, () => [0, 0]);
  const visitedPos = new Set();

  moves.map(([dir, steps]) => {
    steps = +steps;
    for (let i = 0; i < steps; i++) {
      rope[0] = [
        rope[0][0] + directions[dir][0],
        rope[0][1] + directions[dir][1],
      ];
      for (let j = 1; j < ropeSize; j++) {
        let x = rope[j - 1][0] - rope[j][0];
        let y = rope[j - 1][1] - rope[j][1];

        if (Math.abs(x) > 1) {
          rope[j][0] += x > 0 ? 1 : -1;
          if (y !== 0) rope[j][1] += y > 0 ? 1 : -1;
        } else if (Math.abs(y) > 1) {
          rope[j][1] += y > 0 ? 1 : -1;
          if (x !== 0) rope[j][0] += x > 0 ? 1 : -1;
        }
      }

      visitedPos.add(rope[rope.length - 1].join("-"));
    }
  });
  return visitedPos.size;
};

console.log("part1: ", moveRope(2));
console.log("part2: ", moveRope(10));
