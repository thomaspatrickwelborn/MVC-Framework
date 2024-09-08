import * as sass from 'sass'
import { writeFile } from 'node:fs'
export default async function SassPiler($settings) {
  const sassPile = sass.compile($settings.input, () => {
    writeFile($settings.output, sassPile.css)
  })
}