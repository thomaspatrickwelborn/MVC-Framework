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

function expandEvents$1($propEvents) {
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

const Primitives$1 = {
  'string': String, 
  'number': Number, 
  'boolean': Boolean, 
  'undefined': undefined,
  'null': null,
};
const PrimitiveKeys = Object.keys(Primitives$1);
const PrimitiveValues = Object.values(Primitives$1);
const Objects$1 = {
  'object': Object,
  'array': Array,
};
const ObjectKeys = Object.keys(Objects$1);
const ObjectValues = Object.values(Objects$1);
const Types$1 = Object.assign({}, Primitives$1, Objects$1);
const TypeKeys = Object.keys(Types$1);
const TypeValues = Object.values(Types$1);
const TypeMethods = [
 Primitives$1.String, Primitives$1.Number, Primitives$1.Boolean, 
 Objects$1.Object, Objects$1.Array
];

var Variables = /*#__PURE__*/Object.freeze({
  __proto__: null,
  ObjectKeys: ObjectKeys,
  ObjectValues: ObjectValues,
  Objects: Objects$1,
  PrimitiveKeys: PrimitiveKeys,
  PrimitiveValues: PrimitiveValues,
  Primitives: Primitives$1,
  TypeKeys: TypeKeys,
  TypeMethods: TypeMethods,
  TypeValues: TypeValues,
  Types: Types$1
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

const typeOf$1 = ($data) => Object
  .prototype
  .toString
  .call($data).slice(8, -1).toLowerCase();

function typedObjectLiteral$1($object) {
  if(typeOf$1($object) === 'object') { return {} }
  else if(typeOf$1($object) === 'array') { return [] }
  else if(typeOf$1($object) === 'string') { return (
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
  const tree = typedObjectLiteral$1(typeofRoot);
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
  let tree = typedObjectLiteral$1($root);
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

function recursiveAssign$1() {
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
          $target[$sourcePropKey] = recursiveAssign$1(
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
  expandEvents: expandEvents$1,
  expandTree: expandTree,
  impandEvents: impandEvents,
  impandTree: impandTree,
  isPropertyDefinition: isPropertyDefinition,
  isPropertyValidator: isPropertyValidator,
  keytree: keytree,
  objectCount: objectCount,
  path: index$2,
  pathkeytree: pathkeytree,
  recursiveAssign: recursiveAssign$1,
  recursiveAssignConcat: recursiveAssignConcat,
  regularExpressions: regularExpressions,
  tree: index$1,
  typeOf: typeOf$1,
  typedObjectLiteral: typedObjectLiteral$1,
  typedObjectLiteralFromPath: typedObjectLiteralFromPath,
  variables: Variables
});

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
Object.values(Primitives);
const Objects = {
  'object': Object,
  'array': Array,
};
Object.values(Objects);
const Types = Object.assign({}, Primitives, Objects);
Object.values(Types);
[
 Primitives.String, Primitives.Number, Primitives.Boolean, 
 Objects.Object, Objects.Array
];

const typeOf = ($data) => Object
  .prototype
  .toString
  .call($data).slice(8, -1).toLowerCase();

function typedObjectLiteral($object) {
  const typeOfObject = typeOf($object);
  if(
    typeOfObject === 'object' ||
    $object === Object
  ) { return {} }
  else if(
    typeOfObject === 'array' ||
    $object === Array
  ) { return [] }
  else if(typeOfObject === 'string') { return (
    $object === 'Object' ||
    $object === 'object'
  ) ? {} 
    : (
    $object === 'Array' ||
    $object === 'array'
  ) ? []
    : undefined
  }
  else { return undefined }
}

function pathkeyTree($object) {
  const target = [];
  for(const [$key, $value] of Object.entries($object)) {
    target.push($key);
    if(typeof $value === 'object') {
      const subtarget = pathkeyTree($value);
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

function Instate(
  $propertyClass, $property, $value
) { return $value }
function Deinstate(
  $propertyClass, $property
) { return $propertyClass.core[$property] }

let Handler$2 = class Handler {
  #propertyClass
  constructor($propertyClass) {
    this.#propertyClass = $propertyClass;
  }
  get get() {
    return function get($target, $property) {
      return $target[$property]
    }
  }
  get set() {
    const Instate$1 = this.#propertyClass.States.Instate || Instate;
    const Definition = this.#propertyClass.Definition;
    return function set($target, $property, $value) {
      if(
        Definition.Object === "Array" && 
        $property === 'length'
      ) {
        $target[$property] = $value;
      }
      else {
        $target[$property] = Instate$1(this.#propertyClass, $property, $value);
      }
      return true
    }
  }
  get deleteProperty() {
    const Deinstate$1 = this.#propertyClass.States.Deinstate || Deinstate;
    return function deleteProperty($target, $property) {
      Deinstate$1(this.#propertyClass, $property);
      delete $target[$property];
      return true
    }
  }
};

class PropertyClass {
  #settings
  #core
  #_target
  #_handler
  #_proxy
  constructor($settings, $core) {
    this.#settings = $settings;
    this.#core = $core;
    return this.#proxy
  }
  get #target() {
    if(this.#_target !== undefined) { return this.#_target }
    this.#_target = typedObjectLiteral(this.Definition.Object);
    return this.#_target
  }
  get #handler() {
    if(this.#_handler !== undefined) { return this.#_handler }
    this.#_handler = new Handler$2(this);
    return this.#_handler
  }
  get #proxy() {
    if(this.#_proxy !== undefined) { return this.#_proxy }
    this.#_proxy = new Proxy(this.#target, this.#handler);
    return this.#_proxy
  }
  get core() { return this.#core }
  get ID() { return this.#settings.ID }
  get Name() { return this.#settings.Name }
  get Names() { return this.#settings.Names }
  get Events() { return this.#settings.Events }
  get States() { return this.#settings.States }
  get Definition() { return this.#settings.Definition }
}

function getDefaultExportFromCjs (x) {
	return x && x.__esModule && Object.prototype.hasOwnProperty.call(x, 'default') ? x['default'] : x;
}

var balancedMatch;
var hasRequiredBalancedMatch;

function requireBalancedMatch () {
	if (hasRequiredBalancedMatch) return balancedMatch;
	hasRequiredBalancedMatch = 1;
	balancedMatch = balanced;
	function balanced(a, b, str) {
	  if (a instanceof RegExp) a = maybeMatch(a, str);
	  if (b instanceof RegExp) b = maybeMatch(b, str);

	  var r = range(a, b, str);

	  return r && {
	    start: r[0],
	    end: r[1],
	    pre: str.slice(0, r[0]),
	    body: str.slice(r[0] + a.length, r[1]),
	    post: str.slice(r[1] + b.length)
	  };
	}

	function maybeMatch(reg, str) {
	  var m = str.match(reg);
	  return m ? m[0] : null;
	}

	balanced.range = range;
	function range(a, b, str) {
	  var begs, beg, left, right, result;
	  var ai = str.indexOf(a);
	  var bi = str.indexOf(b, ai + 1);
	  var i = ai;

	  if (ai >= 0 && bi > 0) {
	    if(a===b) {
	      return [ai, bi];
	    }
	    begs = [];
	    left = str.length;

	    while (i >= 0 && !result) {
	      if (i == ai) {
	        begs.push(i);
	        ai = str.indexOf(a, i + 1);
	      } else if (begs.length == 1) {
	        result = [ begs.pop(), bi ];
	      } else {
	        beg = begs.pop();
	        if (beg < left) {
	          left = beg;
	          right = bi;
	        }

	        bi = str.indexOf(b, i + 1);
	      }

	      i = ai < bi && ai >= 0 ? ai : bi;
	    }

	    if (begs.length) {
	      result = [ left, right ];
	    }
	  }

	  return result;
	}
	return balancedMatch;
}

var braceExpansion;
var hasRequiredBraceExpansion;

function requireBraceExpansion () {
	if (hasRequiredBraceExpansion) return braceExpansion;
	hasRequiredBraceExpansion = 1;
	var balanced = requireBalancedMatch();

	braceExpansion = expandTop;

	var escSlash = '\0SLASH'+Math.random()+'\0';
	var escOpen = '\0OPEN'+Math.random()+'\0';
	var escClose = '\0CLOSE'+Math.random()+'\0';
	var escComma = '\0COMMA'+Math.random()+'\0';
	var escPeriod = '\0PERIOD'+Math.random()+'\0';

	function numeric(str) {
	  return parseInt(str, 10) == str
	    ? parseInt(str, 10)
	    : str.charCodeAt(0);
	}

	function escapeBraces(str) {
	  return str.split('\\\\').join(escSlash)
	            .split('\\{').join(escOpen)
	            .split('\\}').join(escClose)
	            .split('\\,').join(escComma)
	            .split('\\.').join(escPeriod);
	}

	function unescapeBraces(str) {
	  return str.split(escSlash).join('\\')
	            .split(escOpen).join('{')
	            .split(escClose).join('}')
	            .split(escComma).join(',')
	            .split(escPeriod).join('.');
	}


	// Basically just str.split(","), but handling cases
	// where we have nested braced sections, which should be
	// treated as individual members, like {a,{b,c},d}
	function parseCommaParts(str) {
	  if (!str)
	    return [''];

	  var parts = [];
	  var m = balanced('{', '}', str);

	  if (!m)
	    return str.split(',');

	  var pre = m.pre;
	  var body = m.body;
	  var post = m.post;
	  var p = pre.split(',');

	  p[p.length-1] += '{' + body + '}';
	  var postParts = parseCommaParts(post);
	  if (post.length) {
	    p[p.length-1] += postParts.shift();
	    p.push.apply(p, postParts);
	  }

	  parts.push.apply(parts, p);

	  return parts;
	}

	function expandTop(str) {
	  if (!str)
	    return [];

	  // I don't know why Bash 4.3 does this, but it does.
	  // Anything starting with {} will have the first two bytes preserved
	  // but *only* at the top level, so {},a}b will not expand to anything,
	  // but a{},b}c will be expanded to [a}c,abc].
	  // One could argue that this is a bug in Bash, but since the goal of
	  // this module is to match Bash's rules, we escape a leading {}
	  if (str.substr(0, 2) === '{}') {
	    str = '\\{\\}' + str.substr(2);
	  }

	  return expand(escapeBraces(str), true).map(unescapeBraces);
	}

	function embrace(str) {
	  return '{' + str + '}';
	}
	function isPadded(el) {
	  return /^-?0\d/.test(el);
	}

	function lte(i, y) {
	  return i <= y;
	}
	function gte(i, y) {
	  return i >= y;
	}

	function expand(str, isTop) {
	  var expansions = [];

	  var m = balanced('{', '}', str);
	  if (!m) return [str];

	  // no need to expand pre, since it is guaranteed to be free of brace-sets
	  var pre = m.pre;
	  var post = m.post.length
	    ? expand(m.post, false)
	    : [''];

	  if (/\$$/.test(m.pre)) {    
	    for (var k = 0; k < post.length; k++) {
	      var expansion = pre+ '{' + m.body + '}' + post[k];
	      expansions.push(expansion);
	    }
	  } else {
	    var isNumericSequence = /^-?\d+\.\.-?\d+(?:\.\.-?\d+)?$/.test(m.body);
	    var isAlphaSequence = /^[a-zA-Z]\.\.[a-zA-Z](?:\.\.-?\d+)?$/.test(m.body);
	    var isSequence = isNumericSequence || isAlphaSequence;
	    var isOptions = m.body.indexOf(',') >= 0;
	    if (!isSequence && !isOptions) {
	      // {a},b}
	      if (m.post.match(/,.*\}/)) {
	        str = m.pre + '{' + m.body + escClose + m.post;
	        return expand(str);
	      }
	      return [str];
	    }

	    var n;
	    if (isSequence) {
	      n = m.body.split(/\.\./);
	    } else {
	      n = parseCommaParts(m.body);
	      if (n.length === 1) {
	        // x{{a,b}}y ==> x{a}y x{b}y
	        n = expand(n[0], false).map(embrace);
	        if (n.length === 1) {
	          return post.map(function(p) {
	            return m.pre + n[0] + p;
	          });
	        }
	      }
	    }

	    // at this point, n is the parts, and we know it's not a comma set
	    // with a single entry.
	    var N;

	    if (isSequence) {
	      var x = numeric(n[0]);
	      var y = numeric(n[1]);
	      var width = Math.max(n[0].length, n[1].length);
	      var incr = n.length == 3
	        ? Math.abs(numeric(n[2]))
	        : 1;
	      var test = lte;
	      var reverse = y < x;
	      if (reverse) {
	        incr *= -1;
	        test = gte;
	      }
	      var pad = n.some(isPadded);

	      N = [];

	      for (var i = x; test(i, y); i += incr) {
	        var c;
	        if (isAlphaSequence) {
	          c = String.fromCharCode(i);
	          if (c === '\\')
	            c = '';
	        } else {
	          c = String(i);
	          if (pad) {
	            var need = width - c.length;
	            if (need > 0) {
	              var z = new Array(need + 1).join('0');
	              if (i < 0)
	                c = '-' + z + c.slice(1);
	              else
	                c = z + c;
	            }
	          }
	        }
	        N.push(c);
	      }
	    } else {
	      N = [];

	      for (var j = 0; j < n.length; j++) {
	        N.push.apply(N, expand(n[j], false));
	      }
	    }

	    for (var j = 0; j < N.length; j++) {
	      for (var k = 0; k < post.length; k++) {
	        var expansion = pre + N[j] + post[k];
	        if (!isTop || isSequence || expansion)
	          expansions.push(expansion);
	      }
	    }
	  }

	  return expansions;
	}
	return braceExpansion;
}

var braceExpansionExports = requireBraceExpansion();
var expand = /*@__PURE__*/getDefaultExportFromCjs(braceExpansionExports);

const MAX_PATTERN_LENGTH = 1024 * 64;
const assertValidPattern = (pattern) => {
    if (typeof pattern !== 'string') {
        throw new TypeError('invalid pattern');
    }
    if (pattern.length > MAX_PATTERN_LENGTH) {
        throw new TypeError('pattern is too long');
    }
};

// translate the various posix character classes into unicode properties
// this works across all unicode locales
// { <posix class>: [<translation>, /u flag required, negated]
const posixClasses = {
    '[:alnum:]': ['\\p{L}\\p{Nl}\\p{Nd}', true],
    '[:alpha:]': ['\\p{L}\\p{Nl}', true],
    '[:ascii:]': ['\\x' + '00-\\x' + '7f', false],
    '[:blank:]': ['\\p{Zs}\\t', true],
    '[:cntrl:]': ['\\p{Cc}', true],
    '[:digit:]': ['\\p{Nd}', true],
    '[:graph:]': ['\\p{Z}\\p{C}', true, true],
    '[:lower:]': ['\\p{Ll}', true],
    '[:print:]': ['\\p{C}', true],
    '[:punct:]': ['\\p{P}', true],
    '[:space:]': ['\\p{Z}\\t\\r\\n\\v\\f', true],
    '[:upper:]': ['\\p{Lu}', true],
    '[:word:]': ['\\p{L}\\p{Nl}\\p{Nd}\\p{Pc}', true],
    '[:xdigit:]': ['A-Fa-f0-9', false],
};
// only need to escape a few things inside of brace expressions
// escapes: [ \ ] -
const braceEscape = (s) => s.replace(/[[\]\\-]/g, '\\$&');
// escape all regexp magic characters
const regexpEscape = (s) => s.replace(/[-[\]{}()*+?.,\\^$|#\s]/g, '\\$&');
// everything has already been escaped, we just have to join
const rangesToString = (ranges) => ranges.join('');
// takes a glob string at a posix brace expression, and returns
// an equivalent regular expression source, and boolean indicating
// whether the /u flag needs to be applied, and the number of chars
// consumed to parse the character class.
// This also removes out of order ranges, and returns ($.) if the
// entire class just no good.
const parseClass = (glob, position) => {
    const pos = position;
    /* c8 ignore start */
    if (glob.charAt(pos) !== '[') {
        throw new Error('not in a brace expression');
    }
    /* c8 ignore stop */
    const ranges = [];
    const negs = [];
    let i = pos + 1;
    let sawStart = false;
    let uflag = false;
    let escaping = false;
    let negate = false;
    let endPos = pos;
    let rangeStart = '';
    WHILE: while (i < glob.length) {
        const c = glob.charAt(i);
        if ((c === '!' || c === '^') && i === pos + 1) {
            negate = true;
            i++;
            continue;
        }
        if (c === ']' && sawStart && !escaping) {
            endPos = i + 1;
            break;
        }
        sawStart = true;
        if (c === '\\') {
            if (!escaping) {
                escaping = true;
                i++;
                continue;
            }
            // escaped \ char, fall through and treat like normal char
        }
        if (c === '[' && !escaping) {
            // either a posix class, a collation equivalent, or just a [
            for (const [cls, [unip, u, neg]] of Object.entries(posixClasses)) {
                if (glob.startsWith(cls, i)) {
                    // invalid, [a-[] is fine, but not [a-[:alpha]]
                    if (rangeStart) {
                        return ['$.', false, glob.length - pos, true];
                    }
                    i += cls.length;
                    if (neg)
                        negs.push(unip);
                    else
                        ranges.push(unip);
                    uflag = uflag || u;
                    continue WHILE;
                }
            }
        }
        // now it's just a normal character, effectively
        escaping = false;
        if (rangeStart) {
            // throw this range away if it's not valid, but others
            // can still match.
            if (c > rangeStart) {
                ranges.push(braceEscape(rangeStart) + '-' + braceEscape(c));
            }
            else if (c === rangeStart) {
                ranges.push(braceEscape(c));
            }
            rangeStart = '';
            i++;
            continue;
        }
        // now might be the start of a range.
        // can be either c-d or c-] or c<more...>] or c] at this point
        if (glob.startsWith('-]', i + 1)) {
            ranges.push(braceEscape(c + '-'));
            i += 2;
            continue;
        }
        if (glob.startsWith('-', i + 1)) {
            rangeStart = c;
            i += 2;
            continue;
        }
        // not the start of a range, just a single character
        ranges.push(braceEscape(c));
        i++;
    }
    if (endPos < i) {
        // didn't see the end of the class, not a valid class,
        // but might still be valid as a literal match.
        return ['', false, 0, false];
    }
    // if we got no ranges and no negates, then we have a range that
    // cannot possibly match anything, and that poisons the whole glob
    if (!ranges.length && !negs.length) {
        return ['$.', false, glob.length - pos, true];
    }
    // if we got one positive range, and it's a single character, then that's
    // not actually a magic pattern, it's just that one literal character.
    // we should not treat that as "magic", we should just return the literal
    // character. [_] is a perfectly valid way to escape glob magic chars.
    if (negs.length === 0 &&
        ranges.length === 1 &&
        /^\\?.$/.test(ranges[0]) &&
        !negate) {
        const r = ranges[0].length === 2 ? ranges[0].slice(-1) : ranges[0];
        return [regexpEscape(r), false, endPos - pos, false];
    }
    const sranges = '[' + (negate ? '^' : '') + rangesToString(ranges) + ']';
    const snegs = '[' + (negate ? '' : '^') + rangesToString(negs) + ']';
    const comb = ranges.length && negs.length
        ? '(' + sranges + '|' + snegs + ')'
        : ranges.length
            ? sranges
            : snegs;
    return [comb, uflag, endPos - pos, true];
};

/**
 * Un-escape a string that has been escaped with {@link escape}.
 *
 * If the {@link windowsPathsNoEscape} option is used, then square-brace
 * escapes are removed, but not backslash escapes.  For example, it will turn
 * the string `'[*]'` into `*`, but it will not turn `'\\*'` into `'*'`,
 * becuase `\` is a path separator in `windowsPathsNoEscape` mode.
 *
 * When `windowsPathsNoEscape` is not set, then both brace escapes and
 * backslash escapes are removed.
 *
 * Slashes (and backslashes in `windowsPathsNoEscape` mode) cannot be escaped
 * or unescaped.
 */
const unescape = (s, { windowsPathsNoEscape = false, } = {}) => {
    return windowsPathsNoEscape
        ? s.replace(/\[([^\/\\])\]/g, '$1')
        : s.replace(/((?!\\).|^)\[([^\/\\])\]/g, '$1$2').replace(/\\([^\/])/g, '$1');
};

// parse a single path portion
const types = new Set(['!', '?', '+', '*', '@']);
const isExtglobType = (c) => types.has(c);
// Patterns that get prepended to bind to the start of either the
// entire string, or just a single path portion, to prevent dots
// and/or traversal patterns, when needed.
// Exts don't need the ^ or / bit, because the root binds that already.
const startNoTraversal = '(?!(?:^|/)\\.\\.?(?:$|/))';
const startNoDot = '(?!\\.)';
// characters that indicate a start of pattern needs the "no dots" bit,
// because a dot *might* be matched. ( is not in the list, because in
// the case of a child extglob, it will handle the prevention itself.
const addPatternStart = new Set(['[', '.']);
// cases where traversal is A-OK, no dot prevention needed
const justDots = new Set(['..', '.']);
const reSpecials = new Set('().*{}+?[]^$\\!');
const regExpEscape$1 = (s) => s.replace(/[-[\]{}()*+?.,\\^$|#\s]/g, '\\$&');
// any single thing other than /
const qmark$1 = '[^/]';
// * => any number of characters
const star$1 = qmark$1 + '*?';
// use + when we need to ensure that *something* matches, because the * is
// the only thing in the path portion.
const starNoEmpty = qmark$1 + '+?';
// remove the \ chars that we added if we end up doing a nonmagic compare
// const deslash = (s: string) => s.replace(/\\(.)/g, '$1')
class AST {
    type;
    #root;
    #hasMagic;
    #uflag = false;
    #parts = [];
    #parent;
    #parentIndex;
    #negs;
    #filledNegs = false;
    #options;
    #toString;
    // set to true if it's an extglob with no children
    // (which really means one child of '')
    #emptyExt = false;
    constructor(type, parent, options = {}) {
        this.type = type;
        // extglobs are inherently magical
        if (type)
            this.#hasMagic = true;
        this.#parent = parent;
        this.#root = this.#parent ? this.#parent.#root : this;
        this.#options = this.#root === this ? options : this.#root.#options;
        this.#negs = this.#root === this ? [] : this.#root.#negs;
        if (type === '!' && !this.#root.#filledNegs)
            this.#negs.push(this);
        this.#parentIndex = this.#parent ? this.#parent.#parts.length : 0;
    }
    get hasMagic() {
        /* c8 ignore start */
        if (this.#hasMagic !== undefined)
            return this.#hasMagic;
        /* c8 ignore stop */
        for (const p of this.#parts) {
            if (typeof p === 'string')
                continue;
            if (p.type || p.hasMagic)
                return (this.#hasMagic = true);
        }
        // note: will be undefined until we generate the regexp src and find out
        return this.#hasMagic;
    }
    // reconstructs the pattern
    toString() {
        if (this.#toString !== undefined)
            return this.#toString;
        if (!this.type) {
            return (this.#toString = this.#parts.map(p => String(p)).join(''));
        }
        else {
            return (this.#toString =
                this.type + '(' + this.#parts.map(p => String(p)).join('|') + ')');
        }
    }
    #fillNegs() {
        /* c8 ignore start */
        if (this !== this.#root)
            throw new Error('should only call on root');
        if (this.#filledNegs)
            return this;
        /* c8 ignore stop */
        // call toString() once to fill this out
        this.toString();
        this.#filledNegs = true;
        let n;
        while ((n = this.#negs.pop())) {
            if (n.type !== '!')
                continue;
            // walk up the tree, appending everthing that comes AFTER parentIndex
            let p = n;
            let pp = p.#parent;
            while (pp) {
                for (let i = p.#parentIndex + 1; !pp.type && i < pp.#parts.length; i++) {
                    for (const part of n.#parts) {
                        /* c8 ignore start */
                        if (typeof part === 'string') {
                            throw new Error('string part in extglob AST??');
                        }
                        /* c8 ignore stop */
                        part.copyIn(pp.#parts[i]);
                    }
                }
                p = pp;
                pp = p.#parent;
            }
        }
        return this;
    }
    push(...parts) {
        for (const p of parts) {
            if (p === '')
                continue;
            /* c8 ignore start */
            if (typeof p !== 'string' && !(p instanceof AST && p.#parent === this)) {
                throw new Error('invalid part: ' + p);
            }
            /* c8 ignore stop */
            this.#parts.push(p);
        }
    }
    toJSON() {
        const ret = this.type === null
            ? this.#parts.slice().map(p => (typeof p === 'string' ? p : p.toJSON()))
            : [this.type, ...this.#parts.map(p => p.toJSON())];
        if (this.isStart() && !this.type)
            ret.unshift([]);
        if (this.isEnd() &&
            (this === this.#root ||
                (this.#root.#filledNegs && this.#parent?.type === '!'))) {
            ret.push({});
        }
        return ret;
    }
    isStart() {
        if (this.#root === this)
            return true;
        // if (this.type) return !!this.#parent?.isStart()
        if (!this.#parent?.isStart())
            return false;
        if (this.#parentIndex === 0)
            return true;
        // if everything AHEAD of this is a negation, then it's still the "start"
        const p = this.#parent;
        for (let i = 0; i < this.#parentIndex; i++) {
            const pp = p.#parts[i];
            if (!(pp instanceof AST && pp.type === '!')) {
                return false;
            }
        }
        return true;
    }
    isEnd() {
        if (this.#root === this)
            return true;
        if (this.#parent?.type === '!')
            return true;
        if (!this.#parent?.isEnd())
            return false;
        if (!this.type)
            return this.#parent?.isEnd();
        // if not root, it'll always have a parent
        /* c8 ignore start */
        const pl = this.#parent ? this.#parent.#parts.length : 0;
        /* c8 ignore stop */
        return this.#parentIndex === pl - 1;
    }
    copyIn(part) {
        if (typeof part === 'string')
            this.push(part);
        else
            this.push(part.clone(this));
    }
    clone(parent) {
        const c = new AST(this.type, parent);
        for (const p of this.#parts) {
            c.copyIn(p);
        }
        return c;
    }
    static #parseAST(str, ast, pos, opt) {
        let escaping = false;
        let inBrace = false;
        let braceStart = -1;
        let braceNeg = false;
        if (ast.type === null) {
            // outside of a extglob, append until we find a start
            let i = pos;
            let acc = '';
            while (i < str.length) {
                const c = str.charAt(i++);
                // still accumulate escapes at this point, but we do ignore
                // starts that are escaped
                if (escaping || c === '\\') {
                    escaping = !escaping;
                    acc += c;
                    continue;
                }
                if (inBrace) {
                    if (i === braceStart + 1) {
                        if (c === '^' || c === '!') {
                            braceNeg = true;
                        }
                    }
                    else if (c === ']' && !(i === braceStart + 2 && braceNeg)) {
                        inBrace = false;
                    }
                    acc += c;
                    continue;
                }
                else if (c === '[') {
                    inBrace = true;
                    braceStart = i;
                    braceNeg = false;
                    acc += c;
                    continue;
                }
                if (!opt.noext && isExtglobType(c) && str.charAt(i) === '(') {
                    ast.push(acc);
                    acc = '';
                    const ext = new AST(c, ast);
                    i = AST.#parseAST(str, ext, i, opt);
                    ast.push(ext);
                    continue;
                }
                acc += c;
            }
            ast.push(acc);
            return i;
        }
        // some kind of extglob, pos is at the (
        // find the next | or )
        let i = pos + 1;
        let part = new AST(null, ast);
        const parts = [];
        let acc = '';
        while (i < str.length) {
            const c = str.charAt(i++);
            // still accumulate escapes at this point, but we do ignore
            // starts that are escaped
            if (escaping || c === '\\') {
                escaping = !escaping;
                acc += c;
                continue;
            }
            if (inBrace) {
                if (i === braceStart + 1) {
                    if (c === '^' || c === '!') {
                        braceNeg = true;
                    }
                }
                else if (c === ']' && !(i === braceStart + 2 && braceNeg)) {
                    inBrace = false;
                }
                acc += c;
                continue;
            }
            else if (c === '[') {
                inBrace = true;
                braceStart = i;
                braceNeg = false;
                acc += c;
                continue;
            }
            if (isExtglobType(c) && str.charAt(i) === '(') {
                part.push(acc);
                acc = '';
                const ext = new AST(c, part);
                part.push(ext);
                i = AST.#parseAST(str, ext, i, opt);
                continue;
            }
            if (c === '|') {
                part.push(acc);
                acc = '';
                parts.push(part);
                part = new AST(null, ast);
                continue;
            }
            if (c === ')') {
                if (acc === '' && ast.#parts.length === 0) {
                    ast.#emptyExt = true;
                }
                part.push(acc);
                acc = '';
                ast.push(...parts, part);
                return i;
            }
            acc += c;
        }
        // unfinished extglob
        // if we got here, it was a malformed extglob! not an extglob, but
        // maybe something else in there.
        ast.type = null;
        ast.#hasMagic = undefined;
        ast.#parts = [str.substring(pos - 1)];
        return i;
    }
    static fromGlob(pattern, options = {}) {
        const ast = new AST(null, undefined, options);
        AST.#parseAST(pattern, ast, 0, options);
        return ast;
    }
    // returns the regular expression if there's magic, or the unescaped
    // string if not.
    toMMPattern() {
        // should only be called on root
        /* c8 ignore start */
        if (this !== this.#root)
            return this.#root.toMMPattern();
        /* c8 ignore stop */
        const glob = this.toString();
        const [re, body, hasMagic, uflag] = this.toRegExpSource();
        // if we're in nocase mode, and not nocaseMagicOnly, then we do
        // still need a regular expression if we have to case-insensitively
        // match capital/lowercase characters.
        const anyMagic = hasMagic ||
            this.#hasMagic ||
            (this.#options.nocase &&
                !this.#options.nocaseMagicOnly &&
                glob.toUpperCase() !== glob.toLowerCase());
        if (!anyMagic) {
            return body;
        }
        const flags = (this.#options.nocase ? 'i' : '') + (uflag ? 'u' : '');
        return Object.assign(new RegExp(`^${re}$`, flags), {
            _src: re,
            _glob: glob,
        });
    }
    get options() {
        return this.#options;
    }
    // returns the string match, the regexp source, whether there's magic
    // in the regexp (so a regular expression is required) and whether or
    // not the uflag is needed for the regular expression (for posix classes)
    // TODO: instead of injecting the start/end at this point, just return
    // the BODY of the regexp, along with the start/end portions suitable
    // for binding the start/end in either a joined full-path makeRe context
    // (where we bind to (^|/), or a standalone matchPart context (where
    // we bind to ^, and not /).  Otherwise slashes get duped!
    //
    // In part-matching mode, the start is:
    // - if not isStart: nothing
    // - if traversal possible, but not allowed: ^(?!\.\.?$)
    // - if dots allowed or not possible: ^
    // - if dots possible and not allowed: ^(?!\.)
    // end is:
    // - if not isEnd(): nothing
    // - else: $
    //
    // In full-path matching mode, we put the slash at the START of the
    // pattern, so start is:
    // - if first pattern: same as part-matching mode
    // - if not isStart(): nothing
    // - if traversal possible, but not allowed: /(?!\.\.?(?:$|/))
    // - if dots allowed or not possible: /
    // - if dots possible and not allowed: /(?!\.)
    // end is:
    // - if last pattern, same as part-matching mode
    // - else nothing
    //
    // Always put the (?:$|/) on negated tails, though, because that has to be
    // there to bind the end of the negated pattern portion, and it's easier to
    // just stick it in now rather than try to inject it later in the middle of
    // the pattern.
    //
    // We can just always return the same end, and leave it up to the caller
    // to know whether it's going to be used joined or in parts.
    // And, if the start is adjusted slightly, can do the same there:
    // - if not isStart: nothing
    // - if traversal possible, but not allowed: (?:/|^)(?!\.\.?$)
    // - if dots allowed or not possible: (?:/|^)
    // - if dots possible and not allowed: (?:/|^)(?!\.)
    //
    // But it's better to have a simpler binding without a conditional, for
    // performance, so probably better to return both start options.
    //
    // Then the caller just ignores the end if it's not the first pattern,
    // and the start always gets applied.
    //
    // But that's always going to be $ if it's the ending pattern, or nothing,
    // so the caller can just attach $ at the end of the pattern when building.
    //
    // So the todo is:
    // - better detect what kind of start is needed
    // - return both flavors of starting pattern
    // - attach $ at the end of the pattern when creating the actual RegExp
    //
    // Ah, but wait, no, that all only applies to the root when the first pattern
    // is not an extglob. If the first pattern IS an extglob, then we need all
    // that dot prevention biz to live in the extglob portions, because eg
    // +(*|.x*) can match .xy but not .yx.
    //
    // So, return the two flavors if it's #root and the first child is not an
    // AST, otherwise leave it to the child AST to handle it, and there,
    // use the (?:^|/) style of start binding.
    //
    // Even simplified further:
    // - Since the start for a join is eg /(?!\.) and the start for a part
    // is ^(?!\.), we can just prepend (?!\.) to the pattern (either root
    // or start or whatever) and prepend ^ or / at the Regexp construction.
    toRegExpSource(allowDot) {
        const dot = allowDot ?? !!this.#options.dot;
        if (this.#root === this)
            this.#fillNegs();
        if (!this.type) {
            const noEmpty = this.isStart() && this.isEnd();
            const src = this.#parts
                .map(p => {
                const [re, _, hasMagic, uflag] = typeof p === 'string'
                    ? AST.#parseGlob(p, this.#hasMagic, noEmpty)
                    : p.toRegExpSource(allowDot);
                this.#hasMagic = this.#hasMagic || hasMagic;
                this.#uflag = this.#uflag || uflag;
                return re;
            })
                .join('');
            let start = '';
            if (this.isStart()) {
                if (typeof this.#parts[0] === 'string') {
                    // this is the string that will match the start of the pattern,
                    // so we need to protect against dots and such.
                    // '.' and '..' cannot match unless the pattern is that exactly,
                    // even if it starts with . or dot:true is set.
                    const dotTravAllowed = this.#parts.length === 1 && justDots.has(this.#parts[0]);
                    if (!dotTravAllowed) {
                        const aps = addPatternStart;
                        // check if we have a possibility of matching . or ..,
                        // and prevent that.
                        const needNoTrav = 
                        // dots are allowed, and the pattern starts with [ or .
                        (dot && aps.has(src.charAt(0))) ||
                            // the pattern starts with \., and then [ or .
                            (src.startsWith('\\.') && aps.has(src.charAt(2))) ||
                            // the pattern starts with \.\., and then [ or .
                            (src.startsWith('\\.\\.') && aps.has(src.charAt(4)));
                        // no need to prevent dots if it can't match a dot, or if a
                        // sub-pattern will be preventing it anyway.
                        const needNoDot = !dot && !allowDot && aps.has(src.charAt(0));
                        start = needNoTrav ? startNoTraversal : needNoDot ? startNoDot : '';
                    }
                }
            }
            // append the "end of path portion" pattern to negation tails
            let end = '';
            if (this.isEnd() &&
                this.#root.#filledNegs &&
                this.#parent?.type === '!') {
                end = '(?:$|\\/)';
            }
            const final = start + src + end;
            return [
                final,
                unescape(src),
                (this.#hasMagic = !!this.#hasMagic),
                this.#uflag,
            ];
        }
        // We need to calculate the body *twice* if it's a repeat pattern
        // at the start, once in nodot mode, then again in dot mode, so a
        // pattern like *(?) can match 'x.y'
        const repeated = this.type === '*' || this.type === '+';
        // some kind of extglob
        const start = this.type === '!' ? '(?:(?!(?:' : '(?:';
        let body = this.#partsToRegExp(dot);
        if (this.isStart() && this.isEnd() && !body && this.type !== '!') {
            // invalid extglob, has to at least be *something* present, if it's
            // the entire path portion.
            const s = this.toString();
            this.#parts = [s];
            this.type = null;
            this.#hasMagic = undefined;
            return [s, unescape(this.toString()), false, false];
        }
        // XXX abstract out this map method
        let bodyDotAllowed = !repeated || allowDot || dot || false
            ? ''
            : this.#partsToRegExp(true);
        if (bodyDotAllowed === body) {
            bodyDotAllowed = '';
        }
        if (bodyDotAllowed) {
            body = `(?:${body})(?:${bodyDotAllowed})*?`;
        }
        // an empty !() is exactly equivalent to a starNoEmpty
        let final = '';
        if (this.type === '!' && this.#emptyExt) {
            final = (this.isStart() && !dot ? startNoDot : '') + starNoEmpty;
        }
        else {
            const close = this.type === '!'
                ? // !() must match something,but !(x) can match ''
                    '))' +
                        (this.isStart() && !dot && !allowDot ? startNoDot : '') +
                        star$1 +
                        ')'
                : this.type === '@'
                    ? ')'
                    : this.type === '?'
                        ? ')?'
                        : this.type === '+' && bodyDotAllowed
                            ? ')'
                            : this.type === '*' && bodyDotAllowed
                                ? `)?`
                                : `)${this.type}`;
            final = start + body + close;
        }
        return [
            final,
            unescape(body),
            (this.#hasMagic = !!this.#hasMagic),
            this.#uflag,
        ];
    }
    #partsToRegExp(dot) {
        return this.#parts
            .map(p => {
            // extglob ASTs should only contain parent ASTs
            /* c8 ignore start */
            if (typeof p === 'string') {
                throw new Error('string type in extglob ast??');
            }
            /* c8 ignore stop */
            // can ignore hasMagic, because extglobs are already always magic
            const [re, _, _hasMagic, uflag] = p.toRegExpSource(dot);
            this.#uflag = this.#uflag || uflag;
            return re;
        })
            .filter(p => !(this.isStart() && this.isEnd()) || !!p)
            .join('|');
    }
    static #parseGlob(glob, hasMagic, noEmpty = false) {
        let escaping = false;
        let re = '';
        let uflag = false;
        for (let i = 0; i < glob.length; i++) {
            const c = glob.charAt(i);
            if (escaping) {
                escaping = false;
                re += (reSpecials.has(c) ? '\\' : '') + c;
                continue;
            }
            if (c === '\\') {
                if (i === glob.length - 1) {
                    re += '\\\\';
                }
                else {
                    escaping = true;
                }
                continue;
            }
            if (c === '[') {
                const [src, needUflag, consumed, magic] = parseClass(glob, i);
                if (consumed) {
                    re += src;
                    uflag = uflag || needUflag;
                    i += consumed - 1;
                    hasMagic = hasMagic || magic;
                    continue;
                }
            }
            if (c === '*') {
                if (noEmpty && glob === '*')
                    re += starNoEmpty;
                else
                    re += star$1;
                hasMagic = true;
                continue;
            }
            if (c === '?') {
                re += qmark$1;
                hasMagic = true;
                continue;
            }
            re += regExpEscape$1(c);
        }
        return [re, unescape(glob), !!hasMagic, uflag];
    }
}

/**
 * Escape all magic characters in a glob pattern.
 *
 * If the {@link windowsPathsNoEscape | GlobOptions.windowsPathsNoEscape}
 * option is used, then characters are escaped by wrapping in `[]`, because
 * a magic character wrapped in a character class can only be satisfied by
 * that exact character.  In this mode, `\` is _not_ escaped, because it is
 * not interpreted as a magic character, but instead as a path separator.
 */
const escape = (s, { windowsPathsNoEscape = false, } = {}) => {
    // don't need to escape +@! because we escape the parens
    // that make those magic, and escaping ! as [!] isn't valid,
    // because [!]] is a valid glob class meaning not ']'.
    return windowsPathsNoEscape
        ? s.replace(/[?*()[\]]/g, '[$&]')
        : s.replace(/[?*()[\]\\]/g, '\\$&');
};

const minimatch = (p, pattern, options = {}) => {
    assertValidPattern(pattern);
    // shortcut: comments match nothing.
    if (!options.nocomment && pattern.charAt(0) === '#') {
        return false;
    }
    return new Minimatch(pattern, options).match(p);
};
// Optimized checking for the most common glob patterns.
const starDotExtRE = /^\*+([^+@!?\*\[\(]*)$/;
const starDotExtTest = (ext) => (f) => !f.startsWith('.') && f.endsWith(ext);
const starDotExtTestDot = (ext) => (f) => f.endsWith(ext);
const starDotExtTestNocase = (ext) => {
    ext = ext.toLowerCase();
    return (f) => !f.startsWith('.') && f.toLowerCase().endsWith(ext);
};
const starDotExtTestNocaseDot = (ext) => {
    ext = ext.toLowerCase();
    return (f) => f.toLowerCase().endsWith(ext);
};
const starDotStarRE = /^\*+\.\*+$/;
const starDotStarTest = (f) => !f.startsWith('.') && f.includes('.');
const starDotStarTestDot = (f) => f !== '.' && f !== '..' && f.includes('.');
const dotStarRE = /^\.\*+$/;
const dotStarTest = (f) => f !== '.' && f !== '..' && f.startsWith('.');
const starRE = /^\*+$/;
const starTest = (f) => f.length !== 0 && !f.startsWith('.');
const starTestDot = (f) => f.length !== 0 && f !== '.' && f !== '..';
const qmarksRE = /^\?+([^+@!?\*\[\(]*)?$/;
const qmarksTestNocase = ([$0, ext = '']) => {
    const noext = qmarksTestNoExt([$0]);
    if (!ext)
        return noext;
    ext = ext.toLowerCase();
    return (f) => noext(f) && f.toLowerCase().endsWith(ext);
};
const qmarksTestNocaseDot = ([$0, ext = '']) => {
    const noext = qmarksTestNoExtDot([$0]);
    if (!ext)
        return noext;
    ext = ext.toLowerCase();
    return (f) => noext(f) && f.toLowerCase().endsWith(ext);
};
const qmarksTestDot = ([$0, ext = '']) => {
    const noext = qmarksTestNoExtDot([$0]);
    return !ext ? noext : (f) => noext(f) && f.endsWith(ext);
};
const qmarksTest = ([$0, ext = '']) => {
    const noext = qmarksTestNoExt([$0]);
    return !ext ? noext : (f) => noext(f) && f.endsWith(ext);
};
const qmarksTestNoExt = ([$0]) => {
    const len = $0.length;
    return (f) => f.length === len && !f.startsWith('.');
};
const qmarksTestNoExtDot = ([$0]) => {
    const len = $0.length;
    return (f) => f.length === len && f !== '.' && f !== '..';
};
/* c8 ignore start */
const defaultPlatform = (typeof process === 'object' && process
    ? (typeof process.env === 'object' &&
        process.env &&
        process.env.__MINIMATCH_TESTING_PLATFORM__) ||
        process.platform
    : 'posix');
const path = {
    win32: { sep: '\\' },
    posix: { sep: '/' },
};
/* c8 ignore stop */
const sep = defaultPlatform === 'win32' ? path.win32.sep : path.posix.sep;
minimatch.sep = sep;
const GLOBSTAR = Symbol('globstar **');
minimatch.GLOBSTAR = GLOBSTAR;
// any single thing other than /
// don't need to escape / when using new RegExp()
const qmark = '[^/]';
// * => any number of characters
const star = qmark + '*?';
// ** when dots are allowed.  Anything goes, except .. and .
// not (^ or / followed by one or two dots followed by $ or /),
// followed by anything, any number of times.
const twoStarDot = '(?:(?!(?:\\/|^)(?:\\.{1,2})($|\\/)).)*?';
// not a ^ or / followed by a dot,
// followed by anything, any number of times.
const twoStarNoDot = '(?:(?!(?:\\/|^)\\.).)*?';
const filter = (pattern, options = {}) => (p) => minimatch(p, pattern, options);
minimatch.filter = filter;
const ext = (a, b = {}) => Object.assign({}, a, b);
const defaults = (def) => {
    if (!def || typeof def !== 'object' || !Object.keys(def).length) {
        return minimatch;
    }
    const orig = minimatch;
    const m = (p, pattern, options = {}) => orig(p, pattern, ext(def, options));
    return Object.assign(m, {
        Minimatch: class Minimatch extends orig.Minimatch {
            constructor(pattern, options = {}) {
                super(pattern, ext(def, options));
            }
            static defaults(options) {
                return orig.defaults(ext(def, options)).Minimatch;
            }
        },
        AST: class AST extends orig.AST {
            /* c8 ignore start */
            constructor(type, parent, options = {}) {
                super(type, parent, ext(def, options));
            }
            /* c8 ignore stop */
            static fromGlob(pattern, options = {}) {
                return orig.AST.fromGlob(pattern, ext(def, options));
            }
        },
        unescape: (s, options = {}) => orig.unescape(s, ext(def, options)),
        escape: (s, options = {}) => orig.escape(s, ext(def, options)),
        filter: (pattern, options = {}) => orig.filter(pattern, ext(def, options)),
        defaults: (options) => orig.defaults(ext(def, options)),
        makeRe: (pattern, options = {}) => orig.makeRe(pattern, ext(def, options)),
        braceExpand: (pattern, options = {}) => orig.braceExpand(pattern, ext(def, options)),
        match: (list, pattern, options = {}) => orig.match(list, pattern, ext(def, options)),
        sep: orig.sep,
        GLOBSTAR: GLOBSTAR,
    });
};
minimatch.defaults = defaults;
// Brace expansion:
// a{b,c}d -> abd acd
// a{b,}c -> abc ac
// a{0..3}d -> a0d a1d a2d a3d
// a{b,c{d,e}f}g -> abg acdfg acefg
// a{b,c}d{e,f}g -> abdeg acdeg abdeg abdfg
//
// Invalid sets are not expanded.
// a{2..}b -> a{2..}b
// a{b}c -> a{b}c
const braceExpand = (pattern, options = {}) => {
    assertValidPattern(pattern);
    // Thanks to Yeting Li <https://github.com/yetingli> for
    // improving this regexp to avoid a ReDOS vulnerability.
    if (options.nobrace || !/\{(?:(?!\{).)*\}/.test(pattern)) {
        // shortcut. no need to expand.
        return [pattern];
    }
    return expand(pattern);
};
minimatch.braceExpand = braceExpand;
// parse a component of the expanded set.
// At this point, no pattern may contain "/" in it
// so we're going to return a 2d array, where each entry is the full
// pattern, split on '/', and then turned into a regular expression.
// A regexp is made at the end which joins each array with an
// escaped /, and another full one which joins each regexp with |.
//
// Following the lead of Bash 4.1, note that "**" only has special meaning
// when it is the *only* thing in a path portion.  Otherwise, any series
// of * is equivalent to a single *.  Globstar behavior is enabled by
// default, and can be disabled by setting options.noglobstar.
const makeRe = (pattern, options = {}) => new Minimatch(pattern, options).makeRe();
minimatch.makeRe = makeRe;
const match = (list, pattern, options = {}) => {
    const mm = new Minimatch(pattern, options);
    list = list.filter(f => mm.match(f));
    if (mm.options.nonull && !list.length) {
        list.push(pattern);
    }
    return list;
};
minimatch.match = match;
// replace stuff like \* with *
const globMagic = /[?*]|[+@!]\(.*?\)|\[|\]/;
const regExpEscape = (s) => s.replace(/[-[\]{}()*+?.,\\^$|#\s]/g, '\\$&');
class Minimatch {
    options;
    set;
    pattern;
    windowsPathsNoEscape;
    nonegate;
    negate;
    comment;
    empty;
    preserveMultipleSlashes;
    partial;
    globSet;
    globParts;
    nocase;
    isWindows;
    platform;
    windowsNoMagicRoot;
    regexp;
    constructor(pattern, options = {}) {
        assertValidPattern(pattern);
        options = options || {};
        this.options = options;
        this.pattern = pattern;
        this.platform = options.platform || defaultPlatform;
        this.isWindows = this.platform === 'win32';
        this.windowsPathsNoEscape =
            !!options.windowsPathsNoEscape || options.allowWindowsEscape === false;
        if (this.windowsPathsNoEscape) {
            this.pattern = this.pattern.replace(/\\/g, '/');
        }
        this.preserveMultipleSlashes = !!options.preserveMultipleSlashes;
        this.regexp = null;
        this.negate = false;
        this.nonegate = !!options.nonegate;
        this.comment = false;
        this.empty = false;
        this.partial = !!options.partial;
        this.nocase = !!this.options.nocase;
        this.windowsNoMagicRoot =
            options.windowsNoMagicRoot !== undefined
                ? options.windowsNoMagicRoot
                : !!(this.isWindows && this.nocase);
        this.globSet = [];
        this.globParts = [];
        this.set = [];
        // make the set of regexps etc.
        this.make();
    }
    hasMagic() {
        if (this.options.magicalBraces && this.set.length > 1) {
            return true;
        }
        for (const pattern of this.set) {
            for (const part of pattern) {
                if (typeof part !== 'string')
                    return true;
            }
        }
        return false;
    }
    debug(..._) { }
    make() {
        const pattern = this.pattern;
        const options = this.options;
        // empty patterns and comments match nothing.
        if (!options.nocomment && pattern.charAt(0) === '#') {
            this.comment = true;
            return;
        }
        if (!pattern) {
            this.empty = true;
            return;
        }
        // step 1: figure out negation, etc.
        this.parseNegate();
        // step 2: expand braces
        this.globSet = [...new Set(this.braceExpand())];
        if (options.debug) {
            this.debug = (...args) => console.error(...args);
        }
        this.debug(this.pattern, this.globSet);
        // step 3: now we have a set, so turn each one into a series of
        // path-portion matching patterns.
        // These will be regexps, except in the case of "**", which is
        // set to the GLOBSTAR object for globstar behavior,
        // and will not contain any / characters
        //
        // First, we preprocess to make the glob pattern sets a bit simpler
        // and deduped.  There are some perf-killing patterns that can cause
        // problems with a glob walk, but we can simplify them down a bit.
        const rawGlobParts = this.globSet.map(s => this.slashSplit(s));
        this.globParts = this.preprocess(rawGlobParts);
        this.debug(this.pattern, this.globParts);
        // glob --> regexps
        let set = this.globParts.map((s, _, __) => {
            if (this.isWindows && this.windowsNoMagicRoot) {
                // check if it's a drive or unc path.
                const isUNC = s[0] === '' &&
                    s[1] === '' &&
                    (s[2] === '?' || !globMagic.test(s[2])) &&
                    !globMagic.test(s[3]);
                const isDrive = /^[a-z]:/i.test(s[0]);
                if (isUNC) {
                    return [...s.slice(0, 4), ...s.slice(4).map(ss => this.parse(ss))];
                }
                else if (isDrive) {
                    return [s[0], ...s.slice(1).map(ss => this.parse(ss))];
                }
            }
            return s.map(ss => this.parse(ss));
        });
        this.debug(this.pattern, set);
        // filter out everything that didn't compile properly.
        this.set = set.filter(s => s.indexOf(false) === -1);
        // do not treat the ? in UNC paths as magic
        if (this.isWindows) {
            for (let i = 0; i < this.set.length; i++) {
                const p = this.set[i];
                if (p[0] === '' &&
                    p[1] === '' &&
                    this.globParts[i][2] === '?' &&
                    typeof p[3] === 'string' &&
                    /^[a-z]:$/i.test(p[3])) {
                    p[2] = '?';
                }
            }
        }
        this.debug(this.pattern, this.set);
    }
    // various transforms to equivalent pattern sets that are
    // faster to process in a filesystem walk.  The goal is to
    // eliminate what we can, and push all ** patterns as far
    // to the right as possible, even if it increases the number
    // of patterns that we have to process.
    preprocess(globParts) {
        // if we're not in globstar mode, then turn all ** into *
        if (this.options.noglobstar) {
            for (let i = 0; i < globParts.length; i++) {
                for (let j = 0; j < globParts[i].length; j++) {
                    if (globParts[i][j] === '**') {
                        globParts[i][j] = '*';
                    }
                }
            }
        }
        const { optimizationLevel = 1 } = this.options;
        if (optimizationLevel >= 2) {
            // aggressive optimization for the purpose of fs walking
            globParts = this.firstPhasePreProcess(globParts);
            globParts = this.secondPhasePreProcess(globParts);
        }
        else if (optimizationLevel >= 1) {
            // just basic optimizations to remove some .. parts
            globParts = this.levelOneOptimize(globParts);
        }
        else {
            // just collapse multiple ** portions into one
            globParts = this.adjascentGlobstarOptimize(globParts);
        }
        return globParts;
    }
    // just get rid of adjascent ** portions
    adjascentGlobstarOptimize(globParts) {
        return globParts.map(parts => {
            let gs = -1;
            while (-1 !== (gs = parts.indexOf('**', gs + 1))) {
                let i = gs;
                while (parts[i + 1] === '**') {
                    i++;
                }
                if (i !== gs) {
                    parts.splice(gs, i - gs);
                }
            }
            return parts;
        });
    }
    // get rid of adjascent ** and resolve .. portions
    levelOneOptimize(globParts) {
        return globParts.map(parts => {
            parts = parts.reduce((set, part) => {
                const prev = set[set.length - 1];
                if (part === '**' && prev === '**') {
                    return set;
                }
                if (part === '..') {
                    if (prev && prev !== '..' && prev !== '.' && prev !== '**') {
                        set.pop();
                        return set;
                    }
                }
                set.push(part);
                return set;
            }, []);
            return parts.length === 0 ? [''] : parts;
        });
    }
    levelTwoFileOptimize(parts) {
        if (!Array.isArray(parts)) {
            parts = this.slashSplit(parts);
        }
        let didSomething = false;
        do {
            didSomething = false;
            // <pre>/<e>/<rest> -> <pre>/<rest>
            if (!this.preserveMultipleSlashes) {
                for (let i = 1; i < parts.length - 1; i++) {
                    const p = parts[i];
                    // don't squeeze out UNC patterns
                    if (i === 1 && p === '' && parts[0] === '')
                        continue;
                    if (p === '.' || p === '') {
                        didSomething = true;
                        parts.splice(i, 1);
                        i--;
                    }
                }
                if (parts[0] === '.' &&
                    parts.length === 2 &&
                    (parts[1] === '.' || parts[1] === '')) {
                    didSomething = true;
                    parts.pop();
                }
            }
            // <pre>/<p>/../<rest> -> <pre>/<rest>
            let dd = 0;
            while (-1 !== (dd = parts.indexOf('..', dd + 1))) {
                const p = parts[dd - 1];
                if (p && p !== '.' && p !== '..' && p !== '**') {
                    didSomething = true;
                    parts.splice(dd - 1, 2);
                    dd -= 2;
                }
            }
        } while (didSomething);
        return parts.length === 0 ? [''] : parts;
    }
    // First phase: single-pattern processing
    // <pre> is 1 or more portions
    // <rest> is 1 or more portions
    // <p> is any portion other than ., .., '', or **
    // <e> is . or ''
    //
    // **/.. is *brutal* for filesystem walking performance, because
    // it effectively resets the recursive walk each time it occurs,
    // and ** cannot be reduced out by a .. pattern part like a regexp
    // or most strings (other than .., ., and '') can be.
    //
    // <pre>/**/../<p>/<p>/<rest> -> {<pre>/../<p>/<p>/<rest>,<pre>/**/<p>/<p>/<rest>}
    // <pre>/<e>/<rest> -> <pre>/<rest>
    // <pre>/<p>/../<rest> -> <pre>/<rest>
    // **/**/<rest> -> **/<rest>
    //
    // **/*/<rest> -> */**/<rest> <== not valid because ** doesn't follow
    // this WOULD be allowed if ** did follow symlinks, or * didn't
    firstPhasePreProcess(globParts) {
        let didSomething = false;
        do {
            didSomething = false;
            // <pre>/**/../<p>/<p>/<rest> -> {<pre>/../<p>/<p>/<rest>,<pre>/**/<p>/<p>/<rest>}
            for (let parts of globParts) {
                let gs = -1;
                while (-1 !== (gs = parts.indexOf('**', gs + 1))) {
                    let gss = gs;
                    while (parts[gss + 1] === '**') {
                        // <pre>/**/**/<rest> -> <pre>/**/<rest>
                        gss++;
                    }
                    // eg, if gs is 2 and gss is 4, that means we have 3 **
                    // parts, and can remove 2 of them.
                    if (gss > gs) {
                        parts.splice(gs + 1, gss - gs);
                    }
                    let next = parts[gs + 1];
                    const p = parts[gs + 2];
                    const p2 = parts[gs + 3];
                    if (next !== '..')
                        continue;
                    if (!p ||
                        p === '.' ||
                        p === '..' ||
                        !p2 ||
                        p2 === '.' ||
                        p2 === '..') {
                        continue;
                    }
                    didSomething = true;
                    // edit parts in place, and push the new one
                    parts.splice(gs, 1);
                    const other = parts.slice(0);
                    other[gs] = '**';
                    globParts.push(other);
                    gs--;
                }
                // <pre>/<e>/<rest> -> <pre>/<rest>
                if (!this.preserveMultipleSlashes) {
                    for (let i = 1; i < parts.length - 1; i++) {
                        const p = parts[i];
                        // don't squeeze out UNC patterns
                        if (i === 1 && p === '' && parts[0] === '')
                            continue;
                        if (p === '.' || p === '') {
                            didSomething = true;
                            parts.splice(i, 1);
                            i--;
                        }
                    }
                    if (parts[0] === '.' &&
                        parts.length === 2 &&
                        (parts[1] === '.' || parts[1] === '')) {
                        didSomething = true;
                        parts.pop();
                    }
                }
                // <pre>/<p>/../<rest> -> <pre>/<rest>
                let dd = 0;
                while (-1 !== (dd = parts.indexOf('..', dd + 1))) {
                    const p = parts[dd - 1];
                    if (p && p !== '.' && p !== '..' && p !== '**') {
                        didSomething = true;
                        const needDot = dd === 1 && parts[dd + 1] === '**';
                        const splin = needDot ? ['.'] : [];
                        parts.splice(dd - 1, 2, ...splin);
                        if (parts.length === 0)
                            parts.push('');
                        dd -= 2;
                    }
                }
            }
        } while (didSomething);
        return globParts;
    }
    // second phase: multi-pattern dedupes
    // {<pre>/*/<rest>,<pre>/<p>/<rest>} -> <pre>/*/<rest>
    // {<pre>/<rest>,<pre>/<rest>} -> <pre>/<rest>
    // {<pre>/**/<rest>,<pre>/<rest>} -> <pre>/**/<rest>
    //
    // {<pre>/**/<rest>,<pre>/**/<p>/<rest>} -> <pre>/**/<rest>
    // ^-- not valid because ** doens't follow symlinks
    secondPhasePreProcess(globParts) {
        for (let i = 0; i < globParts.length - 1; i++) {
            for (let j = i + 1; j < globParts.length; j++) {
                const matched = this.partsMatch(globParts[i], globParts[j], !this.preserveMultipleSlashes);
                if (matched) {
                    globParts[i] = [];
                    globParts[j] = matched;
                    break;
                }
            }
        }
        return globParts.filter(gs => gs.length);
    }
    partsMatch(a, b, emptyGSMatch = false) {
        let ai = 0;
        let bi = 0;
        let result = [];
        let which = '';
        while (ai < a.length && bi < b.length) {
            if (a[ai] === b[bi]) {
                result.push(which === 'b' ? b[bi] : a[ai]);
                ai++;
                bi++;
            }
            else if (emptyGSMatch && a[ai] === '**' && b[bi] === a[ai + 1]) {
                result.push(a[ai]);
                ai++;
            }
            else if (emptyGSMatch && b[bi] === '**' && a[ai] === b[bi + 1]) {
                result.push(b[bi]);
                bi++;
            }
            else if (a[ai] === '*' &&
                b[bi] &&
                (this.options.dot || !b[bi].startsWith('.')) &&
                b[bi] !== '**') {
                if (which === 'b')
                    return false;
                which = 'a';
                result.push(a[ai]);
                ai++;
                bi++;
            }
            else if (b[bi] === '*' &&
                a[ai] &&
                (this.options.dot || !a[ai].startsWith('.')) &&
                a[ai] !== '**') {
                if (which === 'a')
                    return false;
                which = 'b';
                result.push(b[bi]);
                ai++;
                bi++;
            }
            else {
                return false;
            }
        }
        // if we fall out of the loop, it means they two are identical
        // as long as their lengths match
        return a.length === b.length && result;
    }
    parseNegate() {
        if (this.nonegate)
            return;
        const pattern = this.pattern;
        let negate = false;
        let negateOffset = 0;
        for (let i = 0; i < pattern.length && pattern.charAt(i) === '!'; i++) {
            negate = !negate;
            negateOffset++;
        }
        if (negateOffset)
            this.pattern = pattern.slice(negateOffset);
        this.negate = negate;
    }
    // set partial to true to test if, for example,
    // "/a/b" matches the start of "/*/b/*/d"
    // Partial means, if you run out of file before you run
    // out of pattern, then that's fine, as long as all
    // the parts match.
    matchOne(file, pattern, partial = false) {
        const options = this.options;
        // UNC paths like //?/X:/... can match X:/... and vice versa
        // Drive letters in absolute drive or unc paths are always compared
        // case-insensitively.
        if (this.isWindows) {
            const fileDrive = typeof file[0] === 'string' && /^[a-z]:$/i.test(file[0]);
            const fileUNC = !fileDrive &&
                file[0] === '' &&
                file[1] === '' &&
                file[2] === '?' &&
                /^[a-z]:$/i.test(file[3]);
            const patternDrive = typeof pattern[0] === 'string' && /^[a-z]:$/i.test(pattern[0]);
            const patternUNC = !patternDrive &&
                pattern[0] === '' &&
                pattern[1] === '' &&
                pattern[2] === '?' &&
                typeof pattern[3] === 'string' &&
                /^[a-z]:$/i.test(pattern[3]);
            const fdi = fileUNC ? 3 : fileDrive ? 0 : undefined;
            const pdi = patternUNC ? 3 : patternDrive ? 0 : undefined;
            if (typeof fdi === 'number' && typeof pdi === 'number') {
                const [fd, pd] = [file[fdi], pattern[pdi]];
                if (fd.toLowerCase() === pd.toLowerCase()) {
                    pattern[pdi] = fd;
                    if (pdi > fdi) {
                        pattern = pattern.slice(pdi);
                    }
                    else if (fdi > pdi) {
                        file = file.slice(fdi);
                    }
                }
            }
        }
        // resolve and reduce . and .. portions in the file as well.
        // dont' need to do the second phase, because it's only one string[]
        const { optimizationLevel = 1 } = this.options;
        if (optimizationLevel >= 2) {
            file = this.levelTwoFileOptimize(file);
        }
        this.debug('matchOne', this, { file, pattern });
        this.debug('matchOne', file.length, pattern.length);
        for (var fi = 0, pi = 0, fl = file.length, pl = pattern.length; fi < fl && pi < pl; fi++, pi++) {
            this.debug('matchOne loop');
            var p = pattern[pi];
            var f = file[fi];
            this.debug(pattern, p, f);
            // should be impossible.
            // some invalid regexp stuff in the set.
            /* c8 ignore start */
            if (p === false) {
                return false;
            }
            /* c8 ignore stop */
            if (p === GLOBSTAR) {
                this.debug('GLOBSTAR', [pattern, p, f]);
                // "**"
                // a/**/b/**/c would match the following:
                // a/b/x/y/z/c
                // a/x/y/z/b/c
                // a/b/x/b/x/c
                // a/b/c
                // To do this, take the rest of the pattern after
                // the **, and see if it would match the file remainder.
                // If so, return success.
                // If not, the ** "swallows" a segment, and try again.
                // This is recursively awful.
                //
                // a/**/b/**/c matching a/b/x/y/z/c
                // - a matches a
                // - doublestar
                //   - matchOne(b/x/y/z/c, b/**/c)
                //     - b matches b
                //     - doublestar
                //       - matchOne(x/y/z/c, c) -> no
                //       - matchOne(y/z/c, c) -> no
                //       - matchOne(z/c, c) -> no
                //       - matchOne(c, c) yes, hit
                var fr = fi;
                var pr = pi + 1;
                if (pr === pl) {
                    this.debug('** at the end');
                    // a ** at the end will just swallow the rest.
                    // We have found a match.
                    // however, it will not swallow /.x, unless
                    // options.dot is set.
                    // . and .. are *never* matched by **, for explosively
                    // exponential reasons.
                    for (; fi < fl; fi++) {
                        if (file[fi] === '.' ||
                            file[fi] === '..' ||
                            (!options.dot && file[fi].charAt(0) === '.'))
                            return false;
                    }
                    return true;
                }
                // ok, let's see if we can swallow whatever we can.
                while (fr < fl) {
                    var swallowee = file[fr];
                    this.debug('\nglobstar while', file, fr, pattern, pr, swallowee);
                    // XXX remove this slice.  Just pass the start index.
                    if (this.matchOne(file.slice(fr), pattern.slice(pr), partial)) {
                        this.debug('globstar found match!', fr, fl, swallowee);
                        // found a match.
                        return true;
                    }
                    else {
                        // can't swallow "." or ".." ever.
                        // can only swallow ".foo" when explicitly asked.
                        if (swallowee === '.' ||
                            swallowee === '..' ||
                            (!options.dot && swallowee.charAt(0) === '.')) {
                            this.debug('dot detected!', file, fr, pattern, pr);
                            break;
                        }
                        // ** swallows a segment, and continue.
                        this.debug('globstar swallow a segment, and continue');
                        fr++;
                    }
                }
                // no match was found.
                // However, in partial mode, we can't say this is necessarily over.
                /* c8 ignore start */
                if (partial) {
                    // ran out of file
                    this.debug('\n>>> no match, partial?', file, fr, pattern, pr);
                    if (fr === fl) {
                        return true;
                    }
                }
                /* c8 ignore stop */
                return false;
            }
            // something other than **
            // non-magic patterns just have to match exactly
            // patterns with magic have been turned into regexps.
            let hit;
            if (typeof p === 'string') {
                hit = f === p;
                this.debug('string match', p, f, hit);
            }
            else {
                hit = p.test(f);
                this.debug('pattern match', p, f, hit);
            }
            if (!hit)
                return false;
        }
        // Note: ending in / means that we'll get a final ""
        // at the end of the pattern.  This can only match a
        // corresponding "" at the end of the file.
        // If the file ends in /, then it can only match a
        // a pattern that ends in /, unless the pattern just
        // doesn't have any more for it. But, a/b/ should *not*
        // match "a/b/*", even though "" matches against the
        // [^/]*? pattern, except in partial mode, where it might
        // simply not be reached yet.
        // However, a/b/ should still satisfy a/*
        // now either we fell off the end of the pattern, or we're done.
        if (fi === fl && pi === pl) {
            // ran out of pattern and filename at the same time.
            // an exact hit!
            return true;
        }
        else if (fi === fl) {
            // ran out of file, but still had pattern left.
            // this is ok if we're doing the match as part of
            // a glob fs traversal.
            return partial;
        }
        else if (pi === pl) {
            // ran out of pattern, still have file left.
            // this is only acceptable if we're on the very last
            // empty segment of a file with a trailing slash.
            // a/* should match a/b/
            return fi === fl - 1 && file[fi] === '';
            /* c8 ignore start */
        }
        else {
            // should be unreachable.
            throw new Error('wtf?');
        }
        /* c8 ignore stop */
    }
    braceExpand() {
        return braceExpand(this.pattern, this.options);
    }
    parse(pattern) {
        assertValidPattern(pattern);
        const options = this.options;
        // shortcuts
        if (pattern === '**')
            return GLOBSTAR;
        if (pattern === '')
            return '';
        // far and away, the most common glob pattern parts are
        // *, *.*, and *.<ext>  Add a fast check method for those.
        let m;
        let fastTest = null;
        if ((m = pattern.match(starRE))) {
            fastTest = options.dot ? starTestDot : starTest;
        }
        else if ((m = pattern.match(starDotExtRE))) {
            fastTest = (options.nocase
                ? options.dot
                    ? starDotExtTestNocaseDot
                    : starDotExtTestNocase
                : options.dot
                    ? starDotExtTestDot
                    : starDotExtTest)(m[1]);
        }
        else if ((m = pattern.match(qmarksRE))) {
            fastTest = (options.nocase
                ? options.dot
                    ? qmarksTestNocaseDot
                    : qmarksTestNocase
                : options.dot
                    ? qmarksTestDot
                    : qmarksTest)(m);
        }
        else if ((m = pattern.match(starDotStarRE))) {
            fastTest = options.dot ? starDotStarTestDot : starDotStarTest;
        }
        else if ((m = pattern.match(dotStarRE))) {
            fastTest = dotStarTest;
        }
        const re = AST.fromGlob(pattern, this.options).toMMPattern();
        if (fastTest && typeof re === 'object') {
            // Avoids overriding in frozen environments
            Reflect.defineProperty(re, 'test', { value: fastTest });
        }
        return re;
    }
    makeRe() {
        if (this.regexp || this.regexp === false)
            return this.regexp;
        // at this point, this.set is a 2d array of partial
        // pattern strings, or "**".
        //
        // It's better to use .match().  This function shouldn't
        // be used, really, but it's pretty convenient sometimes,
        // when you just want to work with a regex.
        const set = this.set;
        if (!set.length) {
            this.regexp = false;
            return this.regexp;
        }
        const options = this.options;
        const twoStar = options.noglobstar
            ? star
            : options.dot
                ? twoStarDot
                : twoStarNoDot;
        const flags = new Set(options.nocase ? ['i'] : []);
        // regexpify non-globstar patterns
        // if ** is only item, then we just do one twoStar
        // if ** is first, and there are more, prepend (\/|twoStar\/)? to next
        // if ** is last, append (\/twoStar|) to previous
        // if ** is in the middle, append (\/|\/twoStar\/) to previous
        // then filter out GLOBSTAR symbols
        let re = set
            .map(pattern => {
            const pp = pattern.map(p => {
                if (p instanceof RegExp) {
                    for (const f of p.flags.split(''))
                        flags.add(f);
                }
                return typeof p === 'string'
                    ? regExpEscape(p)
                    : p === GLOBSTAR
                        ? GLOBSTAR
                        : p._src;
            });
            pp.forEach((p, i) => {
                const next = pp[i + 1];
                const prev = pp[i - 1];
                if (p !== GLOBSTAR || prev === GLOBSTAR) {
                    return;
                }
                if (prev === undefined) {
                    if (next !== undefined && next !== GLOBSTAR) {
                        pp[i + 1] = '(?:\\/|' + twoStar + '\\/)?' + next;
                    }
                    else {
                        pp[i] = twoStar;
                    }
                }
                else if (next === undefined) {
                    pp[i - 1] = prev + '(?:\\/|' + twoStar + ')?';
                }
                else if (next !== GLOBSTAR) {
                    pp[i - 1] = prev + '(?:\\/|\\/' + twoStar + '\\/)' + next;
                    pp[i + 1] = GLOBSTAR;
                }
            });
            return pp.filter(p => p !== GLOBSTAR).join('/');
        })
            .join('|');
        // need to wrap in parens if we had more than one thing with |,
        // otherwise only the first will be anchored to ^ and the last to $
        const [open, close] = set.length > 1 ? ['(?:', ')'] : ['', ''];
        // must match entire pattern
        // ending in a * or ** will make it less strict.
        re = '^' + open + re + close + '$';
        // can match anything, as long as it's not this.
        if (this.negate)
            re = '^(?!' + re + ').+$';
        try {
            this.regexp = new RegExp(re, [...flags].join(''));
            /* c8 ignore start */
        }
        catch (ex) {
            // should be impossible
            this.regexp = false;
        }
        /* c8 ignore stop */
        return this.regexp;
    }
    slashSplit(p) {
        // if p starts with // on windows, we preserve that
        // so that UNC paths aren't broken.  Otherwise, any number of
        // / characters are coalesced into one, unless
        // preserveMultipleSlashes is set to true.
        if (this.preserveMultipleSlashes) {
            return p.split('/');
        }
        else if (this.isWindows && /^\/\/[^\/]+/.test(p)) {
            // add an extra '' for the one we lose
            return ['', ...p.split(/\/+/)];
        }
        else {
            return p.split(/\/+/);
        }
    }
    match(f, partial = this.partial) {
        this.debug('match', f, this.pattern);
        // short-circuit in the case of busted things.
        // comments, etc.
        if (this.comment) {
            return false;
        }
        if (this.empty) {
            return f === '';
        }
        if (f === '/' && partial) {
            return true;
        }
        const options = this.options;
        // windows: need to use /, not \
        if (this.isWindows) {
            f = f.split('\\').join('/');
        }
        // treat the test path as a set of pathparts.
        const ff = this.slashSplit(f);
        this.debug(this.pattern, 'split', ff);
        // just ONE of the pattern sets in this.set needs to match
        // in order for it to be valid.  If negating, then just one
        // match means that we have failed.
        // Either way, return on the first hit.
        const set = this.set;
        this.debug(this.pattern, 'set', set);
        // Find the basename of the path by looking for the last non-empty segment
        let filename = ff[ff.length - 1];
        if (!filename) {
            for (let i = ff.length - 2; !filename && i >= 0; i--) {
                filename = ff[i];
            }
        }
        for (let i = 0; i < set.length; i++) {
            const pattern = set[i];
            let file = ff;
            if (options.matchBase && pattern.length === 1) {
                file = [filename];
            }
            const hit = this.matchOne(file, pattern, partial);
            if (hit) {
                if (options.flipNegate) {
                    return true;
                }
                return !this.negate;
            }
        }
        // didn't get any hits.  this is success if it's a negative
        // pattern, failure otherwise.
        if (options.flipNegate) {
            return false;
        }
        return this.negate;
    }
    static defaults(def) {
        return minimatch.defaults(def).Minimatch;
    }
}
/* c8 ignore stop */
minimatch.AST = AST;
minimatch.Minimatch = Minimatch;
minimatch.escape = escape;
minimatch.unescape = unescape;

class CoreEvent {
  #settings
  #enable = false
  #_boundListener
  #_targets = []
  constructor($settings) { 
    this.#settings = $settings;
    this.enable = this.#settings.enable;
  }
  get type() { return this.#settings.type }
  get path() { return this.#settings.path }
  get #targets() {
    const pretargets = this.#_targets;
    const propertyDirectory = this.#context.propertyDirectory;
    const targetPaths = [];
    const targets = [];
    for(const $propertyPath of propertyDirectory) {
      const propertyPathMatch = minimatch($propertyPath, this.path);
      if(propertyPathMatch === true) { targetPaths.push($propertyPath); }
    }
    for(const $targetPath of targetPaths) {
      const pretargetElement = pretargets.find(
        ($pretarget) => $pretarget.path === $targetPath
      );
      let target;
      let targetElement;
      target = this.#context;
      const pathKeys = $targetPath.split('.');
      let pathKeysIndex = 0;
      iterateTargetPathKeys: 
      while(pathKeysIndex < pathKeys.length) {
        let pathKey = pathKeys[pathKeysIndex];
        if(pathKeysIndex === 0 && pathKey === ':scope') {
          break iterateTargetPathKeys
        }
        iterateTargetAccessors: 
        for(const $TargetAccessor of this.#propertyClassEvents.TargetAccessors) {
          if($TargetAccessor === '[]') {
            target = target[pathKey];
          }
          else if($TargetAccessor === 'get') {
            target = target?.get(pathKey);
          }
          if(target !== undefined) { break iterateTargetAccessors }
        }
        pathKeysIndex++;
      }
      if(target === pretargetElement?.target) {
        targetElement = pretargetElement;
      }
      else {
        targetElement = {
          path: $targetPath,
          target: target,
          enable: false,
        };
      }
      targets.push(targetElement);
    }
    this.#_targets = targets;
    return this.#_targets
  }
  get listener() { return this.#settings.listener }
  get options() { return this.#settings.options }
  get enable() { return this.#enable }
  set enable($enable) {
    if(this.#targets.length === 0) { return }
    const eventAbility = (
      $enable === true
    ) ? this.#propertyClassEvents.Assign
      : this.#propertyClassEvents.Deassign;

    iterateTargets: 
    for(const { path, target, enable } of this.#targets) {
      if(enable === eventAbility) { continue iterateTargets }
      try {
        target[eventAbility](this.type, this.#boundListener, this.options);
        target.enable = eventAbility;
      } catch($err) {}
    }
    this.#enable = $enable;
  }
  get #propertyClassEvents() { return this.#settings.propertyClassEvents }
  get #context() { return this.#settings.context }
  get #boundListener() {
    if(this.#_boundListener !== undefined) { return this.#_boundListener }
    this.#_boundListener = this.#settings.listener.bind(this.#context);
    return this.#_boundListener
  }
}

var Settings$5 = {
  events: [/* {
    type: "click",
    target "views.",
  } */],
  propertyClasses: [/* {
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
    Events: {
      Assign: "addEventListener", // "on",
      Deassign: "removeEventListener", // "off",
      TargetAccessors: ["[]", "get"],
    },
    States: {
      Instate: function Instate($propertyClass, $property, $value) {},
      Deinstate: function Deinstate($propertyClass, $property) {},
    },
    Definition: {
      Object: Array, // Object, // undefined,
    }
  } */],
};

var Options$7 = {
  assign: [],
  defineProperties: {},
  enableEvents: false,
};

class Core extends EventTarget {
  #settings
  #options
  #_events
  #_propertyClassEvents
  #_propertyClasses = []
  static propertyClasses = []
  constructor($settings = {}, $options = {}) {
    super();
    this.settings = $settings;
    this.options = $options;
    this.addPropertyClasses(this.settings.propertyClasses);
    this.#addProperties(this.settings);
    this.addEvents(this.settings.events);
    if(this.options.enableEvents) this.enableEvents(this.options.enableEvents); 
  }
  get propertyDirectory() { return pathkeyTree(this) }
  get #propertyClassEvents() {
    if(this.#_propertyClassEvents !== undefined) return this.#_propertyClassEvents
    this.#_propertyClassEvents = {};
    for(const $propertyClass of this.#propertyClasses) {
      this.#_propertyClassEvents[$propertyClass.Name] = $propertyClass.Events;
    }
    return this.#_propertyClassEvents
  }
  get settings() { return this.#settings }
  set settings($settings) {
    if(this.#settings !== undefined) returnd;
    this.#settings = Object.assign({}, Settings$5, $settings);
  }
  get options() { return this.#options }
  set options($options) {
    if(this.#options !== undefined) return
    this.#options = recursiveAssign(structuredClone(Options$7), $options);
  }
  get #events() {
    if(this.#_events !== undefined) return this.#_events
    this.#_events = [];
    return this.#_events
  }
  get #propertyClasses() { return this.#_propertyClasses }
  #getPropertyClasses() {
    let $getPropertyClasses;
    if(arguments.length === 0) $getPropertyClasses = this.#propertyClasses;
    else { $getPropertyClasses = [].concat(...arguments); }
    const getPropertyClasses = [];
    let propertyClassIndex = 0;
    for(const $propertyClass of this.#propertyClasses) {
      for(const $getPropertyClass of $getPropertyClasses) {
        if($propertyClass.Name === $getPropertyClass.Name) {
          getPropertyClasses.push({
            propertyClassIndex: propertyClassIndex,
            propertyClass: $propertyClass
          });
        }
      }
      propertyClassIndex++;
    }
    return getPropertyClasses
  }
  #addProperties() {
    iteratePropertyClasses: 
    for(const $propertyClass of this.#propertyClasses) {
      const { Name, Names, Definition } = $propertyClass;
      if(this.settings[Name] === undefined) { continue iteratePropertyClasses }
      if(Definition.Object !== undefined) {
        this[`${Names.Minister.Ad.Nonformal}${Names.Multiple.Formal}`](this.settings[Name]);
      }
      else if(this.settings[Name] !== undefined) {
        this[Name] = this.settings[Name];
      }
    }
    return this
  }
  addPropertyClasses() {
    const $this = this;
    let $addPropertyClasses = (arguments.length === 0)
      ? this.settings.propertyClasses
      : [].concat(...arguments);
    const propertyClasses = this.#propertyClasses;
    for(const $addPropertyClass of $addPropertyClasses) {
      // Class States
      $addPropertyClass.States = $addPropertyClass.States || {};
      $addPropertyClass.Definition = $addPropertyClass.Definition || {};
      // Class Instate
      if($addPropertyClass.States.Instate === undefined) {
        $addPropertyClass.States.Instate = Instate; 
      }
      // Class Deinstate
      if($addPropertyClass.States.Deinstate === undefined) {
        $addPropertyClass.States.Deinstate = Deinstate; 
      }
      const {
        Name,
        Names,
        Events,
        States,
        Definition,
      } = $addPropertyClass;
      let propertyValue;
      if(
        Definition.Object === "Array" || 
        Definition.Object === "Object"
      ) {
        Object.defineProperties(this, {
          // Property Class Instances
          [Name]: {
            configurable: true, enumerable: true,  
            get() {
              if(propertyValue !== undefined) {
                return propertyValue
              }
              propertyValue = new PropertyClass($addPropertyClass, $this);
              return propertyValue
            },
            set($propertyValue) {
              const propertyClassInstances = $this[Name];
              let propertyClassInstancesEntries;
              if($propertyValue) {
                if(Array.isArray($propertyValue)) {
                  propertyClassInstancesEntries = $propertyValue;
                }
                else {
                  propertyClassInstancesEntries = Object.entries($propertyValue);
                }
              } else { propertyClassInstancesEntries = []; }
              for(const [
                $propertyClassInstanceName, $propertyClassInstance
              ] of propertyClassInstancesEntries) {
                propertyClassInstances[$propertyClassInstanceName] = $propertyClassInstance;
              }
            }
          },
          // Add Property Class Instances
          [`${Names.Minister.Ad.Nonformal}${Names.Multiple.Formal}`]: {
            configurable: true, enumerable: false, writable: false, 
            value: function() {
              const $arguments = [...arguments];
              if($arguments.length === 1) {
                const [$values] = $arguments;
                if(Definition.Object === "Array") {
                  $this[Name] = Object.entries($values);
                }
                else {
                  if(Array.isArray($values)) {
                    $this[Name] = Object.fromEntries($values);
                  }
                  else {
                    $this[Name] = $values;
                  }
                }
              }
              else if($arguments.length === 2) {
                const [$key, $value] = $arguments;
                $this[Name] = { [$key]: $value };
              }
              return $this
            }
          },
          // Remove Property Class Instances
          [`${Names.Minister.Dead.Nonformal}${Names.Multiple.Formal}`]: {
            configurable: true, enumerable: false, writable: false, 
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
                removeKeys.push(...Object.keys($this[Name]));
              }
              for(const $removeKey of $removeKeys) {
                delete $this[Name][$removeKey];
              }
              return $this
            }
          },
        });
      }
      else {
        Object.defineProperties(this, {
          [Names.Monople.Nonformal]: {
            get() {
              return propertyValue
            },
            set($propertyValue) {
              propertyValue = States.Instate(Object.assign({
                core: this
              }, $addPropertyClass), Name, $propertyValue);
              }
          },
        });
      }
      propertyClasses.push($addPropertyClass);
    }
    return this
  }
  removePropertyClasses() {
    const removePropertyClasses = this.#getPropertyClasses(...arguments);
    let removePropertyClassIndex = removePropertyClasses.length - 1;
    while(removePropertyClassIndex > -1) {
      const { propertyClassIndex, propertyClass } = removePropertyClasses[removePropertyClassIndex];
      const { Names, Definition } = propertyClass;
      const propertyClassInstances = this[Names.Multiple.Nonformal];
      if(Definition.Object) {
        if(Definition.Object === "Array") {
          let propertyClassInstanceIndex = propertyClassInstances.length - 1;
          while(propertyClassInstanceIndex > -1) {
            propertyClassInstances.splice(propertyClassInstanceIndex, 1);
            propertyClassInstanceIndex--;
          }
        }
        else if(Definition.Object === "Object") {
          for(const [
            $propertyClassInstanceName, $propertyClassInstance
          ] of Object.entries(this[Names.Multiple.Nonformal])) {
            delete propertyClassInstances[$propertyClassInstanceName];
          }
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
      else {
        delete this[Names.Monople.Nonformal];
        Object.defineProperty(this, Names.Monople.Nonformal, {
          configurable: true, enumerable: false, writable: true, 
          value: undefined
        });
      }
      this.#propertyClasses.splice(propertyClassIndex, 1);
      removePropertyClassIndex--;
    }
    return this
  }
  getEvents() {
    const getEvents = [];
    const events = this.#events;
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
    const events = this.#events;
    for(let $event of $events) {
      const propertyClassName = $event.path.split('.').shift();
      const propertyClassEvents = Object.assign(
        {}, 
        this.#propertyClassEvents[propertyClassName],
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
    let $events;
    if(arguments.length === 0) { $events = this.getEvents(); }
    else if(arguments.length === 1) {
      $events = this.getEvents(arguments[0]);
    }
    if($events.length === 0) return this
    let eventsIndex = $events.length - 1;
    while(eventsIndex > -1) {
      const event = $events[eventsIndex];
      const removeEventIndex = this.#events.findIndex(
        ($event) => $event === event
      );
      if(removeEventIndex !== -1) {
        event.enable = false;
        this.#events.splice(eventsIndex, 1);
      }
      eventsIndex--;
    }
    return this
  }
  enableEvents() {
    let $events;
    if(
      arguments.length === 0 ||
      arguments[0] === true
    ) { $events = this.#events; }
    else { $events = this.getEvents(arguments[0]); }
    return this.#toggleEventAbility('Assign', $events)
  }
  disableEvents() {
    let $events;
    if(arguments.length === 0) { $events = this.#events; }
    else { $events = this.getEvents(arguments[0]); }
    return this.#toggleEventAbility('Deassign', $events)
  }
  reenableEvents() {
    return this
    .disableEvents(...arguments)
    .enableEvents(...arguments)
  }
  #toggleEventAbility($eventListenerMethod, $events) {
    let enability;
    if($eventListenerMethod === 'Assign') { enability = true; }
    else if($eventListenerMethod === 'Deassign') { enability = false; }
    else { return this }
    for(const $event of $events) { $event.enable = enability; }
    return this
  }
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
        let contentTypedLiteral = typedObjectLiteral$1($assignSourcePropVal);
        // Assignment
        let assignment;
        // Source Tree: False
        if(sourceTree === false) {
          targetPropVal = new Content(contentTypedLiteral, subschema, 
            recursiveAssign$1({}, $content.options, {
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
              recursiveAssign$1({}, $content.options, {
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
  typedObjectLiteral$1($content.object);
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
      let _target = typedObjectLiteral$1(propertyValue);
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
  const ulteroptions = recursiveAssign$1({
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
  const ulteroptions = recursiveAssign$1({
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
  const ulteroptions = recursiveAssign$1({
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

let Handler$1 = class Handler {
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
        messages: recursiveAssign$1(this.messages, definition.messages),
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
          const corequiredContextProperties = typedObjectLiteral$1(type);
          const corequiredContentProperties = typedObjectLiteral$1(type);
          iterateRequiredProperties: 
          for(const [
            $requiredPropertyName, $requiredProperty
          ] of Object.entries(requiredProperties)) {
            const requiredProperty = recursiveAssign$1({}, $requiredProperty);
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
        let typeOfDefinitionValue = typeOf$1(definition.value);
        typeOfDefinitionValue = (typeOfDefinitionValue === 'function')
          ? typeOf$1(definition.value())
          : typeOfDefinitionValue;
        const typeOfContentValue = typeOf$1($value);
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

class Handler {
  #context
  constructor($context) {
    this.#context = $context;
  }
}

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
    this.#type = typeOf$1(typedObjectLiteral$1(this.#properties));
    return this.#type
  }
  get proxy() {
    if(this.#proxy !== undefined) return this.#proxy
    this.#proxy = new Proxy(this.target, this.#handler);
    return this.#proxy
  }
  get #handler() {
    if(this.#_handler !== undefined) return this.#_handler
    this.#_handler = new Handler(this);
    return this.#_handler
  }
  get target() {
    if(this.#target !== undefined) return this.#target
    let properties;
    const target = typedObjectLiteral$1(this.type);
    if(this.type === 'array') {
      properties = this.#properties.slice(0, 1);
    }
    else if(this.type === 'object') {
      properties = this.#properties;
    }
    for(const [
      $propertyKey, $propertyDefinition
    ] of Object.entries(properties)) {
      const typeOfPropertyDefinition = typeOf$1($propertyDefinition);
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
            const typeOfPropertyValidator = typeOf$1($propertyValidator);
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

var Options$6 = {
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
    this.options = Object.assign({}, Options$6, $options);
  }
  get type() {
    if(this.#type !== undefined) return this.#type
    this.#type = typeOf$1(typedObjectLiteral$1(this.#properties));
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
    let requiredProperties = typedObjectLiteral$1(this.type);
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
      properties: typedObjectLiteral$1(this.type),
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

var Options$5 = {
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
      proxy[Options$5.proxyAssignmentMethod](this.#properties);
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
    this.#options = recursiveAssign$1({}, Options$5, $options);
    return this.#options
  }
  get schema() { return this.#schema }
  set schema($schema) {
    if(this.#schema !== undefined)  { return }
    const typeOfSchema = typeOf$1($schema);
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
    this.#type = typeOf$1(this.#properties);
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
    this.#target = typedObjectLiteral$1(this.#properties);
    return this.#target
  }
  get proxy() {
    if(this.#proxy !== undefined) return this.#proxy
    this.#proxy = new Proxy(this.target, this.#handler);
    return this.#proxy
  }
  get #handler() {
    if(this.#_handler !== undefined) return this.#_handler
    this.#_handler = new Handler$1(this, {
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
      recursiveAssign$1({}, Settings$4, $settings), 
      recursiveAssign$1({}, Options$4, $options),
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

var Settings$2 = {
  models: {},
  views: {},
  controls: {},
  fetchRouters: {},
  locationRouters: {},
};

var Options$2 = {
  enableEvents: true
};

const Events$1 = {
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
    const event = Events$1[$eventType]($response, $requestMethod);
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

var Settings$1 = {
  routes: {}
};

var Options$1 = {
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
      recursiveAssign$1(Settings$1, $settings),
      recursiveAssign$1(Options$1, $options),
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
    const routeSettings = recursiveAssign$1({
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

var Settings = {
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

var Options = {
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
      recursiveAssignConcat(Settings, $settings), 
      Object.assign(Options, $options),
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

const Names = {
  Minister: {
    Ad: { Formal: "Add", Nonformal: "add" },
    Dead: { Formal: "Remove", Nonformal: "remove" },
  }
};
const Events = { Assign: "addEventListener", Deassign: "removeEventListener" };
const Definition = { Object: 'Object' };
const States = {
  Instate: function Instate($propertyClass, $property, $value) {
    const { /*Name, */ Class /*, Names, Events, Definition*/ } = $propertyClass;
    return new Class(...$value)
  },
  Deinstate: function Deinstate($propertyClass, $property) {},
};

class Control extends Core {
  static propertyClasses = [{
    Name: "models",
    Class: Model,
    Names: {
      Monople: { Formal: "Model", Nonformal: "model" },
      Multiple: { Formal: "Models", Nonformal: "models" },
      Minister: Names.Minister,
    },
    Events, Definition, States,
  }, {
    Name: "views",
    Class: View,
    Names: {
      Monople: { Formal: "View", Nonformal: "view" },
      Multiple: { Formal: "Views", Nonformal: "views" },
      Minister: Names.Minister,
    },
    Events, Definition, States,
  }, {
    Name: "controls",
    Class: Control,
    Names: {
      Monople: { Formal: "Control", Nonformal: "control" },
      Multiple: { Formal: "Controls", Nonformal: "controls" },
      Minister: Names.Minister,
    },
    Events, Definition, States,
  }, {
    Name: "locationRouters",
    Class: LocationRouter,
    Names: {
      Monople: { Formal: "LocationRouter", Nonformal: "locationRouter" },
      Multiple: { Formal: "LocationRouters", Nonformal: "locationRouters" },
      Minister: Names.Minister,
    },
    Events, Definition, States,
  }, {
    Name: "fetchRouters",
    Class: FetchRouter,
    Names: {
      Monople: { Formal: "FetchRouter", Nonformal: "fetchRouter" },
      Multiple: { Formal: "FetchRouters", Nonformal: "fetchRouters" },
      Minister: Names.Minister,
    },
    Events, Definition, States,
  }, {
    Name: "socketRouters",
    Class: SocketRouter,
    Names: {
      Monople: { Formal: "SocketRouter", Nonformal: "socketRouter" },
      Multiple: { Formal: "SocketRouters", Nonformal: "socketRouters" },
      Minister: Names.Minister,
    },
    Events, Definition, States,
  }]
  constructor($settings = {}, $options = {}) {
    super(
      recursiveAssign$1({
        propertyClasses: Control.propertyClasses,
      }, Settings$2, $settings),
      recursiveAssign$1({}, Options$2, $options),
    );
    const { enableEvents } = this.options;
    if(enableEvents) this.enableEvents();
  }
}

export { Content, Control, Core, index as Coutil, FetchRouter, LocationRouter, MessageAdapter, Model, Schema, SocketRouter, Validation, Validator, Verification, View };
//# sourceMappingURL=mvc-framework.js.map
