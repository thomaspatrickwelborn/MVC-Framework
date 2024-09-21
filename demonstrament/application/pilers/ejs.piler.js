import createDir from '../coutil/createDir/index.js'
import path from 'node:path'
import beautify from 'js-beautify'
import ejs from 'ejs'
import { readFile } from 'node:fs/promises'
import { writeFile } from 'node:fs'
export default async function EJSPiler($settings) {
  await createDir($settings.output)
  const model = JSON.parse(
    await readFile($settings.input)
  )
  const viewPile = await ejs.renderFile($settings.template, model, {
    async: true,
    localsName: '$content',
    root: [
      path.join(
        process.env.PWD, 'application/templates', 
      )
    ],
  })
  const viewPileBeautify = beautify.html(viewPile, {
    maxPreserveNewlines: 0,
    indentSize: 2,
    indentChar: " ",
  })
  writeFile($settings.output, viewPileBeautify, ($err) => console.log)
}