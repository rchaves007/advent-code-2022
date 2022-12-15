const { readFileSync } = require("fs");

const getDistance = (a, b) => {
  return Math.abs(a[0] - b[0]) + Math.abs(a[1] - b[1]);
};

const sensors = readFileSync("./data.txt", "utf-8")
  .split("\r\n")
  .map((line) =>
    line.split(":").map((t) =>
      t
        .split(" ")
        .filter((x) => x.includes("x=") || x.includes("y="))
        .join("")
        .split(",")
        .map((c) => Number(c.substring(2)))
    )
  )
  .reduce((result, value) => {
    const distance = getDistance(value[0], value[1]);
    const edges = [];
    for (let i = distance; i >= 0; i--) {
      edges.push([value[0][0] + i + 1, value[0][1] - Math.abs(distance - i)]);
      edges.push([value[0][0] - i - 1, value[0][1] - Math.abs(distance - i)]);
    }
    const sensor = {
      sensor: value[0],
      beacon: value[1],
      distance,
      edges,
    };
    return [...result, sensor];
  }, []);

const cannotContain = (targetY) => {
  const places = new Set();
  for (const sensor of sensors) {
    const rangeX = sensor.distance - Math.abs(sensor.sensor[1] - targetY);
    if (rangeX < 0) continue;
    for (
      let i = sensor.sensor[0] - rangeX;
      i <= sensor.sensor[0] + rangeX;
      i++
    ) {
      if (sensor.beacon[1] === targetY && sensor.beacon[0] === i) continue;
      if (places.has(i)) continue;
      places.add(i);
    }
  }
  return places.size;
};

const checkIfImpossible = (edge, maxDim) => {
  const [x, y] = edge;
  if (x < 0 || x > maxDim) return true;
  if (y < 0 || y > maxDim) return true;

  for (const { sensor, distance } of sensors) {
    const edgeDistance = getDistance(edge, sensor);
    if (distance >= edgeDistance) return true;
  }
  return false;
};

const findHiddenBeacon = (maxDim) => {
  for (const { edges } of sensors) {
    for (const edge of edges) {
      if (!checkIfImpossible(edge, maxDim)) return edge[0] * maxDim + edge[1];
    }
  }
};

console.log("part1: ", cannotContain(2000000));
console.log("part2: ", findHiddenBeacon(4000000));
