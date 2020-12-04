const fs = require("fs");
/* example
  1-3 a: abcde
  1-3 b: cdefg
  2-9 c: ccccccccc
*/
const contents = fs.readFileSync("day2input.txt", "utf8");
const lines = contents.split(/\r?\n/);

let numberOfValidPasswords = 0;

lines.forEach((line) => {
  const [rule, password] = line.split(": ");
  const [limits, ruleLetter] = rule.split(" ");
  const [lowerLimit, upperLimit] = limits
    .split("-")
    .map((numberAsString) => Number(numberAsString));

  const passwordSplitted = password.split("");
  const ruleLetterOccurrences = passwordSplitted.filter(
    (letter) => letter === ruleLetter
  ).length;

  const isPasswordValid =
    ruleLetterOccurrences >= lowerLimit && ruleLetterOccurrences <= upperLimit;

  if (isPasswordValid) {
    numberOfValidPasswords += 1;
  }
});

console.log("Number of valid passwords V1: ", numberOfValidPasswords);

const XOR = (a, b) => {
  return (a || b) && !(a && b);
};

numberOfValidPasswords = 0;
lines.forEach((line) => {
  const [rule, password] = line.split(": ");
  const [positions, ruleLetter] = rule.split(" ");
  const [firstPosition, secondPosition] = positions
    .split("-")
    .map((numberAsString) => Number(numberAsString));

  const isLetterAtFirstTheRuleLetter =
    password[firstPosition - 1] === ruleLetter;
  const isLetterAtSecondTheRuleLetter =
    password[secondPosition - 1] === ruleLetter;

  const isPasswordValid = XOR(
    isLetterAtFirstTheRuleLetter,
    isLetterAtSecondTheRuleLetter
  );

  if (isPasswordValid) {
    numberOfValidPasswords += 1;
  }
});

console.log("Number of valid passwords V2: ", numberOfValidPasswords);
