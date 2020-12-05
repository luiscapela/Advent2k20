const fs = require("fs");

const contents = fs.readFileSync("day4input.txt", "utf8");
const lines = contents.split(/\r?\n\r?\n/);
let numberOfValidPassaport = 0;

lines.forEach((line) => {
  const passportData = line.split(/ |\r?\n/);
  const passportKeys = passportData.map((passportEntry) => {
    const passportValues = passportEntry.split(/:/);

    return passportValues[0];
  });

  if (
    passportKeys.includes("byr") &&
    passportKeys.includes("iyr") &&
    passportKeys.includes("eyr") &&
    passportKeys.includes("hgt") &&
    passportKeys.includes("hcl") &&
    passportKeys.includes("ecl") &&
    passportKeys.includes("pid")
  ) {
    numberOfValidPassaport = numberOfValidPassaport + 1;
  }
});

console.log("Number of valid passports", numberOfValidPassaport);
