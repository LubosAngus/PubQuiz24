import type { Config } from 'tailwindcss'
// @ts-expect-error no declared types at this time
import primeUi from 'tailwindcss-primeui'

export default <Partial<Config>>{
  plugins: [primeUi],
}
