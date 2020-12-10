const { group } = require("console");
const fs = require("fs");

const contents = fs.readFileSync("day6input.txt", "utf8");
const groups = contents.split(/\r?\n\r?\n/);
let sumOfQuestions = 0;
let numberOfQuestions = 0;
groups.forEach((group) => {
  const yesQuestions = new Set();

  const lines = group.split(/\r?\n/);
  lines.forEach((line) => {
    const letters = line.split("");
    letters.forEach((letter) => {
      yesQuestions.add(letter);
    });
  });

  sumOfQuestions = yesQuestions.size + sumOfQuestions;
});
console.log("Number of yes questions: ", sumOfQuestions);

groups.forEach((group) => {
  const lines = group.split(/\r?\n/);
  const firstLine = lines[0];
  const lettersFirstLine = firstLine.split("");
  lettersFirstLine.forEach((letterFirstLine) => {
    const letterExistInEveryLine = lines.slice(1).every((line) => {
      if (line.includes(letterFirstLine)) {
        return true;
      }

      return false;
    });

    if (letterExistInEveryLine) {
      numberOfQuestions = numberOfQuestions + 1;
    }
  });
});
console.log("Every yes questions: ", numberOfQuestions);
