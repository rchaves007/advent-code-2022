const { readFileSync } = require("fs");

const data = readFileSync("./data.txt", "utf-8")
  .split("\r\n")
  .map((a) => a.split(" -> ").map((b) => b.split(",").map(Number)));

const add = (set, y, x) => {
  let walls = set.get(y);
  if (!walls?.length) walls = [];
  if (!walls.includes(x)) set.set(y, [...walls, x]);
};
const generateCave = () => {
  const caveWalls = new Map();

  for (const line of data) {
    for (let index = 0; index < line.length - 1; index++) {
      const dx = Math.abs(line[index][0] - line[index + 1][0]);
      const startX = Math.min(line[index][0], line[index + 1][0]);
      for (let i = 0; i < dx + 1; i++) {
        add(caveWalls, startX + i, line[index][1]);
      }

      const dy = Math.abs(line[index][1] - line[index + 1][1]);
      const startY = Math.min(line[index][1], line[index + 1][1]);
      for (let i = 0; i < dy + 1; i++) {
        add(caveWalls, line[index][0], startY + i);
      }
    }
  }
  return caveWalls;
};

const generateFloor = (cave, floorX) => {
  const walls = [...cave.keys()].sort();

  for (let i = walls[0] - 200; i < walls[walls.length - 1] + 200; i++) {
    add(cave, i, floorX);
  }
};

const getLowestLevelOn = (wallsMap, level, currentX) => {
  let walls = wallsMap.get(level);
  if (!walls) return;

  return walls.sort((a, b) => a - b).find((w) => w > currentX) - 1;
};

const dropSand = (wallsMap, currentY, currentX, floorX) => {
  const lowestX = getLowestLevelOn(wallsMap, currentY, currentX);
  if (lowestX === undefined)
    return floorX ? { x: floorX, y: currentY } : undefined;

  const leftX = getLowestLevelOn(wallsMap, currentY - 1, lowestX);
  if (leftX === undefined)
    return floorX ? { x: floorX, y: currentY - 1 } : undefined;

  const rightX = getLowestLevelOn(wallsMap, currentY + 1, lowestX);
  if (rightX === undefined)
    return floorX ? { x: floorX, y: currentY + 1 } : undefined;

  if (leftX > lowestX) {
    return dropSand(wallsMap, currentY - 1, leftX, floorX);
  } else if (rightX > lowestX) {
    return dropSand(wallsMap, currentY + 1, rightX, floorX);
  } else return { x: lowestX, y: currentY };
};

const simulateSandAbyss = (wallsMap, floorX) => {
  let onAbyss = false;
  let onTop = false;
  let sand = 0;
  let sandMap = new Map(JSON.parse(JSON.stringify(Array.from(wallsMap))));
  while (!onAbyss && !onTop) {
    let currentY = 500;
    let currentX = 0;

    const newPosition = dropSand(sandMap, currentY, currentX, floorX);

    if (!floorX && !newPosition) {
      onAbyss = true;
      continue;
    }

    if (floorX && newPosition.x === 0 && newPosition.y === 500) {
      onTop = true;
      sand++;
      continue;
    }

    add(sandMap, newPosition.y, newPosition.x);
    sand++;
  }

  return sand;
};

const cave = generateCave();
const floorX = Math.max(...[...cave.values()].flat()) + 2;
console.log("part1:", simulateSandAbyss(cave));
generateFloor(cave, floorX);
console.log("part2:", simulateSandAbyss(cave, floorX));
