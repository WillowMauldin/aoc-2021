import { readFileSync } from "fs";
import { resolve } from "path";

const main = () => {
  console.log("~~~ Welcome to Day 25 ~~~");

  const input = readFileSync(
    resolve(__dirname, "../src/day25.txt"),
    "utf8"
  ).trim();

  const parsed = input.split("\n").map((line) => {
    return line.split("");
  });

  console.log("~~~ Parsed Input ~~~");

  console.log(parsed);

  console.log("~~~ Computing ~~~");

  let state = parsed;
  let ticks = 0;

  let hadMovement = false;
  do {
    ticks++;
    hadMovement = false;

    let lastState = state;
    let nextState = state.map((line) => {
      return line.join("").split("");
    });

    for (let x = 0; x < state.length; x++) {
      for (let y = 0; y < state[0].length; y++) {
        const atPos = lastState[x][y];
        if (atPos === ".") continue;
        if (atPos === ">") {
          const destY = (y + 1) % state[0].length;
          const destX = x;

          const canMove = lastState[destX][destY] === ".";

          if (canMove) {
            nextState[x][y] = ".";
            nextState[destX][destY] = ">";
            hadMovement = true;
          }
        }
      }
    }

    lastState = nextState;
    nextState = lastState.map((line) => {
      return line.join("").split("");
    });

    for (let x = 0; x < state.length; x++) {
      for (let y = 0; y < state[0].length; y++) {
        const atPos = lastState[x][y];
        if (atPos === ".") continue;
        if (atPos === "v") {
          const destY = y;
          const destX = (x + 1) % state.length;

          const canMove =
            lastState[destX][destY] === "." && nextState[destX][destY] === ".";
          if (canMove) {
            nextState[x][y] = ".";
            nextState[destX][destY] = "v";
            hadMovement = true;
          }
        }
      }
    }

    state = nextState;
  } while (hadMovement);

  console.log("~~~ Results ~~~~");

  console.log(ticks);

  console.log("~~~ Part Two ~~~");
};

console.log(main());
