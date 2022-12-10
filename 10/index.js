const { readFileSync } = require("fs");

let x = 1;
let cycle = 1;

const cycleMap = new Map([[cycle, x]]);
const spritePosMap = new Map([[cycle, [1, 2, 3]]]);
const strengthBreakpoints = Array.from({ length: 6 }, (_, i) => 20 + 40 * i);

readFileSync("./data.txt", "utf-8")
  .split("\r\n")
  .map((i) => {
    const [type, value] = i.split(" ");
    const spritePos = [1, 2, 3];
    if (type === "noop") cycle++;
    if (type === "addx") {
      cycle += 2;
      x += Number(value);
    }
    spritePosMap.set(
      cycle,
      spritePos.map((s) => s + x - 1)
    );
    cycleMap.set(cycle, x);
  });

const getValueAt = (map, cycle) => map.get(cycle) || map.get(cycle - 1);

const createCRT = () => {
  for (let row = 0; row < 6; row++) {
    const crtRow = new Array(40)
      .fill(".")
      .map((crt, idx) =>
        getValueAt(spritePosMap, idx + 40 * row + 1).includes(idx + 1)
          ? "#"
          : crt
      );

    console.log(crtRow.join(""));
  }
};

console.log(
  "part1: ",
  strengthBreakpoints.reduce((a, b) => a + b * getValueAt(cycleMap, b), 0)
);
console.log("part2:");
createCRT();
