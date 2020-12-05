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

console.log("Number of valid passports PART1  ", numberOfValidPassaport);
//PART1

numberOfValidPassaport = 0;
lines.forEach((line) => {
  const passportData = line.split(/ |\r?\n/);
  const passportKeys = passportData.map((passportEntry) => {
    const passportValues = passportEntry.split(/:/);
    const passportKey = passportValues[0];
    const passportValue = passportValues[1];
    if (passportKey === "byr") {
      const numberPassportValue = new Number(passportValue);
      if (numberPassportValue < 1920 || numberPassportValue >= 2003) {
        return "";
      }
    }
    if (passportKey === "iyr") {
      const numberPassportValue = new Number(passportValue);
      if (numberPassportValue < 2010 || numberPassportValue > 2020) {
        return "";
      }
    }
    if (passportKey === "eyr") {
      const numberPassportValue = new Number(passportValue);
      if (numberPassportValue < 2020 || numberPassportValue > 2030) {
        return "";
      }
    }

    if (passportKey === "hgt") {
      const measure = passportValue.slice(-2);
      if (measure === "cm") {
        const height = new Number(passportValue.slice(0, -2));
        if (height < 150 || height > 193) {
          return "";
        }
      } else if (measure === "in") {
        const height = new Number(passportValue.slice(0, -2));
        if (height < 59 || height > 76) {
          return "";
        }
      } else {
        return "";
      }
    }
    if (passportKey === "hcl") {
      if (passportValue.match(/#([0-9]|[a-f]){6}/) === null) {
        return "";
      }
    }
    if (passportKey === "ecl") {
      if (
        passportValue !== "amb" &&
        passportValue !== "blu" &&
        passportValue !== "brn" &&
        passportValue !== "gry" &&
        passportValue !== "grn" &&
        passportValue !== "hzl" &&
        passportValue !== "oth"
      ) {
        return "0";
      }
    }
    if (passportKey === "pid") {
      if (passportValue.match(/^[0-9]{9}$/) === null) {
        return "";
      }
    }
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
console.log("Number of valid passports PART2", numberOfValidPassaport);
