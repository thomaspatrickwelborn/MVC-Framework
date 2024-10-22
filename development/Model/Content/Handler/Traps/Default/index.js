export default {
  Object: {
    Call: {
      Keys: [
        'entries', 'fromEntries', 'getOwnPropertyDescriptors', 
        'getOwnPropertyNames', 'getOwnPropertySymbols', 
        'getPrototypeOf', 'isExtensible', 'isFrozen', 'isSealed', 
        'keys', 'preventExtensions', 'values',
      ],
      Method: function createObjectMethod() {
        return function() {
          const $content = Array.prototype.shift.call(arguments)
          const $options = Array.prototype.shift.call(arguments)
          const { root } = $content
          return Array.prototype.entries.call(root)
        }
      }
    },
    CallArguments: {
      Keys: [
        'getOwnPropertyDescriptor', 'groupBy', 'hasOwn', 'hasOwnProperty', 
        'is', 'isPrototypeOf', 'propertyIsEnumerable', 'toLocaleString', 
        'toString', 'valueOf', 
      ],
      Method: function createObjectMethod($methodName) {
        return function() {
          const $content = Array.prototype.shift.call(arguments)
          const $options = Array.prototype.shift.call(arguments)
          const { root } = $content
          return Object.getOwnPropertyDescriptor(root, ...arguments)
        }
      }
    }
  },
  Array: {
    Call: {
      Keys: [
        'entries','isArray','join','keys','lastIndexOf','of','pop',
        'shift','values',
      ],
      Method: function createArrayMethod($methodName) {
        return function() {
          const $content = Array.prototype.shift.call(arguments)
          const $options = Array.prototype.shift.call(arguments)
          const { root } = $content
          return Array.prototype[$methodName].call(root)
        }
      }
    },
    CallArguments: {
      Keys: [
        'at', 'every', 'filter', 'find', 'findIndex', 'findLast',
        'findLastIndex', 'flat', 'flatMap', 'forEach', 'from', 'fromAsync',
        'includes', 'indexOf', 'map', 'reduce', 'reduceRight', 'reverse',
        'slice', 'some', 'sort', 'toLocaleString', 'toReversed', 'toSorted',
        'toSpliced', 'toString', 'with', 
      ],
      Method: function createArrayMethod($methodName) {
        return function() {
          const $content = Array.prototype.shift.call(arguments)
          const $options = Array.prototype.shift.call(arguments)
          const { root } = $content
          return Array.prototype[$methodName].call(root, ...arguments)
        }
      }
    }
  }
}