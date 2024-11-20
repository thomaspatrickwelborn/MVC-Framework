const typeOf = ($data) => Object
  .prototype
  .toString
  .call($data).slice(8, -1).toLowerCase();

function expandEvents($propEvents) {
  const propEvents = [];
  if(Array.isArray($propEvents)) { return $propEvents }
  else if($propEvents === undefined) { return propEvents }
  for(const [
    $propEventSettings, $propEventListener
  ] of Object.entries($propEvents)) {
    const propEventSettings = $propEventSettings.split(' ');
    let path, type, listener;
    if(propEventSettings.length === 1) {
      path = ':scope';
      type = propEventSettings[0];
    } else if(propEventSettings.length > 1) {
      path = propEventSettings[0];
      type = propEventSettings[1];
    }
    if(Array.isArray($propEventListener)) {
      listener = $propEventListener[0];
      $propEventListener[1];
    }
    else {
      listener = $propEventListener;
    }
    const propEvent = {
      type,
      path,
      listener,
      enable: false,
    };
    propEvents.push(propEvent);
  }
  return propEvents
}

function recursiveAssign() {
  const $arguments = [...arguments];
  const $target = $arguments.shift();
  const $sources = $arguments;
  iterateSources: 
  for(const $source of $sources) {
    if(
      $source === null ||
      $source === undefined
    ) { continue iterateSources }
    for(let [
      $sourcePropKey, $sourcePropValue
    ] of Object.entries($source)) {
      // Type: Non-Null Object
      if(
        $target[$sourcePropKey] !== null &&
        typeof $sourcePropValue === 'object'
      ) {
        if($target[$sourcePropKey] === undefined) {
          $target[$sourcePropKey] = $sourcePropValue;
        } else {
          $target[$sourcePropKey] = recursiveAssign(
            $target[$sourcePropKey], $sourcePropValue
          );
        }
      }
      // Type: Primitive
      else {
        $target[$sourcePropKey] = $sourcePropValue;
      }
    }
  }
  return $target
}

