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

function GetProperty($content, $options) {
  const { radicle, root, basename, path } = $content;
  return function getProperty() {
    const { proxy } = $content;
    // Get Content Invocation
    if((
      // Unulteroptions
      arguments.length === 0
    ) || (
      // Ulteroptions
      arguments.length === 1 &&
      typeof arguments[0] === 'object'
    )) {
      ulteroptions.traps.accessor.get;
      return proxy
    }
    // Get Content Property Invocation
    else if((
      // Unulteroptions
      arguments.length === 1 &&
      typeof arguments[0] === 'string'
    ) || (
      // Ulteroptions
      arguments.length === 2 &&
      typeof arguments[0] === 'string' &&
      typeof arguments[1] === 'object'
    )) {
      // Arguments
      const $path = arguments[0];
      Object.assign(
        $options, arguments[1]?.traps?.accessor?.get || {}
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
}

function SetProperty($content, $options) {
  console.log(
    "\n", "------------",
    "\n", "Set Property",
    "\n", "------------",
  );
  const { radicle, root, basename, path } = $content;
  return function setProperty() {
    const { proxy } = $content;
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
    )) {
      // Arguments
      const $value = arguments[0];
      const ulteroptions = Object.assign({}, $options, arguments[1] || {});
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
          propertyValue = new Content(
            $propertyValue, { traps: { accessor: { set: ulteroptions } }}
          );
        }
        // Property Value: Primitive Literal
        else { propertyValue = $propertyValue; }
        // Radicle Property: Unmodified Value
        radicle[$propertyKey] = $propertyValue;
        // Root Property: Modified Value
        root[$propertyKey] = propertyValue;
      }
      // Return Proxy
      return proxy
    }
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
    )) {
      // Arguments
      const $path = arguments[0];
      const $value = arguments[1];
      // Ulteroptions
      const ulteroptions = Object.assign({}, $options, arguments[2] || {});
      const { recursive, events, pathkey, pathsep, pathesc } = ulteroptions;
      // Property Value
      let propertyValue;
      // Property Value: Content Instance
      if($value instanceof Content) {
        propertyValue = $value;
      }
      // Property Value: New Content Instance
      else if(typeof $value === 'object') {
        propertyValue = new Content(
          $value, { traps: { accessor: { set: arguments[1] } }}
        );
      }
      // Property Value: Primitive Literal
      else { propertyValue = $value; }
      // Path Key: true
      if(pathkey === true) {
        let path = $path.split(new RegExp(/\.(?=(?:[^"]*"[^"]*")*[^"]*$)/));
        const basename = path.pop();
        // Get Target
        let target = root;
        let targetIsRoot = true;
        let targetIsContent = false;
        for(const $subpath of path) {
          targetIsRoot = (target === root);
          targetIsContent = (target.eventTarget instanceof Content);
          // Target: Root
          if(targetIsRoot) {
            target = target[$subpath];
          }
          // Target: Content
          else if(targetIsContent) {
            target = target.get($subpath, ulteroptions);
          }
          // Recursive: true
          // Target: Undefined
          if(recursive && target === undefined) {
            // Target: New Content Instance
            const nextarget = new Content(propertyValue, $options);
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
        root[basename] = propertyValue;
      }
      // Return Property Value
      return propertyValue
    }
  }
}

function DeleteProperty($content, $options) {
  const { radicle, root, basename, path } = $content;
  return function deleteProperty() {
    // Delete Content Invocation
    if((
      // Unulteroptions
      arguments.length === 0
    ) || (
      // Ulteroptions
      arguments.length === 1 &&
      typeof arguments[0] === 'object'
    )) {
      // Arguments
      Object.assign(
        $options, arguments[1]?.traps?.accessor?.delete || {}
      );
      const rootPropertyEntries = Object.entries(root);
      for(const [$rootPropertyKey, $rootPropertyValue] of rootPropertyEntries) {
        if($rootPropertyValue instanceof Content) { $rootPropertyValue.delete(); }
        delete radicle[$rootPropertyKey];
        delete root[$rootPropertyKey];
      }
    }
    // Delete Content Property Invocation
    else if((
      // Unulteroptions
      arguments.length === 1
    ) || (
      // Ulteroptions
      arguments.length === 2 &&
      typeof arguments[1] === 'object'
    )) {
      Object.assign(
        $options, arguments[1]?.traps?.accessor?.delete || {}
      );
    }
  }
}

var AccessorProperty = {
  get: GetProperty,
  set: SetProperty,
  delete: DeleteProperty,
};

var PropertyClasses = {
  // Object: ObjectProperty,
  // Array: ArrayProperty,
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
  // Get Property
  get get() {
    const $this = this;
    const {
      // eventTarget, 
      root, 
      schema,
      basename,
      path,
    } = this.#content;
    const eventTarget = this.#content;
    return function get($target, $property, $receiver) {
      // --------------
      // Accessor Traps
      // --------------
      if($property === 'eventTarget') { return eventTarget }
      else if($property === 'root') { return root }
      else if(['get', 'set', 'delete'].includes($property)) {
        return $this.#traps['Accessor'][$property]
      }
      // ------------------------------------------
      // Event Target/Dynamic Event Target Property
      // ------------------------------------------
      else if(this.#isEventTargetOrContentProperty($property)) {
        if(typeof eventTarget[$property] === 'function') {
          return eventTarget[$property].bind(eventTarget)
        }
        return eventTarget[$property]
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
  /*
  // Set Property
  get set() {
    throw "MVC Framework - Handler SET"
    const $this = this
    const { schema } = this.#settings
    const { enableValidation, validationEvents } = schema.options
    return function set($target, $property, $value, $receiver) {
      if(this.#isObjectProperty($property)) {
        $this.#traps['Object'][$property] = $value
      }
      else if(this.#isArrayProperty($property)) {
        $this.#traps['Array'][$property] = $value
      }
      return true
    }
  }
  get deleteProperty() {
    throw "MVC Framework - Handler DELETE"
    return function deleteProperty($target, $property) { return true }
  }
  */
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
  traps: {
    accessor: {
      set: {
        pathkey: true,
        pathsep: '.',
        pathesc: '"',
        recursive: true,
        events: [
          'set',
          'setProperty'
        ],
      },
      delete: {
        pathkey: true,
        pathsep: '.',
        pathesc: '"',
        events: [
          'delete',
          'deleteProperty'
        ],
      },
    },
    object: {
      assign: {
        pathkey: true,
        pathsep: '.',
        pathesc: '"',
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
  #_radicle
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
    this.#_type = typeOf(this.settings);
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
  // Radicle
  get radicle() {
    if(this.#_radicle !== undefined) return this.#_radicle
    this.#_radicle = this.#typedObjectLiteral;
    return this.#_radicle
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
        const typeOfContentVal = typeOf($contentVal);
        const typeOfContextVal = ($context.type === undefined)
          ? $context.type
          : typeOf($context.type());
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

const Options$4 = {
  enableValidation: true,
  validationType: 'primitive', // 'object', 
  validationEvents: true,
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
    else if(typeOf(this.settings) === 'object') { this.#_contextType = 'object'; }
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
      else if(Object.keys(Objects).includes(typeOf(settings[$contextKey].type))) {
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
    // Existing Schema
    if(schema instanceof Schema) {
      this.#_schema = schema;
    }
    // New Schema
    else if(
      (Array.isArray(schema) && Array.isArray(content)) ||
      (typeOf(schema) === 'object' && typeOf(content) === 'object')
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
      schema instanceof Schema || typeOf(schema) === 'object'
    ) && typeOf(content) === 'object')) {
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
			else if(typeOf($model) === 'object') {
				_models[$modelName] = new Model($model);
			}
			else if(typeOf($model) === 'array') {
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
			else if(typeOf($view) === 'object') {
				_views[$viewName] = new View($view);
			}
			else if(typeOf($view) === 'array') {
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
			else if(typeOf($control) === 'object') {
				_controls[$controlName] = new Control($control);
			}
			else if(typeOf($control) === 'array') {
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
				else if(typeOf($router) === 'object') {
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
				else if(typeOf($router) === 'array') {
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
