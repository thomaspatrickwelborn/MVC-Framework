function subtestE() {
  // const eventSystemSettings = {}
  // const eventSystemSettings1 = {
  //   propA: 333,
  // }
  // const eventSystemSettings2 = {
  //   addEventListener: function() { console.log("meh") }
  // }
  // const eventSystemSettings100 = {
  //   propA: {
  //     subpropA: {
  //       bbb: "BBB",
  //       ccc: "CCC",
  //       ddd: "DDD",
  //     },
  //     subpropB: {
  //       eee: true,
  //       fff: false,
  //       ggg: true,
  //     },
  //   },
  //   propB: [
  //     "HHH", "III", "JJJ", [
  //       "KKK", "LLL", "MMM"
  //     ]
  //   ],
  // }
  const eventSystemEvents = {
    'set': function set($event) { console.log($event) },
  }
  const eventSystem = new EventSystem({
    aaa: 111
  })
  eventSystem.addEvents(eventSystemEvents)
  console.log(eventSystem.events[0])
  eventSystem.content.aaa = 222
  // eventSystem.addEventListener = 333
  // eventSystem.content.aaa = 111
  // console.log(eventSystem.content.aaa)
  // delete eventSystem.content.aaa
  // console.log(eventSystem.content.aaa)
  // eventSystem.aaa = 111
  // console.log(eventSystem.aaa)
  // console.log(eventSystem.addEventListener)
  // console.log(eventSystem.addEvents)
  // console.log(eventSystem.content)
  // eventSystem.content.aaa = 222
  // console.log(eventSystem.content.aaa)
  // eventSystem.removeEventListener
  // eventSystem.dispatchEvent
  // eventSystem.addEvents
  // eventSystem.removeEvents
  // eventSystem.propA
  // console.log(eventSystem.addEvents)
  // testShortEventSystemMultipleCallbacks(eventSystem)
  // testLongEventSystem(eventSystem)
  // testShortEventSystem(eventSystem)
}

function testShortEventSystemMultipleCallbacks($eventSystem) {
  const shortEventSystemMultipleCallbacksEvents = {
    'set': [
      function set1($event) { console.log($event) },
      function set2($event) { console.log($event) },
    ],
    ':scope set': [
      function set1($event) { console.log($event) },
      function set2($event) { console.log($event) },
    ],
    'propA.subpropA set': [
      function setPropASubpropA1($event) { console.log($event) },
      function setPropASubpropA2($event) { console.log($event) },
    ],
    'set:propA.subpropB': [
      function setPropASubpropB1($event) { console.log($event) },
      function setPropASubpropB2($event) { console.log($event) },
    ],
    'propB set': [
      function setPropB1($event) { console.log($event) },
      function setPropB2($event) { console.log($event) },
    ],
    'propB[4] set': [
      function setPropB41($event) { console.log($event) },
      function setPropB42($event) { console.log($event) },
    ],
  }
  $eventSystem.addEvents(shortEventSystemMultipleCallbacksEvents)
  console.log('$eventSystem.events.length', $eventSystem.events.length)
  $eventSystem.removeEvents(shortEventSystemMultipleCallbacksEvents)
  console.log('$eventSystem.events.length', $eventSystem.events.length)
}

function testLongEventSystem($eventSystem) {
  const longEventSystemEvents = [
    {
      type: 'set',
      target: ':scope',
      callback: function set($event) { console.log($event) }
    }, {
      type: 'set',
      target: ':scope',
      callback: function setScope($event) { console.log($event) }
    }, {
      type: 'set',
      target: 'propA.subpropA',
      callback: function setPropASubpropA($event) { console.log($event) }
    }, {
      type: 'set:propA.subpropB',
      target: ':scope',
      callback: function setPropASubpropB($event) { console.log($event) }
    }, {
      type: 'set',
      target: 'propB',
      callback: function setPropB($event) { console.log($event) }
    }, {
      type: 'set',
      target: 'propB[4]',
      callback: function setPropB4($event) { console.log($event) }
    }
  ]
  $eventSystem.addEvents(longEventSystemEvents)
  console.log('$eventSystem.events.length', $eventSystem.events.length)
  $eventSystem.removeEvents(longEventSystemEvents)
  console.log('$eventSystem.events.length', $eventSystem.events.length)
}

function testShortEventSystem($eventSystem) {
  const shortEventSystemEvents = {
    'set': function set($event) { console.log($event) },
    ':scope set': function set($event) { console.log($event) },
    'propA.subpropA set': function setPropASubpropA($event) { console.log($event) },
    'set:propA.subpropB': function setPropASubpropB($event) { console.log($event) },
    'propB set': function setPropB($event) { console.log($event) },
    'propB[4] set': function setPropB4($event) { console.log($event) },

  }
  $eventSystem.addEvents(shortEventSystemEvents)
  console.log('$eventSystem.events.length', $eventSystem.events.length)
  $eventSystem.removeEvents(shortEventSystemEvents)
  console.log('$eventSystem.events.length', $eventSystem.events.length)
}

export default subtestE