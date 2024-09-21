import createDir from '../coutil/createDir/index.js'
import micromatch from 'micromatch'
import path from 'node:path'
import { cp, mkdir } from 'node:fs/promises'
export default async function SimulePiler($settings, $route, $path) {
  // console.log(
  //   "$settings, $route, $path",
  //   '\n', $settings, $route, $path
  // )
  // Input/Output String
  /*
  if(
    typeof $settings.input === 'string' &&
    typeof $settings.output === 'string' &&
    micromatch($path, $settings.input)
  ) {
    await createDir($settings.output)
    await cp($settings.input, $settings.output, {
      force: true,
      recursive: true,
    })
  }
  */
  /*
  // Input/Output Array
  else */if(
    Array.isArray($settings.input) &&
    Array.isArray($settings.output) &&
    $settings.input.length === $settings.output.length
  ) {
    const simulesLength = $settings.input.length
    let simulesIndex = 0
    while(simulesIndex < simulesLength) {
      const simuleInput = $path
      let simuleOutput
      if(micromatch($path, simuleInput)) {
        const simuleOutputRegExp = new RegExp(`^${$route.source}/`)
        const simuleOutputReplace = `${$route.target}/`
        simuleOutput = $path
        .replace(simuleOutputRegExp, simuleOutputReplace)
        console.log('simuleOutputRegExp', simuleOutputRegExp)
        console.log('simuleOutputReplace', simuleOutputReplace)
        console.log('$path', $path)
        console.log('simuleOutput', simuleOutput)
        await createDir(simuleOutput)
        await cp(simuleInput, simuleOutput, {
          force: true, 
          recursive: true,
        })
      }
      simulesIndex++
    }
  }
}