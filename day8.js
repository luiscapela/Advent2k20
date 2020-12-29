const fs = require("fs");

const contents = fs.readFileSync("day8input.txt", "utf8");
const rawInstructions = contents.split(/\r?\n/);

const instructions = rawInstructions.map((rawInstruction) => {
  const [operation, argument] = rawInstruction.split(" ");

  return { operation, argument: Number(argument) };
});

const INSTRUCTIONS = {
  jmp: "jmp",
  acc: "acc",
  nop: "nop",
};

const runInstruction = (
  instructions,
  instructionIndex = 0,
  accumulator = 0,
  visitedInstructions = {},
  history = []
) => {
  const { operation, argument } = instructions[instructionIndex];
  history.push({ instructionIndex, accumulator });
  let newIndex = instructionIndex;
  let newAccumulator = accumulator;

  visitedInstructions[instructionIndex] = true;

  if (operation === INSTRUCTIONS.nop) {
    newIndex = instructionIndex + 1;
  } else if (operation === INSTRUCTIONS.acc) {
    newIndex = instructionIndex + 1;
    newAccumulator = accumulator + argument;
  } else if (operation === INSTRUCTIONS.jmp) {
    newIndex = instructionIndex + argument;
  }

  if (visitedInstructions[newIndex]) {
    return { newAccumulator, instructionIndex, history };
  }

  if (newIndex === instructions.length) {
    console.log("Finished execution successfully");
    return { newAccumulator, instructionIndex, history };
  }

  return runInstruction(
    instructions,
    newIndex,
    newAccumulator,
    visitedInstructions,
    history
  );
};

let { newAccumulator, instructionIndex, history } = runInstruction(
  instructions
);

console.log(
  "Accumulador value before infinite loop: ",
  newAccumulator,
  "on instruction index: ",
  instructionIndex
);

const reverseHistory = history.reverse();

let hasFoundFinalAnswer = false;

reverseHistory.forEach(({ instructionIndex }) => {
  if (hasFoundFinalAnswer) {
    return;
  }
  if (instructions[instructionIndex].operation === INSTRUCTIONS.jmp) {
    instructions[instructionIndex].operation = INSTRUCTIONS.nop;

    let {
      newAccumulator,
      instructionIndex: finalInstructionIndex,
    } = runInstruction(instructions);
    if (finalInstructionIndex === instructions.length - 1) {
      console.log("final acc", newAccumulator);
      hasFoundFinalAnswer = true;
    } else {
      instructions[instructionIndex].operation = INSTRUCTIONS.jmp;
    }
  } else if (instructions[instructionIndex].operation === INSTRUCTIONS.nop) {
    if (
      instructions[instructionIndex].argument + instructionIndex >
        instructions.length ||
      instructions[instructionIndex].argument + instructionIndex <= 0
    ) {
      return;
    }
    instructions[instructionIndex].operation = INSTRUCTIONS.jmp;

    let {
      newAccumulator,
      instructionIndex: finalInstructionIndex,
    } = runInstruction(instructions);
    if (finalInstructionIndex === instructions.length - 1) {
      console.log("final acc", newAccumulator);
      hasFoundFinalAnswer = true;
    } else {
      instructions[instructionIndex].operation = INSTRUCTIONS.jmp;
    }
  }
});
