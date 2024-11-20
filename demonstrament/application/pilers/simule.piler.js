import createDir from '../coutil/createDir/index.js'
import micromatch from 'micromatch'
import path from 'node:path'
import { cp, mkdir } from 'node:fs/promises'
export default async function SimulePiler($settings, $route, $path) {
  if(micromatch($path, $settings.input)) {
    if($settings.outputType === 'path') {
      try {
        await createDir($settings.output)
        await cp($path, path.join(
          $settings.output
        ), {
          force: true,
          recursive: true,
        })
      }
      catch($err) { console.log($err) }
    }
    else if($settings.outputType === 'glob') {
      try {
        await createDir($path)
        await cp($path, $path.replace(
          new RegExp(`^${$route.source}`), 
          $route.target
        ), {
          force: true,
          recursive: true,
        })
      }
      catch($err) { console.log($err) }
    }
  }
}