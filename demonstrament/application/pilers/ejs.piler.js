import path from 'node:path'
import beautify from 'js-beautify'
import ejs from 'ejs'
import { readFile } from 'node:fs/promises'
import { writeFile } from 'node:fs'
export default async function EJSPiler($settings) {
  const model = JSON.parse(
    await readFile($settings.input)
  )
  const viewFile = await ejs.renderFile($settings.template, model, {
    async: true,
    localsName: '$content',
    root: [
      path.join(
        process.env.PWD, 'application/templates', 
      )
    ],
  })
  const viewFileBeautify = beautify.html(viewFile, {
    maxPreserveNewlines: 0,
    indentSize: 2,
    indentChar: " ",
  })
  writeFile($settings.output, viewFileBeautify, ($err) => console.log)
}