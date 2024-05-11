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
  'assign:source': ($event, $target) => {
    return new CustomEvent(
      'assign:source', { 
        detail: {
          source: $event.source,
        },
      },
      $target
    )
  },
  // Object Assign Source Key
  'assign:source:key': ($event, $target) => {
    return new CustomEvent(
      `assign:source:${$event.key}`, { 
        detail: {
          key: $event.key,
          val: $event.val,
          source: $event.source,
        },
      },
      $target
    )
  },
  // Object Define Properties
  'defineProperties': ($event, $target) => {
    return new CustomEvent(
      'defineProperties', {
        detail: {
          descriptors: $event.descriptors, 
        },
      },
      $target
    )
  },
  // Object Define Property
  'defineProperty': ($event, $target) => {
    return new CustomEvent(
      `defineProperty`, {
        detail: {
          prop: $event.prop,
          descriptor: $event.descriptor,
        },
      },
      $target
    )
  },
  // Object Freeze
  'freeze': ($event, $target) => {
    return new CustomEvent(
      'freeze', {
        detail: {},
      },
      $target
    )
  },
  // Object Seal
  'seal': ($event, $target) => {
    return new CustomEvent(
      'seal', {
        detail: {},
      },
      $target
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
        },
      },
      $target
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
        },
      },
      $target
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
        },
      },
      $target
    )
  },
  length: ($event, $target) => {
    return new CustomEvent(
      'length', {
        detail: {
          prelength: $event.prelength,
          length: $event.length,
        },
      },
      $target
    )
  },
  push: ($event, $target) => {
    return new CustomEvent(
      'push', {
        detail: {
          elements: $event.elements,
          prelength: $event.prelength,
          length: $event.length,
        },
      },
      $target
    )
  },
  pop: ($event, $target) => {
    return new CustomEvent(
      'pop', {
        detail: {
          removedElement: $event.removedElement, 
          prelength: $event.prelength,
          length: $event.length,
        },
      },
      $target
    )
  },
  reverse: ($event, $target) => {
    return new CustomEvent(
      'reverse', {
        detail: {
          preverse: $event.preverse, 
          reverse: $event.reverse, 
        },
      },
      $target
    )
  },
  shift: ($event, $target) => {
    return new CustomEvent(
      'shift', {
        detail: {
          removedElement: $event.removedElement, 
          prelength: $event.prelength, 
          length: $event.length, 
        },
      },
      $target
    )
  },
  sort: ($event, $target) => {
    return new CustomEvent(
      'sort', {
        detail: {
          presort: $event.presort, 
          sort: $event.sort, 
        },
      },
      $target
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
        },
      },
      $target
    )
  },
  unshift: ($event, $target) => {
    return new CustomEvent(
      'unshift', {
        detail: {
          elements: $event.elements, 
          prelength: $event.prelength, 
          length: $event.length, 
        },
      },
      $target
    )
  },
  // Map Events
  clear: ($event, $target) => {
    return new CustomEvent(
      'clear', {
        detail: {
          presize: $event.presize, 
          size: $event.size, 
        },
      },
      $target
    )
  },
  delete: ($event, $target) => {
    return new CustomEvent(
      'delete', {
        detail: {
          path: $event.path, 
          key: $event.key, 
          preval: $event.preval, 
        },
      },
      $target
    )
  },
  deleteProp: ($event, $target) => {
    return new CustomEvent(
      `delete:${$event.key}`, {
        detail: {
          path: $event.path, 
          key: $event.key, 
          preval: $event.preval, 
        },
      },
      $target
    )
  },
  get: ($event, $target) => {
    return new CustomEvent(
      'get', {
        detail: {
          path: $event.path, 
          key: $event.key, 
          val: $event.val, 
        },
      },
      $target
    )
  },
  getProp: ($event, $target) => {
    return new CustomEvent(
      `get:${$event.key}`, {
        detail: {
          path: $event.path, 
          key: $event.key, 
          val: $event.val, 
        },
      },
      $target
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
        },
      },
      $target
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
        },
      },
      $target
    )
  },
}

export default Events