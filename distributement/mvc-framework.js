const typeOf$1 = ($data) => Object
	.prototype
	.toString
	.call($data).slice(8, -1).toLowerCase();

function parseShortenedEvents($propEvents) {
	if(typeOf$1($propEvents) === 'array') return $propEvents
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

class CoreEvent {
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
}

const Settings$4 = {};
const Options$6 = {
  validSettings: [],
  enableEvents: true,
};
class Core extends EventTarget {
  constructor($settings = {}, $options = {}) {
    super();
    this.options = Object.assign({}, Options$6, $options);
    this.settings = Object.assign({}, Settings$4, $settings);
    for(const $validSetting of this.options.validSettings) {
      Object.defineProperty(
        this, $validSetting, { value: this.settings[$validSetting] },
      );
    }
    this.events = $settings.events;
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
      _events.push(new CoreEvent($event));
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

class ContentEvent extends Event {
  #settings
  #eventTarget
  constructor($type, $settings, $eventTarget) {
    super($type);
    this.#settings = $settings;
    this.#eventTarget = $eventTarget;
    this.#eventTarget.addEventListener(
      $type, 
      ($event) => {
        if(this.#eventTarget.parent !== null) {
          this.#eventTarget.parent.dispatchEvent(
            new ContentEvent(
              this.type, 
              {
                basename: $event.basename,
                path: $event.path,
                detail: $event.detail,
              },
              this.#eventTarget.parent
            )
          );
        }
      }, 
      {
        once: true
      }
    );
  }
  get basename() { return this.#settings.basename }
  get path() { return this.#settings.path }
  get detail() { return this.#settings.detail }
}

class Trap {
  constructor($methods, $aliases, $options = {}) {
    for(let [
      $methodName, $createPropertyMethod
    ] of Object.entries($methods)) {
      const methodOptions = $options[$methodName] || {};
      $createPropertyMethod(
        this, $methodName, $aliases, methodOptions
      );
    }
  }
}

function isDirectInstanceOf$1($object, $constructor) {
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

// import { typeOf } from  '../../../../../../../Coutil/index.js'
// export default typeOf
const typeOf = ($data) => Object
  .prototype
  .toString
  .call($data).slice(8, -1).toLowerCase();

function Assign(
  $trap, $trapPropertyName, $aliases, $options
) {
  const { merge, events } = $options;
  const {
    basename, 
    eventTarget, 
    path, 
    root, 
    rootAlias, 
    schema,
  } = $aliases;
  return Object.defineProperty(
    $trap, $trapPropertyName, {
      value: function() {
        const sources = [...arguments];
        // Iterate Sources
        for(let $source of sources) {
          // Iterate Source Props
          iterateSourceProps:
          for(let [
            $sourcePropKey, $sourcePropVal
          ] of Object.entries($source)) {
            let valid, validateSourceProperty;
            const { enableValidation } = schema.options;
            // Assign Root DET Property
            if(isDirectInstanceOf$1($sourcePropVal, [Object, Array/*, Map*/])) {
              let subschema;
              switch(schema.contextType) {
                case 'array': subschema = schema.context[0]; break
                case 'object': subschema = schema.context[$sourcePropKey]; break
              }
              // Enable Validation, No Subschema: Iterate Source Props
              if(enableValidation && !subschema) continue iterateSourceProps
              // Assign Root DET Property: Existent 
              if(root[$sourcePropKey]?.constructor.name === 'bound Content') {
                root[$sourcePropKey].assign($sourcePropVal);
              }
              // Assign Root DET Property: Non-Existent
              else {
                const _basename = $sourcePropKey;
                const _path = (path !== null)
                  ? path.concat('.', $sourcePropKey)
                  : $sourcePropKey;
                const contentObject = new Content(
                  $sourcePropVal, {
                    basename: _basename,
                    parent: eventTarget,
                    path: _path,
                    rootAlias,
                  }, subschema
                );
                Object.assign(root, {
                  [$sourcePropKey]: contentObject
                });
              }
            }
            // Assign Root Property
            else {
              validateSourceProperty = (enableValidation)
                ? schema.validateProperty($sourcePropKey, $sourcePropVal)
                : null;
              valid = ((
                enableValidation && validateSourceProperty.valid
              ) || !enableValidation);
              if(valid) {
                Object.assign(root, {
                  [$sourcePropKey]: $sourcePropVal
                });
              }
            }
            // Assign Source Property Event
            if(events.includes('assignSourceProperty') && valid) {
              eventTarget.dispatchEvent(
                new ContentEvent('assignSourceProperty', {
                  basename,
                  path,
                  detail: {
                    key: $sourcePropKey,
                    val: $sourcePropVal,
                    source: $source,
                  }
                }, eventTarget)
              );
            }
          }
          // Assign Source Event
          if(events.includes('assignSource')) {
            eventTarget.dispatchEvent(
              new ContentEvent('assignSource', {
                basename,
                path,
                detail: {
                  source: $source,
                },
              }, eventTarget)
            );
          }
        }
        // Assign Event
        if(events.includes('assign')) {
          eventTarget.dispatchEvent(
            new ContentEvent('assign', { 
              basename,
              path,
              detail: {
                sources
              },
            }, eventTarget)
          );
        }
        return root
      }
    }
  )
}

function DefineProperties(
  $trap, $trapPropertyName, $aliases, $options
) {
  const { events } = $options;
  const {
    proxy,
    eventTarget, 
    root, 
    rootAlias, 
    basename,
    path, 
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
        // Define Properties Event
        if(events.includes('defineProperties')) {
          eventTarget.dispatchEvent(
            new ContentEvent(
              'defineProperties',
              {
                basename,
                path,
                detail: {
                  descriptors: $propertyDescriptors,
                },
              },
              eventTarget
            )
          );
        }
        return root
      }
    }
  )
}

function DefineProperty(
  $trap, $trapPropertyName, $aliases, $options
) {
  const { descriptorValueMerge, descriptorTree, events } = $options;
  const {
    eventTarget, 
    root, 
    rootAlias, 
    basename,
    path, 
    schema,
  } = $aliases;
  return Object.defineProperty(
    $trap, $trapPropertyName, {
      value: function() {
        let valid, validateSourceProperty;
        const { enableValidation } = schema.options;
        const propertyKey = arguments[0];
        const propertyDescriptor = arguments[1];
        // Property Descriptor Value: Direct Instance Array/Object/Map
        if(isDirectInstanceOf$1(
          propertyDescriptor.value, [Object, Array/*, Map*/]
        )) {
          let subschema;
          switch(schema.contextType) {
            case 'array': subschema = schema.context[0]; break
            case 'object': subschema = schema.context[propertyKey]; break
          }
          // Enable Validation, No Subschema: Iterate Source Props
          // if(enableValidation && !subschema) continue iterateSourceProps
          const rootPropertyDescriptor = Object.getOwnPropertyDescriptor(
            root, propertyKey
          ) || {};
          // Root Property Descriptor Value: Existent DET Instance
          if(
            rootPropertyDescriptor.value // instanceof Content
            ?.constructor.name === 'bound Content'
          ) {
            // Root Define Properties, Descriptor Tree
            if(descriptorTree === true) {
              rootPropertyDescriptor.value.defineProperties(
                propertyDescriptor.value
              );
            }
            // Root Define Properties, No Descriptor Tree
            else {
              Object.defineProperty(root, propertyKey, propertyDescriptor);
            }
          }
          // Root Property Descriptor Value: Non-Existent DET Instance
          else {
            const _basename = propertyKey;
            const _path = (
              path !== null
            ) ? path.concat('.', propertyKey)
              : propertyKey;
            const _root = (typeOf(propertyDescriptor.value) === 'object')
              ? {}
              : (typeOf(propertyDescriptor.value) === 'array')
              ? []
            //   : (typeOf(propertyDescriptor.value) === 'map')
            //   ? new Map()
              : {};
            const contentObject = new Content(
              _root, {
                basename: _basename,
                parent: eventTarget,
                path: _path,
                rootAlias,
              }, subschema
            );
            // Root Define Properties, Descriptor Tree
            if(descriptorTree === true) {
              contentObject.defineProperties(propertyDescriptor.value);
              root[propertyKey] = contentObject;
            } else 
            // Root Define Properties, No Descriptor Tree
            if(descriptorTree === false) {
              Object.defineProperty(root, propertyKey, propertyDescriptor);
            }
          }
        }
        // Property Descriptor Value Not Array/Object/Map
        else {
          validateSourceProperty = (enableValidation)
            ? schema.validateProperty(propertyKey, propertyDescriptor.value)
            : null;
          valid = ((
            enableValidation && validateSourceProperty.valid
          ) || !enableValidation);
          if(valid) {
            Object.defineProperty(root, propertyKey, propertyDescriptor);
          }
        }
        // Define Property Event
        if(events.includes('defineProperty') && valid) {
          eventTarget.dispatchEvent(
            new ContentEvent('defineProperty', {
              basename,
              path,
              detail: {
                prop: propertyKey,
                descriptor: propertyDescriptor,
              },
            }, eventTarget
          ));
        }
        return root
      }
    }
  )
}

function Entries$1(
  $trap, $trapPropertyName, $aliases
) {
  const { eventTarget, root } = $aliases;
  return Object.defineProperty(
    $trap, $trapPropertyName, {
      value: function() {
        return Object.entries(root)
      }
    }
  )
}

function Freeze(
  $trap, $trapPropertyName, $aliases, $options
) {
  const { recurse, events } = $options;
  const {
    eventTarget, 
    root, 
    rootAlias, 
    basename,
    path,
  } = $aliases;
  return Object.defineProperty(
    $trap, $trapPropertyName, {
      value: function () {
        if(recurse === true) {
          for(const [
            $propertyKey, $propertyValue
          ] of Object.entries(this)) {
            if(
              $propertyValue.constructor.name === 'bound Content'
            ) {
              $propertyValue.freeze();
            } else {
              Object.freeze($propertyValue);
            }
            const _basename = $propertyKey;
            const _path = (
              path !== null
            ) ? path.concat('.', $propertyKey)
              : $propertyKey;
            if(events.includes('freeze')) {
              eventTarget.dispatchEvent(
                new ContentEvent(
                  'freeze',
                  {
                    path: _path,
                    basename: _basename,
                  },
                  eventTarget
                )
              );
            }
          }
        }
        Object.freeze(this);
        return root
      }
    }
  )
}

function FromEntries(
  $trap, $trapPropertyName, $aliases
) {
  const { eventTarget, root } = $aliases;
  return Object.defineProperty(
    $trap, $trapPropertyName, {
      value: function() {
        return Object[$trapPropertyName](
          Object.entries(root)
        )
      }
    }
  )
}

function GetOwnPropertyDescriptor(
  $trap, $trapPropertyName, $aliases
) {
  const { eventTarget, root } = $aliases;
  return Object.defineProperty(
    $trap, $trapPropertyName, {
      value: function() {
        return Object.getOwnPropertyDescriptor(root, ...arguments)
      }
    }
  )
}

function GetOwnPropertyDescriptors(
  $trap, $trapPropertyName, $aliases
) {
  const { eventTarget, root } = $aliases;
  return Object.defineProperty(
    $trap, $trapPropertyName, {
      value: function() {
        return Object.getOwnPropertyDescriptors(root)
      }
    }
  )
}

function GetOwnPropertyNames(
  $trap, $trapPropertyName, $aliases
) {
  const { eventTarget, root } = $aliases;
  return Object.defineProperty(
    $trap, $trapPropertyName, {
      value: function() {
        return Object.getOwnPropertyNames(root)
      }
    }
  )
}

function GetOwnPropertySymbols(
  $trap, $trapPropertyName, $aliases
) {
  const { eventTarget, root } = $aliases;
  return Object.defineProperty(
    $trap, $trapPropertyName, {
      value: function() {
        return Object.getOwnPropertySymbols(root)
      }
    }
  )
}

function GetPrototypeOf(
  $trap, $trapPropertyName, $aliases
) {
  const { eventTarget, root } = $aliases;
  return Object.defineProperty(
    $trap, $trapPropertyName, {
      value: function() {
        return Object.getPrototypeOf(root)
      }
    }
  )
}

function GroupBy(
  $trap, $trapPropertyName, $aliases
) {
  const { eventTarget, root } = $aliases;
  return Object.defineProperty(
    $trap, $trapPropertyName, {
      value: function() {
        return Object.groupBy(root, ...arguments)
      }
    }
  )
}

function HasOwn(
  $trap, $trapPropertyName, $aliases
) {
  const { eventTarget, root } = $aliases;
  return Object.defineProperty(
    $trap, $trapPropertyName, {
      get() {
        return Object.hasOwn(root, ...arguments)
      },
      set($method) {
        root[$method] = $method;
      },
    }
  )
}

function HasOwnProperty(
  $trap, $trapPropertyName, $aliases
) {
  const { eventTarget, root } = $aliases;
  return Object.defineProperty(
    $trap, $trapPropertyName, {
      value: function() {
        return Object.prototype.hasOwnProperty.call(
          root, ...arguments
        )
      }
    }
  )
}

function Is(
  $trap, $trapPropertyName, $aliases
) {
  const { eventTarget, root } = $aliases;
  return Object.defineProperty(
    $trap, $trapPropertyName, {
      value: function() {
        return Object.is(root, ...arguments)
      }
    }
  )
}

function IsExtensible(
  $trap, $trapPropertyName, $aliases
) {
  const { eventTarget, root } = $aliases;
  return Object.defineProperty(
    $trap, $trapPropertyName, {
      value: function() {
        return Object.isExtensible(root)
      }
    }
  )
}

function IsFrozen(
  $trap, $trapPropertyName, $aliases
) {
  const { eventTarget, root } = $aliases;
  return Object.defineProperty(
    $trap, $trapPropertyName, {
      value: function() {
        return Object.isFrozen(root)
      }
    }
  )
}

function IsSealed(
  $trap, $trapPropertyName, $aliases
) {
  const { eventTarget, root } = $aliases;
  return Object.defineProperty(
    $trap, $trapPropertyName, {
      value: function() {
        return Object.isSealed(root)
      }
    }
  )
}

function IsPrototypeOf(
  $trap, $trapPropertyName, $aliases
) {
  const { eventTarget, root } = $aliases;
  return Object.defineProperty(
    $trap, $trapPropertyName, {
      value: function() {
        return Object.prototype.isPrototypeOf.call(
          root, ...arguments
        )
      }
    }
  )
}

function Keys$1(
  $trap, $trapPropertyName, $aliases
) {
  const { eventTarget, root } = $aliases;
  return Object.defineProperty(
    $trap, $trapPropertyName, {
      value: function() {
        return Object.keys(root)
      }
    }
  )
}

function PreventExtensions(
  $trap, $trapPropertyName, $aliases
) {
  const { eventTarget, root } = $aliases;
  return Object.defineProperty(
    $trap, $trapPropertyName, {
      value: function() {
        return Object.preventExtensions(root)
      }
    }
  )
}

function PropertyIsEnumerable(
  $trap, $trapPropertyName, $aliases
) {
  const { eventTarget, root } = $aliases;
  return Object.defineProperty(
    $trap, $trapPropertyName, {
      value: function() {
        return Object.prototype.propertyIsEnumerable.call(
          root, ...arguments
        )
      }
    }
  )
}

function Seal(
  $trap, $trapPropertyName, $aliases, $options
) {
  const { recurse, events } = $options;
  const {
    eventTarget, 
    root, 
    rootAlias, 
    basename,
    path,
  } = $aliases;
  return Object.defineProperty(
    $trap, $trapPropertyName, {
      value: function () {
        if(recurse === true) {
          for(const [
            $propertyKey, $propertyValue
          ] of Object.entries(this)) {
            if(
              $propertyValue.constructor.name === 'bound Content'
            ) {
              $propertyValue.seal();
            } else {
              Object.seal($propertyValue);
            }
            const basename = $propertyKey;
            const path = (
              path !== null
            ) ? path.concat('.', $propertyKey)
              : $propertyKey;
            if(events.includes('seal')) {
              eventTarget.dispatchEvent(
                new ContentEvent(
                  'seal',
                  {
                    path,
                    basename,
                  },
                  eventTarget
                )
              );
            }
          }
        }
        Object.seal(this);
        return root
      }
    }
  )
}

function SetPrototypeOf(
  $trap, $trapPropertyName, $aliases
) {
  const {
    eventTarget, 
    root, 
    rootAlias, 
    basename,
    path, 
  } = $aliases;
  return Object.defineProperty(
    $trap, $trapPropertyName, {
      value: function () {
        const prototype = arguments[0];
        Object.setPrototypeOf(root, prototype);
        eventTarget.dispatchEvent(
          new ContentEvent(
            'setPrototypeOf',
            {
              basename,
              path,
              detail: {
                prototype
              },
            },
            eventTarget
          )
        );
        return root
      }
    }
  )
}

function ToString$1(
  $trap, $trapPropertyName, $aliases
) {
  const { eventTarget, root } = $aliases;
  return Object.defineProperty(
    $trap, $trapPropertyName, {
      get() {
        return root['toString'](...arguments)
      },
      set($method) {
        root[$method] = $method;
      },
    }
  )
}

function ToLocaleString(
  $trap, $trapPropertyName, $aliases
) {
  const { eventTarget, root } = $aliases;
  return Object.defineProperty(
    $trap, $trapPropertyName, {
      get() {
        return root['toLocaleString'](...arguments)
      },
      set($method) {
        root[$method] = $method;
      },
    }
  )
}

function Values$1(
  $trap, $trapPropertyName, $aliases
) {
  const { eventTarget, root } = $aliases;
  return Object.defineProperty(
    $trap, $trapPropertyName, {
      value: function() {
        return Object.values(root)
      }
    }
  )
}

function ValueOf(
  $trap, $trapPropertyName, $aliases
) {
  const { eventTarget, root } = $aliases;
  return Object.defineProperty(
    $trap, $trapPropertyName, {
      get() {
        return root['valueOf'](...arguments)
      },
      set($method) {
        root[$method] = $method;
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
  const { root } = $aliases;
  return Object.defineProperty(
    $trap, $trapPropertyName, {
      value: function() {
        return Array.prototype.pop.call(root, ...arguments)
      }
    }
  )
}

function CopyWithin(
  $trap, $trapPropertyName, $aliases, $options
) {
  const { events } = $options;
  const {
    eventTarget, 
    root, 
    rootAlias, 
    basename,
    path, 
  } = $aliases;
  return Object.defineProperty(
    $trap, $trapPropertyName, {
      value: function() {
        const target = (
          arguments[0] >= 0
        ) ? arguments[0]
          : root.length = arguments[0];
        const start = (
          arguments[1] >= 0
        ) ? arguments[1]
          : root.length + arguments[1];
        const end = (
          arguments[2] === undefined
        ) ? root.length
          : (
          arguments[2] >= 0
        ) ? arguments[2]
          : root.length + arguments[2];
        const copiedItems = [];
        let copyIndex = start;
        let targetIndex = target;
        while(copyIndex < end) {
          const copyItem = root[copyIndex];
          copiedItems.push(copyItem);
          Array.prototype.copyWithin.call(
            root,
            targetIndex,
            copyIndex,
            copyIndex + 1
          );
          // Array Copy Within Index Event Data
          if(events.includes('copyWithinIndex')) {
            eventTarget.dispatchEvent(
              new ContentEvent(
                'copyWithinIndex',
                {
                  basename: eventTarget.basename,
                  path: eventTarget.path,
                  detail: {
                    target: targetIndex,
                    start: copyIndex,
                    end: copyIndex + 1,
                    item: copyItem,
                  },
                },
                eventTarget
              )
            );
          }
          copyIndex++;
          targetIndex++;
        }
        // Array Copy Within Event
        if(events.includes('copyWithin')) {
          eventTarget.dispatchEvent(
            new ContentEvent(
              'copyWithin',
              {
                basename: eventTarget.basename,
                path: eventTarget.path,
                detail: {
                  target: target,
                  start: start,
                  end: end,
                  items: copiedItems,
                },
              },
              eventTarget
            )
          );
        }
      }
    }
  )
}

function Concat(
  $trap, $trapPropertyName, $aliases
) {
  const { root } = $aliases;
  return Object.defineProperty(
    $trap, $trapPropertyName, {
      value: function() {
        return Array.prototype.concat.call(root, ...arguments)
      }
    }
  )
}

function Entries(
  $trap, $trapPropertyName, $aliases
) {
  const { root } = $aliases;
  return Object.defineProperty(
    $trap, $trapPropertyName, {
      value: function() {
        return Array.prototype.entries.call(root)
      }
    }
  )
}

function Every(
  $trap, $trapPropertyName, $aliases
) {
  const { root } = $aliases;
  return Object.defineProperty(
    $trap, $trapPropertyName, {
      value: function() {
        return Array.prototype.every.call(root, ...arguments)
      }
    }
  )
}

function Fill(
  $trap, $trapPropertyName, $aliases, $options
) {
  const { events } = $options;
  const {
    $eventTarget, 
    root, 
    rootAlias, 
    basename,
    path, 
    schema,
  } = $aliases;
  return Object.defineProperty(
    $trap, $trapPropertyName, {
      value: function() {
        const $arguments = [...arguments];
        let value = $arguments[0];
        if(isDirectInstanceOf$1(
          value, [Object, Array/*, Map*/]
        )) {
          const subschema = schema.context[0];
          value = new Content(value, {
            rootAlias: rootAlias,
          }, subschema);
        }
        let start;
        if(
          typeof $arguments[1] === 'number'
        ) {
          start = (
            $arguments[1] >= 0
          ) ? $arguments[1]
            : root.length + $arguments[1];
        } else {
          start = 0;
        }
        let end;
        if(
          typeof $arguments[2] === 'number'
        ) {
          end = (
            $arguments[2] >= 0
          ) ? $arguments[2]
            : root.length + $arguments[2];
        } else {
          end = root.length;
        }
        let fillIndex = start;
        while(
          fillIndex < root.length &&
          fillIndex < end
        ) {
          Array.prototype.fill.call(
            root, value, fillIndex, fillIndex + 1
          );
          const _basename = fillIndex;
          const _path = (
            path !== null
          ) ? path.concat('.', fillIndex)
            : fillIndex;
          // Array Fill Index Event
          if(events.includes('fillIndex')) {
            $eventTarget.dispatchEvent(
              new ContentEvent('fillIndex', {
                basename: _basename,
                path: _path,
                detail: {
                  start: fillIndex,
                  end: fillIndex + 1,
                  value,
                },
              }, $eventTarget)
            );
          }
          fillIndex++;
        }
        // Array Fill Event
        if(events.includes('fill')) {
          $eventTarget.dispatchEvent(
            new ContentEvent('fill', {
              basename,
              path,
              detail: {
                start,
                end,
                value,
              },
            },
            $eventTarget)
          );
        }
        return root
      }
    }
  )
}

function Filter(
  $trap, $trapPropertyName, $aliases
) {
  const { root } = $aliases;
  return Object.defineProperty(
    $trap, $trapPropertyName, {
      value: function() {
        return Array.prototype.filter.call(root, ...arguments)
      }
    }
  )
}

function Find(
  $trap, $trapPropertyName, $aliases
) {
  const { root } = $aliases;
  return Object.defineProperty(
    $trap, $trapPropertyName, {
      value: function() {
        return Array.prototype.find.call(root, ...arguments)
      }
    }
  )
}

function FindIndex(
  $trap, $trapPropertyName, $aliases
) {
  const { root } = $aliases;
  return Object.defineProperty(
    $trap, $trapPropertyName, {
      value: function() {
        return Array.prototype.findIndex.call(root, ...arguments)
      }
    }
  )
}

function FindLast(
  $trap, $trapPropertyName, $aliases
) {
  const { root } = $aliases;
  return Object.defineProperty(
    $trap, $trapPropertyName, {
      value: function() {
        return Array.prototype.findLast.call(root, ...arguments)
      }
    }
  )
}

function FindLastIndex(
  $trap, $trapPropertyName, $aliases
) {
  const { root } = $aliases;
  return Object.defineProperty(
    $trap, $trapPropertyName, {
      value: function() {
        return Array.prototype.findLastIndex.call(root, ...arguments)
      }
    }
  )
}

function Flat(
  $trap, $trapPropertyName, $aliases
) {
  const { root } = $aliases;
  return Object.defineProperty(
    $trap, $trapPropertyName, {
      value: function() {
        return Array.prototype.flat.call(root, ...arguments)
      }
    }
  )
}

function FlatMap(
  $trap, $trapPropertyName, $aliases
) {
  const { root } = $aliases;
  return Object.defineProperty(
    $trap, $trapPropertyName, {
      value: function() {
        return Array.prototype.flatMap.call(root, ...arguments)
      }
    }
  )
}

function ForEach(
  $trap, $trapPropertyName, $aliases
) {
  const { root } = $aliases;
  return Object.defineProperty(
    $trap, $trapPropertyName, {
      value: function() {
        return Array.prototype.forEach.call(root, ...arguments)
      }
    }
  )
}

function From(
  $trap, $trapPropertyName, $aliases
) {
  const { root } = $aliases;
  return Object.defineProperty(
    $trap, $trapPropertyName, {
      value: function() {
        return Array.from.call(root, root, ...arguments)
      },
    }
  )
}

function IndexOf(
  $trap, $trapPropertyName, $aliases
) {
  const { root } = $aliases;
  return Object.defineProperty(
    $trap, $trapPropertyName, {
      value: function() {
        return Array.prototype.indexOf.call(root, ...arguments)
      }
    }
  )
}

function IsArray(
  $trap, $trapPropertyName, $aliases
) {
  const { root } = $aliases;
  return Object.defineProperty(
    $trap, $trapPropertyName, {
      value: function() {
        return Array.isArray.call(root)
      },
    }
  )
}

function Join(
  $trap, $trapPropertyName, $aliases
) {
  const { root } = $aliases;
  return Object.defineProperty(
    $trap, $trapPropertyName, {
      value: function() {
        return Array.prototype.join.call(root)
      },
    }
  )
}

function Keys(
  $trap, $trapPropertyName, $aliases
) {
  const { root } = $aliases;
  return Object.defineProperty(
    $trap, $trapPropertyName, {
      value: function() {
        return Array.prototype.keys.call(root)
      },
    }
  )
}

function LastIndexOf(
  $trap, $trapPropertyName, $aliases
) {
  const { root } = $aliases;
  return Object.defineProperty(
    $trap, $trapPropertyName, {
      value: function() {
        return Array.prototype.lastIndexOf.call(root)
      },
    }
  )
}

function _Map(
  $trap, $trapPropertyName, $aliases
) {
  const { root } = $aliases;
  return Object.defineProperty(
    $trap, $trapPropertyName, {
      value: function() {
        return Array.prototype.map.call(root, ...arguments)
      }
    }
  )
}

function Of(
  $trap, $trapPropertyName, $aliases
) {
  const { root } = $aliases;
  return Object.defineProperty(
    $trap, $trapPropertyName, {
      value: function() {
        return Array.of.call(
          root, ...Object.values(root)
        )
      },
    }
  )
}

function Pop(
  $trap, $trapPropertyName, $aliases, $options
) {
  const { events } = $options;
  const {
    eventTarget, 
    root, 
    rootAlias, 
    basename,
    path, 
  } = $aliases;
  return Object.defineProperty(
    $trap, $trapPropertyName, {
      value: function() {
        const popElement = Array.prototype.pop.call(root);
        const popElementIndex = root.length - 1;
        const basename = popElementIndex;
        const path = (
          path !== null
        ) ? path.concat('.', popElementIndex)
          : popElementIndex;
        // Array Pop Event
        if(events.includes('pop')) {
          eventTarget.dispatchEvent(
            new ContentEvent(
              'pop',
              {
                basename,
                path,
                detail: {
                  element: popElement,
                  elementIndex: popElementIndex,
                },
              },
              eventTarget
            )
          );
        }
        return popElement
      }
    }
  )
}

function Push(
  $trap, $trapPropertyName, $aliases, $options
) {
  const { events } = $options;
  const {
    eventTarget, 
    root, 
    rootAlias, 
    basename,
    path, 
    schema,
  } = $aliases;
  return Object.defineProperty(
    $trap, $trapPropertyName, {
      value: function() {
        const elements = [];
        let elementIndex = 0;
        for(let $element of arguments) {
          const _basename = elementIndex;
          const _path = (
            path !== null
          ) ? path.concat('.', elementIndex)
            : elementIndex;
          // Push Prop Event
          if(isDirectInstanceOf$1($element, [Object, Array/*, Map*/])) {
            const subschema = schema.context[0];
            $element = new Content($element, {
              basename: _basename,
              path: _path,
              rootAlias: rootAlias,
            }, subschema);
          }
          elements.push($element);
          Array.prototype.push.call(root, $element);
          if(events.includes('pushProp')) {
            eventTarget.dispatchEvent(
              new ContentEvent('pushProp', {
                basename: _basename,
                path: _path,
                detail: {
                  elementIndex, 
                  element: $element,
                },
              },
              eventTarget)
            );
          }
          elementIndex++;
        }
        // Push Event
        if(events.includes('push')) {
          eventTarget.dispatchEvent(
            new ContentEvent('push', {
              basename,
              path,
              detail: {
                elements,
              },
            },
            eventTarget)
          );
        }
        return root.length
      }
    }  
  )
}

function Reduce(
  $trap, $trapPropertyName, $aliases
) {
  const { root } = $aliases;
  return Object.defineProperty(
    $trap, $trapPropertyName, {
      value: function() {
        return Array.prototype.reduce.call(root, ...arguments)
      }
    }
  )
}

function ReduceRight(
  $trap, $trapPropertyName, $aliases
) {
  const { root } = $aliases;
  return Object.defineProperty(
    $trap, $trapPropertyName, {
      value: function() {
        return Array.prototype.reduceRight.call(root, ...arguments)
      }
    }
  )
}

function Reverse(
  $trap, $trapPropertyName, $aliases, $options
) {
  const { events } = $options;
  const {
    eventTarget, 
    root, 
    rootAlias, 
    basename,
    path, 
  } = $aliases;
  return Object.defineProperty(
    $trap, $trapPropertyName, {
      value: function() {
        Array.prototype.reverse.call(root, ...arguments);
        if(events.includes('reverse')) {
          eventTarget.dispatchEvent(
            new ContentEvent(
              'reverse',
              {
                basename,
                path,
                detail: {
                  reference: root
                },
              },
              eventTarget
            )
          );
        }
        return root
      }
    }
  )
}

function Shift(
  $trap, $trapPropertyName, $aliases, $options
) {
  const { events } = $options;
  const {
    eventTarget, 
    root, 
    rootAlias, 
    basename,
    path, 
  } = $aliases;
  return Object.defineProperty(
    $trap, $trapPropertyName, {
      value: function() {
        const shiftElement = Array.prototype.shift.call(root);
        const shiftElementIndex = 0;
        const basename = shiftElementIndex;
        const path = (
          path !== null
        ) ? path.concat('.', shiftElementIndex)
          : shiftElementIndex;
        // Array Shift Event
        if(events.includes('shift')) {
          eventTarget.dispatchEvent(
            new ContentEvent(
              'shift',
              {
                basename,
                path,
                detail: {
                  element: shiftElement,
                  elementIndex: shiftElementIndex,
                },
              },
              eventTarget
            )
          );
        }
        return shiftElement
      }
    }
  )
}

function Some(
  $trap, $trapPropertyName, $aliases
) {
  const { root } = $aliases;
  return Object.defineProperty(
    $trap, $trapPropertyName, {
      value: function() {
        return Array.prototype.some.call(root, ...arguments)
      }
    }
  )
}

function Sort(
  $trap, $trapPropertyName, $aliases
) {
  const { root } = $aliases;
  return Object.defineProperty(
    $trap, $trapPropertyName, {
      value: function() {
        return Array.prototype.sort.call(root, ...arguments)
      }
    }
  )
}

function Splice(
  $trap, $trapPropertyName, $aliases, $options
) {
  const { events } = $options;
  const {
    eventTarget, 
    root, 
    rootAlias, 
    basename,
    path, 
    schema,
  } = $aliases;
  return Object.defineProperty(
    $trap, $trapPropertyName, {
      value: function() {
        const $arguments = [...arguments];
        const start = (
          $arguments[0] >= 0
        ) ? $arguments[0]
          : root.length + $arguments[0];
        const deleteCount = (
          $arguments[1] <= 0
        ) ? 0
          : (
          $arguments[1] === undefined ||
          start + $arguments[1] >= root.length
        ) ? root.length - start
          : $arguments[1];
        const addItems = $arguments.slice(2);
        const addCount = addItems.length;
        const deleteItems = [];
        let deleteItemsIndex = 0;
        while(deleteItemsIndex < deleteCount) {
          const deleteItem = Array.prototype.splice.call(root, start, 1)[0];
          deleteItems.push(deleteItem);
          // Array Splice Delete Event
          const _basename = deleteItemsIndex;
          const _path = (
            path !== null
          ) ? path.concat('.', deleteItemsIndex)
            : deleteItemsIndex;
          if(events.includes('spliceDelete')) {
            eventTarget.dispatchEvent(
              new ContentEvent('spliceDelete', {
                _basename,
                _path,
                detail: {
                  index: start + deleteItemsIndex,
                  deleteIndex: deleteItemsIndex,
                  deleteItem: deleteItem,
                },
              }, eventTarget)
            );
          }
          deleteItemsIndex++;
        }
        let addItemsIndex = 0;
        while(addItemsIndex < addCount) {
          const subschema = schema.context[0];
          const addItem = addItems[addItemsIndex];
          if(isDirectInstanceOf(
            addItem, [Object, Array/*, Map*/]
          )) {
            addItem = new Content(addItem, {
              basename: _basename,
              path: _path,
              rootAlias: rootAlias,
            }, subschema);
          }
          Array.prototype.splice.call(
            root, start + addItemsIndex, 0, addItem
          );
          const basename = addItemsIndex;
          const path = (
            path !== null
          ) ? path.concat('.', addItemsIndex)
            : addItemsIndex;
          // Array Splice Add Event
          if(events.includes('spliceAdd')) {
            eventTarget.dispatchEvent(
              new ContentEvent('spliceAdd', {
                basename,
                path,
                detail: {
                  index: start + addItemsIndex,
                  addIndex: addItemsIndex,
                  addItem: addItem,
                },
              }, eventTarget)
            );
          }
          addItemsIndex++;
        }
        // Array Splice Event
        if(events.includes('splice')) {
          eventTarget.dispatchEvent(
            new ContentEvent('splice', {
              basename,
              path: path,
              detail: {
                start,
                deleted: deleteItems,
                added: addItems,
                length: root.length,
              },
            },
            eventTarget)
          );
        }
        return deleteItems
      }
    }
  )
}

function ToLocalString(
  $trap, $trapPropertyName, $aliases
) {
  const { root } = $aliases;
  return Object.defineProperty(
    $trap, $trapPropertyName, {
      value: function() {
        return Array.prototype.toLocalString.call(root, ...arguments)
      }
    }
  )
}

function ToReversed(
  $trap, $trapPropertyName, $aliases
) {
  const { root } = $aliases;
  return Object.defineProperty(
    $trap, $trapPropertyName, {
      value: function() {
        return Array.prototype.toReversed.call(root, ...arguments)
      }
    }
  )
}

function ToSpliced(
  $trap, $trapPropertyName, $aliases
) {
  const { root } = $aliases;
  return Object.defineProperty(
    $trap, $trapPropertyName, {
      value: function() {
        return Array.prototype.toSpliced.call(root, ...arguments)
      }
    }
  )
}

function ToSorted(
  $trap, $trapPropertyName, $aliases
) {
  const { root } = $aliases;
  return Object.defineProperty(
    $trap, $trapPropertyName, {
      value: function() {
        return Array.prototype.toSorted.call(root, ...arguments)
      }
    }
  )
}

function ToString(
  $trap, $trapPropertyName, $aliases
) {
  const { root } = $aliases;
  return Object.defineProperty(
    $trap, $trapPropertyName, {
      value: function() {
        return Array.prototype.toString.call(root, ...arguments)
      }
    }
  )
}

function Unshift(
  $trap, $trapPropertyName, $aliases, $options
) {
  const { events } = $options;
  const {
    eventTarget, 
    root, 
    rootAlias, 
    basename,
    path, 
    schema,
  } = $aliases;
  return Object.defineProperty(
    $trap, $trapPropertyName, {
      value: function() {
        const $arguments = [...arguments];
        const elements = [];
        const elementsLength = $arguments.length;
        let elementIndex = elementsLength - 1;
        while(elementIndex > -1) {
          const subschema = schema.context[0];
          $arguments.length;
          let element = $arguments[elementIndex];
          const _basename = elementIndex;
          const _path = (
            path !== null
          ) ? path.concat('.', elementIndex)
            : elementIndex;
          if(isDirectInstanceOf$1(
            element, [Object, Array/*, Map*/]
          )) {
            element = new Content(element, {
              basename: _basename,
              path: _path,
              rootAlias: rootAlias,
            }, subschema);
          }
          elements.unshift(element);
          Array.prototype.unshift.call(root, element);
          // Array Unshift Prop Event
          if(events.includes('unshiftProp')) {
            eventTarget.dispatchEvent(
              new ContentEvent('unshiftProp', {
                basename: _basename,
                path: _path,
                detail: {
                  elementIndex, 
                  element: element,
                },
              }, eventTarget)
            );
          }
          elementIndex--;
        }
        // Array Unshift Event
        const _basename = elementIndex;
        const _path = (
          path !== null
        ) ? path.concat('.', elementIndex)
          : elementIndex;
        if(events.includes('unshift')) {
          eventTarget.dispatchEvent(
            new ContentEvent('unshift', {
              basename: _basename,
              path: _path,
              detail: {
                elements,
              },
            },
            eventTarget)
          );
        }
        return root.length
      }
    }  
  )
}

function Values(
  $trap, $trapPropertyName, $aliases
) {
  const { root } = $aliases;
  return Object.defineProperty(
    $trap, $trapPropertyName, {
      value: function() {
        return Array.prototype.values.call(root)
      }
    }
  )
}

function With(
  $trap, $trapPropertyName, $aliases
) {
  const { root } = $aliases;
  return Object.defineProperty(
    $trap, $trapPropertyName, {
      value: function() {
        return Array.prototype.with.call(root, ...arguments)
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

var PropertyClasses = {
  Object: ObjectProperty,
  Array: ArrayProperty,
};

class Traps {
  Object
  Array
  // Map
  constructor($settings, $options) {
    // Iterate Property Classes
    for(let [
      PropertyClassName, PropertyClassMethods
    ] of Object.entries(PropertyClasses)) {
      const trapOptions = $options[PropertyClassName.toLowerCase()];
      const trap = new Trap(PropertyClassMethods, $settings, trapOptions);
      Object.defineProperty(
        this, PropertyClassName, {
          value: trap
        }
      );
    }
  }
}

class Handler {
  #settings
  #options
  traps
  constructor($settings, $options) {
    this.#settings = $settings;
    this.#options = $options;
    this.traps = new Traps(this.#settings, $options.traps);
    Object.defineProperty(this, '__context__', {
      enumerable: false,
      configurable: false,
      writable: false,
      value: this.#settings.eventTarget,
    });
    return this
  }
  // Get Property
  get get() {
    const $this = this;
    const {
      basename,
      eventTarget,
      path,
      root,
      rootAlias,
      schema,
    } = this.#settings;
    return function get($target, $property, $receiver) {
      // Root Property
      if(this.#isRootProperty($property)) {
        return this.proxy
      }
      // Event Target/Dynamic Event Target Property
      else if(this.#isEventTargetOrContentProperty($property)) {
        if(typeof eventTarget[$property] === 'function') {
          return eventTarget[$property].bind(eventTarget)
        }
        return eventTarget[$property]
      }
      // Object Property Traps
      else if(this.#isObjectProperty($property)) {
        return $this.traps['Object'][$property] || root[$property]
      }
      // Array Property Traps
      else if(this.#isArrayProperty($property)) {
        return $this.traps['Array'][$property] || root[$property]
      }
      // Root Property
      else {
        return root[$property]
      }
    }
  }
  get set() {
    const $this = this;
    const {
      eventTarget, 
      root, 
      rootAlias, 
      schema,
    } = this.#settings;
    let {
      basename,
      path,
    } = this.#settings;
    this.#options.traps.properties.set;
    return function set($target, $property, $value, $receiver) {
      // Object Property
      if(this.#isObjectProperty($property)) {
        $this.traps['Object'][$property] = $value;
      }
      // Array, Array Prototype Property
      else if(this.#isArrayProperty($property)) {
        $this.traps['Array'][$property] = $value;
      }
      // Dynamic Event Target Property
      else if(typeof $value === 'object') {
        let subschema;
        switch(schema.contextType) {
          case 'array': subschema = schema.context[0]; break
          case 'object': subschema = schema.context[$sourcePropKey]; break
        }
        $value = new Content($value, {
          basename,
          parent: eventTarget,
          path,
          rootAlias,
        }, subschema);
      }
      // Property Assignment
      root[$property] = $value;
      basename = $property;
      path = (
        path !== null
      ) ? path.concat('.', $property)
        : $property;
      eventTarget.dispatchEvent(
        new ContentEvent('set', {
          basename,
          path,
          detail: {
            property: $property,
            value: $value,
          },
        },
        eventTarget
      ));
      return true
    }
  }
  get deleteProperty() {
    const {
      eventTarget, 
      root, 
      rootAlias, 
    } = this.#settings;
    let {
      basename,
      path,
    } = this.#settings;
    this.#options.traps.properties.set;
    return function deleteProperty($target, $property) {
      delete root[$property];
      eventTarget.dispatchEvent(
        new ContentEvent('delete', {
          basename,
          path,
          detail: {
            property: $property
          },
        },
        eventTarget
      ));
      return true
    }
  }
  #isRootProperty($property) {
    return ($property === this.#settings.rootAlias)
  }
  #isContentProperty($property) {
    return (
      (
        Object.getOwnPropertyNames(EventTarget.prototype)
        .includes($property) ||
        Object.getOwnPropertyNames(Content.prototype)
        .includes($property)
      )
    )
  }
  #isEventTarget($property) {
    return (
      (
        Object.getOwnPropertyNames(EventTarget.prototype)
        .includes($property) ||
        Object.getOwnPropertyNames(Content.prototype)
        .includes($property)
      )
    )
  }
  #isEventTargetOrContentProperty($property) {
    return (
      (
        this.#isEventTarget($property) ||
        this.#isContentProperty($property)
      )
    )
  }
  #isObjectProperty($property) {
    return (
      (
        Object.getOwnPropertyNames(Object)
        .includes($property)
      )
    )
  }
  #isArrayProperty($property) {
    return (
      (
        Object.getOwnPropertyNames(Array.prototype)
        .includes($property) ||
        Object.getOwnPropertyNames(Array)
        .includes($property)
      )
    )
  }
  #isFunctionProperty($property) {
    return (
      Object.getOwnPropertyNames(Function.prototype)
      .includes($property)
    )
  }
}

var Options$5 = {
  rootAlias: 'content',
  traps: {
    properties: {
      set: {
        events: [
          'setProperty',
          'set'
        ],
      },
    },
    object: {
      assign: {
        events: [
          'assignSourceProperty',
          'assignSource',
          'assign'
        ],
      },
      defineProperties: {
        events: ['defineProperties'],
      },
      defineProperty: {
        descriptorTree: true,
        events: ['defineProperty'],
      },
      freeze: {
        recurse: true,
        events: ['freeze']
      },
      seal: {
        recurse: true,
        events: ['seal']
      },
    },
    array: {
      copyWithin: {
        events: [
          'copyWithinIndex',
          'copyWithin'
        ]
      },
      unshift: {
        events: [
          'unshiftProp',
          'unshift'
        ]
      },
      splice: {
        events: [
          'spliceDelete',
          'spliceAdd',
          'splice'
        ]
      },
      shift: {
        events: ['shift']
      },
      reverse: {
        events: ['reverse']
      },
      push: {
        events: [
          'pushProp',
          'push'
        ]
      },
      pop: {
        events: ['pop']
      },
      fill: {
        events: [
          'fillIndex',
          'fill'
        ]
      },
    }
  }
};

class Content extends EventTarget {
  #settings
  #options
  #schema
  #_type // 'object' // 'array' // 'map'
  #_rootAlias
  #_root
  #_parent
  #_basename
  #_path
  #_proxy
  #_handler
  #_aliases
  constructor($settings = {}, $options = {}, $schema) {
    super();
    this.#settings = $settings;
    this.#options = Object.assign(
      {}, Options$5, $options
    );
    this.#schema = $schema;
    return this.proxy
  }
  // Type
  get type() {
    if(this.#_type !== undefined) return this.#_type
    this.#_type = typeOf$1(this.#settings);
    return this.#_type
  }
  get parent() {
    if(this.#_parent !== undefined)  return this.#_parent
    this.#_parent = (
      this.#options.parent !== undefined
    ) ? this.#options.parent
      : null;
    return this.#_parent
  }
  get basename() {
    if(this.#_basename !== undefined)  return this.#_basename
    this.#_basename = (
      this.#options.basename !== undefined
    ) ? this.#options.basename
      : null;
    return this.#_basename
  }
  get path() {
    if(this.#_path !== undefined)  return this.#_path
    this.#_path = (
      this.#options.path !== undefined
    ) ? this.#options.path
      : null;
    return this.#_path
  }
  // Root Alias
  get #rootAlias() {
    if(this.#_rootAlias !== undefined) return this.#_rootAlias
    this.#_rootAlias = (
      typeof this.#options.rootAlias === 'string' &&
      this.#options.rootAlias.length > 0
    ) ? this.#options.rootAlias
      : Options$5.rootAlias;
    return this.#_rootAlias
  }
  // Root
  get #root() {
    if(this.#_root !== undefined) return this.#_root
    this.#_root = (
      typeOf$1(this.#settings) === 'object'
    ) ? {}
      : (
      typeOf$1(this.#settings) === 'array'
    ) ? []
      : {};
    return this.#_root
  }
  // Proxy
  get proxy() {
    if(this.#_proxy !== undefined) return this.#_proxy
    this.#_proxy = new Proxy(this.#root, this.#handler);
    this.#handler.proxy = this.proxy;
    if(this.type === 'object') {
      this.#_proxy.assign(this.#settings);
    } else
    if(this.type === 'array') {
      this.#_proxy.assign(this.#settings);
    }
    return this.#_proxy
  }
  // Handler
  get #handler() {
    if(this.#_handler !== undefined) return this.#_handler
    this.#_handler = new Handler(this.#aliases, {
      traps: this.#options.traps,
    });
    return this.#_handler
  }
  // Aliases
  get #aliases() {
    if(this.#_aliases !== undefined) return this.#_aliases
    this.#_aliases = Object.defineProperties({}, {
      eventTarget: { value: this },
      basename: { value: this.basename },
      path: { value: this.path },
      parent: { value: this.parent },
      rootAlias: { value: this.#rootAlias },
      root: { value: this.#root },
      type: { value: this.type },
      schema: { value: this.#schema },
    });
    return this.#_aliases
  }
  parse($settings = {
    type: 'object', // 'json',
  }) {
    let parsement = (
      this.type === 'object'
    ) ? {}
      : (
      this.type === 'array'
    ) ? []
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
    if(
      $settings.type === 'object' || 
      $settings.type === 'Object'
    ) {
      return parsement
    } else if(
      $settings.type === 'json' || 
      $settings.type === 'JSON' 
    ) {
      return JSON.stringify(parsement, null, 2)
    }
    return undefined
  }
}

class Validator extends EventTarget {
  #settings
  constructor($settings = {}) {
    super();
    this.#settings = $settings;
  }
  get type() { return this.#settings.type }
  get validate() { return this.#settings.validate }
}

class Validation extends EventTarget {
  #settings
  #_type
  #_valid = false
  #_contentKey
  #_contentVal
  #_contextVal
  constructor($settings = {}) {
    super();
    this.#settings = $settings;
    const {
      type, valid, contextVal, contentKey, contentVal
    } = this.#settings;
    this.type = type;
    this.valid = valid;
    this.contextVal = contextVal;
    this.contentKey = contentKey;
    this.contentVal = contentVal;
  }
  // Type
  get type() { return this.#_type }
  set type($type) { this.#_type = $type; }
  // Valid
  get valid() { return this.#_valid }
  set valid($valid) { this.#_valid = $valid; }
  // Context Key
  get contextVal() { return this.#_contextVal }
  set contextVal($contextVal) { this.#_contextVal = $contextVal; }
  // Content Key
  get contentKey() { return this.#_contentKey }
  set contentKey($contentKey) { this.#_contentKey = $contentKey; }
  // Content Val
  get contentVal() { return this.#_contentVal }
  set contentVal($contentVal) { this.#_contentVal = $contentVal; }
}

class TypeValidator extends Validator {
  #settings
  constructor($settings = {}) {
    super(Object.assign($settings, {
      type: 'type',
      validate: ($contextVal, $contentKey, $contentVal) => {
        let validation = new Validation({
          contextVal: $contextVal,
          contentKey: $contentKey,
          contentVal: $contentVal,
          type: this.type,
          valid: false,
        });
        const typeOfContentVal = typeOf$1($contentVal);
        const typeOfContextVal = typeOf$1($contextVal.type());
        if(
          [Number, String, Boolean].includes($contextVal.type) &&
          ['number', 'string', 'boolean'].includes(typeOfContentVal)
        ) {
          if(typeOfContextVal === typeOfContentVal) {
            validation.valid = true;
          }
        }
        return validation
      },
    }));
  }
}

const Primitives = {
  'string': String, 
  'number': Number, 
  'boolean': Boolean, 
};
const Objects = {
  'object': Object,
  'array': Array
};
Object.assign({}, Primitives, Objects);

const Options$4 = {
  enableValidation: true,
};
const Validators = [new TypeValidator()];
class Schema extends EventTarget{
  settings
  options
  #_contextType
  #_context
  constructor($settings = {}, $options = {}) {
    super();
    this.settings = $settings;
    this.options = Object.assign({}, Options$4, $options);
    this.context;
  }
  get contextType() {
    if(this.#_contextType !== undefined) return this.#_contextType
    if(Array.isArray(this.settings)) { this.#_contextType = 'array'; }
    else if(typeOf$1(this.settings) === 'object') { this.#_contextType = 'object'; }
    return this.#_contextType
  }
  get context() {
    if(this.#_context !== undefined) return this.#_context
    let settings;
    if(this.contextType === 'array') {
      settings = this.settings.slice(0, 1);
      this.#_context = [];
    }
    else if(this.contextType === 'object') {
      settings = this.settings; 
      this.#_context = {};
    }
    for(const [
      $contextKey, $contextVal
    ] of Object.entries(settings)) {
      settings[$contextKey].validators = Validators.concat(
        settings[$contextKey].validators || []
      );
      // Context Val Type: Schema Instance
      if(settings[$contextKey].type instanceof Schema) {
        this.#_context[$contextKey] = settings[$contextKey];
      }
      // Context Val Type: Primitive Prototype
      else if(Object.values(Primitives).includes(settings[$contextKey].type)) {
        this.#_context[$contextKey] = settings[$contextKey];
      }
      // Context Val Type: Object Prototype
      else if(Object.values(Objects).includes(settings[$contextKey].type)) {
        this.#_context[$contentKey] = new Schema(
          new settings[$contentKey].type(), this.options
        );
      }
      // Context Val Type: Object Literal
      else if(Object.keys(Objects).includes(typeOf$1(settings[$contextKey].type))) {
        this.#_context[$contextKey] = new Schema(
          settings[$contextKey].type, this.options
        );
      }
    }
    return this.#_context
  }
  validate($content) {
    return Object.entries($content).reduce(($validation, [
      $contentKey, $contentVal
    ], $validatorIndex, $contentEntries) => {
      const typeOfContentVal = typeOf$1($contentVal);
      let propertyValidation;
      if(Object.keys(Primitives).includes(typeOfContentVal)) {
        propertyValidation = this.validateProperty($contentKey, $contentVal);
      }
      else if(this.contextType === 'array') {
        propertyValidation = this.context[0].validate($contentVal);
      }
      else if(this.contextType === 'object') {
        propertyValidation = this.context[$contentKey].validate($contentVal);
      }
      $validation.properties.push(propertyValidation);
      if($validatorIndex === $contentEntries.length - 1) {
        $validation.valid = !$validation.properties.find(
          ($propertyValidation) => $propertyValidation.valid === false
        );
      }
      return $validation
    }, {
      properties: [],
      valid: undefined,
    })
  }
  validateProperty($key, $val) {
    const Validation = {
      advance: [], // Array
      deadvance: [], // Array
      valid: undefined, // Boolean
    };
    let contextVal;
    switch(this.contextType) {
      case 'array': contextVal = this.context[0]; break
      case 'object': contextVal = this.context[$key]; break
    } 
    return contextVal.validators.reduce(
      ($validation, $validator, $validatorIndex, $validators) => {
        const validation = $validator.validate(
          contextVal, $key, $val
        );
        if(validation.valid === true) {
          $validation.advance.push(validation);
        }
        else if(validation.valid === false) {
          $validation.deadvance.push(validation);
        }
        if($validatorIndex === $validators.length - 1) {
          $validation.valid = (
            $validation.deadvance.length === 0
          ) ? true
            : false;
        }
        return $validation
      }, Object.assign({}, Validation)
    )
  }
}

const Settings$3 = {
  content: {},
  schema: {},
};
const Options$3 = {
  content: {},
  schema: {},
};
class Model extends Core {
  #_schema
  #_content
	constructor($settings = {}, $options = {}) {
		super(
      Object.assign({}, Settings$3, $settings), 
      Object.assign({}, Options$3, $options),
    );
    this.schema;
    this.content;
    if(this.options.enableEvents === true) this.enableEvents();
	}
  get schema() {
    if(this.#_schema !== undefined) return this.#_schema
    let { schema, content } = this.settings;
    // Existing Schema
    if(schema instanceof Schema) {
      this.#_schema = schema;
    }
    // New Schema
    else if(
      (Array.isArray(schema) && Array.isArray(content)) ||
      (typeOf$1(schema) === 'object' && typeOf$1(content) === 'object')
    ) {
      this.#_schema = new Schema(
        schema, this.options.schema
      );
    }
    return this.#_schema
  }
  get content() {
    if(this.#_content !== undefined) return this.#_content
    let { schema, content } = this.settings;
    if(((
      schema instanceof Schema || Array.isArray(schema)
    ) && Array.isArray(content)) ||
    ((
      schema instanceof Schema || typeOf$1(schema) === 'object'
    ) && typeOf$1(content) === 'object')) {
      this.#_content = new Content(
        content, this.options.content, this.schema
      ); 
    }
    return this.#_content
  }
  parse() { return this.content.parse() }
}

const Settings$2 = {
  templates: { default: () => `` },
  querySelectors: {},
  events: {},
};
const Options$2 = {};
class View extends Core {
  #_parent
  #_element
  #_template
  #_querySelectors
  #_isRendered = false
  constructor($settings = {}, $options = {}) {
    super(
      Object.assign({}, Settings$2, $settings),
      Object.assign({}, Options$2, $options),
    );
  }
  get parent() { return this.settings.parent }
  get template() {
    if(this.#_template !== undefined) return this.#_template
    this.#_template = document.createElement('template');
    return this.#_template
  }
  get querySelectors() {
    if(this.#_querySelectors !== undefined) return this.#_querySelectors
    const $this = this;
    this.#_querySelectors = {};
    for(const [
      $querySelectorMethod, $querySelectors
    ] of Object.entries(this.settings.querySelectors)) {
      for(const [
        $querySelectorName, $querySelector
      ] of Object.entries($querySelectors)) {
        Object.defineProperty(this.#_querySelectors, $querySelectorName, {
          get() {
            return $this.template.content[$querySelectorMethod]($querySelector)
          }
        });
      }
    }
    return this.#_querySelectors
  }
  autoinsert() {
    try {
      const { target, position } = this.settings.autoinsert;
      target.insertAdjacentElement(position, this.parent);
    } catch($err) {}
    return this
  }
  autoremove() {
    try {
      this.parent.parentElement.removeChild(this.parent);
    } catch($err) {}
    return this
  }
  render($model, $template = 'default') {
    this.disableEvents();
    this.#_querySelectors = undefined;
    this.template.innerHTML = this.settings.templates[$template]($model);
    this.querySelectors;
    this.parent.replaceChildren();
    this.parent.appendChild(this.template.content);
    if(this.options.enableEvents === true) { this.enableEvents(); }
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
			}
			else if(typeOf$1($model) === 'object') {
				_models[$modelName] = new Model($model);
			}
			else if(typeOf$1($model) === 'array') {
				_models[$modelName] = new Model(...$model);
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
			if($view instanceof View) {
				_views[$viewName] = $view;
			}
			else if(typeOf$1($view) === 'object') {
				_views[$viewName] = new View($view);
			}
			else if(typeOf$1($view) === 'array') {
				_views[$viewName] = new View(...$view);
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
			}
			else if(typeOf$1($control) === 'object') {
				_controls[$controlName] = new Control($control);
			}
			else if(typeOf$1($control) === 'array') {
				_controls[$controlName] = new Control(...$control);
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
				}
				else if(typeOf$1($router) === 'object') {
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
				else if(typeOf$1($router) === 'array') {
					const Router = (
						$routerClass === 'static'
					) ? StaticRouter
					  : (
				  	$routerClass === 'fetch'
			  	) ? FetchRouter
					  : undefined;
				  if(Router !== undefined) {
				  	_routers[$routerClass][$routerName] = new Router(...$router);
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

export { Control, Core, FetchRouter, Model, Schema, StaticRouter, View };
//# sourceMappingURL=mvc-framework.js.map
