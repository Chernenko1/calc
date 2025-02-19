type calcActions = "-" | "+" | "/" | "*";
type inputActions = 'CE' | 'C';

let query: (string | number)[] = [];

let stack: string[] = [];
let calcStack: number[] = [];

const operatorPrecedence: { [key: string]: number } = {
  "+": 11,
  "-": 11,
  "*": 12,
  "/": 12
}

const calcStr = "(3+4)*(2/(1-5)+6)";
const regex = /\d+|[+/*()-]/g;

function clearStack(): void {
  query.push(stack.pop() as string);
}

function processCalcString(str: string): void {
  let arr: string[] = str.match(regex) as string[];

  for (let i = 0; i < arr.length; i++) {
    if (Number(arr[i])) {
      query.push(+arr[i]);
      continue

    } else if (/[*/+-]/.test(arr[i])) {
      while (
        stack.length &&
        stack.at(-1) !== "(" &&
        (operatorPrecedence[arr[i]] as number) <=
          (operatorPrecedence[stack.at(-1) as string] as number)
      ) {
          clearStack();
      }  stack.push(arr[i]);
    }  else if (arr[i] === "(") {
      stack.push(arr[i]);
    } else if (arr[i] === ")") {
      while (stack.at(-1) !== "(") {
        clearStack();
      }
      stack.pop();
    }
  }
  query.push(...stack.reverse());

  //   if (/[*/+-]/.test(arr[i])) {
  //     if (stack.length === 0 || stack.at(-1) === "(") {
  //       stack.push(arr[i]);
  //       continue
  //     } else if (
  //       (operatorPrecedence.get(arr[i]) as unknown as number) >
  //       (operatorPrecedence.get(stack.at(-1) as string) as unknown as number)
  //     ) {
  //       stack.push(arr[i]);
  //       continue

  //     } else {
  //       clearStack();
  //       i--;
  //       continue
  //     }
  //   }

  //   if (arr[i] === "(") {
  //     stack.push(arr[i]);
  //     continue
  //   }

  //   if (arr[i] === ")") {
  //     while (stack.at(-1) !== "(") {
  //       clearStack();
  //     }
  //     stack.pop();
  //     continue
  //   }
  // }
  // query = query.concat(stack.reverse());
}

function calcString(arr: (string | number)[]): number {
  let answ: number = 0;
  for (let i = 0; i < arr.length; i++) {
    console.log(i + " " + calcStack);
    if (Number(arr[i])) {
      calcStack.push(arr[i] as number);
    } else {
      // const [num2, num1] = [calcStack.pop() as number, calcStack.pop() as number];
      // calcStack.push(calcAction(arr[i] as calcActions, num1, num2));
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
  return answ;
}


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
      throw new Error("Invalid action");
  }
}


var input = document.querySelector('.input') as HTMLInputElement
var buttons = document.querySelectorAll('.btn') as NodeListOf<HTMLButtonElement>
var answer = document.querySelector('.answer-num') as HTMLElement

function changeInput (str:  string): void {
  input.value += str 
}

function buttonClick (value: string): void {
  switch (value) {
    case 'CE': {
      input.value = ''
      answer.innerHTML = ''
      return
    } 
    case "C": {
      input.value = input.value.slice(0,-1)
      return
    } 
    default:
      break;
  }
  changeInput(value)
}

for (let btn of buttons) {
  btn.addEventListener('click', () => buttonClick(btn.value))
}

