import { ContentEvent } from '../../../../events/index.js'
import { recursiveAssign } from '../../../../../../coutil/index.js'
import getContent from './getContent/index.js'
import getContentProperty from './getContentProperty/index.js'
export default function getProperty($content, $options, ...$arguments) {
  let getProperty
  const options = recursiveAssign({}, $content.options, $options)
  if(typeof $arguments[0] === 'string') {
    if($arguments.length === 2) { recursiveAssign(options, $arguments[1]) }
    getProperty = getContentProperty($content, options, ...$arguments)
  }
  else {
    if($arguments.length === 1) { recursiveAssign(options, $arguments[0]) }
    getProperty = getContent($content, options, ...$arguments)
  }
  // Get Property Event
  const { path } = $content
  const { events } = options
  if(events && events['get']) {
    $content.dispatchEvent(
      new ContentEvent('get', {
        path,
        value: $content,
        detail: {
          value: $content
        }
      }, $content)
    )
  }
  return getProperty
}