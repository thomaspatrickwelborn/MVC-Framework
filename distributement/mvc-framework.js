function impandEvents($propEvents) {
  if(!Array.isArray($propEvents)) { return $propEvents }
  const propEvents = {};
  for(const $propEvent of $propEvents) {
    const { path, type, listener, options } = $propEvent;
    const propEventSettings = `${$path} ${$type}`;
    if(options !== undefined) {
      propEvents[propEventSettings] = [listener, options];
    }
    else {
      propEvents[propEventSettings] = listener;
    }
  }
  return propEvents
}

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
    }
    else if(propEventSettings.length > 1) {
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

const Primitives = {
  'string': String, 
  'number': Number, 
  'boolean': Boolean, 
  'undefined': undefined,
  'null': null,
};
const PrimitiveKeys = Object.keys(Primitives);
const PrimitiveValues = Object.values(Primitives);
const Objects = {
  'object': Object,
  'array': Array,
};
const ObjectKeys = Object.keys(Objects);
const ObjectValues = Object.values(Objects);
const Types = Object.assign({}, Primitives, Objects);
const TypeKeys = Object.keys(Types);
const TypeValues = Object.values(Types);
const TypeMethods = [
 Primitives.String, Primitives.Number, Primitives.Boolean, 
 Objects.Object, Objects.Array
];

var Variables = /*#__PURE__*/Object.freeze({
  __proto__: null,
  ObjectKeys: ObjectKeys,
  ObjectValues: ObjectValues,
  Objects: Objects,
  PrimitiveKeys: PrimitiveKeys,
  PrimitiveValues: PrimitiveValues,
  Primitives: Primitives,
  TypeKeys: TypeKeys,
  TypeMethods: TypeMethods,
  TypeValues: TypeValues,
  Types: Types
});

var regularExpressions = {
  quotationEscape: /\.(?=(?:[^"]*"[^"]*")*[^"]*$)/,
};

function subpaths($path) {
  return $path.split(
    new RegExp(regularExpressions.quotationEscape)
  )
}
function keypaths($path) {
  const _subpaths = subpaths($path);
  _subpaths.pop();
  return _subpaths
}
function key($path) {
  return subpaths($path).pop()
}
function root($path) {
  return subpaths($path).shift()
}
function typeofRoot($path) {
  return (Number(root($path))) ? 'array' : 'object'
}
function parse$1($path) {
  return {
    subpaths: subpaths($path),
    keypaths: keypaths($path),
    key: key($path),
    root: root($path),
    typeofRoot: typeofRoot($path),
  }
}

var index$2 = /*#__PURE__*/Object.freeze({
  __proto__: null,
  key: key,
  keypaths: keypaths,
  parse: parse$1,
  root: root,
  subpaths: subpaths,
  typeofRoot: typeofRoot
});

const typeOf = ($data) => Object
  .prototype
  .toString
  .call($data).slice(8, -1).toLowerCase();

function typedObjectLiteral($object) {
  if(typeOf($object) === 'object') { return {} }
  else if(typeOf($object) === 'array') { return [] }
  else if(typeOf($object) === 'string') { return (
    $object === 'object'
  ) ? {} : (
    $object === 'array'
  ) ? []
    : undefined
  }
  else { return undefined }
}

function get($path, $value) {
  const subpaths = $path.split(new RegExp(regularExpressions.quotationEscape));
  const key = subpaths.pop();
  const tree = $value;
  let treeNode = tree;
  for(const $subpath of subpaths) {
    treeNode = treeNode[$subpath];
  }
  return treeNode[key]
}
function set($path, $value) {
  const {
    keypaths, key, typeofRoot
  } = parse$1($path);
  const tree = typedObjectLiteral(typeofRoot);
  let treeNode = tree;
  for(const $subpath of keypaths) {
    if(Number($subpath)) { treeNode[$subpath] = []; }
    else { treeNode[$subpath] = {}; }
    treeNode = treeNode[$subpath];
  }
  treeNode[key] = $value;
  return tree
}

var index$1 = /*#__PURE__*/Object.freeze({
  __proto__: null,
  get: get,
  set: set
});

function impandTree($root, $tree) {
  const typeofTree = typeof $tree;
  const typeofRoot = typeof $root;
  if(
    !['string', 'function'].includes(typeofTree) ||
    typeofRoot && typeofRoot !== 'object'
  ) { return undefined /*$root*/ }
  let tree = typedObjectLiteral($root);
  if(typeofRoot === 'object') {
    for(const [$rootKey, $rootValue] of Object.entries($root)) {
      if(typeofTree === 'string') { tree[$rootKey] = get($tree, $rootValue); }
      else if(typeofTree === 'function') { tree = $tree($rootValue); }
    }
  }
  return tree
}

function expandTree($root, $tree) {
  const typeofRoot = typeof $root;
  const typeofTree = typeof $tree;
  if(
    !['string', 'function'].includes(typeofTree)
  ) { return undefined }
  let tree;
  if($root && typeofRoot === 'object') {
    for(const [$rootKey, $rootValue] of Object.entries($root)) {
      if(typeofTree === 'string') { tree = set($tree, $rootValue); }
      else if(typeofTree === 'function') { tree = $tree($rootValue); }
    }
  }
  else {
    if(typeofTree === 'string') { tree = set($tree, $root); }
    else if(typeofTree === 'function') { tree = $tree($root); }
  }
  return tree
}

function isPropertyDefinition($propertyDefinition) {
  if(
    Object.getOwnPropertyDescriptor($propertyDefinition, 'type') &&
    (
      TypeValues.includes($propertyDefinition.type) ||
      TypeKeys.includes($propertyDefinition.type)
    ) || (
      typeof $propertyDefinition.type === 'object' &&
      Object.getOwnPropertyDescriptor($propertyDefinition.type, 'value') &&
      (
        TypeValues.includes($propertyDefinition.type.value) ||
        TypeKeys.includes($propertyDefinition.type.value)
      )
    )
  ) { return true } 
  else { return false }
}

function isPropertyValidator($propertyValidator) {
  if(
    Object.getOwnPropertyDescriptor($propertyValidator, 'value') &&
    (
      TypeValues.includes($propertyValidator.type) ||
      TypeKeys.includes($propertyValidator.type)
    ) || (
      typeof $propertyValidator.type === 'object' &&
      Object.getOwnPropertyDescriptor($propertyValidator.type, 'value') &&
      (
        TypeValues.includes($propertyValidator.type.value) ||
        TypeKeys.includes($propertyValidator.type.value)
      )
    )
  ) { return true } 
  else { return false }
}

function keytree($object) {
  const target = [];
  for(const [$key, $value] of Object.entries($object)) {
    if(typeof $value === 'object') {
      target.push([$key, keytree($value)]);
    }
    else {
      target.push($key);
    }
  }
  return target
}

function objectCount($object) {
  if($object && typeof $object !== 'object') return undefined 
  let count = 1;
  for(const [$key, $value] of Object.entries($object)) {
    if(typeof $value === 'object') { count += objectCount($value); }
  }
  return count
}

function pathkeytree($object) {
  const target = [];
  for(const [$key, $value] of Object.entries($object)) {
    target.push($key);
    if(typeof $value === 'object') {
      const subtarget = pathkeytree($value);
      for(const $subtarget of subtarget) {
        let path;
        if(typeof $subtarget === 'object') {
          path = [$key, ...$subtarget].join('.');
        }
        else {
          path = [$key, $subtarget].join('.');
        }
        target.push(path);
      }
    }
  }
  return target
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

function recursiveAssignConcat() {
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
        }
        else {
          if(Array.isArray($sourcePropValue)) {
            $target[$sourcePropKey] = $target[$sourcePropKey]
              .concat(recursiveAssignConcat($sourcePropValue));
          }
          else {
            $target[$sourcePropKey] = recursiveAssignConcat(
              $target[$sourcePropKey], $sourcePropValue
            );
          }
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

function typedObjectLiteralFromPath($path) {
  subpaths($path);
  let tree = (Number($path[0])) ?  [] : {};
  return tree
}

var index = /*#__PURE__*/Object.freeze({
  __proto__: null,
  expandEvents: expandEvents,
  expandTree: expandTree,
  impandEvents: impandEvents,
  impandTree: impandTree,
  isPropertyDefinition: isPropertyDefinition,
  isPropertyValidator: isPropertyValidator,
  keytree: keytree,
  objectCount: objectCount,
  path: index$2,
  pathkeytree: pathkeytree,
  recursiveAssign: recursiveAssign,
  recursiveAssignConcat: recursiveAssignConcat,
  regularExpressions: regularExpressions,
  tree: index$1,
  typeOf: typeOf,
  typedObjectLiteral: typedObjectLiteral,
  typedObjectLiteralFromPath: typedObjectLiteralFromPath,
  variables: Variables
});

var CoreClassEvents = {
  Assign: "addEventListener",
  Deassign: "removeEventListener"
};

// Core Class Instantiation
function CoreClassInstantiator($propertyClass, $property, $value) {
  const { core, target, Class, Names } = $propertyClass;
  const valueInstanceOfClass = $value instanceof Class;
  let value;
  const parent = core;
  const path = (core.path)
    ? [core.path, Names.Multiple.Nonformal, $property].join('.')
    : [Names.Multiple.Nonformal, $property].join('.');
  if(valueInstanceOfClass === false) {
    const propertyClassInstanceParameters = [].concat($value);
    const $settings = Object.assign({ path, parent }, propertyClassInstanceParameters.shift());
    const $options = propertyClassInstanceParameters.shift();
    value = new Class($settings, $options);
  }
  else if(valueInstanceOfClass === true) {
    if($value.parent === undefined && $value.path === undefined) {
      $value.parent = parent;
      $value.path = path;
    }
    value = $value;
  }
  return value
}
// Core Class Deinstantiation
function CoreClassDeinstantiator($propertyClass, $property) {
  const { target } = $propertyClass;
  // NOOP
  return target[$property]
}

class ContentEvent extends Event {
  #settings
  #content
  #key
  constructor($type, $settings, $content) {
    super($type, $settings);
    this.#settings = $settings;
    this.#content = $content;
    this.#content.addEventListener(
      $type, 
      ($event) => {
        if(this.#content.parent !== null) {
          const { path, value, detail, change } = $event;
          this.#content.parent.dispatchEvent(
            new ContentEvent(
              this.type, 
              { path, value, detail, change },
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
  get key() {
    if(this.#key !== undefined) { return this.#key }
    if(this.path) { this.#key = this.path.split('.').pop(); }
    else { this.#key = null; }
    return this.#key
  }
  get change() { return this.#settings.change }
  get value() { return this.#settings.value }
  get path() { return this.#settings.path }
  get detail() { return this.#settings.detail }
}

let ValidatorEvent$1 = class ValidatorEvent extends Event {
  #settings
  #content
  #key
  #path
  #value
  #valid
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
                key: $event.key,
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
  get key() {
    if(this.#key !== undefined) { return this.#key }
    this.#key = this.#settings.key;
    return this.#key
  }
  get path() {
    if(this.#path !== undefined) { return this.#path }
    this.#path = this.#settings.path;
    return this.#path
  }
  get value() {
    if(this.#value !== undefined) { return this.#value }
    this.#value = this.#settings.value;
    return this.#value
  }
  get valid() {
    if(this.#valid !== undefined) { return this.#valid }
    this.#valid = this.#settings.valid;
    return this.#valid
  }
};

function assign() {
  const $content = Array.prototype.shift.call(arguments);
  const $options = Array.prototype.shift.call(arguments);
  const { path, target, schema, proxy } = $content;
  const { enableValidation, validationEvents } = $content.options;
  const { sourceTree } = $options;
  const events = ($content.options.events !== undefined) ? $content.options.events : $options.events;
  const assignSources = [...arguments];
  const assignedSources = [];
  // Iterate Sources
  for(let $assignSource of assignSources) {
    let assignedSource;
    if(Array.isArray($assignSource)) { assignedSource = []; }
    else if(typeof $assignSource === 'object') { assignedSource = {}; }
    // Iterate Source Props
    iterateSourceProps:
    for(let [$assignSourcePropKey, $assignSourcePropVal] of Object.entries($assignSource)) {
      let targetPropVal = target[$assignSourcePropKey];
      const targetPropValIsContentInstance = (
        target[$assignSourcePropKey]?.classToString === Content.toString()
      ) ? true : false;
      // Validation
      if(schema && enableValidation) {
        const validSourceProp = schema.validateProperty(
          $assignSourcePropKey, $assignSourcePropVal, $assignSource, proxy
        );
        if(validationEvents) {
          let type, propertyType;
          if(validSourceProp.valid) {
            type = 'validProperty';
            propertyType = ['validProperty', $assignSourcePropKey].join(':');
          }
          else {
            type = 'nonvalidProperty';
            propertyType = ['nonvalidProperty', $assignSourcePropKey].join(':');
          }
          for(const $eventType of [type, propertyType]) {
            $content.dispatchEvent(new ValidatorEvent$1($eventType, validSourceProp, $content));
          }
        }
        if(!validSourceProp.valid) { continue iterateSourceProps }
      }
      const change = {
        preter: {
          key: $assignSourcePropKey,
          value: target[$assignSourcePropKey],
        },
        anter: {
          key: $assignSourcePropKey,
          value: undefined,
        },
        conter: undefined
      };
      // Source Prop: Object Type
      if($assignSourcePropVal && typeof $assignSourcePropVal === 'object') {
        if($assignSourcePropVal.classToString === Content.toString()) {
          $assignSourcePropVal = $assignSourcePropVal.object;
        }
        // Subschema
        let subschema;
        if(schema?.type === 'array') { subschema = schema.context[0]; }
        else if(schema?.type === 'object') { subschema = schema.context[$assignSourcePropKey]; }
        else { subschema = null; }
        // Content
        const contentPath = (path)
          ? [path, $assignSourcePropKey].join('.')
          : String($assignSourcePropKey);
        let contentTypedLiteral = typedObjectLiteral($assignSourcePropVal);
        // Assignment
        let assignment;
        // Source Tree: False
        if(sourceTree === false) {
          targetPropVal = new Content(contentTypedLiteral, subschema, 
            recursiveAssign({}, $content.options, {
              path: contentPath,
              parent: proxy,
            })
          );
          targetPropVal.assign($assignSourcePropVal);
          assignment = { [$assignSourcePropKey]: targetPropVal };
        }
        // Source Tree: true
        else {
          // Assignment: Existing Content Instance
          if(targetPropValIsContentInstance) {
            targetPropVal.assign($assignSourcePropVal);
          }
          // Assignment: New Content Instance
          else {
            targetPropVal = new Content(contentTypedLiteral, subschema, 
              recursiveAssign({}, $content.options, {
                path: contentPath,
                parent: proxy,
              })
            );
            targetPropVal.assign($assignSourcePropVal);
          }
          assignment = { [$assignSourcePropKey]: targetPropVal };
        }
        // Assignment
        Object.assign(target, assignment);
        Object.assign(assignedSource, assignment);
      }
      // Source Prop: Primitive Type
      else {
        let assignment = {
          [$assignSourcePropKey]: $assignSourcePropVal
        };
        // Assign Root
        Object.assign(target, assignment);
        // Assigned Source
        Object.assign(assignedSource, assignment);
      }
      change.anter.value = targetPropVal;
      change.conter = (targetPropValIsContentInstance)
        ? (targetPropVal.string !== JSON.stringify(targetPropVal))
        : (JSON.stringify(targetPropVal) !== JSON.stringify(targetPropVal));
      change.anter.value = targetPropVal;
      // Content Event: Assign Source Property
      if(events) {
        const contentEventPath = (path) ? [path, $assignSourcePropKey].join('.') : String($assignSourcePropKey);
        if(events['assignSourceProperty:$key']) {
          const type = ['assignSourceProperty', $assignSourcePropKey].join(':');
          $content.dispatchEvent(
            new ContentEvent(type, {
              path: contentEventPath,
              value: $assignSourcePropVal,
              change,
              detail: {
                key: $assignSourcePropKey,
                value: $assignSourcePropVal,
                source: $assignSource,
              }
            }, $content)
          );
        }
        if(events['assignSourceProperty']) {
          $content.dispatchEvent(
            new ContentEvent('assignSourceProperty', {
              path: contentEventPath,
              value: $assignSourcePropVal,
              change,
              detail: {
                key: $assignSourcePropKey,
                value: $assignSourcePropVal,
                source: $assignSource,
              }
            }, $content)
          );
        }
      }
    }
    assignedSources.push(assignedSource);
    // Content Event: Assign Source
    if(events && events['assignSource']) {
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
  if(events && events['assign']) {
    $content.dispatchEvent(
      new ContentEvent('assign', { 
        path,
        detail: {
          sources: assignedSources
        },
      }, $content)
    );
  }
  return proxy
}

function defineProperties() {
  const $arguments = [...arguments];
  const [$content, $options, $propertyDescriptors] = $arguments;
  const { events } = $options;
  const { path, proxy } = $content;
  // const {} = $content.options
  const propertyDescriptorEntries = Object.entries($propertyDescriptors);
  impandTree($propertyDescriptors, 'value');
  typedObjectLiteral($content.object);
  // Iterate Property Descriptors
  for(const [
    $propertyKey, $propertyDescriptor
  ] of propertyDescriptorEntries) {
    // Property Descriptor Value Is Direct Instance Of Array/object/Map
    proxy.defineProperty($propertyKey, $propertyDescriptor, $propertyDescriptors);
  }
  // Define Properties Event
  if(events && events['defineProperties']) {
    // Define Properties Validator Event
    $content.dispatchEvent(
      new ContentEvent(
        'defineProperties',
        {
          path,
          value: proxy,
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
  const $arguments = [...arguments];
  let [
    $content, $options, 
    $propertyKey, $propertyDescriptor, 
    $propertyDescriptors
  ] = $arguments;
  $propertyDescriptors = $propertyDescriptors || {};
  const { descriptorTree, events } = $options;
  const { target, path, schema, proxy } = $content;
  const { enableValidation, validationEvents } = $content.options;
  const propertyValue = $propertyDescriptor.value;
  const targetPropertyDescriptor = Object.getOwnPropertyDescriptor(target, $propertyKey) || {};
  const targetPropertyValue = targetPropertyDescriptor.value;
  const targetPropertyValueIsContentInstance = (
    targetPropertyValue?.classToString === Content.toString()
  ) ? true : false;
  // Validation
  if(schema && enableValidation) {
    const validProperty = schema.validateProperty($propertyKey, propertyValue, $propertyDescriptors, proxy);
    if(validationEvents) {
      let type, propertyType;
      if(validProperty.valid) {
        type = 'validProperty';
        propertyType = ['validProperty', $propertyKey].join(':');
      }
      else {
        type = 'nonvalidProperty';
        propertyType = ['nonvalidProperty', $propertyKey].join(':');
      }
      for(const $eventType of [type, propertyType]) {
        $content.dispatchEvent(new ValidatorEvent$1($eventType, validProperty, $content));
      }
    }
    if(!validProperty.valid) { return proxy }
  }
  const change = {
    preter: {
      key: $propertyKey,
      value: target[$propertyKey],
    },
    anter: {
      key: $propertyKey,
      value: undefined,
    },
    conter: undefined,
  };
  // Property Descriptor Value: Object Type
  if(typeof propertyValue === 'object') {
    // Subschema
    let subschema;
    if(schema.type === 'array') { subschema = schema.context[0]; }
    else if(schema.type === 'object') { subschema = schema.context[$propertyKey]; }
    else { subschema = undefined;}
    // Root Property Descriptor Value: Existent Content Instance
    const contentPath = (path)
      ? [path, $propertyKey].join('.')
      : String($propertyKey);
    if(targetPropertyValueIsContentInstance) {
      // Descriptor Tree: true
      if(descriptorTree === true) {
        // propertyValue = Object.assign(propertyValue, { path: contentPath, parent: proxy })
        targetPropertyValue.defineProperties(propertyValue);
      }
      // Descriptor Tree: false
      else {
        Object.defineProperty(target, $propertyKey, $propertyDescriptor);
      }
    }
    // Root Property Descriptor Value: New Content Instance
    else {
      let _target = typedObjectLiteral(propertyValue);
      const contentObject = new Content(
        _target, subschema, {
          path: contentPath,
          parent: proxy,
        }
      );
      // Root Define Properties, Descriptor Tree
      if(descriptorTree === true) {
        contentObject.defineProperties(propertyValue);
        target[$propertyKey] = contentObject;
      } else 
      // Root Define Properties, No Descriptor Tree
      if(descriptorTree === false) {
        Object.defineProperty(target, $propertyKey, $propertyDescriptor);
      }
    }
  }
  // Property Descriptor Value: Primitive Type
  else {
    Object.defineProperty(target, $propertyKey, $propertyDescriptor);
  }
  change.anter.value = propertyValue;
  change.conter = (targetPropertyValueIsContentInstance)
    ? (targetPropertyValue.string !== JSON.stringify(propertyValue))
    : (JSON.stringify(targetPropertyValue) !== JSON.stringify(propertyValue));
  // Define Property Event
  if(events) {
    const contentEventPath = (path)
      ? [path, $propertyKey].join('.')
      : String($propertyKey);
    if(events['defineProperty']) {
      $content.dispatchEvent(
        new ContentEvent('defineProperty', {
          path: contentEventPath,
          value: propertyValue,
          change, 
          detail: {
            prop: $propertyKey,
            descriptor: $propertyDescriptor,
          },
        }, $content
      ));
    }
    if(events['defineProperty:$key']) {
      const type = ['defineProperty', $propertyKey].join(':');
      $content.dispatchEvent(
        new ContentEvent(type, {
          path: contentEventPath,
          value: propertyValue,
          change, 
          detail: {
            prop: $propertyKey,
            descriptor: $propertyDescriptor,
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
  const { target, path } = $content;
  const { proxy } = $content;
  if(recursive === true) {
    for(const [
      $propertyKey, $propertyValue
    ] of Object.entries(target)) {
      if($propertyValue.classToString === Content.toString()) {
        $propertyValue.freeze();
      }
      else { Object.freeze($propertyValue); }
      if(events && events['freeze']) {
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
  Object.freeze(target);
  return proxy
}

function seal() {
  const $content = Array.prototype.shift.call(arguments);
  const $options = Array.prototype.shift.call(arguments);
  const { recursive, events } = $options;
  const { target, path } = $content;
  const { proxy } = $content;
  if(recursive === true) {
    for(const [
      $propertyKey, $propertyValue
    ] of Object.entries(target)) {
      if($propertyValue.classToString === Content.toString()) {
        $propertyValue.seal();
      }
      else { Object.seal($propertyValue); }
      if(events && events['seal']) {
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
  Object.seal(target);
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
  const { target, path, schema } = $content;
  const { enableValidation, validationEvents } = $content.options;
  const { proxy } = $content;
  const $arguments = [...arguments].reduce(($arguments, $argument) => {
    if(Array.isArray($argument)) { $arguments.push(...$argument); }
    else { $arguments.push($argument); }
    return $arguments
  }, []);
  let valueIndex = target.length;
  const values = [];
  let targetConcat = [...Array.from(target)];
  let proxyConcat;
  iterateValues: 
  for(const $value of $arguments) {
    // Validation: Value
    if(schema && enableValidation) {
      const validValue = schema.validateProperty(valueIndex, $subvalue, {}, proxy);
      if(schema &&validationEvents) {
        let type, propertyType;
        if(validValue.valid) {
          type = 'validProperty';
          propertyType = ['validProperty', ':', valueIndex].join('');
        }
        else {
          type = 'nonvalidProperty';
          propertyType = ['nonvalidProperty', ':', valueIndex].join('');
        }
        for(const $eventType of [type, propertyType]) {
          $content.dispatchEvent(new ValidatorEvent($eventType, validValue, $content));
        }
      }
      if(!validValue.valid) { valueIndex++; continue iterateValues }
    }
    const contentPath = (path)
      ? [path, valueIndex].join('.')
      : String(valueIndex);
    // Value: Object Type
    if(typeof $value === 'object') {
      // Value: Content
      if($value?.classToString === Content.toString()) { $value = $value.object; }
      let subschema = schema?.context[0] || null;
      const value = new Content($value, subschema, {
        path: contentPath,
        parent: proxy,
      });
      values[valueIndex] = value;
    }
    // Value: Primitive Type
    else {
      values[valueIndex] = $value;
    }
    targetConcat = Array.prototype.concat.call(targetConcat, values[valueIndex]);
    if(events) {
      const contentEventPath = (path)
        ? [path, valueIndex].join('.')
        : String(valueIndex);
      if(events['concatValue']) {
        $content.dispatchEvent(
          new ContentEvent('concatValue', {
            path: contentEventPath,
            value: values[valueIndex],
            detail: {
              valueIndex,
              value: values[valueIndex],
            },
          }, $content)
        );
      }
      if(events['concatValue:$index']) {
        $content.dispatchEvent(
          new ContentEvent('concatValue', {
            path: contentEventPath,
            value: values[valueIndex],
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
  proxyConcat = new Content(targetConcat, schema, $content.options);
  if(events && events['concat']) {
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
  const { target, path } = $content;
  const { enableValidation, validationEvents } = $content.options;
  const copyTarget = (
    arguments[0] >= 0
  ) ? arguments[0]
    : target.length = arguments[0];
  const start = (
    arguments[1] >= 0
  ) ? arguments[1]
    : target.length + arguments[1];
  const end = (
    arguments[2] === undefined
  ) ? target.length
    : (
    arguments[2] >= 0
  ) ? arguments[2]
    : target.length + arguments[2];
  const copiedItems = [];
  let copyIndex = start;
  let targetIndex = copyTarget;
  while(copyIndex < end) {
    const copyItem = target[copyIndex];
    copiedItems.push(copyItem);
    Array.prototype.copyWithin.call(
      target,
      targetIndex,
      copyIndex,
      copyIndex + 1
    );
    // Array Copy Within Index Event Data
    if(events) {
      const contentEventPath = (path)
        ? [path, copyIndex].join('.')
        : String(copyIndex);
      if(events['copyWithinIndex']) {
        $content.dispatchEvent(
          new ContentEvent(
            'copyWithinIndex',
            {
              path: contentEventPath,
              value: copyItem,
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
        $content.dispatchEvent(
          new ContentEvent(
            type,
            {
              path: contentEventPath,
              value: copyItem,
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
  if(events && events['copyWithin']) {
    $content.dispatchEvent(
      new ContentEvent(
        'copyWithin',
        {
          path,
          detail: {
            target: copyTarget,
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
  const { target, path, schema } = $content;
  const { enableValidation, validationEvents } = $content.options;
  const { proxy } = $content;
  const $arguments = [...arguments];
  let $start;
  if(typeof $arguments[1] === 'number') {
    $start = ($arguments[1] >= 0)
      ? $arguments[1]
      : target.length + $arguments[1];
  }
  else { $start = 0; }
  let $end;
  if(typeof $arguments[2] === 'number') {
    $end = ($arguments[2] >= 0)
      ? $arguments[2]
      : target.length + $arguments[2];
  } else { $end = target.length; }
  let fillIndex = $start;
  iterateFillIndexes: 
  while(
    fillIndex < target.length &&
    fillIndex < $end
  ) {
    if(schema && enableValidation) {
      let validValue = schema.validate(validValue);
      if(validationEvents) {
        let type, propertyType;
        if(validValue.valid) {
          type = 'validProperty';
          propertyType = ['validProperty', ':', fillIndex].join('');
        }
        else {
          type = 'nonvalidProperty';
          propertyType = ['nonvalidProperty', ':', fillIndex].join('');
        }
        for(const $eventType of [type, propertyType]) {
          $content.dispatchEvent(new ValidatorEvent($eventType, validValue, $content));
        }
      }
      if(!validValue.valid) { continue iterateFillIndexes }
    }
    const contentPath = (path)
      ? [path, fillIndex].join('.')
      : String(fillIndex);
    let value = $arguments[0];
    if(typeof value === 'object') {
      if(value?.classToString === Content.toString()) { value = value.object; }
      const subschema = schema?.context[0] || null;
      value = new Content(value, subschema, {
        path: contentPath,
        parent: proxy,
      });
    }
    Array.prototype.fill.call(
      target, value, fillIndex, fillIndex + 1
    );
    // Array Fill Index Event
    if(events) {
      const contentEventPath = (path)
        ? [path, fillIndex].join('.')
        : String(fillIndex);
      if(events['fillIndex']) {
        $content.dispatchEvent(
          new ContentEvent('fillIndex', {
            path: contentEventPath, 
            value: value,
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
        $content.dispatchEvent(
          new ContentEvent(type, {
            path: contentEventPath, 
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
  if(events && events['fill']) {
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
  const { target, path } = $content;
  const popElement = Array.prototype.pop.call(target);
  const popElementIndex = target.length - 1;
  // Array Pop Event
  if(events && events['pop']) {
    const contentEventPath = (path)
      ? [path, popElementIndex].join('.')
      : String(popElementIndex);
    $content.dispatchEvent(
      new ContentEvent(
        'pop',
        {
          path: contentEventPath,
          value: popElement,
          detail: {
            elementIndex: popElementIndex,
            element: popElement,
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
  const { target, path, schema } = $content;
  const { enableValidation, validationEvents } = $content.options;
  const { proxy } = $content;
  const elements = [];
  let elementsIndex = 0;
  for(let $element of arguments) {
    // Validation
    if(schema && enableValidation) {
      const validElement = schema.validateProperty(elementsIndex, $element, {}, proxy);
      if(validationEvents) {
        let type, propertyType;
        if(validElement.valid) {
          type = 'validProperty';
          propertyType = ['validProperty', ':', elementsIndex].join('');
        }
        else {
          type = 'nonvalidProperty';
          propertyType = ['nonvalidProperty', ':', elementsIndex].join('');
        }
        for(const $eventType of [type, propertyType]) {
          $content.dispatchEvent(new ValidatorEvent($eventType, validElement, $content));
        }
      }
      if(!validElement.valid) { return target.length }
    }
    const contentPath = (path)
      ? [path, elementsIndex].join('.')
      : String(elementsIndex);
    if(typeof $element === 'object') {
      if($element?.classToString === Content.toString()) { $element = $element.object; }
      const subschema = schema?.context[0] || null;
      $element = new Content($element, subschema, {
        path: contentPath,
        parent: proxy,
      });
      elements.push($element);
      Array.prototype.push.call(target, $element);
    } else {
      elements.push($element);
      Array.prototype.push.call(target, $element);
    }
    if(events) {
      const contentEventPath = (path)
        ? [path, '.', elementsIndex].join('')
        : String(elementsIndex);
      if(events['pushProp']) {
        $content.dispatchEvent(
          new ContentEvent('pushProp', {
            path: contentEventPath,
            value: elements[elementsIndex],
            detail: {
              elementsIndex,
              element: elements[elementsIndex],
            },
          }, $content)
        );
      }
      if(events['pushProp:$index']) {
        const type = ['pushProp', ':', elementsIndex].join('');
        $content.dispatchEvent(
          new ContentEvent(type, {
            path: contentEventPath,
            value: elements[elementsIndex],
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
  if(events && events['push']) {
    $content.dispatchEvent(
      new ContentEvent('push', {
        path,
        detail: {
          elements,
        },
      }, $content)
    );
  }
  return target.length
}

function reverse() {
  const $content = Array.prototype.shift.call(arguments);
  const $options = Array.prototype.shift.call(arguments);
  const { events } = $options;
  const { target, path } = $content;
  const { proxy } = $content;
  Array.prototype.reverse.call(target, ...arguments);
  if(events && events['reverse']) {
    $content.dispatchEvent(
      new ContentEvent(
        'reverse',
        {
          path,
          detail: {
            reference: target
          },
        },
        $content
      )
    );
  }
  return proxy
}

function shift() {
  const [$content, $options] = [...arguments];
  const { events } = $options;
  const { target, path } = $content;
  const shiftElement = Array.prototype.shift.call(target);
  const shiftElementIndex = 0;
  // Array Shift Event
  if(events && events['shift']) {
    const contentEventPath = (path)
      ? [path, shiftElementIndex].join('.')
      : String(shiftElementIndex);
    $content.dispatchEvent(
      new ContentEvent(
        'shift',
        {
          path: contentEventPath,
          value: shiftElement,
          detail: {
            elementIndex: shiftElementIndex,
            element: shiftElement,
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
  const { target, path, schema } = $content;
  const { enableValidation, validationEvents } = $content.options;
  const $arguments = [...arguments];
  const $start = ($arguments[0] >= 0)
    ? $arguments[0]
    : target.length + $arguments[0];
  const $deleteCount = ($arguments[1] <= 0)
    ? 0
    : (
      $arguments[1] === undefined ||
      $start + $arguments[1] >= target.length
    ) ? target.length - $start
      : $arguments[1];
  const $addItems = $arguments.slice(2);
  const addCount = $addItems.length;
  const deleteItems = [];
  let deleteItemsIndex = 0;
  while(deleteItemsIndex < $deleteCount) {
    const deleteItem = Array.prototype.splice.call(target, $start, 1)[0];
    deleteItems.push(deleteItem);
    // Array Splice Delete Event
    if(events) {
      const contentEventPath = (path)
        ? [path, deleteItemsIndex].join('.')
        : String(deleteItemsIndex);
      if(events['spliceDelete']) {
        $content.dispatchEvent(
          new ContentEvent('spliceDelete', {
            path: contentEventPath,
            value: deleteItem,
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
        $content.dispatchEvent(
          new ContentEvent(type, {
            path: contentEventPath,
            value: deleteItem,
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
      const validAddItem = schema.validateProperty(elementIndex, element, {}, proxy);
      if(validationEvents) {
        let type, propertyType;
        if(validAddItem.valid) {
          type = 'validProperty';
          propertyType = ['validProperty', ':', addItemsIndex].join('');
        }
        else {
          type = 'nonvalidProperty';
          propertyType = ['nonvalidProperty', ':', addItemsIndex].join('');
        }
        for(const $eventType of [type, propertyType]) {
          $content.dispatchEvent(new ValidatorEvent($eventType, validAddItem, $content));
        }
      }
      if(!validAddItem.valid) { addItemsIndex++; continue spliceAdd }
    }
    const contentPath = (path)
      ? [path, addItemsIndex].join('.')
      : String(addItemsIndex);
    let startIndex = $start + addItemsIndex;
    // Add Item: Object Type
    if(typeof addItem === 'object') {
      if(addItem?.classToString === Content.toString()) { addItem = addItem.object; }
      const subschema = schema?.context[0] || null;
      addItem = new Content(addItem, subschema, {
        path: contentPath,
        parent: proxy,
      });
      Array.prototype.splice.call(
        target, startIndex, 0, addItem
      );
    }
    // Add Item: Primitive Type
    else {
      Array.prototype.splice.call(
        target, startIndex, 0, addItem
      );
    }
    // Array Splice Add Event
    if(events) {
      const contentEventPath = (path)
        ? [path, addItemsIndex].join('.')
        : String(addItemsIndex);
      if(events['spliceAdd']) {
        $content.dispatchEvent(
          new ContentEvent('spliceAdd', {
            path: contentEventPath,
            value: addItem,
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
        $content.dispatchEvent(
          new ContentEvent(type, {
            path: contentEventPath,
            value: addItem,
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
  if(events && events['splice']) {
    $content.dispatchEvent(
      new ContentEvent('splice', {
        path,
        detail: {
          $start,
          deleted: deleteItems,
          added: $addItems,
          length: target.length,
        },
      },
      $content)
    );
  }
  return deleteItems
}

function unshift() {
  const $arguments = [...arguments];
  const [$content, $options] = [...$arguments];
  const { events } = $options;
  const { target, path, schema, proxy } = $content;
  const { enableValidation, validationEvents } = $content.options;
  const elements = [];
  const elementsLength = $arguments.length;
  let elementIndex = elementsLength - 1;
  let elementCoindex = 0;
  while(elementIndex > -1) {
    let $element = $arguments[elementIndex];
    let element;
    const targetElement = target[elementIndex];
    const targetElementIsContentInstance = (
      targetElement?.classToString === Content.toString()
    ) ? true : false;
    // Validation
    if(schema && enableValidation) {
      const validElement = schema.validateProperty(elementIndex, $element, {}, proxy);
      if(validationEvents) {
        let type, propertyType;
        if(validElement.valid) {
          type = 'validProperty';
          propertyType = ['validProperty', ':', elementCoindex].join('');
        }
        else {
          type = 'nonvalidProperty';
          propertyType = ['nonvalidProperty', ':', elementCoindex].join('');
        }
        for(const $eventType of [type, propertyType]) {
          $content.dispatchEvent(new ValidatorEvent$1($eventType, validElement, $content));
        }
      }
      if(!validElement.valid) { return proxy.length }
    }
    const change = {
      preter: {
        key: elementCoindex,
        value: target[elementCoindex],
      },
      anter: {
        key: elementCoindex,
        value: undefined,
      },
      conter: undefined,
    };
    // Element: Object Type
    if(typeof $element === 'object') {
      const subschema = schema?.context[0] || null;
      const contentPath = (path)
        ? path.concat('.', elementCoindex)
        : String(elementCoindex);
      element = new Content($element, subschema, {
        path: contentPath,
        parent: proxy,
      });
      elements.unshift(element);
      Array.prototype.unshift.call(target, element);
    }
    // Element: Primitive Type
    else {
      element = $element;
      elements.unshift(element);
      Array.prototype.unshift.call(target, $element);
    }
    change.anter.value = element;
    change.conter = (targetElementIsContentInstance)
      ? (targetElement.string !== JSON.stringify(element))
      : (JSON.stringify(targetElement) !== JSON.stringify(element));
    // Array Unshift Prop Event
    if(events) {
      const type = ['unshiftProp', elementCoindex].join(':');
      const contentEventPath = (path)
        ? [path, elementCoindex].join('.')
        : String(elementCoindex);
      if(events['unshiftProp']) {
        $content.dispatchEvent(
          new ContentEvent('unshiftProp', {
            path: contentEventPath,
            value: element,
            change,
            detail: {
              elementIndex: elementCoindex, 
              element: element,
            },
          }, $content)
        );
      }
      if(events['unshiftProp:$index']) {
        $content.dispatchEvent(
          new ContentEvent(type, {
            path: contentEventPath,
            value: element,
            change,
            detail: {
              elementIndex: elementCoindex, 
              element: element,
            },
          }, $content)
        );
      }

    }
    elementIndex--;
    elementCoindex++;
  }
  // Array Unshift Event
  if(events && events['unshift'] && elements.length) {
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
  const { target, path } = $content;
  const ulteroptions = Object.assign({}, $options, arguments[0] || {});
  const { events } = ulteroptions;
  // Get Property Event
  if(events && events['get']) {
    $content.dispatchEvent(
      new ContentEvent('get', {
        path,
        value: proxy,
        detail: {
          value: proxy
        }
      }, $content)
    );
  }
  return proxy
}

function getContentProperty() {
  const [$content, $options, $path, $ulteroptions] = [...arguments];
  const { target, path } = $content;
  const { proxy } = $content;
  // Arguments
  const ulteroptions = recursiveAssign({
    pathkey: $content.options.pathkey,
    subpathError: $content.options.subpathError,
  }, $options, $ulteroptions);
  const { events, pathkey, subpathError } = ulteroptions;
  // Path Key: true
  if(pathkey === true) {
    const subpaths = $path.split(new RegExp(regularExpressions.quotationEscape));
    const propertyKey = subpaths.shift();
    let propertyValue = target[propertyKey];
    // Return: Subproperty
    if(subpaths.length) {
      // Subpath Error
      if(subpathError === false && propertyValue === undefined) { return undefined }
      return propertyValue.get(subpaths.join('.'), ulteroptions)
    }
    // Get Property Event
    if(events) {
      if(events['getProperty']) {
        $content.dispatchEvent(
          new ContentEvent('getProperty', {
            path,
            value: propertyValue,
            detail: {
              key: propertyKey,
              value: propertyValue,
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
              value: propertyValue,
            }
          }, $content)
        );
      }
    }
    return propertyValue
  }
  // Path Key: false
  else if(pathkey === false) {
    const propertyValue = target[propertyKey];
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
  const { path, proxy } = $content;
  // Delete Preterproperties
  // proxy.delete()
  proxy.delete({
    events: {
      ['delete']: false, 
      ['deleteProperty']: false, 
      ['deleteProperty:$key']: false
    }
  });
  // Arguments
  const $value = arguments[0];
  // Ulteroptions
  const ulteroptions = Object.assign({
    setObject: $value
  }, $options, arguments[1]);
  const contentOptions = $content.options;
  contentOptions.traps.accessor.set = ulteroptions;
  const { events } = ulteroptions;
  // Set Anterproperties
  const properties = Object.entries($value);
  for(const [$propertyKey, $propertyValue] of properties) {
    proxy.set($propertyKey, $propertyValue, ulteroptions);
  }
  // Set Property Event
  if(events && events['set']) {
    $content.dispatchEvent(
      new ContentEvent('set', {
        path,
        value: $value,
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
  const [$content, $options, $path, $value, $ulteroptions] = [...arguments];
  const { target, path, schema, proxy } = $content;
  const { enableValidation, validationEvents } = $content.options;
  // Options
  const ulteroptions = recursiveAssign({
    pathkey: $content.options.pathkey,
    subpathError: $content.options.subpathError,
  }, $options, $ulteroptions);
  const contentOptions = $content.options;
  // contentOptions.traps.accessor.set = ulteroptions
  const { events, pathkey, subpathError, recursive, setObject } = ulteroptions;
  // Path Key: true
  if(pathkey === true) {
    // Subpaths
    const subpaths = $path.split(new RegExp(regularExpressions.quotationEscape));
    // Property Key
    const propertyKey = subpaths.shift();
    // Property Value
    let propertyValue;
    const contentPath = (path)
      ? [path, propertyKey].join('.')
      : String(propertyKey);
    // Return: Subproperty
    if(subpaths.length) {
      if(recursive && target[propertyKey] === undefined) {
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
          path: contentPath,
          parent: proxy,
        }));
      }
      else {
        propertyValue = target[propertyKey];
      }
      // Subpath Error
      if(subpathError === false && propertyValue === undefined) { return undefined }
      propertyValue.set(subpaths.join('.'), $value, ulteroptions);
      return propertyValue
    }
    // Validation
    if(schema && enableValidation) {
      const validTargetProp = schema.validateProperty(propertyKey, $value, setObject, proxy);
      if(validationEvents) {
        let type, propertyType;
        if(validTargetProp.valid) {
          type = 'validProperty';
          propertyType = ['validProperty', ':', propertyKey].join('');
        }
        else {
          type = 'nonvalidProperty';
          propertyType = ['nonvalidProperty', ':', propertyKey].join('');
        }
        for(const $eventType of [type, propertyType]) {
          $content.dispatchEvent(new ValidatorEvent$1($eventType, validTargetProp, $content));
        }
      }
      if(!validTargetProp.valid) { return }
    }
    const change = {
      preter: {
        key: propertyKey,
        value: target[propertyKey],
      },
      anter: {
        key: propertyKey,
        value: $value,
      },
      conter: undefined,
    };
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
          path: contentPath,
          parent: proxy,
        }
      ));
    }
    // Value: Primitive Literal
    else {
      propertyValue = $value;
    }
    // Root Assignment
    target[propertyKey] = propertyValue;
    // Set Property Event
    if(events) {
      const contentEventPath = (path)
        ? [path, propertyKey].join('.')
        : String(propertyKey);
      if(events['setProperty']) {
        $content.dispatchEvent(
          new ContentEvent('setProperty', {
            path: contentEventPath, 
            value: propertyValue,
            change,
            detail: {
              key: propertyKey,
              value: propertyValue,
            }
          }, $content)
        );
      }
      if(events['setProperty:$key']) {
        const type = ['setProperty', ':', propertyKey].join('');
        $content.dispatchEvent(
          new ContentEvent(type, {
            path: contentEventPath, 
            value: propertyValue,
            change,
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
      const contentPath = (path)
        ? [path, propertyKey].join('.')
        : String(propertyKey);
      propertyValue = new Content($value, subschema, Object.assign(
        {}, contentOptions, {
          path: contentPath,
          parent: proxy,
        }
      ));
    }
    // Property Value: Primitive Literal
    else { propertyValue = $value; }
    // Root Assignment
    target[propertyKey] = propertyValue;
    // Set Property Event
    if(events) {
      const contentEventPath = (path)
        ? [path, propertyKey].join('.')
        : String(propertyKey);
      if(events['setProperty']) {
        $content.dispatchEvent(
          new ContentEvent('setProperty', {
            path: contentEventPath, 
            value: propertyValue,
            detail: {
              key: propertyKey,
              value: propertyValue,
            }
          }, $content)
        );
      }
      if(events['setProperty:$key']) {
        const type = ['setProperty', ':', propertyKey].join('');
        $content.dispatchEvent(
          new ContentEvent(type, {
            path: contentEventPath, 
            value: propertyValue,
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
  const { target, path, schema, proxy } = $content;
  const { enableValidation, validationEvents } = $content.options;
  // Arguments
  const ulteroptions = Object.assign({}, $options, arguments[0], { validationEvents: false });
  const { events } = ulteroptions;
  const targetPropertyEntries = Object.entries(target);
  for(const [$targetPropertyKey, $targetPropertyValue] of targetPropertyEntries) {
    proxy.delete($targetPropertyKey, ulteroptions);
  }
  // Delete Property Event
  if(events && events['delete']) {
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
  const [$content, $options, $path, $ulteroptions] = [...arguments];
  const { target, path, schema, proxy } = $content;
  const { enableValidation, /* validationEvents */ } = $content.options;
  // Arguments
  const ulteroptions = recursiveAssign({
    pathkey: $content.options.pathkey,
    subpathError: $content.options.subpathError,
  }, $options, $ulteroptions);
  const { events, pathkey, subpathError, /* validationEvents */ } = ulteroptions;
  const validationEvents = ($options.validationEvents !== undefined)
    ? $options.validationEvents
    : $content.options.validationEvents; 
  // Path Key: true
  if(pathkey === true) {
    const subpaths = $path.split(new RegExp(regularExpressions.quotationEscape));
    const propertyKey = subpaths.shift();
    let propertyValue = target[propertyKey];

    // Return: Subproperty
    if(subpaths.length) {
      // Subpath Error
      if(subpathError === false && propertyValue === undefined) { return undefined }
      return propertyValue.delete(subpaths.join('.'), ulteroptions)
    }
    // Validation
    if(schema && enableValidation) {
      const differedPropertyProxy = proxy.object;
      delete differedPropertyProxy[propertyKey];
      const validTargetProp = schema.validate(propertyKey, differedPropertyProxy, {}, proxy);
      if(validationEvents) {
        let type, propertyType;
        const validatorEventPath = (path)
          ? [path, propertyKey].join('.')
          : String(propertyKey);
        if(validTargetProp.valid) {
          type = 'validProperty';
          propertyType = ['validProperty', ':', propertyKey].join('');
        }
        else {
          type = 'nonvalidProperty';
          propertyType = ['nonvalidProperty', ':', propertyKey].join('');
        }
        for(const $eventType of [type, propertyType]) {
          $content.dispatchEvent(
            new ValidatorEvent($eventType, Object.assign(validTargetProp, {
              path: validatorEventPath
            }), $content)
          );
        }
      }
      if(!validTargetProp.valid) { return }
    }
    if(typeof propertyValue === 'object') {
      propertyValue.delete(ulteroptions);
    }
    delete target[propertyKey];
    // Delete Property Event
    if(events) {
      if(events['deleteProperty']) {
        $content.dispatchEvent(
          new ContentEvent('deleteProperty', {
            path,
            value: propertyValue,
            detail: {
              key: propertyKey,
              value: propertyValue,
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
            value: propertyValue,
            detail: {
              value: propertyValue,
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
    const propertyValue = target[propertyKey];

    // Validation
    if(schema && enableValidation) {
      const differedPropertyProxy = proxy.object;
      delete differedPropertyProxy[propertyKey];
      const validTargetProp = schema.validate(propertyKey, differedPropertyProxy, $content, proxy);
      if(validationEvents) {
        let type, propertyType;
        if(validTargetProp.valid) {
          type = 'validProperty';
          propertyType = ['validProperty', ':', propertyKey].join('');
        }
        else {
          type = 'nonvalidProperty';
          propertyType = ['nonvalidProperty', ':', propertyKey].join('');
        }
        for(const $eventType of [type, propertyType]) {
          $content.dispatchEvent(
            new ValidatorEvent($eventType, validTargetProp, $content)
          );
        }
      }
      if(!validTargetProp.valid) { return }
    }
  
    if(propertyValue instanceof Content) {
      propertyValue.delete(ulteroptions);
    }
    delete target[propertyKey];
    // Delete Property Event
    if(events) {
      if(events['deleteProperty']) {
        $content.dispatchEvent(
          new ContentEvent('deleteProperty', {
            path,
            value: propertyValue,
            detail: {
              key: propertyKey,
              value: propertyValue,
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
            value: propertyValue,
            detail: {
              value: propertyValue,
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
          const { target } = $content;
          return Array.prototype.entries.call(target)
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
          const { target } = $content;
          return Object.getOwnPropertyDescriptor(target, ...arguments)
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
          const { target } = $content;
          return Array.prototype[$methodName].call(target)
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
          const { target } = $content;
          return Array.prototype[$methodName].call(target, ...arguments)
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

let Handler$2 = class Handler {
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
    const { target, schema, path } = content;
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
};

class Verification extends EventTarget {
  #settings
  #message
  #pass
  constructor($settings) {
    super();
    this.#settings = $settings;
  }
  get type() { return this.#settings.type }
  get definition() { return this.#settings.definition }
  get key() { return this.#settings.key }
  get value() { return this.#settings.value }
  get message() {
    if(this.#message !== undefined) return this.#message
    if(
      this.pass !== undefined &&
      this.#message === undefined
    ) {
      this.#message = this.#settings.messages[String(this.pass)](this);
    }
    return this.#message
  }
  get pass() { return this.#pass }
  set pass($pass) {
    if(this.#pass === undefined) {
      this.#pass = $pass;
    }
  }
}

const Messages$1 = {
  'true': ($verification) => `${$verification.pass}`,
  'false': ($verification) => `${$verification.pass}`,
};
class Validator extends EventTarget {
  #boundValidate
  #definition
  #schema
  constructor($definition = {}, $schema) {
    super();
    this.definition = Object.freeze(
      Object.assign({ messages: Messages$1 }, $definition)
    );
    this.schema = $schema;
  }
  get definition() { return this.#definition }
  set definition($definition) { this.#definition = $definition; }
  get schema() { return this.#schema }
  set schema($schema) {
    if(this.#schema !== undefined) { return this.#schema }
    this.#schema = $schema;
    return this.#schema
  }
  get type() { return this.definition.type }
  get messages() { return this.definition.messages }
  get validate() {
    function validate($key, $value, $source, $target) {
      const definition = this.definition;
      const verification = new Verification({
        type: this.type,
        definition: definition,
        key: $key,
        value: $value,
        messages: recursiveAssign(this.messages, definition.messages),
      });
      verification.pass = definition.validate(...arguments);
      return verification
    }
    this.#boundValidate = validate.bind(this);
    return this.#boundValidate
  }
}

class RequiredValidator extends Validator {
  constructor($definition, $schema) {
    super(Object.assign($definition, {
      type: 'required',
      validate: ($key, $value, $source, $target) => {
        this.definition;
        let pass;
        const { requiredProperties, requiredPropertiesSize, type } = this.schema;
        if(requiredPropertiesSize === 0/* || definition.value === false*/) { pass = true; }
        else if(type === 'object') {
          const corequiredContextProperties = typedObjectLiteral(type);
          const corequiredContentProperties = typedObjectLiteral(type);
          iterateRequiredProperties: 
          for(const [
            $requiredPropertyName, $requiredProperty
          ] of Object.entries(requiredProperties)) {
            const requiredProperty = recursiveAssign({}, $requiredProperty);
            // ?:START
            requiredProperty.required.value = false;
            // ?:STOP
            if($requiredPropertyName === $key) { continue iterateRequiredProperties }
            const sourcePropertyDescriptor = Object.getOwnPropertyDescriptor($source, $requiredPropertyName);
            if(sourcePropertyDescriptor !== undefined) {
              corequiredContextProperties[$requiredPropertyName] = requiredProperty;
              corequiredContentProperties[$requiredPropertyName] = sourcePropertyDescriptor.value;
            }
            else if($target) {
              const targetPropertyDescriptor = Object.getOwnPropertyDescriptor($target, $requiredPropertyName);
              if(targetPropertyDescriptor !== undefined) { continue iterateRequiredProperties }
              else { corequiredContextProperties[$requiredPropertyName] = requiredProperty; }
            }
            else {
              corequiredContextProperties[$requiredPropertyName] = requiredProperty;
            }
          }
          const corequiredContextPropertiesSize = Object.keys(corequiredContextProperties).length;
          const corequiredContentPropertiesSize = Object.keys(corequiredContentProperties).length;
          if(corequiredContextPropertiesSize === 0 && corequiredContentPropertiesSize === 0) { pass = true; }
          else if(corequiredContextPropertiesSize !== corequiredContentPropertiesSize) { pass = false; }
          else {
            const coschema = new Schema(corequiredContextProperties, Object.assign({}, this.schema.options, {
              required: false 
            }));
            const validations = [];
            for(const [
              $corequiredContextPropertyName, $corequiredContextProperty
            ] of Object.entries(corequiredContentProperties)) {
              const corequiredContentPropertyName = $corequiredContextPropertyName;
              const corequiredContentProperty = corequiredContentProperties[corequiredContentPropertyName];
              const coschemaPropertyValidation = coschema.validateProperty(
                $corequiredContextPropertyName, corequiredContentProperty,
                $source, $target
              );
              validations.push(coschemaPropertyValidation);
            }
            const nonvalidValidation = (validations.find(($validation) => $validation.valid === false));
            if(nonvalidValidation) { pass = false; }
            else { pass = true; }
          }
        }
        else if(type === 'array') {
          pass = true;
        }
        return pass
      }
    }), $schema);
  }
}

class TypeValidator extends Validator {
  constructor($definition = {}, $schema) {
    super(Object.assign($definition, {
      type: 'type',
      validate: ($key, $value) => {
        const definition = this.definition;
        let pass;
        let typeOfDefinitionValue = typeOf(definition.value);
        typeOfDefinitionValue = (typeOfDefinitionValue === 'function')
          ? typeOf(definition.value())
          : typeOfDefinitionValue;
        const typeOfContentValue = typeOf($value);
        if(typeOfContentValue === 'undefined') { pass = false; }
        else if(typeOfDefinitionValue === 'undefined') { pass = true; }
        else { pass = (typeOfDefinitionValue === typeOfContentValue); }
        return pass
      },
    }), $schema);
  }
}

class RangeValidator extends Validator {
  constructor($definition = {}, $schema) {
    super(Object.assign($definition, {
      type: 'range',
      validate: ($key, $value) => {
        const definition = this.definition;
        let pass;
        if(typeof $value !== 'number') { pass = false; }
        else {
          const { min, max } = definition;
          let validMin, validMax;
          if(min !== undefined) { validMin = ($value >= min.value); }
          else { validMin = true; }
          if(max !== undefined) { validMax = ($value <= max.value); }
          else { validMax = true; }
          if(validMin && validMax) { pass = true; }
          else { pass = false;}
        }
        return pass
      }
    }), $schema);
  }
}

class LengthValidator extends Validator {
  constructor($definition = {}, $schema) {
    super(Object.assign($definition, {
      type: 'length',
      validate: ($key, $value) => {
        const definition = this.definition;
        let pass;
        if(typeof $value !== 'string') { pass = false; }
        else {
          const { min, max } = definition;
          let validMin, validMax;
          if(min !== undefined) {
            validMin = ($value.length >= min.value);
          }
          else { validMin = true; }
          if(max !== undefined) {
            validMax = ($value.length <= max.value);
          }
          else { validMax = true; }
          if(validMin && validMax) { pass = true; }          
          else { pass = false;}
        }
        return pass
      },
    }), $schema);
  }
}

class EnumValidator extends Validator {
  constructor($definition = {}, $schema) {
    super(Object.assign($definition, {
      type: 'enum',
      validate: ($key, $value) => {
        const definition = this.definition;
        let pass;
        if(![
          'string', 'number', 'boolean'
        ].includes(typeof $value)) { pass = false;}
        else {
          const enumeration = definition.value;
          pass = enumeration.includes($value);
        }
        return pass
      },
    }), $schema);
  }
}

class MatchValidator extends Validator {
  constructor($settings = {}, $schema) {
    super(Object.assign($settings, {
      type: 'match',
      validate: ($key, $value) => {
        const definition = this.settings;
        let pass;
        if(![
          'string', 'number', 'boolean'
        ].includes(typeof $value)) { pass = false;}
        else {
          const match = definition;
          (match.value.exec($value) !== null);
        }
        return pass ? true : false
      },
    }), $schema);
  }
}

let Handler$1 = class Handler {
  #context
  constructor($context) {
    this.#context = $context;
  }
};

class Context extends EventTarget {
  #properties
  #schema
  #type
  #proxy
  #target
  #_handler
  constructor($properties, $schema) {
    super();
    this.#properties = $properties;
    this.schema = $schema;
    return this.proxy
  }
  get required() { return this.schema.options.required }
  get schema() { return this.#schema }
  set schema($schema) {
    if(this.#schema !== undefined) return
    this.#schema = $schema;
    return this.#schema
  }
  get type() {
    if(this.#type !== undefined) return this.#type
    this.#type = typeOf(typedObjectLiteral(this.#properties));
    return this.#type
  }
  get proxy() {
    if(this.#proxy !== undefined) return this.#proxy
    this.#proxy = new Proxy(this.target, this.#handler);
    return this.#proxy
  }
  get #handler() {
    if(this.#_handler !== undefined) return this.#_handler
    this.#_handler = new Handler$1(this);
    return this.#_handler
  }
  get target() {
    if(this.#target !== undefined) return this.#target
    let properties;
    const target = typedObjectLiteral(this.type);
    if(this.type === 'array') {
      properties = this.#properties.slice(0, 1);
    }
    else if(this.type === 'object') {
      properties = this.#properties;
    }
    for(const [
      $propertyKey, $propertyDefinition
    ] of Object.entries(properties)) {
      const typeOfPropertyDefinition = typeOf($propertyDefinition);
      let propertyDefinition;
      // Property Definition: Schema
      if($propertyDefinition instanceof Schema) {
        propertyDefinition = $propertyDefinition;
      }
      // Property Definition: String, Number, Boolean, Object, Array, null, undefined
      else if(TypeValues.includes($propertyDefinition)) {
        propertyDefinition = expandTree($propertyDefinition, 'type.value');
      }
      // Property Definition: 'string', 'number', 'boolean', 'object', 'array', 'null', 'undefined'
      else if(TypeKeys.includes($propertyDefinition)) {
        propertyDefinition = expandTree(TypeValues[
          TypeKeys.indexOf($propertyDefinition)
        ], 'type.value');
      }
      // Property Definition: Object Literal
      else if(
        typeOfPropertyDefinition === 'object' || 
        typeOfPropertyDefinition === 'array'
      ) {
        let propertyDefinitionIsPropertyDefinition = isPropertyDefinition($propertyDefinition);
        if(propertyDefinitionIsPropertyDefinition === false) {
          const { path } = this.schema;
          const schemaPath = (path)
            ? [path, $propertyKey].join('.')
            : String($propertyKey);
          const parent = this.schema;
          propertyDefinition = new Schema($propertyDefinition, Object.assign({}, this.schema.options, {
            path: schemaPath,
            parent: parent,
          }));
        }
        else if(propertyDefinitionIsPropertyDefinition === true) {
          propertyDefinition = { validators: [] };
          // Property Definition: 
          iteratePropertyValidators: 
          for(const [
            $propertyValidatorName, $propertyValidator
          ] of Object.entries($propertyDefinition)) {
            if($propertyValidatorName === 'validators') { continue iteratePropertyValidators }
            const typeOfPropertyValidator = typeOf($propertyValidator);
            let propertyValidator;
            if(typeOfPropertyValidator && typeOfPropertyValidator === 'object') {
              propertyValidator = $propertyValidator;
            }
            else {
              propertyValidator = {
                value: $propertyValidator
              };
            }
            propertyDefinition[$propertyValidatorName] = propertyValidator;
          }
          $propertyDefinition.validators = $propertyDefinition.validators || [];
          for(const $propertyDefinitionValidator of $propertyDefinition.validators) {
            for(const $Validator of [
              RequiredValidator, TypeValidator, RangeValidator, LengthValidator, EnumValidator, MatchValidator
            ]) {
              if($propertyDefinitionValidator instanceof $Validator === false) {
                propertyDefinition.validators.push($propertyDefinitionValidator);
              }
            }
          }
        }
      }
      if(propertyDefinition instanceof Schema === false) {
        propertyDefinition = this.#parsePropertyDefinition(propertyDefinition);
      }
      target[$propertyKey] = propertyDefinition;
    }
    this.#target = target;
    return this.#target
  }
  #parsePropertyDefinition($propertyDefinition) {
    const propertyDefinition = $propertyDefinition;
    propertyDefinition.validators = [];
    const validators = new Map();
    const contextRequired = this.required;
    const {
      required,
      type,
      range, min, max, 
      length, minLength, maxLength, 
      match,
    } = propertyDefinition;
    // Required
    if(contextRequired === true) { validators.set('required', Object.assign({}, propertyDefinition.required, {
      type: 'required', value: true, validator: RequiredValidator 
    })); }
    else if(required?.value === true) { validators.set('required', Object.assign({}, propertyDefinition.required, {
      type: 'required', value: true, validator: RequiredValidator  }));
    }
    else { validators.set('required', Object.assign({}, propertyDefinition.required, {
      type: 'required', value: false, validator: RequiredValidator 
    })); }
    // Type
    if(type) { validators.set('type', Object.assign({}, type, {
      type: 'type', validator: TypeValidator
    })); }
    else { validators.set('type', Object.assign({}, type, {
      type: 'type', value: undefined, validator: TypeValidator
    })); }
    // Range
    if(range) { validators.set('range', Object.assign({}, range, {
      type: 'range', validator: RangeValidator
    })); }
    else if(min || max) { validators.set('range', Object.assign({}, {
      type: 'range', min, max, validator: RangeValidator
    })); }
    // Length
    if(length) { validators.set('length', Object.assign({}, length, {
      type: 'length', validator: LengthValidator
    })); }
    else if(minLength || maxLength) { validators.set('length', Object.assign({}, {
      type: 'length', min: minLength, max: maxLength, validator: LengthValidator
    })); }
    // Enum
    if(propertyDefinition.enum) { validators.set('enum', Object.assign({}, propertyDefinition.enum, {
      type: 'enum', validator: EnumValidator
    })); }
    // Match
    if(match) { validators.set('match', Object.assign({}, match, {
      type: 'match', validator: MatchValidator
    })); }
    delete propertyDefinition.min;
    delete propertyDefinition.max;
    delete propertyDefinition.minLength;
    delete propertyDefinition.maxLength;
    for(const [
      $validatorName, $validatorSettings
    ] of validators.entries()) {
      const ValidatorClass = $validatorSettings.validator;
      propertyDefinition[$validatorName] = $validatorSettings;
      propertyDefinition.validators.push(new ValidatorClass($validatorSettings, this.schema));
    }
    return propertyDefinition
  }
}

const Messages = {
  'true': ($validation) => `${$validation.valid}`,
  'false': ($validation) => `${$validation.valid}`,
};
class Validation extends EventTarget {
  #settings
  #properties
  #valid
  #advance = []
  #deadvance = []
  #unadvance = []
  constructor($settings = {}) {
    super();
    this.#settings = Object.assign({ messages: Messages }, $settings);
  }
  // get type() { return this.#settings.type }
  get definition() { return this.#settings.definition }
  get path() { return this.#settings.path }
  get key() { return this.#settings.key }
  get value() { return this.#settings.value }
  get properties() {
    if(this.#properties !== undefined) return this.#properties
    this.#properties = this.#settings.properties;
    return this.#properties
  }
  get advance() { return this.#advance }
  get deadvance() { return this.#deadvance }
  get unadvance() { return this.#unadvance }
  get valid() { return this.#valid }
  set valid($valid) {
    if(this.#valid === undefined) {
      this.#valid = $valid;
    }
  }
}

var Options$7 = {
  required: false,
  verificationType: 'all', // 'one'
};

class Schema extends EventTarget{
  #properties
  options
  #type
  #context
  #parent
  #key
  #path
  #requiredProperties
  #requiredPropertiesSize
  constructor($properties = {}, $options = {}) {
    super();
    this.#properties = $properties;
    this.options = Object.assign({}, Options$7, $options);
  }
  get type() {
    if(this.#type !== undefined) return this.#type
    this.#type = typeOf(typedObjectLiteral(this.#properties));
    return this.#type
  }
  get parent() {
    if(this.#parent !== undefined)  return this.#parent
    this.#parent = (this.options.parent) ? this.options.parent : null;
    return this.#parent
  }
  get root() {
    let root = this;
    iterateParents: 
    while(root) {
      if([undefined, null].includes(root.parent)) { break iterateParents }
      root = root.parent;
    }
    return root
  }
  get key() {
    if(this.#key !== undefined) { return this.#key }
    if(this.path) { this.#key = this.path.split('.').pop(); }
    else { this.#key = null; }
    return this.#key
  }
  get path() {
    if(this.#path !== undefined)  return this.#path
    this.#path = (this.options.path)
      ? String(this.options.path)
      : null;
    return this.#path
  }
  get required() { return this.options.required }
  get requiredProperties() {
    if(this.#requiredProperties !== undefined) return this.#requiredProperties
    let requiredProperties = typedObjectLiteral(this.type);
    for(const [$propertyKey, $propertyDefinition] of Object.entries(this.context)) {
      if($propertyDefinition.required?.value === true) { requiredProperties[$propertyKey] = $propertyDefinition; }
    }
    this.#requiredProperties = requiredProperties;
    return this.#requiredProperties
  }
  get requiredPropertiesSize() {
    if(this.#requiredPropertiesSize !== undefined) return this.#requiredPropertiesSize
    this.#requiredPropertiesSize = Object.keys(this.requiredProperties).length;
    return this.#requiredPropertiesSize
  }
  get verificationType() { return this.options.verificationType }
  get context() {
    if(this.#context !== undefined) return this.#context
    this.#context = new Context(this.#properties, this);
    return this.#context
  }
  #parseValidateArguments() {
    let $arguments = [...arguments];
    let $sourceName, $source, $target;
    if($arguments.length === 1) {
      $sourceName = null; $source = $arguments.shift(); $target = null;
    }
    else if($arguments.length === 2 && typeof $arguments[0] === 'string') {
      $sourceName = $arguments.shift(); $source = $arguments.shift(); $target = null;
    }
    else if($arguments.length === 2 && typeof $arguments[0] === 'object') {
      $sourceName = null; $source = $arguments.shift(); $target = $arguments.shift();
    }
    else if($arguments.length === 3 && typeof $arguments[0] === 'string') {
      $sourceName = $arguments.shift(); $source = $arguments.shift(); $target = $arguments.shift();
    }
    return { $sourceName, $source, $target }
  }
  validate() {
    const { $sourceName, $source, $target } = this.#parseValidateArguments(...arguments);
    const validation = new Validation({
      definition: this.context,
      path: this.path,
      key: $sourceName, 
      value: $source,
      properties: typedObjectLiteral(this.type),
    });
    const sourceProperties = Object.entries($source);
    let sourcePropertyIndex = 0;
    let deadvancedRequiredProperties = [];
    // Iterate Content Properties 
    while(sourcePropertyIndex < sourceProperties.length) {
      const [$sourceKey, $sourceValue] = sourceProperties[sourcePropertyIndex];
      const propertyValidation = this.validateProperty($sourceKey, $sourceValue, $source, $target);
      const deadvancedRequiredPropertyValidation = propertyValidation.deadvance.filter(
        ($verification) => $verification.type === 'required'
      );
      validation.properties[$sourceKey] = propertyValidation;
      if(propertyValidation.valid === true) { validation.advance.push(propertyValidation); } 
      else if(propertyValidation.valid === false) { validation.deadvance.push(propertyValidation); } 
      else if(propertyValidation.valid === undefined) { validation.unadvance.push(propertyValidation );}
      deadvancedRequiredProperties = deadvancedRequiredProperties.concat(deadvancedRequiredPropertyValidation);
      sourcePropertyIndex++;
    }
    if(this.required === true) {
      if(validation.deadvance.length) { validation.valid = false; }
      else if(validation.advance.length) { validation.valid = true; }
      else if(validation.unadvance.length) { validation.valid = undefined; }
      else { validation.valid = false; }
    }
    else if(this.required === false) {
      if(deadvancedRequiredProperties.length) { validation.valid = false; }
      else if(validation.advance.length) { validation.valid = true; }
      else if(validation.deadvance.length) { validation.valid = false; }
      else if(validation.unadvance.length) { validation.valid = undefined; }
      else { validation.valid = false; }
    }
    return validation
  }
  #parseValidatePropertyArguments() {
    let $arguments = [...arguments];
    let [$key, $value, $source, $target] = $arguments;
    const ContentClassString = Content.toString();
    const sourceIsContentClassInstance = ($source?.classToString === ContentClassString);
    $source = (sourceIsContentClassInstance) ? $source.object : $source;
    const $targetIsContentClassInstance = ($target?.classToString === ContentClassString);
    $target = ($targetIsContentClassInstance) ? $target.object : $target;
    return { $key, $value, $source, $target }
  }
  validateProperty() {
    const { $key, $value, $source, $target } = this.#parseValidatePropertyArguments(...arguments);
    let propertyDefinition;
    if(this.type === 'array') { propertyDefinition = this.context[0]; }
    else if(this.type === 'object') { propertyDefinition = this.context[$key]; }
    const { path } = this;
    const propertyValidationPath = (path) ? [path, $key].join('.') : $key;
    const propertyValidation = new Validation({
      // type: this.required,
      definition: propertyDefinition,
      path: propertyValidationPath,
      key: $key,
      value: $value,
    });
    // Context Value: Undefined
    if(propertyDefinition === undefined) {
      const verification = new Verification({
        type: null,
        definition: null,
        key: $key,
        value: $value,
      }, this);
      verification.pass = false;
      propertyValidation.unadvance.push(verification);
    }
    // Context Value: Object
    else if(propertyDefinition instanceof Schema) {
      let validation;
      if($target && $target[$key]) { validation = propertyDefinition.validate($key, $value, $target[$key]); }
      else { validation = propertyDefinition.validate($key, $value); }
      if(validation.valid === true) { propertyValidation.advance.push(validation); }
      else if(validation.valid === false) { propertyValidation.deadvance.push(validation); }
      else if(validation.valid === undefined) { propertyValidation.unadvance.push(validation); }
    }
    // Context Value: Primitive
    else {
      iterateContextValueValidators:
      for(const [$validatorIndex, $validator] of Object.entries(propertyDefinition.validators)) {
        const verification = $validator.validate($key, $value, $source, $target);
        if(verification.pass === true) { propertyValidation.advance.push(verification); }
        else if(verification.pass === false) { propertyValidation.deadvance.push(verification); }
        else if(verification.pass === undefined) { propertyValidation.unadvance.push(verification); }
        if(this.verificationType === 'one' && propertyValidation.deadvance.length) { break iterateContextValueValidators }
      }
    }
    if(propertyValidation.deadvance.length) { propertyValidation.valid = false; }
    else if(propertyValidation.advance.length) { propertyValidation.valid = true; }
    else if(propertyValidation.unadvance.length) { propertyValidation.valid = false; }
    return propertyValidation
  }
}

var Options$6 = {
  path: null, 
  parent: null, 
  enableValidation: true, 
  validationEvents: {
    'validProperty:$key': true,
    'validProperty': true,
    'nonvalidProperty:$key': true,
    'nonvalidProperty': true,
  },
  pathkey: true,
  subpathError: false,
  proxyAssignmentMethod: 'set',
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
  }
};

class Content extends EventTarget {
  #_properties
  #options
  #schema
  #type
  #target
  #parent
  #key
  #path
  #proxy
  #_handler
  constructor($properties = {}, $schema = null, $options = {}) {
    super();
    this.#properties = $properties;
    this.options = $options;
    this.schema = $schema;
    const { proxyAssignmentMethod } = this.options;
    const { proxy } = this;
    if(['set', 'assign'].includes(proxyAssignmentMethod)) {
      proxy[proxyAssignmentMethod](this.#properties);
    }
    else {
      proxy[Options$6.proxyAssignmentMethod](this.#properties);
    }
    return proxy
  }
  get #properties() { return this.#_properties }
  set #properties($properties) {
    if(this.#_properties !== undefined) return
    if($properties?.classToString === Content.toString()) {
      this.#_properties = $properties.object;
    }
    this.#_properties = $properties;
    return this.#_properties
  }
  get options() { return this.#options }
  set options($options) {
    if(this.#options !== undefined) return
    this.#options = recursiveAssign({}, Options$6, $options);
    return this.#options
  }
  get schema() { return this.#schema }
  set schema($schema) {
    if(this.#schema !== undefined)  { return }
    const typeOfSchema = typeOf($schema);
    if(['undefined', 'null'].includes(typeOfSchema)) { this.#schema = null; }
    else if(
      $schema instanceof Schema
    ) { this.#schema = $schema; }
    else if(typeOfSchema === 'array') { this.#schema = new Schema(...arguments); }
    else if(typeOfSchema === 'object') { this.#schema = new Schema($schema); }
  }
  get classToString() { return Content.toString() }
  get object() { return this.#parse({ type: 'object' }) }
  get string() { return this.#parse({ type: 'string' }) }
  get type() {
    if(this.#type !== undefined) return this.#type
    this.#type = typeOf(this.#properties);
    return this.#type
  }
  get parent() {
    if(this.#parent !== undefined)  return this.#parent
    this.#parent = (this.options.parent) ? this.options.parent : null;
    return this.#parent
  }
  get root() {
    let root = this;
    iterateParents: 
    while(root) {
      if([undefined, null].includes(root.parent)) { break iterateParents }
      root = root.parent;
    }
    return root
  }
  get key() {
    if(this.#key !== undefined) { return this.#key }
    if(this.path) { this.#key = this.path.split('.').pop(); }
    else { this.#key = null; }
    return this.#key
  }
  get path() {
    if(this.#path !== undefined)  return this.#path
    this.#path = (this.options.path)
      ? String(this.options.path)
      : null;
    return this.#path
  }
  get target() {
    if(this.#target !== undefined) return this.#target
    this.#target = typedObjectLiteral(this.#properties);
    return this.#target
  }
  get proxy() {
    if(this.#proxy !== undefined) return this.#proxy
    this.#proxy = new Proxy(this.target, this.#handler);
    return this.#proxy
  }
  get #handler() {
    if(this.#_handler !== undefined) return this.#_handler
    this.#_handler = new Handler$2(this, {
      traps: this.options.traps,
    });
    return this.#_handler
  }
  #parse($settings = {
    type: 'object',
    replacer: null,
    space: 0,
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
    const { type, replacer, space } = $settings;
    if(type === 'object' || type === 'Object') {
      return parsement
    }
    else if(type === 'string' || type === 'String') {
      return JSON.stringify(parsement, replacer, space)
    }
    else { return undefined }
  }
}

class CoreEvent {
  #settings
  #enable = false
  #_boundListener
  constructor($settings) { 
    this.#settings = $settings;
    this.enable = this.#settings.enable;
  }
  get type() { return this.#settings.type }
  get path() { return this.#settings.path }
  get target() {
    let target = this.#context;
    const pathKeys = this.path.split('.');
    let pathKeysIndex = 0;
    iterateTargetPathKeys: 
    while(pathKeysIndex < pathKeys.length) {
      if(target === undefined) { break iterateTargetPathKeys }
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
      pathKeysIndex++;
    }
    return target
  }
  get listener() { return this.#settings.listener }
  get options() { return this.#settings.options }
  get enable() { return this.#enable }
  set enable($enable) {
    if(
      $enable === this.#enable ||
      this.target === undefined
    ) { return }
    const eventAbility = (
      $enable === true
    ) ? this.#propertyClassEvents.Assign
      : this.#propertyClassEvents.Deassign;
    if(
      this.target instanceof NodeList ||
      Array.isArray(this.target)
    ) {
      for(const $target of this.target) {
        $target[eventAbility](this.type, this.#boundListener, this.options);
      }
      this.#enable = $enable;
    }
    else if(this.target instanceof EventTarget) {
      this.target[eventAbility](this.type, this.#boundListener, this.options);
      this.#enable = $enable;
    }
    else {
      try {
        this.target[eventAbility](this.type, this.#boundListener, this.options);
        this.#enable = $enable;
      } catch($err) {}
    }
  }
  get #propertyClassEvents() { return this.#settings.propertyClassEvents }
  get #context() { return this.#settings.context }
  get #boundListener() {
    if(this.#_boundListener !== undefined) { return this.#_boundListener }
    this.#_boundListener = this.#settings.listener.bind(this.#context);
    return this.#_boundListener
  }
}

class Handler {
  #propertyClass
  constructor($propertyClass) {
    this.#propertyClass = $propertyClass;
  }
  get get() {
    return function($target, $property) {
      return $target[$property]
    }
  }
  get set() {
    const { ClassInstantiator } = this.#propertyClass;
    return function($target, $property, $value) {
      $target[$property] = ClassInstantiator(this.#propertyClass, $property, $value);
      return true
    }
  }
  get deleteProperty() {
    const { ClassDeinstantiator } = this.#propertyClass;
    return function($target, $property) {
      ClassDeinstantiator(this.#propertyClass, $property);
      delete $target[$property];
      return true
    }
  }
}

class PropertyClass {
  #settings
  #core
  #target
  #handler
  #proxy
  constructor($settings, $core) {
    this.#settings = $settings;
    this.core = $core;
    if([
      this.ID, this.Name, this.Class, 
      this.Names.Monople.Formal, this.Names.Monople.Nonformal,
      this.Names.Multiple.Formal, this.Names.Multiple.Nonformal,
    ].includes(undefined)) { return undefined }
    return this.proxy
  }
  get core() { return this.#core }
  set core($core) {
    if(this.#core !== undefined) return
    this.#core = $core;
  }
  get target() {
    if(this.#target !== undefined) { return this.#target }
    this.#target = {};
    return this.#target
  }
  get handler() {
    if(this.#handler !== undefined) { return this.#handler }
    this.#handler = new Handler(this);
    return this.#handler
  }
  get proxy() {
    if(this.#proxy !== undefined) { return this.#proxy }
    this.#proxy = new Proxy(this.target, this.handler);
    return this.#proxy
  }
  get ID() { return this.#settings.ID }
  get Name() { return this.#settings.Name }
  get Class() { return this.#settings.Class }
  get ClassInstantiator() { return this.#settings.ClassInstantiator }
  get ClassDeinstantiator() { return this.#settings.ClassDeinstantiator }
  get Names() { return this.#settings.Names }
  get Events() { return this.#settings.Events }
}

var Settings$5 = {
  events: {},
  propertyClasses: {},
};

var Options$5 = {
  assign: [],
  defineProperties: {},
};

class Core extends EventTarget {
  #settings
  #options
  #events
  #key
  #path
  #parent
  #_propertyClassEvents
  #propertyClasses
  static propertyClasses = []
  constructor($settings = {}, $options = {}) {
    super();
    this.settings = $settings;
    this.options = $options;
    this.addPropertyClasses(this.settings.propertyClasses);
    for(const $propertyClass of this.propertyClasses) {
      const { Name, Names } = $propertyClass;
      this[`${Names.Minister.Ad.Nonformal}${Names.Multiple.Formal}`](this.settings[Name]);
      if(this.settings[Name] !== undefined) {
        this[Name] = this.settings[Name];
      }
    }
    this.addEvents(this.settings.events);
    this.#defineProperties(this.options.defineProperties);
    this.#assign(...this.options.assign);
  }
  get #propertyClassEvents() {
    if(this.#_propertyClassEvents !== undefined) return this.#_propertyClassEvents
    this.#_propertyClassEvents = {};
    for(const [$propertyClassName, $propertyClass] of Object.entries(this.propertyClasses)) {
      this.#_propertyClassEvents[$propertyClassName] = $propertyClass.Events;
    }
    return this.#_propertyClassEvents
  }
  get settings() { return this.#settings }
  set settings($settings) {
    if(this.#settings !== undefined) return
    this.#settings = Object.assign({}, Settings$5, $settings);
  }
  get options() { return this.#options }
  set options($options) {
    if(this.#options !== undefined) return
    this.#options = recursiveAssign(structuredClone(Options$5), $options);
  }
  get key() {
    if(this.#key !== undefined) return this.#key
    this.#key = this.path?.split('.').pop() || null;
    return this.#key
  }
  get path() {
    if(this.#path !== undefined) return this.#path
    this.#path = (this.settings.path !== undefined)
      ? this.settings.path
      : undefined;
    return this.#path
  }
  set path($path) {
    if(this.#path !== undefined) return
    this.#path = $path;
  }
  get parent() {
    if(this.#parent !== undefined) return this.#parent
    this.#parent = (
      this.settings.parent !== undefined
    ) ? this.settings.parent
      : undefined;
    return this.#parent
  }
  set parent($parent) {
    if(this.#parent !== undefined) return
    this.#parent = $parent;
  }
  get root() {
    let root = this;
    iterateRoots: 
    while(root) {
      if([undefined, null].includes(root.parent)) break iterateRoots
      root = root.parent;
    }
    return root
  }
  get events() {
    if(this.#events !== undefined) return this.#events
    this.#events = [];
    return this.#events
  }
  get propertyClasses() {
    if(this.#propertyClasses !== undefined) return this.#propertyClasses
    this.#propertyClasses = [];
    return this.#propertyClasses
  }
  getPropertyClass() {
    const { ID, Name } = arguments[0];
    let propertyClass;
    for(const $propertyClass of this.propertyClasses) {
      if(
        ID && $propertyClass.ID === ID ||
        Name && $propertyClass.Name === Name
      ) { propertyClass = $propertyClass; }
    }
    return propertyClass
  }
  addPropertyClasses() {
    if(!arguments[0]) { return this }
    const $this = this;
    let $propertyClasses;
    if(Array.isArray(arguments[0])) { $propertyClasses = arguments[0]; }
    else if(typeof arguments[0] === 'object') { $propertyClasses = Object.values(arguments[0]); }
    const propertyClasses = this.propertyClasses;
    for(const $propertyClass of $propertyClasses) {
      const propertyClassName = $propertyClass.Name;
      // Class Instantiator
      if($propertyClass.ClassInstantiator === undefined) {
        $propertyClass.ClassInstantiator = CoreClassInstantiator; 
      }
      // Class Deinstantiator
      if($propertyClass.ClassDeinstantiator === undefined) {
        $propertyClass.ClassDeinstantiator = CoreClassDeinstantiator; 
      }
      const { Events, Names } = $propertyClass;
      const propertyClassStoreName = `_${propertyClassName}`;
      Object.defineProperties(this, {
        // Property Class Store
        [propertyClassStoreName]: {
          configurable: true, enumerable: false, writable: true,
          value: undefined,
        },
        // Property Class
        [propertyClassName]: {
          configurable: true, enumerable: true,  
          get() {
            if($this[propertyClassStoreName] !== undefined) {
              return $this[propertyClassStoreName]
            }
            $this[propertyClassStoreName] = new PropertyClass(
              $propertyClass, $this
            );
            return $this[propertyClassStoreName]
          },
          set($propertyClassInstances) {
            const propertyClassInstances = $this[propertyClassName];
            let propertyClassInstancesEntries;
            if($propertyClassInstances) {
              if(Array.isArray($propertyClassInstances)) {
                propertyClassInstancesEntries = $propertyClassInstances;
              }
              else {
                propertyClassInstancesEntries = Object.entries($propertyClassInstances);
              }
            } else { propertyClassInstancesEntries = []; }
            for(const [
              $propertyClassInstanceName, $propertyClassInstance
            ] of propertyClassInstancesEntries) {
              propertyClassInstances[$propertyClassInstanceName] = $propertyClassInstance;
            }
          }
        },
        // Add Property Class Instance
        [`${Names.Minister.Ad.Nonformal}${Names.Multiple.Formal}`]: {
          configurable: true, enumerable: true, writable: false, 
          value: function() {
            const $arguments = [...arguments];
            if($arguments.length === 1) {
              const [$values] = $arguments;
              if(Array.isArray($values)) {
                $this[propertyClassName] = Object.fromEntries($values);
              }
              else {
                $this[propertyClassName] = $values;
              }
            }
            else if($arguments.length === 2) {
              const [$key, $value] = $arguments;
              $this[propertyClassName] = { [$key]: $value };
            }
          }
        },
        // Remove Property Class Instance
        [`${Names.Minister.Dead.Nonformal}${Names.Multiple.Formal}`]: {
          configurable: true, enumerable: true, writable: false, 
          value: function() {
            const [$removeKeys] = [...arguments];
            const removeKeys = [];
            const typeofRemoveKeys = typeof $arguments[0];
            if(typeofRemoveKeys === 'string') { removeKeys.push($arguments[0]); }
            else if(typeofRemoveKeys === 'object') {
              if(Array.isArray($removeKeys)) { removeKeys.push(...$removeKeys); }
              else { removeKeys.push(...Object.keys($removeKeys)); }
            }
            else if(typeofRemoveKeys === 'undefined') {
              removeKeys.push(...Object.keys($this[propertyClassName]));
            }
            for(const $removeKey of $removeKeys) {
              delete $this[propertyClassName][$removeKey];
            }
          }
        },
      });
      propertyClasses.push($propertyClass);
    }
    return this
  }
  removePropertyClasses() {
    let removePropertyClasses = [];
    if(arguments.length === 0) { removePropertyClasses = removePropertyClasses.concat(
      Object.keys(this.propertyClasses)
    ); }
    else if(arguments.length === 1) {
      const $removePropertyClasses = arguments[0];
      const typeofRemovePropertyClasses = typeof $removePropertyClasses;
      if(
        typeofRemovePropertyClasses === 'string'
      ) {
        removePropertyClasses = removePropertyClasses.concat($removePropertyClasses);
      }
      else if(typeofRemovePropertyClasses === 'object') {
        if(Array.isArray($removePropertyClasses)) {
          removePropertyClasses = removePropertyClasses.concat($removePropertyClasses);
        }
        else {
          removePropertyClasses = removePropertyClasses.concat(Object.keys($removePropertyClasses));
        }
      }
    }
    iterateRemovePropertyClasses: 
    for(const $removePropertyClassName of removePropertyClasses) {
      const { Names } = this.getPropertyClass({ Name: $removePropertyClassName });
      if(!Names) break iterateRemovePropertyClasses
      const propertyClassInstances = this[Names.Multiple.Nonformal];
      for(const [
        $propertyClassInstanceName, $propertyClassInstance
      ] of Object.entries(this[Names.Multiple.Nonformal])) {
        delete propertyClassInstances[$propertyClassInstanceName];
      }
      delete this[`_${Names.Multiple.Nonformal}`];
      Object.defineProperty(this, Names.Multiple.Nonformal, {
        configurable: true, enumerable: false, writable: true, 
        value: undefined
      });
      delete this[Names.Multiple.Nonformal];
      delete this[`${Names.Minister.Ad.Nonformal}${Names.Multiple.Formal}`];
      delete this[`${Names.Minister.Dead.Nonformal}${Names.Multiple.Formal}`];
    }
    return this
  }
  getEvents() {
    const getEvents = [];
    const { events } = this;
    const $events = [].concat(arguments[0]);
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
    if(arguments[0] === undefined) { return this }
    const $events = expandEvents(arguments[0]);
    const { events } = this;
    for(let $event of $events) {
      const propertyClassName = $event.path.split('.').shift();
      const propertyClassEvents = Object.assign(
        {}, 
        CoreClassEvents,
        this.#propertyClassEvents[propertyClassName]?.Events,
        $event?.sign, 
      );
      $event = Object.assign(
        {}, 
        $event,
        {
          context: this,
          propertyClassEvents,
        }
      );
      const coreEvent = new CoreEvent($event);
      events.push(coreEvent);
    }
    return this
  }
  removeEvents() {
    const { events } = this;
    let $events;
    if(arguments.length === 0) { $events = events; }
    else if(arguments.length === 1) {
      $events = this.getEvents(arguments[0]);
    }
    if($events.length === 0) return this
    let eventsIndex = events.length - 1;
    while(eventsIndex > -1) {
      const event = events[eventsIndex];
      const removeEventIndex = $events.findIndex(
        ($event) => $event === event
      );
      if(removeEventIndex !== -1) {
        event.enable = false;
        events.splice(eventsIndex, 1);
      }
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
    Object.assign(this, ...arguments);
    return this
  }
  #defineProperties() {
    Object.defineProperties(this, arguments[0]);
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
  #db = localStorage
  #path
  constructor($path) {
    super();
    this.path = $path;
  }
  get path() { return this.#path }
  set path($path) {
    if(this.#path !== undefined) return
    this.#path = $path;
  }
  get() {
    try{ return JSON.parse(this.#db.getItem(this.path)) }
    catch($err) { console.log($err); }
    return
  }
  set($content) {
    try { return this.#db.setItem(this.path, JSON.stringify($content)) }
    catch($err) { console.log($err); }
    return
  }
  remove() {
    try { return this.#db.removeItem(this.path) }
    catch($err) { console.log($err); }
    return
  }
}

var Settings$4 = {
  schema: undefined, // Schema Settings
  content: undefined, // Content Settings
};

var Options$4 = {
  schema: undefined, // Schema Options
  content: undefined, // Content Options
  enableEvents: true, // Boolean
  autoload: false, // Boolean
  autosave: false, // Boolean
  changeEvents: true, // Boolean
  localStorage: false, // Boolean, String,
};

class ChangeEvent extends CustomEvent {
  #settings
  #content
  #key
  constructor($type, $settings, $content) {
    super($type, $settings);
    this.#settings = $settings;
  }
  get originalEvent() { return this.#settings.originalEvent }
  get key() {
    if(this.#key !== undefined) { return this.#key }
    if(this.path) { this.#key = this.path.split('.').pop(); }
    else { this.#key = null; }
    return this.#key
  }
  get change() { return this.#settings.change }
  get value() { return this.#settings.value }
  get path() { return this.#settings.path }
  get detail() { return this.#settings.detail }
}

const ChangeEvents = [
  // Accessor
  "getProperty", "setProperty", "deleteProperty", 
  // Array
  "concatValue", "copyWithinIndex", "fillIndex", "pushProp", 
  "spliceDelete", "spliceAdd", "unshiftProp", 
  // Object
  "assignSourceProperty", "defineProperty",
];
class Model extends Core {
  #schema
  #content
  #localStorage
  #changeEvents
  constructor($settings, $options) {
    super(
      recursiveAssign({}, Settings$4, $settings), 
      recursiveAssign({}, Options$4, $options),
    );
    if(
      !this.settings.content ||
      typeof this.settings.content !== 'object'
    ) { return null }
    this.changeEvents = this.options.changeEvents;
    const { enableEvents } = this.options;
    if(enableEvents) this.enableEvents();
  }
  get schema() {
    if(this.#schema !== undefined) return this.#schema
    const { schema } = this.settings;
    if(!schema) { this.#schema = null; }
    else if(schema instanceof Schema) { this.#schema = schema; }
    else {
      this.#schema = new Schema(
        schema, this.options.schema
      );
    }
    return this.#schema
  }
  get content() {
    if(this.#content !== undefined) return this.#content
    const { content } = this.settings;
    const { localStorage, autoload, autosave } = this.options;
    let properties;
    if(localStorage && autoload) {
      const localStorageProperties = this.localStorage.get();
      if(localStorageProperties) {
        properties = localStorageProperties; 
      }
    }
    else if(content?.classToString === Content.toString()) {
      properties = content.object;
    }
    else {
      properties = content;
    }
    if(properties !== undefined) {
      this.#content = new Content(properties, this.schema, this.options.content);
    }
    return this.#content
  }
  get localStorage() {
    if(this.#localStorage !== undefined) { return this.#localStorage }
    const { localStorage } = this.settings;
    let path;
    if(localStorage !== undefined) {
      if(typeof localStorage === 'string') {
        if(path[0] !== "/") { path = "/".concat(path); }
        else { path = localStorage; }
      }
      else if(localStorage === true) {
        path = [window.location.pathname];
        if(this.path) { path.push(path); }
        path = path.join('');
      }
      if(path !== undefined) { this.#localStorage = new LocalStorage(path); }
    }
    return this.#localStorage
  }
  get changeEvents() { return this.#changeEvents }
  set changeEvents($changeEvents) {
    if($changeEvents !== this.#changeEvents) {
      const boundPropertyChange = this.#propertyChange.bind(this);
      this.#changeEvents = $changeEvents;
      switch(this.#changeEvents) {
        case true:
          for(const $eventType of ChangeEvents) {
            this.content.addEventListener($eventType, boundPropertyChange);
          }
        break
        case false:
          for(const $eventType of ChangeEvents) {
            this.content.removeEventListener($eventType, boundPropertyChange);
          }
        break

      }
    }
  }
  #propertyChange($event) {
    this.save();
    const { type, path, value, change } = $event;
    const detail = Object.assign({ type }, $event.detail);
    const originalEvent = $event;
    this.dispatchEvent(
      new ChangeEvent("change", { path, value, detail, change, originalEvent })
    );
  }
  save() {
    if(this.localStorage) {
      this.localStorage.set(this.content.object);
      return this.localStorage.get()
    }
    return null
  }
  load() {
    if(this.localStorage) {
      this.content.set(this.localStorage.get());
      return this.localStorage.get()
    }
    return null
  }
  unload() {
    if(this.localStorage) {
      return this.localStorage.remove()
    }
    return null
  }
}

const TOKENS = {
    attribute: /\[\s*(?:(?<namespace>\*|[-\w\P{ASCII}]*)\|)?(?<name>[-\w\P{ASCII}]+)\s*(?:(?<operator>\W?=)\s*(?<value>.+?)\s*(\s(?<caseSensitive>[iIsS]))?\s*)?\]/gu,
    id: /#(?<name>[-\w\P{ASCII}]+)/gu,
    class: /\.(?<name>[-\w\P{ASCII}]+)/gu,
    comma: /\s*,\s*/g,
    combinator: /\s*[\s>+~]\s*/g,
    'pseudo-element': /::(?<name>[-\w\P{ASCII}]+)(?:\((?<argument>¶*)\))?/gu,
    'pseudo-class': /:(?<name>[-\w\P{ASCII}]+)(?:\((?<argument>¶*)\))?/gu,
    universal: /(?:(?<namespace>\*|[-\w\P{ASCII}]*)\|)?\*/gu,
    type: /(?:(?<namespace>\*|[-\w\P{ASCII}]*)\|)?(?<name>[-\w\P{ASCII}]+)/gu, // this must be last
};
const TRIM_TOKENS = new Set(['combinator', 'comma']);
const RECURSIVE_PSEUDO_CLASSES = new Set([
    'not',
    'is',
    'where',
    'has',
    'matches',
    '-moz-any',
    '-webkit-any',
    'nth-child',
    'nth-last-child',
]);
const nthChildRegExp = /(?<index>[\dn+-]+)\s+of\s+(?<subtree>.+)/;
const RECURSIVE_PSEUDO_CLASSES_ARGS = {
    'nth-child': nthChildRegExp,
    'nth-last-child': nthChildRegExp,
};
const getArgumentPatternByType = (type) => {
    switch (type) {
        case 'pseudo-element':
        case 'pseudo-class':
            return new RegExp(TOKENS[type].source.replace('(?<argument>¶*)', '(?<argument>.*)'), 'gu');
        default:
            return TOKENS[type];
    }
};
function gobbleParens(text, offset) {
    let nesting = 0;
    let result = '';
    for (; offset < text.length; offset++) {
        const char = text[offset];
        switch (char) {
            case '(':
                ++nesting;
                break;
            case ')':
                --nesting;
                break;
        }
        result += char;
        if (nesting === 0) {
            return result;
        }
    }
    return result;
}
function tokenizeBy(text, grammar = TOKENS) {
    if (!text) {
        return [];
    }
    const tokens = [text];
    for (const [type, pattern] of Object.entries(grammar)) {
        for (let i = 0; i < tokens.length; i++) {
            const token = tokens[i];
            if (typeof token !== 'string') {
                continue;
            }
            pattern.lastIndex = 0;
            const match = pattern.exec(token);
            if (!match) {
                continue;
            }
            const from = match.index - 1;
            const args = [];
            const content = match[0];
            const before = token.slice(0, from + 1);
            if (before) {
                args.push(before);
            }
            args.push({
                ...match.groups,
                type,
                content,
            });
            const after = token.slice(from + content.length + 1);
            if (after) {
                args.push(after);
            }
            tokens.splice(i, 1, ...args);
        }
    }
    let offset = 0;
    for (const token of tokens) {
        switch (typeof token) {
            case 'string':
                throw new Error(`Unexpected sequence ${token} found at index ${offset}`);
            case 'object':
                offset += token.content.length;
                token.pos = [offset - token.content.length, offset];
                if (TRIM_TOKENS.has(token.type)) {
                    token.content = token.content.trim() || ' ';
                }
                break;
        }
    }
    return tokens;
}
const STRING_PATTERN = /(['"])([^\\\n]+?)\1/g;
const ESCAPE_PATTERN = /\\./g;
function tokenize(selector, grammar = TOKENS) {
    // Prevent leading/trailing whitespaces from being interpreted as combinators
    selector = selector.trim();
    if (selector === '') {
        return [];
    }
    const replacements = [];
    // Replace escapes with placeholders.
    selector = selector.replace(ESCAPE_PATTERN, (value, offset) => {
        replacements.push({ value, offset });
        return '\uE000'.repeat(value.length);
    });
    // Replace strings with placeholders.
    selector = selector.replace(STRING_PATTERN, (value, quote, content, offset) => {
        replacements.push({ value, offset });
        return `${quote}${'\uE001'.repeat(content.length)}${quote}`;
    });
    // Replace parentheses with placeholders.
    {
        let pos = 0;
        let offset;
        while ((offset = selector.indexOf('(', pos)) > -1) {
            const value = gobbleParens(selector, offset);
            replacements.push({ value, offset });
            selector = `${selector.substring(0, offset)}(${'¶'.repeat(value.length - 2)})${selector.substring(offset + value.length)}`;
            pos = offset + value.length;
        }
    }
    // Now we have no nested structures and we can parse with regexes
    const tokens = tokenizeBy(selector, grammar);
    // Replace placeholders in reverse order.
    const changedTokens = new Set();
    for (const replacement of replacements.reverse()) {
        for (const token of tokens) {
            const { offset, value } = replacement;
            if (!(token.pos[0] <= offset &&
                offset + value.length <= token.pos[1])) {
                continue;
            }
            const { content } = token;
            const tokenOffset = offset - token.pos[0];
            token.content =
                content.slice(0, tokenOffset) +
                    value +
                    content.slice(tokenOffset + value.length);
            if (token.content !== content) {
                changedTokens.add(token);
            }
        }
    }
    // Update changed tokens.
    for (const token of changedTokens) {
        const pattern = getArgumentPatternByType(token.type);
        if (!pattern) {
            throw new Error(`Unknown token type: ${token.type}`);
        }
        pattern.lastIndex = 0;
        const match = pattern.exec(token.content);
        if (!match) {
            throw new Error(`Unable to parse content for ${token.type}: ${token.content}`);
        }
        Object.assign(token, match.groups);
    }
    return tokens;
}
/**
 *  Convert a flat list of tokens into a tree of complex & compound selectors
 */
function nestTokens(tokens, { list = true } = {}) {
    if (list && tokens.find((t) => t.type === 'comma')) {
        const selectors = [];
        const temp = [];
        for (let i = 0; i < tokens.length; i++) {
            if (tokens[i].type === 'comma') {
                if (temp.length === 0) {
                    throw new Error('Incorrect comma at ' + i);
                }
                selectors.push(nestTokens(temp, { list: false }));
                temp.length = 0;
            }
            else {
                temp.push(tokens[i]);
            }
        }
        if (temp.length === 0) {
            throw new Error('Trailing comma');
        }
        else {
            selectors.push(nestTokens(temp, { list: false }));
        }
        return { type: 'list', list: selectors };
    }
    for (let i = tokens.length - 1; i >= 0; i--) {
        let token = tokens[i];
        if (token.type === 'combinator') {
            let left = tokens.slice(0, i);
            let right = tokens.slice(i + 1);
            if (left.length === 0) {
                return {
                    type: 'relative',
                    combinator: token.content,
                    right: nestTokens(right),
                };
            }
            return {
                type: 'complex',
                combinator: token.content,
                left: nestTokens(left),
                right: nestTokens(right),
            };
        }
    }
    switch (tokens.length) {
        case 0:
            throw new Error('Could not build AST.');
        case 1:
            // If we're here, there are no combinators, so it's just a list.
            return tokens[0];
        default:
            return {
                type: 'compound',
                list: [...tokens], // clone to avoid pointers messing up the AST
            };
    }
}
/**
 * Traverse an AST in depth-first order
 */
function* flatten(node, 
/**
 * @internal
 */
parent) {
    switch (node.type) {
        case 'list':
            for (let child of node.list) {
                yield* flatten(child, node);
            }
            break;
        case 'complex':
            yield* flatten(node.left, node);
            yield* flatten(node.right, node);
            break;
        case 'relative':
            yield* flatten(node.right, node);
            break;
        case 'compound':
            yield* node.list.map((token) => [token, node]);
            break;
        default:
            yield [node, parent];
    }
}
/**
 * Parse a CSS selector
 *
 * @param selector - The selector to parse
 * @param options.recursive - Whether to parse the arguments of pseudo-classes like :is(), :has() etc. Defaults to true.
 * @param options.list - Whether this can be a selector list (A, B, C etc). Defaults to true.
 */
function parse(selector, { recursive = true, list = true } = {}) {
    const tokens = tokenize(selector);
    if (!tokens) {
        return;
    }
    const ast = nestTokens(tokens, { list });
    if (!recursive) {
        return ast;
    }
    for (const [token] of flatten(ast)) {
        if (token.type !== 'pseudo-class' || !token.argument) {
            continue;
        }
        if (!RECURSIVE_PSEUDO_CLASSES.has(token.name)) {
            continue;
        }
        let argument = token.argument;
        const childArg = RECURSIVE_PSEUDO_CLASSES_ARGS[token.name];
        if (childArg) {
            const match = childArg.exec(argument);
            if (!match) {
                continue;
            }
            Object.assign(token, match.groups);
            argument = match.groups['subtree'];
        }
        if (!argument) {
            continue;
        }
        Object.assign(token, {
            subtree: parse(argument, {
                recursive: true,
                list: true,
            }),
        });
    }
    return ast;
}
/**
 * Converts the given list or (sub)tree to a string.
 */
function stringify(listOrNode) {
    if (Array.isArray(listOrNode)) {
        return listOrNode.map((token) => token.content).join("");
    }
    switch (listOrNode.type) {
        case "list":
            return listOrNode.list.map(stringify).join(",");
        case "relative":
            return (listOrNode.combinator +
                stringify(listOrNode.right));
        case "complex":
            return (stringify(listOrNode.left) +
                listOrNode.combinator +
                stringify(listOrNode.right));
        case "compound":
            return listOrNode.list.map(stringify).join("");
        default:
            return listOrNode.content;
    }
}

class QuerySelector {
  #settings
  #enable
  constructor($settings) {
    this.#settings = $settings;
  }
  get context() { return this.#settings.context }
  get method() { return this.#settings.method }
  get name() { return this.#settings.name }
  get selector() { return this.#settings.selector }
  get enable() { return this.#enable }
  set enable($enable) {
    // Unable
    if($enable === this.#enable) return
    // Enable
    if($enable === true) {
      const { context, name, method, selector } = this;
      Object.defineProperty(context.querySelectors, name, {
        get() { return context[method](selector) }
      });
    }
    // Disable
    else if($enable === false) {
      delete this.context.querySelectors[this.name];
    }
    this.#enable = $enable;
  }
}

const Combinators = {
  descendant: " ",
  child: ">",
  subsequentSibling: "~",
  nextSibling: "+",
};
function Query($element, $queryMethod, $queryString) {
  let query = [];
  let queryString = $queryString;
  let queryTokens = tokenize(queryString);
  // Orient Query Tokens To Scope
  if(queryTokens[0].content !== ':scope') {
    queryString = [':scope', queryString].join(' ');
    queryTokens = tokenize(queryString);
  }
  // Define Scope
  queryTokens[0];
  const scopeCombinator = queryTokens[1];
  // Define Scope Query
  const scopeQueryString = stringify(queryTokens.slice(2));
  tokenize(scopeQueryString);
  const scopeQueryParse = parse(scopeQueryString);
  const children = Array.from($element.children);
  for(const [$childIndex, $child] of Object.entries(children)) {
    // Scope Query Type: Complex
    if(scopeQueryParse.type === 'complex') {
      const { left, combinator, right } = scopeQueryParse;
      // Lexter
      const lexter = Query($element, $queryMethod, stringify(left));
      // Dexter
      let dexter;
      if(lexter.length) {
        // Combinator: Descendant " "
        if(combinator === Combinators.descendant) {
          dexter = Query($child, $queryMethod, [':scope', stringify(right)].join(Combinators.descendant));
          query = query.concat(dexter);
        }
        // Combinator: Child ">"
        else if(combinator === Combinators.child) {
          dexter = Query($child, $queryMethod, [':scope', stringify(right)].join(Combinators.child));
          query = query.concat(dexter);
        }
        // Combinator: Subsequent Sibling "~"
        else if(combinator === Combinators.subsequentSibling) {
          dexter = Query({ children: children.slice($childIndex + 1) }, $queryMethod, stringify(right));
          query = query.concat(dexter);
        }
        // Combinator: Next Sibling "+"
        else if(combinator === Combinators.nextSibling) {
          dexter = Query({ children: children.slice($childIndex + 1, $childIndex + 2) }, $queryMethod, stringify(right));
          query = query.concat(dexter);
        }
      }
    }
    // Scope Query Type: Not Complex
    else {
      // Child: Matches Query String
      if($child.matches(scopeQueryString)) query = query.concat($child);
      // Descendant: Query Selector String
      if(scopeCombinator.content === Combinators.descendant) {
        const childQuery = $child[$queryMethod](scopeQueryString);
        if(childQuery instanceof NodeList) query = query.concat(...childQuery);
        else if(childQuery instanceof Node) query = query.concat(childQuery); 
      }
    }
    if($queryMethod === 'querySelector' && query.length > 0) return query.slice(0, 1)
  }
  return query
}

var Settings$3 = {
  parentElement: undefined, // HTML Element
  scope: 'template', // 'parent',
  templates: { default: () => `` },
  querySelectors: {},
};

var Options$3 = {
  enableEvents: true,
  enableQuerySelectors: true
};

class View extends Core {
  #templates
  #scope
  #parentElement
  #_template
  #children
  #querySelectors = {}
  constructor($settings = {}, $options = {}) {
    super(
      Object.assign({}, Settings$3, $settings),
      Object.assign({}, Options$3, $options),
    );
    this.addQuerySelectors(this.settings.querySelectors);
    const { enableQuerySelectors, enableEvents } = this.options;
    if(enableQuerySelectors) this.enableQuerySelectors();
    if(enableEvents) this.enableEvents();
  }
  get templates() {
    if(this.#templates !== undefined) return this.#templates
    this.#templates = this.settings.templates;
    return this.#templates
  }
  get scope() {
    if(this.#scope !== undefined) return this.#scope
    this.#scope = this.settings.scope;
    return this.#scope
  }
  get parentElement() {
    if(this.#parentElement !== undefined) return this.#parentElement
    this.#parentElement = this.settings.parentElement;
    return this.#parentElement
  }
  get #template() {
    if(this.#_template !== undefined) { return this.#_template }
    this.#_template = document.createElement('template');
    return this.#_template
  }
  set #template($templateString) {
    this.disableEvents();
    this.disableQuerySelectors();
    this.#template.innerHTML = $templateString;
    this.children = this.#template.content.children;
    this.parentElement.append(...this.children.values());
    this.enableQuerySelectors();
    this.enableEvents();
  }
  get children() {
    if(this.#children !== undefined) return this.#children
    this.#children = new Map();
    return this.#children
  }
  set children($children) {
    const children = this.children;
    children.forEach(($child, $childIndex) => $child?.parentElement.removeChild($child));
    children.clear();
    Array.from($children).forEach(($child, $childIndex) => {
      children.set($childIndex, $child);
    });
  }
  get querySelectors() { return this.#querySelectors }
  get qs() { return this.querySelectors }
  querySelector($queryString, $queryScope) {
    const query = this.#query('querySelector', $queryString, $queryScope);
    return query[0] || null
  }
  querySelectorAll($queryString, $queryScope) {
    const query = this.#query('querySelectorAll', $queryString, $queryScope);
    return query
  }
  #query($queryMethod, $queryString) {
    const queryElement = (this.scope === 'template')
      ? { children: Array.from(this.children.values()) }
      : { children: Array.from(this.parentElement.children) };
    return Query(queryElement, $queryMethod, $queryString)
  }
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
  render($model = {}, $template = 'default') {
    this.#template = this.templates[$template]($model);
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
  #_origin
  #routes = {}
  constructor($settings, $options) {
    super(...arguments);
    const { scheme, domain, port, routes } = $settings;
    this.#scheme = scheme;
    this.#domain = domain;
    this.#port = port;
    this.routes = routes;
    if($options.enableEvents === true) this.enableEvents();
  }
  get #authority() {
    if(this.#_authority === undefined) {
      this.#_authority = String.prototype.concat(
        this.#domain, ':', this.#port
      );
    }
    return this.#_authority
  }
  get #origin() {
    if(this.#_origin === undefined) {
      this.#_origin = String.prototype.concat(
        this.#scheme, '://', this.#authority
      );
    }
    return this.#_origin
  }
  get routes() { return this.#routes }
  set routes($routes) { this.addRoutes($routes); }
  addRoutes($routes) {
    const _routes = this.#routes;
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
    const _routes = this.#routes;
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
  #enable
  #active
  #match
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
  get pathname() { return this.#settings.pathname }
  get enable() {
    if(this.#enable !== undefined) return this.#enable
    if(this.#settings.enable !== undefined) {
      this.#enable = this.#settings.enable;
    }
    else { this.#enable = true; }
    return this.#enable
  }
  set enable($enable) {
    if(this.#enable !== $enable) this.#enable = $enable;
  }
  get active() {
    if(this.#active !== undefined) return this.#active
    if(this.#settings.active === undefined) { this.#active = false; }
    return this.#active
  }
  set active($active) {
    if(this.#active !== $active) this.#active = $active;
  }
  get match() {
    if(this.#match !== undefined) return this.#match
    this.#match = distExports.match(this.pathname);
    return this.#match
  }
}

class RouteEvent extends Event {
  #options
  constructor($type, $options) {
    super($type, $options);
    this.#options = $options;
  }
  get path() { return this.#options.path }
  get route() { return this.#options.route }
  get location() { return this.#options.location }
}

var Settings$2 = {
  routes: {}
};

var Options$2 = {
  enableEvents: true
};

class LocationRouter extends Core {
  #window
  #hashpath
  #routes
  #location
  #route
  #enable
  #regularExpressions = {
    windowLocationOrigin: new RegExp(`^${this.window.location.origin}`)
  }
  constructor($settings, $options) {
    super(
      recursiveAssign(Settings$2, $settings),
      recursiveAssign(Options$2, $options),
    );
    if($options.enableEvents === true) this.enableEvents();
    this.enable = true;
  }
  get base() { return this.settings.base }
  get window() {
    if(this.#window !== undefined) return this.#window
    this.#window = window;
    return this.#window
  }
  get hashpath() {
    if(this.#hashpath !== undefined) return this.#hashpath
    this.#hashpath = (
      this.settings.hashpath === undefined
    ) ? false
      : this.settings.hashpath;
    return this.#hashpath
  }
  get routes() {
    if(this.#routes !== undefined) return this.#routes
    this.#routes = {};
    const routeEntries = Object.entries(this.settings.routes);
    for(const [$routePath, $routeSettings] of routeEntries) {
      this.setRoute($routePath, $routeSettings);
    }
    return this.#routes
  }
  get location() { return this.#location }
  get route() { return this.#route }
  get enable() { return this.#enable }
  set enable($enable) {
    if(this.#enable === $enable) return
    const boundPopstate = this.#popstate.bind(this);
    if($enable === true) {
      this.#window.addEventListener('popstate', boundPopstate);
    }
    else if($enable === false) {
      this.#window.removeEventListener('popstate', boundPopstate);
    }
    this.#enable = $enable;
  }
  #popstate() { this.navigate(); }
  navigate($path, $method) {
    if(
      typeof $path === 'string' && 
      ['assign', 'replace'].includes($method)
    ) {
      this.window?.location[$method]($path);
      return this
    }
    [this.window.origin, this.base].join('');
    let matchPath, matchRoute;
    if(this.hashpath) {
      matchPath = this.window.location.hash.slice(1);
      matchRoute = this.#matchRoute(matchPath);
    }
    else {
      matchPath = this.window.location.href
      .replace(new RegExp(`^${this.window.origin}`), '')
      .replace(new RegExp(`^${this.base}`), '');
      matchRoute = this.#matchRoute(matchPath);
    }
    const { route, location } = matchRoute;
    const routeEventOptions = {
      route: route,
      location: location,
      path: matchPath,
    };
    const preterRoute = this.route;
    if(preterRoute) { preterRoute.active = false; }
    if(route && route?.enable) {
      route.active = true;
      location.state = this.window.history.state;
      location.base = this.base;
      location.pathname = this.window.location.pathname
      .replace(new RegExp(`^${this.base}`), '');
      location.hash = this.window.location.hash;
      location.search = this.window.location.search;
      delete location.path;
      this.#route = route;
      this.#location = location;
      this.dispatchEvent(
        new RouteEvent("route", routeEventOptions)
      );
      this.dispatchEvent(
        new RouteEvent(`route:${route.name}`, routeEventOptions)
      );
    }
    else {
      this.#route = null;
      this.#location = null;
      this.dispatchEvent(
        new RouteEvent("nonroute", routeEventOptions)
      );
    }
    return this
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
      pathname: $routeSettings.pathname || $routePath,
    }, $routeSettings);
    this.#routes[$routePath] = new Route(routeSettings);
    return this.#routes[$routePath]
  }
  getRoute($routePath) {
    return this.#routes[$routePath]
  }
  deleteRoute($routePath) {
    delete this.#routes[$routePath];
    return this.#routes[$routePath]
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

class SocketEvent extends CustomEvent {
  #settings
  #socket
  constructor($type, $settings, $socket) {
    super($type, $settings);
    this.#settings = $settings;
    this.#socket = $socket;
  }
  get isBinary() { return this.#settings.isBinary }
  get message() { return this.#settings.message }
  get detail() { return this.#settings.detail }
}

class MessageAdapter extends EventTarget {
  #settings
  #messages
  #message
  constructor($settings) {
    super();
    this.#settings = $settings;
  }
  get name() { return this.#settings.name }
  get messages() {
    if(this.#messages !== undefined) {
      return this.#messages
    }
    if(this.#settings.messages !== undefined) {
      this.#messages = this.#settings.messages;
    }
    else {
      this.#messages = {};
    }
    return this.#messages
  }
  get message() {
    if(this.#message !== undefined) {
      return this.#message
    }
    this.#message = this.#settings.message;
    return this.#message
  }
}

var Settings$1 = {
  active: false, // Boolean
  /*
  name: String, // "$name",
  protocol: String, // ["wss:", "ws:"],
  port: Number, // 3338
  host: String, // "demonstrament.mvc-framework",
  path: String, // '/',
  open: function() {},
  close: function() {},
  error: function() {},
  messageAdapters: [
    // ['MessageAdapter', $MessageAdapter]
  ],
  */
};

var Options$1 = {
  enableEvents: true, // Boolean
};

class SocketRouter extends Core {
  #webSocket
  #active = false
  #messageAdapters
  #url
  #boundMessage
  constructor($settings = {}, $options = {}) {
    super(
      recursiveAssignConcat(Settings$1, $settings), 
      Object.assign(Options$1, $options),
    );
    this.#boundMessage = this.#message.bind(this);
    this.active = this.settings.active;
    if(this.options.enableEvents === true) { this.enableEvents(); }
  }
  get active() { return this.#active }
  set active($active) {
    if(this.#active === $active) { return }
    if($active === true) {
      this.webSocket;
    }
    else if($active === false) {
      this.#webSocket = undefined;
    }
    this.#active = $active;
  }
  get path() { return this.settings.path }
  get url() {
    if(this.#url !== undefined) { return this.#url }
    let { protocol, host, port } = this.settings;
    let base;
    if(protocol && host && port) {
        base = [protocol, '//', host, ':', port].join('');
      }
    else {
      base = window.location.url.origin;
    }
    this.#url = new URL(this.path, base);
    return this.#url
  }
  get webSocket() {
    if(this.#webSocket !== undefined) return this.#webSocket
    this.#webSocket = new WebSocket(this.url);
    this.#webSocket.addEventListener('message', this.#boundMessage);
    return this.#webSocket
  }
  #message($data, $isBinary) {
    for(const $messageAdapter of this.messageAdapters) {
      try {
        const message = $messageAdapter.message($data, $isBinary);
        const { type, detail } = message;
        const messageEvent = new SocketEvent(type, {
          detail, message: $data, isBinary: $isBinary
        }, this);
        this.webSocket.dispatchEvent(messageEvent);
      }
      catch($err) {  console.error($err);  }
    }
  }
  get messageAdapters() {
    if(this.#messageAdapters !== undefined) { return this.#messageAdapters }
    const messageAdapters = [];
    for(const $adapter of this.settings.messageAdapters) {
      let adapter;
      if($adapter instanceof MessageAdapter) { adapter = adapter; }
      else { adapter = new MessageAdapter($adapter, this); }
      messageAdapters.push(adapter);
    }
    this.#messageAdapters = messageAdapters;
    return this.#messageAdapters
  }
  send() { this.webSocket.send(...arguments); }
}

var Settings = {
  models: {},
  views: {},
  controls: {},
  fetchRouters: {},
  locationRouters: {},
};

var Options = {
  enableEvents: true
};

class Control extends Core {
  static propertyClasses = {
    models: {
      ID: "MODEL",
      Name: "models",
      Class: Model,
      Names: {
        Monople: { Formal: "Model", Nonformal: "model" },
        Multiple: { Formal: "Models", Nonformal: "models" },
        Minister: {
          Ad: { Formal: "Add", Nonformal: "add" },
          Dead: { Formal: "Remove", Nonformal: "remove" },
        },
      },
      Events: { Assign: "addEventListener", Deassign: "removeEventListener" },
    },
    views: {
      ID: "VIEW",
      Name: "views",
      Class: View,
      Names: {
        Monople: { Formal: "View", Nonformal: "view" },
        Multiple: { Formal: "Views", Nonformal: "views" },
        Minister: {
          Ad: { Formal: "Add", Nonformal: "add" },
          Dead: { Formal: "Remove", Nonformal: "remove" },
        },
      },
      Events: { Assign: "addEventListener", Deassign: "removeEventListener" },
    },
    controls: {
      ID: "CONTROL",
      Name: "controls",
      Class: Control,
      Names: {
        Monople: { Formal: "Control", Nonformal: "control" },
        Multiple: { Formal: "Controls", Nonformal: "controls" },
        Minister: {
          Ad: { Formal: "Add", Nonformal: "add" },
          Dead: { Formal: "Remove", Nonformal: "remove" },
        },
      },
      Events: { Assign: "addEventListener", Deassign: "removeEventListener" },
    },
    locationRouters: {
      ID: "LOCATIONROUTER",
      Name: "locationRouters",
      Class: LocationRouter,
      Names: {
        Monople: { Formal: "LocationRouter", Nonformal: "locationRouter" },
        Multiple: { Formal: "LocationRouters", Nonformal: "locationRouters" },
        Minister: {
          Ad: { Formal: "Add", Nonformal: "add" },
          Dead: { Formal: "Remove", Nonformal: "remove" },
        },
      },
      Events: { Assign: "addEventListener", Deassign: "removeEventListener" },
    },
    fetchRouters: {
      ID: "FETCHROUTER",
      Name: "fetchRouters",
      Class: FetchRouter,
      Names: {
        Monople: { Formal: "FetchRouter", Nonformal: "fetchRouter" },
        Multiple: { Formal: "FetchRouters", Nonformal: "fetchRouters" },
        Minister: {
          Ad: { Formal: "Add", Nonformal: "add" },
          Dead: { Formal: "Remove", Nonformal: "remove" },
        },
      },
      Events: { Assign: "addEventListener", Deassign: "removeEventListener" },
    },
    socketRouters: {
      ID: "SOCKETROUTER",
      Name: "socketRouters",
      Class: SocketRouter,
      Names: {
        Monople: { Formal: "SocketRouter", Nonformal: "socketRouter" },
        Multiple: { Formal: "SocketRouters", Nonformal: "socketRouters" },
        Minister: {
          Ad: { Formal: "Add", Nonformal: "add" },
          Dead: { Formal: "Remove", Nonformal: "remove" },
        },
      },
      Events: { Assign: "addEventListener", Deassign: "removeEventListener" },
    },
  }
  constructor($settings = {}, $options = {}) {
    super(
      recursiveAssign({
        propertyClasses: Control.propertyClasses,
      }, Settings, $settings),
      recursiveAssign({}, Options, $options),
    );
    const { enableEvents } = this.options;
    if(enableEvents) this.enableEvents();
  }
}

export { Content, Control, Core, index as Coutil, FetchRouter, LocationRouter, MessageAdapter, Model, Schema, SocketRouter, Validation, Validator, Verification, View };
//# sourceMappingURL=mvc-framework.js.map
