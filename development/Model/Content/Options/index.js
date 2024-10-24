export default {
  path: null, 
  parent: null, 
  enableValidation: true, 
  validationEvents: true, 
  contentEvents: true, 
  enableEvents: true, 
  traps: {
    accessor: {
      get: {
        pathkey: true,
        events: [
          'get',
          'getProperty'
        ],
      },
      set: {
        recursive: true,
        pathkey: true,
        events: [
          'set',
          'setProperty'
        ],
      },
      delete: {
        pathkey: true,
        events: [
          'delete',
          'deleteProperty'
        ],
      },
    },
    object: {
      assign: {
        sourceTree: true,
        events: [
          'assignSourceProperty',
          'assignSource',
          'assign'
        ],
      },
      defineProperties: {
        descriptorTree: true,
        events: ['defineProperties'],
      },
      defineProperty: {
        descriptorTree: true,
        events: ['defineProperty'],
      },
      freeze: {
        recursive: true,
        events: ['freeze']
      },
      seal: {
        recursive: true,
        events: ['seal']
      },
    },
    array: {
      concat: {
        events: [
          'concatValue',
          'concat'
        ]
      },
      copyWithin: {
        events: [
          'copyWithinIndex',
          'copyWithin'
        ]
      },
      fill: {
        events: [
          'fillIndex',
          'fill'
        ]
      },
      pop: {
        events: ['pop']
      },
      push: {
        events: [
          'pushProp',
          'push'
        ]
      },
      reverse: {
        events: ['reverse']
      },
      shift: {
        events: ['shift']
      },
      splice: {
        events: [
          'spliceDelete',
          'spliceAdd',
          'splice'
        ]
      },
      unshift: {
        events: [
          'unshiftProp',
          'unshift'
        ]
      },
    }
  }
}