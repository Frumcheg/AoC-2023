import { open } from 'node:fs/promises';

const file = await open('./day-1/input.txt');

let sum = 0;

function isNumber(v: string): v is `${number}` {
  const numbers = Array.from({ length: 10 }, (_, i) => `${i}`)
  return numbers.includes(v)
}

function parseLine(line: string): `${number}${number}` {
  const chars: `${number}`[] = line.split('').filter(isNumber);
  return `${chars[0]}${chars[chars.length - 1]}`
}

for await (const line of file.readLines()) {
  const result = parseLine(line);
  sum += parseInt(result, 10);
}

console.log("Sum: ", sum);
