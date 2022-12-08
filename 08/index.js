const { readFileSync } = require("fs");

const treeMatrix = readFileSync("./data.txt", "utf-8")
  .split("\r\n")
  .map((s) => s.split("").map(Number));

const defaultValues = () => ({ visibility: 1, isVisible: true });

const checkLeft = (row, col) => {
  let { visibility, isVisible } = defaultValues();
  for (let c = col - 1; c >= 0; c--) {
    if (treeMatrix[row][c] >= treeMatrix[row][col]) isVisible = false;
    if (treeMatrix[row][c] >= treeMatrix[row][col] || c === 0) break;
    visibility++;
  }
  return { isVisible, visibility };
};

const checkRight = (row, col) => {
  let { visibility, isVisible } = defaultValues();
  for (let c = col + 1; c < treeMatrix[row].length; c++) {
    if (treeMatrix[row][c] >= treeMatrix[row][col]) isVisible = false;
    if (
      treeMatrix[row][c] >= treeMatrix[row][col] ||
      c === treeMatrix[row].length - 1
    )
      break;
    visibility++;
  }
  return { isVisible, visibility };
};

const checkUp = (row, col) => {
  let { visibility, isVisible } = defaultValues();
  for (let r = row - 1; r >= 0; r--) {
    if (treeMatrix[r][col] >= treeMatrix[row][col]) isVisible = false;
    if (treeMatrix[r][col] >= treeMatrix[row][col] || r === 0) break;
    visibility++;
  }
  return { isVisible, visibility };
};

const checkDown = (row, col) => {
  let { visibility, isVisible } = defaultValues();
  for (let r = row + 1; r < treeMatrix.length; r++) {
    if (treeMatrix[r][col] >= treeMatrix[row][col]) isVisible = false;
    if (
      treeMatrix[r][col] >= treeMatrix[row][col] ||
      r === treeMatrix.length - 1
    )
      break;
    visibility++;
  }
  return { isVisible, visibility };
};

const checkTree = (row, col) => {
  if (row === 0 || row === treeMatrix.length - 1)
    return { isVisible: true, visibility: 0 };
  if (col === 0 || col === treeMatrix[row].length - 1)
    return { isVisible: true, visibility: 0 };

  const left = checkLeft(row, col);
  const right = checkRight(row, col);
  const up = checkUp(row, col);
  const down = checkDown(row, col);

  return {
    isVisible:
      left.isVisible || right.isVisible || up.isVisible || down.isVisible,
    visibility:
      left.visibility * right.visibility * up.visibility * down.visibility,
  };
};

const treeVisible = [];
const treeVisibility = [];

for (let row = 0; row < treeMatrix.length; row++) {
  for (let col = 0; col < treeMatrix[row].length; col++) {
    const { isVisible, visibility } = checkTree(row, col);
    treeVisible.push(isVisible);
    treeVisibility.push(visibility);
  }
}

console.log(
  "part1:",
  treeVisible.reduce((a, b) => (b ? a + b : a), 0)
);

console.log("part2:", Math.max(...treeVisibility));
