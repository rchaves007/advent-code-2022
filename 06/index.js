const { readFileSync } = require("fs");

const fileData = readFileSync("./data.txt", "utf-8");

const getMarker = (data, amount) => {
  for (let i = 0; i < data.length - amount; i++) {
    if ([...new Set(data.slice(i, i + amount))].length === amount)
      return i + amount;
  }
};

console.log("part 1: ", getMarker(fileData, 4));
console.log("part 2: ", getMarker(fileData, 14));
