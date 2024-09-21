import * as rollup from 'rollup'
import createDir from '../coutil/createDir/index.js'
export default async function RollupPiler($settings) {
  await createDir($settings.output)
  const rollupPile = await rollup.rollup({
    input: $settings.input,
  })
  await rollupPile.write({
    file: $settings.output,
    format: 'es',
    sourcemap: true
  })
}