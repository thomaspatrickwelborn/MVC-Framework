import createDir from '../coutil/createDir/index.js'
import path from 'node:path'
import beautify from 'js-beautify'
import ejs from 'ejs'
import { readFile } from 'node:fs/promises'
import { writeFile } from 'node:fs'
export default async function EJSPiler($settings, $route, $path) {
  console.log("EJSPiler", "$path", $path)
  await createDir(path.dirname($path))
  const localsName = $settings.localsName || '$content'
  // Server
  if($settings.outputType === 'server') {
    try {
      const modelPath = path.join($route.source, $settings.model)
      const model = JSON.parse(
        await readFile(modelPath)
      )
      const templatePath = path.join($route.source, $settings.input)
      const viewPile = await ejs.renderFile(templatePath, model, {
        async: true,
        localsName,
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
      const writeFilePath = path.join($route.target, $settings.output)
      writeFile(writeFilePath, viewPileBeautify, ($err) => console.log)
    }
    catch($err) { console.log($err) }
  }
  // Client
  else  if($settings.outputType === 'client') {
    try {
      const viewTemplatePath = $path
      const viewTemplate = await readFile(viewTemplatePath)
      .then(($viewTemplate) => $viewTemplate.toString())
      const viewPile = ejs.compile(viewTemplate, {
        _with: false,
        localsName,
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