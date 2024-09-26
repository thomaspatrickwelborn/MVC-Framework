import path from 'node:path'
import createDir from '../coutil/createDir/index.js'
import * as sass from 'sass'
import { stat, mkdir, writeFile } from 'node:fs/promises'
export default async function SassPiler($settings) {
  await createDir($settings.output)
  const sourceMapExtension = '.css.map'
  const sassPilePath = $settings.output
  const sourceMapFilePath = [
    '.', path.basename($settings.output).concat('.map')
  ].join('/')
  const sassPileSourceMapPend = `'\n/*# sourceMappingURL=${sourceMapFilePath} */`
  const sassPileSourceMapPath = $settings.output.replace(
    new RegExp(/\.css$/), sourceMapExtension
  )
  var sassPile = sass.compile($settings.input, {
    sourceMap: true,
    sourceMapIncludeSources: true,
  })
  const sassPileCSS = sassPile.css.concat(sassPileSourceMapPend)
  const sassPileSourceMap =JSON.stringify(sassPile.sourceMap)
  await writeFile(sassPilePath, sassPileCSS)
  await writeFile(sassPileSourceMapPath, sassPileSourceMap)
}