const { readFileSync } = require("fs");

const instructions = readFileSync("./data.txt", "utf-8").split("\r\n");

const directories = [];

class TreeNode {
  constructor(path, parent = null) {
    this.path = path;
    this.size = 0;
    this.parent = parent;
    directories.push(this);
  }

  addSize(size) {
    this.size += size;
    this.parent?.addSize(size);
  }
}

function getPath(currentNode, node) {
  if (node === "/") return node;
  if (node === "..") return currentNode.parent?.path || currentNode.path;

  const delimiter = currentNode.path.endsWith("/") ? "" : "/";
  return `${currentNode.path}${delimiter}${node}`;
}

function createDirTree() {
  let currentNode = new TreeNode("/");

  instructions.forEach((i) => {
    const inst = i.split(" ");
    if (inst[0] === "$" && inst[1] === "ls") return;

    if (inst[0] === "$" && inst[1] === "cd")
      return (currentNode = directories.find(
        (d) => d.path === getPath(currentNode, inst[2])
      ));

    if (inst[0] === "dir")
      return new TreeNode(getPath(currentNode, inst[1]), currentNode);

    currentNode.addSize(Number(inst[0]));
  });
}

createDirTree();

console.log(
  "part1: ",
  directories.reduce((a, b) => (b.size <= 100000 ? a + b.size : a), 0)
);

console.log(
  "part2: ",
  Math.min(
    ...directories.reduce(
      (a, b) =>
        70000000 - directories[0].size + b.size >= 30000000
          ? [...a, b.size]
          : a,
      []
    )
  )
);
