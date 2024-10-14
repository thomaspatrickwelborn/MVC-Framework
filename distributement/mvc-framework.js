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
  #settings
  #boundCallback
  #_enable = false
  constructor($settings) { 
    this.#settings = $settings;
  }
  get context() { return this.#settings.context }
  get type() { return this.#settings.type }
  get path() { return this.#settings.target }
  get target() {
    let target = this.context;
    for(const $targetPathKey of this.path.split('.')) {
      if($targetPathKey === ':scope') break
      if(target[$targetPathKey] === undefined) return undefined
      target = target[$targetPathKey];
    }
    return target
  }
  get callback() {
    if(this.#boundCallback === undefined) {
      this.#boundCallback = this.#settings.callback.bind(this.context);
    }
    return this.#boundCallback
  }
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
      }
      this.#_enable = $enable;
    }
    else if(this.target instanceof EventTarget) {
      this.target[eventAbility](this.type, this.callback);
      this.#_enable = $enable;
    }
    else {
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
    this.addEvents(this.settings.events);
  }
  #_events = []
  get events() { return this.#_events }
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
    $events = (typeof $events === 'object')
      ? parseShortenedEvents($events)
      : this.events;
    return this.#toggleEventAbility('addEventListener', $events)
  }
  disableEvents($events) {
    $events = (typeof $events === 'object')
      ? parseShortenedEvents($events)
      : this.events;
    return this.#toggleEventAbility('removeEventListener', $events)
  }
  #toggleEventAbility($eventListenerMethod, $events) {
    const enability = ($eventListenerMethod === 'addEventListener')
      ? true
      : ($eventListenerMethod === 'removeEventListener')
      ? false
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

let ValidatorEvent$1 = class ValidatorEvent extends Event {
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
            new ValidatorEvent(
              this.type, 
              {
                basename: $event.basename,
                path: $event.path,
                detail: $event.detail,
                results: $event.results,
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
  get results() { return this.#settings.results }
};

class Trap {
  #methods
  #content
  #options
  constructor($methods, $content, $options = {}) {
    this.#methods = $methods;
    this.#content = $content;
    this.#options = $options;
    for(let [
      $methodName, $createPropertyMethod
    ] of Object.entries(this.#methods)) {
      const methodOptions = this.#options[$methodName] || {};
      Object.defineProperty(this, $methodName, {
        value: $createPropertyMethod(this.#content, methodOptions)
      });
    }
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

// import { typeOf } from  '../../../../../../../Coutil/index.js'
// export default typeOf
const typeOf = ($data) => Object
  .prototype
  .toString
  .call($data).slice(8, -1).toLowerCase();

function Assign($content, $options) {
  const { recursive, events } = $options;
  const { basename, path, root, schema } = $content;
  const { enableValidation, validationEvents } = $content.options;
  return function assign() {
    const sources = [...arguments];
    // Iterate Sources
    for(let $source of sources) {
      // Iterate Source Props
      iterateSourceProps:
      for(let [
        $sourcePropKey, $sourcePropVal
      ] of Object.entries($source)) {
        const _basename = $sourcePropKey;
        const _path = (path !== null)
          ? path.concat('.', $sourcePropKey)
          : $sourcePropKey;
        // Validation
        if(schema && enableValidation) {
          const validSourceProp = schema.validateProperty($sourcePropKey, $sourcePropVal);
          if(validationEvents) {
            $content.dispatchEvent(
              new ValidatorEvent$1('validateProperty', {
                basename: _basename,
                path: _path,
                detail: validSourceProp,
              }, $content)
            );
          }
          if(!validSourceProp.valid) { continue iterateSourceProps }
        }
        // Assign Root DET Property
        // Source Prop: Object Type
        if(isDirectInstanceOf($sourcePropVal, [Object, Array/*, Map*/])) {
          let subschema;
          switch(schema.contextType) {
            case 'array': subschema = schema.context[0]; break
            case 'object': subschema = schema.context[$sourcePropKey]; break
          }
          // Assign Root DET Property: Existent
          if(root[$sourcePropKey]?.constructor.name === 'bound Content') {
            root[$sourcePropKey].assign($sourcePropVal);
          }
          // Assign Root DET Property: Non-Existent
          else {
            const contentObject = new Content($sourcePropVal, {
              basename: _basename,
              parent: $content,
              path: _path,
            }, subschema);
            Object.assign(root, {
              [$sourcePropKey]: contentObject
            });
          }
        }
        // Source Prop: Primitive Type
        else {
          Object.assign(root, {
            [$sourcePropKey]: $sourcePropVal
          });
        }
        // Assign Source Property Event
        if(events.includes('assignSourceProperty')) {
          $content.dispatchEvent(
            new ContentEvent('assignSourceProperty', {
              basename: _basename,
              path: _path,
              detail: {
                key: $sourcePropKey,
                val: $sourcePropVal,
                source: $source,
              }
            }, $content)
          );
        }
      }
      // Assign Source Event
      if(events.includes('assignSource')) {
        $content.dispatchEvent(
          new ContentEvent('assignSource', {
            basename,
            path,
            detail: {
              source: $source,
            },
          }, $content)
        );
      }
    }
    // Assign Event
    if(events.includes('assign')) {
      $content.dispatchEvent(
        new ContentEvent('assign', { 
          basename,
          path,
          detail: {
            sources
          },
        }, $content)
      );
    }
    return root
  }
}

function DefineProperties($content, $options) {
  const { events } = $options;
  const { root, rootAlias, basename, path, schema } = $content;
  return function defineProperties() {
    const $propertyDescriptors = arguments[0];
    Object.entries($propertyDescriptors)
    .reduce(($properties, [
      $propertyDescriptorKey, $propertyDescriptor
    ]) => {
      $properties[$propertyDescriptorKey] = $propertyDescriptor.value;
      return $properties
    }, {});
    // Iterate Property Descriptors
    for(const [
      $propertyKey, $propertyDescriptor
    ] of Object.entries($propertyDescriptors)) {
      // Property Descriptor Value Is Direct Instance Of Array/Object/Map
      $trap.defineProperty($propertyKey, $propertyDescriptor);
    }
    // Define Properties Event
    if(events.includes('defineProperties')) {
      $content.dispatchEvent(
        new ContentEvent(
          'defineProperties',
          {
            basename,
            path,
            detail: {
              descriptors: $propertyDescriptors,
            },
          },
          $content
        )
      );
    }
    return root
  }
}

function DefineProperty($content, $options) {
  const { descriptorValueMerge, descriptorTree, events } = $options;
  const { root, basename, path, schema } = $content;
  const { enableValidation, validationEvents } = $content.options;
  return function defineProperty() {
    const { proxy } = $content;
    const propertyKey = arguments[0];
    const propertyDescriptor = arguments[1];
    const _basename = propertyKey;
    const _path = (
      path !== null
    ) ? path.concat('.', propertyKey)
      : propertyKey;
    // Validation
    if(enableValidation) {
      const validSourceProp = schema.validateProperty(propertyKey, propertyDescriptor.value);
      if(validationEvents) {
        $content.dispatchEvent(
          new ValidatorEvent$1('validateProperty', {
            basename: _basename,
            path: _path,
            detail: validSourceProp,
          }, $content)
        );
      }
      if(!validSourceProp.valid) { return root }
    }
    // Property Descriptor Value: Direct Instance Array/Object/Map
    if(isDirectInstanceOf(propertyDescriptor.value, [Object, Array/*, Map*/])) {
      let subschema;
      switch(schema.contextType) {
        case 'array': subschema = schema.context[0]; break
        case 'object': subschema = schema.context[propertyKey]; break
      }
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
              parent: proxy, // $content,
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
      // }
    }
    // Property Descriptor Value Not Array/Object/Map
    else {
      Object.defineProperty(root, propertyKey, propertyDescriptor);
    }
    // Define Property Event
    if(events.includes('defineProperty')) {
      $content.dispatchEvent(
        new ContentEvent('defineProperty', {
          basename: _basename,
          path: _path,
          detail: {
            prop: propertyKey,
            descriptor: propertyDescriptor,
          },
        }, $content
      ));
    }
    return root
  }
}

function Entries$1($content, $options) {
  const { root } = $content;
  return function entries() {
    return Object.entries(root)
  }
}

function Freeze($content, $options) {
  const { recurse, events } = $options;
  const { root, basename, path } = $content;
  return function freeze() {
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
          $content.dispatchEvent(
            new ContentEvent(
              'freeze',
              {
                path: _path,
                basename: _basename,
              },
              $content
            )
          );
        }
      }
    }
    Object.freeze(this);
    return root
  }
}

function FromEntries($content, $options) {
  const { root } = $content;
  return function fromEntries() {
    return Object.entries(root)
  }
}

function GetOwnPropertyDescriptor($content, $options) {
  const { root } = $content;
  return function getOwnPropertyDescriptor() {
    return Object.getOwnPropertyDescriptor(root, ...arguments)
  }
}

function GetOwnPropertyDescriptors($content, $options) {
  const { root } = $content;
  return function getOwnPropertyDescriptors() {
    return Object.getOwnPropertyDescriptors(root)
  }
}

function GetOwnPropertyNames($content, $options) {
  const { root } = $content;
  return function getOwnPropertyNames() {
    return Object.getOwnPropertyNames(root)
  }
}

function GetOwnPropertySymbols($content, $options) {
  const { root } = $content;
  return function getOwnPropertySymbols() {
    return Object.getOwnPropertySymbols(root)
  }
}

function GetPrototypeOf($content, $options) {
  const { root } = $content;
  return function getPrototypeOf() {
    return Object.getPrototypeOf(root)
  }
}

function GroupBy($content, $options) {
  const { root } = $content;
  return function groupBy() {
    return Object.groupBy(root, ...arguments)
  }
}

function HasOwn($content, $options) {
  const { root } = $content;
  return {
    get() {
      return Object.hasOwn(root, ...arguments)
    },
    set($method) {
      root[$method] = $method;
    },
  }
}

function HasOwnProperty($content, $options) {
  const { root } = $content;
  return function hasOwnProperty() {
    return Object.hasOwnProperty(root, ...arguments)
  }
}

function Is($content, $options) {
  const { root } = $content;
  return function is() {
    return Object.is(root, ...arguments)
  }
}

function IsExtensible($content, $options) {
  const { root } = $content;
  return function isExtensible() {
    return Object.isExtensible(root)
  }
}

function IsFrozen($content, $options) {
  const { root } = $content;
  return function isfrozen() {
    return Object.isFrozen(root)
  }
}

function IsSealed($content, $options) {
  const { root } = $content;
  return function isSealed() {
    return Object.isSealed(root)
  }
}

function IsPrototypeOf($content, $options) {
  const { root } = $content;
  return function isPrototypeOf() {
    return Object.isPrototypeOf(root, ...arguments)
  }
}

function Keys$1($content, $options) {
  const { root } = $content;
  return function keys() {
    return Object.keys(root)
  }
}

function PreventExtensions($content, $options) {
  const { root } = $content;
  return function preventExtensions() {
    return Object.preventExtensions(root)
  }
}

function PropertyIsEnumerable($content, $options) {
  const { root } = $content;
  return function propertyIsEnumerable() {
    return Object.propertyIsEnumerable(root, ...arguments)
  }
}

function Seal($content, $options) {
  const { recurse, events } = $options;
  const { root,  basename, path } = $content;
  return function seal() {
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
          $content.dispatchEvent(
            new ContentEvent(
              'seal',
              {
                path,
                basename,
              },
              $content
            )
          );
        }
      }
    }
    Object.seal(this);
    return root
  }
}

function SetPrototypeOf($content, $options) {
  const { root, basename, path } = $content;
  return function setPrototypeOf() {
    const prototype = arguments[0];
    Object.setPrototypeOf(root, prototype);
    $content.dispatchEvent(
      new ContentEvent(
        'setPrototypeOf',
        {
          basename,
          path,
          detail: {
            prototype
          },
        },
        $content
      )
    );
    return root
  }
}

function ToString$1($content, $options) {
  const { root } = $content;
  return {
    get toString() {
      return root['toString'](...arguments)
    },
    set toString($method) {
      root[$method] = $method;
    },
  }
}

function ToLocaleString($content, $options) {
  const { root } = $content;
  return {
    get toLocalString() {
      return root['toLocaleString'](...arguments)
    },
    set toLocalString($method) {
      root[$method] = $method;
    },
  }
}

function Values$1($content, $options) {
  const { root } = $content;
  return function values() {
    return Object.values(root)
  }
}

function ValueOf($content, $options) {
  const { root } = $content;
  return {
    get valueOf() {
      return root['valueOf'](...arguments)
    },
    set valueOf($method) {
      root[$method] = $method;
    },
  }
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

function At($content, $options) {
  const { root } = $content;
  return function at() {
    return Array.prototype.at.call(root, ...arguments)
  }
}

function CopyWithin($content, $options) {
  const { events } = $options;
  const { root, basename, path } = $content;
  return function copyWithin() {
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
        $content.dispatchEvent(
          new ContentEvent(
            'copyWithinIndex',
            {
              basename: $content.basename,
              path: $content.path,
              detail: {
                target: targetIndex,
                start: copyIndex,
                end: copyIndex + 1,
                item: copyItem,
              },
            },
            $content
          )
        );
      }
      copyIndex++;
      targetIndex++;
    }
    // Array Copy Within Event
    if(events.includes('copyWithin')) {
      $content.dispatchEvent(
        new ContentEvent(
          'copyWithin',
          {
            basename: $content.basename,
            path: $content.path,
            detail: {
              target: target,
              start: start,
              end: end,
              items: copiedItems,
            },
          },
          $content
        )
      );
    }
  }
}

function Concat($content, $options) {
  const { events } = $options;
  const { root, basename, path, schema } = $content;
  const { enableValidation, validationEvents } = $content.options;
  return function concat() {
    const { proxy } = $content;
    const $arguments = [...arguments];
    let valuesIndex = 0;
    let subvaluesIndex = 0;
    const values = [];
    iterateValues: 
    for(const $value of $arguments) {
      const _basename = valuesIndex;
      const _path = (path !== null)
        ? path.concat('.', valuesIndex)
        : valuesIndex;
      // Value: Array
      if(Array.isArray($value)) {
        subvaluesIndex = 0;
        const subvalues = [];
        iterateSubvalues: 
        // Validation: Subvalue
        for(const $subvalue of $value) {
          if(enableValidation) {
            const validSubvalue = schema.validate($subvalue);
            if(validationEvents) {
              $content.dispatchEvent(
                new ValidatorEvent('validateProperty', {
                  basename: _basename,
                  path: _path,
                  detail: validSubvalue,
                }, $content)
              );
            }
            if(!validSubvalue.valid) { subvaluesIndex++; continue iterateSubvalues }
          }
          // Subvalue: Objects
          if(isDirectInstanceOf($subvalue, [Object, Array])) {
            let subschema = schema.context[0];
            const subvalue = new Content($subvalue, {
              basename: _basename,
              parent: proxy,
              path: _path,
            }, subschema);
            subvalues[subvaluesIndex] = subvalue;
          }
          // Subvalue: Primitives
          else {
            subvalues[subvaluesIndex] = $subvalue;
          }
          subvaluesIndex++;
        }
        values[valuesIndex] = subvalues;
      }
      // Value: Not Array
      else {
        // Validation: Value
        if(enableValidation) {
          const validValue = schema.validateProperty(valuesIndex, $subvalue);
          if(validationEvents) {
            $content.dispatchEvent(
              new ValidatorEvent('validateProperty', {
                basename: _basename,
                path: _path,
                detail: validValue,
              }, $content)
            );
          }
          if(!validValue.valid) { valuesIndex++; continue iterateValues }
        }
        // Value: Objects
        if(isDirectInstanceOf($value, [Object])) {
          let subschema = schema.context[0];
          const value = new Content($value, {
            basename: _basename,
            parent: proxy,
            path: _path,
          }, subschema);
          values[valuesIndex] = value;
        }
        // Value: Primitives
        else {
          values[valuesIndex] = $value;
        }
      }
      root = Array.prototype.concat.call(root, values[valuesIndex]);
      if(events.includes('concatValue')) {
        if(valid === true || valid === null) {
          $content.dispatchEvent(
            new ContentEvent('concatValue', {
              basename: _basename,
              path: _path,
              detail: {
                valuesIndex,
                value: values[valuesIndex],
              },
            }, $content)
          );
        }
      }
      valuesIndex++;
    }
    if(events.includes('concat')) {
      $content.dispatchEvent(
        new ContentEvent('concat', {
          basename,
          path,
          detail: {
            values
          },
        }, $content)
      );
    }
    return root
  }
}

function Entries($content, $options) {
  const { root } = $content;
  return function entries() {
    return Array.prototype.entries.call(root)
  }
}

function Every($content) {
  const { root } = $content;
  return function every() {
    return Array.prototype.every.call(root, ...arguments)
  }
}

function Fill($content, $options) {
  const { events } = $options;
  const { root, basename, path, schema } = $content;
  const { enableValidation, validationEvents } = $content.options;
  return function fill() {
    const $arguments = [...arguments];
    let value = $arguments[0];
    if(enableValidation) {
      let validValue = schema.validate(validValue);
      if(validationEvents) {
        $content.dispatchEvent(
          new ValidatorEvent('validateProperty', {
            basename: _basename,
            path: _path,
            detail: validValue,
          }, $content)
        );
      }
      if(!validValue.valid) { return root }
    }
    if(isDirectInstanceOf(
      value, [Object, Array/*, Map*/]
    )) {
      const subschema = schema.context[0];
      value = new Content(value, {}, subschema);
    }
    let start;
    if(typeof $arguments[1] === 'number') {
      start = (
        $arguments[1] >= 0
      ) ? $arguments[1]
        : root.length + $arguments[1];
    } else {
      start = 0;
    }
    let end;
    if(typeof $arguments[2] === 'number') {
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
        $content.dispatchEvent(
          new ContentEvent('fillIndex', {
            basename: _basename,
            path: _path,
            detail: {
              start: fillIndex,
              end: fillIndex + 1,
              value,
            },
          }, $content)
        );
      }
      fillIndex++;
    }
    // Array Fill Event
    if(events.includes('fill')) {
      $content.dispatchEvent(
        new ContentEvent('fill', {
          basename,
          path,
          detail: {
            start,
            end,
            value,
          },
        },
        $content)
      );
    }
    return root
  }
}