var regularExpressions = {
  quotationEscape: /\.(?=(?:[^"]*"[^"]*")*[^"]*$)/,
};

class ContentEvent extends Event {
  #settings
  #content
  #_basename
  constructor($type, $settings, $content) {
    super($type, $settings);
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
  get basename() {
    if(this.#_basename !== undefined) { return this.#_basename }
    if(this.path) { this.#_basename = this.path.split('.').pop(); }
    else { this.#_basename = null; }
    return this.#_basename
  }
  get path() { return this.#settings.path }
  get detail() { return this.#settings.detail }
}

let ValidatorEvent$1 = class ValidatorEvent extends Event {
  #settings
  #content
  #_basename
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
  get basename() {
    if(this.#_basename !== undefined) { return this.#_basename }
    if(this.path) { this.#_basename = this.path.split('.').pop(); }
    else { this.#_basename = null; }
    return this.#_basename
  }
  get path() { return this.#settings.path }
  get detail() { return this.#settings.detail }
  get results() { return this.#settings.results }
};

function assign() {
  const $content = Array.prototype.shift.call(arguments);
  const $options = Array.prototype.shift.call(arguments);
  const { sourceTree, events } = $options;
  const { path, root, schema, proxy } = $content;
  const { enableValidation, validationEvents, contentEvents } = $content.options;
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
      // Validation
      if(schema && enableValidation) {
        const validSourceProp = schema.validateProperty($sourcePropKey, $sourcePropVal);
        if(validationEvents) {
          if(validSourceProp.valid) ;
          // Validator Event: Validate Property
          $content.dispatchEvent(
            new ValidatorEvent$1('validateProperty', {
              path,
              detail: validSourceProp,
            }, $content)
          );
        }
        if(!validSourceProp.valid) { continue iterateSourceProps }
      }
      // Source Prop: Object Type
      if(typeof $sourcePropVal === 'object') {
        if($sourcePropVal?.classToString === Content.toString()) { $sourcePropVal = $sourcePropVal.object; }
        // Subschema
        let subschema;
        if(schema?.type === 'array') { subschema = schema.context[0]; }
        else if(schema?.type === 'object') { subschema = schema.context[$sourcePropKey]; }
        else { subschema = null; }
        // Content
        const _path = (path !== null)
          ? path.concat('.', $sourcePropKey)
          : $sourcePropKey;
        let sourcePropVal = root[$sourcePropKey];
        // Assignment
        let assignment;
        // Source Tree: False
        if(sourceTree === false) {
          assignment = { [$sourcePropKey]: content };
        }
        // Source Tree: true
        else {
          // Assignment: Existing Content Instance
          if(sourcePropVal?.classToString === Content.toString()) {
            sourcePropVal.assign($sourcePropVal);
          }
          // Assignment: New Content Instance
          else {
            sourcePropVal = new Content($sourcePropVal, subschema, 
              recursiveAssign({}, $content.options, {
                path: _path,
                parent: proxy,
              })
            );
          }
          assignment = { [$sourcePropKey]: sourcePropVal };
        }
        // Assignment
        Object.assign(root, assignment);
        Object.assign(assignedSource, assignment);
      }
      // Source Prop: Primitive Type
      else {
        let assignment = {
          [$sourcePropKey]: $sourcePropVal
        };
        // Assign Root
        Object.assign(root, assignment);
        // Assigned Source
        Object.assign(assignedSource, assignment);
      }
      // Content Event: Assign Source Property
      if(contentEvents) {
        if(events['assignSourceProperty']) {
          $content.dispatchEvent(
            new ContentEvent('assignSourceProperty', {
              path,
              detail: {
                key: $sourcePropKey,
                val: $sourcePropVal,
                source: $source,
              }
            }, $content)
          );
        }
        if(events['assignSourceProperty:$key']) {
          const type = ['assignSourceProperty', ':', $sourcePropKey].join('');
          const _path = [path, '.', $sourcePropKey].join('');
          $content.dispatchEvent(
            new ContentEvent(type, {
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
    }
    assignedSources.push(assignedSource);
    // Content Event: Assign Source
    if(contentEvents && events['assignSource']) {
      $content.dispatchEvent(
        new ContentEvent('assignSource', {
          path,
          detail: {
            source: assignedSource,
          },
        }, $content)
      );
    }
  }
  // Content Event: Assign
  if(contentEvents && events['assign']) {
    $content.dispatchEvent(
      new ContentEvent('assign', { 
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
  const { root, path, schema, proxy } = $content;
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
  if(contentEvents && events['defineProperties']) {
    $content.dispatchEvent(
      new ContentEvent(
        'defineProperties',
        {
          path,
          detail: {
            descriptors: $propertyDescriptors,
          },
        },
        $content
      )
    );
  }
  return proxy
}

function defineProperty() {
  const $content = Array.prototype.shift.call(arguments);
  const $options = Array.prototype.shift.call(arguments);
  const { descriptorTree, events } = $options;
  const { root, path, schema, proxy } = $content;
  const { enableValidation, validationEvents, contentEvents } = $content.options;
  const propertyKey = arguments[0];
  const propertyDescriptor = arguments[1];
  // Validation
  if(schema && enableValidation) {
    const validSourceProp = schema.validateProperty(propertyKey, propertyDescriptor.value);
    if(validationEvents) {
      if(validSourceProp.valid) ;
      $content.dispatchEvent(
        new ValidatorEvent$1('validateProperty', {
          path,
          detail: validSourceProp,
        }, $content)
      );
    }
    if(!validSourceProp.valid) { return proxy }
  }
  // Property Descriptor Value: Object Type
  if(typeof propertyDescriptor.value === 'object') {
    // Subschema
    let subschema;
    if(schema.type === 'array') { subschema = schema.context[0]; }
    else if(schema.type === 'object') { subschema = schema.context[propertyKey]; }
    else { subschema = undefined;}
    const rootPropertyDescriptor = Object.getOwnPropertyDescriptor(root, propertyKey) || {};
    // Root Property Descriptor Value: Existent Content Instance
    const _path = (
      path !== null
    ) ? path.concat('.', propertyKey)
      : propertyKey;
    if(rootPropertyDescriptor.value.classToString === Content.toString()) {
      // Descriptor Tree: true
      if(descriptorTree === true) {
        propertyDescriptor.value = Object.assign(propertyDescriptor.value, { path: _path, parent: proxy });
        rootPropertyDescriptor.value.defineProperties(propertyDescriptor.value);
      }
      // Descriptor Tree: false
      else {
        Object.defineProperty(root, propertyKey, propertyDescriptor);
      }
    }
    // Root Property Descriptor Value: New Content Instance
    else {
      let _root;
      if(typeOf(propertyDescriptor.value) === 'object') { _root = {}; }
      else if (typeOf(propertyDescriptor.value) === 'array') { _root = []; }
      else { _root = {}; }
      const contentObject = new Content(
        _root, subschema, {
          path: _path,
          parent: proxy,
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
  }
  // Property Descriptor Value: Primitive Type
  else {
    Object.defineProperty(root, propertyKey, propertyDescriptor);
  }
  // Define Property Event
  if(contentEvents) {
    if(events['defineProperty']) {
      $content.dispatchEvent(
        new ContentEvent('defineProperty', {
          path,
          detail: {
            prop: propertyKey,
            descriptor: propertyDescriptor,
          },
        }, $content
      ));
    }
    if(events['defineProperty:$key']) {
      const type = ['defineProperty', ':', propertyKey].join('');
      const _path = [path, '.', propertyKey].join('');
      $content.dispatchEvent(
        new ContentEvent(type, {
          path: _path,
          detail: {
            prop: propertyKey,
            descriptor: propertyDescriptor,
          },
        }, $content
      ));
    }
  }
  return proxy
}

function freeze() {
  const $content = Array.prototype.shift.call(arguments);
  const $options = Array.prototype.shift.call(arguments);
  const { recursive, events } = $options;
  const { root, path } = $content;
  const { proxy } = $content;
  if(recursive === true) {
    for(const [
      $propertyKey, $propertyValue
    ] of Object.entries(root)) {
      if($propertyValue.classToString === Content.toString()) {
        $propertyValue.freeze();
      }
      else { Object.freeze($propertyValue); }
      if(contentEvents && events['freeze']) {
        $content.dispatchEvent(
          new ContentEvent(
            'freeze',
            { path },
            $content
          )
        );
      }
    }
  }
  Object.freeze(root);
  return proxy
}

function seal() {
  const $content = Array.prototype.shift.call(arguments);
  const $options = Array.prototype.shift.call(arguments);
  const { recursive, events } = $options;
  const { root, path } = $content;
  const { proxy } = $content;
  if(recursive === true) {
    for(const [
      $propertyKey, $propertyValue
    ] of Object.entries(root)) {
      if($propertyValue.classToString === Content.toString()) {
        $propertyValue.seal();
      }
      else { Object.seal($propertyValue); }
      if(contentEvents && events['seal']) {
        $content.dispatchEvent(
          new ContentEvent(
            'seal',
            { path },
            $content
          )
        );
      }
    }
  }
  Object.seal(root);
  return proxy
}

var ObjectProperty = {
  assign,
  defineProperties,
  defineProperty,
  freeze,
  seal,
};

function concat() {
  const $content = Array.prototype.shift.call(arguments);
  const $options = Array.prototype.shift.call(arguments);
  const { events } = $options;
  const { root, path, schema } = $content;
  const { enableValidation, validationEvents, contentEvents } = $content.options;
  const { proxy } = $content;
  const $arguments = [...arguments].reduce(($arguments, $argument) => {
    if(Array.isArray($argument)) { $arguments.push(...$argument); }
    else { $arguments.push($argument); }
    return $arguments
  }, []);
  let valueIndex = root.length;
  const values = [];
  let rootConcat = [...Array.from(root)];
  let proxyConcat;
  iterateValues: 
  for(const $value of $arguments) {
    // Validation: Value
    if(schema && enableValidation) {
      const validValue = schema.validateProperty(valueIndex, $subvalue);
      if(schema &&validationEvents) {
        let type;
        const _path = [path, '.', valueIndex].join('');
        if(validSourceProp.valid) {
          type = ['validProperty', ':', valueIndex].join('');
        }
        else {
          type = ['nonvalidProperty', ':', valueIndex].join('');
        }
        $content.dispatchEvent(
          new ValidatorEvent(type, {
            path: _path,
            detail: validValue,
          }, $content)
        );
      }
      if(!validValue.valid) { valueIndex++; continue iterateValues }
    }
    const _path = (path !== null)
      ? path.concat('.', valueIndex)
      : valueIndex;
    // Value: Object Type
    if(typeof $value === 'object') {
      // Value: Content
      if($value?.classToString === Content.toString()) { $value = $value.object; }
      let subschema = schema?.context[0] || null;
      const value = new Content($value, subschema, {
        path: _path,
        parent: proxy,
      });
      values[valueIndex] = value;
    }
    // Value: Primitive Type
    else {
      values[valueIndex] = $value;
    }
    rootConcat = Array.prototype.concat.call(rootConcat, values[valueIndex]);
    if(contentEvents) {
      if(events['concatValue']) {
        $content.dispatchEvent(
          new ContentEvent('concatValue', {
            path,
            detail: {
              valueIndex,
              value: values[valueIndex],
            },
          }, $content)
        );
      }
      if(events['concatValue:$index']) {
        const _path = [path, '.', valueIndex].join('');
        $content.dispatchEvent(
          new ContentEvent('concatValue', {
            path: _path,
            detail: {
              valueIndex,
              value: values[valueIndex],
            },
          }, $content)
        );
      }
    }
    valueIndex++;
  }
  proxyConcat = new Content(rootConcat, schema, $content.options);
  if(contentEvents && events['concat']) {
    $content.dispatchEvent(
      new ContentEvent('concat', {
        path,
        detail: {
          values: proxyConcat,
        },
      }, $content)
    );
  }
  return proxyConcat
}

function copyWithin() {
  const $content = Array.prototype.shift.call(arguments);
  const $options = Array.prototype.shift.call(arguments);
  const { events } = $options;
  const { root, path } = $content;
  const { enableValidation, validationEvents, contentEvents } = $content.options;
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
    if(contentEvents) {
      if(events['copyWithinIndex']) {
        $content.dispatchEvent(
          new ContentEvent(
            'copyWithinIndex',
            {
              path,
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
      if(events['copyWithinIndex:$index']) {
        const type  = ['copyWithinIndex', ':', copyIndex].join('');
        const _path = [path, '.', copyIndex].join('');
        $content.dispatchEvent(
          new ContentEvent(
            type,
            {
              path: _path,
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
    }
    copyIndex++;
    targetIndex++;
  }
  // Array Copy Within Event
  if(contentEvents && events['copyWithin']) {
    $content.dispatchEvent(
      new ContentEvent(
        'copyWithin',
        {
          path,
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
  return proxy
}

function fill() {
  const $content = Array.prototype.shift.call(arguments);
  const $options = Array.prototype.shift.call(arguments);
  const { events } = $options;
  const { root, path, schema } = $content;
  const { enableValidation, validationEvents, contentEvents } = $content.options;
  const { proxy } = $content;
  const $arguments = [...arguments];
  let $start;
  if(typeof $arguments[1] === 'number') {
    $start = ($arguments[1] >= 0)
      ? $arguments[1]
      : root.length + $arguments[1];
  }
  else { $start = 0; }
  let $end;
  if(typeof $arguments[2] === 'number') {
    $end = ($arguments[2] >= 0)
      ? $arguments[2]
      : root.length + $arguments[2];
  } else { $end = root.length; }
  let fillIndex = $start;
  iterateFillIndexes: 
  while(
    fillIndex < root.length &&
    fillIndex < $end
  ) {
    if(schema && enableValidation) {
      let validValue = schema.validate(validValue);
      if(validationEvents) {
        let type;
        const _path = [path, '.', fillIndex].join('');
        if(validSourceProp.valid) {
          type = ['validProperty', ':', fillIndex].join('');
        }
        else {
          type = ['nonvalidProperty', ':', fillIndex].join('');
        }
        $content.dispatchEvent(
          new ValidatorEvent(type, {
            path: _path, 
            detail: validValue,
          }, $content)
        );
      }
      if(!validValue.valid) { continue iterateFillIndexes }
    }
    const _path = (path !== null)
      ? path.concat('.', fillIndex)
      : fillIndex;
    let value = $arguments[0];
    if(typeof value === 'object') {
      if(value?.classToString === Content.toString()) { value = value.object; }
      const subschema = schema?.context[0] || null;
      value = new Content(value, subschema, {
        path: _path,
        parent: proxy,
      });
    }
    Array.prototype.fill.call(
      root, value, fillIndex, fillIndex + 1
    );
    // Array Fill Index Event
    if(contentEvents) {
      if(events['fillIndex']) {
        $content.dispatchEvent(
          new ContentEvent('fillIndex', {
            path, 
            detail: {
              start: fillIndex,
              end: fillIndex + 1,
              value,
            },
          }, $content)
        );
      }
      if(events['fillIndex:$index']) {
        const type = ['fillIndex', ':', fillIndex].join('');
        const _path = [path, '.', fillIndex].join('');
        $content.dispatchEvent(
          new ContentEvent(type, {
            path: _path, 
            detail: {
              start: fillIndex,
              end: fillIndex + 1,
              value,
            },
          }, $content)
        );
      }
    }
    fillIndex++;
  }
  // Array Fill Event
  if(contentEvents && events['fill']) {
    $content.dispatchEvent(
      new ContentEvent('fill', {
        path,
        detail: {
          start: $start,
          end: $end,
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
  const { root, path } = $content;
  const popElement = Array.prototype.pop.call(root);
  const popElementIndex = root.length - 1;
  // Array Pop Event
  if(contentEvents && events['pop']) {
    $content.dispatchEvent(
      new ContentEvent(
        'pop',
        {
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

function push() {
  const $content = Array.prototype.shift.call(arguments);
  const $options = Array.prototype.shift.call(arguments);
  const { events } = $options;
  const { root, path, schema } = $content;
  const { enableValidation, validationEvents, contentEvents } = $content.options;
  const { proxy } = $content;
  const elements = [];
  let elementsIndex = 0;
  for(let $element of arguments) {
    // Validation
    if(schema && enableValidation) {
      const validElement = schema.validateProperty(elementsIndex, $element);
      if(validationEvents) {
        let type;
        const _path = [path, '.', elementsIndex].join('');
        if(validSourceProp.valid) {
          type = ['validProperty', ':', elementsIndex].join('');
        }
        else {
          type = ['nonvalidProperty', ':', elementsIndex].join('');
        }
        $content.dispatchEvent(
          new ValidatorEvent(type, {
            path: _path,
            detail: validElement,
          }, $content)
        );
      }
      if(!validElement.valid) { return root.length }
    }
    const _path = (path !== null)
      ? path.concat('.', elementsIndex)
      : elementsIndex;
    if(typeof $element === 'object') {
      if($element?.classToString === Content.toString()) { $element = $element.object; }
      const subschema = schema?.context[0] || null;
      $element = new Content($element, subschema, {
        path: _path,
        parent: proxy,
      });
      elements.push($element);
      Array.prototype.push.call(root, $element);
    } else {
      elements.push($element);
      Array.prototype.push.call(root, $element);
    }
    if(contentEvents) {
      if(events['pushProp']) {
        $content.dispatchEvent(
          new ContentEvent('pushProp', {
            path,
            detail: {
              elementsIndex,
              element: elements[elementsIndex],
            },
          }, $content)
        );
      }
      if(events['pushProp:$index']) {
        const type = ['pushProp', ':', elementsIndex].join('');
        const _path = [path, '.', elementsIndex].join('');
        $content.dispatchEvent(
          new ContentEvent(type, {
            path: _path,
            detail: {
              elementsIndex,
              element: elements[elementsIndex],
            },
          }, $content)
        );
      }
    }
    elementsIndex++;
  }
  // Push Event
  if(contentEvents && events['push']) {
    $content.dispatchEvent(
      new ContentEvent('push', {
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
  const { root, path } = $content;
  const { proxy } = $content;
  Array.prototype.reverse.call(root, ...arguments);
  if(contentEvents && events['reverse']) {
    $content.dispatchEvent(
      new ContentEvent(
        'reverse',
        {
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
  const { root, path } = $content;
  const shiftElement = Array.prototype.shift.call(root);
  const shiftElementIndex = 0;
  // Array Shift Event
  if(contentEvents && events['shift']) {
    $content.dispatchEvent(
      new ContentEvent(
        'shift',
        {
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

function splice() {
  const $content = Array.prototype.shift.call(arguments);
  const $options = Array.prototype.shift.call(arguments);
  const { events } = $options;
  const { root, path, schema } = $content;
  const { enableValidation, validationEvents, contentEvents } = $content.options;
  const $arguments = [...arguments];
  const $start = ($arguments[0] >= 0)
    ? $arguments[0]
    : root.length + $arguments[0];
  const $deleteCount = ($arguments[1] <= 0)
    ? 0
    : (
      $arguments[1] === undefined ||
      $start + $arguments[1] >= root.length
    ) ? root.length - $start
      : $arguments[1];
  const $addItems = $arguments.slice(2);
  const addCount = $addItems.length;
  const deleteItems = [];
  let deleteItemsIndex = 0;
  while(deleteItemsIndex < $deleteCount) {
    const deleteItem = Array.prototype.splice.call(root, $start, 1)[0];
    deleteItems.push(deleteItem);
    // Array Splice Delete Event
    if(contentEvents) {
      if(events['spliceDelete']) {
        $content.dispatchEvent(
          new ContentEvent('spliceDelete', {
            path,
            detail: {
              index: $start + deleteItemsIndex,
              deleteIndex: deleteItemsIndex,
              deleteItem: deleteItem,
            },
          }, $content)
        );
      }
      if(events['spliceDelete:$index']) {
        const type = ['spliceDelete', ':', deleteItemsIndex].join('');
        const _path = [path, '.', deleteItemsIndex].join('');
        $content.dispatchEvent(
          new ContentEvent(type, {
            path: _path,
            detail: {
              index: $start + deleteItemsIndex,
              deleteIndex: deleteItemsIndex,
              deleteItem: deleteItem,
            },
          }, $content)
        );
      }
    }
    deleteItemsIndex++;
  }
  let addItemsIndex = 0;
  spliceAdd: 
  while(addItemsIndex < addCount) {
    let addItem = $addItems[addItemsIndex];
    // Validation
    if(schema && enableValidation) {
      const validAddItem = schema.validateProperty(elementIndex, element);
      if(validationEvents) {
        let type;
        const _path = [path, '.', addItemsIndex].join('');
        if(validSourceProp.valid) {
          type = ['validProperty', ':', addItemsIndex].join('');
        }
        else {
          type = ['nonvalidProperty', ':', addItemsIndex].join('');
        }
        $content.dispatchEvent(
          new ValidatorEvent(type, {
            path: _path,
            detail: validAddItem,
          }, $content)
        );
      }
      if(!validAddItem.valid) { addItemsIndex++; continue spliceAdd }
    }
    const _path = (path !== null)
      ? path.concat('.', addItemsIndex)
      : addItemsIndex;
    let startIndex = $start + addItemsIndex;
    // Add Item: Object Type
    if(typeof addItem === 'object') {
      if(addItem?.classToString === Content.toString()) { addItem = addItem.object; }
      const subschema = schema?.context[0] || null;
      addItem = new Content(addItem, subschema, {
        path: _path,
        parent: proxy,
      });
      Array.prototype.splice.call(
        root, startIndex, 0, addItem
      );
    }
    // Add Item: Primitive Type
    else {
      Array.prototype.splice.call(
        root, startIndex, 0, addItem
      );
    }
    // Array Splice Add Event
    if(contentEvents) {
      if(events['spliceAdd']) {
        $content.dispatchEvent(
          new ContentEvent('spliceAdd', {
            path,
            detail: {
              index: $start + addItemsIndex,
              addIndex: addItemsIndex,
              addItem: addItem,
            },
          }, $content)
        );
      }
      if(events['spliceAdd:$index']) {
        const type = ['spliceAdd', ':', addItemsIndex].join('');
        const _path = [path, '.', addItemsIndex].join('');
        $content.dispatchEvent(
          new ContentEvent(type, {
            path: _path,
            detail: {
              index: $start + addItemsIndex,
              addIndex: addItemsIndex,
              addItem: addItem,
            },
          }, $content)
        );
      }
    }
    addItemsIndex++;
  }
  // Array Splice Event
  if(contentEvents && events['splice']) {
    $content.dispatchEvent(
      new ContentEvent('splice', {
        path,
        detail: {
          $start,
          deleted: deleteItems,
          added: $addItems,
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
  const { root, path, schema } = $content;
  const { enableValidation, validationEvents, contentEvents } = $content.options;
  const elements = [];
  const elementsLength = $arguments.length;
  let elementIndex = elementsLength - 1;
  while(elementIndex > -1) {
    $arguments.length;
    let $element = $arguments[elementIndex];
    // Validation
    if(schema && enableValidation) {
      const validElement = schema.validateProperty(elementIndex, $element);
      if(validationEvents) {
        let type;
        const _path = [path, '.', elementIndex].join('');
        if(validSourceProp.valid) {
          type = ['validProperty', ':', elementIndex].join('');
        }
        else {
          type = ['nonvalidProperty', ':', elementIndex].join('');
        }
        $content.dispatchEvent(
          new ValidatorEvent(type, {
            path: _path,
            detail: validElement,
          }, $content)
        );
      }
      if(!validElement.valid) { return proxy.length }
    }
    // Element: Object Type
    if(typeof $element === 'object') {
      const subschema = schema?.context[0] || null;
      const _path = (path !== null)
        ? path.concat('.', elementIndex)
        : elementIndex;
      const element = new Content($element, subschema, {
        path: _path,
        parent: proxy,
      });
      elements.unshift(element);
      Array.prototype.unshift.call(root, element);
    }
    // Element: Primitive Type
    else {
      elements.unshift($element);
      Array.prototype.unshift.call(root, $element);
    }
    // Array Unshift Prop Event
    if(contentEvents) {
      if(events['unshiftProp']) {
        $content.dispatchEvent(
          new ContentEvent('unshiftProp', {
            path,
            detail: {
              elementIndex, 
              element: element,
            },
          }, $content)
        );
      }
      if(events['unshiftProp:$index']) {
        const type = ['unshiftProp', ':', elementIndex].join('');
        const _path = [path, '.', elementIndex];
        $content.dispatchEvent(
          new ContentEvent(type, {
            path: _path,
            detail: {
              elementIndex, 
              element: element,
            },
          }, $content)
        );
      }

    }
    elementIndex--;
  }
  // Array Unshift Event
  if(contentEvents && events['unshift'] && elements.length) {
    $content.dispatchEvent(
      new ContentEvent('unshift', {
        path,
        detail: {
          elements,
        },
      },
      $content)
    );
  }
  return proxy.length
}

var ArrayProperty = {
  concat: concat,
  copyWithin: copyWithin,
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
  const { root, path } = $content;
  const { contentEvents } = $content.options;
  const ulteroptions = Object.assign({}, $options, arguments[0] || {});
  const { events } = ulteroptions;
  // Get Property Event
  if(contentEvents && events['get']) {
    $content.dispatchEvent(
      new ContentEvent('get', {
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
  const { root, path } = $content;
  const { contentEvents } = $content.options;
  // Arguments
  const $path = arguments[0];
  const ulteroptions = recursiveAssign({
    pathkey: $content.options.pathkey,
    subpathError: $content.options.subpathError,
  }, $options, arguments[1]);
  const { events, pathkey, subpathError } = ulteroptions;
  // Path Key: true
  if(pathkey === true) {
    const subpaths = $path.split(new RegExp(regularExpressions.quotationEscape));
    const propertyKey = subpaths.shift();
    let propertyValue = root[propertyKey];
    // Return: Subproperty
    if(subpaths.length) {
      // Subpath Error
      if(subpathError === false && propertyValue === undefined) { return undefined }
      return propertyValue.get(subpaths.join('.'), ulteroptions)
    }
    // Get Property Event
    if(contentEvents) {
      if(events['getProperty']) {
        $content.dispatchEvent(
          new ContentEvent('getProperty', {
            path,
            detail: {
              key: propertyKey,
              val: propertyValue,
            }
          }, $content)
        );
      }
      if(events['getProperty:$key']) {
        const type = ['getProperty', ':', propertyKey].join('');
        const _path = [path, '.', propertyKey].join('');
        $content.dispatchEvent(
          new ContentEvent(type, {
            path: _path,
            detail: {
              val: propertyValue,
            }
          }, $content)
        );
      }
    }
    return propertyValue
  }
  // Path Key: false
  else if(pathkey === false) {
    const propertyValue = root[propertyKey];
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
  const { path } = $content;
  const { contentEvents } = $content.options;
  const { proxy } = $content;
  // Delete Preterproperties
  // proxy.delete()
  proxy.delete({
    events: {
      ['delete']: false, ['deleteProperty']: false, ['deleteProperty:$key']: false
    }
  });
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
  if(contentEvents && events['set']) {
    $content.dispatchEvent(
      new ContentEvent('set', {
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
  const { root, path, schema } = $content;
  const { enableValidation, validationEvents, contentEvents } = $content.options;
  const { proxy } = $content;
  // Arguments
  const $path = arguments[0];
  const $value = arguments[1];
  // Options
  const ulteroptions = recursiveAssign({
    pathkey: $content.options.pathkey,
    subpathError: $content.options.subpathError,
  }, $options, arguments[2]);
  const contentOptions = $content.options;
  // contentOptions.traps.accessor.set = ulteroptions
  const { events, pathkey, subpathError, recursive } = ulteroptions;
  // Path Key: true
  if(pathkey === true) {
    // Subpaths
    const subpaths = $path.split(new RegExp(regularExpressions.quotationEscape));
    // Property Key
    const propertyKey = subpaths.shift();
    // Property Value
    let propertyValue;
    const _path = (path !== null)
      ? String(path).concat('.', propertyKey)
      : propertyKey;
    // Return: Subproperty
    if(subpaths.length) {
      if(recursive && root[propertyKey] === undefined) {
        // Subschema
        let subschema;
        if(schema?.type === 'array') { subschema = schema.context[0]; }
        else if(schema?.type === 'object') { subschema = schema.context[propertyKey]; }
        else { subschema = undefined; }
        // Subcontent
        let subcontent;
        if(subschema?.type === 'array') { subcontent = []; }
        else if(subschema?.type === 'object') { subcontent = {}; }
        else {
          if(Number(propertyKey)) { subcontent = []; }
          else { subcontent = {}; }
        }
        propertyValue = new Content(subcontent, subschema, Object.assign({}, contentOptions, {
          path: _path,
          parent: proxy,
        }));
      }
      else {
        propertyValue = root[propertyKey];
      }
      // Subpath Error
      if(subpathError === false && propertyValue === undefined) { return undefined }
      propertyValue.set(subpaths.join('.'), $value, ulteroptions);
      return propertyValue
    }
    // Validation
    if(schema && enableValidation) {
      const validSourceProp = schema.validateProperty(propertyKey, $value);
      if(validationEvents) {
        let type;
        const _path = [path, '.', propertyKey].join('');
        if(validSourceProp.valid) {
          type = ['validProperty', ':', propertyKey].join('');
        }
        else {
          type = ['nonvalidProperty', ':', propertyKey].join('');
        }
        $content.dispatchEvent(
          new ValidatorEvent$1(type, {
            path: _path, 
            detail: validSourceProp,
          }, $content)
        );
      }
      if(!validSourceProp.valid) { return }
    }
    // Return: Property
    // Value: Object Literal
    if(typeof $value === 'object') {
      // Value: Content
      if($value?.classToString === Content.toString()) { $value = $value.object; }
      let subschema;
      if(schema?.type === 'array') { subschema = schema.context[0]; }
      else if(schema?.type === 'object') { subschema = schema.context[propertyKey]; }
      else { subschema = undefined; }
      propertyValue = new Content($value, subschema, Object.assign(
        {}, contentOptions, {
          path: _path,
          parent: proxy,
        }
      ));
    }
    // Value: Primitive Literal
    else {
      propertyValue = $value;
    }
    // Root Assignment
    root[propertyKey] = propertyValue;
    // Set Property Event
    if(contentEvents) {
      if(events['setProperty']) {
        $content.dispatchEvent(
          new ContentEvent('setProperty', {
            path, 
            detail: {
              key: propertyKey,
              value: propertyValue,
            }
          }, $content)
        );
      }
      if(events['setProperty:$key']) {
        const type = ['setProperty', ':', propertyKey].join('');
        const _path = [path, '.', propertyKey].join('');
        $content.dispatchEvent(
          new ContentEvent(type, {
            path: _path, 
            detail: {
              value: propertyValue,
            }
          }, $content)
        );
      }
    }
    // Return Property Value
    return propertyValue
  }
  // Path Key: false
  else if(pathkey === false) {
    let propertyKey = $path;
    // Property Value: Object
    if(typeof $value === 'object') {
      if($value.classToString === Content.toString()) { $value = $value.object; }
      let subschema;
      if(schema?.type === 'array') { subschema = schema.context[0]; }
      if(schema?.type === 'object') { subschema = schema.context[propertyKey]; }
      else { subschema = undefined; }
      const _path = (path !== null)
        ? path.concat('.', propertyKey)
        : propertyKey;
      propertyValue = new Content($value, subschema, Object.assign(
        {}, contentOptions, {
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
    if(contentEvents) {
      if(events['setProperty']) {
        $content.dispatchEvent(
          new ContentEvent('setProperty', {
            path, 
            detail: {
              key: propertyKey,
              value: propertyValue,
            }
          }, $content)
        );
      }
      if(events['setProperty:$key']) {
        const type = ['setProperty', ':', propertyKey].join('');
        const _path = [path, '.', propertyKey].join('');
        $content.dispatchEvent(
          new ContentEvent(type, {
            path: _path, 
            detail: {
              value: propertyValue,
            }
          }, $content)
        );
      }
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
  const { root, path } = $content;
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
  if(contentEvents && events['delete']) {
    $content.dispatchEvent(
      new ContentEvent('delete', {
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
  const { root, path } = $content;
  const { contentEvents } = $content.options;
  // Arguments
  const $path = arguments[0];
  const ulteroptions = recursiveAssign({
    pathkey: $content.options.pathkey,
    subpathError: $content.options.subpathError,
  }, $options, arguments[1]);
  const { events, pathkey, subpathError } = ulteroptions;
  // Path Key: true
  if(pathkey === true) {
    const subpaths = $path.split(new RegExp(regularExpressions.quotationEscape));
    const propertyKey = subpaths.shift();
    let propertyValue = root[propertyKey];

    // Return: Subproperty
    if(subpaths.length) {
      // Subpath Error
      if(subpathError === false && propertyValue === undefined) { return undefined }
      return propertyValue.delete(subpaths.join('.'), ulteroptions)
    }
    if(typeof propertyValue === 'object') {
      propertyValue.delete(ulteroptions);
    }
    delete root[propertyKey];
    // Delete Property Event
    if(contentEvents) {
      if(events['deleteProperty']) {
        $content.dispatchEvent(
          new ContentEvent('deleteProperty', {
            path,
            detail: {
              key: propertyKey,
              val: propertyValue,
            }
          }, $content)
        );
      }
      if(events['deleteProperty:$key']) {
        const type = ['deleteProperty', ':', propertyKey].join('');
        const _path = [path, '.', propertyKey].join('');
        $content.dispatchEvent(
          new ContentEvent(type, {
            path: _path,
            detail: {
              val: propertyValue,
            }
          }, $content)
        );
      }
    }
    return undefined
  }
  // Path Key: false
  else if(pathkey === false) {
    const propertyKey = $path;
    const propertyValue = root[propertyKey];
    if(propertyValue instanceof Content) {
      propertyValue.delete(ulteroptions);
    }
    delete root[propertyKey];
    // Delete Property Event
    if(contentEvents) {
      if(events['deleteProperty']) {
        $content.dispatchEvent(
          new ContentEvent('deleteProperty', {
            path,
            detail: {
              key: propertyKey,
              val: propertyValue,
            }
          }, $content)
        );
      }
      if(events['deleteProperty:$key']) {
        const type = ['deleteProperty', ':', propertyKey].join('');
        const _path = [path, '.', propertyKey].join('');
        $content.dispatchEvent(
          new ContentEvent(type, {
            path: _path,
            detail: {
              val: propertyValue,
            }
          }, $content)
        );
      }
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
    arguments.length === 2 + defaultArgumentsLength &&
    typeof arguments[0 + defaultArgumentsLength] === 'string' &&
    typeof arguments[1 + defaultArgumentsLength] === 'object'
  )) { return deleteContentProperty(...arguments) }
}

var AccessorProperty = {
  get: getProperty,
  set: setProperty,
  delete: deleteProperty,
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

const PropertyClasses = {
  Object: ObjectProperty,
  Array: ArrayProperty,
  Accessor: AccessorProperty,
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
  #_traps
  constructor($content) {
    this.#content = $content;
    this.#traps;
  }
  get #traps() {
    if(this.#_traps !== undefined) return this.#_traps
    this.#_traps = new Traps(this.#content);
    return this.#_traps
  }
  // Enabled Trap
  get get() {
    const content = this.#content;
    const traps = this.#traps;
    return function get($target, $property, $receiver) {
      // Accessor Traps
      if(this.#isAccessorProperty($property)) {
        return traps['Accessor'][$property]
      }
      // Content Class Instance Trap
      else if(
        this.#isEventTargetProperty($property) ||
        this.#isContentProperty($property)
      ) {
        if(typeof content[$property] === 'function') {
          return content[$property].bind(content)
        }
        return content[$property]
      }
      // Object Traps
      else if(this.#isObjectProperty($property)) {
        return traps['Object'][$property]
      }
      // Array Traps
      else if(this.#isArrayProperty($property)) {
        return traps['Array'][$property]
      }
      // Undefined
      else { return undefined }
    }
  }
  // Disabled Traps
  get apply() {}
  get construct() {}
  get deleteProperty() {}
  get defineProperty() {}
  get getOwnPropertyDescriptor() {}
  get getPrototypeOf() {}
  get has() {}
  get isExtensible() {}
  get ownKeys() {}
  get preventExtensions() {}
  get set() {
    const content = this.#content;
    return function set($target, $property, $value, $receiver) {
      if(this.#isContentProperty($property)) {
        content[$property] = $value;
      }
      return true
    }
  }
  get setPrototypeOf() {}
  #isContentProperty($property) {
    return Object.getOwnPropertyNames(Content.prototype)
    .includes($property)
  }
  #isEventTargetProperty($property) {
    return Object.getOwnPropertyNames(EventTarget.prototype)
    .includes($property)
  }
  #isAccessorProperty($property) {
    return ['get', 'set', 'delete'].includes($property)
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
  get type() { return this.#settings.type }
  get valid() { return this.#_valid }
  set valid($valid) {
    if(this.#_valid === undefined) {
      this.#_valid = $valid;
    }
  }
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
  get context() { return this.#settings.context }
  get contextKey() { return this.#settings.contentKey }
  get contextVal() { return this.#settings.context[this.contentKey] }
  get contentKey() { return this.#settings.contentKey }
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

var Options$6 = {
  validationType: 'primitive', // 'object', 
};

class Schema extends EventTarget{
  options
  #properties
  #_type
  #_context
  constructor($properties = {}, $options = {}) {
    super();
    this.#properties = $properties;
    this.options = Object.assign({}, Options$6, $options);
  }
  get validationType() { return this.options.validationType }
  get type() {
    if(this.#_type !== undefined) return this.#_type
    if(Array.isArray(this.#properties)) { this.#_type = 'array'; }
    else if(typeOf(this.#properties) === 'object') { this.#_type = 'object'; }
    return this.#_type
  }
  get context() {
    if(this.#_context !== undefined) return this.#_context
    let properties;
    if(this.type === 'array') {
      properties = this.#properties.slice(0, 1);
      this.#_context = [];
    }
    else if(this.type === 'object') {
      properties = this.#properties; 
      this.#_context = {};
    }
    iterateProperties: 
    for(const [
      $contextKey, $contextVal
    ] of Object.entries(properties)) {
      // Context Val: Schema
      if($contextVal instanceof Schema) {
        this.#_context[$contextKey] = $contextVal;
        continue iterateProperties
      }
      // Context Val: Object
      else if(typeof $contextVal.type === 'object') {
        this.#_context[$contextKey] = new Schema($contextVal.type, this.options);
        continue iterateProperties
      }
      // Context Val: Primitive
      else {
        this.#_context[$contextKey] = $contextVal;
      }
      // Context Validators
      this.#_context[$contextKey].validators = [new TypeValidator()];
      const addValidators = [];
      // Context Validator: Add Range
      if(
        typeof this.#_context[$contextKey].min === 'number' || 
        typeof this.#_context[$contextKey].max === 'number'
      ) { addValidators.push(new RangeValidator()); }
      // Context Validator: Add Length
      if(
        typeof this.#_context[$contextKey].minLength === 'number' ||
        typeof this.#_context[$contextKey].maxLength === 'number'
      ) { addValidators.push(new LengthValidator()); }
      // Context Validator: Add Enum
      if(
        Array.isArray(this.#_context[$contextKey].enum) &&
        this.#_context[$contextKey].enum.length > 0
      ) { addValidators.push(new EnumValidator()); }
      this.#_context[$contextKey].validators = addValidators.concat(this.#_context[$contextKey].validators);
    }
    return this.#_context
  }
  validate($content) {
    if($content.classToString === Content.toString()) { $content = $content.object; }
    let validateProperties;
    if(this.type === 'array') { validateProperties = []; }
    else if(this.type === 'object') { validateProperties = {}; }
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
    if(this.type === 'array') { contextVal = this.context[0]; }
    else if(this.type === 'object') { contextVal = this.context[$key]; }
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
      if(validation.valid === true) { propertyValidation.advance.push(validation); }
      else if(validation.valid === false) { propertyValidation.deadvance.push(validation); }
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

var Options$5 = {
  path: null, 
  parent: null, 
  enableValidation: true, 
  validationEvents: true, 
  contentEvents: true, 
  enableEvents: true, 
  pathkey: true,
  subpathError: false,
  traps: {
    accessor: {
      get: {
        events: {
          'get': true,
          'getProperty': true,
          'getProperty:$key': true,
        },
      },
      set: {
        recursive: true,
        events: {
          'set': true,
          'setProperty': true,
          'setProperty:$key': true,
        },
      },
      delete: {
        events: {
          'delete': true,
          'deleteProperty': true,
          'deleteProperty:$key': true,
        },
      },
    },
    object: {
      assign: {
        sourceTree: true,
        events: {
          'assignSourceProperty:$key': true,
          'assignSourceProperty': true,
          'assignSource': true,
          'assign': true,
        },
      },
      defineProperties: {
        descriptorTree: true,
        events: { 'defineProperties': true },
      },
      defineProperty: {
        descriptorTree: true,
        events: {
          'defineProperty': true,
          'defineProperty:$key': true,
        },
      },
      freeze: {
        recursive: true,
        events: { 'freeze': true  },
      },
      seal: {
        recursive: true,
        events: { 'seal': true  },
      },
    },
    array: {
      concat: {
        events: {
          'concatValue:$index': true,
          'concatValue': true,
          'concat': true,
        }
      },
      copyWithin: {
        events: {
          'copyWithinIndex:$index': true,
          'copyWithinIndex': true,
          'copyWithin': true,
        }
      },
      fill: {
        events: {
          'fillIndex:$index': true,
          'fillIndex': true,
          'fill': true,
        }
      },
      pop: {
        events: { 'pop': true  },
      },
      push: {
        events: {
          'pushProp:$index': true,
          'pushProp': true,
          'push': true,
        }
      },
      reverse: {
        events: { 'reverse': true  },
      },
      shift: {
        events: { 'shift': true  },
      },
      splice: {
        events: {
          'spliceDelete:$index': true,
          'spliceDelete': true,
          'spliceAdd:$index': true,
          'spliceAdd': true,
          'splice': true,
        }
      },
      unshift: {
        events: {
          'unshiftProp:$index': true,
          'unshiftProp': true,
          'unshift': true,
        }
      },
    }
  }
};

class Content extends EventTarget {
  #_properties
  #_options
  #_schema
  #_type
  #_root
  #_parent
  #_basename
  #_path
  #_proxy
  #_handler
  constructor($properties = {}, $schema = null, $options = {}) {
    super();
    this.#properties = $properties;
    this.options = $options;
    this.schema = $schema;
    if(
      this.schema !== null && 
      this.schema?.type !== this.type
    ) { return undefined }
    else { return this.proxy }
  }
  get #properties() { return this.#_properties }
  set #properties($properties) {
    if(this.#_properties !== undefined) return
    this.#_properties = $properties;
    return this.#_properties
  }
  get options() { return this.#_options }
  set options($options) {
    if(this.#_options !== undefined) return
    this.#_options = recursiveAssign({}, Options$5, $options);
    return this.#_options
  }
  get schema() { return this.#_schema }
  set schema($schema) {
    if(this.#_schema !== undefined)  { return }
    if(!$schema) { this.#_schema = null; }
    else if($schema instanceof Schema) { this.#_schema = $schema; }
    else if(typeof $schema === 'object') {
      if(Array.isArray($schema)) { new Schema(...arguments); }
      else { new Schema($schema); }
    }
  }
  get classToString() { return Content.toString() }
  get object() { return this.parse({ type: 'object' }) }
  get string() { return this.parse({ type: 'string' }) }
  get type() {
    if(this.#_type !== undefined) return this.#_type
    this.#_type = typeOf(this.#properties);
    return this.#_type
  }
  get typedObjectLiteral() {
    if(this.type === 'object') { return {} }
    else if(this.type === 'array') { return [] }
    else { return {} }
  }
  get parent() {
    if(this.#_parent !== undefined)  return this.#_parent
    this.#_parent = (this.options.parent)
      ? this.options.parent
      : null;
    return this.#_parent
  }
  get basename() {
    if(this.#_basename !== undefined) { return this.#_basename }
    if(this.path) { this.#_basename = this.path.split('.').pop(); }
    else { this.#_basename = null; }
    return this.#_basename
  }
  get path() {
    if(this.#_path !== undefined)  return this.#_path
    this.#_path = (this.options.path)
      ? String(this.options.path)
      : null;
    return this.#_path
  }
  get root() {
    if(this.#_root !== undefined) return this.#_root
    this.#_root = this.typedObjectLiteral;
    return this.#_root
  }
  get proxy() {
    if(this.#_proxy !== undefined) return this.#_proxy
    this.#_proxy = new Proxy(this.root, this.#handler);
    this.#_proxy.set(this.#properties);
    return this.#_proxy
  }
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
      if($propertyDescriptor.value?.classToString === Content.toString()) {
        $parsement[$propertyDescriptorName] = $propertyDescriptor.value.object;
      }
      else {
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

class CoreEvent {
  #settings
  #_boundListener
  #_enable = false
  constructor($settings) { 
    this.#settings = $settings;
  }
  get type() { return this.#settings.type }
  get path() { return this.#settings.path }
  get target() {
    let target = this.#context;
    const pathKeys = this.path.split('.');
    let pathKeysIndex = 0;
    iterateTargetPathKeys: 
    while(pathKeysIndex < pathKeys.length) {
      const pathKey = pathKeys[pathKeysIndex];
      if(pathKeysIndex === 0 && pathKey === ':scope') {
        break iterateTargetPathKeys
      }
      if(target.classToString === Content.toString()) {
        target = target.get(pathKey);
      }
      else {
        target = target[pathKey];
      }
      if(target === undefined) { break iterateTargetPathKeys }
      pathKeysIndex++;
    }
    return target
  }
  get listener() { return this.#settings.listener }
  get options() { return this.#settings.options }
  get enable() { return this.#_enable }
  set enable($enable) {
    if(
      $enable === this.#_enable ||
      this.target === undefined
    ) { return }
    const eventAbility = (
      $enable === true
    ) ? 'addEventListener'
      : 'removeEventListener';
    if(this.target instanceof NodeList) {
      for(const $target of this.target) {
        $target[eventAbility](this.type, this.#boundListener, this.options);
      }
      this.#_enable = $enable;
    }
    else if(this.target instanceof EventTarget) {
      this.target[eventAbility](this.type, this.#boundListener, this.options);
      this.#_enable = $enable;
    }
    else {
      try {
        this.target[eventAbility](this.type, this.#boundListener, this.options);
        this.#_enable = $enable;
      } catch($err) {}
    }
  }
  get #context() { return this.#settings.context }
  get #boundListener() {
    if(this.#_boundListener !== undefined) { return this.#_boundListener }
    this.#_boundListener = this.#settings.listener.bind(this.#context);
    return this.#_boundListener
  }
}

var Settings$4 = {
  events: []
};

var Options$4 = {
  defineProperties: {},
  assign: [],
};

class Core extends EventTarget {
  #_settings
  #_options
  #_events
  constructor($settings, $options) {
    super();
    this.settings = $settings;
    this.options = $options;
    this.addEvents();
    this.#assign();
    this.#defineProperties();
  }
  get settings() { return this.#_settings }
  set settings($settings) {
    if(this.#_settings !== undefined) return
    $settings.events = expandEvents($settings.events);
    this.#_settings = recursiveAssign(structuredClone(Settings$4), $settings);
  }
  get options() { return this.#_options }
  set options($options) {
    if(this.#_options !== undefined) return
    this.#_options = recursiveAssign(structuredClone(Options$4), $options);
  }
  get events() {
    if(this.#_events !== undefined) return this.#_events
    this.#_events = [];
    return this.#_events
  }
  getEvents() {
    const getEvents = [];
    const { events } = this;
    const $events = expandEvents(arguments[0]);
    for(const $event of $events) {
      const { type, path, listener, enable } = $event;
      const eventFilterProperties = [];
      if(type !== undefined) { eventFilterProperties.push(['type', type]); }
      if(path !== undefined) { eventFilterProperties.push(['path', path]); }
      if(listener !== undefined) { eventFilterProperties.push(['listener', listener]); }
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
    if(arguments.length === 0) { $events = this.settings.events; }
    else if(arguments.length === 1) { $events = expandEvents(arguments[0]); }
    for(let $event of $events) {
      $event = Object.assign({}, $event, { context: this });
      events.push(new CoreEvent($event));
    }
    return this
  }
  removeEvents() {
    const { events } = this;
    let $events;
    if(arguments.length === 0) { $events = events; }
    else if(arguments.length === 1) {
      $events = this.getEvents(expandEvents(arguments[0]));
    }
    let eventsIndex = events.length - 1;
    while(eventsIndex > -1) {
      const event = events[eventsIndex];
      const removeEventIndex = $events.findIndex(
        ($event) => $event === event
      );
      event.enable = false;
      if(removeEventIndex !== -1) events.splice(eventsIndex, 1);
      eventsIndex--;
    }
    return this
  }
  enableEvents() {
    let $events;
    if(arguments.length === 0) { $events = this.events; }
    else { $events = this.getEvents(arguments[0]); }
    return this.#toggleEventAbility('addEventListener', $events)
  }
  disableEvents() {
    let $events;
    if(arguments.length === 0) { $events = this.events; }
    else { $events = this.getEvents(arguments[0]); }
    return this.#toggleEventAbility('removeEventListener', $events)
  }
  #assign() {
    if(Object.keys(this.options.assign).length === 0) return this
    for(const [
        $propertyName, $propertyValue
      ] of Object.entries(this.options.assign)) {
      Object.assign(this, { [$propertyName]: $propertyValue });
    }
    return this
  }
  #defineProperties() {
    if(Object.keys(this.options.defineProperties).length === 0) return this
    for(const [
      $propertyName, $propertyDescriptor
    ] of Object.entries(this.options.defineProperties)) {
      Object.defineProperty(this, $propertyName, $propertyDescriptor);
    }
    return this
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

class LocalStorage extends EventTarget {
  #settings
  constructor($settings, $options) {
    super();
    this.#settings = $settings;
  }
  get() { localStorage.getItem(this.#settings); }
  set($content) { localStorage.setItem(this.#settings, $content); }
  remove() { localStorage.removeItem(this.#settings); }
}

var Settings$3 = {
  localStorage: undefined,
  schema: undefined,
  content: undefined,
};

var Options$3 = {
  schema: undefined, // Schema
  content: undefined, // Content
  enableEvents: true, // Boolean
  localStorage: undefined, // String,
  autoload: false, // Boolean
};

class Model extends Core {
  #_schema
  #_content
  #_localStorage
  constructor($settings = {}, $options = {}) {
    super(
      recursiveAssign({}, Settings$3, $settings), 
      recursiveAssign({}, Options$3, $options),
    );
    if(this.options.enableEvents === true) this.enableEvents();
  }
  get schema() {
    if(this.#_schema !== undefined) return this.#_schema
    const { schema } = this.settings;
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
    const { content } = this.settings;
    // Existing Content
    if(content instanceof Content) { this.#_content = content; }
    // New Content
    else {
      const { localStorage, autoLoad } = this.options;
      // Local Storage, Auto Load
      if(localStorage && autoLoad) {
        const localStorageContent = this.localStorage.get();
        this.#_content = new Content(
          recursiveAssign({}, content, localStorageContent),
          this.schema,
          this.options.content
        );
      }
      // No Local Storage, No Auto Load
      else {
        this.#_content = new Content(content, this.schema, this.options.content);
      }
    }
    return this.#_content
  }
  get localStorage() {
    if(this.#_localStorage !== undefined) { return this.#_localStorage }
    this.#_localStorage = new LocalStorage(this.settings.localStorage);
    return this.#_localStorage
  }
  save() {
    if(this.localStorage) { this.localStorage.set(this.content.string); }
    return this
  }
  load() {
    if(this.localStorage) { this.content.set(JSON.parse(this.localStorage.get())); }
    return this
  }
  parse() { return this.content.parse(...arguments) }
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
    this.enableQuerySelectors();
    this.enableEvents();
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

var dist = {};

var hasRequiredDist;

function requireDist () {
	if (hasRequiredDist) return dist;
	hasRequiredDist = 1;
	Object.defineProperty(dist, "__esModule", { value: true });
	dist.TokenData = void 0;
	dist.parse = parse;
	dist.compile = compile;
	dist.match = match;
	dist.pathToRegexp = pathToRegexp;
	dist.stringify = stringify;
	const DEFAULT_DELIMITER = "/";
	const NOOP_VALUE = (value) => value;
	const ID_START = /^[$_\p{ID_Start}]$/u;
	const ID_CONTINUE = /^[$\u200c\u200d\p{ID_Continue}]$/u;
	const DEBUG_URL = "https://git.new/pathToRegexpError";
	const SIMPLE_TOKENS = {
	    // Groups.
	    "{": "{",
	    "}": "}",
	    // Reserved.
	    "(": "(",
	    ")": ")",
	    "[": "[",
	    "]": "]",
	    "+": "+",
	    "?": "?",
	    "!": "!",
	};
	/**
	 * Escape text for stringify to path.
	 */
	function escapeText(str) {
	    return str.replace(/[{}()\[\]+?!:*]/g, "\\$&");
	}
	/**
	 * Escape a regular expression string.
	 */
	function escape(str) {
	    return str.replace(/[.+*?^${}()[\]|/\\]/g, "\\$&");
	}
	/**
	 * Tokenize input string.
	 */
	function* lexer(str) {
	    const chars = [...str];
	    let i = 0;
	    function name() {
	        let value = "";
	        if (ID_START.test(chars[++i])) {
	            value += chars[i];
	            while (ID_CONTINUE.test(chars[++i])) {
	                value += chars[i];
	            }
	        }
	        else if (chars[i] === '"') {
	            let pos = i;
	            while (i < chars.length) {
	                if (chars[++i] === '"') {
	                    i++;
	                    pos = 0;
	                    break;
	                }
	                if (chars[i] === "\\") {
	                    value += chars[++i];
	                }
	                else {
	                    value += chars[i];
	                }
	            }
	            if (pos) {
	                throw new TypeError(`Unterminated quote at ${pos}: ${DEBUG_URL}`);
	            }
	        }
	        if (!value) {
	            throw new TypeError(`Missing parameter name at ${i}: ${DEBUG_URL}`);
	        }
	        return value;
	    }
	    while (i < chars.length) {
	        const value = chars[i];
	        const type = SIMPLE_TOKENS[value];
	        if (type) {
	            yield { type, index: i++, value };
	        }
	        else if (value === "\\") {
	            yield { type: "ESCAPED", index: i++, value: chars[i++] };
	        }
	        else if (value === ":") {
	            const value = name();
	            yield { type: "PARAM", index: i, value };
	        }
	        else if (value === "*") {
	            const value = name();
	            yield { type: "WILDCARD", index: i, value };
	        }
	        else {
	            yield { type: "CHAR", index: i, value: chars[i++] };
	        }
	    }
	    return { type: "END", index: i, value: "" };
	}
	class Iter {
	    constructor(tokens) {
	        this.tokens = tokens;
	    }
	    peek() {
	        if (!this._peek) {
	            const next = this.tokens.next();
	            this._peek = next.value;
	        }
	        return this._peek;
	    }
	    tryConsume(type) {
	        const token = this.peek();
	        if (token.type !== type)
	            return;
	        this._peek = undefined; // Reset after consumed.
	        return token.value;
	    }
	    consume(type) {
	        const value = this.tryConsume(type);
	        if (value !== undefined)
	            return value;
	        const { type: nextType, index } = this.peek();
	        throw new TypeError(`Unexpected ${nextType} at ${index}, expected ${type}: ${DEBUG_URL}`);
	    }
	    text() {
	        let result = "";
	        let value;
	        while ((value = this.tryConsume("CHAR") || this.tryConsume("ESCAPED"))) {
	            result += value;
	        }
	        return result;
	    }
	}
	/**
	 * Tokenized path instance.
	 */
	class TokenData {
	    constructor(tokens) {
	        this.tokens = tokens;
	    }
	}
	dist.TokenData = TokenData;
	/**
	 * Parse a string for the raw tokens.
	 */
	function parse(str, options = {}) {
	    const { encodePath = NOOP_VALUE } = options;
	    const it = new Iter(lexer(str));
	    function consume(endType) {
	        const tokens = [];
	        while (true) {
	            const path = it.text();
	            if (path)
	                tokens.push({ type: "text", value: encodePath(path) });
	            const param = it.tryConsume("PARAM");
	            if (param) {
	                tokens.push({
	                    type: "param",
	                    name: param,
	                });
	                continue;
	            }
	            const wildcard = it.tryConsume("WILDCARD");
	            if (wildcard) {
	                tokens.push({
	                    type: "wildcard",
	                    name: wildcard,
	                });
	                continue;
	            }
	            const open = it.tryConsume("{");
	            if (open) {
	                tokens.push({
	                    type: "group",
	                    tokens: consume("}"),
	                });
	                continue;
	            }
	            it.consume(endType);
	            return tokens;
	        }
	    }
	    const tokens = consume("END");
	    return new TokenData(tokens);
	}
	/**
	 * Compile a string to a template function for the path.
	 */
	function compile(path, options = {}) {
	    const { encode = encodeURIComponent, delimiter = DEFAULT_DELIMITER } = options;
	    const data = path instanceof TokenData ? path : parse(path, options);
	    const fn = tokensToFunction(data.tokens, delimiter, encode);
	    return function path(data = {}) {
	        const [path, ...missing] = fn(data);
	        if (missing.length) {
	            throw new TypeError(`Missing parameters: ${missing.join(", ")}`);
	        }
	        return path;
	    };
	}
	function tokensToFunction(tokens, delimiter, encode) {
	    const encoders = tokens.map((token) => tokenToFunction(token, delimiter, encode));
	    return (data) => {
	        const result = [""];
	        for (const encoder of encoders) {
	            const [value, ...extras] = encoder(data);
	            result[0] += value;
	            result.push(...extras);
	        }
	        return result;
	    };
	}
	/**
	 * Convert a single token into a path building function.
	 */
	function tokenToFunction(token, delimiter, encode) {
	    if (token.type === "text")
	        return () => [token.value];
	    if (token.type === "group") {
	        const fn = tokensToFunction(token.tokens, delimiter, encode);
	        return (data) => {
	            const [value, ...missing] = fn(data);
	            if (!missing.length)
	                return [value];
	            return [""];
	        };
	    }
	    const encodeValue = encode || NOOP_VALUE;
	    if (token.type === "wildcard" && encode !== false) {
	        return (data) => {
	            const value = data[token.name];
	            if (value == null)
	                return ["", token.name];
	            if (!Array.isArray(value) || value.length === 0) {
	                throw new TypeError(`Expected "${token.name}" to be a non-empty array`);
	            }
	            return [
	                value
	                    .map((value, index) => {
	                    if (typeof value !== "string") {
	                        throw new TypeError(`Expected "${token.name}/${index}" to be a string`);
	                    }
	                    return encodeValue(value);
	                })
	                    .join(delimiter),
	            ];
	        };
	    }
	    return (data) => {
	        const value = data[token.name];
	        if (value == null)
	            return ["", token.name];
	        if (typeof value !== "string") {
	            throw new TypeError(`Expected "${token.name}" to be a string`);
	        }
	        return [encodeValue(value)];
	    };
	}
	/**
	 * Transform a path into a match function.
	 */
	function match(path, options = {}) {
	    const { decode = decodeURIComponent, delimiter = DEFAULT_DELIMITER } = options;
	    const { regexp, keys } = pathToRegexp(path, options);
	    const decoders = keys.map((key) => {
	        if (decode === false)
	            return NOOP_VALUE;
	        if (key.type === "param")
	            return decode;
	        return (value) => value.split(delimiter).map(decode);
	    });
	    return function match(input) {
	        const m = regexp.exec(input);
	        if (!m)
	            return false;
	        const path = m[0];
	        const params = Object.create(null);
	        for (let i = 1; i < m.length; i++) {
	            if (m[i] === undefined)
	                continue;
	            const key = keys[i - 1];
	            const decoder = decoders[i - 1];
	            params[key.name] = decoder(m[i]);
	        }
	        return { path, params };
	    };
	}
	function pathToRegexp(path, options = {}) {
	    const { delimiter = DEFAULT_DELIMITER, end = true, sensitive = false, trailing = true, } = options;
	    const keys = [];
	    const sources = [];
	    const flags = sensitive ? "" : "i";
	    const paths = Array.isArray(path) ? path : [path];
	    const items = paths.map((path) => path instanceof TokenData ? path : parse(path, options));
	    for (const { tokens } of items) {
	        for (const seq of flatten(tokens, 0, [])) {
	            const regexp = sequenceToRegExp(seq, delimiter, keys);
	            sources.push(regexp);
	        }
	    }
	    let pattern = `^(?:${sources.join("|")})`;
	    if (trailing)
	        pattern += `(?:${escape(delimiter)}$)?`;
	    pattern += end ? "$" : `(?=${escape(delimiter)}|$)`;
	    const regexp = new RegExp(pattern, flags);
	    return { regexp, keys };
	}
	/**
	 * Generate a flat list of sequence tokens from the given tokens.
	 */
	function* flatten(tokens, index, init) {
	    if (index === tokens.length) {
	        return yield init;
	    }
	    const token = tokens[index];
	    if (token.type === "group") {
	        const fork = init.slice();
	        for (const seq of flatten(token.tokens, 0, fork)) {
	            yield* flatten(tokens, index + 1, seq);
	        }
	    }
	    else {
	        init.push(token);
	    }
	    yield* flatten(tokens, index + 1, init);
	}
	/**
	 * Transform a flat sequence of tokens into a regular expression.
	 */
	function sequenceToRegExp(tokens, delimiter, keys) {
	    let result = "";
	    let backtrack = "";
	    let isSafeSegmentParam = true;
	    for (let i = 0; i < tokens.length; i++) {
	        const token = tokens[i];
	        if (token.type === "text") {
	            result += escape(token.value);
	            backtrack += token.value;
	            isSafeSegmentParam || (isSafeSegmentParam = token.value.includes(delimiter));
	            continue;
	        }
	        if (token.type === "param" || token.type === "wildcard") {
	            if (!isSafeSegmentParam && !backtrack) {
	                throw new TypeError(`Missing text after "${token.name}": ${DEBUG_URL}`);
	            }
	            if (token.type === "param") {
	                result += `(${negate(delimiter, isSafeSegmentParam ? "" : backtrack)}+)`;
	            }
	            else {
	                result += `([\\s\\S]+)`;
	            }
	            keys.push(token);
	            backtrack = "";
	            isSafeSegmentParam = false;
	            continue;
	        }
	    }
	    return result;
	}
	function negate(delimiter, backtrack) {
	    if (backtrack.length < 2) {
	        if (delimiter.length < 2)
	            return `[^${escape(delimiter + backtrack)}]`;
	        return `(?:(?!${escape(delimiter)})[^${escape(backtrack)}])`;
	    }
	    if (delimiter.length < 2) {
	        return `(?:(?!${escape(backtrack)})[^${escape(delimiter)}])`;
	    }
	    return `(?:(?!${escape(backtrack)}|${escape(delimiter)})[\\s\\S])`;
	}
	/**
	 * Stringify token data into a path string.
	 */
	function stringify(data) {
	    return data.tokens
	        .map(function stringifyToken(token, index, tokens) {
	        if (token.type === "text")
	            return escapeText(token.value);
	        if (token.type === "group") {
	            return `{${token.tokens.map(stringifyToken).join("")}}`;
	        }
	        const isSafe = isNameSafe(token.name) && isNextNameSafe(tokens[index + 1]);
	        const key = isSafe ? token.name : JSON.stringify(token.name);
	        if (token.type === "param")
	            return `:${key}`;
	        if (token.type === "wildcard")
	            return `*${key}`;
	        throw new TypeError(`Unexpected token: ${token}`);
	    })
	        .join("");
	}
	function isNameSafe(name) {
	    const [first, ...rest] = name;
	    if (!ID_START.test(first))
	        return false;
	    return rest.every((char) => ID_CONTINUE.test(char));
	}
	function isNextNameSafe(token) {
	    if ((token === null || token === void 0 ? void 0 : token.type) !== "text")
	        return true;
	    return !ID_CONTINUE.test(token.value[0]);
	}
	
	return dist;
}

var distExports = requireDist();

class Route extends EventTarget {
  #_settings
  #_enable
  #_active
  #_match
  constructor($settings = {}) {
    super();
    this.#settings = $settings;
  }
  get #settings() { return this.#_settings }
  set #settings($settings) {
    this.#_settings = $settings;
    for(const [$settingKey, $settingVal] of Object.entries($settings)) {
      Object.defineProperty(this, $settingKey, { value: $settingVal });
    }
  }
  get basename() { return this.#settings.basename }
  get enable() {
    if(this.#_enable !== undefined) return this.#_enable
    if(this.#settings.enable !== undefined) {
      this.#_enable = this.#settings.enable;
    }
    else { this.#_enable = true; }
    return this.#_enable
  }
  set enable($enable) {
    if(this.#_enable !== $enable) this.#_enable = $enable;
  }
  get active() {
    if(this.#_active !== undefined) return this.#_active
    if(this.#settings.active === undefined) { this.#_active = false; }
    return this.#_active
  }
  set active($active) {
    if(this.#_active !== $active) this.#_active = $active;
  }
  get match() {
    if(this.#_match !== undefined) return this.#_match
    this.#_match = distExports.match(this.basename);
    return this.#_match
  }
}

class RouteEvent extends Event {
  #settings
  constructor($type, $settings) {
    super($type, $settings);
    this.#settings = $settings;
  }
  get path() { return this.#settings.path }
  get route() { return this.#settings.route }
  get location() { return this.#settings.location }
}

const Settings$1 = { routes: {} };
const Options$1 = {};
class LocationRouter extends Core {
  #_window
  #_hashpath
  #_routes
  #_location
  #_route
  #_boundPopState
  constructor($settings, $options) {
    super(
      recursiveAssign(Settings$1, $settings),
      recursiveAssign(Options$1, $options),
    );
    this.window;
    this.enableEvents();
    // this.#popState()
  }
  get window() {
    if(this.#_window !== undefined) return this.#_window
    this.#_window = window;
    this.#_window.addEventListener('load', this.#boundPopState, { once: true });
    this.#_window.addEventListener('popstate', this.#boundPopState);
    return this.#_window
  }
  get hashpath() {
    if(this.#_hashpath !== undefined) return this.#_hashpath
    this.#_hashpath = (
      this.settings.hashpath === undefined
    ) ? false
      : this.settings.hashpath;
    return this.#_hashpath
  }
  get routes() {
    if(this.#_routes !== undefined) return this.#_routes
    this.#_routes = {};
    const routeEntries = Object.entries(this.settings.routes);
    for(const [$routePath, $routeSettings] of routeEntries) {
      this.setRoute($routePath, $routeSettings);
    }
    return this.#_routes
  }
  get location() { return this.#_location }
  get route() { return this.#_route }
  get #boundPopState() {
    if(this.#_boundPopState !== undefined) return this.#_boundPopState
    this.#_boundPopState = this.#popState.bind(this);
    return this.#_boundPopState
  }
  // Methods
  #popState() {
    const preterRoute = this.route;
    if(preterRoute) preterRoute.active = false;
    const { pathname, hash } = this.window.location;
    const path = (this.hashpath) ? hash.slice(1) : pathname;
    const { route, location } = this.#matchRoute(path);
    if(route && route?.enable) {
      route.active = true;
      location.state = history.state;
      location.pathname = this.window.location.pathname;
      location.hash = this.window.location.hash;
      location.search = this.window.location.search;
      delete location.path;
      this.#_route = route;
      this.#_location = location;
      this.dispatchEvent(
        new RouteEvent("route", { path, route, location })
      );
    }
    else {
      this.#_route = null;
      this.#_location = null;
      this.dispatchEvent(
        new RouteEvent("error", { path })
      );
    }
  }
  // Route Ability
  enableRoute($path) {
    const route = this.getRoute($path);
    route.enable = true;
    return route
  }
  disableRoute($path) {
    const route = this.getRoute($path);
    route.enable = false;
    return route
  }
  // Route Ministration 
  setRoute($routePath, $routeSettings) {
    const routeSettings = recursiveAssign({
      basename: $routePath,
    }, $routeSettings);
    this.#_routes[$routePath] = new Route(routeSettings);
    return this.#_routes[$routePath]
  }
  getRoute($routePath) {
    return this.#_routes[$routePath]
  }
  deleteRoute($routePath) {
    delete this.#_routes[$routePath];
    return this.#_routes[$routePath]
  }
  #matchRoute($path) {
    const routeEntries = Object.entries(this.routes);
    let routeEntryIndex = 0;
    let route = null;
    let location = null;
    iterateMatchEntries: 
    while(routeEntryIndex < routeEntries.length) {
      const [$routePath, $route] = routeEntries[routeEntryIndex];
      location = $route.match($path) || null;
      if(location) {
        route = $route;
        break iterateMatchEntries
      }
      routeEntryIndex++;
    }
    return { route, location }
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
  events: [],
};

var Options = {
  enableEvents: true
};

const ValidClassInstances = ["models", "views", "controls", "routers"];
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
    const routers = this.routers;
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
          routers[$routerClassName][$routerClassInstanceName] = $routerClassInstance;
        }
        else {
          const Router = ($routerClassName === 'location')
            ? LocationRouter
            : ($routerClassName === 'fetch')
              ? FetchRouter
              : undefined;
          if(Router !== undefined) {
            if(typeOf($routerClassInstance) === 'object') {
              routers[$routerClassName][$routerClassInstanceName] = new Router($routerClassInstance);
            }
            else if(typeOf($router) === 'array') {
              routers[$routerClassName][$routerClassInstanceName] = new Router(...$routerClassInstance);
            }
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
      if(ValidClassInstances.includes($className)) {
        this[$className] = $classInstances;
      }
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
