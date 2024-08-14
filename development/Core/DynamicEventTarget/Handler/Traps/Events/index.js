const Events = {
  // Object Events
  // Object Assign
  'assign': ($event, $target, $eventTarget) => new CustomEvent(
    'assign', { 
      detail: {
        target: $eventTarget
      },
    }
  ),
  // Object Assign Source
  'assignSource': ($event, $target, $eventTarget) => new CustomEvent(
    'assignSource', { 
      detail: {
        source: $event.source,
      }
    }
  ),
  // Object Assign Source Property
  'assignSourceProperty': ($event, $target, $eventTarget) => new CustomEvent(
    `assignSourceProperty`, { 
      detail: {
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
        descriptors: $event.descriptors, 
      }
    }
  ),
  // Object Define Property
  'defineProperty': ($event, $target, $eventTarget) => new CustomEvent(
    `defineProperty`, {
      detail: {
        prop: $event.prop,
        descriptor: $event.descriptor,
      }
    }
  ),
  // Object Define Property
  'definePropertyKey': ($event, $target, $eventTarget) => new CustomEvent(
    `defineProperty:${$event.prop}`, {
      detail: {
        prop: $event.prop,
        descriptor: $event.descriptor,
      }
    }
  ),
  // Object Freeze
  'freeze': ($event, $target, $eventTarget) => new CustomEvent(
    'freeze', {
      detail: {
        target: $eventTarget
      }
    }
  ),
  // Object Seal
  'seal': ($event, $target, $eventTarget) => new CustomEvent(
    'seal', {
      detail: {
        target: $eventTarget
      }
    }
  ),
  // Object Set Prototype Of
  'setPrototypeOf': ($event, $target, $eventTarget) => new CustomEvent(
    'setPrototypeOf', {
      detail: {
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
        start: $event.start,
        end: $event.end,
        value: $event.value,
      }
    }
  ),
  fillIndex: ($event, $target, $eventTarget) => new CustomEvent(
    'fillIndex', {
      detail: {
        start: $event.start,
        end: $event.end,
        value: $event.value,
      }
    }
  ),
  lengthSet: ($event, $target, $eventTarget) => new CustomEvent(
    'lengthSet', {
      detail: {
        prelength: $event.prelength,
        length: $event.length,
      }
    }
  ),
  push: ($event, $target, $eventTarget) => new CustomEvent(
    'push', {
      detail: {
        elements: $event.elements,
      }
    }
  ),
  pushProp: ($event, $target, $eventTarget) => new CustomEvent(
    `pushProp`, {
      detail: {
        element: $event.element,
        elementIndex: $event.elementIndex,
      }
    }
  ),
  pop: ($event, $target, $eventTarget) => new CustomEvent(
    'pop', {
      detail: {
        element: $event.element, 
        elementIndex: $event.elementIndex,
      }
    }
  ),
  reverse: ($event, $target, $eventTarget) => new CustomEvent(
    'reverse', {
      detail: {
        preverse: $event.preverse, 
        reverse: $event.reverse, 
      }
    }
  ),
  shift: ($event, $target, $eventTarget) => new CustomEvent(
    'shift', {
      detail: {
        element: $event.element,
        elementIndex: $event.elementIndex,
      }
    }
  ),
  sort: ($event, $target, $eventTarget) => new CustomEvent(
    'sort', {
      detail: {
        presort: $event.presort, 
        sort: $event.sort, 
      }
    }
  ),  
  'spliceDelete': ($event, $target, $eventTarget) => new CustomEvent(
    'spliceDelete', {
      detail: {
        index: $event.index,
        deleteIndex: $event.deleteIndex,
        deleteItem: $event.deleteItem,
      }
    }
  ),
  'spliceAdd': ($event, $target, $eventTarget) => new CustomEvent(
    'spliceAdd', {
      detail: {
        index: $event.index,
        addIndex: $event.addIndex,
        addItem: $event.addItem,
      }
    }
  ),
  splice: ($event, $target, $eventTarget) => new CustomEvent(
    'splice', {
      detail: {
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
        elements: $event.elements,
      }
    }
  ),
  unshiftProp: ($event, $target, $eventTarget) => new CustomEvent(
    `unshiftProp`, {
      detail: {
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
        presize: $event.presize, 
        size: $event.size, 
      }
    }
  ),
  // Map Clear Event
  delete: ($event, $target, $eventTarget) => new CustomEvent(
    'delete', {
      detail: {
        key: $event.key, 
        preval: $event.preval, 
      }
    }
  ),
  // Map Delete Key Event
  deleteKey: ($event, $target, $eventTarget) => new CustomEvent(
    `delete:${$event.key}`, {
      detail: {
        key: $event.key, 
        preval: $event.preval, 
      }
    }
  ),
  // Map Get Event
  get: ($event, $target, $eventTarget) => new CustomEvent(
    'get', {
      detail: {
        key: $event.key, 
        val: $event.val, 
      }
    }
  ),
  // Map Get Key Event
  getKey: ($event, $target, $eventTarget) => new CustomEvent(
    `get:${$event.key}`, {
      detail: {
        key: $event.key, 
        val: $event.val, 
      }
    }
  ),
  // Map Set Event
  set: ($event, $target, $eventTarget) => new CustomEvent(
    'set', {
      detail: {
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
        key: $event.key, 
        val: $event.val, 
        preval: $event.preval, 
      }
    }
  ),
}

export default Events