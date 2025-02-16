import "./style.css";

type calcActions = "-" | "+" | "/" | "*";

let query: (string | number)[] = [];

let stack: string[] = [];
let calcStack: number[] = [];

let operatorPrecedence: Map<string, number> = new Map([
  ["+", 11],
  ["-", 11],
  ["*", 12],
  ["/", 12],
]);

const calcStr = "1 + 3 * 5 - 6 * (7 + 5 - 4 * 1) / 4 - 5 * 6 + 3";

const regex = /\d+|[+/*-]/g;

function clearStack(): void {
  query.push(stack.at(-1) as string);
  stack.pop();
}

function processCalcString(str: string): void {
  let arr: string[] = str.match(regex) as string[];
  for (let i = 0; i < arr.length; i++) {
    if (Number(arr[i])) {
      query.push(+arr[i]);
    }

    if (/[*/+-]/.test(arr[i])) {
      if (stack.length === 0 || stack.at(-1) === "(") {
        stack.push(arr[i]);
      } else if (
        (operatorPrecedence.get(arr[i]) as unknown as number) >
        (operatorPrecedence.get(stack.at(-1) as string) as unknown as number)
      ) {
        stack.push(arr[i]);
      } else {
        clearStack();
        i--;
      }
    }

    if (arr[i] === "(") {
      stack.push(arr[i]);
    }

    if (arr[i] === ")") {
      while (stack.at(-1) !== "(") {
        clearStack();
      }
      stack.pop();
    }
  }
  query = query.concat(stack.reverse());
}

processCalcString(calcStr);

function calcString(arr: (string | number)[]): number {
  let answ: number;
  for (let i = 0; i < arr.length; i++) {
    console.log(i + " " + calcStack);
    if (Number(arr[i])) {
      calcStack.push(arr[i] as number);
    } else {
      console.log(i + " " + arr[i] + " " + calcStack);
      answ = calcAction(
        arr[i] as calcActions,
        calcStack.at(-1) as number,
        calcStack.at(-2) as number
      );
      calcStack.pop();
      calcStack.pop();
      calcStack.push(answ);
    }
  }
  return 0;
}

calcString(query);

console.log(query);
console.log(calcStack);
//56*29-+.

function calcAction(action: calcActions, num_1: number, num_2: number): number {
  switch (action) {
    case "*":
      return num_2 * num_1;
    case "-":
      return num_2 - num_1;
    case "+":
      return num_2 + num_1;
    case "/":
      return num_2 / num_1;
    default:
      break;
  }
}
