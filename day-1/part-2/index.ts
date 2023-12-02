import { open } from 'node:fs/promises';

const file = await open('./day-1/input.txt');

let sum = 0;

const numbers = ["zero", "one", "two", "three", "four", "five", "six", "seven", "eight", "nine"] as const;

function findIndexes(line: string, word: typeof numbers[number]): number[] {
  let str = line
  const indexes: number[] = []
  while (str.includes(word)) {
    const index = str.indexOf(word)
    indexes.push(index)
    str = str.replace(word, Array.from(word, () => "_").join(""))
  }
  return indexes
}

function isNumber(v: string): v is `${number}` {
  const numbers = Array.from({ length: 10 }, (_, i) => `${i}`)
  return numbers.includes(v)
}


function toNum(v: typeof numbers[number]) {
  const index = numbers.indexOf(v)
  if (index > -1) {
    return index.toString()
  }
  return v
}

function parseLine(line: string): number {
  const result = new Map()
  numbers.forEach((n) => {
    findIndexes(line, n).forEach((num) => {
      result.set(num, n)
    })
  })
  line.split('').forEach((n, i) => {
    if (isNumber(n)) {
      result.set(i, n)
    }
  });
  const keys = [...result.keys()].sort((a, b) => a - b)
  const first = result.get(keys[0])
  const last = result.get(keys[result.size - 1])
  return parseInt(`${toNum(first)}${toNum(last)}`, 10)
}

for await (const line of file.readLines()) {
  const result = parseLine(line);
  sum += result;
}

console.log("Sum: ", sum);