function Filter($content, $options) {
  const { root } = $content;
  return function filter() {
    return Array.prototype.filter.call(root, ...arguments)
  }
}

function Find($content, $options) {
  const { root } = $content;
  return function find() {
    return Array.prototype.find.call(root, ...arguments)
  }
}

function FindIndex($content, $options) {
  const { root } = $content;
  return function findIndex() {
    return Array.prototype.findIndex.call(root, ...arguments)
  }
}

function FindLast($content, $option) {
  const { root } = $content;
  return function findLast() {
    return Array.prototype.findLast.call(root, ...arguments)
  }
}

function FindLastIndex($content, $options) {
  const { root } = $content;
  return function findLastIndex() {
    return Array.prototype.findLastIndex.call(root, ...arguments)
  }
}

function Flat($content, $options) {
  const { root } = $content;
  return function flat() {
    return Array.prototype.flat.call(root, ...arguments)
  }
}

function FlatMap($content, $options) {
  const { root } = $content;
  return function flatMap() {
    return Array.prototype.flatMap.call(root, ...arguments)
  }
}

function ForEach($content, $options) {
  const { root } = $content;
  return function forEach() {
    return Array.prototype.forEach.call(root, ...arguments)
  }
}

function From($content, $options) {
  const { root } = $content;
  return function from() {
    return Array.prototype.from.call(root, ...arguments)
  }
}

