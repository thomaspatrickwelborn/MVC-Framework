import createDir from '../coutil/createDir/index.js'
import path from 'node:path'
import beautify from 'js-beautify'
import ejs from 'ejs'
import { readFile } from 'node:fs/promises'
import { writeFile } from 'node:fs'
export default async function EJSPiler($settings, $route, $path) {
  await createDir(path.dirname($path))
  // Server
  if($settings.outputType === 'server') {
    const model = JSON.parse(
      await readFile($settings.model)
    )
    const viewPile = await ejs.renderFile($settings.input, model, {
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
      indentChar: ' ',
    })
    writeFile($settings.output, viewPileBeautify, ($err) => console.log)
  }
  // Client
  else if($settings.outputType === 'client') {
    const viewTemplate = await readFile($path)
    .then(($viewTemplate) => $viewTemplate.toString())
    const viewPile = ejs.compile(viewTemplate, {
      _with: false,
      localsName: '$content',
      client: true,
    })
    const viewPileString = [
      'export default', viewPile.toString()
    ].join(' ')
    const viewPileBeautify = beautify.js(viewPileString, {
      maxPreserveNewlines: 0,
      indentSize: 2,
      indentChar: ' ',
    })
    writeFile($path.replace(
      new RegExp(/.ejs$/), '.js'
    ), viewPileBeautify, ($err) => console.log)
  }
}