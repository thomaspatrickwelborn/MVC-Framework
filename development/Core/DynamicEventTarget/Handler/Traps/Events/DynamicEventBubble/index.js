import DynamicEvent from '../DynamicEvent/index.js'
export default function DynamicEventBubble($event) {
  const { currentTarget, type, basename, path, detail } = $event
  if(currentTarget.parent !== null) {
    currentTarget.parent.dispatchEvent(
      new DynamicEvent(
        type, { basename, path, detail }
      )
    )
  }
}