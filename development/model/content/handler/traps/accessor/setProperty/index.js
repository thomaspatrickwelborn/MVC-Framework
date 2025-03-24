import { ContentEvent } from '../../../../events/index.js'
import { recursiveAssign } from '../../../../../../coutil/index.js'
import setContent from './setContent/index.js'
import setContentProperty from './setContentProperty/index.js'
export default function setProperty($content, $options, ...$arguments) {
  let setProperty
  const options = recursiveAssign({}, $content.options, $options)
  if(typeof $arguments[0] === 'string') {
    if($arguments.length === 3) { recursiveAssign(options, $arguments[2]) }
    setProperty = setContentProperty($content, options, ...$arguments)
  }
  else {
    if($arguments.length === 2) { recursiveAssign(options, $arguments[1]) }
    setProperty = setContent($content, options, ...$arguments)
  }
  // Set Property Event
  const { path } = $content
  const { events } = options
  if(events && events['set']) {
    $content.dispatchEvent(
      new ContentEvent('set', {
        path,
        value: $content,
        detail: {
          value: $content
        }
      }, $content)
    )
  }
  return setProperty
}