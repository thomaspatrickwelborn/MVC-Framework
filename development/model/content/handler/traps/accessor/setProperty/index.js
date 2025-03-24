import setContent from './setContent/index.js'
import setContentProperty from './setContentProperty/index.js'
export default function setProperty($content, $options, ...$arguments) {
  if(typeof $arguments[0] === 'string') { return setContentProperty($content, $options, ...$arguments) }
  else { return setContent($content, $options, ...$arguments) }
}