import DETEvent from '../index.js'
export default function DynamicEventBubble($event) {
  const { currentTarget, type, basename, path, detail } = $event
  if(currentTarget.parent !== null) {
    currentTarget.parent.dispatchEvent(
      new DETEvent(
        type, { basename, path, detail }
      )
    )
  }
}