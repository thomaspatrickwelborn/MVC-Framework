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
    try {
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
    catch($err) { console.log($err) }
  }
  // Client
  else if($settings.outputType === 'client') {
    try {
      const viewTemplate = await readFile($path)
      .then(($viewTemplate) => $viewTemplate.toString())
      const viewPile = ejs.compile(viewTemplate, {
        _with: false,
        localsName: '$content',
        client: true,
        compileDebug: false,
      })
      const viewPileString = [
        'export default', viewPile.toString()
      ].join(' ')
      const viewPileBeautify = beautify.js(viewPileString, {
        maxPreserveNewlines: 0,
        indentSize: 2,
        indentChar: ' ',
      })
      const viewPilePath = $path
      .replace(new RegExp(/\$/), '')
      .replace(new RegExp(/.ejs$/), '.js')
      writeFile(viewPilePath, viewPileBeautify, ($err) => console.log)
    }
    catch($err) { console.log($err) }
  }
}