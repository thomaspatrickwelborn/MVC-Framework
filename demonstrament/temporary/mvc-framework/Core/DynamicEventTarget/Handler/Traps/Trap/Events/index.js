const Events = {
  Object: {
    'assign': ($event) => new CustomEvent(
      'assign', { 
        detail: {
          pretarget: $event.pretarget,
          target: $event.target
        },
      }
    ),
    'assign:source': ($event) => new CustomEvent(
      'assign:source', { 
        detail: {
          pretarget: $event.pretarget,
          target: $event.target,
          source: $event.source,
        },
      }
    ),
    'assign:source:key': ($event) => new CustomEvent(
      `assign:source:${$event.key}`, { 
        detail: {
          path: $event.path,
          key: $event.key,
          val: $event.val,
          pretarget: $event.pretarget,
          target: $event.target,
          source: $event.source
        },
      }
    ),
    'defineProperties': ($event) => new CustomEvent(
      'defineProperties', {,
        detail: {
          pretarget: $event.pretarget, 
          target: $event.target,
        },
      }
    ),
    'defineProperty': ($event) => new CustomEvent(
      `defineProperty`, {,
        detail: {
          path: $event.path,
          key: $event.key,
          val: $event.val,
          pretarget: $event.pretarget,
          target: $event.target,
        },
      }
    ),
    'freeze': ($event) => new CustomEvent(
      'freeze', {,
        detail: {
          path: $event.path,
          key: $event.key,
          predescriptor: $event.predescriptor,
          descriptor: $event.descriptor,
        },
      }
    ),
    'seal': ($event) => new CustomEvent(
      'seal', {,
        detail: {
          path: $event.path,
          key: $event.key,
          predescriptor: $event.predescriptor,
          descriptor: $event.descriptor,
        },
      }
    ),
    'setPrototypeOf': ($event) => new CustomEvent(
      'setPrototypeOf', {,
        detail: {
          path: $event.path,
          key: $event.key,
          preprototype: $event.preprototype,
          prototype: $event.prototype,
        },
      }
    ),
  },
  Array: {
    copyWithin: ($event) => new CustomEvent(
      'copyWithin', {,
        detail: {
          start: $event.start,
          end: $event.end,
          items: $event.items,
          precopy: $event.precopy,
          copy: $event.copy,
        },
      }
    ),
    fill: ($event) => new CustomEvent(
      'fill', {,
        detail: {
          start: $event.start,
          end: $event.end,
          items: $event.items,
          prelength: $event.prelength,
          length: $event.length,
        },
      }
    ),
    length: ($event) => new CustomEvent(
      'length', {,
        detail: {
          prelength: $event.prelength,
          length: $event.length,
        },
      }
    ),
    push: ($event) => new CustomEvent(
      'push', {,
        detail: {
          elements: $event.elements,
          prelength: $event.prelength,
          length: $event.length,
        },
      }
    ),
    pop: ($event) => new CustomEvent(
      'pop', {,
        detail: {
          removedElement: $event.removedElement, 
          prelength: $event.prelength,
          length: $event.length,
        },
      }
    ),
    reverse: ($event) => new CustomEvent(
      'reverse', {,
        detail: {
          preverse: $event.preverse, 
          reverse: $event.reverse, 
        },
      }
    ),
    shift: ($event) => new CustomEvent(
      'shift', {,
        detail: {
          removedElement: $event.removedElement, 
          prelength: $event.prelength, 
          length: $event.length, 
        },
      }
    ),
    sort: ($event) => new CustomEvent(
      'sort', {,
        detail: {
          presort: $event.presort, 
          sort: $event.sort, 
        },
      }
    ),
    splice: ($event) => new CustomEvent(
      'splice', {,
        detail: {
          start: $event.start, 
          stop: $event.stop, 
          deleted: $event.deleted, 
          added: $event.added, 
          prelength: $event.prelength, 
          length: $event.length, 
        },
      }
    ),
    unshift: ($event) => new CustomEvent(
      'unshift', {,
        detail: {
          elements: $event.elements, 
          prelength: $event.prelength, 
          length: $event.length, 
        },
      }
    ),
  },
  Map: {
    clear: ($event) => new CustomEvent(
      'clear', {,
        detail: {
          presize: $event.presize, 
          size: $event.size, 
        },
      }
    ),
    delete: ($event) => new CustomEvent(
      'delete', {,
        detail: {
          path: $event.path, 
          key: $event.key, 
          preval: $event.preval, 
        },
      }
    ),
    deleteProp: ($event) => new CustomEvent(
      `delete:${$event.key}`, {,
        detail: {
          path: $event.path, 
          key: $event.key, 
          preval: $event.preval, 
        },
      }
    ),
    get: ($event) => new CustomEvent(
      'get', {,
        detail: {
          path: $event.path, 
          key: $event.key, 
          val: $event.val, 
        },
      }
    ),
    getProp: ($event) => new CustomEvent(
      `get:${$event.key}`, {,
        detail: {
          path: $event.path, 
          key: $event.key, 
          val: $event.val, 
        },
      }
    ),
    set: ($event) => new CustomEvent(
      'set', {,
        detail: {
          path: $event.path, 
          key: $event.key, 
          val: $event.val, 
          preval: $event.preval, 
        },
      }
    ),
    setProp: ($event) => new CustomEvent(
      `set:${$event.key}`, {,
        detail: {
          path: $event.path, 
          key: $event.key, 
          val: $event.val, 
          preval: $event.preval, 
        },
      }
    ),
  },
}