function IndexOf($content, $options) {
  const { root } = $content;
  return function indexOf() {
    return Array.prototype.indexOf.call(root, ...arguments)
  }
}

function IsArray($content, $options) {
  const { root } = $content;
  return function isArray() {
    return Array.prototype.isArray.call(root)
  }
}

function Join($content, $options) {
  const { root } = $content;
  return function join() {
    return Array.prototype.join.call(root)
  }
}

function Keys($content, $options) {
  const { root } = $content;
  return function keys() {
    return Array.prototype.keys.call(root)
  }
}

function LastIndexOf($content, $options) {
  const { root } = $content;
  return function lastIndexOf() {
    return Array.prototype.lastIndexOf.call(root)
  }
}

function _Map($content, $options) {
  const { root } = $content;
  return function map() {
    return Array.prototype.map.call(root, ...arguments)
  }
}

function Of($content, $options) {
  const { root } = $content;
  return function() {
    return Array.prototype.of.call(root, ...Object.values(root))
  }
}

function Pop($content, $options) {
  const { events } = $options;
  const { root, basename, path } = $content;
  return function pop() {
    const popElement = Array.prototype.pop.call(root);
    const popElementIndex = root.length - 1;
    const basename = popElementIndex;
    const path = (
      path !== null
    ) ? path.concat('.', popElementIndex)
      : popElementIndex;
    // Array Pop Event
    if(events.includes('pop')) {
      $content.dispatchEvent(
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
          $content
        )
      );
    }
    return popElement
  }
}

