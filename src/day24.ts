import { readFileSync } from "fs";
import { resolve } from "path";

const main = () => {
  console.log("~~~ Welcome to Day 24 ~~~");

  const input = readFileSync(
    resolve(__dirname, "../src/day24.txt"),
    "utf8"
  ).trim();

  type Instruction = {
    type: "inp" | "add" | "mul" | "div" | "mod" | "eql";
    params: string[];
  };

  const instructions: Instruction[] = input.split("\n").map((line) => {
    const [type, ...params] = line.split(" ");
    return {
      type,
      params,
    } as Instruction;
  });

  console.log("~~~ Parsed Input ~~~");

  console.log(instructions);

  console.log("~~~ Computing ~~~");

  type State = {
    w: number;
    x: number;
    y: number;
    z: number;
  };

  const execute = (
    program: Instruction[],
    input: number[]
  ): { complete: boolean; state: State } => {
    const state: State = {
      w: 0,
      x: 0,
      y: 0,
      z: 0,
    };

    const valueOfKeyOrNumber = (bVar: string) => {
      if (["w", "x", "y", "z"].includes(bVar)) {
        return state[bVar as keyof State];
      }

      return Number(bVar);
    };

    let inputIdx = 0;
    const nextInput = () => {
      if (inputIdx >= input.length) return null;

      const val = input[inputIdx];

      inputIdx++;

      return val;
    };

    for (const { type, params } of program) {
      if (type === "inp") {
        const inp = nextInput();
        if (inp === null)
          return {
            complete: false,
            state,
          };

        state[params[0] as keyof State] = inp;
      } else if (type === "add") {
        state[params[0] as keyof State] += valueOfKeyOrNumber(params[1]);
      } else if (type === "mul") {
        state[params[0] as keyof State] *= valueOfKeyOrNumber(params[1]);
      } else if (type === "div") {
        state[params[0] as keyof State] /= valueOfKeyOrNumber(params[1]);

        state[params[0] as keyof State] = Math.trunc(
          state[params[0] as keyof State]
        );
      } else if (type === "mod") {
        state[params[0] as keyof State] %= valueOfKeyOrNumber(params[1]);
      } else if (type === "eql") {
        const isEql =
          state[params[0] as keyof State] === valueOfKeyOrNumber(params[1]);

        state[params[0] as keyof State] = isEql ? 1 : 0;
      }
    }

    return { complete: true, state };
  };

  const NUMBER: number[] = [9];

  while (NUMBER.length < 14) {
    let lowestZ = Infinity;
    let lowestZNum = 0;
    for (let i = 9; i > 0; i--) {
      const candidate = [...NUMBER, i];

      const { state } = execute(instructions, candidate);

      if (state.z < lowestZ) {
        lowestZ = state.z;
        lowestZNum = i;
      }
    }

    NUMBER.push(lowestZNum);
  }

  console.log("~~~ Results ~~~~");

  console.log(
    NUMBER.map((n) => String(n)).join(""),
    execute(instructions, NUMBER)
  );

  console.log("~~~ Part Two ~~~");
};

console.log(main());
