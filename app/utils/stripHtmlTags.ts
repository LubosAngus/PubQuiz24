export default function (input: string): string {
  return input.replace(/<\/?[^>]+(>|$)/g, '')
}
