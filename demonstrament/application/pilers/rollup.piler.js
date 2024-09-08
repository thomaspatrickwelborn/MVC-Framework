import * as rollup from 'rollup'
export default async function RollupPiler($settings) {
  console.log($settings)
  const rollupPile = rollup.rollup({
    input: $settings.input,
    output: [{
      file: $settings.output,
      format: 'es',
      sourcemap: true
    }]
  })
}