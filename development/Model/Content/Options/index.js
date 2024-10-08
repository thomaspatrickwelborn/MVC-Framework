export default {
  traps: {
    accessor: {
      set: {
        events: ['set'],
      },
      delete: {
        events: ['delete'],
      },
    },
    object: {
      assign: {
        events: [
          'assignSourceProperty',
          'assignSource',
          'assign'
        ],
      },
      defineProperties: {
        events: ['defineProperties'],
      },
      defineProperty: {
        descriptorTree: true,
        events: ['defineProperty'],
      },
      freeze: {
        recurse: true,
        events: ['freeze']
      },
      seal: {
        recurse: true,
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