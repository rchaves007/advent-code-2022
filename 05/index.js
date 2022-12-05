const { readFileSync } = require("fs");

const stacks = [
  ["W", "B", "D", "N", "C", "F", "J"],
  ["P", "Z", "V", "Q", "L", "S", "T"],
  ["P", "Z", "B", "G", "J", "T"],
  ["D", "T", "L", "J", "Z", "B", "H", "C"],
  ["G", "V", "B", "J", "S"],
  ["P", "S", "Q"],
  ["B", "V", "D", "F", "L", "M", "P", "N"],
  ["P", "S", "M", "F", "B", "D", "L", "R"],
  ["V", "D", "T", "R"],
];

const moveCrates9000 = (stacks, qty, from, to) => {
  for (let i = 0; i < qty; i++) {
    const crate = stacks[from - 1].pop();
    stacks[to - 1].push(crate);
  }
};

const moveCrates9001 = (stacks, qty, from, to) => {
  const crates = stacks[from - 1].splice(-qty);
  stacks[to - 1] = [...stacks[to - 1], ...crates];
};

const getTopCrates = (stacks) => {
  return stacks.map((s) => s[s.length - 1]).join("");
};

const fileData = readFileSync("./data.txt", "utf-8")
  .replaceAll("move", "")
  .replaceAll("from", "")
  .replaceAll("to", "")
  .replace(/  +/g, " ")
  .split("\r\n");

const moves = fileData.map((s) => s.trim().split(" ").map(Number));

const stacks1 = structuredClone(stacks);
const stacks2 = structuredClone(stacks);
moves.forEach((m) => {
  moveCrates9000(stacks1, m[0], m[1], m[2]);
  moveCrates9001(stacks2, m[0], m[1], m[2]);
});

console.log(stacks2);

console.log("part1: ", getTopCrates(stacks1));
console.log("part2: ", getTopCrates(stacks2));
