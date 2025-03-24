import { ContentEvent } from '../../../../events/index.js'
import { recursiveAssign } from '../../../../../../coutil/index.js'
import deleteContent from './deleteContent/index.js'
import deleteContentProperty from './deleteContentProperty/index.js'
export default function deleteProperty($content, $options, ...$arguments) {
  let deleteProperty
  const options = recursiveAssign({}, $content.options, $options)
  if(typeof $arguments[0] === 'string') {
    if($arguments.length === 2) { recursiveAssign(options, $arguments[1]) }
    deleteProperty = this.deleteContentProperty($content, options, ...$arguments)
  }
  else {
    if($arguments.length === 1) { recursiveAssign(options, $arguments[0]) }
    deleteProperty = deleteContent($content, options, ...$arguments)
  }
  // Delete Property Event
  const { path } = $content
  const { events } = options
  if(events && events['delete']) {
    $content.dispatchEvent(
      new ContentEvent('delete', {
        path,
        detail: {
          value: $content
        }
      }, $content)
    )
  }
  return deleteProperty
}