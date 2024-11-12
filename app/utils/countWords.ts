export default function (input: string): number {
  const words = input.match(/\b\w+\b/g)

  return words ? words.length : 0
}
