import DynamicEventTarget from '/mvc-framework/Core/DynamicEventTarget/index.js'
import EventSystem from '/mvc-framework/Core/EventSystem/index.js'

function DOMContentLoaded($event) {
  const eventTargetA = new DynamicEventTarget({
    aaa: 111,
    bbb: 222,
    ccc: 333,
  })
  const eventSystem = new EventSystem()
  eventSystem.eventTargets = { eventTargetA }
  eventSystem.addEvents({
    'eventTargets.eventTargetA assignSourceProperty:aaa': ($event) => {
      console.log($event.type, $event.detail)
    },
    'eventTargets.eventTargetA assignSourceProperty': ($event) => {
      console.log($event.type, $event.detail)
    },
  }, true)
  console.log(eventSystem)
  eventTargetA.assign({ aaa: 111111 })
}

document.addEventListener('DOMContentLoaded', DOMContentLoaded)
