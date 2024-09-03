export default {
  rootAlias: 'content',
  traps: {
    properties: {
      set: {
        merge: true,
        events: ['setProperty', 'set'],
      },
    },
    object: {
      assign: {
        merge: true,
        events: ['assignSourceProperty', 'assignSource', 'assign'],
      },
      defineProperties: {
        events: ['defineProperties'],
      },
      defineProperty: {
        descriptorValueMerge: true,
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
        events: ['copyWithinIndex', 'copyWithin']
      },
      unshift: {
        events: ['unshiftProp', 'unshift']
      },
      splice: {
        events: ['spliceDelete', 'spliceAdd', 'splice']
      },
      shift: {
        events: ['shift']
      },
      reverse: {
        events: ['reverse']
      },
      push: {
        events: ['pushProp', 'push']
      },
      pop: {
        events: ['pop']
      },
      fill: {
        events: ['fillIndex', 'fill']
      },
    }
  }
}