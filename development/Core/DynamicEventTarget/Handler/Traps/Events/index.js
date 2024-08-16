const Events = {
  // Object Events
  // Object Assign
  'assign': ($event, $target, $eventTarget) => new CustomEvent(
    'assign', { 
      detail: {
        path: $event.path,
        target: $target
      },
    }
  ),
  // Object Assign Source
  'assignSource': ($event, $target, $eventTarget) => new CustomEvent(
    'assignSource', { 
      detail: {
        path: $event.path,
        source: $event.source,
      }
    }
  ),
  // Object Assign Source Property
  'assignSourceProperty': ($event, $target, $eventTarget) => new CustomEvent(
    `assignSourceProperty`, { 
      detail: {
        path: $event.path,
        key: $event.key,
        val: $event.val,
        source: $event.source,
      }
    }
  ),
  // Object Define Properties
  'defineProperties': ($event, $target, $eventTarget) => new CustomEvent(
    'defineProperties', {
      detail: {
        path: $event.path,
        descriptors: $event.descriptors, 
      }
    }
  ),
  // Object Define Property
  'defineProperty': ($event, $target, $eventTarget) => new CustomEvent(
    `defineProperty`, {
      detail: {
        path: $event.path,
        prop: $event.prop,
        descriptor: $event.descriptor,
      }
    }
  ),
  // Object Define Property
  'definePropertyKey': ($event, $target, $eventTarget) => new CustomEvent(
    `defineProperty:${$event.prop}`, {
      detail: {
        path: $event.path,
        prop: $event.prop,
        descriptor: $event.descriptor,
      }
    }
  ),
  // Object Freeze
  'freeze': ($event, $target, $eventTarget) => new CustomEvent(
    'freeze', {
      detail: {
        path: $event.path,
        target: $target
      }
    }
  ),
  // Object Seal
  'seal': ($event, $target, $eventTarget) => new CustomEvent(
    'seal', {
      detail: {
        path: $event.path,
        target: $target
      }
    }
  ),
  // Object Set Prototype Of
  'setPrototypeOf': ($event, $target, $eventTarget) => new CustomEvent(
    'setPrototypeOf', {
      detail: {
        path: $event.path,
        path: $event.path,
        key: $event.key,
        preprototype: $event.preprototype,
        prototype: $event.prototype,
      }
    }
  ),
  // Array Events
  copyWithin: ($event, $target, $eventTarget) => new CustomEvent(
    'copyWithin', {
      detail: {
        path: $event.path,
        target: $event.target,
        start: $event.start,
        end: $event.end,
        items: $event.items,
      }
    }
  ),
  copyWithinIndex: ($event, $target, $eventTarget) => new CustomEvent(
    'copyWithinIndex', {
      detail: {
        path: $event.path,
        target: $event.target,
        start: $event.start,
        end: $event.end,
        item: $event.item,
      }
    }
  ),
  fill: ($event, $target, $eventTarget) => new CustomEvent(
    'fill', {
      detail: {
        path: $event.path,
        start: $event.start,
        end: $event.end,
        value: $event.value,
      }
    }
  ),
  fillIndex: ($event, $target, $eventTarget) => new CustomEvent(
    'fillIndex', {
      detail: {
        path: $event.path,
        start: $event.start,
        end: $event.end,
        value: $event.value,
      }
    }
  ),
  lengthSet: ($event, $target, $eventTarget) => new CustomEvent(
    'lengthSet', {
      detail: {
        path: $event.path,
        prelength: $event.prelength,
        length: $event.length,
      }
    }
  ),
  push: ($event, $target, $eventTarget) => new CustomEvent(
    'push', {
      detail: {
        path: $event.path,
        elements: $event.elements,
      }
    }
  ),
  pushProp: ($event, $target, $eventTarget) => new CustomEvent(
    `pushProp`, {
      detail: {
        path: $event.path,
        element: $event.element,
        elementIndex: $event.elementIndex,
      }
    }
  ),
  pop: ($event, $target, $eventTarget) => new CustomEvent(
    'pop', {
      detail: {
        path: $event.path,
        element: $event.element, 
        elementIndex: $event.elementIndex,
      }
    }
  ),
  reverse: ($event, $target, $eventTarget) => new CustomEvent(
    'reverse', {
      detail: {
        path: $event.path,
        preverse: $event.preverse, 
        reverse: $event.reverse, 
      }
    }
  ),
  shift: ($event, $target, $eventTarget) => new CustomEvent(
    'shift', {
      detail: {
        path: $event.path,
        element: $event.element,
        elementIndex: $event.elementIndex,
      }
    }
  ),
  sort: ($event, $target, $eventTarget) => new CustomEvent(
    'sort', {
      detail: {
        path: $event.path,
        presort: $event.presort, 
        sort: $event.sort, 
      }
    }
  ),  
  'spliceDelete': ($event, $target, $eventTarget) => new CustomEvent(
    'spliceDelete', {
      detail: {
        path: $event.path,
        index: $event.index,
        deleteIndex: $event.deleteIndex,
        deleteItem: $event.deleteItem,
      }
    }
  ),
  'spliceAdd': ($event, $target, $eventTarget) => new CustomEvent(
    'spliceAdd', {
      detail: {
        path: $event.path,
        index: $event.index,
        addIndex: $event.addIndex,
        addItem: $event.addItem,
      }
    }
  ),
  splice: ($event, $target, $eventTarget) => new CustomEvent(
    'splice', {
      detail: {
        path: $event.path,
        start: $event.start, 
        deleted: $event.deleted, 
        added: $event.added, 
        length: $event.length, 
      }
    }
  ),
  unshift: ($event, $target, $eventTarget) => new CustomEvent(
    'unshift', {
      detail: {
        path: $event.path,
        elements: $event.elements,
      }
    }
  ),
  unshiftProp: ($event, $target, $eventTarget) => new CustomEvent(
    `unshiftProp`, {
      detail: {
        path: $event.path,
        element: $event.element,
        elementIndex: $event.elementIndex,
      }
    }
  ),
  // Map Events
  // Map Clear Event
  clear: ($event, $target, $eventTarget) => new CustomEvent(
    'clear', {
      detail: {
        path: $event.path,
        presize: $event.presize, 
        size: $event.size, 
      }
    }
  ),
  // Map Clear Event
  delete: ($event, $target, $eventTarget) => new CustomEvent(
    'delete', {
      detail: {
        path: $event.path,
        key: $event.key, 
        preval: $event.preval, 
      }
    }
  ),
  // Map Delete Key Event
  deleteKey: ($event, $target, $eventTarget) => new CustomEvent(
    `delete:${$event.key}`, {
      detail: {
        path: $event.path,
        key: $event.key, 
        preval: $event.preval, 
      }
    }
  ),
  // Map Get Event
  get: ($event, $target, $eventTarget) => new CustomEvent(
    'get', {
      detail: {
        path: $event.path,
        key: $event.key, 
        val: $event.val, 
      }
    }
  ),
  // Map Get Key Event
  getKey: ($event, $target, $eventTarget) => new CustomEvent(
    `get:${$event.key}`, {
      detail: {
        path: $event.path,
        key: $event.key, 
        val: $event.val, 
      }
    }
  ),
  // Map Set Event
  set: ($event, $target, $eventTarget) => new CustomEvent(
    'set', {
      detail: {
        path: $event.path,
        key: $event.key, 
        val: $event.val, 
        preval: $event.preval, 
      }
    }
  ),
  // Map Set Key Event
  setKey: ($event, $target, $eventTarget) => new CustomEvent(
    `set:${$event.key}`, {
      detail: {
        path: $event.path,
        key: $event.key, 
        val: $event.val, 
        preval: $event.preval, 
      }
    }
  ),
}

export default Events