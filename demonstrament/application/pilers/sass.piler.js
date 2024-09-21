import createDir from '../coutil/createDir/index.js'
import * as sass from 'sass'
import { stat, mkdir, writeFile } from 'node:fs/promises'
export default async function SassPiler($settings) {
  await createDir($settings.output)
  const sassPile = sass.compile($settings.input)
  await writeFile($settings.output, sassPile.css)
}