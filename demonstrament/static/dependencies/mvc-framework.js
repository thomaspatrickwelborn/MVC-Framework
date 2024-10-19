const typeOf = ($data) => Object
	.prototype
	.toString
	.call($data).slice(8, -1).toLowerCase();

function expandEvents($propEvents) {
	if(Array.isArray($propEvents)) return $propEvents
	const propEvents = [];
	for(const [
		$propEventSettings, $propEventCallback
	] of Object.entries($propEvents)) {
		const propEventSettings = $propEventSettings.split(' ');
		let type, path;
		if(propEventSettings.length === 1) {
			path = ':scope';
			type = propEventSettings[0];
		} else if(propEventSettings.length > 1) {
			path = propEventSettings[0];
			type = propEventSettings[1];
		}
		const propEvent = {
			type,
			path,
			callback: $propEventCallback,
			enable: false,
		};
		propEvents.push(propEvent);
	}
	return propEvents
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

class CoreEvent {
  #settings
  #boundCallback
  #_enable = false
  constructor($settings) { 
    this.#settings = $settings;
  }
  get context() { return this.#settings.context }
  get type() { return this.#settings.type }
  get path() { return this.#settings.path }
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

var Settings$4 = {
  events: []
};

var Options$6 = {
  defineProperties: {},
  assignProperties: [],
};

class Core extends EventTarget {
  #_settings
  #_options
  #_events
  constructor($settings, $options) {
    super();
    this.settings = $settings;
    this.options = $options;
    this.#assignProperties();
    this.#defineProperties();
    this.addEvents(this.settings.events);
  }
  get settings() { return this.#_settings }
  set settings($settings) {
    if(this.#_settings !== undefined) return
    this.#_settings = Object.assign({}, Settings$4, $settings);
  }
  get options() { return this.#_options }
  set options($options) {
    if(this.#_options !== undefined) return
    this.#_options = Object.assign({}, Options$6, $options);
  }
  get events() {
    if(this.#_events !== undefined) return this.#_events
    this.#_events = [];
    return this.#_events
  }
  getEvents() {
    const getEvents = [];
    const { events } = this;
    if(arguments.length === 0) { return events }
    let $events = arguments[0];
    for(const $event of $events) {
      const { type, path, callback, enable } = $event;
      const eventFilterProperties = [];
      if(type !== undefined) { eventFilterProperties.push(['type', type]); }
      if(path !== undefined) { eventFilterProperties.push(['path', path]); }
      if(callback !== undefined) { eventFilterProperties.push(['callback', callback]); }
      if(enable !== undefined) { eventFilterProperties.push(['enable', enable]); }
      getEvents.push(
        ...events.filter(($existingEvent) => {
          return eventFilterProperties.reduce(($match, [
            $eventFilterPropertyKey, $eventFilterPropertyValue
          ]) => {
            const match = (
              $existingEvent[$eventFilterPropertyKey] === $eventFilterPropertyValue
            ) ? true : false;
            if($match !== false) { $match = match; }
            return $match
          }, undefined)
        })
      );
    }
    return getEvents
  }
  addEvents() {
    const { events } = this;
    let $events;
    if(arguments.length === 0) { $events = events; }
    else if(arguments.length === 1) { $events = expandEvents(arguments[0]); }
    for(const $event of $events) {
      Object.assign($event, { context: this });
      events.push(new CoreEvent($event));
    }
    return this
  }
  removeEvents() {
    const { events } = this;
    let $events;
    if(arguments.length === 0) { $events = events; }
    else if(arguments.length === 1) { $events = expandEvents(arguments[0]); }
    let eventsIndex = events.length - 1;
    while(eventsIndex > -1) {
      const event = events[eventsIndex];
      const removeEventIndex = $events.findIndex(
        ($event) => (
          $event.type === event.type &&
          $event.path === event.path &&
          $event.callback === event.callback
        )
      );
      if(removeEventIndex !== -1) events.splice(eventsIndex, 1);
      eventsIndex--;
    }
    return this
  }
  enableEvents() {
    let $events;
    if(arguments.length === 0) { $events = this.events; }
    else { $events = arguments[0]; }
    return this.#toggleEventAbility('addEventListener', $events)
  }
  disableEvents() {
    let $events;
    if(arguments.length === 0) { $events = this.events; }
    else { $events = arguments[0]; }
    return this.#toggleEventAbility('removeEventListener', $events)
  }
  #assignProperties() {
    for(const $propertyName of this.options.assignProperties) {
      const propertyValue = this.settings[$propertyName];
      Object.assign(this, { [$propertyName]: propertyValue });
    }
  }
  #defineProperties() {
    for(const [
      $propertyName, $propertyDescriptor
    ] of Object.entries(this.options.defineProperties)) {
      $propertyDescriptor.value = this.settings[$propertyName];
      Object.defineProperty(this, $propertyName, $propertyDescriptor);
    }
  }
  #toggleEventAbility($eventListenerMethod, $events) {
    let enability;
    if($eventListenerMethod === 'addEventListener') { enability = true; }
    else if($eventListenerMethod === 'removeEventListener') { enability = false; }
    else { return this }
    for(const $event of $events) {
      $event.enable = enability;
    }
    return this
  }
}

class ContentEvent extends Event {
  #settings
  #content
  constructor($type, $settings, $content) {
    super($type);
    this.#settings = $settings;
    this.#content = $content;
    this.#content.addEventListener(
      $type, 
      ($event) => {
        if(this.#content.parent !== null) {
          this.#content.parent.dispatchEvent(
            new ContentEvent(
              this.type, 
              {
                basename: $event.basename,
                path: $event.path,
                detail: $event.detail,
              },
              this.#content.parent
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
  #content
  constructor($type, $settings, $content) {
    super($type);
    this.#settings = $settings;
    this.#content = $content;
    this.#content.addEventListener(
      $type, 
      ($event) => {
        if(this.#content.parent !== null) {
          this.#content.parent.dispatchEvent(
            new ValidatorEvent(
              this.type, 
              {
                basename: $event.basename,
                path: $event.path,
                detail: $event.detail,
                results: $event.results,
              },
              this.#content.parent
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

function assign() {
  const $content = Array.prototype.shift.call(arguments);
  const $options = Array.prototype.shift.call(arguments);
  const { recursive, events } = $options;
  const { basename, path, root, schema } = $content;
  const { enableValidation, validationEvents, contentEvents } = $content.options;
  const { proxy } = $content;
  const sources = [...arguments];
  const assignedSources = [];
  // Iterate Sources
  for(let $source of sources) {
    let assignedSource;
    if(Array.isArray($source)) { assignedSource = []; }
    else if(typeof $source === 'object') { assignedSource = {}; }
    // Iterate Source Props
    iterateSourceProps:
    for(let [$sourcePropKey, $sourcePropVal] of Object.entries($source)) {
      const _basename = $sourcePropKey;
      const _path = (path !== null)
        ? path.concat('.', _basename)
        : _basename;
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
      // Assign Root Content Property
      // Source Prop: Object Type
      if(isDirectInstanceOf($sourcePropVal, [Object, Array/*, Map*/])) {
        let subschema;
        switch(schema.contextType) {
          case 'array': subschema = schema.context[0]; break
          case 'object': subschema = schema.context[$sourcePropKey]; break
          default: subschema = undefined;
        }
        // Assign Root Content Property: Existent
        if(root[$sourcePropKey]?.constructor.name === 'bound Content') {
          // Assign Root
          root[$sourcePropKey].assign($sourcePropVal);
          // Assigned Source
          Object.assign(assignedSource, {
            [$sourcePropKey]: $sourcePropVal
          });
        }
        // Assign Root Content Property: Non-Existent
        else {
          const contentObject = new Content($sourcePropVal, subschema, Object.assign({
            basename: _basename,
            parent: proxy,
            path: _path,
          }, $options));
          // Assign Root
          Object.assign(root, {
            [$sourcePropKey]: contentObject
          });
          // Assigned Source
          Object.assign(assignedSource, {
            [$sourcePropKey]: contentObject
          });
        }
      }
      // Source Prop: Primitive Type
      else {
        // Assign Root
        Object.assign(root, {
          [$sourcePropKey]: $sourcePropVal
        });
        // Assigned Source
        Object.assign(assignedSource, {
          [$sourcePropKey]: $sourcePropVal
        });
      }
      // Assign Source Property Event
      if(contentEvents && events.includes('assignSourceProperty')) {
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
    assignedSources.push(assignedSource);
    // Assign Source Event
    if(contentEvents && events.includes('assignSource')) {
      $content.dispatchEvent(
        new ContentEvent('assignSource', {
          basename,
          path,
          detail: {
            source: assignedSource,
          },
        }, $content)
      );
    }
  }
  // Assign Event
  if(contentEvents && events.includes('assign')) {
    $content.dispatchEvent(
      new ContentEvent('assign', { 
        basename,
        path,
        detail: {
          assignedSources
        },
      }, $content)
    );
  }
  return proxy
}

function defineProperties() {
  const $content = Array.prototype.shift.call(arguments);
  const $options = Array.prototype.shift.call(arguments);
  const { events } = $options;
  const { root, rootAlias, basename, path, schema } = $content;
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
  if(contentEvents && events.includes('defineProperties')) {
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

function defineProperty() {
  const $content = Array.prototype.shift.call(arguments);
  const $options = Array.prototype.shift.call(arguments);
  const { descriptorValueMerge, descriptorTree, events } = $options;
  const { root, basename, path, schema } = $content;
  const { enableValidation, validationEvents, contentEvents } = $content.options;
  const { proxy } = $content;
  const propertyKey = arguments[0];
  const propertyDescriptor = arguments[1];
  const _basename = propertyKey;
  const _path = (
    path !== null
  ) ? path.concat('.', propertyKey)
    : propertyKey;
  // Validation
  if(schema && enableValidation) {
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
      default: subschema = undefined; break
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
          _root, subschema, {
            basename: _basename,
            parent: proxy,
            path: _path,
            rootAlias,
          }
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
  if(contentEvents && events.includes('defineProperty')) {
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
  return proxy
}

function freeze() {
  const $content = Array.prototype.shift.call(arguments);
  const $options = Array.prototype.shift.call(arguments);
  const { recurse, events } = $options;
  const { root, basename, path } = $content;
  const { proxy } = $content;
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
      if(contentEvents && events.includes('freeze')) {
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
  return proxy
}

function seal() {
  const $content = Array.prototype.shift.call(arguments);
  const $options = Array.prototype.shift.call(arguments);
  const { recurse, events } = $options;
  const { proxy } = $content;
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
      if(contentEvents && events.includes('seal')) {
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
  return proxy
}

var ObjectProperty = {
  assign,
  defineProperties,
  defineProperty,
  freeze,
  seal,
};

function copyWithin() {
  const $content = Array.prototype.shift.call(arguments);
  const $options = Array.prototype.shift.call(arguments);
  const { events } = $options;
  const { root, basename, path } = $content;
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
    if(contentEvents && events.includes('copyWithinIndex')) {
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
  if(contentEvents && events.includes('copyWithin')) {
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

function concat() {
  const $content = Array.prototype.shift.call(arguments);
  const $options = Array.prototype.shift.call(arguments);
  const { events } = $options;
  const { root, basename, path, schema } = $content;
  const { enableValidation, validationEvents, contentEvents } = $content.options;
  const { proxy } = $content;
  const $arguments = [...arguments];
  let valuesIndex = 0;
  let subvaluesIndex = 0;
  const values = [];
  let rootconcat = root;
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
      for(const $subvalue of $value) {
        // Validation: Subvalue
        if(schema && enableValidation) {
          const validSubvalue = schema.validate($subvalue);
          if(schema && validationEvents) {
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
          let subschema = schema?.context[0] || null;
          const subvalue = new Content($subvalue, subschema, {
            basename: _basename,
            parent: proxy,
            path: _path,
          });
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
      if(schema && enableValidation) {
        const validValue = schema.validateProperty(valuesIndex, $subvalue);
        if(schema &&validationEvents) {
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
        let subschema = schema?.context[0] || null;
        const value = new Content($value, subschema, {
          basename: _basename,
          parent: proxy,
          path: _path,
        });
        values[valuesIndex] = value;
      }
      // Value: Primitives
      else {
        values[valuesIndex] = $value;
      }
    }
    rootconcat = Array.prototype.concat.call(root, values[valuesIndex]);
    if(contentEvents && events.includes('concatValue')) {
      if(validationEvents) {
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
  if(contentEvents && events.includes('concat')) {
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
  return rootconcat
}

function fill() {
  const $content = Array.prototype.shift.call(arguments);
  const $options = Array.prototype.shift.call(arguments);
  const { events } = $options;
  const { root, basename, path, schema } = $content;
  const { enableValidation, validationEvents, contentEvents } = $content.options;
  const { proxy } = $content;
  const $arguments = [...arguments];
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
  iterateFillIndexes: 
  while(
    fillIndex < root.length &&
    fillIndex < end
  ) {
    const _basename = fillIndex;
    const _path = (
      path !== null
    ) ? path.concat('.', fillIndex)
      : fillIndex;
    
    if(schema && enableValidation) {
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
      if(!validValue.valid) { continue iterateFillIndexes }
    }
    let value = $arguments[0];
    if(isDirectInstanceOf(
      value, [Object, Array]
    )) {
      const subschema = schema?.context[0] || null;
      value = new Content(value, subschema, {
        basename: _basename,
        path: _path,
        parent: proxy,
      });
    }
    Array.prototype.fill.call(
      root, value, fillIndex, fillIndex + 1
    );
    // Array Fill Index Event
    if(contentEvents && events.includes('fillIndex')) {
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
  if(contentEvents && events.includes('fill')) {
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
  return proxy
}

function pop() {
  const $content = Array.prototype.shift.call(arguments);
  const $options = Array.prototype.shift.call(arguments);
  const { events } = $options;
  const { root, basename, path } = $content;
  const popElement = Array.prototype.pop.call(root);
  const popElementIndex = root.length - 1;
  const _basename = popElementIndex;
  const _path = (
    path !== null
  ) ? path.concat('.', popElementIndex)
    : popElementIndex;
  // Array Pop Event
  if(contentEvents && events.includes('pop')) {
    $content.dispatchEvent(
      new ContentEvent(
        'pop',
        {
          _basename,
          _path,
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

function push() {
  const $content = Array.prototype.shift.call(arguments);
  const $options = Array.prototype.shift.call(arguments);
  const { events } = $options;
  const { root, basename, path, schema } = $content;
  const { enableValidation, validationEvents, contentEvents } = $content.options;
  const { proxy } = $content;
  const elements = [];
  let elementsIndex = 0;
  for(let $element of arguments) {
    const _basename = elementsIndex;
    const _path = (path !== null)
      ? path.concat('.', elementsIndex)
      : elementsIndex;
    // Validation
    if(schema && enableValidation) {
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
    const subschema = schema?.context[0] || null;
      $element = new Content($element, subschema, {
        basename: _basename,
        path: _path,
        parent: proxy,
      });
      elements.push($element);
      Array.prototype.push.call(root, $element);
    } else {
      elements.push($element);
      Array.prototype.push.call(root, $element);
    }
    if(contentEvents && events.includes('pushProp')) {
      $content.dispatchEvent(
        new ContentEvent('pushProp', {
          basename: _basename,
          path: _path,
          detail: {
            elementsIndex,
            element: elements[elementsIndex],
          },
        }, $content)
      );
    }
    elementsIndex++;
  }
  // Push Event
  if(contentEvents && events.includes('push')) {
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

function reverse() {
  const $content = Array.prototype.shift.call(arguments);
  const $options = Array.prototype.shift.call(arguments);
  const { events } = $options;
  const { root, basename, path } = $content;
  const { proxy } = $content;
  Array.prototype.reverse.call(root, ...arguments);
  if(contentEvents && events.includes('reverse')) {
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
  return proxy
}

function shift() {
  const $content = Array.prototype.shift.call(arguments);
  const $options = Array.prototype.shift.call(arguments);
  const { events } = $options;
  const { root, basename, path } = $content;
  const shiftElement = Array.prototype.shift.call(root);
  const shiftElementIndex = 0;
  const _basename = shiftElementIndex;
  const _path = (
    path !== null
  ) ? path.concat('.', shiftElementIndex)
    : shiftElementIndex;
  // Array Shift Event
  if(contentEvents && events.includes('shift')) {
    $content.dispatchEvent(
      new ContentEvent(
        'shift',
        {
          basename: _basename,
          path: _path,
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

function splice() {
  const $content = Array.prototype.shift.call(arguments);
  const $options = Array.prototype.shift.call(arguments);
  const { events } = $options;
  const { root, basename,path, schema } = $content;
  const { enableValidation, validationEvents, contentEvents } = $content.options;
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
    if(contentEvents && events.includes('spliceDelete')) {
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
    if(schema && enableValidation) {
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
      const subschema = schema?.context[0] || null;
      addItem = new Content(addItem, subschema, {
        basename: _basename,
        path: _path,
        parent: proxy,
      });
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
    if(contentEvents && events.includes('spliceAdd')) {
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
  if(contentEvents && events.includes('splice')) {
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

function unshift() {
  const $content = Array.prototype.shift.call(arguments);
  const $options = Array.prototype.shift.call(arguments);
  const $arguments = [...arguments];
  const { events } = $options;
  const { root, basename, path, schema } = $content;
  const { enableValidation, validationEvents, contentEvents } = $content.options;
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
    if(schema && enableValidation) {
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
      const subschema = schema?.context[0] || null;
      element = new Content(element, subschema, {
        basename: _basename,
        path: _path,
        parent: proxy,
      });
      elements.unshift(element);
      Array.prototype.unshift.call(root, element);
    }
    else {
      elements.unshift(element);
      Array.prototype.unshift.call(root, element);
    }
    // Array Unshift Prop Event
    if(contentEvents && events.includes('unshiftProp')) {
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
  if(contentEvents && events.includes('unshift') && elements.length) {
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

var ArrayProperty = {
  copyWithin: copyWithin,
  concat: concat,
  fill: fill,
  pop: pop,
  push: push,
  reverse: reverse,
  shift: shift,
  splice: splice,
  unshift: unshift,
};

function getContent() {
  const $content = Array.prototype.shift.call(arguments);
  const $options = Array.prototype.shift.call(arguments);
  const { root, basename, path } = $content;
  const { contentEvents } = $content.options;
  const ulteroptions = Object.assign({}, $options, arguments[0] || {});
  const { events } = ulteroptions;
  // Get Property Event
  if(contentEvents && events.includes('get')) {
    $content.dispatchEvent(
      new ContentEvent('get', {
        basename,
        path,
        detail: {
          value: proxy
        }
      }, $content)
    );
  }
  return proxy
}

function getContentProperty() {
  const $content = Array.prototype.shift.call(arguments);
  const $options = Array.prototype.shift.call(arguments);
  const { root, basename, path } = $content;
  const { contentEvents } = $content.options;
  // Arguments
  const $path = arguments[0];
  const ulteroptions = Object.assign({}, $options, arguments[1]);
  const { events, pathkey } = ulteroptions;
  // Path Key: true
  if(pathkey === true) {
    const subpaths = $path.split(new RegExp(/\.(?=(?:[^"]*"[^"]*")*[^"]*$)/));
    const propertyKey = subpaths.shift();
    let propertyValue = root[propertyKey];
    if(subpaths.length) {
      return propertyValue.get(subpaths.join('.'), ulteroptions)
    }
    const _basename = propertyKey;
    const _path = (path !== null)
      ? path.concat('.', _basename)
      : _basename;
    // Delete Property Event
    if(contentEvents && events.includes('deleteProperty')) {
      $content.dispatchEvent(
        new ContentEvent('deleteProperty', {
          basename: _basename,
          path: _path,
          detail: {
            key: propertyKey,
            val: propertyValue,
          }
        }, $content)
      );
    }
    return propertyValue
  }
}

function getProperty() {
  const defaultArgumentsLength = 2;
  // -----------------------------
  // Get Content Method Invocation
  // -----------------------------
  if((
    // Unulteroptions
    arguments.length === 0 + defaultArgumentsLength
  ) || (
    // Ulteroptions
    arguments.length === 1 + defaultArgumentsLength &&
    typeof arguments[0 + defaultArgumentsLength] === 'object'
  )) { return getContent(...arguments) }
  // --------------------------------------
  // Get Content Property Method Invocation
  // --------------------------------------
  else if((
    // Unulteroptions
    arguments.length === 1 + defaultArgumentsLength &&
    typeof arguments[0 + defaultArgumentsLength] === 'string'
  ) || (
    // Ulteroptions
    arguments.length === 2 + defaultArgumentsLength &&
    typeof arguments[0 + defaultArgumentsLength] === 'string' &&
    typeof arguments[1 + defaultArgumentsLength] === 'object'
  )) { return getContentProperty(...arguments) }
}

function setContent() {
  const $content = Array.prototype.shift.call(arguments);
  const $options = Array.prototype.shift.call(arguments);
  const { basename, path } = $content;
  const { contentEvents } = $content.options;
  const { proxy } = $content;
  // Delete Preterproperties
  proxy.delete();
  // Arguments
  const $value = arguments[0];
  // Ulteroptions
  const ulteroptions = Object.assign({}, $options, arguments[1]);
  const contentOptions = $content.options;
  contentOptions.traps.accessor.set = ulteroptions;
  const { events } = ulteroptions;
  // Set Anterproperties
  const properties = Object.entries($value);
  for(const [$propertyKey, $propertyValue] of properties) {
    proxy.set($propertyKey, $propertyValue, ulteroptions);
  }
  // Set Property Event
  if(contentEvents && events.includes('set')) {
    $content.dispatchEvent(
      new ContentEvent('set', {
        basename,
        path,
        detail: {
          value: $value
        }
      }, $content)
    );
  }
  // Return Proxy
  return proxy
}

function setContentProperty() {
  const $content = Array.prototype.shift.call(arguments);
  const $options = Array.prototype.shift.call(arguments);
  const { root, basename, path, schema } = $content;
  const { enableValidation, validationEvents, contentEvents } = $content.options;
  const { proxy } = $content;
  // Arguments
  const $path = arguments[0];
  const $value = arguments[1];
  // Options
  const ulteroptions = Object.assign(
    {}, $options, arguments[2]
  );
  const contentOptions = $content.options;
  contentOptions.traps.accessor.set = ulteroptions;
  const { recursive, events, pathkey } = ulteroptions;
  // Path Key: true
  if(pathkey === true) {
    // Subpaths
    const subpaths = $path.split(new RegExp(/\.(?=(?:[^"]*"[^"]*")*[^"]*$)/));
    // Property Key
    const propertyKey = subpaths.shift();
    // Property Value
    let propertyValue;
    const _basename = propertyKey;
    const _path = (path !== null)
      ? String(path).concat('.', _basename)
      : _basename;
    // Return: Subproperty
    if(subpaths.length) {
      propertyValue = root[propertyKey];
      // Recursive: True
      // Property Value: Undefined
      if(recursive && !propertyValue) {
        // Subschema
        let subschema;
        if(schema?.contextType === 'array') { subschema = schema.context[0]; }
        else if(schema?.contextType === 'object') { subschema = schema.context[propertyKey]; }
        else { subschema = undefined; }
        // Subcontent
        let subcontent;
        if(subschema?.contextType === 'array') { subcontent = []; }
        else if(subschema?.contextType === 'object') { subcontent = {}; }
        else {
          if(Number(propertyKey)) { subcontent = []; }
          else { subcontent = {}; }
        }
        propertyValue = new Content(subcontent, subschema, Object.assign({}, contentOptions, {
          basename: _basename,
          path: _path,
          parent: proxy,
        }));
      }
      return propertyValue.set(subpaths.join('.'), $value, ulteroptions)
    }
    // Validation
    if(schema && enableValidation) {
      const validSourceProp = schema.validateProperty(propertyKey, $value);
      if(validationEvents) {
        $content.dispatchEvent(
          new ValidatorEvent$1('validateProperty', {
            basename: _basename,
            path: _path,
            detail: validSourceProp,
          }, $content)
        );
      }
      if(!validSourceProp.valid) { return }
    }
    // Return: Property
    // Value: Content
    if($value instanceof Content) {
      propertyValue = $value;
    }
    // Value: Object Literal
    else if(typeof $value === 'object') {
      let subschema;
      if(schema?.contextType === 'array') { subschema = schema.context[0]; }
      else if(schema?.contextType === 'object') { subschema = schema.context[propertyKey]; }
      else { subschema = undefined; }
      propertyValue = new Content($value, subschema, Object.assign(
        {}, contentOptions, {
          basename: _basename,
          path: _path,
          parent: proxy,
        }
      ));
    }
    // Value: Primitive Literal
    else {
      propertyValue = $value;
    }
    // Set Property Event
    if(contentEvents && events.includes('setProperty')) {
      $content.dispatchEvent(
        new ContentEvent('setProperty', {
          basename: _basename,
          path: _path,
          detail: {
            key: propertyKey,
            value: propertyValue,
          }
        }, $content)
      );
    }
    // Root Assignment
    root[propertyKey] = propertyValue;
    // Return Property Value
    return propertyValue
  }
  // Path Key: false
  else if(pathkey === false) {
    let propertyKey = $path;
    const _basename = propertyKey;
    const _path = (path !== null)
      ? path.concat('.', _basename)
      : _basename;
    // Property Value: Content Instance
    if($value instanceof Content) {
      propertyValue = $value;
    }
    // Property Value: New Content Instance
    else if(typeof $value === 'object') {
      let subschema;
      if(schema?.contextType === 'array') { subschema = schema.context[0]; }
      if(schema?.contextType === 'object') { subschema = schema.context[propertyKey]; }
      else { subschema = undefined; }
      propertyValue = new Content($value, subschema, Object.assign(
        {}, contentOptions, {
          basename: _basename,
          path: _path,
          parent: proxy,
        }
      ));
    }
    // Property Value: Primitive Literal
    else { propertyValue = $value; }
    // Root Assignment
    root[propertyKey] = propertyValue;
    // Set Property Event
    if(contentEvents && events.includes('setProperty')) {
      $content.dispatchEvent(
        new ContentEvent('setProperty', {
          basename: _basename,
          path: _path,
          detail: {
            key: propertyKey,
            value: propertyValue,
          }
        }, $content)
      );
    }
    // Return Property Value
    return propertyValue
  }
}

function setProperty() {
  const defaultArgumentsLength = 2;
  // -----------------------------
  // Set Content Method Invocation
  // -----------------------------
  if((
    // Unulteroptions
    arguments.length === (1 + defaultArgumentsLength) &&
    typeof arguments[(0 + defaultArgumentsLength)] === 'object'
  ) || (
    // Ulteroptions
    arguments.length === (2 + defaultArgumentsLength) &&
    typeof arguments[(0 + defaultArgumentsLength)] === 'object' &&
    typeof arguments[(1 + defaultArgumentsLength)] === 'object'
  )) { return setContent(...arguments) }
  // --------------------------------------
  // Set Content Property Method Invocation
  // --------------------------------------
  else if((
    // Unulteroptions
    arguments.length === (2 + defaultArgumentsLength) &&
    typeof arguments[(0 + defaultArgumentsLength)] === 'string'
  ) || (
    // Ulteroptions
    arguments.length === (3 + defaultArgumentsLength) &&
    typeof arguments[(0 + defaultArgumentsLength)] === 'string' &&
    typeof arguments[(2 + defaultArgumentsLength)] === 'object'
  )) { return setContentProperty(...arguments) }
}

function deleteContent() {
  const $content = Array.prototype.shift.call(arguments);
  const $options = Array.prototype.shift.call(arguments);
  const { root, basename, path } = $content;
  const { contentEvents } = $content.options;
  const { proxy } = $content;
  // Arguments
  const ulteroptions = Object.assign({}, $options, arguments[0]);
  const { events } = ulteroptions;
  const rootPropertyEntries = Object.entries(root);
  for(const [$rootPropertyKey, $rootPropertyValue] of rootPropertyEntries) {
    proxy.delete($rootPropertyKey, ulteroptions);
  }
  // Delete Property Event
  if(contentEvents && events?.includes('delete')) {
    $content.dispatchEvent(
      new ContentEvent('delete', {
        basename,
        path,
        detail: {
          value: proxy
        }
      }, $content)
    );
  }
  return proxy
}

function deleteContentProperty() {
  const $content = Array.prototype.shift.call(arguments);
  const $options = Array.prototype.shift.call(arguments);
  const { root, basename, path } = $content;
  const { contentEvents } = $content.options;
  // Arguments
  const $path = arguments[0];
  const ulteroptions = Object.assign({}, $options, arguments[1]);
  const { events, pathkey } = ulteroptions;
  // Path Key: true
  if(pathkey === true) {
    const subpaths = $path.split(new RegExp(/\.(?=(?:[^"]*"[^"]*")*[^"]*$)/));
    const propertyKey = subpaths.shift();
    let propertyValue = root[propertyKey];

    if(subpaths.length) {
      return propertyValue.delete(subpaths.join('.'), ulteroptions)
    }
    const _basename = propertyKey;
    const _path = (path !== null)
      ? path.concat('.', _basename)
      : _basename;
    if(typeof propertyValue === 'object') {
      propertyValue.delete(ulteroptions);
    }
    delete root[propertyKey];
    // Delete Property Event
    if(contentEvents && events.includes('deleteProperty')) {
      $content.dispatchEvent(
        new ContentEvent('deleteProperty', {
          basename: _basename,
          path: _path,
          detail: {
            key: propertyKey,
            val: propertyValue,
          }
        }, $content)
      );
    }
    return undefined
  }
  // Path Key: false
  else if(pathkey === false) {
    const propertyKey = $path;
    const propertyValue = root[propertyKey];
    const _basename = propertyKey;
    const _path = (path !== null)
      ? path.concat('.', _basename)
      : _basename;
    if(propertyValue instanceof Content) {
      propertyValue.delete(ulteroptions);
    }
    delete root[propertyKey];
    // Delete Property Event
    if(contentEvents && events.includes('deleteProperty')) {
      $content.dispatchEvent(
        new ContentEvent('deleteProperty', {
          basename: _basename,
          path: _path,
          detail: {
            key: propertyKey,
            val: propertyValue,
          }
        }, $content)
      );
    }
    return undefined
  }
}

function deleteProperty() {
  const defaultArgumentsLength = 2;
  // --------------------------------
  // Delete Content Method Invocation
  // --------------------------------
  if((
    // Unulteroptions
    arguments.length === 0 + defaultArgumentsLength
  ) || (
    // Ulteroptions
    arguments.length === 1 + defaultArgumentsLength &&
    typeof arguments[0 + defaultArgumentsLength] === 'object'
  )) { return deleteContent(...arguments) }
  // -----------------------------------------
  // Delete Content Property Method Invocation
  // -----------------------------------------
  else if((
    // Unulteroptions
    arguments.length === 1 + defaultArgumentsLength &&
    typeof arguments[0 + defaultArgumentsLength] === 'string'
  ) || (
    // Ulteroptions
    arguments.length === 2 &&
    typeof arguments[0 + defaultArgumentsLength] === 'string' &&
    typeof arguments[1 + defaultArgumentsLength] === 'object'
  )) { return deleteContentProperty(...arguments) }
}

var AccessorProperty = {
  get: getProperty,
  set: setProperty,
  delete: deleteProperty,
};

var PropertyClasses = {
  Object: ObjectProperty,
  Array: ArrayProperty,
  Accessor: AccessorProperty,
};

var PropertyClassDefaultMethods = {
  Object: {
    Call: {
      Keys: [
        'entries', 'fromEntries', 'getOwnPropertyDescriptors', 
        'getOwnPropertyNames', 'getOwnPropertySymbols', 
        'getPrototypeOf', 'isExtensible', 'isFrozen', 'isSealed', 
        'keys', 'preventExtensions', 'values',
      ],
      Method: function createObjectMethod() {
        return function() {
          const $content = Array.prototype.shift.call(arguments);
          Array.prototype.shift.call(arguments);
          const { root } = $content;
          return Array.prototype.entries.call(root)
        }
      }
    },
    CallArguments: {
      Keys: [
        'getOwnPropertyDescriptor', 'groupBy', 'hasOwn', 'hasOwnProperty', 
        'is', 'isPrototypeOf', 'propertyIsEnumerable', 'toLocaleString', 
        'toString', 'valueOf', 
      ],
      Method: function createObjectMethod($methodName) {
        return function() {
          const $content = Array.prototype.shift.call(arguments);
          Array.prototype.shift.call(arguments);
          const { root } = $content;
          return Object.getOwnPropertyDescriptor(root, ...arguments)
        }
      }
    }
  },
  Array: {
    Call: {
      Keys: [
        'entries','isArray','join','keys','lastIndexOf','of','pop',
        'shift','values',
      ],
      Method: function createArrayMethod($methodName) {
        return function() {
          const $content = Array.prototype.shift.call(arguments);
          Array.prototype.shift.call(arguments);
          const { root } = $content;
          return Array.prototype[$methodName].call(root)
        }
      }
    },
    CallArguments: {
      Keys: [
        'at', 'every', 'filter', 'find', 'findIndex', 'findLast',
        'findLastIndex', 'flat', 'flatMap', 'forEach', 'from', 'fromAsync',
        'includes', 'indexOf', 'map', 'reduce', 'reduceRight', 'reverse',
        'slice', 'some', 'sort', 'toLocaleString', 'toReversed', 'toSorted',
        'toSpliced', 'toString', 'with', 
      ],
      Method: function createArrayMethod($methodName) {
        return function() {
          const $content = Array.prototype.shift.call(arguments);
          Array.prototype.shift.call(arguments);
          const { root } = $content;
          return Array.prototype[$methodName].call(root, ...arguments)
        }
      }
    }
  }
};

class Traps {
  Object = {}
  Array = {}
  Accessor = {}
  constructor($content) {
    // Iterate Property Classes
    for(let [
      PropertyClassName, PropertyClassMethods
    ] of Object.entries(PropertyClasses)) {
      // Property Class Trap
      const propertyClassTrap = this[PropertyClassName];
      const propertyClassTrapOptions = $content.options.traps[
        PropertyClassName.toLowerCase()
      ];
      const propertyClassDefaultTrap = PropertyClassDefaultMethods[PropertyClassName];
      const propertyClassTrapKeys = Object.keys(propertyClassTrapOptions);
      // Iterate Property Class Methods
      for(let [
        $methodName, $method
      ] of Object.entries(PropertyClassMethods)) {
        // Property Class Method: Trap
        if(propertyClassTrapKeys.includes($methodName)) {
          const methodOptions = propertyClassTrapOptions[$methodName] || {};
          const methodBindContent = $method.bind(null, $content, methodOptions);
          Object.defineProperty(propertyClassTrap, $methodName, {
            value: methodBindContent
          });
        }
        // Property Class Method: Default Trap Call
        else if(propertyClassDefaultTrap.Call.Keys.includes($methodName))  {
          Object.defineProperty(propertyClassTrap, $methodName, {
            value: propertyClassDefaultTrap.Call.Method($methodName)
          }); 
        }
        // Property Class Method: Default Trap Call Arguments
        else if(propertyClassDefaultTrap.CallArguments.Keys.includes($methodName)) {
          Object.defineProperty(propertyClassTrap, $methodName, {
            value: propertyClassDefaultTrap.CallArguments.Method($methodName)
          }); 
        }
      }
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
  contentEvents: true,
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
  #_schema
  #_type
  #_root
  #_parent
  #_basename
  #_path
  #_proxy
  #_handler
  constructor($settings = {}, $schema = null, $options = {}) {
    super();
    this.settings = $settings;
    this.options = Object.assign({}, Options$5, $options);
    this.schema = $schema;
    return this.proxy
  }
  get schema() { return this.#_schema }
  set schema($schema) {
    if(this.#_schema !== undefined) return
    if($schema === undefined) { this.#_schema = null; }
    else if($schema instanceof Schema) { this.#_schema = $schema; }
    else if(typeof $schema === 'object') {
      if(Array.isArray($schema)) { new Schema(...arguments); }
      else { new Schema($schema); }
    }
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
  get typedObjectLiteral() {
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
    this.#_root = this.typedObjectLiteral;
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

var Settings$3 = {
  schema: undefined,
  content: undefined,
};

var Options$3 = {
  localStorage: undefined, // String
  schema: undefined, // Schema
  content: undefined, // Content
};

class Model extends Core {
  #_schema
  #_content
	constructor($settings = {}, $options = {}) {
		super(
      Object.assign({}, Settings$3, $settings), 
      Object.assign({}, Options$3, $options),
    );
    if(this.options.enableEvents === true) this.enableEvents();
	}
  get schema() {
    if(this.#_schema !== undefined) return this.#_schema
    const { schema, content } = this.settings;
    // No Schema
    if(!schema) { this.#_schema = null; }
    // Existing Schema
    else if(schema instanceof Schema) { this.#_schema = schema; }
    // New Schema
    else {
      this.#_schema = new Schema(
        schema, this.options.schema
      );
    }
    return this.#_schema
  }
  get content() {
    if(this.#_content !== undefined) return this.#_content
    let { content } = this.settings;
    this.#_content = new Content(content, this.schema, this.options.content);
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

var Settings$2 = {
  templates: { default: () => `` },
  querySelectors: {},
  events: {},
};

var Options$2 = {
  enableQuerySelectors: true
};

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
class LocationRouter extends Core {
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

var Settings = {
  models: {},
  views: {},
  controls: {},
  routers: {
    fetch: {},
    location: {},
  },
  events: {},
};

var Options = {
  enableEvents: true
};

class Control extends Core {
	#_models = {}
	#_views = {}
	#_controls = {}
	#_routers = {
		location: {},
		fetch: {},
	}
	constructor($settings = {}, $options = {}) {
		super(
			Object.assign({}, Settings, $settings),
			Object.assign({}, Options, $options),
		);
		this.addClassInstances($settings);
		if(this.options.enableEvents === true) this.enableEvents();
	}
	get models() { return this.#_models }
	set models($models) {
		const models = this.models;
		for(const [
			$modelName, $model
		] of Object.entries($models)) {
			if($model instanceof Model) {
				models[$modelName] = $model;
			}
			else if(typeOf($model) === 'object') {
				models[$modelName] = new Model($model);
			}
			else if(typeOf($model) === 'array') {
				models[$modelName] = new Model(...$model);
			}
		}
	}
	get views() { return this.#_views }
	set views($views) {
		const views = this.views;
		for(const [
			$viewName, $view
		] of Object.entries($views)) {
			if($view instanceof View) {
				views[$viewName] = $view;
			}
			else if(typeOf($view) === 'object') {
				views[$viewName] = new View($view);
			}
			else if(typeOf($view) === 'array') {
				views[$viewName] = new View(...$view);
			}
		}
	}
	get controls() { return this.#_controls }
	set controls($controls) {
		const controls = this.controls;
		for(const [
			$controlName, $control
		] of Object.entries($controls)) {
			if($control instanceof Control) {
				controls[$controlName] = $control;
			}
			else if(typeOf($control) === 'object') {
				controls[$controlName] = new Control($control);
			}
			else if(typeOf($control) === 'array') {
				controls[$controlName] = new Control(...$control);
			}
		}
	}
	get routers() { return this.#_routers }
	set routers($routers) {
		this.routers;
		for(const [
			$routerClassName, $routerClassInstances
		] of Object.entries($routers)) {
			for(const [
				$routerClassInstanceName, $routerClassInstance
			] of Object.entries($routerClassInstances)) {
				if(
					$routerClassInstance instanceof LocationRouter ||
					$routerClassInstance instanceof FetchRouter
				) {
					this[$className][$routerClassName][$routerClassInstanceName] = $routerClassInstance;
				}
				else {
					const Router = ($routerClassName === 'location')
						? LocationRouter
					  : ($routerClassName === 'fetch')
						  ? FetchRouter
						  : undefined;
				  if(Router !== undefined) {
				  	let routerParameters;
						if(typeOf($routerClassInstance) === 'object') { routerParameters = [$routerClassInstance]; }
						else if(typeOf($router) === 'array') { routerParameters = [...$routerClassInstance]; }
				  	this[$className][$routerClassName][$routerClassInstanceName] = new Router(routerParameters);
				  }
				}
			}
		}
	}
	addClassInstances() {
		let $classes;
		if(arguments.length === 0) { $classes = this.settings; } 
		else if(arguments.length === 1) { $classes = arguments[0]; }
		for(const [
			$className, $classInstances
		] of Object.entries($classes)) {
			this[$className] = $classInstances;
		}
		return this
	}
	removeClassInstances() {
		let $classes;
		if(arguments.length === 0) { $classes = this.settings; } 
		else if(arguments.length === 1) { $classes = arguments[0]; }
		for(const [
			$className, $classInstances
		] of Object.entries($classes)) {
			// Model, View, Control Class Instances
			if($className !== 'routers') {
				let classInstanceKeys;
				if(Array.isArray($classInstances)) { classInstanceKeys = $classInstances; }
				else { classInstanceKeys = Object.keys($classInstances); }
				for(const $classInstanceName of classInstanceKeys) {
					delete this[$className][$classInstanceName];
				}
			}
			// Router Class Instances
			else {
				for(const [
					$routerClassName, $routerClassInstances
				] of Object.entries($classInstances)) {
					let routerClassInstanceKeys;
					if(Array.isArray($routerClassInstances)) { routerClassInstanceKeys = $routerClassInstances; }
					else { routerClassInstances = Object.keys($routerClassInstances); }
					for(const $routerClassInstanceName of routerClassInstanceKeys) {
						delete this[$className][$routerClassName][$routerClassInstanceName];
					}
				}
			}
		}
		return this
	}
}

export { Content, Control, Core, FetchRouter, LocationRouter, Model, Schema, Validation, Validator, View };
//# sourceMappingURL=mvc-framework.js.map
