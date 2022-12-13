const { readFileSync } = require("fs");

const pairs = readFileSync("./data.txt", "utf-8")
  .split("\r\n")
  .map((d) => eval(d))
  .reduce((result, value, index, array) => {
    if (!(value && array[index + 1])) return result;
    result.push(array.slice(index, index + 2));
    return result;
  }, []);

const comparePairs = (left, right) => {
  if (typeof left === "number" && typeof right === "number")
    return left < right ? 1 : left > right ? -1 : 0;

  if (typeof left === "number") return comparePairs([left], right);
  if (typeof right === "number") return comparePairs(left, [right]);

  const minLength = Math.min(left.length, right.length);

  for (let index = 0; index < minLength; index++) {
    const result = comparePairs(left[index], right[index]);
    if (result !== 0) return result;
  }

  return right.length - left.length;
};

let correctPairs = 0;
for (let i = 0; i < pairs.length; i++) {
  const result = comparePairs(pairs[i][0], pairs[i][1]);
  if (result > 0) correctPairs += i + 1;
}

const packets = [...pairs.flat(1), [[2]], [[6]]];
packets.sort(comparePairs).reverse(); // Reversing it because I'm too lazy to reverse the compare method to get the good order

let decoderKey = 1;
for (let i = 0; i < packets.length; i++) {
  if (
    JSON.stringify(packets[i]) === "[[2]]" ||
    JSON.stringify(packets[i]) === "[[6]]"
  )
    decoderKey *= i + 1;
}

console.log("part1: ", correctPairs);
console.log("part2: ", decoderKey);