function Push($content, $options) {
  const { events } = $options;
  const { root, basename, path, schema } = $content;
  const { enableValidation, validationEvents } = $content.options;
  return function push() {
    const elements = [];
    let elementsIndex = 0;
    for(let $element of arguments) {
      const _basename = elementsIndex;
      const _path = (path !== null)
        ? path.concat('.', elementsIndex)
        : elementsIndex;
      // Validation
      if(enableValidation) {
        const validElement = schema.validateProperty(elementsIndex, $element);
        if(validationEvents) {
          $content.dispatchEvent(
            new ValidatorEvent('validateProperty', {
              basename: _basename,
              path: _path,
              detail: validElement,
            }, $content)
          );
        }
        if(!validElement.valid) { return root.length }
      }
      if(isDirectInstanceOf($element, [Object, Array/*, Map*/])) {
      const subschema = schema.context[0];
        $element = new Content($element, {
          basename: _basename,
          path: _path,
        }, subschema);
        elements.push($element);
        Array.prototype.push.call(root, $element);
      } else {
        elements.push($element);
        Array.prototype.push.call(root, $element);
      }
      if(events.includes('pushProp')) {
        $content.dispatchEvent(
          new ContentEvent('pushProp', {
            basename: _basename,
            path: _path,
            detail: {
              elementsIndex,               element: elements[elementsIndex],
            },
          }, $content)
        );
      }
      elementsIndex++;
    }
    // Push Event
    if(events.includes('push')) {
      $content.dispatchEvent(
        new ContentEvent('push', {
          basename,
          path,
          detail: {
            elements,
          },
        }, $content)
      );
    }
    return root.length
  }
}

function Reduce($content, $options) {
  const { root } = $content;
  return function reduce() {
    return Array.prototype.reduce.call(root, ...arguments)
  }
}

function ReduceRight($content, $options) {
  const { root } = $content;
  return function reduceRight() {
    return Array.prototype.reduceRight.call(root, ...arguments)
  }
}

function Reverse($content, $options) {
  const { events } = $options;
  const { root, basename, path } = $content;
  return function reverse() {
    Array.prototype.reverse.call(root, ...arguments);
    if(events.includes('reverse')) {
      $content.dispatchEvent(
        new ContentEvent(
          'reverse',
          {
            basename,
            path,
            detail: {
              reference: root
            },
          },
          $content
        )
      );
    }
    return root
  }
}

function Shift($content, $options) {
  const { events } = $options;
  const { root, basename, path } = $content;
  return function shift() {
    const shiftElement = Array.prototype.shift.call(root);
    const shiftElementIndex = 0;
    const basename = shiftElementIndex;
    const path = (
      path !== null
    ) ? path.concat('.', shiftElementIndex)
      : shiftElementIndex;
    // Array Shift Event
    if(events.includes('shift')) {
      $content.dispatchEvent(
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
          $content
        )
      );
    }
    return shiftElement
  }
}

function Slice($content, $options) {
  const { root } = $content;
  return function slice() {
    return Array.prototype.slice.call(root, ...arguments)
  }
}

function Some($content, $options) {
  const { root } = $content;
  return function some() {
    return Array.prototype.some.call(root, ...arguments)
  }
}

function Sort($content, $options) {
  const { root } = $content;
  return function sort() {
    return Array.prototype.sort.call(root, ...arguments)
  }
}

function Splice($content, $options) {
  const { events } = $options;
  const { root, basename,path, schema } = $content;
  const { enableValidation, validationEvents } = $content.options;
  return function splice() {
    const $arguments = [...arguments];
    const start = ($arguments[0] >= 0)
      ? $arguments[0]
      : root.length + $arguments[0];
    const deleteCount = ($arguments[1] <= 0)
      ? 0
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
      const _path = (path !== null)
        ? path.concat('.', deleteItemsIndex)
        : deleteItemsIndex;
      if(events.includes('spliceDelete')) {
        $content.dispatchEvent(
          new ContentEvent('spliceDelete', {
            _basename,
            _path,
            detail: {
              index: start + deleteItemsIndex,
              deleteIndex: deleteItemsIndex,
              deleteItem: deleteItem,
            },
          }, $content)
        );
      }
      deleteItemsIndex++;
    }
    let addItemsIndex = 0;
    spliceAdd: 
    while(addItemsIndex < addCount) {
      let _basename, _path;
      let addItem = addItems[addItemsIndex];

      // Validation
      if(enableValidation) {
        const validAddItem = schema.validateProperty(elementIndex, element);
        if(validationEvents) {
          $content.dispatchEvent(
            new ValidatorEvent('validateProperty', {
              basename: _basename,
              path: _path,
              detail: validAddItem,
            }, $content)
          );
        }
        if(!validAddItem.valid) { addItemsIndex++; continue spliceAdd }
      }
      _basename = addItemsIndex;
      _path = (path !== null)
        ? path.concat('.', addItemsIndex)
        : addItemsIndex;
      let startIndex = start + addItemsIndex;
      if(isDirectInstanceOf(addItem, [Object, Array/*, Map*/])) {
        const subschema = schema.context[0];
        addItem = new Content(addItem, {
          basename: _basename,
          path: _path,
        }, subschema);
        Array.prototype.splice.call(
          root, startIndex, 0, addItem
        );
      } else {
        Array.prototype.splice.call(
          root, startIndex, 0, addItem
        );
      }
      _basename = addItemsIndex;
      _path = (path !== null)
        ? path.concat('.', addItemsIndex)
        : addItemsIndex;
      // Array Splice Add Event
      if(events.includes('spliceAdd')) {
        $content.dispatchEvent(
          new ContentEvent('spliceAdd', {
            basename: _basename,
            path: _path,
            detail: {
              index: start + addItemsIndex,
              addIndex: addItemsIndex,
              addItem: addItem,
            },
          }, $content)
        );
      }
      addItemsIndex++;
    }
    // Array Splice Event
    if(events.includes('splice')) {
      $content.dispatchEvent(
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
        $content)
      );
    }
    return deleteItems
  }
}

function ToLocalString($content, $options) {
  const { root } = $content;
  return function toLocalString() {
    return Array.prototype.toLocalString.call(root, ...arguments)
  }
}

function ToReversed($content, $options) {
  const { root } = $content;
  return function toReversed() {
    return Array.prototype.toReversed.call(root, ...arguments)
  }
}

function ToSpliced($content, $options) {
  const { root } = $content;
  return function toSpliced() {
    return Array.prototype.toSpliced.call(root, ...arguments)
  }
}

function ToSorted($content, $options) {
  const { root } = $content;
  return function toSorted() {
    return Array.prototype.toSorted.call(root, ...arguments)
  }
}

function ToString($content, $options) {
  const { root } = $content;
  return function toString() {
    return Array.prototype.toString.call(root, ...arguments)
  }
}

