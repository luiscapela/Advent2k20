const fs = require("fs");

const contents = fs.readFileSync("day6input.txt", "utf8");
const groups = contents.split(/\r?\n\r?\n/);
let sumOfQuestions = 0;
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
