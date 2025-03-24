import getContent from './getContent/index.js'
import getContentProperty from './getContentProperty/index.js'
export default function getProperty($content, $options, ...$arguments) {
  if(typeof $arguments[0] === 'string') { return getContentProperty($content, $options, ...$arguments) }
  else { return getContent($content, $options, ...$arguments) }
}