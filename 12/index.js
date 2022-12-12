const {readFileSync} = require("fs");

const directions = [
  [1, 0],
  [-1, 0],
  [0, 1],
  [0, -1],
];

const getCoords = (pos) => `${pos[0]},${pos[1]}`;

const data = readFileSync("./data.txt", "utf-8").split("\r\n");

const findFastestPath = (reversed) => {
  let start = [0, 0];
  let end = [0, 0];

  const heightMap = data.map((column, columnIndex) =>
    column.split("").map((row, rowIndex) => {
      if (!reversed) {
        if (row === "S") start = [rowIndex, columnIndex];
        if (row === "E") end = [rowIndex, columnIndex];
      } else if (row === "E") start = [rowIndex, columnIndex];

      row = row === "S" ? "a" : row === "E" ? "z" : row;
      return row.charCodeAt(0);
    })
  );

  const queue = [[start]];
  const visited = [getCoords(start)];
  let closestPath = [];

  while (queue.length > 0 && closestPath.length === 0) {
    const path = queue.shift();
    const [x, y] = path[path.length - 1];

    for (const direction of directions) {
      const newX = x + direction[0];
      const newY = y + direction[1];
      const newCoords = getCoords([newX, newY]);

      if (newX < 0 || newX >= heightMap[0].length) continue;
      if (newY < 0 || newY >= heightMap.length) continue;
      if (visited.includes(newCoords)) continue;

      if (!reversed && heightMap[newY][newX] - heightMap[y][x] > 1) continue;
      if (reversed && heightMap[y][x] - heightMap[newY][newX] > 1) continue;

      if (!reversed && newX === end[0] && newY === end[1])
        closestPath = [...path];
      if (reversed && heightMap[newY][newX] === "a".charCodeAt(0))
        closestPath = [...path];

      visited.push(newCoords);
      queue.push(path.concat([[newX, newY]]));
    }
  }
  return closestPath.length;
};

console.log("part1: ", findFastestPath());
console.log("part2: ", findFastestPath(true));
