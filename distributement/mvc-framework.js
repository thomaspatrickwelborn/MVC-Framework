const typeOf = ($data) => Object
	.prototype
	.toString
	.call($data).slice(8, -1).toLowerCase();

function parseShortenedEvents($propEvents) {
	if(typeOf($propEvents) === 'array') return $propEvents
	const propEvents = [];
	for(const [
		$propEventSettings, $propEventCallback
	] of Object.entries($propEvents)) {
		const propEventSettings = $propEventSettings.split(' ');
		let type, target;
		if(propEventSettings.length === 1) {
			target = ':scope';
			type = propEventSettings[0];
		} else if(propEventSettings.length > 1) {
			target = propEventSettings[0];
			type = propEventSettings[1];
		}
		const propEvent = {
			type,
			target,
			callback: $propEventCallback,
			enable: false,
		};
		propEvents.push(propEvent);
	}
	return propEvents
}

class DynamicEvent extends Event {
  #settings
  constructor($type, $settings) {
    super($type);
    this.#settings = $settings;
  }
  get basename() { return this.#settings.basename }
  get path() { return this.#settings.path }
  get detail() { return this.#settings.detail }
}

const Events$1 = {
  // Object Events
  // Object Assign
  'assign': (
    $event, $target, $eventTarget
  ) => new DynamicEvent(
    'assign', { 
      basename: $event.basename,
      path: $event.path,
      detail: {
        target: $target
      },
    }
  ),
  // Object Assign Source
  'assignSource': (
    $event, $target, $eventTarget
  ) => new DynamicEvent(
    'assignSource', { 
      basename: $event.basename,
      path: $event.path,
      detail: {
        source: $event.source,
      }
    }
  ),
  // Object Assign Source Property
  'assignSourceProperty': (
    $event, $target, $eventTarget
  ) => new DynamicEvent(
    `assignSourceProperty`, { 
      basename: $event.basename,
      path: $event.path,
      detail: {
        key: $event.key,
        val: $event.val,
        source: $event.source,
      }
    }
  ),
  // Object Define Properties
  'defineProperties': (
    $event, $target, $eventTarget
  ) => new DynamicEvent(
    'defineProperties', {
      basename: $event.basename,
      path: $event.path,
      detail: {
        descriptors: $event.descriptors, 
      }
    }
  ),
  // Object Define Property
  'defineProperty': (
    $event, $target, $eventTarget
  ) => new DynamicEvent(
    `defineProperty`, {
      basename: $event.basename,
      path: $event.path,
      detail: {
        prop: $event.prop,
        descriptor: $event.descriptor,
      }
    }
    ),
  // Object Define Property
  'definePropertyKey': (
    $event, $target, $eventTarget
  ) => new DynamicEvent(
    `defineProperty:${$event.prop}`, {
      basename: $event.basename,
      path: $event.path,
      detail: {
        prop: $event.prop,
        descriptor: $event.descriptor,
      }
    }
  ),
  // Object Freeze
  'freeze': (
    $event, $target, $eventTarget
  ) => new DynamicEvent(
    'freeze', {
      basename: $event.basename,
      path: $event.path,
      detail: {
        target: $target
      }
    }
  ),
  // Object Seal
  'seal': (
    $event, $target, $eventTarget
  ) => new DynamicEvent(
    'seal', {
      basename: $event.basename,
      path: $event.path,
      detail: {
        target: $target
      }
    }
  ),
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
        prelength: $event.prelength,
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
};

class Trap {
  constructor($methods, $aliases, $options = {}) {
    for(let [
      $methodName, $definePropertyMethod
    ] of Object.entries($methods)) {
      const methodOptions = $options[$methodName];
      $definePropertyMethod(
        this, $methodName, $aliases, methodOptions
      );
    }
  }
  createEvent(
    $eventTarget, 
    $eventType, 
    $eventData, 
    $target, 
  ) {
    const event = Events$1[$eventType](
      $eventData, 
      $target, 
      $eventTarget, 
    );
    $eventTarget.dispatchEvent(event);
    return event
  }
}

function isDirectInstanceOf($object, $constructor) {
  if($object === null || $object === undefined) return false
  if(Array.isArray($constructor)) {
    for(const $constructorClass of $constructor) {
      if(Object.getPrototypeOf($object) === $constructorClass.prototype) {
        return true
      }
    }
    return false
  } else {
    return Object.getPrototypeOf($object) === $constructor.prototype
  }
}

function Assign(
  $trap, $trapPropertyName, $aliases, $options
) {
  const {
    $eventTarget, 
    $root, 
    $rootAlias, 
    $basename,
    $path, 
  } = $aliases;
  const { merge } = $options;
  return Object.defineProperty(
    $trap, $trapPropertyName, {
      value: function() {
        const sources = [...arguments];
        // Iterate Sources
        for(let $source of sources) {
          // Iterate Source Props
          for(let [
            $sourcePropKey, $sourcePropVal
          ] of Object.entries($source)) {
            // Assign Root DET Property
            if(
              isDirectInstanceOf(
                $sourcePropVal, [Object, Array/*, Map*/]
              )
            ) {
              // Assign Existent Root DET Property
              if(
                merge === true &&
                $root[$sourcePropKey]
                ?.constructor.name === 'bound DynamicEventTarget'
              ) {
                $root[$sourcePropKey].assign($sourcePropVal);
              } else 
              // Assign Non-Existent Root DET Property
              {
                const basename = $sourcePropKey;
                const path = (
                  $path !== null
                ) ? $path.concat('.', $sourcePropKey)
                  : $sourcePropKey;
                const detObject = new DynamicEventTarget(
                  $sourcePropVal, {
                    $rootAlias,
                    $path: path,
                    $basename: basename,
                    $parent: $eventTarget
                  }
                );
                detObject.addEventListener(
                  'assignSourceProperty', ($event) => {
                    const assignSourcePropertyEventData = {
                      key: $event.detail.key,
                      val: $event.detail.val,
                      source: $event.detail.source,
                      path: $event.path,
                      basename: $event.basename,
                    };
                    $trap.createEvent(
                      $eventTarget, 
                      'assignSourceProperty',
                      assignSourcePropertyEventData,
                      $root,
                    );
                  }
                );
                detObject.addEventListener(
                  'assignSource', ($event) => {
                    const assignSourceEventData = {
                      source: $event.detail.source,
                      path: $event.path,
                      basename: $event.basename,
                    };
                    $trap.createEvent(
                      $eventTarget,
                      'assignSource',
                      assignSourceEventData,
                      $root
                    );
                  }
                );
                detObject.addEventListener(
                  'assign', ($event) => {
                    const assignEventData = {
                      sources: $event.detail.sources,
                      path: $event.path,
                      basename: $event.basename,
                    };
                    $trap.createEvent(
                      $eventTarget,
                      'assign',
                      assignEventData,
                      $root,
                    );
                  }
                );
                Object.assign($root, {
                  [$sourcePropKey]: detObject
                });
              }
            } else 
            // Assign Root Property
            {
              Object.assign($root, {
                [$sourcePropKey]: $sourcePropVal
              });
            }
            // Assign Source Property Event Data
            const assignSourcePropertyEventData = {
              key: $sourcePropKey,
              val: $sourcePropVal,
              source: $source,
              path: $path,
              basename: $basename,
            };
            // Assign Source Property Event
            $trap.createEvent(
              $eventTarget, 
              'assignSourceProperty',
              assignSourcePropertyEventData,
              $root,
            );
          }
          // Assign Source Event Data
          const assignSourceEventData = {
            source: $source,
            path: $path,
            basename: $basename,
          };
          // Assign Source Event
          $trap.createEvent(
            $eventTarget,
            'assignSource',
            assignSourceEventData,
            $root
          );
        }
        // Assign Event Data
        const assignEventData = {
          sources,
          path: $path,
          basename: $basename,
        };
        // Assign Event
        $trap.createEvent(
          $eventTarget,
          'assign',
          assignEventData,
          $root,
        );
        return $root
      }
    }
  )
}

function DefineProperties(
  $trap, $trapPropertyName, $aliases, $options
) {
  const {
    $eventTarget, 
    $root, 
    $rootAlias, 
    $basename,
    $path, 
  } = $aliases;
  return Object.defineProperty(
    $trap, $trapPropertyName, {
      value: function() {
        const $propertyDescriptors = arguments[0];
        // Iterate Property Descriptors
        for(const [
          $propertyKey, $propertyDescriptor
        ] of Object.entries($propertyDescriptors)) {
          // Property Descriptor Value Is Direct Instance Of Array/Object/Map
          $trap.defineProperty($propertyKey, $propertyDescriptor);
        }
        // Define Properties Event Data
        const definePropertiesEventData = {
          descriptors: $propertyDescriptors,
          path: $path,
          basename: $basename,
        };
        // Define Properties Event
        $trap.createEvent(
          $eventTarget,
          'defineProperties',
          definePropertiesEventData,
        );
        return $root
      }
    }
  )
}

function DefineProperty(
  $trap, $trapPropertyName, $aliases, $options
) {
  const {
    $eventTarget, 
    $root, 
    $rootAlias, 
    $basename,
    $path, 
  } = $aliases;
  const { descriptorValueMerge, descriptorTree } = $options;
  function defineProperty($event) {
    const definePropertyEventData = {
      prop: $event.detail.prop,
      descriptor: $event.detail.descriptor,
      path: $event.path,
      basename: $event.basename,
    };
    $trap.createEvent(
      $eventTarget,
      'defineProperty',
      definePropertyEventData,
      $root,
    );
  }
  return Object.defineProperty(
    $trap, $trapPropertyName, {
      value: function() {
        const propertyKey = arguments[0];
        const propertyDescriptor = arguments[1];
        // Property Descriptor Value Is Direct Instance Of Array/Object/Map
        if(isDirectInstanceOf(
          propertyDescriptor.value, [Object, Array/*, Map*/]
        )) {
          const rootPropertyDescriptor = Object.getOwnPropertyDescriptor(
            $root, propertyKey
          ) || {};
          // Root Property Descriptor Value Is Existent DET Instance
          if(
            descriptorValueMerge === true &&
            rootPropertyDescriptor.value // instanceof DynamicEventTarget
            ?.constructor.name === 'bound DynamicEventTarget'
          ) {
            $root[propertyKey].removeEventListener(
              'defineProperty',
              defineProperty
            );
            $root[propertyKey].addEventListener(
              'defineProperty',
              defineProperty
            );
            // Root Define Properties, Descriptor Tree
            if(descriptorTree === true) {
              $trap.defineProperty(propertyKey, propertyDescriptor);
            } else
            // Root Define Properties, No Descriptor Tree
            {
              Object.defineProperty(
                $root, propertyKey, propertyDescriptor
              );
            }
          }
          // Root Property Descriptor Value Is Non-Existent DET Instance
          else {
            const basename = propertyKey;
            const path = (
              $path !== null
            ) ? $path.concat('.', propertyKey)
              : propertyKey;
            const root = (
              typeOf(
                propertyDescriptor.value
              ) === 'object'
            ) ? {}
              : (
              typeOf(
                propertyDescriptor.value
              ) === 'array'
            ) ? []
            //   : typeOf(
            //   propertyDescriptor.value
            // ) === 'map'
            //   ? new Map()
              : {};
            const detObject = new DynamicEventTarget(
              root, {
                $rootAlias,
                $path: path,
                $basename: basename,
                $parent: $eventTarget,
              }
            );
            detObject.addEventListener(
              'defineProperty',
              defineProperty
            );
            // Root Define Properties, Descriptor Tree
            if(descriptorTree === true) {
              detObject.defineProperties(
                propertyDescriptor.value
              );
              $root[propertyKey] = detObject;
            } else {
              Object.defineProperty(
                $root, propertyKey, propertyDescriptor
              );
            }
          }
        } else {
          Object.defineProperty(
            $root, propertyKey, propertyDescriptor
          );
        }
        // Define Property Event Data
        const definePropertyEventData = {
          prop: propertyKey,
          descriptor: propertyDescriptor,
          path: $path,
          basename: $basename,
        };
        // Define Property Event
        $trap.createEvent(
          $eventTarget,
          'defineProperty',
          definePropertyEventData,
          $root,
        );
        return $root
      }
    }
  )
}

function Entries$1(
  $trap, $trapPropertyName, $aliases
) {
  const { $eventTarget, $root } = $aliases;
  return Object.defineProperty(
    $trap, $trapPropertyName, {
      value: function() {
        return Object.entries($root)
      }
    }
  )
}

function Freeze(
  $trap, $trapPropertyName, $aliases, $options
) {
  const {
    $eventTarget, 
    $root, 
    $rootAlias, 
    $basename,
    $path,
  } = $aliases;
  const { recurse } = $options;
  return Object.defineProperty(
    $trap, $trapPropertyName, {
      value: function () {
        if(recurse === true) {
          for(const [
            $propertyKey, $propertyValue
          ] of Object.entries(this)) {
            if(
              $propertyValue.constructor.name === 'bound DynamicEventTarget'
            ) {
              $propertyValue.addEventListener(
                'freeze', ($event) => {
                  const freezeEventData = {
                    path: $event.path,
                    basename: $event.basename,
                  };
                  $trap.createEvent(
                    $eventTarget, 
                    'freeze',
                    freezeEventData,
                    this,
                  );
                }
              );
              $propertyValue.freeze();
            } else {
              Object.freeze($propertyValue);
            }
            (
              $path !== null
            ) ? $path.concat('.', $propertyKey)
              : $propertyKey;
            const freezeEventData = {
              path: $path,
              basename: $basename,
            };
            $trap.createEvent(
              $eventTarget,
              'freeze',
              freezeEventData,
              this
            );
          }
        }
        Object.freeze(this);
        return $root
      }
    }
  )
}

function FromEntries(
  $trap, $trapPropertyName, $aliases
) {
  const { $eventTarget, $root } = $aliases;
  return Object.defineProperty(
    $trap, $trapPropertyName, {
      value: function() {
        return Object[$trapPropertyName](
          Object.entries($root)
        )
      }
    }
  )
}

function GetOwnPropertyDescriptor(
  $trap, $trapPropertyName, $aliases
) {
  const { $eventTarget, $root } = $aliases;
  return Object.defineProperty(
    $trap, $trapPropertyName, {
      value: function() {
        return Object.getOwnPropertyDescriptor($root, ...arguments)
      }
    }
  )
}

function GetOwnPropertyDescriptors(
  $trap, $trapPropertyName, $aliases
) {
  const { $eventTarget, $root } = $aliases;
  return Object.defineProperty(
    $trap, $trapPropertyName, {
      value: function() {
        return Object.getOwnPropertyDescriptors($root)
      }
    }
  )
}

function GetOwnPropertyNames(
  $trap, $trapPropertyName, $aliases
) {
  const { $eventTarget, $root } = $aliases;
  return Object.defineProperty(
    $trap, $trapPropertyName, {
      value: function() {
        return Object.getOwnPropertyNames($root)
      }
    }
  )
}

function GetOwnPropertySymbols(
  $trap, $trapPropertyName, $aliases
) {
  const { $eventTarget, $root } = $aliases;
  return Object.defineProperty(
    $trap, $trapPropertyName, {
      value: function() {
        return Object.getOwnPropertySymbols($root)
      }
    }
  )
}

function GetPrototypeOf(
  $trap, $trapPropertyName, $aliases
) {
  const { $eventTarget, $root } = $aliases;
  return Object.defineProperty(
    $trap, $trapPropertyName, {
      value: function() {
        return Object.getPrototypeOf($root)
      }
    }
  )
}

function GroupBy(
  $trap, $trapPropertyName, $aliases
) {
  const { $eventTarget, $root } = $aliases;
  return Object.defineProperty(
    $trap, $trapPropertyName, {
      value: function() {
        return Object.groupBy($root, ...arguments)
      }
    }
  )
}

function HasOwn(
  $trap, $trapPropertyName, $aliases
) {
  const { $eventTarget, $root } = $aliases;
  return Object.defineProperty(
    $trap, $trapPropertyName, {
      get() {
        return Object.hasOwn($root, ...arguments)
      },
      set($method) {
        $root[$method] = $method;
      },
    }
  )
}

function HasOwnProperty(
  $trap, $trapPropertyName, $aliases
) {
  const { $eventTarget, $root } = $aliases;
  return Object.defineProperty(
    $trap, $trapPropertyName, {
      value: function() {
        return Object.prototype.hasOwnProperty.call(
          $root, ...arguments
        )
      }
    }
  )
}

function Is(
  $trap, $trapPropertyName, $aliases
) {
  const { $eventTarget, $root } = $aliases;
  return Object.defineProperty(
    $trap, $trapPropertyName, {
      value: function() {
        return Object.is($root, ...arguments)
      }
    }
  )
}

function IsExtensible(
  $trap, $trapPropertyName, $aliases
) {
  const { $eventTarget, $root } = $aliases;
  return Object.defineProperty(
    $trap, $trapPropertyName, {
      value: function() {
        return Object.isExtensible($root)
      }
    }
  )
}

function IsFrozen(
  $trap, $trapPropertyName, $aliases
) {
  const { $eventTarget, $root } = $aliases;
  return Object.defineProperty(
    $trap, $trapPropertyName, {
      value: function() {
        return Object.isFrozen($root)
      }
    }
  )
}

function IsSealed(
  $trap, $trapPropertyName, $aliases
) {
  const { $eventTarget, $root } = $aliases;
  return Object.defineProperty(
    $trap, $trapPropertyName, {
      value: function() {
        return Object.isSealed($root)
      }
    }
  )
}

function IsPrototypeOf(
  $trap, $trapPropertyName, $aliases
) {
  const { $eventTarget, $root } = $aliases;
  return Object.defineProperty(
    $trap, $trapPropertyName, {
      value: function() {
        return Object.prototype.isPrototypeOf.call(
          $root, ...arguments
        )
      }
    }
  )
}

function Keys$1(
  $trap, $trapPropertyName, $aliases
) {
  const { $eventTarget, $root } = $aliases;
  return Object.defineProperty(
    $trap, $trapPropertyName, {
      value: function() {
        return Object.keys($root)
      }
    }
  )
}

function PreventExtensions(
  $trap, $trapPropertyName, $aliases
) {
  const { $eventTarget, $root } = $aliases;
  return Object.defineProperty(
    $trap, $trapPropertyName, {
      value: function() {
        return Object.preventExtensions($root)
      }
    }
  )
}

function PropertyIsEnumerable(
  $trap, $trapPropertyName, $aliases
) {
  const { $eventTarget, $root } = $aliases;
  return Object.defineProperty(
    $trap, $trapPropertyName, {
      value: function() {
        return Object.prototype.propertyIsEnumerable.call(
          $root, ...arguments
        )
      }
    }
  )
}

function Seal(
  $trap, $trapPropertyName, $aliases, $options
) {
  const {
    $eventTarget, 
    $root, 
    $rootAlias, 
    $basename,
    $path,
  } = $aliases;
  const { recurse } = $options;
  return Object.defineProperty(
    $trap, $trapPropertyName, {
      value: function () {
        if(recurse === true) {
          for(const [
            $propertyKey, $propertyValue
          ] of Object.entries(this)) {
            if(
              $propertyValue.constructor.name === 'bound DynamicEventTarget'
            ) {
              $propertyValue.addEventListener(
                'seal', ($event) => {
                  const sealEventData = {
                    path: $event.path,
                    basename: $event.basename,
                  };
                  $trap.createEvent(
                    $eventTarget, 
                    'seal',
                    sealEventData,
                    this,
                  );
                }
              );
              $propertyValue.seal();
            } else {
              Object.seal($propertyValue);
            }
            (
              $path !== null
            ) ? $path.concat('.', $propertyKey)
              : $propertyKey;
            const sealEventData = {
              path: $path,
              basename: $basename,
            };
            $trap.createEvent(
              $eventTarget,
              'seal',
              sealEventData,
              this
            );
          }
        }
        Object.seal(this);
        return $root
      }
    }
  )
}

function SetPrototypeOf(
  $trap, $trapPropertyName, $aliases
) {
  const { $eventTarget, $root } = $aliases;
  return Object.defineProperty(
    $trap, $trapPropertyName, {
      value: function () {
        const prototype = arguments[0];
        Object.setPrototypeOf($root, prototype);
        $trap.createEvent(
          $eventTarget,
          'setPrototypeOf',
          {
            prototype
          },
          $root
        );
        return $root
      }
    }
  )
}

function ToString$1(
  $trap, $trapPropertyName, $aliases
) {
  const { $eventTarget, $root } = $aliases;
  return Object.defineProperty(
    $trap, $trapPropertyName, {
      get() {
        return $root['toString'](...arguments)
      },
      set($method) {
        $root[$method] = $method;
      },
    }
  )
}

function ToLocaleString(
  $trap, $trapPropertyName, $aliases
) {
  const { $eventTarget, $root } = $aliases;
  return Object.defineProperty(
    $trap, $trapPropertyName, {
      get() {
        return $root['toLocaleString'](...arguments)
      },
      set($method) {
        $root[$method] = $method;
      },
    }
  )
}

function Values$1(
  $trap, $trapPropertyName, $aliases
) {
  const { $eventTarget, $root } = $aliases;
  return Object.defineProperty(
    $trap, $trapPropertyName, {
      value: function() {
        return Object.values($root)
      }
    }
  )
}

function ValueOf(
  $trap, $trapPropertyName, $aliases
) {
  const { $eventTarget, $root } = $aliases;
  return Object.defineProperty(
    $trap, $trapPropertyName, {
      get() {
        return $root['valueOf'](...arguments)
      },
      set($method) {
        $root[$method] = $method;
      },
    }
  )
}

var ObjectProperty = {
  assign: Assign,
  defineProperties: DefineProperties,
  defineProperty: DefineProperty,
  entries: Entries$1,
  freeze: Freeze,
  fromEntries: FromEntries,
  getOwnPropertyDescriptor: GetOwnPropertyDescriptor,
  getOwnPropertyDescriptors: GetOwnPropertyDescriptors,
  getOwnPropertyNames: GetOwnPropertyNames,
  getOwnPropertySymbols: GetOwnPropertySymbols,
  getPrototypeOf: GetPrototypeOf,
  groupBy: GroupBy,
  hasOwn: HasOwn,
  hasOwnProperty: HasOwnProperty,
  is: Is,
  isExtensible: IsExtensible,
  isFrozen: IsFrozen,
  isSealed: IsSealed,
  isPrototypeOf: IsPrototypeOf,
  keys: Keys$1,
  preventExtensions: PreventExtensions,
  propertyIsEnumerable: PropertyIsEnumerable,
  seal: Seal,
  setPrototypeOf: SetPrototypeOf,
  toString: ToString$1,
  toLocaleString: ToLocaleString,
  values: Values$1,
  valueOf: ValueOf,
};

function At(
  $trap, $trapPropertyName, $aliases
) {
  const { $eventTarget, $root } = $aliases;
  return Object.defineProperty(
    $trap, $trapPropertyName, {
      value: function() {
        return Array.prototype.pop.call($root, ...arguments)
      }
    }
  )
}

function CopyWithin(
  $trap, $trapPropertyName, $aliases
) {
  const {
    $eventTarget, 
    $root, 
    $rootAlias, 
    $basename,
    $path, 
  } = $aliases;
  $eventTarget.addEventListener(
    'copyWithin', 
    ($event) => {
      if($eventTarget.parent !== null) {
        const copyWithinEventData = {
          basename: $event.basename,
          path: $event.path,
          target: $event.detail.target,
          start: $event.detail.start,
          end: $event.detail.end,
          items: $event.detail.items,
        };
        $trap.createEvent(
          $eventTarget.parent,
          'copyWithin',
          copyWithinEventData,
        );
      }
    }
  );
  $eventTarget.addEventListener(
    'copyWithinIndex', 
    ($event) => {
      if($eventTarget.parent !== null) {
        const copyWithinIndexEventData = {
          basename: $event.basename,
          path: $event.path,
          target: $event.detail.target,
          start: $event.detail.start,
          end: $event.detail.end,
          item: $event.detail.item,
        };
        $trap.createEvent(
          $eventTarget.parent,
          'copyWithinIndex', 
          copyWithinIndexEventData,
        );
      }
    }
  );
  return Object.defineProperty(
    $trap, $trapPropertyName, {
      value: function() {
        const target = (
          arguments[0] >= 0
        ) ? arguments[0]
          : $root.length = arguments[0];
        const start = (
          arguments[1] >= 0
        ) ? arguments[1]
          : $root.length + arguments[1];
        const end = (
          arguments[2] === undefined
        ) ? $root.length
          : (
          arguments[2] >= 0
        ) ? arguments[2]
          : $root.length + arguments[2];
        const copiedItems = [];
        let copyIndex = start;
        let targetIndex = target;
        while(copyIndex < end) {
          const copyItem = $root[copyIndex];
          copiedItems.push(copyItem);
          Array.prototype.copyWithin.call(
            $root,
            targetIndex,
            copyIndex,
            copyIndex + 1
          );
          // Array Copy Within Index Event Data
          const copyWithinIndexEventData = {
            basename: $eventTarget.basename,
            path: $eventTarget.path,
            target: targetIndex,
            start: copyIndex,
            end: copyIndex + 1,
            item: copyItem,
          };
          // Array Copy Within Index Event
          $trap.createEvent(
            $eventTarget,
            'copyWithinIndex', 
            copyWithinIndexEventData,
          );
          copyIndex++;
          targetIndex++;
        }
        // Array Copy Within Event Data
        const copyWithinEventData = {
          basename: $eventTarget.basename,
          path: $eventTarget.path,
          target: target,
          start: start,
          end: end,
          items: copiedItems,
        };
        // Array Copy Within Event
        $trap.createEvent(
          $eventTarget,
          'copyWithin',
          copyWithinEventData,
        );
      }
    }
  )
}

function Concat(
  $trap, $trapPropertyName, $aliases
) {
  const { $eventTarget, $root } = $aliases;
  return Object.defineProperty(
    $trap, $trapPropertyName, {
      value: function() {
        return Array.prototype.concat.call($root, ...arguments)
      }
    }
  )
}

function Entries(
  $trap, $trapPropertyName, $aliases
) {
  const { $eventTarget, $root } = $aliases;
  return Object.defineProperty(
    $trap, $trapPropertyName, {
      value: function() {
        return Array.prototype.entries.call($root)
      }
    }
  )
}

function Every(
  $trap, $trapPropertyName, $aliases
) {
  const { $eventTarget, $root } = $aliases;
  return Object.defineProperty(
    $trap, $trapPropertyName, {
      value: function() {
        return Array.prototype.every.call($root, ...arguments)
      }
    }
  )
}

function Fill(
  $trap, $trapPropertyName, $aliases
) {
  const { $eventTarget, $root, $rootAlias } = $aliases;
  return Object.defineProperty(
    $trap, $trapPropertyName, {
      value: function() {
        const $arguments = [...arguments];
        let value = $arguments[0];
        if(isDirectInstanceOf(
          $sourcePropVal, [Object, Array/*, Map*/]
        )) {
          value = new DynamicEventTarget(value, {
            rootAlias: $rootAlias,
          });
        }
        const start = (
          $arguments[1] >= 0
        ) ? $arguments[1]
          : $root.length + $arguments[1];
        const end = (
          $arguments[2] >= 0
        ) ? $arguments[2]
          : $root.length + $arguments[2];
        let fillIndex = start;
        while(
          fillIndex < $root.length &&
          fillIndex < end
        ) {
          Array.prototype.fill.call(
            $root, value, fillIndex, fillIndex + 1
          );
          // Array Fill Index Event
          $trap.createEvent(
            $eventTarget,
            'fillIndex',
            {
              start: fillIndex,
              end: fillIndex + 1,
              value,
              path: $path,
              basename: $basename,
            },
          );
          fillIndex++;
        }
        // Array Fill Event
        $trap.createEvent(
          $eventTarget,
          'fill',
          {
            start,
            end,
            value,
            path: $path,
            basename: $basename,
          },
        );
        return $root
      }
    }
  )
}

function Filter(
  $trap, $trapPropertyName, $aliases
) {
  const { $eventTarget, $root } = $aliases;
  return Object.defineProperty(
    $trap, $trapPropertyName, {
      value: function() {
        return Array.prototype.filter.call($root, ...arguments)
      }
    }
  )
}

function Find(
  $trap, $trapPropertyName, $aliases
) {
  const { $eventTarget, $root } = $aliases;
  return Object.defineProperty(
    $trap, $trapPropertyName, {
      value: function() {
        return Array.prototype.find.call($root, ...arguments)
      }
    }
  )
}

function FindIndex(
  $trap, $trapPropertyName, $aliases
) {
  const { $eventTarget, $root } = $aliases;
  return Object.defineProperty(
    $trap, $trapPropertyName, {
      value: function() {
        return Array.prototype.findIndex.call($root, ...arguments)
      }
    }
  )
}

function FindLast(
  $trap, $trapPropertyName, $aliases
) {
  const { $eventTarget, $root } = $aliases;
  return Object.defineProperty(
    $trap, $trapPropertyName, {
      value: function() {
        return Array.prototype.findLast.call($root, ...arguments)
      }
    }
  )
}

function FindLastIndex(
  $trap, $trapPropertyName, $aliases
) {
  const { $eventTarget, $root } = $aliases;
  return Object.defineProperty(
    $trap, $trapPropertyName, {
      value: function() {
        return Array.prototype.findLastIndex.call($root, ...arguments)
      }
    }
  )
}

function Flat(
  $trap, $trapPropertyName, $aliases
) {
  const { $eventTarget, $root } = $aliases;
  return Object.defineProperty(
    $trap, $trapPropertyName, {
      value: function() {
        return Array.prototype.flat.call($root, ...arguments)
      }
    }
  )
}

function FlatMap(
  $trap, $trapPropertyName, $aliases
) {
  const { $eventTarget, $root } = $aliases;
  return Object.defineProperty(
    $trap, $trapPropertyName, {
      value: function() {
        return Array.prototype.flatMap.call($root, ...arguments)
      }
    }
  )
}

function ForEach(
  $trap, $trapPropertyName, $aliases
) {
  const { $eventTarget, $root } = $aliases;
  return Object.defineProperty(
    $trap, $trapPropertyName, {
      value: function() {
        return Array.prototype.forEach.call($root, ...arguments)
      }
    }
  )
}

function From(
  $trap, $trapPropertyName, $aliases
) {
  const { $eventTarget, $root } = $aliases;
  return Object.defineProperty(
    $trap, $trapPropertyName, {
      value: function() {
        return Array.from.call($root, $root, ...arguments)
      },
    }
  )
}

function IndexOf(
  $trap, $trapPropertyName, $aliases
) {
  const { $eventTarget, $root } = $aliases;
  return Object.defineProperty(
    $trap, $trapPropertyName, {
      value: function() {
        return Array.prototype.indexOf.call($root, ...arguments)
      }
    }
  )
}

function IsArray(
  $trap, $trapPropertyName, $aliases
) {
  const { $eventTarget, $root } = $aliases;
  return Object.defineProperty(
    $trap, $trapPropertyName, {
      value: function() {
        return Array.isArray.call($root)
      },
    }
  )
}

function Join(
  $trap, $trapPropertyName, $aliases
) {
  const { $eventTarget, $root } = $aliases;
  return Object.defineProperty(
    $trap, $trapPropertyName, {
      value: function() {
        return Array.prototype.join.call($root)
      },
    }
  )
}

function Keys(
  $trap, $trapPropertyName, $aliases
) {
  const { $eventTarget, $root } = $aliases;
  return Object.defineProperty(
    $trap, $trapPropertyName, {
      value: function() {
        return Array.prototype.keys.call($root)
      },
    }
  )
}

function LastIndexOf(
  $trap, $trapPropertyName, $aliases
) {
  const { $eventTarget, $root } = $aliases;
  return Object.defineProperty(
    $trap, $trapPropertyName, {
      value: function() {
        return Array.prototype.lastIndexOf.call($root)
      },
    }
  )
}

function Length(
  $trap, $trapPropertyName, $aliases
) {
  const { $eventTarget, $root } = $aliases;
  return Object.defineProperty(
    $trap, $trapPropertyName, {
      get() {
        return $root.length
      },
      set($length) {
        $root.length = $length;
        // Array Length Set Event
        $trap.createEvent(
          $eventTarget,
          'lengthSet',
          {
            length: $root.length,
          }
        );
      }
    }
  )
}

function _Map(
  $trap, $trapPropertyName, $aliases
) {
  const { $eventTarget, $root } = $aliases;
  return Object.defineProperty(
    $trap, $trapPropertyName, {
      value: function() {
        return Array.prototype.map.call($root, ...arguments)
      }
    }
  )
}

function Of(
  $trap, $trapPropertyName, $aliases
) {
  const { $eventTarget, $root } = $aliases;
  return Object.defineProperty(
    $trap, $trapPropertyName, {
      value: function() {
        return Array.of.call(
          $root, ...Object.values($root)
        )
      },
    }
  )
}

function Pop(
  $trap, $trapPropertyName, $aliases
) {
  const { $eventTarget, $root } = $aliases;
  return Object.defineProperty(
    $trap, $trapPropertyName, {
      value: function() {
        const popElement = Array.prototype.pop.call($root);
        const popElementIndex = $root.length - 1;
        // Array Pop Event
        $trap.createEvent(
          $eventTarget,
          'pop',
          {
            element: popElement,
            elementIndex: popElementIndex,
          }
        );
        return popElement
      }
    }
  )
}

function Push(
  $trap, $trapPropertyName, $aliases
) {
  const { $eventTarget, $root, $rootAlias } = $aliases;
  return Object.defineProperty(
    $trap, $trapPropertyName, {
      value: function() {
        const elements = [];
        let elementIndex = 0;
        for(let $element of arguments) {
          if(isDirectInstanceOf(
            $element, [Object, Array/*, Map*/]
          )) {
            $element = new DynamicEventTarget($element, {
              rootAlias: $rootAlias,
            });
          }
          elements.push($element);
          Array.prototype.push.call($root, $element);
          // Push Prop Event
          $trap.createEvent(
            $eventTarget,
            'pushProp',
            {
              elementIndex, 
              element: $element,
              path: $path,
              basename: $basename,
            },
          );
          elementIndex++;
        }
        // Push Event
        $trap.createEvent(
          $eventTarget,
          'push',
          {
            elements,
            path: $path,
            basename: $basename,
          },
        );
        return $root.length
      }
    }  
  )
}

function Reduce(
  $trap, $trapPropertyName, $aliases
) {
  const { $eventTarget, $root } = $aliases;
  return Object.defineProperty(
    $trap, $trapPropertyName, {
      value: function() {
        return Array.prototype.reduce.call($root, ...arguments)
      }
    }
  )
}

function ReduceRight(
  $trap, $trapPropertyName, $aliases
) {
  const { $eventTarget, $root } = $aliases;
  return Object.defineProperty(
    $trap, $trapPropertyName, {
      value: function() {
        return Array.prototype.reduceRight.call($root, ...arguments)
      }
    }
  )
}

function Reverse(
  $trap, $trapPropertyName, $aliases
) {
  const { $eventTarget, $root } = $aliases;
  return Object.defineProperty(
    $trap, $trapPropertyName, {
      value: function() {
        return Array.prototype.reverse.call($root, ...arguments)
      }
    }
  )
}

function Shift(
  $trap, $trapPropertyName, $aliases
) {
  const { $eventTarget, $root } = $aliases;
  return Object.defineProperty(
    $trap, $trapPropertyName, {
      value: function() {
        const shiftElement = Array.prototype.shift.call($root);
        const shiftElementIndex = 0;
        // Array Shift Event
        $trap.createEvent(
          $eventTarget,
          'shift',
          {
            element: shiftElement,
            elementIndex: shiftElementIndex,
          }
        );
        return shiftElement
      }
    }
  )
}

function Some(
  $trap, $trapPropertyName, $aliases
) {
  const { $eventTarget, $root } = $aliases;
  return Object.defineProperty(
    $trap, $trapPropertyName, {
      value: function() {
        return Array.prototype.some.call($root, ...arguments)
      }
    }
  )
}

function Sort(
  $trap, $trapPropertyName, $aliases
) {
  const { $eventTarget, $root } = $aliases;
  return Object.defineProperty(
    $trap, $trapPropertyName, {
      value: function() {
        return Array.prototype.sort.call($root, ...arguments)
      }
    }
  )
}

function Splice(
  $trap, $trapPropertyName, $aliases
) {
  const { $eventTarget, $root } = $aliases;
  return Object.defineProperty(
    $trap, $trapPropertyName, {
      value: function() {
        const $arguments = [...arguments];
        const start = (
          $arguments[0] >= 0
        ) ? $arguments[0]
          : $root.length + $arguments[0];
        const deleteCount = (
          $arguments[1] <= 0
        ) ? 0
          : (
          $arguments[1] === undefined ||
          start + $arguments[1] >= $root.length
        ) ? $root.length - start
          : $arguments[1];
        const addItems = $arguments.slice(2);
        const addCount = addItems.length;
        const deleteItems = [];
        let deleteItemsIndex = 0;
        while(deleteItemsIndex < deleteCount) {
          const deleteItem = Array.prototype.splice.call($root, start, 1)[0];
          deleteItems.push(deleteItem);
          // Array Splice Delete Event
          $trap.createEvent(
            $eventTarget,
            'spliceDelete',
            {
              index: start + deleteItemsIndex,
              deleteIndex: deleteItemsIndex,
              deleteItem: deleteItem,
            },
          );
          deleteItemsIndex++;
        }
        let addItemsIndex = 0;
        while(addItemsIndex < addCount) {
          const addItem = addItems[addItemsIndex];
          Array.prototype.splice.call(
            $root, start + addItemsIndex, 0, addItem
          );
          // Array Splice Add Event
          $trap.createEvent(
            $eventTarget,
            'spliceAdd',
            {
              index: start + addItemsIndex,
              addIndex: addItemsIndex,
              addItem: addItem,
            },
          );
          addItemsIndex++;
        }
        // Array Splice Event
        $trap.createEvent(
          $eventTarget,
          'splice',
          {
            start,
            deleted: deleteItems,
            added: addItems,
            length: $root.length,
          },
        );
        return deleteItems
      }
    }
  )
}

function ToLocalString(
  $trap, $trapPropertyName, $aliases
) {
  const { $eventTarget, $root } = $aliases;
  return Object.defineProperty(
    $trap, $trapPropertyName, {
      value: function() {
        return Array.prototype.toLocalString.call($root, ...arguments)
      }
    }
  )
}

function ToReversed(
  $trap, $trapPropertyName, $aliases
) {
  const { $eventTarget, $root } = $aliases;
  return Object.defineProperty(
    $trap, $trapPropertyName, {
      value: function() {
        return Array.prototype.toReversed.call($root, ...arguments)
      }
    }
  )
}

function ToSpliced(
  $trap, $trapPropertyName, $aliases
) {
  const { $eventTarget, $root } = $aliases;
  return Object.defineProperty(
    $trap, $trapPropertyName, {
      value: function() {
        return Array.prototype.toSpliced.call($root, ...arguments)
      }
    }
  )
}

function ToSorted(
  $trap, $trapPropertyName, $aliases
) {
  const { $eventTarget, $root } = $aliases;
  return Object.defineProperty(
    $trap, $trapPropertyName, {
      value: function() {
        return Array.prototype.toSorted.call($root, ...arguments)
      }
    }
  )
}

function ToString(
  $trap, $trapPropertyName, $aliases
) {
  const { $eventTarget, $root } = $aliases;
  return Object.defineProperty(
    $trap, $trapPropertyName, {
      value: function() {
        return Array.prototype.toString.call($root, ...arguments)
      }
    }
  )
}

function Unshift(
  $trap, $trapPropertyName, $aliases
) {
  const { $eventTarget, $root } = $aliases;
  return Object.defineProperty(
    $trap, $trapPropertyName, {
      value: function() {
        const $arguments = [...arguments];
        const elements = [];
        const elementsLength = $arguments.length;
        let elementIndex = elementsLength - 1;
        while(elementIndex > -1) {
        $arguments.length;
          const element = $arguments[elementIndex];
          if(isDirectInstanceOf(
            element, [Object, Array/*, Map*/]
          )) {
            element = new DynamicEventTarget(element, {
              rootAlias: $rootAlias,
            });
          }
          elements.unshift(element);
          Array.prototype.unshift.call($root, element);
          // Array Unshift Prop Event
          $trap.createEvent(
            $eventTarget,
            'unshiftProp',
            {
              elementIndex, 
              element: element,
              path: $path,
              basename: $basename,
            },
            $root,
          );
          elementIndex--;
        }
        // Array Unshift Event
        $trap.createEvent(
          $eventTarget,
          'unshift',
          {
            elements, 
            path: $path,
            basename: $basename,
          },
          $root,
        );
        return $root.length
      }
    }  
  )
}

function Values(
  $trap, $trapPropertyName, $aliases
) {
  const { $eventTarget, $root } = $aliases;
  return Object.defineProperty(
    $trap, $trapPropertyName, {
      value: function() {
        return Array.prototype.values.call($root, ...arguments)
      }
    }
  )
}

function With(
  $trap, $trapPropertyName, $aliases
) {
  const { $eventTarget, $root } = $aliases;
  return Object.defineProperty(
    $trap, $trapPropertyName, {
      value: function() {
        return Array.prototype.with.call($root, ...arguments)
      }
    }
  )
}

var ArrayProperty = {
  at: At,
  copyWithin: CopyWithin,
  concat: Concat,
  entries: Entries,
  every: Every,
  fill: Fill,
  filter: Filter,
  find: Find,
  findIndex: FindIndex,
  findLast: FindLast,
  findLastIndex: FindLastIndex,
  flat: Flat,
  flatMap: FlatMap,
  forEach: ForEach,
  from: From,
  indexOf: IndexOf,
  isArray: IsArray,
  join: Join,
  keys: Keys,
  lastIndexOf: LastIndexOf,
  length: Length,
  map: _Map,
  of: Of,
  pop: Pop,
  push: Push,
  reduce: Reduce,
  reduceRight: ReduceRight,
  reverse: Reverse,
  shift: Shift,
  some: Some,
  sort: Sort,
  splice: Splice,
  toLocaleString: ToLocalString,
  toReversed: ToReversed,
  toSpliced: ToSpliced,
  toSorted: ToSorted,
  toString: ToString,
  unshift: Unshift,
  values: Values,
  with: With,
};

// import MapProperty from './Map/index.js'

var PropertyClasses = {
  Object: ObjectProperty,
  Array: ArrayProperty,
  // Map: MapProperty,
};

class Traps {
  Object
  Array
  Map
  constructor($aliases, $options) {
    // Iterate Property Classes
    for(let [
      PropertyClassName, PropertyClassMethods
    ] of Object.entries(PropertyClasses)) {
      const trapOptions = $options[PropertyClassName.toLowerCase()];
      const trap = new Trap(PropertyClassMethods, $aliases, trapOptions);
      Object.defineProperty(
        this, PropertyClassName, {
          value: trap
        }
      );
    }
  }
}

class Handler {
  #aliases
  traps
  constructor($aliases, $options) {
    this.#aliases = $aliases;
    this.traps = new Traps(this.#aliases, $options.traps);
    return this
  }
  // Get
  get get() {
    const $this = this;
    const {
      $eventTarget, 
      $root, $rootAlias, 
      $type, $proxy,
    } = this.#aliases;
    return function get($target, $property, $receiver) {
      // 1. Root Alias
      if($property === $rootAlias) return this
      if(
        // 2. Event Target Class Instance Methods
        Object.getOwnPropertyNames(EventTarget.prototype)
        .includes($property) ||
        // 3. Dynamic Event Target Class Instance Methods
        Object.getOwnPropertyNames(DynamicEventTarget.prototype)
        .includes($property) /* ||
        Object.getOwnPropertyNames($eventTarget)
        .includes($property) */
      ) {
        if(typeof $eventTarget[$property] === 'function') {
          return $eventTarget[$property].bind($eventTarget)
        }
        return $eventTarget[$property]
      }
      // 3.5. Root Alias Property
      if(
        Object.getOwnPropertyNames($root)
        .includes($property)
      ) {
        return $root[$property]
      }
      // 4. Type Object
      if(
        $type === 'object'
      ) {
        if(
          Object.getOwnPropertyNames(Object)
          .includes($property)
        ) {
          return $this.traps['Object'][$property]
        } else
        if(
          Object.getOwnPropertyNames(Array.prototype)
          .includes($property) ||
          Object.getOwnPropertyNames(Array)
          .includes($property)
        ) {
          return $this.traps['Array'][$property]
        }
      } 
      // 5. Type Array
      if(
        $type === 'array'
      ) {
        if(
          Object.getOwnPropertyNames(Array.prototype)
          .includes($property) ||
          Object.getOwnPropertyNames(Array)
          .includes($property)
        ) {
          return $this.traps['Array'][$property]
        } else
        if(
          Object.getOwnPropertyNames(Object)
          .includes($property)
        ) {
          return $this.traps['Object'][$property]
        }
      }
      // 6. Map Class Instance Property Trap
      if(
        $type === 'map' &&
        Object.getOwnPropertyNames(Map.prototype)
        .includes($property)
      ) return $this.traps['Map'][$property] || 
        $this.traps['Map']['default']
      return undefined
    }
  }
  get set() {
    const $this = this;
    const {
      $eventTarget, $root, $rootAlias, $type, $proxy
    } = this.#aliases;
    return function set($target, $property, $value, $receiver) {
      if(
        $type === 'object'
      ) {
        if(
          Object.getOwnPropertyNames(Object)
          .includes($property)
        ) {
          $this.traps['Object'][$property] = $value;
        } else
        if(
          Object.getOwnPropertyNames(Array.prototype)
          .includes($property) ||
          Object.getOwnPropertyNames(Array)
          .includes($property)
        ) {
          $this.traps['Array'][$property] = $value;
        }
      } else
      if(
        $type === 'array'
      ) {
        if(
          Object.getOwnPropertyNames(Array.prototype)
          .includes($property) ||
          Object.getOwnPropertyNames(Array)
          .includes($property)
        ) {
          $this.traps['Array'][$property] = $value;
        } else if(
          Object.getOwnPropertyNames(Object)
          .includes($property)
        ) {
          $this.traps['Object'][$property] = $value;
        }
      }
      return true
    }
  }
}

const Options$6 = Object.freeze({
  rootAlias: 'content',
  objectAssignMerge: true,
  objectDefinePropertyDescriptorTree: true,
  objectDefinePropertyDescriptorValueMerge: true,
  objectFreezeRecurse: true,
  objectSealRecurse: true,
});
class DynamicEventTarget extends EventTarget {
  #settings
  #options
  #_type // 'object' // 'array' // 'map'
  #_rootAlias
  #_root
  #_parent
  #_basename
  #_path
  #_proxy
  #_handler
  #_aliases
  constructor($settings = {}, $options = {}) {
    super();
    this.#settings = $settings;
    this.#options = Object.assign(
      {}, Options$6, $options
    );
    return this.#proxy
  }
  // Type
  get type() {
    if(this.#_type !== undefined) return this.#_type
    this.#_type = typeOf(this.#settings);
    return this.#_type
  }
  get parent() {
    if(this.#_parent !== undefined)  return this.#_parent
    this.#_parent = (
      this.#options.$parent !== undefined
    ) ? this.#options.$parent
      : null;
    return this.#_parent
  }
  get basename() {
    if(this.#_basename !== undefined)  return this.#_basename
    this.#_basename = (
      this.#options.$basename !== undefined
    ) ? this.#options.$basename
      : null;
    return this.#_basename
  }
  get path() {
    if(this.#_path !== undefined)  return this.#_path
    this.#_path = (
      this.#options.$path !== undefined
    ) ? this.#options.$path
      : null;
    return this.#_path
  }
  // Root Alias
  get #rootAlias() {
    if(this.#_rootAlias !== undefined) return this.#_rootAlias
    this.#_rootAlias = (
      typeof this.#options.$rootAlias === 'string' &&
      this.#options.$rootAlias.length > 0
    ) ? this.#options.$rootAlias
      : Options$6.rootAlias;
    return this.#_rootAlias
  }
  // Root
  get #root() {
    if(this.#_root !== undefined) return this.#_root
    this.#_root = (
      this.type === 'object'
    ) ? {...this.#settings}
      : (
      this.type === 'array'
    ) ? [...this.#settings]
    //   : (
    //   this.type === 'map'
    // ) ? new Map()
      : {...this.#settings};
    return this.#_root
  }
  // Proxy
  get #proxy() {
    if(this.#_proxy !== undefined) return this.#_proxy
    this.#_proxy = new Proxy(this.#root, this.#handler);
    if(this.type === 'object') {
      this.#_proxy.assign(this.#root);
    } else
    if(this.type === 'array') {
      this.#_proxy.assign(this.#root);
    } /* else
    if(this.type === 'map') {
      for(const [
        $mapKey, $mapVal
      ] of $root) {
        //
      }
    } */
    return this.#_proxy
  }
  // Handler
  get #handler() {
    if(this.#_handler !== undefined) return this.#_handler
    const {
      objectAssignMerge, 
      objectDefinePropertyDescriptorTree,
      objectDefinePropertyDescriptorValueMerge,
      objectFreezeRecurse,
      objectSealRecurse,
    } = this.#options;
    this.#_handler = new Handler(this.#aliases, {
      traps: {
        object: {
          assign: {
            merge: objectAssignMerge,
          },
          defineProperties: {
            descriptorValueMerge: objectDefinePropertyDescriptorValueMerge,
            descriptorTree: objectDefinePropertyDescriptorTree,
          },
          defineProperty: {
            descriptorValueMerge: objectDefinePropertyDescriptorValueMerge,
            descriptorTree: objectDefinePropertyDescriptorTree,
          },
          freeze: {
            recurse: objectFreezeRecurse,
          },
          seal: {
            recurse: objectSealRecurse,
          },
        }
      }
    });
    return this.#_handler
  }
  // Aliases
  get #aliases() {
    if(this.#_aliases !== undefined) return this.#_aliases
    this.#_aliases = {
      $type: this.type,
      $eventTarget: this,
      $rootAlias: this.#rootAlias,
      $root: this.#root,
      $path: this.path,
      $basename: this.basename,
      $parent: this.parent,
    };
    return this.#_aliases
  }
  parse() {
    let parsement = (
      this.type === 'object'
    ) ? {}
      : (
      this.type === 'array'
    ) ? []
    /*: (
      this.type === 'map'
    ) ? new Map()*/
      : {};
    if(this.type !== 'map') {
      for(const [$key, $val] of Object.entries(this.#root)) {
        if(
          $val !== null &&
          typeof $val === 'object'
        ) {
          parsement[$key] = $val.parse();
        } else (
          parsement[$key] = $val
        );
      }
    }
    return parsement
  }
  inspect() {
    return JSON.stringify(this.parse(), null, 2)
  }
}

let Event$1 = class Event {
  constructor($settings) { 
    this.settings = $settings;
  }
  #_settings = {}
  get settings() { return this.#_settings }
  set settings($settings) {
    const _settings = this.#_settings;
    const {
      context, type, target, callback, enable
    } = $settings;
    _settings.context = context;
    this.context = context;
    _settings.type = type;
    this.type = type;
    _settings.target = target;
    this.target = target;
    _settings.callback = callback;
    this.callback = callback;
    _settings.enable = enable;
    this.enable = enable;

  }
  #_context
  get context() { return this.#_context }
  set context($context) { this.#_context = $context; }
  #_type
  get type() { return this.#_type }
  set type($type) { this.#_type = $type; }
  #_path = ''
  get path() { return this.#_path }
  set path($path) { this.#_path = $path; }
  get target() {
    let target = this.context;
    for(const $targetPathKey of this.path.split('.')) {
      if($targetPathKey === ':scope') break
      if(target[$targetPathKey] === undefined) return undefined
      target = target[$targetPathKey];
    }
    return target
  }
  set target($target) { this.path = $target; }
  #_callback
  get callback() {
    return this.#_callback
  }
  set callback($callback) {
    this.#_callback = $callback.bind(this.context);
  }
  #_enable = false
  get enable() { return this.#_enable }
  set enable($enable) {
    if($enable === this.#_enable) return
    const eventAbility = (
      $enable === true
    ) ? 'addEventListener'
      : 'removeEventListener';
    if(this.target instanceof NodeList) {
      for(const $target of this.target) {
        $target[eventAbility](this.type, this.callback);
        this.#_enable = $enable;
      }
    } else if(this.target instanceof EventTarget) {
      this.target[eventAbility](this.type, this.callback);
      this.#_enable = $enable;
    } else {
      try {
        this.target[eventAbility](this.type, this.callback);
        this.#_enable = $enable;
      } catch($err) { /* console.log(this.type, this.path, eventAbility) */ }
    }
  }
};

class DynamicEventSystem extends EventTarget {
  constructor($events, $enable) {
    super();
    this.events = $events;
  }
  #_events = []
  get events() { return this.#_events }
  set events($events) { this.addEvents($events); }
  getEvents($event = {}) {
    const _events = this.#_events;
    const events = [];
    for(const _event of _events) {
      if(((
        $event.type !== undefined &&
        $event.path === undefined &&
        $event.callback === undefined
      ) && ($event.type === _event.type)) || 
      ((
        $event.type !== undefined &&
        $event.path !== undefined &&
        $event.callback === undefined
      ) && (
        $event.type === _event.type &&
        $event.path === _event.target
      )) || ((
        $event.type !== undefined &&
        $event.path !== undefined &&
        $event.callback !== undefined
      ) && (
        $event.type === _event.type &&
        $event.path === _event.target &&
        $event.callback === _event.callback
      ))) {
        events.push(_event);
      }
    }
    return events
  }
  addEvents($events = {}, $enable = false) {
  	const _events = this.events;
  	for(const $event of parseShortenedEvents($events)) {
  		Object.assign($event, {
  			context: this,
  			enable: $event.enable || $enable,
  		});
  		_events.push(new Event$1($event));
  	}
  }
  removeEvents($events = {}) {
  	const _events = this.events;
    $events = parseShortenedEvents($events) || _events;
  	let eventsIndex = _events.length - 1;
  	while(eventsIndex > -1) {
  		const event = _events[eventsIndex];
  		const removeEventIndex = $events.findIndex(
  			($event) => (
  				$event.type === event.type &&
  				$event.target === event.path &&
  				$event.callback === event.callback
				)
			);
			if(removeEventIndex !== -1) _events.splice(eventsIndex, 1);
			eventsIndex--;
  	}
  }
  enableEvents($events) {
    $events = (
      typeof $events === 'object'
    ) ? parseShortenedEvents($events)
      : this.events;
    return this.#toggleEventAbility('addEventListener', $events)
  }
  disableEvents($events) {
    $events = (
      typeof $events === 'object'
    ) ? parseShortenedEvents($events)
      : this.events;
    return this.#toggleEventAbility('removeEventListener', $events)
  }
  #toggleEventAbility($eventListenerMethod, $events) {
    const enability = (
      $eventListenerMethod === 'addEventListener'
    ) ? true
      : (
      $eventListenerMethod === 'removeEventListener'
    ) ? false
      : undefined;
    if(enability === undefined) return this
    $events = $events || this.events;
    for(const $event of $events) {
      $event.enable = enability;
    }
    return this
  }
}

const Settings$5 = {};
const Options$5 = {};

class Core extends DynamicEventSystem {
	constructor($settings = Settings$5, $options = Options$5) {
		super($settings.events, $options.enable);
		this.options = Object.assign({}, Options$5, $options);
		this.settings = Object.assign({}, Settings$5, $settings);
	}
	#_settings = {}
	get settings() { return this.#_settings }
	set settings($settings) {
		const _settings = this.#_settings;
		for(const [
			$settingKey, $settingVal
		] of Object.entries($settings)) {
			_settings[$settingKey] = $settingVal;
		}
		Object.freeze(_settings);
	}
	#_options = {}
	get options() { return this.#_options }
	set options($options) {
		const _options = this.#_options;
		for(const [
			$optionKey, $optionVal
		] of Object.entries($options)) {
			_options[$optionKey] = $optionVal;
		}
		Object.freeze(_options);
	}
}

class Model extends Core {
	constructor($settings = {}, $options = {}) {
		super(
      Object.assign({
        rootAlias: 'content',
        content: {},
        events: {},
      }, $settings),
      Object.assign({
        enable: true,
        freeze: false,
        content: {},
      }, $options),
    );
		this.type = this.settings.type;
		this.#rootAlias = this.settings.rootAlias;
    Object.defineProperty(this, this.#rootAlias, {
      get() { return this.#root }
    });
		this.#root = new DynamicEventTarget(this.settings.content, this.options.content);
    if(this.options.enable === true) this.enableEvents();
	}
  // Root Alias
  #_rootAlias
  get #rootAlias() { return this.#_rootAlias }
  set #rootAlias($rootAlias) {
    if(this.#_rootAlias !== undefined) return
    this.#_rootAlias = ( 
      typeof $rootAlias === 'string' &&
      $rootAlias.length > 0
    ) ? $rootAlias
      : 'content';
  }
  // Root
  #_root
  get #root() { return this.#_root }
  set #root($root) {
    if(this.#_root !== undefined) return
    this.#_root = $root;
  }
  // Aliases
  #_aliases
  get #aliases() {
    if(this.#_aliases !== undefined) return this.#_aliases
    this.#_aliases = {
      $core: this,
      $root: this.#_root,
    };
    return this.#_aliases
  }
}

const Settings$4 = Object.freeze({
  templates: { default: () => `` },
  selectors: {},
  events: {},
});
const Options$4 = Object.freeze({});

class ViewBase extends Core {
  constructor($settings = {}, $options = {}) {
    super(
      Object.assign({}, Settings$4, $settings),
      Object.assign({}, Options$4, $options),
    );
    this.templates = this.settings.templates;
    this.selectors = this.settings.selectors;
  }
  // Templates
  #_templates = {}
  get templates() { return this.#_templates }
  set templates($templates = Settings$4.templates) {
    const _templates = this.#_templates;
    for(const [
      $templateName, $template
    ] of Object.entries($templates)) {      _templates[$templateName] = $template.bind(this);
    }
  }
  // Selectors
  #_selectors = {}
  #_querySelectors = {}
  get selectors() {
    return this.#_querySelectors
  }
  set selectors($selectors = Settings$4.selectors) {
    this.addSelectors($selectors);
  }
  // Add Selectors
  addSelectors($selectors) {
    const _selectors = this.#_selectors;
    $selectors = (
      $selectors === undefined
    ) ? _selectors
      : $selectors;
    for(const [
      $selectorName, $selector
    ] of Object.entries($selectors)) {
      _selectors[$selectorName] = $selector;
    }
    return this
  }
  // Remove Selectors
  removeSelectors($selectors) {
    const _selectors = this.#_selectors;
    $selectors = (
      $selectors === undefined
    ) ? _selectors
      : $selectors;
    for(const [
      $selectorName, $selector
    ] of Object.entries($selectors)) {
      delete _selectors[selectorName];
    }
    return this
  }
  // Enable
  enable() {
    this.enableSelectors();
    this.enableEvents();
    return this
  }
  // Enable  Selectors
  enableSelectors($selectors) {
    $selectors = (
      $selectors === undefined
    ) ? this.#_selectors
      : $selectors;
    const _querySelectors = this.#_querySelectors;
    for(const [
      $selectorName, $selector
    ] of Object.entries($selectors)) {
      if(this.element instanceof HTMLTemplateElement) {
        _querySelectors[$selectorName] = this.element.content
        .querySelectorAll($selector);
        if(_querySelectors[$selectorName].length === 1) {
          _querySelectors[$selectorName] = _querySelectors[$selectorName][0];
        }
      } else {
        _querySelectors[$selectorName] = this.element
        .querySelectorAll($selector);
        if(_querySelectors[$selectorName].length === 1) {
          _querySelectors[$selectorName] = _querySelectors[$selectorName][0];
        }
      }
    }
    return this
  }
  // Disable
  disable() {
    this.disableSelectors();
    this.disableEvents();
    return this
  }
  // Disable Selectors
  disableSelectors($selectors) {
    $selectors = (
      $selectors === undefined
    ) ? this.#_selectors
      : $selectors;
    const querySelectors = this.#_querySelectors;
    for(const [
      $selectorName, $selector
    ] of Object.entries($selectors)) {
      delete querySelectors[$selectorName];
    }
    return this
  }
}

const Settings$3 = Object.freeze({
  element: undefined,
});
const Options$3 = Object.freeze({
  enableSelectors: true,
  enableEvents: true,
});
class StaticView extends ViewBase {
  constructor($settings = {}, $options = {}) {
    super(
      Object.assign({}, Settings$3, $settings),
      Object.assign({}, Options$3, $options),
    );
    const {
      enableSelectors, enableEvents
    } = this.options;
    this.element = this.settings.element;
    if(enableSelectors === true) this.enableSelectors();
    if(enableEvents === true) this.enableEvents();
  }
  // Element
  #_element
  get element() { return this.#_element }
  set element($element) { this.#_element = $element; }
}

const Settings$2 = Object.freeze({
  parentElement: undefined,
  element: undefined, // document.createElement('template'),
  templates: { default: () => `` },
  selectors: {},
  events: {},
});
const Options$2 = Object.freeze({});
const RenderSettings = Object.freeze({
  templateName: 'default', 
  content: {},
});
class DynamicView extends ViewBase {
  constructor($settings = {}, $options = {}) {
    super(
      Object.assign({}, Settings$2, $settings),
      Object.assign({}, Options$2, $options),
    );
    const { parentElement } = this.settings;
    this.parentElement = parentElement;
    this.element = document.createElement('template');
  }
  // Parent
  #_parentElement
  get parentElement() { return this.#_parentElement }
  set parentElement($parentElement) { this.#_parentElement = $parentElement; }
  // Element
  #_element
  get element() { return this.#_element }
  set element($element) { this.#_element = $element; }
  // Render Element
  renderElement($settings = {}) {
    $settings = Object.assign({}, RenderSettings, $settings);
    const element = this.element;
    if(!element instanceof HTMLTemplateElement) return this
    const { templateName, content } = $settings;
    const template = this.templates[templateName];
    if(
      template !== undefined &&
      typeOf(template) === 'function'
    ) {
      this.disable();
      const templateContent = template(content);
      element.innerHTML = templateContent;
      this.enable();
      this.dispatchEvent(new CustomEvent('render', {
        detail: this
      }));
    }
    return this
  }
}

const Events = {
  // Fetch Response Interface Events
  // OK
  'ok': ($response, $requestMethod) => {
    const eventType = `${$requestMethod}:ok`;
    const event = new CustomEvent(eventType, {
      detail: {
        response: $response,
      },
    });
    return event
  },
  // Status
  'status': ($response, $requestMethod) => {
    const eventType = `${$requestMethod}:status`;
    const event = new CustomEvent(eventType, {
      detail: {
        response: $response,
      },
    });
    return event
  },
  // Status Code
  'statusCode': ($response, $requestMethod) => {
    const eventType = `${$requestMethod}:status:${$response.status}`;
    const event = new CustomEvent(eventType, {
      detail: {
        response: $response,
      },
    });
    return event
  },
  // Status Text
  'statusText': ($response, $requestMethod) => {
    const eventType = `${$requestMethod}:statusText`;
    const event = new CustomEvent(eventType, {
      detail: {
        response: $response,
      },
    });
    return event
  },
  // Status Text Message
  'statusTextMessage': ($response, $requestMethod) => {
    const eventType = `${$requestMethod}:statusText:${$response.statusText}`;
    const event = new CustomEvent(eventType, {
      detail: {
        response: $response,
      },
    });
    return event
  },
  // Abort
  'abort': ($abortController) => {
    const eventType = 'abort';
    const event = new CustomEvent(eventType, {
      detail: {
        abortController: $abortController,
      },
    });
    return event
  },
};

class FetchRoute extends EventTarget {
  #settings = {}
  #name
  #origin
  #path
  constructor($settings = {}) {
    super();
    this.#settings = $settings;
    this.#name = this.#settings.name;
    this.#origin = this.#settings.origin;
    this.#path = this.#settings.path;
    this.addMethods(this.#settings.methods);
  }
  addMethods($methods) {
    const $this = this;
    for(const [
      $methodName, $methodOptions
    ] of Object.entries($methods)) {
      const abortKey = `${$methodName}AbortSignal`;
      Object.defineProperties($this, {
        [abortKey]: {
          enumerable: false,
          writable: true,
          value: undefined,
        },
        [$methodName]: {
          enumerable: true,
          writable: false,
          configurable: false,
          value: async function() {
            const $arguments = [...arguments];
            let $resourcePath, $resourceOptions;
            if($arguments.length === 0) {
              $resourcePath = '';
              $resourceOptions = {};
            } else
            if($arguments.length === 1) {
              if(typeof $arguments[0] === 'string') {
                $resourcePath = $arguments[0];
                $resourceOptions = {};
              } else
              if(typeof $arguments[0] === 'object') {
                $resourcePath = '';
                $resourceOptions = $arguments[0];
              }
            } else
            if($arguments.length === 2) {
              if(typeof $arguments[0] === 'string') {
                $resourcePath = $arguments[0];
              }
              if(typeof $arguments[1] === 'object') {
                $resourceOptions = $arguments[1];
              }
            }
            const resourceOptions = Object.assign({}, $methodOptions);
            let { urlSearchParams, headers, body, priority } = $resourceOptions;
            let pathParameters = new URLSearchParams(urlSearchParams).toString();
            if(pathParameters.length > 0) pathParameters = '?'.concat(pathParameters);
            if(headers !== undefined) Object.assign(resourceOptions.headers, headers);
            if(body !== undefined) resourceOptions.body = body;
            if(priority !== undefined) resourceOptions.priority = priority;
            const resource = String.prototype.concat(
              $this.#origin, this.#decodePath($this.#path, $resourcePath), pathParameters
            );
            if($this[abortKey] !== undefined) {
              $this[abortKey].abort();
              $this.createEvent($this, 'abort', $this[abortKey]);
            }
            $this[abortKey] = new AbortController();
            resourceOptions.signal = $this[abortKey].signal;
            let fetchSource = await fetch(resource, resourceOptions)
            .then(($fetchSource) => {
              $this
              .createEvent($this, 'ok', $fetchSource.clone(), $methodName)
              .createEvent($this, 'status', $fetchSource.clone(), $methodName)
              .createEvent($this, 'statusCode', $fetchSource.clone(), $methodName)
              .createEvent($this, 'statusText', $fetchSource.clone(), $methodName)
              .createEvent($this, 'statusTextMessage', $fetchSource.clone(), $methodName);
              return $fetchSource
            })
            .catch(($err) => { /* console.log($err) */ });
            return fetchSource
          }
        }
      });
    }
  }
  #decodePath($path, $resourcePath) {
    if($path.includes(':') === false) return $path 
    const pathFragments = $path.split('/');
    const resourcePathFragments = $resourcePath.split('/');
    if(pathFragments.length !== resourcePathFragments.length) return $path
    let decodedPathFragments = [];
    let pathFragmentsIndex = 0;
    while(pathFragmentsIndex < pathFragments.length) {
      let pathFragment = pathFragments[pathFragmentsIndex];
      const resourcePathFragment = resourcePathFragments[pathFragmentsIndex];
      if(pathFragment.includes(':')) {
        pathFragment = resourcePathFragments[pathFragmentsIndex];
      } else if(
        pathFragment !== resourcePathFragment
      ) {
        return $path
      }
      decodedPathFragments.push(pathFragment);
      pathFragmentsIndex++;
    }
    return decodedPathFragments.join('/')
  }
  removeMethods($methods) {
    for(const $methodName of Object.values($methods)) {
      const abortKey = `${$methodName}AbortSignal`;
      if(this[abortKey].signal.aborted === false) {
        this[abortKey].abort();
      }
      delete this[abortKey];
      delete this[$methodName];
    }
  }
  createEvent($eventTarget, $eventType, $response, $requestMethod) {
    const event = Events[$eventType]($response, $requestMethod);
    $eventTarget.dispatchEvent(event);
    return this
  }
}

class FetchRouter extends Core {
  #scheme
  #domain
  #port
  #_authority
  get #authority() {
    if(this.#_authority === undefined) {
      this.#_authority = String.prototype.concat(
        this.#domain, ':', this.#port
      );
    }
    return this.#_authority
  }
  #_origin
  get #origin() {
    if(this.#_origin === undefined) {
      this.#_origin = String.prototype.concat(
        this.#scheme, '://', this.#authority
      );
    }
    return this.#_origin
  }
  constructor($settings = {}, $options = { enableEvents: false }) {
    super(...arguments);
    const { scheme, domain, port, routes } = $settings;
    this.#scheme = scheme;
    this.#domain = domain;
    this.#port = port;
    this.routes = routes;
    if($options.enableEvents === true) this.enableEvents();
  }
  #_routes = {}
  get routes() { return this.#_routes }
  set routes($routes) { this.addRoutes($routes); }
  addRoutes($routes) {
    const _routes = this.#_routes;
    for(let [
      $routePath, $routeSettings
    ] of Object.entries($routes)) {
      $routeSettings.origin = this.#origin;
      $routeSettings.path = $routePath;
      _routes[$routeSettings.name] = new FetchRoute($routeSettings);
    }
    return this
  }
  removeRoutes($routes) {
    const _routes = this.#_routes;
    for(const $path of $routes) {
      delete _routes[$path];
    }
    return this
  }
}

const Settings$1 = {
	routes: {},
};
const Options$1 = {
	enable: true,
};
class StaticRouter extends Core {
	constructor($settings = Settings$1, $options = Options$1) {
		super(...arguments);
		this.routes = $settings.routes;
		if($options.enable === true) this.enable();
	}
	#_route
	get route() { return this.#_route }
	set route($route) {
		this.#_route = $route;
		this.dispatchEvent(new CustomEvent('routeChange', {
			detail: $route
		}));
	}
	#_routes = {}
	get routes() { return this.#_routes }
	set routes($routes) {
		const _routes = this.#_routes;
		for(const [
			$routeName, $routeSettings
		] of Object.entries($routes)) {
			_routes[$routeName] = $routeSettings;
		}
	}
	#_hashChange
	#hashChange($event) {
		const _routes = this.#_routes;
		const { newURL, oldURL } = $event;
		const newURLHash = newURL.split('#')[1];
		oldURL.split('#')[1];
		const routeData = _routes[newURLHash];
		if(routeData === undefined) return
		this.route = routeData;
	}
	enable() {
		window.addEventListener('hashchange', this.#hashChange.bind(this));
	}
	disable() {
		window.removeEventListener('hashchange', this.#hashChange.bind(this));
	}
}

const Settings = Object.freeze({
	models: {},
	views: {},
	controls: {},
	routers: {
		fetch: {},
		static: {},
	},
	events: {},
});

const Options = Object.freeze({
	enableEvents: true
});

class Control extends Core {
	constructor($settings = {}, $options = {}) {
		super(
			Object.assign({}, Settings, $settings),
			Object.assign({}, Options, $options),
		);
		this.models = this.settings.models;
		this.views = this.settings.views;
		this.controls = this.settings.controls;
		this.routers = this.settings.routers;
		if(this.options.enableEvents === true) this.enableEvents();
	}
	#_models = {}
	get models() { return this.#_models }
	set models($models = {}) {
		const _models = this.#_models;
		for(const [
			$modelName, $model
		] of Object.entries($models)) {
			if($model instanceof Model) {
				_models[$modelName] = $model;
			} else if(typeOf($model) === 'object') {
				_models[$modelName] = new Model($model);
			}
		}
	}
	#_views = {}
	get views() { return this.#_views }
	set views($views = {}) {
		const _views = this.#_views;
		for(const [
			$viewName, $view
		] of Object.entries($views)) {
			if(
				$view instanceof StaticView || 
				$view instanceof DynamicView
			) {
				_views[$viewName] = $view;
			} else
			if(
				typeOf($view) === 'object'
			) {
				if($view.type === 'static') {
					_views[$viewName] = new StaticView($view);
				} else
				if($view.type === 'dynamic') {
					_views[$viewName] = new DynamicView($view);
				}
			}
		}
	}
	#_controls = {}
	get controls() { return this.#_controls }
	set controls($controls = {}) {
		const _controls = this.#_controls;
		for(const [
			$controlName, $control
		] of Object.entries($controls)) {
			if($control instanceof Control) {
				_controls[$controlName] = $control;
			} else if(typeOf($control) === 'object') {
				_controls[$controlName] = new Control($control);
			}
		}
	}
	
	#_routers = {}
	get routers() { return this.#_routers }
	set routers($routers = {}) {
		const _routers = this.#_routers;
		for(const [
			$routerClass, $routerClassInstances
		] of Object.entries($routers)) {
			_routers[$routerClass] = _routers[$routerClass] || {};
			for(const [
				$routerName, $router
			] of Object.entries($routerClassInstances)) {
				if(
					$router instanceof StaticRouter ||
					$router instanceof FetchRouter
				) {
					_routers[$routerClass][$routerName] = $router;
				} else
				if(typeOf($router) === 'object') {
					const Router = (
						$routerClass === 'static'
					) ? StaticRouter
					  : (
				  	$routerClass === 'fetch'
			  	) ? FetchRouter
					  : undefined;
				  if(Router !== undefined) {
				  	_routers[$routerClass][$routerName] = new Router($router);
				  }
				}
			}
		}
	}
	addClassInstances($classes) {
		for(const [
			$className, $classInstances
		] of Object.entries($classes)) {
			this[$className] = $classInstances;
		}
		return this
	}
}

// Classes
// Class Aliases
const DET = DynamicEventTarget;
const DES = DynamicEventSystem;

export { Control, Core, DES, DET, DynamicEventSystem, DynamicEventTarget, DynamicView, FetchRouter, Model, StaticRouter, StaticView };
//# sourceMappingURL=mvc-framework.js.map
