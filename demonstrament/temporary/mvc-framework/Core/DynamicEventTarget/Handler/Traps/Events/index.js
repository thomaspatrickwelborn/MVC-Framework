const Events = {
  // Object Events
  // Object Assign
  'assign': ($event, $target) => new CustomEvent(
    'assign', { 
      detail: {
        target: $target
      },
    }
  ),
  // Object Assign Source
  'assignSource': ($event, $target) => new CustomEvent(
    'assignSource', { 
      detail: {
        source: $event.source,
      }
    }
  ),
  // Object Assign Source Key
  'assignSourceProperty': ($event, $target) => new CustomEvent(
    `assignSourceProperty`, { 
      detail: {
        key: $event.key,
        val: $event.val,
        source: $event.source,
      }
    }
  ),
  // Object Assign Source Key
  'assignSourcePropertyKey': ($event, $target) => new CustomEvent(
    `assignSourceProperty:${$event.key}`, { 
      detail: {
        key: $event.key,
        val: $event.val,
        source: $event.source,
      }
    }
  ),
  // Object Define Properties
  'defineProperties': ($event, $target) => new CustomEvent(
    'defineProperties', {
      detail: {
        descriptors: $event.descriptors, 
      }
    }
  ),
  // Object Define Property
  'defineProperty': ($event, $target) => new CustomEvent(
    `defineProperty`, {
      detail: {
        prop: $event.prop,
        descriptor: $event.descriptor,
      }
    }
  ),
  // Object Define Property
  'definePropertyKey': ($event, $target) => new CustomEvent(
    `defineProperty:${$event.prop}`, {
      detail: {
        prop: $event.prop,
        descriptor: $event.descriptor,
      }
    }
  ),
  // Object Freeze
  'freeze': ($event, $target) => new CustomEvent(
    'freeze', {
      detail: {
        target: $target
      }
    }
  ),
  // Object Seal
  'seal': ($event, $target) => new CustomEvent(
    'seal', {
      detail: {
        target: $target
      }
    }
  ),
  // Object Set Prototype Of
  'setPrototypeOf': ($event, $target) => new CustomEvent(
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
  copyWithin: ($event, $target) => new CustomEvent(
    'copyWithin', {
      detail: {
        target: $event.target,
        start: $event.start,
        end: $event.end,
        items: $event.items,
      }
    }
  ),
  copyWithinIndex: ($event, $target) => new CustomEvent(
    'copyWithinIndex', {
      detail: {
        target: $event.target,
        start: $event.start,
        end: $event.end,
        item: $event.item,
      }
    }
  ),
  fill: ($event, $target) => new CustomEvent(
    'fill', {
      detail: {
        start: $event.start,
        end: $event.end,
        value: $event.value,
      }
    }
  ),
  fillIndex: ($event, $target) => new CustomEvent(
    'fillIndex', {
      detail: {
        start: $event.start,
        end: $event.end,
        value: $event.value,
      }
    }
  ),
  lengthSet: ($event, $target) => new CustomEvent(
    'lengthSet', {
      detail: {
        prelength: $event.prelength,
        length: $event.length,
      }
    }
  ),
  push: ($event, $target) => new CustomEvent(
    'push', {
      detail: {
        elements: $event.elements,
      }
    }
  ),
  pushProp: ($event, $target) => new CustomEvent(
    `pushProp`, {
      detail: {
        element: $event.element,
        elementIndex: $event.elementIndex,
      }
    }
  ),
  pop: ($event, $target) => new CustomEvent(
    'pop', {
      detail: {
        element: $event.element, 
        elementIndex: $event.elementIndex,
      }
    }
  ),
  reverse: ($event, $target) => new CustomEvent(
    'reverse', {
      detail: {
        preverse: $event.preverse, 
        reverse: $event.reverse, 
      }
    }
  ),
  shift: ($event, $target) => new CustomEvent(
    'shift', {
      detail: {
        element: $event.element,
        elementIndex: $event.elementIndex,
      }
    }
  ),
  sort: ($event, $target) => new CustomEvent(
    'sort', {
      detail: {
        presort: $event.presort, 
        sort: $event.sort, 
      }
    }
  ),  
  'spliceDelete': ($event, $target) => new CustomEvent(
    'spliceDelete', {
      detail: {
        index: $event.index,
        deleteIndex: $event.deleteIndex,
        deleteItem: $event.deleteItem,
      }
    }
  ),
  'spliceAdd': ($event, $target) => new CustomEvent(
    'spliceAdd', {
      detail: {
        index: $event.index,
        addIndex: $event.addIndex,
        addItem: $event.addItem,
      }
    }
  ),
  splice: ($event, $target) => new CustomEvent(
    'splice', {
      detail: {
        start: $event.start, 
        deleted: $event.deleted, 
        added: $event.added, 
        length: $event.length, 
      }
    }
  ),
  unshift: ($event, $target) => new CustomEvent(
    'unshift', {
      detail: {
        elements: $event.elements,
      }
    }
  ),
  unshiftProp: ($event, $target) => new CustomEvent(
    `unshiftProp`, {
      detail: {
        element: $event.element,
        elementIndex: $event.elementIndex,
      }
    }
  ),
  // Map Events
  // Map Clear Event
  clear: ($event, $target) => new CustomEvent(
    'clear', {
      detail: {
        presize: $event.presize, 
        size: $event.size, 
      }
    }
  ),
  // Map Clear Event
  delete: ($event, $target) => new CustomEvent(
    'delete', {
      detail: {
        key: $event.key, 
        preval: $event.preval, 
      }
    }
  ),
  // Map Delete Key Event
  deleteKey: ($event, $target) => new CustomEvent(
    `delete:${$event.key}`, {
      detail: {
        key: $event.key, 
        preval: $event.preval, 
      }
    }
  ),
  // Map Get Event
  get: ($event, $target) => new CustomEvent(
    'get', {
      detail: {
        key: $event.key, 
        val: $event.val, 
      }
    }
  ),
  // Map Get Key Event
  getKey: ($event, $target) => new CustomEvent(
    `get:${$event.key}`, {
      detail: {
        key: $event.key, 
        val: $event.val, 
      }
    }
  ),
  // Map Set Event
  set: ($event, $target) => new CustomEvent(
    'set', {
      detail: {
        key: $event.key, 
        val: $event.val, 
        preval: $event.preval, 
      }
    }
  ),
  // Map Set Key Event
  setKey: ($event, $target) => new CustomEvent(
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