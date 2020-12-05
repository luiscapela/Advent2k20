const fs = require("fs");

const contents = fs.readFileSync("day3input.txt", "utf8");
const lines = contents.split(/\r?\n/);
const firstLine = lines[0];
const patternLength = firstLine.length;
let numberOfTrees = 0;

const calculateNumberOfTrees = (rightNumber, downNumber) => {
  let numberOfTrees = 0;
  const availableLines = lines.filter((line, index) => {
    if (index % downNumber === 0) {
      return true;
    } else {
      return false;
    }
  });
  availableLines.forEach((line, index) => {
    if (index === 0) {
      return;
    }

    const position = (index * rightNumber) % patternLength;

    const place = line[position];

    if (place === "#") {
      numberOfTrees = numberOfTrees + 1;
    }
  });
  return numberOfTrees;
};

const totalNumberOfTrees =
  calculateNumberOfTrees(1, 1) *
  calculateNumberOfTrees(3, 1) *
  calculateNumberOfTrees(5, 1) *
  calculateNumberOfTrees(7, 1) *
  calculateNumberOfTrees(1, 2);
console.log("Number part2: ", totalNumberOfTrees);
console.log("Number part1: ", calculateNumberOfTrees(3, 1));
