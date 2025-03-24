import deleteContent from './deleteContent/index.js'
import deleteContentProperty from './deleteContentProperty/index.js'
export default function deleteProperty($content, $options, ...$arguments) {
  if(typeof $arguments[0] === 'string') { return this.deleteContentProperty($content, $options, ...$arguments) }
  else { return deleteContent($content, $options, ...$arguments) }
}