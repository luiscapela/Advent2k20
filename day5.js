const fs = require("fs");

const contents = fs.readFileSync("day5input.txt", "utf8");
const lines = contents.split(/\r?\n/);
let biggestSeatId = 0;

//console.log(lines); //test1
lines.forEach((boardingPass) => {
  const regex0 = /F|L/gi;
  const boardingPassInBinary0 = boardingPass.replace(regex0, "0");
  const regex1 = /B|R/gi;
  const boardingPassInBinary1 = boardingPassInBinary0.replace(regex1, "1");
  const row = boardingPassInBinary1.substring(0, 7);
  const column = boardingPassInBinary1.substring(7);
  const rowNumber = parseInt(row, 2);
  const columnNumber = parseInt(column, 2);
  const seatID = rowNumber * 8 + columnNumber;
  //console.log(seatID);
  if (seatID > biggestSeatId) {
    biggestSeatId = seatID;
  }
});
console.log("The Big Seat Id is:", biggestSeatId);
