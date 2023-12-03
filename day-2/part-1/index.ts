import { open } from 'node:fs/promises';

const file = await open('./day-2/input.txt');

const cubes = {
  red: 12,
  green: 13,
  blue: 14
} as const

type CubeName = keyof typeof cubes
type CubesSet = {red: number; green: number; blue: number}

function isCube(v: string): v is CubeName {
  return v in cubes
}

function parseLine(line: string): { id: number; sets: CubesSet[] } {
  const matchId = line.match(/Game (\d+):/)
  const id = matchId?.[1]
  if (!id) throw new Error("Wrong id in line: " + line)
  const matchSubsets = line.match(/:(.+)/)
  const sets = matchSubsets?.[1].split(";").map((subSet) => {
    const data: Record<CubeName, number> = {
      red: 0,
      green: 0,
      blue: 0
    }
    subSet.split(",").forEach((s) => {
      const matchSet = s.match(/(\d+) (\w+)/)
      const num = matchSet?.[1]
      const color = matchSet?.[2]
      if (color && isCube(color) && num) {
        data[color] = parseInt(num, 10)
      }
    })
    return data
  }) ?? []
  return {
    id: parseInt(id, 10),
    sets
  }
}

function isPossibleSet({ red, green, blue }: CubesSet) {
  return red <= cubes.red && green <= cubes.green && blue <= cubes.blue
}

let sum = 0;

for await (const line of file.readLines()) {
  const result = parseLine(line);
  if (result.sets.every(isPossibleSet)) {
    sum += result.id;
  }
}

console.log(sum);
