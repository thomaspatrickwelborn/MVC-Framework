import DynamicEvent from './DynamicEvent/index.js' 
const Events = {
  // Object Events
  // Object Assign
  // 'assign': (
  //   $event, $target, $eventTarget
  // ) => new DynamicEvent(
  //   'assign', { 
  //     basename: $event.basename,
  //     path: $event.path,
  //     detail: {
  //       target: $target
  //     },
  //   }
  // ),
  // Object Assign Source
  // 'assignSource': (
  //   $event, $target, $eventTarget
  // ) => new DynamicEvent(
  //   'assignSource', { 
  //     basename: $event.basename,
  //     path: $event.path,
  //     detail: {
  //       source: $event.source,
  //     }
  //   }
  // ),
  // Object Assign Source Property
  // 'assignSourceProperty': (
  //   $event, $target, $eventTarget
  // ) => new DynamicEvent(
  //   `assignSourceProperty`, { 
  //     basename: $event.basename,
  //     path: $event.path,
  //     detail: {
  //       key: $event.key,
  //       val: $event.val,
  //       source: $event.source,
  //     }
  //   }
  // ),
  // Object Define Properties
  // 'defineProperties': (
  //   $event, $target, $eventTarget
  // ) => new DynamicEvent(
  //   'defineProperties', {
  //     basename: $event.basename,
  //     path: $event.path,
  //     detail: {
  //       descriptors: $event.descriptors, 
  //     }
  //   }
  // ),
  // // Object Define Property
  // 'defineProperty': (
  //   $event, $target, $eventTarget
  // ) => new DynamicEvent(
  //   `defineProperty`, {
  //     basename: $event.basename,
  //     path: $event.path,
  //     detail: {
  //       prop: $event.prop,
  //       descriptor: $event.descriptor,
  //     }
  //   }
  // ),
  // Object Define Property
  // 'definePropertyKey': (
  //   $event, $target, $eventTarget
  // ) => new DynamicEvent(
  //   `defineProperty:${$event.prop}`, {
  //     basename: $event.basename,
  //     path: $event.path,
  //     detail: {
  //       prop: $event.prop,
  //       descriptor: $event.descriptor,
  //     }
  //   }
  // ),
  // Object Freeze
  // 'freeze': (
  //   $event, $target, $eventTarget
  // ) => new DynamicEvent(
  //   'freeze', {
  //     basename: $event.basename,
  //     path: $event.path,
  //     detail: {
  //       target: $target
  //     }
  //   }
  // ),
  // Object Seal
  // 'seal': (
  //   $event, $target, $eventTarget
  // ) => new DynamicEvent(
  //   'seal', {
  //     basename: $event.basename,
  //     path: $event.path,
  //     detail: {
  //       target: $target
  //     }
  //   }
  // ),
  // Object Set Prototype Of
  'setPrototypeOf': (
    $event, $target, $eventTarget
  ) => new DynamicEvent(
      'setPrototypeOf', {
      basename: $event.basename,
      path: $event.path,
      detail: {
        key: $event.key,
        preprototype: $event.preprototype,
        prototype: $event.prototype,
      }
    }
  ),
  // Array Events
  'copyWithin': (
    $event, $target, $eventTarget
  ) => new DynamicEvent(
    'copyWithin', {
      basename: $event.basename,
      path: $event.path,
      detail: {
        target: $event.target,
        start: $event.start,
        end: $event.end,
        items: $event.items,
      }
    }
  ),
  'copyWithinIndex': (
    $event, $target, $eventTarget
  ) => new DynamicEvent(
    'copyWithinIndex', {
      basename: $event.basename,
      path: $event.path,
      detail: {
        target: $event.target,
        start: $event.start,
        end: $event.end,
        item: $event.item,
      }
    }
  ),
  'fill': (
    $event, $target, $eventTarget
  ) => new DynamicEvent(
    'fill', {
      basename: $event.basename,
      path: $event.path,
      detail: {
        start: $event.start,
        end: $event.end,
        value: $event.value,
      }
    }
  ),
  'fillIndex': (
    $event, $target, $eventTarget
  ) => new DynamicEvent(
    'fillIndex', {
      basename: $event.basename,
      path: $event.path,
      detail: {
        start: $event.start,
        end: $event.end,
        value: $event.value,
      }
    }
  ),
  'lengthSet': (
    $event, $target, $eventTarget
  ) => new DynamicEvent(
    'lengthSet', {
      basename: $event.basename,
      path: $event.path,
      detail: {
        length: $event.length,
      }
    }
  ),
'push': (
    $event, $target, $eventTarget
  ) => new DynamicEvent(
    'push', {
      basename: $event.basename,
      path: $event.path,
      detail: {
        elements: $event.elements,
      }
    }
  ),
  'pushProp': (
    $event, $target, $eventTarget
  ) => new DynamicEvent(
    `pushProp`, {
      basename: $event.basename,
      path: $event.path,
      detail: {
        element: $event.element,
        elementIndex: $event.elementIndex,
      }
    }
  ),
  'pop': (
    $event, $target, $eventTarget
  ) => new DynamicEvent(
    'pop', {
      basename: $event.basename,
      path: $event.path,
      detail: {
        element: $event.element, 
        elementIndex: $event.elementIndex,
      }
    }
  ),
  'reverse': (
    $event, $target, $eventTarget
  ) => new DynamicEvent(
    'reverse', {
      basename: $event.basename,
      path: $event.path,
      detail: {
        preverse: $event.preverse, 
        reverse: $event.reverse, 
      }
    }
  ),
  'shift': (
    $event, $target, $eventTarget
  ) => new DynamicEvent(
    'shift', {
      basename: $event.basename,
      path: $event.path,
      detail: {
        element: $event.element,
        elementIndex: $event.elementIndex,
      }
    }
  ),
  'sort': (
    $event, $target, $eventTarget
  ) => new DynamicEvent(
    'sort', {
      basename: $event.basename,
      path: $event.path,
      detail: {
        presort: $event.presort, 
        sort: $event.sort, 
      }
    }
  ),
  'spliceDelete': (
    $event, $target, $eventTarget
  ) => new DynamicEvent(
    'spliceDelete', {
      basename: $event.basename,
      path: $event.path,
      detail: {
        index: $event.index,
        deleteIndex: $event.deleteIndex,
        deleteItem: $event.deleteItem,
      }
    }
  ),
  'spliceAdd': (
    $event, $target, $eventTarget
  ) => new DynamicEvent(
      'spliceAdd', {
      basename: $event.basename,
      path: $event.path,
      detail: {
        index: $event.index,
        addIndex: $event.addIndex,
        addItem: $event.addItem,
      }
    }
  ),
  'splice': (
    $event, $target, $eventTarget
  ) => new DynamicEvent(
    'splice', {
      basename: $event.basename,
      path: $event.path,
      detail: {
        start: $event.start, 
        deleted: $event.deleted, 
        added: $event.added, 
        length: $event.length, 
      }
    }
  ),
  'unshift': (
    $event, $target, $eventTarget
  ) => new DynamicEvent(
    'unshift', {
      basename: $event.basename,
      path: $event.path,
      detail: {
        elements: $event.elements,
      }
    }
  ),
  'unshiftProp': (
    $event, $target, $eventTarget
  ) => new DynamicEvent(
    `unshiftProp`, {
      basename: $event.basename,
      path: $event.path,
      detail: {
        element: $event.element,
        elementIndex: $event.elementIndex,
      }
    }
  ),
  // Map Events
  // Map Clear Event
  'clear': (
    $event, $target, $eventTarget
  ) => new DynamicEvent(
    'clear', {
      basename: $event.basename,
      path: $event.path,
      detail: {
        presize: $event.presize, 
        size: $event.size, 
      }
    }
  ),
  // Map Clear Event
  'delete': (
    $event, $target, $eventTarget
  ) => new DynamicEvent(
    'delete', {
      basename: $event.basename,
      path: $event.path,
      detail: {
        key: $event.key, 
        preval: $event.preval, 
      }
    }
  ),
  // Map Delete Key Event
  'deleteKey': (
    $event, $target, $eventTarget
  ) => new DynamicEvent(
    `delete:${$event.key}`, {
      basename: $event.basename,
      path: $event.path,
      detail: {
        key: $event.key, 
        preval: $event.preval, 
      }
    }
  ),
  // Map Get Event
  'get': (
    $event, $target, $eventTarget
  ) => new DynamicEvent(
    'get', {
      basename: $event.basename,
      path: $event.path,
      detail: {
        key: $event.key, 
        val: $event.val, 
      }
    }
  ),
  // Map Get Key Event
  'getKey': (
    $event, $target, $eventTarget
  ) => new DynamicEvent(
    `get:${$event.key}`, {
      basename: $event.basename,
      path: $event.path,
      detail: {
        key: $event.key, 
        val: $event.val, 
      }
    }
  ),
  // Map Set Event
  'set': (
    $event, $target, $eventTarget
  ) => new DynamicEvent(
    'set', {
      basename: $event.basename,
      path: $event.path,
      detail: {
        key: $event.key, 
        val: $event.val, 
        preval: $event.preval, 
      }
    }
  ),
  // Map Set Key Event
  'setKey': (
    $event, $target, $eventTarget
  ) => new DynamicEvent(
    `set:${$event.key}`, {
      basename: $event.basename,
      path: $event.path,
      detail: {
        key: $event.key, 
        val: $event.val, 
        preval: $event.preval, 
      }
    }
  )
}

export default Events