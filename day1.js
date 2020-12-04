var fs = require("fs");

var contents = fs.readFileSync("day1input.txt", "utf8");
const lines = contents.split(/\r?\n/);
const numbers = lines.map((number) => {
  return Number(number);
});

numbers.forEach((number, index) => {
  const followingNumbers = numbers.slice(index + 1);
  followingNumbers.forEach((nextNumber) => {
    const sum = number + nextNumber;
    if (sum === 2020) {
      console.log("Apanhei-te", number, nextNumber);
      console.log(number * nextNumber);
    }
  });
});

numbers.forEach((number, index) => {
  const followingNumbers = numbers.slice(index + 1);
  followingNumbers.forEach((nextNumber, nextNumberIndex) => {
    const nextNumberFollowingNumbers = numbers.slice(nextNumberIndex + 1);
    nextNumberFollowingNumbers.forEach((nextNextNumber) => {
      const sum = number + nextNumber + nextNextNumber;
      if (sum === 2020) {
        console.log("Apanhei-te outra vez", number, nextNumber, nextNextNumber);
        console.log(number * nextNumber * nextNextNumber);
      }
    });
  });
});
