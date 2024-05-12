const Events = {
  // Object Events
  // Object Assign
  'assign': ($event, $target) => {
    return new CustomEvent(
    'assign', { 
      detail: {},
    }
  )
  },
  // Object Assign Source
  'assignSource': ($event, $target) => {
    return new CustomEvent(
      'assignSource', { 
        detail: {
          source: $event.source,
        }
      }
    )
  },
  // Object Assign Source Key
  'assignSourceProperty': ($event, $target) => {
    return new CustomEvent(
      `assignSourceProperty`, { 
        detail: {
          key: $event.key,
          val: $event.val,
          source: $event.source,
        }
      }
    )
  },
  // Object Assign Source Key
  'assignSourcePropertyKey': ($event, $target) => {
    return new CustomEvent(
      `assignSourceProperty:${$event.key}`, { 
        detail: {
          key: $event.key,
          val: $event.val,
          source: $event.source,
        }
      }
    )
  },
  // Object Define Properties
  'defineProperties': ($event, $target) => {
    return new CustomEvent(
      'defineProperties', {
        detail: {
          descriptors: $event.descriptors, 
        }
      }
    )
  },
  // Object Define Property
  'defineProperty': ($event, $target) => {
    return new CustomEvent(
      `defineProperty`, {
        detail: {
          prop: $event.prop,
          descriptor: $event.descriptor,
        }
      }
    )
  },
  // Object Define Property
  'definePropertyKey': ($event, $target) => {
    return new CustomEvent(
      `defineProperty:${$event.prop}`, {
        detail: {
          prop: $event.prop,
          descriptor: $event.descriptor,
        }
      }
    )
  },
  // Object Freeze
  'freeze': ($event, $target) => {
    return new CustomEvent(
      'freeze', {
        detail: {},
      },
    )
  },
  // Object Seal
  'seal': ($event, $target) => {
    return new CustomEvent(
      'seal', {
        detail: {},
      },
    )
  },
  // Object Set Prototype Of
  'setPrototypeOf': ($event, $target) => {
    return new CustomEvent(
      'setPrototypeOf', {
        detail: {
          path: $event.path,
          key: $event.key,
          preprototype: $event.preprototype,
          prototype: $event.prototype,
        }
      }
    )
  },
  // Array Events
  copyWithin: ($event, $target) => {
    return new CustomEvent(
      'copyWithin', {
        detail: {
          start: $event.start,
          end: $event.end,
          items: $event.items,
          precopy: $event.precopy,
          copy: $event.copy,
        }
      }
    )
  },
  fill: ($event, $target) => {
    return new CustomEvent(
      'fill', {
        detail: {
          start: $event.start,
          end: $event.end,
          items: $event.items,
          prelength: $event.prelength,
          length: $event.length,
        }
      }
    )
  },
  length: ($event, $target) => {
    return new CustomEvent(
      'length', {
        detail: {
          prelength: $event.prelength,
          length: $event.length,
        }
      }
    )
  },
  push: ($event, $target) => {
    return new CustomEvent(
      'push', {
        detail: {
          elements: $event.elements,
        }
      }
    )
  },
  pushProp: ($event, $target) => {
    return new CustomEvent(
      `pushProp`, {
        detail: {
          element: $event.element,
          elementIndex: $event.elementIndex,
        }
      }
    )
  },
  pop: ($event, $target) => {
    return new CustomEvent(
      'pop', {
        detail: {
          removedElement: $event.removedElement, 
          prelength: $event.prelength,
          length: $event.length,
        }
      }
    )
  },
  reverse: ($event, $target) => {
    return new CustomEvent(
      'reverse', {
        detail: {
          preverse: $event.preverse, 
          reverse: $event.reverse, 
        }
      }
    )
  },
  shift: ($event, $target) => {
    return new CustomEvent(
      'shift', {
        detail: {
          removedElement: $event.removedElement, 
          prelength: $event.prelength, 
          length: $event.length, 
        }
      }
    )
  },
  sort: ($event, $target) => {
    return new CustomEvent(
      'sort', {
        detail: {
          presort: $event.presort, 
          sort: $event.sort, 
        }
      }
    )
  },
  splice: ($event, $target) => {
    return new CustomEvent(
      'splice', {
        detail: {
          start: $event.start, 
          stop: $event.stop, 
          deleted: $event.deleted, 
          added: $event.added, 
          prelength: $event.prelength, 
          length: $event.length, 
        }
      }
    )
  },
  unshift: ($event, $target) => {
    return new CustomEvent(
      'unshift', {
        detail: {
          elements: $event.elements, 
          prelength: $event.prelength, 
          length: $event.length, 
        }
      }
    )
  },
  // Map Events
  clear: ($event, $target) => {
    return new CustomEvent(
      'clear', {
        detail: {
          presize: $event.presize, 
          size: $event.size, 
        }
      }
    )
  },
  delete: ($event, $target) => {
    return new CustomEvent(
      'delete', {
        detail: {
          path: $event.path, 
          key: $event.key, 
          preval: $event.preval, 
        }
      }
    )
  },
  deleteProp: ($event, $target) => {
    return new CustomEvent(
      `delete:${$event.key}`, {
        detail: {
          path: $event.path, 
          key: $event.key, 
          preval: $event.preval, 
        }
      }
    )
  },
  get: ($event, $target) => {
    return new CustomEvent(
      'get', {
        detail: {
          path: $event.path, 
          key: $event.key, 
          val: $event.val, 
        }
      }
    )
  },
  getProp: ($event, $target) => {
    return new CustomEvent(
      `get:${$event.key}`, {
        detail: {
          path: $event.path, 
          key: $event.key, 
          val: $event.val, 
        }
      }
    )
  },
  set: ($event, $target) => {
    return new CustomEvent(
      'set', {
        detail: {
          path: $event.path, 
          key: $event.key, 
          val: $event.val, 
          preval: $event.preval, 
        }
      }
    )
  },
  setProp: ($event, $target) => {
    return new CustomEvent(
      `set:${$event.key}`, {
        detail: {
          path: $event.path, 
          key: $event.key, 
          val: $event.val, 
          preval: $event.preval, 
        }
      }
    )
  },
}

export default Events