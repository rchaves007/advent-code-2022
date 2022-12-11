const { readFileSync } = require("fs");

const monkeys = [];

const createInspectFunction = (operator, factor) => {
  if (operator === "+") return (worry) => worry + Number(factor);
  if (Number(factor)) return (worry) => worry * Number(factor);
  return (worry) => worry * worry;
};

readFileSync("./data.txt", "utf-8")
  .split("\r\n")
  .map((d) => {
    const completeInfo = d.split(":");
    if (completeInfo[1] === undefined) return;
    if (completeInfo[1]?.trim() === "") monkeys.push({ inspections: 0 });
    const monkey = monkeys[monkeys.length - 1];
    if (completeInfo[0].includes("items"))
      monkey.items = completeInfo[1]?.trim().split(", ").map(Number);
    if (completeInfo[0].includes("Operation")) {
      const operation = completeInfo[1]?.trim().split(" ");
      monkey.onInspect = createInspectFunction(operation[3], operation[4]);
    }
    if (completeInfo[0].includes("Test"))
      monkey.test = Number(completeInfo[1]?.trim().split(" ")[2]);
    if (completeInfo[0].includes("true"))
      monkey.success = Number(completeInfo[1]?.trim().split(" ")[3]);
    if (completeInfo[0].includes("false"))
      monkey.failure = Number(completeInfo[1]?.trim().split(" ")[3]);
  });

function simulateRounds(rounds) {
  const moduleValue = monkeys.reduce((prev, monkey) => prev * monkey.test, 1);
  for (let i = 0; i < rounds; i++) {
    monkeys.forEach((monkey) => {
      while (monkey.items.length) {
        let item = monkey.items.pop();
        // Part1:
        // item = Math.floor(afterInspect(monkey.onInspect(item)) / 3);
        // Part2:
        item = monkey.onInspect(item % moduleValue);
        const monkeyTo =
          item % monkey.test === 0 ? monkey.success : monkey.failure;
        monkeys[monkeyTo].items.push(item);

        monkey.inspections++;
      }
    });
  }
}

simulateRounds(10000);

const inspections = monkeys
  .map((monkey) => monkey.inspections)
  .sort((a, b) => b - a)
  .slice(0, 2)
  .reduce((a, b) => a * b);

console.log("top2", inspections);
