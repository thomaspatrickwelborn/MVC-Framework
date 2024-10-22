export default {
  basename: null, 
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
        pathkey: true,
        recursive: true,
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
        recursive: true,
        events: [
          'assignSourceProperty',
          'assignSource',
          'assign'
        ],
      },
      defineProperties: {
        recursive: true, 
        descriptorTree: true,
        events: ['defineProperties'],
      },
      defineProperty: {
        recursive: true, 
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
      copyWithin: {
        events: [
          'copyWithinIndex',
          'copyWithin'
        ]
      },
      unshift: {
        events: [
          'unshiftProp',
          'unshift'
        ]
      },
      splice: {
        events: [
          'spliceDelete',
          'spliceAdd',
          'splice'
        ]
      },
      shift: {
        events: ['shift']
      },
      reverse: {
        events: ['reverse']
      },
      concat: {
        events: [
          'concatValue',
          'concat'
        ]
      },
      push: {
        events: [
          'pushProp',
          'push'
        ]
      },
      pop: {
        events: ['pop']
      },
      fill: {
        events: [
          'fillIndex',
          'fill'
        ]
      },
    }
  }
}