function Unshift($content, $options) {
  const { events } = $options;
  const { root, basename, path, schema } = $content;
  const { enableValidation, validationEvents } = $content.options;
  return function unshift() {
    const $arguments = [...arguments];
    const elements = [];
    const elementsLength = $arguments.length;
    let elementIndex = elementsLength - 1;
    while(elementIndex > -1) {
      $arguments.length;
      let element = $arguments[elementIndex];
      const _basename = elementIndex;
      const _path = (
        path !== null
      ) ? path.concat('.', elementIndex)
        : elementIndex;
      // Validation
      if(enableValidation) {
        const validElement = schema.validateProperty(elementIndex, element);
        if(validationEvents) {
          $content.dispatchEvent(
            new ValidatorEvent('validateProperty', {
              basename: _basename,
              path: _path,
              detail: validElement,
            }, $content)
          );
        }
        if(!validElement.valid) { return root.length }
      }

      if(isDirectInstanceOf(element, [Object, Array/*, Map*/])) {
        const subschema = schema.context[0];
        element = new Content(element, {
          basename: _basename,
          path: _path,
        }, subschema);
        elements.unshift(element);
        Array.prototype.unshift.call(root, element);
      }
      else {
        elements.unshift(element);
        Array.prototype.unshift.call(root, element);
      }
      // Array Unshift Prop Event
      if(events.includes('unshiftProp')) {
        $content.dispatchEvent(
          new ContentEvent('unshiftProp', {
            basename: _basename,
            path: _path,
            detail: {
              elementIndex, 
              element: element,
            },
          }, $content)
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
    if(events.includes('unshift') && elements.length) {
      $content.dispatchEvent(
        new ContentEvent('unshift', {
          basename: _basename,
          path: _path,
          detail: {
            elements,
          },
        },
        $content)
      );
    }
    return root.length
  }
}

function Values($content, $options) {
  const { root } = $content;
  return function values() {
    return Array.prototype.values.call(root)
  }
}

function With($content, $options) {
  const { root } = $content;
  const functionProperty = { with: function() {
    return Array.prototype.with.call(root, ...arguments)
  } };
  return functionProperty.with
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
  slice: Slice,
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

function GetContent($content, $options) {
  return function getContent() {
    Object.assign({}, $options, arguments[1] || {});
    return proxy
  }
}

function GetContentProperty($content, $options) {
  return function getContentProperty() {
    // Arguments
    const $path = arguments[0];
    Object.assign(
      $options, arguments[1] || {}
    );
    const pathEntries = Object.entries($path);
    let value = root;
    for(const [$subpathIndex, $subpath] of pathEntries) {
      if($subpathIndex === 0) { value = root[$subpath]; }
      else if(value instanceof Content) { value = value.get($subpath); }
    }
    return value
  }
}

function GetProperty($content, $options) {
  const getContent = GetContent(...arguments);
  const getContentProperty = GetContentProperty(...arguments);
  return function getProperty() {
    // -----------------------------
    // Get Content Method Invocation
    // -----------------------------
    if((
      // Unulteroptions
      arguments.length === 0
    ) || (
      // Ulteroptions
      arguments.length === 1 &&
      typeof arguments[0] === 'object'
    )) { return getContent(...arguments) }
    // --------------------------------------
    // Get Content Property Method Invocation
    // --------------------------------------
    else if((
      // Unulteroptions
      arguments.length === 1 &&
      typeof arguments[0] === 'string'
    ) || (
      // Ulteroptions
      arguments.length === 2 &&
      typeof arguments[0] === 'string' &&
      typeof arguments[1] === 'object'
    )) { return getContentProperty(...arguments) }
  }
}

function SetContent($content, $options) {
  const { root, basename, path, schema } = $content;
  return function setContent() {
    const { proxy } = $content;
    // Arguments
    const $value = arguments[0];
    // Ulteroptions
    const ulteroptions = Object.assign({}, $options, arguments[1] || {});
    const contentOptions = Object.assign(
      {}, $content.options, { traps: { accessor: { set: ulteroptions } }}
    );
    // Delete Preterproperties
    proxy.delete();
    // Set Anterproperties
    const properties = Object.entries($value);
    for(const [$propertyKey, $propertyValue] of properties) {
      // Property Value
      let propertyValue;
      // Property Value: Content Instance
      if($propertyValue instanceof Content) {
        propertyValue = $propertyValue;
      }
      // Property Value: New Content Instance
      else if(typeof $propertyValue === 'object') {
        let subschema;
        if(schema.contextType === 'array') { subschema = schema.context[0]; }
        if(schema.contextType === 'object') { subschema = schema.context[$propertyKey]; }
        propertyValue = new Content($propertyValue, contentOptions, subschema);
      }
      // Property Value: Primitive Literal
      else { propertyValue = $propertyValue; }
      // Root Property: Modified Value
      root[$propertyKey] = propertyValue;
    }
    // Return Proxy
    return proxy
  }
}

function SetContentProperty($content, $options) {
  const { root, basename, path, schema } = $content;
  return function setContentProperty() {
    // Arguments
    const $path = arguments[0];
    const $value = arguments[1];
    // Options
    const ulteroptions = Object.assign({}, $options, arguments[2] || {});
    const contentOptions = Object.assign(
      {}, $content.options, { traps: { accessor: { set: ulteroptions } }}
    );
    const { recursive, events, pathkey, pathsep, pathesc } = ulteroptions;
    // Property Value
    let propertyValue;
    // Path Key: true
    if(pathkey === true) {
      let path = $path.split(new RegExp(/\.(?=(?:[^"]*"[^"]*")*[^"]*$)/));
      const basename = path.pop();
      const firstPath = (path.length) ? path[0] : basename; 
      // Property Value: Content Instance
      if($value instanceof Content) {
        propertyValue = $value;
      }
      // Property Value: New Content Instance
      else if(typeof $value === 'object') {
        let subschema;
        if(schema.contextType === 'array') { subschema = schema.context[0]; }
        if(schema.contextType === 'object') { subschema = schema.context[firstPath]; }
        propertyValue = new Content($value, contentOptions, subschema);
      }
      // Property Value: Primitive Literal
      else { propertyValue = $value; }
      // Get Target
      let target = root;
      let targetIsRoot = true;
      let targetIsContent = false;
      let targetSchema = schema;
      // Iterate Subpaths
      for(const $subpath of path) {
        let subschema;
        if(targetSchema.contextType === 'array') { subschema = targetSchema.context[0]; }
        if(targetSchema.contextType === 'object') { subschema = targetSchema.context[$subpath]; }
        targetIsRoot = (target === root);
        targetIsContent = (target.Class === Content);
        // Target: Root
        if(targetIsRoot) {
          target = target[$subpath];
        }
        // Target: Content
        else if(targetIsContent) { target = target.get($subpath, ulteroptions); }
        // Recursive: true
        // Target: Undefined
        if(recursive && target === undefined) {
          // Target: New Content Instance
          const nextarget = new Content(propertyValue, $content.options, subschema);
          // Target: Root
          if(targetIsRoot) {
            target = target[$subpath] = nextarget;
          }
          // Target: Content Instance
          else if(targetIsContent) {
            target = target.set($subpath, nextarget, ulteroptions);
          }
        }
      }
      // Target: Undefined Return
      if(target === undefined) return
      // Target: Root Set Property Value
      if(targetIsRoot) { target[basename] = propertyValue; }
      // Target: Content Set Property Value
      else if(targetIsContent) { target.set(basename, propertyValue, ulteroptions); }
    }
    // Path Key: false
    else if(pathkey === false) {
      let path = $path;
      // Property Value: Content Instance
      if($value instanceof Content) {
        propertyValue = $value;
      }
      // Property Value: New Content Instance
      else if(typeof $value === 'object') {
        let subschema;
        if(schema.contextType === 'array') { subschema = schema.context[0]; }
        if(schema.contextType === 'object') { subschema = schema.context[$propertyKey]; }
        propertyValue = new Content(
          $value, contentOptions, subschema
        );
      }
      // Property Value: Primitive Literal
      else { propertyValue = $value; }
      // Root Assignment
      root[path] = propertyValue;
    }
    // Return Property Value
    return propertyValue
  }
}

function SetProperty($content, $options) {
  const setContent = SetContent(...arguments);
  const setContentProperty = SetContentProperty(...arguments);
  return function setProperty() {
    // -----------------------------
    // Set Content Method Invocation
    // -----------------------------
    if((
      // Unulteroptions
      arguments.length === 1 &&
      typeof arguments[0] === 'object'
    ) || (
      // Ulteroptions
      arguments.length === 2 &&
      typeof arguments[0] === 'object' &&
      typeof arguments[1] === 'object'
    )) { return setContent(...arguments) }
    // --------------------------------------
    // Set Content Property Method Invocation
    // --------------------------------------
    else if((
      // Unulteroptions
      arguments.length === 2 &&
      typeof arguments[0] === 'string'
    ) || (
      // Ulteroptions
      arguments.length === 3 &&
      typeof arguments[0] === 'string' &&
      typeof arguments[2] === 'object'
    )) { return setContentProperty(...arguments) }
  }
}

function DeleteContent($content, $options) {
  const { root, basename, path, schema } = $content;
  return function deleteContent() {
    // Arguments
    Object.assign(
      $options, arguments[1] || {}
    );
    const rootPropertyEntries = Object.entries(root);
    for(const [$rootPropertyKey, $rootPropertyValue] of rootPropertyEntries) {
      if($rootPropertyValue instanceof Content) { $rootPropertyValue.delete(); }
      delete root[$rootPropertyKey];
    }
    return undefined
  }
}

function DeleteContentProperty($content, $options) {
  const { root, basename, path } = $content;
  return function deleteContentProperty() {
    // Arguments
    const $path = arguments[0];
    const ulteroptions = Object.assign(
      $options, arguments[1] || {}
    );
    // Path Key: true
    if(pathkey === true) {
      let path = $path.split(new RegExp(/\.(?=(?:[^"]*"[^"]*")*[^"]*$)/));
      const basename = path.pop();
      let target = root;
      let targetIsRoot = true;
      let targetIsContent = false;
      // Iterate Subpaths
      for(const $subpath of path) {
        targetIsRoot = (target === root);
        targetIsContent = (target.Class === Content);
        // Target: Root
        if(targetIsRoot) {
          target = target[$subpath];
        }
        // Target: Content
        else if(targetIsContent) { target = target.get($subpath, ulteroptions); }
      }
      // Target: Undefined Return
      if(target === undefined) return
      // Target: Root Set Property Value
      if(targetIsRoot) { delete target[basename]; }
      // Target: Content Set Property Value
      else if(targetIsContent) { target.delete(basename, ulteroptions); }
    }
    // Path Key: false
    else if(pathkey === false) {
      let path = $path;
      delete root[path];
    }
    return undefined
  }
}

function DeleteProperty($content, $options) {
  const deleteContent = DeleteContent(...arguments);
  const deleteContentProperty = DeleteContentProperty(...arguments);
  return function deleteProperty() {
    // --------------------------------
    // Delete Content Method Invocation
    // --------------------------------
    if((
      // Unulteroptions
      arguments.length === 0
    ) || (
      // Ulteroptions
      arguments.length === 1 &&
      typeof arguments[0] === 'object'
    )) { return deleteContent(...arguments) }
    // -----------------------------------------
    // Delete Content Property Method Invocation
    // -----------------------------------------
    else if((
      // Unulteroptions
      arguments.length === 1
    ) || (
      // Ulteroptions
      arguments.length === 2 &&
      typeof arguments[1] === 'object'
    )) { return deleteContentProperty(...arguments) }
  }
}

var AccessorProperty = {
  get: GetProperty,
  set: SetProperty,
  delete: DeleteProperty,
};

var PropertyClasses = {
  Object: ObjectProperty,
  Array: ArrayProperty,
  Accessor: AccessorProperty,
};

class Traps {
  #content
  Object // Trap
  Array // Trap
  Accessor // Trap
  constructor($content) {
    this.#content = $content;
    // Iterate Property Classes
    for(let [
      PropertyClassName, PropertyClassMethods
    ] of Object.entries(PropertyClasses)) {
      const trapOptions = this.#content.options.traps[
        PropertyClassName.toLowerCase()
      ];
      // Property Class Trap (Object, Array, Accessor)
      Object.defineProperty(
        this, PropertyClassName, {
          value: new Trap(
            PropertyClassMethods, this.#content, trapOptions
          )
        }
      );
    }
  }
}

class Handler {
  #content
  #traps
  constructor($content) {
    this.#content = $content;
    this.#traps = new Traps(this.#content);
  }
  get get() {
    const $this = this;
    const content = this.#content;
    return function get($target, $property, $receiver) {
      // --------------
      // Accessor Traps
      // --------------
      if(this.#isAccessorProperty($property)) {
        return $this.#traps['Accessor'][$property]
      }
      // ---------------------------
      // Content Class Instance Trap
      // ---------------------------
      else if(this.#isEventTargetOrContentProperty($property)) {
        if(typeof content[$property] === 'function') {
          return content[$property].bind(content)
        }
        return content[$property]
      }
      // ------------
      // Object Traps
      // ------------
      else if(this.#isObjectProperty($property)) {
        return $this.#traps['Object'][$property]
      }
      // -----------
      // Array Traps
      // -----------
      else if(this.#isArrayProperty($property)) {
        return $this.#traps['Array'][$property]
      }
      // ---------
      // Undefined
      // ---------
      else { return undefined }
    }
  }
  get deleteProperty() {}
  get defineProperty() {}
  get set() {}
  #isAccessorProperty($property) {
    return ['get', 'set', 'delete'].includes($property)
  }
  #isContentProperty($property) {
    return Object.getOwnPropertyNames(Content.prototype)
    .includes($property)
  }
  #isEventTarget($property) {
    return Object.getOwnPropertyNames(EventTarget.prototype)
    .includes($property)
    
  }
  #isEventTargetOrContentProperty($property) {
    return (
      this.#isEventTarget($property) ||
      this.#isContentProperty($property)
    )
  }
  #isObjectProperty($property) {
    return Object.getOwnPropertyNames(Object)
    .includes($property)
  }
  #isArrayProperty($property) {
    return (
      Object.getOwnPropertyNames(Array.prototype)
      .includes($property) ||
      Object.getOwnPropertyNames(Array)
      .includes($property)
    )
  }
  #isFunctionProperty($property) {
    return Object.getOwnPropertyNames(Function.prototype)
    .includes($property)
  }
}

var Options$5 = {
  enableValidation: true,
  validationEvents: true,
  traps: {
    accessor: {
      get: {
        pathkey: true,
        events: [
          'get',
          'getProperty'
        ],
      },
      set: {
        pathkey: true,
        recursive: true,
        events: [
          'set',
          'setProperty'
        ],
      },
      delete: {
        pathkey: true,
        events: [
          'delete',
          'deleteProperty'
        ],
      },
    },
    object: {
      assign: {
        recursive: true,
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
      concat: {
        events: [
          'concatValue',
          'concat'
        ]
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
  settings
  options
  schema
  #_type
  #_root
  #_parent
  #_basename
  #_path
  #_proxy
  #_handler
  constructor($settings = {}, $options = {}, $schema) {
    super();
    this.settings = $settings;
    this.options = Object.assign({}, Options$5, $options);
    this.schema = $schema;
    return this.proxy
  }
  get Class() { return Content }
  // Object
  get object() { return this.parse({ type: 'object' }) }
  // String
  get string() { return this.parse({ type: 'string' }) }
  // Type
  get type() {
    if(this.#_type !== undefined) return this.#_type
    this.#_type = typeOf$1(this.settings);
    return this.#_type
  }
  get #typedObjectLiteral() {
    if(this.type === 'object') { return {} }
    else if(this.type === 'array') { return [] }
    else { return {} }
  }
  get parent() {
    if(this.#_parent !== undefined)  return this.#_parent
    this.#_parent = (
      this.options.parent !== undefined
    ) ? this.options.parent
      : null;
    return this.#_parent
  }
  get basename() {
    if(this.#_basename !== undefined)  return this.#_basename
    this.#_basename = (
      this.options.basename !== undefined
    ) ? this.options.basename
      : null;
    return this.#_basename
  }
  get path() {
    if(this.#_path !== undefined)  return this.#_path
    this.#_path = (
      this.options.path !== undefined
    ) ? this.options.path
      : null;
    return this.#_path
  }
  // Root
  get root() {
    if(this.#_root !== undefined) return this.#_root
    this.#_root = this.#typedObjectLiteral;
    return this.#_root
  }
  // Proxy
  get proxy() {
    if(this.#_proxy !== undefined) return this.#_proxy
    // Root Handler
    this.#_proxy = new Proxy(this.root, this.#handler);
    this.#_proxy.set(this.settings);
    return this.#_proxy
  }
  // Handler
  get #handler() {
    if(this.#_handler !== undefined) return this.#_handler
    this.#_handler = new Handler(this, {
      traps: this.options.traps,
    });
    return this.#_handler
  }
  // Parse
  parse($settings = {
    type: 'object',
  }) {
    let parsement;
    if(this.type === 'object') { parsement = {}; }
    if(this.type === 'array') { parsement = []; }
    parsement = Object.entries(
      Object.getOwnPropertyDescriptors(this.proxy)
    ).reduce(($parsement, [
      $propertyDescriptorName, $propertyDescriptor
    ]) => {
      if(typeof $propertyDescriptor.value === 'object') {
        $parsement[$propertyDescriptorName] = $propertyDescriptor.value?.parse(); // || $propertyDescriptor.value
      } else {
        $parsement[$propertyDescriptorName] = $propertyDescriptor.value;
      }
      return $parsement
    }, parsement);
    if(
      $settings.type === 'object' || 
      $settings.type === 'Object'
    ) return parsement
    else if(
      $settings.type === 'string' || 
      $settings.type === 'String'
    ) return JSON.stringify(parsement, null, 2)
    return undefined
  }
}

class Validation extends EventTarget {
  #settings
  #_type
  #_valid
  #_context
  #_contentKey
  #_contentVal
  #_message
  constructor($settings = {}) {
    super();
    this.#settings = Object.freeze($settings);
  }
  // Property: Type
  get type() { return this.#settings.type }
  // Property: Valid
  get valid() { return this.#_valid }
  set valid($valid) {
    if(this.#_valid === undefined) {
      this.#_valid = $valid;
    }
  }
  // Property: Message
  get message() {
    if(this.#_message !== undefined) return this.#_message
    if(
      this.valid !== undefined &&
      this.#_message === undefined
    ) {
      this.#_message = this.#settings.messages[this.#_valid](this);
    }
    return this.#_message
  }
  // Property: Context
  get context() { return this.#settings.context }
  // Property: Context Key
  get contextKey() { return this.#settings.contentKey }
  // Property: Context Val
  get contextVal() { return this.#settings.context[this.contentKey] }
  // Property: Content Key
  get contentKey() { return this.#settings.contentKey }
  // Property: Content Val
  get contentVal() { return this.#settings.contentVal }
}

class Validator extends EventTarget {
  #settings
  constructor($settings = {}) {
    super();
    this.#settings = $settings;
    // Property: Validate
    Object.defineProperties(this, {
      'validate': {
        configurable: false,
        writable: false,
        enumerable: true,
        value: this.#settings.validate
      }
    });
  }
  // Property: Type
  get type() { return this.#settings.type }
  // Property: Messages
  get messages() { return this.#settings.messages }
}

const Primitives = {
  'string': String, 
  'number': Number, 
  'boolean': Boolean, 
  'undefined': undefined,
  'null': null,
};
const Objects = {
  'object': Object,
  'array': Array,
};
Object.assign({}, Primitives, Objects);

class TypeValidator extends Validator {
  #settings
  constructor($settings = {}) {
    super(Object.assign($settings, {
      'type': 'type',
      'messages': {
        'true': ($validation) => `${$validation.valid}`,
        'false': ($validation) => `${$validation.valid}`,
      },
      'validate': ($context, $contentKey, $contentVal) => {
        let validation = new Validation({
          context: $context,
          contentKey: $contentKey,
          contentVal: $contentVal,
          type: this.type,
          valid: undefined,
          messages: this.messages,
        });
        const typeOfContentVal = typeOf$1($contentVal);
        const typeOfContextVal = ($context.type === undefined)
          ? $context.type
          : typeOf$1($context.type());
        if(
          Object.values(Primitives).includes($context.type) &&
          Object.keys(Primitives).includes(typeOfContentVal)
        ) {
          if(
            typeOfContextVal === typeOfContentVal ||
            typeOfContextVal === undefined
          ) { validation.valid = true; }
          else { validation.valid = false; }
        }
        return validation
      },
    }));
  }
}

class RangeValidator extends Validator {
  #settings
  constructor($settings = {}) {
    super(Object.assign($settings, {
      type: 'range',
      validate: ($context, $contentKey, $contentVal) => {
        const { min, max } = $context;
        const validation = new Validation({
          context: $context,
          contentKey: $contentKey,
          contentVal: $contentVal,
          type: this.type,
          valid: undefined,
        });
        if(min !== undefined) {
          validation.min = min;
          (contentVal >= min);
        }
        if(max !== undefined) {
          validation.max = max;
          (contentVal <= max);
        }
        return validation
      },
    }));
  }
}

class LengthValidator extends Validator {
  #settings
  constructor($settings = {}) {
    super(Object.assign($settings, {
      type: 'length',
      validate: ($context, $contentKey, $contentVal) => {
        const { minLength, maxLength } = $context;
        const validation = new Validation({
          context: $context,
          contentKey: $contentKey,
          contentVal: $contentVal,
          type: this.type,
          valid: undefined,
        });
        if(minLength !== undefined) {
          validation.minLength = minLength;
          (contentVal.length >= minLength);
        }
        if(maxLength !== undefined) {
          validation.maxLength = maxLength;
          (contentVal.length <= maxLength);
        }
        return validation
      },
    }));
  }
}

class EnumValidator extends Validator {
  #settings
  constructor($settings = {}) {
    super(Object.assign($settings, {
      type: 'length',
      validate: ($context, $contentKey, $contentVal) => {
        const enumeration = $context.enum;
        const validation = new Validation({
          context: $context,
          contentKey: $contentKey,
          contentVal: $contentVal,
          type: this.type,
          valid: undefined,
        });
        validation.valid = enumeration.includes($contentVal);
        return validation
      },
    }));
  }
}

var Options$4 = {
  validationType: 'primitive', // 'object', 
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
  get validationType() { return this.options.validationType }
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
      // Context Validators: Transform
      const addValidators = [];
      // Context Validator: Add Range
      if(
        typeof settings[$contextKey].min === 'number' || 
        typeof settings[$contextKey].max === 'number'
      ) addValidators.push(new RangeValidator());
      // Context Validator: Add Length
      if(
        typeof settings[$contextKey].minLength === 'number' ||
        typeof settings[$contextKey].maxLength === 'number'
      ) addValidators.push(new LengthValidator());
      // Context Validator: Add Enum
      if(
        Array.isArray(settings[$contextKey].enum) &&
        settings[$contextKey].enum.length > 0
      ) addValidators.push(new EnumValidator());
      // Context Validators: Concat
      settings[$contextKey].validators = Validators.concat(
        addValidators, settings[$contextKey].validators || []
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
      // Context Val Type: Primitive Literal
      else {
        this.#_context[$contextKey] = settings[$contextKey];
      }
    }
    return this.#_context
  }
  validate($content) {
    let validateProperties;
    if(this.contextType === 'array') { validateProperties = []; }
    else if(this.contextType === 'object') { validateProperties = {}; }
    const Validation = {
      properties: validateProperties,
      valid: undefined,
    };
    const validation = Object.entries($content).reduce(
      ($validation, [
        $contentKey, $contentVal
      ], $validatorIndex, $contentEntries) => {
        const validation = this.validateProperty($contentKey, $contentVal);
        if(validation === null) return $validation
        if($validation.valid !== false) $validation.valid = validation.valid;
        $validation.properties[$contentKey] = validation;
        return $validation
      }, structuredClone(Validation)
    );
    return validation
  }
  validateProperty($key, $val) {
    const PropertyValidation = {
      key: $key,
      val: $val,
      advance: [], 
      deadvance: [], 
      unadvance: [], 
      valid: undefined, // Boolean
    };
    const propertyValidation = structuredClone(PropertyValidation);
    let validation;
    let contextVal;
    if(this.contextType === 'array') { contextVal = this.context[0]; }
    else if(this.contextType === 'object') { contextVal = this.context[$key]; }
    // Context Val: Undefined
    if(contextVal === undefined) {
      validation = new Validation({
        context: contextVal,
        contentKey: $key,
        contentVal: $val,
        type: 'key',
        valid: null,
      });
      propertyValidation.unadvance.push(validation);
      return propertyValidation
    }
    // Context Val: Object
    else if(contextVal instanceof Schema) {
      validation = contextVal.validate($val);
      // 
      if(validation.valid === true) { propertyValidation.advance.push(validation); }
      else if(validation.valid === false) { propertyValidation.deadvance.push(validation); }
      // 
      if(this.validationType === 'object') { propertyValidation.valid === validation.valid; }
      else if(this.validationType === 'primitive') {
        propertyValidation.valid = (validation.valid === false)
          ? !validation.valid
          : validation.valid; 
      }
    }
    // Context Val: Primitive
    else {
      validation = contextVal.validators.reduce(
        ($propertyValidation, $validator, $validatorIndex, $validators) => {
          const validation = $validator.validate(contextVal, $key, $val);
          // 
          if(validation.valid === true) { $propertyValidation.advance.push(validation); }
          else if(validation.valid === false) { $propertyValidation.deadvance.push(validation); }
          // 
          if($propertyValidation.valid !== false) $propertyValidation.valid = validation.valid;
          return $propertyValidation
        }, propertyValidation
      );
    }
    return propertyValidation
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
    // Undefined Schema
    if(schema === undefined) this.#_schema = undefined;
    // Existing Schema
    else if(schema instanceof Schema) {
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

class QuerySelector {
  #settings
  #_enable
  constructor($settings) {
    this.#settings = $settings;
  }
  get context() { return this.#settings.context }
  get method() { return this.#settings.method }
  get name() { return this.#settings.name }
  get selector() { return this.#settings.selector }
  get enable() { return this.#_enable }
  set enable($enable) {
    // Unable
    if($enable === this.#_enable) return
    // Enable
    if($enable === true) {
      const { context, name, method, selector } = this;
      Object.defineProperty(context.querySelectors, name, {
        enumerable: true,
        configurable: true,
        get() { return context.parent[method](selector) }
      });
    }
    // Disable
    else if($enable === false) {
      delete this.context.querySelectors[this.name];
    }
    this.#_enable = $enable;
  }
}

const Settings$2 = {
  templates: { default: () => `` },
  querySelectors: {},
  events: {},
};
const Options$2 = { enableQuerySelectors: true };
class View extends Core {
  #_parent
  #_template
  #_querySelectors = {}
  constructor($settings = {}, $options = {}) {
    super(
      Object.assign({}, Settings$2, $settings),
      Object.assign({}, Options$2, $options),
    );
    this.addQuerySelectors(this.settings.querySelectors);
  }
  get parent() { return this.settings.parent }
  get template() {
    if(this.#_template !== undefined) return this.#_template
    this.#_template = document.createElement('template');
    return this.#_template
  }
  get querySelectors() { return this.#_querySelectors }
  get qs() { return this.querySelectors }
  addQuerySelectors($queryMethods) {
    if($queryMethods === undefined) return this
    const { querySelectors } = this.settings;
    for(const [$queryMethod, $selectors] of Object.entries($queryMethods)) {
      for(const [$selectorName, $selector] of Object.entries($selectors)) {
        querySelectors[$queryMethod] = querySelectors[$queryMethod] || {};
        querySelectors[$queryMethod][$selectorName] = new QuerySelector({
          context: this,
          name: $selectorName,
          method: $queryMethod,
          selector: $selector,
          enable: false,
        });
      }
    }
    return this
  }
  removeQuerySelectors($queryMethods) {
    $queryMethods = $queryMethods || this.settings.querySelectors;
    for(const [
      $queryMethod, $selectors
    ] of Object.entries($queryMethods)) {
      for(const [
        $selectorName, $selector
      ] of Object.entries($selectors)) {
        if(this.settings.querySelectors[$queryMethod] !== undefined) {
          delete this.settings.querySelectors[$queryMethod][$selectorName];
        }
      }
    }
    return this
  }
  enableQuerySelectors($queryMethods) {
    $queryMethods = $queryMethods || this.settings.querySelectors;
    for(const $selectors of Object.values($queryMethods)) {
      for(const $selector of Object.values($selectors)) {
        $selector.enable = true;
      }
    }
    return this
  }
  disableQuerySelectors($queryMethods) {
    $queryMethods = $queryMethods || this.settings.querySelectors;
    for(const $selectors of Object.values($queryMethods)) {
      for(const $selector of Object.values($selectors)) {
        $selector.enable = false;
      }
    }
    return this
  }
  render($model, $template = 'default') {
    this.disableEvents();
    this.disableQuerySelectors();
    const preelement = this.element;
    this.template.innerHTML = this.settings.templates[$template]($model);
    this.element = this.template.content.childNodes;
    if(preelement?.length) {
      for(const $preelement of preelement) { $preelement.remove(); }
    }
    this.parent.append(...this.element);
    if(this.options.enableQuerySelectors === true) { this.enableQuerySelectors(); }
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
  constructor($settings = {}, $options = { enableEvents: true }) {
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

export { Content, Control, Core, FetchRouter, Model, Schema, StaticRouter, Validation, Validator, View };
//# sourceMappingURL=mvc-framework.js.map
