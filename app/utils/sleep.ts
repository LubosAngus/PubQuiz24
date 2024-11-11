export default async function (timeInMs: number) {
  return new Promise((resolve) => setTimeout(resolve, timeInMs))
}
