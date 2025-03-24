import { recursiveAssign } from '../../../../../../../coutil/index.js'
import Content from '../../../../../index.js'
import { ContentEvent } from '../../../../../events/index.js'
export default function deleteContent($content, $options) {
  const { target } = $content
  for(const [$targetPropertyKey, $targetPropertyValue] of Object.entries(target)) {
    $content.delete($targetPropertyKey, $options)
  }
  return $content
}