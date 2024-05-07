export default {
  // Array Class Properties
  Array: {
    Names: Object.getOwnPropertyNames(Array.prototype),
    TrapNames: [
      'fill', 'pop', 'push', 'splice', 'shift', 'unshift'
    ],
  },
  // Event Target Properties
  EventTarget: {
    Names: Object.getOwnPropertyNames(EventTarget.prototype),
    TrapNames: [
      'addEventListener', 'dispatchEvent', 'removeEventListener'
    ],
  },
  // Object Properties
  Object: {
    Names: Object.getOwnPropertyNames(
      Object
    ),
    TrapNames: [
      'assign', 'create', 'defineProperties', 'defineProperty',
      'entries', 'freeze', 'fromEntries',
      'getOwnPropertyDescriptor', 'getOwnPropertyDescriptors', 
      'getOwnPropertyNames', 'getOwnPropertySymbols', 
      'getPrototypeOf', , 'groupBy', 'hasOwn', 'is', 'isExtensible', 
      'isFrozen', 'isSealed', 'keys', 'preventExtensions', 
      'seal', 'setPrototypeOf', 'values',
    ],
  },
  // Map Class Properties
  Map: {
    Names: Object.getOwnPropertyNames(Map.prototype),
    TrapNames: [
      'get', 'set', 'delete', 'toObject'
    ],
  },
}