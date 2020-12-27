const fs = require("fs");

const contents = fs.readFileSync("day7input.txt", "utf8");
const rules = contents.split(/\r?\n/);

const dependencies = {};

rules.forEach((rule) => {
  const [firstPart, secondPart] = rule
    .split("bags contain")
    .map((str) => str.trim());

  //console.log("1", firstPart, "2", secondPart);
  const dependents = secondPart.split(",").map((dependent) => {
    const bag = dependent.trim().split(" ").slice(1, -1).join(" ");
    // console.log("bag", bag);
    return bag;
  });

  dependencies[firstPart] = new Set(dependents);
});

const setOfBags = new Set();

const toFind = "shiny gold";

const findAndIncrement = (bag) => {
  Object.entries(dependencies).forEach(([key, value]) => {
    if (value.has(bag)) {
      setOfBags.add(key);
      findAndIncrement(key);
    }
  });
};

findAndIncrement(toFind);

console.log("Number of bags", setOfBags.size);

const newDependencies = {};

rules.forEach((rule) => {
  const [firstPart, secondPart] = rule
    .split("bags contain")
    .map((str) => str.trim());

  if (secondPart === "no other bags.") {
    return;
  }

  //console.log("1", firstPart, "2", secondPart);
  const dependents = secondPart.split(",").map((dependent) => {
    const numberOfBags = Number(dependent.trim().split(" ")[0]);
    const bag = dependent.trim().split(" ").slice(1, -1).join(" ");
    // console.log("bag", bag);
    return { numberOfBags, bag };
  });

  newDependencies[firstPart] = new Set(dependents);
});

const findAndMultiply = (bag) => {
  if (!newDependencies[bag]) {
    return 0;
  }
  return Array.from(newDependencies[bag]).reduce(
    (acc, curBag) => {
      const numberOfBags =
        curBag.numberOfBags + curBag.numberOfBags * findAndMultiply(curBag.bag);

      return acc + numberOfBags;
    },

    0
  );
};

console.log("Number of bags part 2", findAndMultiply(toFind));
