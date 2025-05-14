const defaultAccessor$1 = ($target, $property) => {
  if($property === undefined) { return $target }
  else { return $target[$property] }
};
const getAccessor$2 = ($target, $property) => {
  if($property === undefined) { return $target }
  else { return $target.get($property) }
};
var accessors$1 = {
  default: defaultAccessor$1,
  get: getAccessor$2,
};

function expandEvents$1($propEvents, $scopeKey = ':scope') {
  if(
    Array.isArray($propEvents) ||
    $propEvents === undefined
  ) { return $propEvents }
  const propEvents = [];
  for(const [
    $propEventSettings, $propEventListener
  ] of Object.entries($propEvents)) {
    const propEventSettings = $propEventSettings.trim().split(' ');
    let path, type, listener;
    if(propEventSettings.length === 1) {
      path = $scopeKey;
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
const PrimitiveKeys$1 = Object.keys(Primitives$1);
const PrimitiveValues$1 = Object.values(Primitives$1);
const Objects$1 = {
  'object': Object,
  'array': Array,
};
const ObjectKeys$2 = Object.keys(Objects$1);
const ObjectValues$1 = Object.values(Objects$1);
const Types$1 = Object.assign({}, Primitives$1, Objects$1);
const TypeKeys$2 = Object.keys(Types$1);
const TypeValues$1 = Object.values(Types$1);
const TypeMethods$1 = [
 Primitives$1.String, Primitives$1.Number, Primitives$1.Boolean, 
 Objects$1.Object, Objects$1.Array
];

var index$1$1 = /*#__PURE__*/Object.freeze({
  __proto__: null,
  ObjectKeys: ObjectKeys$2,
  ObjectValues: ObjectValues$1,
  Objects: Objects$1,
  PrimitiveKeys: PrimitiveKeys$1,
  PrimitiveValues: PrimitiveValues$1,
  Primitives: Primitives$1,
  TypeKeys: TypeKeys$2,
  TypeMethods: TypeMethods$1,
  TypeValues: TypeValues$1,
  Types: Types$1
});

var regularExpressions$7 = {
  quotationEscape: /\.(?=(?:[^"]*"[^"]*")*[^"]*$)/,
};

const typeOf$8 = ($data) => Object
  .prototype
  .toString
  .call($data).slice(8, -1).toLowerCase();

function subpaths$2($path) {
  return $path.split(
    new RegExp(regularExpressions$7.quotationEscape)
  )
}
function keypaths$2($path) {
  const _subpaths = subpaths$2($path);
  _subpaths.pop();
  return _subpaths
}
function key$2($path) { return subpaths$2($path).pop() }
function root$2($path) { return subpaths$2($path).shift() }
function typeofRoot$2($path) { return (
  Number(root$2($path))
) ? 'array' : 'object' }
function parse$3($path) {
  return {
    subpaths: subpaths$2($path),
    keypaths: keypaths$2($path),
    key: key$2($path),
    root: root$2($path),
    typeofRoot: typeofRoot$2($path),
  }
}

function typedObjectLiteral$j($value) {
  let _typedObjectLiteral;
  const typeOfValue = typeOf$8($value);
  if(typeOfValue === 'object') { _typedObjectLiteral = {}; }
  else if(typeOfValue === 'array') { _typedObjectLiteral = []; }
  else if(typeOfValue === 'string') {
    if($value?.toLowerCase() === 'object') { _typedObjectLiteral = {}; }
    else if($value?.toLowerCase() === 'array') { _typedObjectLiteral = []; }
  }
  else { _typedObjectLiteral = undefined; }
  return _typedObjectLiteral
}

function get$2($path, $source) {
  const subpaths = $path.split(new RegExp(regularExpressions$7.quotationEscape));
  const key = subpaths.pop();
  let subtarget = $source;
  for(const $subpath of subpaths) { subtarget = subtarget[$subpath]; }
  return subtarget[key]
}
function set$2($path, $source) {
  const {
    keypaths, key, typeofRoot
  } = parse$3($path);
  const target = typedObjectLiteral$j(typeofRoot);
  let subtarget = target;
  for(const $subpath of keypaths) {
    if(Number($subpath)) { subtarget[$subpath] = []; }
    else { subtarget[$subpath] = {}; }
    subtarget = subtarget[$subpath];
  }
  subtarget[key] = $source;
  return target
}

function expandTree$2($source, $property) {
  const typeOfProperty = typeOf$8($property);
  const typeOfSource = typeOf$8($source);
  if(
    !['string', 'function'].includes(typeOfProperty) ||
    !['array', 'object'].includes(typeOfSource)
  ) { return $source }
  let target = typedObjectLiteral$j($source);
  for(const [$sourceKey, $sourceValue] of Object.entries($source)) {
    if(typeOfProperty === 'string') { target[$sourceKey] = set$2($property, $sourceValue); }
    else if(typeOfProperty === 'function') { target[$sourceKey] = $property($sourceValue); }
    if(target[$sourceKey][$property] && typeof target[$sourceKey][$property] === 'object') {
      target[$sourceKey][$property] = expandTree$2(target[$sourceKey][$property], $property);
    }
  }
  return target
}

function impandTree$2($source, $property) {
  const typeOfProperty = typeOf$8($property);
  const typeOfSource = typeOf$8($source);
  if(
    !['string', 'function'].includes(typeOfProperty) ||
    !['array', 'object'].includes(typeOfSource)
  ) { return $source }
  let target = typedObjectLiteral$j($source);
  for(const [$sourceKey, $sourceValue] of Object.entries($source)) {
    if(typeOfProperty === 'string') { target[$sourceKey] = get$2($property, $sourceValue); }
    else if(typeOfProperty === 'function') { target[$sourceKey] = $property($sourceValue); }
    if(target[$sourceKey] && typeof target[$sourceKey] === 'object') {
      target[$sourceKey] = impandTree$2(target[$sourceKey], $property);
    }
  }
  return target
}

const Options$7 = {
  depth: 0,
  maxDepth: 10,
  accessors: [accessors$1.default],
};
function propertyDirectory$1($object, $options) {
  const _propertyDirectory = [];
  const options = Object.assign({}, Options$7, $options);
  options.depth++;
  if(options.depth > options.maxDepth) { return _propertyDirectory }
  iterateAccessors: 
  for(const $accessor of options.accessors) {
    const object = $accessor($object);
    if(!object) continue iterateAccessors
    for(const [$key, $value] of Object.entries(object)) {
      if(!options.values) { _propertyDirectory.push($key); }
      else if(options.values) { _propertyDirectory.push([$key, $value]); }
      if(
        typeof $value === 'object' &&
        $value !== null &&
        $value !== object
      ) {
        const subtargets = propertyDirectory$1($value, options);
        if(!options.values) {
          for(const $subtarget of subtargets) {
            const path = [$key, $subtarget].join('.');
            _propertyDirectory.push(path);
          }
        }
        else if(options.values) {
          for(const [$subtargetKey, $subtarget] of subtargets) {
            const path = [$key, $subtargetKey].join('.');
            _propertyDirectory.push([path, $subtarget]);
          }
        }
      }
    }
  }
  return _propertyDirectory
}

function recursiveAssign$h($target, ...$sources) {
  if(!$target) { return $target}
  iterateSources: 
  for(const $source of $sources) {
    if(!$source) continue iterateSources
    for(const [
      $sourcePropertyKey, $sourcePropertyValue
    ] of Object.entries($source)) {
      const typeOfTargetPropertyValue = typeOf$8($target[$sourcePropertyKey]);
      const typeOfSourcePropertyValue = typeOf$8($sourcePropertyValue);
      if(
        typeOfTargetPropertyValue === 'object' &&
        typeOfSourcePropertyValue === 'object'
      ) {
        $target[$sourcePropertyKey] = recursiveAssign$h($target[$sourcePropertyKey], $sourcePropertyValue);
      }
      else {
        $target[$sourcePropertyKey] = $sourcePropertyValue;
      }
    }
  }
  return $target
}

function recursiveAssignConcat$2($target, ...$sources) {
  if(!$target) { return $target}
  iterateSources: 
  for(const $source of $sources) {
    if(!$source) continue iterateSources
    for(const [
      $sourcePropertyKey, $sourcePropertyValue
    ] of Object.entries($source)) {
      const typeOfTargetPropertyValue = typeOf$8($target[$sourcePropertyKey]);
      const typeOfSourcePropertyValue = typeOf$8($sourcePropertyValue);
      if( 
        typeOfTargetPropertyValue === 'object' &&
        typeOfSourcePropertyValue === 'object'
      ) {
        $target[$sourcePropertyKey] = recursiveAssignConcat$2($target[$sourcePropertyKey], $sourcePropertyValue);
      }
      else if(
        typeOfTargetPropertyValue === 'array' &&
        typeOfSourcePropertyValue === 'array'
      ) {
        $target[$sourcePropertyKey] = $target[$sourcePropertyKey].concat($sourcePropertyValue);
      }
      else {
        $target[$sourcePropertyKey] = $sourcePropertyValue;
      }
    }
  }
  return $target
}

function recursiveFreeze$2($target) {
  for(const [$propertyKey, $propertyValue] of Object.entries($target)) {
    if($propertyValue && typeof $propertyValue === 'object') {
      recursiveFreeze$2($propertyValue);
    }
  }
  return Object.freeze($target)
}

var index$5 = /*#__PURE__*/Object.freeze({
  __proto__: null,
  accessors: accessors$1,
  expandEvents: expandEvents$1,
  expandTree: expandTree$2,
  impandTree: impandTree$2,
  propertyDirectory: propertyDirectory$1,
  recursiveAssign: recursiveAssign$h,
  recursiveAssignConcat: recursiveAssignConcat$2,
  recursiveFreeze: recursiveFreeze$2,
  regularExpressions: regularExpressions$7,
  typeOf: typeOf$8,
  typedObjectLiteral: typedObjectLiteral$j,
  variables: index$1$1
});

var Settings$1$2 = ($settings = {}) => {
  const Settings = {
    events: {},
    enableEvents: false,
    propertyDefinitions: {
      getEvents: 'getEvents',
      addEvents: 'addEvents',
      removeEvents: 'removeEvents',
      enableEvents: 'enableEvents',
      disableEvents: 'disableEvents',
      reenableEvents: 'reenableEvents',
      emitEvents: 'emitEvents',
    },
  };
  for(const [$settingKey, $settingValue] of Object.entries($settings)) {
    switch($settingKey) {
      case 'propertyDefinitions':
        Settings[$settingKey] = Object.assign(Settings[$settingKey], $settingValue);
        break
      default: 
        Settings[$settingKey] = $settingValue;
        break
    }
  }
  return Settings
};

function handleNoCommaBraces$1(span) {
    if (span.length < 3) {
        return "{" + span + "}";
    }
    var separatorI = -1;
    for (var i = 2; i < span.length; i++) {
        if (span[i] === '.' && span[i - 1] === '.' && (i < 2 || span[i - 2] !== '\\')) {
            if (separatorI > -1) {
                return "{" + span + "}";
            }
            separatorI = i - 1;
        }
    }
    if (separatorI > -1) {
        var rangeStart = span.substr(0, separatorI);
        var rangeEnd = span.substr(separatorI + 2);
        if (rangeStart.length > 0 && rangeEnd.length > 0) {
            return "[" + span.substr(0, separatorI) + "-" + span.substr(separatorI + 2) + "]";
        }
    }
    return "{" + span + "}";
}
function expand$1(pattern) {
    if (typeof pattern !== 'string') {
        throw new TypeError("A pattern must be a string, but " + typeof pattern + " given");
    }
    var scanning = false;
    var openingBraces = 0;
    var closingBraces = 0;
    var handledUntil = -1;
    var results = [''];
    var alternatives = [];
    var span;
    for (var i = 0; i < pattern.length; i++) {
        var char = pattern[i];
        if (char === '\\') {
            i++;
            continue;
        }
        if (char === '{') {
            if (scanning) {
                openingBraces++;
            }
            else if (i > handledUntil && !openingBraces) {
                span = pattern.substring(handledUntil + 1, i);
                for (var j = 0; j < results.length; j++) {
                    results[j] += span;
                }
                alternatives = [];
                handledUntil = i;
                scanning = true;
                openingBraces++;
            }
            else {
                openingBraces--;
            }
        }
        else if (char === '}') {
            if (scanning) {
                closingBraces++;
            }
            else if (closingBraces === 1) {
                span = pattern.substring(handledUntil + 1, i);
                if (alternatives.length > 0) {
                    var newResults = [];
                    alternatives.push(expand$1(span));
                    for (var j = 0; j < results.length; j++) {
                        for (var k = 0; k < alternatives.length; k++) {
                            for (var l = 0; l < alternatives[k].length; l++) {
                                newResults.push(results[j] + alternatives[k][l]);
                            }
                        }
                    }
                    results = newResults;
                }
                else {
                    span = handleNoCommaBraces$1(span);
                    for (var j = 0; j < results.length; j++) {
                        results[j] += span;
                    }
                }
                handledUntil = i;
                closingBraces--;
            }
            else {
                closingBraces--;
            }
        }
        else if (!scanning && char === ',' && closingBraces - openingBraces === 1) {
            span = pattern.substring(handledUntil + 1, i);
            alternatives.push(expand$1(span));
            handledUntil = i;
        }
        if (scanning && (closingBraces === openingBraces || i === pattern.length - 1)) {
            scanning = false;
            i = handledUntil - 1;
        }
    }
    if (handledUntil === -1) {
        return [pattern];
    }
    var unhandledFrom = pattern[handledUntil] === '{' ? handledUntil : handledUntil + 1;
    if (unhandledFrom < pattern.length) {
        span = pattern.substr(unhandledFrom);
        for (var j = 0; j < results.length; j++) {
            results[j] += span;
        }
    }
    return results;
}

function negate$1(pattern, options) {
    var supportNegation = options['!'] !== false;
    var supportParens = options['()'] !== false;
    var isNegated = false;
    var i;
    if (supportNegation) {
        for (i = 0; i < pattern.length && pattern[i] === '!'; i++) {
            if (supportParens && pattern[i + 1] === '(') {
                i--;
                break;
            }
            isNegated = !isNegated;
        }
        if (i > 0) {
            pattern = pattern.substr(i);
        }
    }
    return { pattern: pattern, isNegated: isNegated };
}

function escapeRegExpChar$1(char) { if (char === '-' ||
    char === '^' ||
    char === '$' ||
    char === '+' ||
    char === '.' ||
    char === '(' ||
    char === ')' ||
    char === '|' ||
    char === '[' ||
    char === ']' ||
    char === '{' ||
    char === '}' ||
    char === '*' ||
    char === '?' ||
    char === '\\') {
    return "\\" + char;
}
else {
    return char;
} }
function escapeRegExpString$1(str) {
    var result = '';
    for (var i = 0; i < str.length; i++) {
        result += escapeRegExpChar$1(str[i]);
    }
    return result;
}

function Pattern$1(source, options, excludeDot) {
    var separator = typeof options.separator === 'undefined' ? true : options.separator;
    var separatorSplitter = '';
    var separatorMatcher = '';
    var wildcard = '.';
    if (separator === true) {
        separatorSplitter = '/';
        separatorMatcher = '[/\\\\]';
        wildcard = '[^/\\\\]';
    }
    else if (separator) {
        separatorSplitter = separator;
        separatorMatcher = escapeRegExpString$1(separatorSplitter);
        if (separatorMatcher.length > 1) {
            separatorMatcher = "(?:" + separatorMatcher + ")";
            wildcard = "((?!" + separatorMatcher + ").)";
        }
        else {
            wildcard = "[^" + separatorMatcher + "]";
        }
    }
    else {
        wildcard = '.';
    }
    var requiredSeparator = separator ? separatorMatcher + "+?" : '';
    var optionalSeparator = separator ? separatorMatcher + "*?" : '';
    var segments = separator ? source.split(separatorSplitter) : [source];
    var support = {
        qMark: options['?'] !== false,
        star: options['*'] !== false,
        globstar: separator && options['**'] !== false,
        brackets: options['[]'] !== false,
        extglobs: options['()'] !== false,
        excludeDot: excludeDot && options.excludeDot !== false,
    };
    return {
        source: source,
        segments: segments,
        options: options,
        separator: separator,
        separatorSplitter: separatorSplitter,
        separatorMatcher: separatorMatcher,
        optionalSeparator: optionalSeparator,
        requiredSeparator: requiredSeparator,
        wildcard: wildcard,
        support: support,
    };
}
function Segment$1(source, pattern, isFirst, isLast) { return {
    source: source,
    isFirst: isFirst,
    isLast: isLast,
    end: source.length - 1,
}; }
function Result$1() {
return {
    match: '',
    unmatch: '',
    useUnmatch: false,
}; }
function State$1(pattern, segment, result) { return {
    pattern: pattern,
    segment: segment,
    result: result,
    openingBracket: segment.end + 1,
    closingBracket: -1,
    openingParens: 0,
    closingParens: 0,
    parensHandledUntil: -1,
    extglobModifiers: [],
    scanningForParens: false,
    escapeChar: false,
    addToMatch: true,
    addToUnmatch: pattern.support.extglobs,
    dotHandled: false,
    i: -1,
    char: '',
    nextChar: '',
}; }

var EXCLUDE_DOT_PATTERN$1 = '(?!\\.)';
function add$1(state, addition, excludeDot) {
    if (state.addToUnmatch) {
        state.result.unmatch += addition;
    }
    if (state.addToMatch) {
        if (excludeDot && !state.dotHandled) {
            addition = EXCLUDE_DOT_PATTERN$1 + addition;
        }
        state.dotHandled = true;
        state.result.match += addition;
    }
    return state.result;
}
function convertSegment$1(pattern, segment, result) {
    var support = pattern.support;
    var state = State$1(pattern, segment, result);
    var separatorMatcher = segment.isLast
        ? pattern.optionalSeparator
        : pattern.requiredSeparator;
    if (!support.excludeDot) {
        state.dotHandled = true;
    }
    if (segment.end === -1) {
        return segment.isLast && !segment.isFirst ? result : add$1(state, separatorMatcher);
    }
    if (support.globstar && segment.source === '**') {
        var prefix = !state.dotHandled ? EXCLUDE_DOT_PATTERN$1 : '';
        var globstarSegment = prefix + pattern.wildcard + "*?" + separatorMatcher;
        return add$1(state, "(?:" + globstarSegment + ")*?");
    }
    while (++state.i <= segment.end) {
        state.char = state.segment.source[state.i];
        state.nextChar = state.i < segment.end ? segment.source[state.i + 1] : '';
        if (state.char === '\\') {
            if (state.i < state.segment.end) {
                state.escapeChar = true;
                continue;
            }
            else {
                state.char = '';
            }
        }
        var pattern = state.pattern, segment = state.segment, char = state.char, i = state.i;
        if (pattern.support.brackets && !state.scanningForParens) {
            if (i > state.openingBracket && i <= state.closingBracket) {
                if (state.escapeChar) {
                    add$1(state, escapeRegExpChar$1(char));
                }
                else if (i === state.closingBracket) {
                    add$1(state, ']');
                    state.openingBracket = segment.source.length;
                }
                else if (char === '-' && i === state.closingBracket - 1) {
                    add$1(state, '\\-');
                }
                else if (char === '!' && i === state.openingBracket + 1) {
                    add$1(state, '^');
                }
                else if (char === ']') {
                    add$1(state, '\\]');
                }
                else {
                    add$1(state, char);
                }
                state.escapeChar = false;
                continue;
            }
            if (i > state.openingBracket) {
                if (char === ']' &&
                    !state.escapeChar &&
                    i > state.openingBracket + 1 &&
                    i > state.closingBracket) {
                    state.closingBracket = i;
                    state.i = state.openingBracket;
                    if (pattern.separator) {
                        add$1(state, "(?!" + pattern.separatorMatcher + ")[", true);
                    }
                    else {
                        add$1(state, '[', true);
                    }
                }
                else if (i === segment.end) {
                    add$1(state, '\\[');
                    state.i = state.openingBracket;
                    state.openingBracket = segment.source.length;
                    state.closingBracket = segment.source.length;
                }
                state.escapeChar = false;
                continue;
            }
            if (char === '[' &&
                !state.escapeChar &&
                i > state.closingBracket &&
                i < segment.end) {
                state.openingBracket = i;
                state.escapeChar = false;
                continue;
            }
        }
        if (state.pattern.support.extglobs) {
            var extglobModifiers = state.extglobModifiers, char = state.char, nextChar = state.nextChar, i = state.i;
            if (nextChar === '(' &&
                !state.escapeChar &&
                (char === '@' || char === '?' || char === '*' || char === '+' || char === '!')) {
                if (state.scanningForParens) {
                    state.openingParens++;
                }
                else if (i > state.parensHandledUntil && !state.closingParens) {
                    state.parensHandledUntil = i;
                    state.scanningForParens = true;
                    state.openingParens++;
                }
                else if (state.closingParens >= state.openingParens) {
                    if (char === '!') {
                        state.addToMatch = true;
                        state.addToUnmatch = false;
                        add$1(state, state.pattern.wildcard + "*?", true);
                        state.addToMatch = false;
                        state.addToUnmatch = true;
                        state.result.useUnmatch = true;
                    }
                    extglobModifiers.push(char);
                    add$1(state, '(?:', true);
                    state.openingParens--;
                    state.i++;
                    continue;
                }
                else {
                    state.openingParens--;
                }
            }
            else if (char === ')' && !state.escapeChar) {
                if (state.scanningForParens) {
                    state.closingParens++;
                }
                else if (extglobModifiers.length) {
                    var modifier_1 = extglobModifiers.pop();
                    if (modifier_1 === '!' && extglobModifiers.indexOf('!') !== -1) {
                        throw new Error("Nested negated extglobs aren't supported");
                    }
                    modifier_1 = modifier_1 === '!' || modifier_1 === '@' ? '' : modifier_1;
                    add$1(state, ")" + modifier_1);
                    state.addToMatch = true;
                    state.addToUnmatch = true;
                    state.closingParens--;
                    continue;
                }
            }
            else if (char === '|' && state.closingParens &&
                !state.scanningForParens &&
                !state.escapeChar) {
                add$1(state, '|');
                continue;
            }
            if (state.scanningForParens) {
                if (state.closingParens === state.openingParens || i === state.segment.end) {
                    state.scanningForParens = false;
                    state.i = state.parensHandledUntil - 1;
                }
                state.escapeChar = false;
                continue;
            }
        }
        var pattern = state.pattern;
        var support = pattern.support;
        if (!state.escapeChar && support.star && state.char === '*') {
            if (state.i === state.segment.end || state.nextChar !== '*') {
                add$1(state, pattern.wildcard + "*?", true);
            }
        }
        else if (!state.escapeChar && support.qMark && state.char === '?') {
            add$1(state, pattern.wildcard, true);
        }
        else {
            add$1(state, escapeRegExpChar$1(state.char));
        }
        state.escapeChar = false;
    }
    return add$1(state, separatorMatcher);
}
function convert$1(source, options, excludeDot) {
    var pattern = Pattern$1(source, options, excludeDot);
    var result = Result$1();
    var segments = pattern.segments;
    for (var i = 0; i < segments.length; i++) {
        var segment = Segment$1(segments[i], pattern, i === 0, i === segments.length - 1);
        convertSegment$1(pattern, segment, result);
    }
    if (result.useUnmatch) {
        return "(?!^" + result.unmatch + "$)" + result.match;
    }
    else {
        return result.match;
    }
}

function flatMap$1(array, predicate) {
    var results = [];
    for (var i = 0; i < array.length; i++) {
        var mappedValue = predicate(array[i]);
        for (var j = 0; j < mappedValue.length; j++) {
            results.push(mappedValue[j]);
        }
    }
    return results;
}
function compile$1(patterns, options) {
    patterns = Array.isArray(patterns) ? patterns : [patterns];
    if (options['{}'] !== false) {
        patterns = flatMap$1(patterns, expand$1);
    }
    var positiveResults = [];
    var negativeResults = [];
    var result = '';
    for (var i = 0; i < patterns.length; i++) {
        var negatedPattern = negate$1(patterns[i], options);
        var convertedPattern = convert$1(negatedPattern.pattern, options, !negatedPattern.isNegated);
        if (negatedPattern.isNegated) {
            negativeResults.push(convertedPattern);
        }
        else {
            positiveResults.push(convertedPattern);
        }
    }
    if (negativeResults.length) {
        result = "(?!(?:" + negativeResults.join('|') + ")$)";
    }
    if (positiveResults.length > 1) {
        result += "(?:" + positiveResults.join('|') + ")";
    }
    else if (positiveResults.length === 1) {
        result += positiveResults[0];
    }
    else if (result.length) {
        result += convert$1('**', options, true);
    }
    return "^" + result + "$";
}
function isMatch$1(regexp, sample) { if (typeof sample !== 'string') {
    throw new TypeError("Sample must be a string, but " + typeof sample + " given");
} return regexp.test(sample); }
/**
 * Compiles one or more glob patterns into a RegExp and returns an isMatch function.
 * The isMatch function takes a sample string as its only argument and returns true
 * if the string matches the pattern(s).
 *
 * ```js
 * outmatch('src/*.js')('src/index.js') //=> true
 * ```
 *
 * ```js
 * const isMatch = outmatch('*.example.com', '.')
 * isMatch('foo.example.com') //=> true
 * isMatch('foo.bar.com') //=> false
 * ```
 */
function outmatch$1(pattern, options) {
    if (typeof pattern !== 'string' && !Array.isArray(pattern)) {
        throw new TypeError("The first argument must be a single pattern string or an array of patterns, but " + typeof pattern + " given");
    }
    if (typeof options === 'string' || typeof options === 'boolean') {
        options = { separator: options };
    }
    if (arguments.length === 2 &&
        !(typeof options === 'undefined' ||
            (typeof options === 'object' && options !== null && !Array.isArray(options)))) {
        throw new TypeError("The second argument must be an options object or a string/boolean separator, but " + typeof options + " given");
    }
    options = options || {};
    if (options.separator === '\\') {
        throw new Error('\\ is not a valid separator');
    }
    var regexpPattern = compile$1(pattern, options);
    var regexp = new RegExp(regexpPattern, options.flags);
    var fn = isMatch$1.bind(null, regexp);
    fn.options = options;
    fn.pattern = pattern;
    fn.regexp = regexp;
    return fn;
}

var Settings$7 = ($settings = {}) => {
  const Settings = {
    enable: false,
    accessors: [accessors$1.default],
    propertyDirectory: { scopeKey: $settings.scopeKey, maxDepth: 10 },
    assign: 'addEventListener', deassign: 'removeEventListener', transsign: 'dispatchEvent',
    bindListener: true,
    scopeKey: ':scope',
    errorLog: false,
    methods: {
      assign: {
        addEventListener: function addEventListener($eventDefinition, $target) {
          const { type, listener, settings } = $eventDefinition;
          const { options, useCapture } = settings;
          return $target['addEventListener'](type, listener, options || useCapture)
        },
        on: function on($eventDefinition, $target) {
          const { type, listener } = $eventDefinition;
          return $target['on'](type, listener)
        },
        once: function once($eventDefinition, $target) {
          const { type, listener } = $eventDefinition;
          return $target['once'](type, listener)
        },
      }, 
      deassign: {
        removeEventListener: function removeEventListener($eventDefinition, $target) {
          const { type, listener, settings } = $eventDefinition;
          const { options, useCapture } = settings;
          return $target['removeEventListener'](type, listener, options || useCapture)
        },
        off: function off($eventDefinition, $target) {
          const { type, listener } = $eventDefinition;
          return $target['off'](type, listener)
        },
      },
      transsign: {
        dispatchEvent: function dispatchEvent($eventDefinition, $target, $event) {
          return $target['dispatchEvent']($event)
        },
        emit: function emit($eventDefinition, $target, $type, ...$arguments) {
          return $target['emit']($type, ...$arguments)
        },
      },
    },
  };
  for(const [$settingKey, $settingValue] of Object.entries($settings)) {
    switch($settingKey) {
      case 'propertyDirectory':
        Settings[$settingKey] = Object.assign(Settings[$settingKey], $settingValue);
        break
      case 'accessors':
        Settings[$settingKey] = $settingValue;
        Settings.propertyDirectory[$settingKey] = $settingValue;
        break
      case 'methods': 
        Settings[$settingKey] = recursiveAssign$h(Settings[$settingKey], $settingValue);
        break
      case 'enableEvents': break
      default: 
        Settings[$settingKey] = $settingValue;
        break
    }
  }
  return Settings
};

let EventDefinition$1 = class EventDefinition {
  #settings
  #context
  #listener
  #enable = false
  #path
  #assigned = []
  #deassigned = []
  #transsigned = []
  #nontranssigned = []
  #_targets = []
  #_assign
  #_deassign
  #_transsign
  constructor($settings, $context) { 
    if(!$settings || !$context) { return this }
    this.#settings = Settings$7($settings);
    this.#context = $context;
    this.enable = this.settings.enable;
  }
  get settings() { return this.#settings }
  get path() { return this.settings.path }
  get type() { return this.settings.type }
  get listener() {
    if(this.#listener !== undefined) { return this.#listener }
    const listener = this.settings.listener;
    if(this.settings.bindListener === true) {
      this.#listener = listener.bind(this.#context);
    }
    else { this.#listener = listener; }
    return this.#listener
  }
  get enable() { return this.#enable }
  set enable($enable) {
    const targets = this.#targets;
    const assigned = this.#assigned;
    const deassigned = this.#deassigned;
    assigned.length = 0;
    deassigned.length = 0;
    iterateTargetElements: 
    for(const $targetElement of targets) {
      const { path, target, enable } = $targetElement;
      this.settings;
      if(enable === $enable) { continue iterateTargetElements }
      if($enable === true) {
        try {
          this.#assign(target);
          $targetElement.enable = $enable;
          assigned.push($targetElement);
          
        }
        catch($err) { if(this.settings.errorLog) { console.error($err); } }
      }
      else if($enable === false) {
        try {
          this.#deassign(target);
          $targetElement.enable = $enable;
          deassigned.push($targetElement);
        }
        catch($err) { if(this.settings.errorLog) { console.error($err); } }
      }
    }
    this.#enable = $enable;
  }
  get assigned() { return this.#assigned }
  get deassigned() { return this.#deassigned }
  get #target() { return this.settings.target }
  get #targets() {
    const pretargets = this.#_targets;
    const targets = [];
    if(this.#target) {
      for(const $target of [].concat(this.#target)) {
        const pretargetElement = pretargets.find(
          ($pretarget) => $pretarget?.path === this.path
        );
        if(pretargetElement !== undefined) {
          targets.push(pretargetElement);
        }
        else if(pretargetElement === undefined) {
          targets.push({
            path: this.path,
            target: $target,
            enable: false,
          });
        }
      }
    }
    else if(typeOf$8(this.path) === 'string') {
      const targetPaths = [];
      if(this.path === this.#scopeKey) {
        const targetElement = {
          path: this.path,
          target: this.#context,
          enable: false,
        };
        targets.push(targetElement);
      }
      else {
        if(this.settings.propertyDirectory) {
          const propertyDirectory = this.#propertyDirectory;
          const propertyPathMatcher = outmatch$1(this.path, {
            separator: '.',
          });
          for(const $propertyPath of propertyDirectory) {
            const propertyPathMatch = propertyPathMatcher($propertyPath);
            if(propertyPathMatch === true) { targetPaths.push($propertyPath); }
          }
          if(this.path.charAt(0) === '*') {
            targetPaths.unshift(this.#scopeKey);
          }
        }
        else {
          targetPaths.push(this.path);
        }
        for(const $targetPath of targetPaths) {
          const pretargetElement = pretargets.find(
            ($pretarget) => $pretarget.path === $targetPath
          );
          let target = this.#context;
          let targetElement;
          const pathKeys = $targetPath.split('.');
          let pathKeysIndex = 0;
          iterateTargetPathKeys: 
          while(pathKeysIndex < pathKeys.length) {
            let pathKey = pathKeys[pathKeysIndex];
            if(pathKey === this.#scopeKey) { break iterateTargetPathKeys }
            iterateTargetAccessors: 
            for(const $targetAccessor of this.settings.accessors) {
              try { target = $targetAccessor(target, pathKey); }
              catch($err) { if(this.settings.errorLog) { console.error($err); } }
              if(target !== undefined) { break iterateTargetAccessors }
            }
            pathKeysIndex++;
          }
          if(target !== undefined) {
            if(target === pretargetElement?.target) {
              targetElement = pretargetElement;
            }
            else if(typeof target === 'object') {
              targetElement = {
                path: $targetPath,
                target: target,
                enable: false,
              };
            }
          }
          if(targetElement !== undefined) { targets.push(targetElement); }
        }
      }
    }
    this.#_targets = targets;
    return this.#_targets
  }
  get #scopeKey() { return this.settings.scopeKey }
  get #assign() {
    if(this.#_assign !== undefined) { return this.#_assign }
    this.#_assign = this.settings.methods.assign[this.settings.assign].bind(null, this);
    return this.#_assign
  }
  get #deassign() {
    if(this.#_deassign !== undefined) { return this.#_deassign }
    this.#_deassign = this.settings.methods.deassign[this.settings.deassign].bind(null, this);
    return this.#_deassign
  }
  get #transsign() {
    if(this.#_transsign !== undefined) { return this.#_transsign }
    this.#_transsign = this.settings.methods.transsign[this.settings.transsign].bind(null, this);
    return this.#_transsign
  }
  get #methods() { return this.settings.methods }
  get #propertyDirectory() {
    if(!this.settings.propertyDirectory) { return null }
    const propertyDirectorySettings = ({
      accessors: this.settings.accessors
    }, this.settings.propertyDirectory);
    return propertyDirectory$1(this.#context, propertyDirectorySettings)
  }
  emit() {
    const targets = this.#targets;
    const transsigned = this.#transsigned;
    const nontranssigned = this.#nontranssigned;
    transsigned.length = 0;
    nontranssigned.length = 0;
    for(const $targetElement of targets) {
      const { target } = $targetElement;
      try {
        this.#transsign(target, ...arguments);
        transsigned.push($targetElement);
      }
      catch($err) { nontranssigned.push($targetElement); }
    }
    return this
  }
};

let Core$1 = class Core extends EventTarget {
  static implement = function ($target, $settings) {
    if(!$target || !$settings) { return undefined }
    const settings = Settings$1$2($settings);
    const events = [];
    Object.defineProperties($target, {
      [settings.propertyDefinitions.getEvents]: {
        enumerable: false, writable: false, 
        value: function getEvents() {
          if(!arguments[0]) { return events }
          const getEvents = [];
          const $filterEvents = [].concat(arguments[0]);
          for(const $filterEvent of $filterEvents) {
            for(const $event of events) {
              let match;
              iterateEventFilterProperties: 
              for(const [
                $filterEventPropertyKey, $filterEventPropertyValue
              ] of Object.entries($filterEvent)) {
                let eventFilterMatch;
                if($filterEventPropertyKey === 'listener') {
                  eventFilterMatch = (
                    $event.settings[$filterEventPropertyKey] === $filterEventPropertyValue
                  );
                }
                else {
                  eventFilterMatch = (
                    $event[$filterEventPropertyKey] === $filterEventPropertyValue
                  );
                }
                if(match !== false) { match = eventFilterMatch; }
                else { break iterateEventFilterProperties }
              }
              if(match === true) { getEvents.push($event); }
            }
          }
          return getEvents
        }
      },
      [settings.propertyDefinitions.addEvents]: {
        enumerable: false, writable: false, 
        value: function addEvents() {
          if(!arguments.length) { return $target }
          let $addEvents = expandEvents$1(arguments[0], settings.scopeKey);
          let $enableEvents = arguments[1] || false;
          for(let $addEvent of $addEvents) {
            const event = {};
            for(const $settingKey of [
              'accessors', 'assign', 'deassign', 'transsign', 'propertyDirectory'
            ]) {
              const settingValue = settings[$settingKey];
              if(settingValue !== undefined) { event[$settingKey] = settingValue; }
            }
            recursiveAssign$h(event, $addEvent);
            const eventDefinition = new EventDefinition$1(event, $target);
            if($enableEvents) { eventDefinition.enable = true; }
            events.push(eventDefinition);
          }
          return $target
        },
      },
      [settings.propertyDefinitions.removeEvents]: {
        enumerable: false, writable: false, 
        value: function removeEvents() {
          const $events = $target[settings.propertyDefinitions.getEvents](arguments[0]);
          if($events.length === 0) return $target
          let eventsIndex = events.length - 1;
          while(eventsIndex > -1) {
            const event = events[eventsIndex];
            if($events.includes(event)) {
              event.enable = false;
              events.splice(eventsIndex, 1);
            }
            eventsIndex--;
          }
          return $target
        }
      },
      [settings.propertyDefinitions.enableEvents]: {
        enumerable: false, writable: false, 
        value: function enableEvents() {
          const $events = $target[settings.propertyDefinitions.getEvents](arguments[0]);
          if($events.length === 0) return $target
          for(const $event of $events) { $event.enable = true; }
          return $target
        },
      },
      [settings.propertyDefinitions.disableEvents]: {
        enumerable: false, writable: false, 
        value: function disableEvents() {
          const $events = $target[settings.propertyDefinitions.getEvents](arguments[0]);
          if($events.length === 0) return $target
          for(const $event of $events) { $event.enable = false; }
          return $target
        },
      },
      [settings.propertyDefinitions.reenableEvents]: {
        enumerable: false, writable: false, 
        value: function reenableEvents() {
          const $events = $target[settings.propertyDefinitions.getEvents](arguments[0]);
          for(const $event of $events) {
            $event.enable = false;
            $event.enable = true;
          }
          return $target
        },
      },
      [settings.propertyDefinitions.emitEvents]: {
        enumerable: false, writable: false, 
        value: function emitEvents($filterEvents, ...$eventParameters) {
          const $events = $target[settings.propertyDefinitions.getEvents]($filterEvents);
          for(const $event of $events) {
            $event.emit(...$eventParameters);
          }
          return $target
        },
      },
    });
    if(settings.events) { $target[settings.propertyDefinitions.addEvents](settings.events); }
    if(settings.enableEvents === true) { $target[settings.propertyDefinitions.enableEvents](); }
    return $target
  }
  constructor($settings = {}) {
    super();
    return Core.implement(this, $settings)
  }
};

const { regularExpressions: regularExpressions$6 } = index$5;
function subpaths$1($path) {
  return $path.split(
    new RegExp(regularExpressions$6.quotationEscape)
  )
}
function keypaths$1($path) {
  const _subpaths = subpaths$1($path);
  _subpaths.pop();
  return _subpaths
}
function key$1($path) {
  return subpaths$1($path).pop()
}
function root$1($path) {
  return subpaths$1($path).shift()
}
function typeofRoot$1($path) {
  return (Number(root$1($path))) ? 'array' : 'object'
}
function parse$2($path) {
  return {
    subpaths: subpaths$1($path),
    keypaths: keypaths$1($path),
    key: key$1($path),
    root: root$1($path),
    typeofRoot: typeofRoot$1($path),
  }
}

var index$4 = /*#__PURE__*/Object.freeze({
  __proto__: null,
  key: key$1,
  keypaths: keypaths$1,
  parse: parse$2,
  root: root$1,
  subpaths: subpaths$1,
  typeofRoot: typeofRoot$1
});

const { regularExpressions: regularExpressions$5, typedObjectLiteral: typedObjectLiteral$i } = index$5;
function get$1($path, $value) {
  const subpaths = $path.split(new RegExp(regularExpressions$5.quotationEscape));
  const key = subpaths.pop();
  const tree = $value;
  let treeNode = tree;
  for(const $subpath of subpaths) {
    treeNode = treeNode[$subpath];
  }
  return treeNode[key]
}
function set$1($path, $value) {
  const {
    keypaths, key, typeofRoot
  } = parse$2($path);
  const tree = typedObjectLiteral$i(typeofRoot);
  let treeNode = tree;
  for(const $subpath of keypaths) {
    if(Number($subpath)) { treeNode[$subpath] = []; }
    else { treeNode[$subpath] = {}; }
    treeNode = treeNode[$subpath];
  }
  treeNode[key] = $value;
  return tree
}

var index$3 = /*#__PURE__*/Object.freeze({
  __proto__: null,
  get: get$1,
  set: set$1
});

const { typedObjectLiteral: typedObjectLiteral$h, variables: variables$3 } = index$5;

function expandTree$1($root, $tree) {
  const typeofRoot = typeof $root;
  const typeofTree = typeof $tree;
  if(
    !['string', 'function'].includes(typeofTree)
  ) { return undefined }
  let tree;
  if($root && typeofRoot === 'object') {
    for(const [$rootKey, $rootValue] of Object.entries($root)) {
      if(typeofTree === 'string') { tree = set$1($tree, $rootValue); }
      else if(typeofTree === 'function') { tree = $tree($rootValue); }
    }
  }
  else {
    if(typeofTree === 'string') { tree = set$1($tree, $root); }
    else if(typeofTree === 'function') { tree = $tree($root); }
  }
  return tree
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

const {
  isPropertyDefinition,
  recursiveAssign: recursiveAssign$g, recursiveAssignConcat: recursiveAssignConcat$1, regularExpressions: regularExpressions$4, 
  typedObjectLiteral: typedObjectLiteral$g, typeOf: typeOf$7, 
  variables: variables$2
} = index$5;

var index$2 = /*#__PURE__*/Object.freeze({
  __proto__: null,
  expandTree: expandTree$1,
  isPropertyDefinition: isPropertyDefinition,
  keytree: keytree,
  objectCount: objectCount,
  path: index$4,
  pathkeytree: pathkeytree,
  recursiveAssign: recursiveAssign$g,
  recursiveAssignConcat: recursiveAssignConcat$1,
  regularExpressions: regularExpressions$4,
  tree: index$3,
  typedObjectLiteral: typedObjectLiteral$g,
  variables: variables$2
});

var Settings$6 = ($settings) => {
  return Object.assign({}, $settings)
};

var Options$6 = ($options) => Object.assign({
  enableEvents: true,
}, $options);

function instate($propertyClass, $property, $value) { return $value }

class Handler {
  #propertyClass
  constructor($propertyClass) {
    this.#propertyClass = $propertyClass;
    // throw this
  }
  get get() {
    return function get($target, $property) {
      return $target[$property]
    }
  }
  get set() {
    const instate$1 = this.#propertyClass.states.instate || instate;
    this.#propertyClass.definition;
    return function set($target, $property, $value) {
      // if(
      //   definition.object === "Array" && 
      //   $property === 'length'
      // ) {
      //   $target[$property] = $value
      // }
      // else {
        $target[$property] = instate$1(this.#propertyClass, $property, $value);
      // }
      return true
    }
  }
  get deleteProperty() {
    const deinstate = this.#propertyClass.states.deinstate || states.deinstate;
    return function deleteProperty($target, $property) {
      deinstate(this.#propertyClass, $property);
      delete $target[$property];
      return true
    }
  }
}

const { typedObjectLiteral: typedObjectLiteral$f } = index$5;
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
    this.#_target = typedObjectLiteral$f(this.#settings.definitionValue);
    return this.#_target
  }
  get #handler() {
    if(this.#_handler !== undefined) { return this.#_handler }
    this.#_handler = new Handler(this);
    return this.#_handler
  }
  get #proxy() {
    if(this.#_proxy !== undefined) { return this.#_proxy }
    this.#_proxy = new Proxy(this.#target, this.#handler);
    return this.#_proxy
  }
  get core() { return this.#core }
  get name() { return this.#settings.name }
  get names() { return this.#settings.names }
  get states() { return this.#settings.states }
}

const getAccessor$1 = ($target, $property) => $target?.get($property);
class MVCFrameworkCore extends Core$1 {
  #_propertyClasses = []
  static propertyClasses = []
  #settings
  #options
  #parent
  constructor($settings = {}, $options = {}) {
    super({
      events: $settings.events || {},
      accessors: ($settings.accessors)
        ? [getAccessor$1].concat($settings.accessors)
        : [getAccessor$1],
      propertyDefinitions: $settings.propertyDefinitions || {},
    });
    this.#settings = Settings$6($settings);
    this.#options = Options$6($options);
    if(this.settings.propertyClasses) {
      this.addPropertyClasses(this.settings.propertyClasses);
      this.#addProperties(this.settings);
    }
  }
  get settings() { return this.#settings }
  get options() { return this.#options }
  get #propertyClasses() { return this.#_propertyClasses }
  get parent() {
    if(this.#parent !== undefined)  return this.#parent
    this.#parent = (this.settings.parent) ? this.settings.parent : null;
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
  #getPropertyClasses() {
    let $getPropertyClasses;
    if(arguments.length === 0) $getPropertyClasses = this.#propertyClasses;
    else { $getPropertyClasses = [].concat(...arguments); }
    const getPropertyClasses = [];
    let propertyClassIndex = 0;
    for(const $propertyClass of this.#propertyClasses) {
      for(const $getPropertyClass of $getPropertyClasses) {
        if($propertyClass.name === $getPropertyClass.name) {
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
  #addProperties($properties) {
    iteratePropertyClasses: 
    for(const $propertyClass of this.#propertyClasses) {
      const { administer, name, definitionValue } = $propertyClass;
      if(!definitionValue) { continue iteratePropertyClasses }
      if($properties[name] === undefined) { continue iteratePropertyClasses }
      if(definitionValue !== undefined) {
        this[administer](this.settings[name]);
      }
      else if(this.settings[name] !== undefined) {
        this[name] = this.settings[name];
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
    iteratePropertyClasses: 
    for(const $addPropertyClass of $addPropertyClasses) {
      if(!$addPropertyClass.definitionValue) {
        propertyClasses.push($addPropertyClass);
        continue iteratePropertyClasses
      }
      $addPropertyClass.states = $addPropertyClass.states || {};
      $addPropertyClass.definitionValue = $addPropertyClass.definitionValue || {};
      if($addPropertyClass.instate === undefined) {
        $addPropertyClass.instate = instate; 
      }
      if($addPropertyClass.deinstate === undefined) {
        $addPropertyClass.deinstate = deinstate; 
      }
      const {
        name,
        administer, deadminister,
        instate, deinstate,
        definitionValue,
      } = $addPropertyClass;
      let propertyValue;
      if(
        definitionValue === 'Array' || 
        definitionValue === 'Object'
      ) {
        Object.defineProperties(this, {
          [name]: {
            configurable: true, enumerable: true,  
            get() {
              if(propertyValue !== undefined) { return propertyValue }
              propertyValue = new PropertyClass($addPropertyClass, $this);
              return propertyValue
            },
            set($propertyValue) {
              const propertyClassInstances = $this[name];
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
          [administer]: {
            configurable: true, enumerable: false, writable: false, 
            value: function() {
              const $arguments = [...arguments];
              if($arguments.length === 1) {
                const [$values] = $arguments;
                if(definitionValue === 'Array') {
                  $this[name] = Object.entries($values);
                }
                else {
                  if(Array.isArray($values)) {
                    $this[name] = Object.fromEntries($values);
                  }
                  else {
                    $this[name] = $values;
                  }
                }
              }
              else if($arguments.length === 2) {
                const [$key, $value] = $arguments;
                $this[name] = { [$key]: $value };
              }
              return $this
            }
          },
          [deadminister]: {
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
                removeKeys.push(...Object.keys($this[name]));
              }
              for(const $removeKey of $removeKeys) {
                delete $this[name][$removeKey];
              }
              return $this
            }
          },
        });
      }
      else  {
        Object.defineProperties(this, {
          [name]: {
            get() {
              return propertyValue
            },
            set($propertyValue) {
              propertyValue = instate(Object.assign({
                core: this
              }, $addPropertyClass), name, $propertyValue);
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
      const { definitionValue } = propertyClass;
      const propertyClassInstances = this[name];
      if(definitionValue) {
        if(definitionValue === 'Array') {
          let propertyClassInstanceIndex = propertyClassInstances.length - 1;
          while(propertyClassInstanceIndex > -1) {
            propertyClassInstances.splice(propertyClassInstanceIndex, 1);
            propertyClassInstanceIndex--;
          }
        }
        else if(definitionValue === 'Object') {
          for(const [
            $propertyClassInstanceName, $propertyClassInstance
          ] of Object.entries(this[name])) {
            delete propertyClassInstances[$propertyClassInstanceName];
          }
        }
        delete this[`_${name}`];
        Object.defineProperty(this, name, {
          configurable: true, enumerable: false, writable: true, 
          value: undefined
        });
        delete this[name];
        delete this[administer];
        delete this[deadminister];
      }
      else {
        delete this[name];
        Object.defineProperty(this, name, {
          configurable: true, enumerable: false, writable: true, 
          value: undefined
        });
      }
      this.#propertyClasses.splice(propertyClassIndex, 1);
      removePropertyClassIndex--;
    }
    return this
  }
}

const defaultAccessor = ($target, $property) => {
  if($property === undefined) { return $target }
  else { return $target[$property] }
};
const getAccessor = ($target, $property) => {
  if($property === undefined) { return $target }
  else { return $target.get($property) }
};
var accessors = {
  default: defaultAccessor,
  get: getAccessor,
};

function expandEvents($propEvents, $scopeKey = ':scope') {
  if(
    Array.isArray($propEvents) ||
    $propEvents === undefined
  ) { return $propEvents }
  const propEvents = [];
  for(const [
    $propEventSettings, $propEventListener
  ] of Object.entries($propEvents)) {
    const propEventSettings = $propEventSettings.trim().split(' ');
    let path, type, listener;
    if(propEventSettings.length === 1) {
      path = $scopeKey;
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
const ObjectKeys$1 = Object.keys(Objects);
const ObjectValues = Object.values(Objects);
const Types = Object.assign({}, Primitives, Objects);
const TypeKeys$1 = Object.keys(Types);
const TypeValues = Object.values(Types);
const TypeMethods = [
 Primitives.String, Primitives.Number, Primitives.Boolean, 
 Objects.Object, Objects.Array
];

var index$1 = /*#__PURE__*/Object.freeze({
  __proto__: null,
  ObjectKeys: ObjectKeys$1,
  ObjectValues: ObjectValues,
  Objects: Objects,
  PrimitiveKeys: PrimitiveKeys,
  PrimitiveValues: PrimitiveValues,
  Primitives: Primitives,
  TypeKeys: TypeKeys$1,
  TypeMethods: TypeMethods,
  TypeValues: TypeValues,
  Types: Types
});

var regularExpressions$3 = {
  quotationEscape: /\.(?=(?:[^"]*"[^"]*")*[^"]*$)/,
};

const typeOf$6 = ($data) => Object
  .prototype
  .toString
  .call($data).slice(8, -1).toLowerCase();

function subpaths($path) {
  return $path.split(
    new RegExp(regularExpressions$3.quotationEscape)
  )
}
function keypaths($path) {
  const _subpaths = subpaths($path);
  _subpaths.pop();
  return _subpaths
}
function key($path) { return subpaths($path).pop() }
function root($path) { return subpaths($path).shift() }
function typeofRoot($path) { return (
  Number(root($path))
) ? 'array' : 'object' }
function parse$1($path) {
  return {
    subpaths: subpaths($path),
    keypaths: keypaths($path),
    key: key($path),
    root: root($path),
    typeofRoot: typeofRoot($path),
  }
}

function typedObjectLiteral$e($value) {
  let _typedObjectLiteral;
  const typeOfValue = typeOf$6($value);
  if(typeOfValue === 'object') { _typedObjectLiteral = {}; }
  else if(typeOfValue === 'array') { _typedObjectLiteral = []; }
  else if(typeOfValue === 'string') {
    if($value === 'object') { _typedObjectLiteral = {}; }
    else if($value === 'array') { _typedObjectLiteral = []; }
  }
  else { _typedObjectLiteral = undefined; }
  return _typedObjectLiteral
}

function get($path, $source) {
  const subpaths = $path.split(new RegExp(regularExpressions$3.quotationEscape));
  const key = subpaths.pop();
  let subtarget = $source;
  for(const $subpath of subpaths) { subtarget = subtarget[$subpath]; }
  return subtarget[key]
}
function set($path, $source) {
  const {
    keypaths, key, typeofRoot
  } = parse$1($path);
  const target = typedObjectLiteral$e(typeofRoot);
  let subtarget = target;
  for(const $subpath of keypaths) {
    if(Number($subpath)) { subtarget[$subpath] = []; }
    else { subtarget[$subpath] = {}; }
    subtarget = subtarget[$subpath];
  }
  subtarget[key] = $source;
  return target
}

function expandTree($source, $property) {
  const typeOfProperty = typeOf$6($property);
  const typeOfSource = typeOf$6($source);
  if(
    !['string', 'function'].includes(typeOfProperty) ||
    !['array', 'object'].includes(typeOfSource)
  ) { return $source }
  let target = typedObjectLiteral$e($source);
  for(const [$sourceKey, $sourceValue] of Object.entries($source)) {
    if(typeOfProperty === 'string') { target[$sourceKey] = set($property, $sourceValue); }
    else if(typeOfProperty === 'function') { target[$sourceKey] = $property($sourceValue); }
    if(target[$sourceKey][$property] && typeof target[$sourceKey][$property] === 'object') {
      target[$sourceKey][$property] = expandTree(target[$sourceKey][$property], $property);
    }
  }
  return target
}

function impandTree$1($source, $property) {
  const typeOfProperty = typeOf$6($property);
  const typeOfSource = typeOf$6($source);
  if(
    !['string', 'function'].includes(typeOfProperty) ||
    !['array', 'object'].includes(typeOfSource)
  ) { return $source }
  let target = typedObjectLiteral$e($source);
  for(const [$sourceKey, $sourceValue] of Object.entries($source)) {
    if(typeOfProperty === 'string') { target[$sourceKey] = get($property, $sourceValue); }
    else if(typeOfProperty === 'function') { target[$sourceKey] = $property($sourceValue); }
    if(target[$sourceKey] && typeof target[$sourceKey] === 'object') {
      target[$sourceKey] = impandTree$1(target[$sourceKey], $property);
    }
  }
  return target
}

const Options$2$1 = {
  depth: 0,
  maxDepth: 10,
  accessors: [accessors.default],
};
function propertyDirectory($object, $options) {
  const _propertyDirectory = [];
  const options = Object.assign({}, Options$2$1, $options);
  options.depth++;
  if(options.depth > options.maxDepth) { return _propertyDirectory }
  iterateAccessors: 
  for(const $accessor of options.accessors) {
    const object = $accessor($object);
    if(!object) continue iterateAccessors
    for(const [$key, $value] of Object.entries(object)) {
      if(!options.values) { _propertyDirectory.push($key); }
      else if(options.values) { _propertyDirectory.push([$key, $value]); }
      if(
        typeof $value === 'object' &&
        $value !== null &&
        $value !== object
      ) {
        const subtargets = propertyDirectory($value, options);
        if(!options.values) {
          for(const $subtarget of subtargets) {
            const path = [$key, $subtarget].join('.');
            _propertyDirectory.push(path);
          }
        }
        else if(options.values) {
          for(const [$subtargetKey, $subtarget] of subtargets) {
            const path = [$key, $subtargetKey].join('.');
            _propertyDirectory.push([path, $subtarget]);
          }
        }
      }
    }
  }
  return _propertyDirectory
}

function recursiveAssign$f($target, ...$sources) {
  if(!$target) { return $target}
  iterateSources: 
  for(const $source of $sources) {
    if(!$source) continue iterateSources
    for(const [
      $sourcePropertyKey, $sourcePropertyValue
    ] of Object.entries($source)) {
      const typeOfTargetPropertyValue = typeOf$6($target[$sourcePropertyKey]);
      const typeOfSourcePropertyValue = typeOf$6($sourcePropertyValue);
      if(
        typeOfTargetPropertyValue === 'object' &&
        typeOfSourcePropertyValue === 'object'
      ) {
        $target[$sourcePropertyKey] = recursiveAssign$f($target[$sourcePropertyKey], $sourcePropertyValue);
      }
      else {
        $target[$sourcePropertyKey] = $sourcePropertyValue;
      }
    }
  }
  return $target
}

function recursiveAssignConcat($target, ...$sources) {
  if(!$target) { return $target}
  iterateSources: 
  for(const $source of $sources) {
    if(!$source) continue iterateSources
    for(const [
      $sourcePropertyKey, $sourcePropertyValue
    ] of Object.entries($source)) {
      const typeOfTargetPropertyValue = typeOf$6($target[$sourcePropertyKey]);
      const typeOfSourcePropertyValue = typeOf$6($sourcePropertyValue);
      if( 
        typeOfTargetPropertyValue === 'object' &&
        typeOfSourcePropertyValue === 'object'
      ) {
        $target[$sourcePropertyKey] = recursiveAssignConcat($target[$sourcePropertyKey], $sourcePropertyValue);
      }
      else if(
        typeOfTargetPropertyValue === 'array' &&
        typeOfSourcePropertyValue === 'array'
      ) {
        $target[$sourcePropertyKey] = $target[$sourcePropertyKey].concat($sourcePropertyValue);
      }
      else {
        $target[$sourcePropertyKey] = $sourcePropertyValue;
      }
    }
  }
  return $target
}

function recursiveFreeze$1($target) {
  for(const [$propertyKey, $propertyValue] of Object.entries($target)) {
    if($propertyValue && typeof $propertyValue === 'object') {
      recursiveFreeze$1($propertyValue);
    }
  }
  return Object.freeze($target)
}

var index = /*#__PURE__*/Object.freeze({
  __proto__: null,
  accessors: accessors,
  expandEvents: expandEvents,
  expandTree: expandTree,
  impandTree: impandTree$1,
  propertyDirectory: propertyDirectory,
  recursiveAssign: recursiveAssign$f,
  recursiveAssignConcat: recursiveAssignConcat,
  recursiveFreeze: recursiveFreeze$1,
  regularExpressions: regularExpressions$3,
  typeOf: typeOf$6,
  typedObjectLiteral: typedObjectLiteral$e,
  variables: index$1
});

var Settings$1$1 = ($settings = {}) => {
  const Settings = {
    events: {},
    enableEvents: false,
    propertyDefinitions: {
      getEvents: 'getEvents',
      addEvents: 'addEvents',
      removeEvents: 'removeEvents',
      enableEvents: 'enableEvents',
      disableEvents: 'disableEvents',
      reenableEvents: 'reenableEvents',
      emitEvents: 'emitEvents',
    },
  };
  for(const [$settingKey, $settingValue] of Object.entries($settings)) {
    switch($settingKey) {
      case 'propertyDefinitions':
        Settings[$settingKey] = Object.assign(Settings[$settingKey], $settingValue);
        break
      default: 
        Settings[$settingKey] = $settingValue;
        break
    }
  }
  return Settings
};

function handleNoCommaBraces(span) {
    if (span.length < 3) {
        return "{" + span + "}";
    }
    var separatorI = -1;
    for (var i = 2; i < span.length; i++) {
        if (span[i] === '.' && span[i - 1] === '.' && (i < 2 || span[i - 2] !== '\\')) {
            if (separatorI > -1) {
                return "{" + span + "}";
            }
            separatorI = i - 1;
        }
    }
    if (separatorI > -1) {
        var rangeStart = span.substr(0, separatorI);
        var rangeEnd = span.substr(separatorI + 2);
        if (rangeStart.length > 0 && rangeEnd.length > 0) {
            return "[" + span.substr(0, separatorI) + "-" + span.substr(separatorI + 2) + "]";
        }
    }
    return "{" + span + "}";
}
function expand(pattern) {
    if (typeof pattern !== 'string') {
        throw new TypeError("A pattern must be a string, but " + typeof pattern + " given");
    }
    var scanning = false;
    var openingBraces = 0;
    var closingBraces = 0;
    var handledUntil = -1;
    var results = [''];
    var alternatives = [];
    var span;
    for (var i = 0; i < pattern.length; i++) {
        var char = pattern[i];
        if (char === '\\') {
            i++;
            continue;
        }
        if (char === '{') {
            if (scanning) {
                openingBraces++;
            }
            else if (i > handledUntil && !openingBraces) {
                span = pattern.substring(handledUntil + 1, i);
                for (var j = 0; j < results.length; j++) {
                    results[j] += span;
                }
                alternatives = [];
                handledUntil = i;
                scanning = true;
                openingBraces++;
            }
            else {
                openingBraces--;
            }
        }
        else if (char === '}') {
            if (scanning) {
                closingBraces++;
            }
            else if (closingBraces === 1) {
                span = pattern.substring(handledUntil + 1, i);
                if (alternatives.length > 0) {
                    var newResults = [];
                    alternatives.push(expand(span));
                    for (var j = 0; j < results.length; j++) {
                        for (var k = 0; k < alternatives.length; k++) {
                            for (var l = 0; l < alternatives[k].length; l++) {
                                newResults.push(results[j] + alternatives[k][l]);
                            }
                        }
                    }
                    results = newResults;
                }
                else {
                    span = handleNoCommaBraces(span);
                    for (var j = 0; j < results.length; j++) {
                        results[j] += span;
                    }
                }
                handledUntil = i;
                closingBraces--;
            }
            else {
                closingBraces--;
            }
        }
        else if (!scanning && char === ',' && closingBraces - openingBraces === 1) {
            span = pattern.substring(handledUntil + 1, i);
            alternatives.push(expand(span));
            handledUntil = i;
        }
        if (scanning && (closingBraces === openingBraces || i === pattern.length - 1)) {
            scanning = false;
            i = handledUntil - 1;
        }
    }
    if (handledUntil === -1) {
        return [pattern];
    }
    var unhandledFrom = pattern[handledUntil] === '{' ? handledUntil : handledUntil + 1;
    if (unhandledFrom < pattern.length) {
        span = pattern.substr(unhandledFrom);
        for (var j = 0; j < results.length; j++) {
            results[j] += span;
        }
    }
    return results;
}

function negate(pattern, options) {
    var supportNegation = options['!'] !== false;
    var supportParens = options['()'] !== false;
    var isNegated = false;
    var i;
    if (supportNegation) {
        for (i = 0; i < pattern.length && pattern[i] === '!'; i++) {
            if (supportParens && pattern[i + 1] === '(') {
                i--;
                break;
            }
            isNegated = !isNegated;
        }
        if (i > 0) {
            pattern = pattern.substr(i);
        }
    }
    return { pattern: pattern, isNegated: isNegated };
}

function escapeRegExpChar(char) { if (char === '-' ||
    char === '^' ||
    char === '$' ||
    char === '+' ||
    char === '.' ||
    char === '(' ||
    char === ')' ||
    char === '|' ||
    char === '[' ||
    char === ']' ||
    char === '{' ||
    char === '}' ||
    char === '*' ||
    char === '?' ||
    char === '\\') {
    return "\\" + char;
}
else {
    return char;
} }
function escapeRegExpString(str) {
    var result = '';
    for (var i = 0; i < str.length; i++) {
        result += escapeRegExpChar(str[i]);
    }
    return result;
}

function Pattern(source, options, excludeDot) {
    var separator = typeof options.separator === 'undefined' ? true : options.separator;
    var separatorSplitter = '';
    var separatorMatcher = '';
    var wildcard = '.';
    if (separator === true) {
        separatorSplitter = '/';
        separatorMatcher = '[/\\\\]';
        wildcard = '[^/\\\\]';
    }
    else if (separator) {
        separatorSplitter = separator;
        separatorMatcher = escapeRegExpString(separatorSplitter);
        if (separatorMatcher.length > 1) {
            separatorMatcher = "(?:" + separatorMatcher + ")";
            wildcard = "((?!" + separatorMatcher + ").)";
        }
        else {
            wildcard = "[^" + separatorMatcher + "]";
        }
    }
    else {
        wildcard = '.';
    }
    var requiredSeparator = separator ? separatorMatcher + "+?" : '';
    var optionalSeparator = separator ? separatorMatcher + "*?" : '';
    var segments = separator ? source.split(separatorSplitter) : [source];
    var support = {
        qMark: options['?'] !== false,
        star: options['*'] !== false,
        globstar: separator && options['**'] !== false,
        brackets: options['[]'] !== false,
        extglobs: options['()'] !== false,
        excludeDot: excludeDot && options.excludeDot !== false,
    };
    return {
        source: source,
        segments: segments,
        options: options,
        separator: separator,
        separatorSplitter: separatorSplitter,
        separatorMatcher: separatorMatcher,
        optionalSeparator: optionalSeparator,
        requiredSeparator: requiredSeparator,
        wildcard: wildcard,
        support: support,
    };
}
function Segment(source, pattern, isFirst, isLast) { return {
    source: source,
    isFirst: isFirst,
    isLast: isLast,
    end: source.length - 1,
}; }
function Result() {
return {
    match: '',
    unmatch: '',
    useUnmatch: false,
}; }
function State(pattern, segment, result) { return {
    pattern: pattern,
    segment: segment,
    result: result,
    openingBracket: segment.end + 1,
    closingBracket: -1,
    openingParens: 0,
    closingParens: 0,
    parensHandledUntil: -1,
    extglobModifiers: [],
    scanningForParens: false,
    escapeChar: false,
    addToMatch: true,
    addToUnmatch: pattern.support.extglobs,
    dotHandled: false,
    i: -1,
    char: '',
    nextChar: '',
}; }

var EXCLUDE_DOT_PATTERN = '(?!\\.)';
function add(state, addition, excludeDot) {
    if (state.addToUnmatch) {
        state.result.unmatch += addition;
    }
    if (state.addToMatch) {
        if (excludeDot && !state.dotHandled) {
            addition = EXCLUDE_DOT_PATTERN + addition;
        }
        state.dotHandled = true;
        state.result.match += addition;
    }
    return state.result;
}
function convertSegment(pattern, segment, result) {
    var support = pattern.support;
    var state = State(pattern, segment, result);
    var separatorMatcher = segment.isLast
        ? pattern.optionalSeparator
        : pattern.requiredSeparator;
    if (!support.excludeDot) {
        state.dotHandled = true;
    }
    if (segment.end === -1) {
        return segment.isLast && !segment.isFirst ? result : add(state, separatorMatcher);
    }
    if (support.globstar && segment.source === '**') {
        var prefix = !state.dotHandled ? EXCLUDE_DOT_PATTERN : '';
        var globstarSegment = prefix + pattern.wildcard + "*?" + separatorMatcher;
        return add(state, "(?:" + globstarSegment + ")*?");
    }
    while (++state.i <= segment.end) {
        state.char = state.segment.source[state.i];
        state.nextChar = state.i < segment.end ? segment.source[state.i + 1] : '';
        if (state.char === '\\') {
            if (state.i < state.segment.end) {
                state.escapeChar = true;
                continue;
            }
            else {
                state.char = '';
            }
        }
        var pattern = state.pattern, segment = state.segment, char = state.char, i = state.i;
        if (pattern.support.brackets && !state.scanningForParens) {
            if (i > state.openingBracket && i <= state.closingBracket) {
                if (state.escapeChar) {
                    add(state, escapeRegExpChar(char));
                }
                else if (i === state.closingBracket) {
                    add(state, ']');
                    state.openingBracket = segment.source.length;
                }
                else if (char === '-' && i === state.closingBracket - 1) {
                    add(state, '\\-');
                }
                else if (char === '!' && i === state.openingBracket + 1) {
                    add(state, '^');
                }
                else if (char === ']') {
                    add(state, '\\]');
                }
                else {
                    add(state, char);
                }
                state.escapeChar = false;
                continue;
            }
            if (i > state.openingBracket) {
                if (char === ']' &&
                    !state.escapeChar &&
                    i > state.openingBracket + 1 &&
                    i > state.closingBracket) {
                    state.closingBracket = i;
                    state.i = state.openingBracket;
                    if (pattern.separator) {
                        add(state, "(?!" + pattern.separatorMatcher + ")[", true);
                    }
                    else {
                        add(state, '[', true);
                    }
                }
                else if (i === segment.end) {
                    add(state, '\\[');
                    state.i = state.openingBracket;
                    state.openingBracket = segment.source.length;
                    state.closingBracket = segment.source.length;
                }
                state.escapeChar = false;
                continue;
            }
            if (char === '[' &&
                !state.escapeChar &&
                i > state.closingBracket &&
                i < segment.end) {
                state.openingBracket = i;
                state.escapeChar = false;
                continue;
            }
        }
        if (state.pattern.support.extglobs) {
            var extglobModifiers = state.extglobModifiers, char = state.char, nextChar = state.nextChar, i = state.i;
            if (nextChar === '(' &&
                !state.escapeChar &&
                (char === '@' || char === '?' || char === '*' || char === '+' || char === '!')) {
                if (state.scanningForParens) {
                    state.openingParens++;
                }
                else if (i > state.parensHandledUntil && !state.closingParens) {
                    state.parensHandledUntil = i;
                    state.scanningForParens = true;
                    state.openingParens++;
                }
                else if (state.closingParens >= state.openingParens) {
                    if (char === '!') {
                        state.addToMatch = true;
                        state.addToUnmatch = false;
                        add(state, state.pattern.wildcard + "*?", true);
                        state.addToMatch = false;
                        state.addToUnmatch = true;
                        state.result.useUnmatch = true;
                    }
                    extglobModifiers.push(char);
                    add(state, '(?:', true);
                    state.openingParens--;
                    state.i++;
                    continue;
                }
                else {
                    state.openingParens--;
                }
            }
            else if (char === ')' && !state.escapeChar) {
                if (state.scanningForParens) {
                    state.closingParens++;
                }
                else if (extglobModifiers.length) {
                    var modifier_1 = extglobModifiers.pop();
                    if (modifier_1 === '!' && extglobModifiers.indexOf('!') !== -1) {
                        throw new Error("Nested negated extglobs aren't supported");
                    }
                    modifier_1 = modifier_1 === '!' || modifier_1 === '@' ? '' : modifier_1;
                    add(state, ")" + modifier_1);
                    state.addToMatch = true;
                    state.addToUnmatch = true;
                    state.closingParens--;
                    continue;
                }
            }
            else if (char === '|' && state.closingParens &&
                !state.scanningForParens &&
                !state.escapeChar) {
                add(state, '|');
                continue;
            }
            if (state.scanningForParens) {
                if (state.closingParens === state.openingParens || i === state.segment.end) {
                    state.scanningForParens = false;
                    state.i = state.parensHandledUntil - 1;
                }
                state.escapeChar = false;
                continue;
            }
        }
        var pattern = state.pattern;
        var support = pattern.support;
        if (!state.escapeChar && support.star && state.char === '*') {
            if (state.i === state.segment.end || state.nextChar !== '*') {
                add(state, pattern.wildcard + "*?", true);
            }
        }
        else if (!state.escapeChar && support.qMark && state.char === '?') {
            add(state, pattern.wildcard, true);
        }
        else {
            add(state, escapeRegExpChar(state.char));
        }
        state.escapeChar = false;
    }
    return add(state, separatorMatcher);
}
function convert(source, options, excludeDot) {
    var pattern = Pattern(source, options, excludeDot);
    var result = Result();
    var segments = pattern.segments;
    for (var i = 0; i < segments.length; i++) {
        var segment = Segment(segments[i], pattern, i === 0, i === segments.length - 1);
        convertSegment(pattern, segment, result);
    }
    if (result.useUnmatch) {
        return "(?!^" + result.unmatch + "$)" + result.match;
    }
    else {
        return result.match;
    }
}

function flatMap(array, predicate) {
    var results = [];
    for (var i = 0; i < array.length; i++) {
        var mappedValue = predicate(array[i]);
        for (var j = 0; j < mappedValue.length; j++) {
            results.push(mappedValue[j]);
        }
    }
    return results;
}
function compile(patterns, options) {
    patterns = Array.isArray(patterns) ? patterns : [patterns];
    if (options['{}'] !== false) {
        patterns = flatMap(patterns, expand);
    }
    var positiveResults = [];
    var negativeResults = [];
    var result = '';
    for (var i = 0; i < patterns.length; i++) {
        var negatedPattern = negate(patterns[i], options);
        var convertedPattern = convert(negatedPattern.pattern, options, !negatedPattern.isNegated);
        if (negatedPattern.isNegated) {
            negativeResults.push(convertedPattern);
        }
        else {
            positiveResults.push(convertedPattern);
        }
    }
    if (negativeResults.length) {
        result = "(?!(?:" + negativeResults.join('|') + ")$)";
    }
    if (positiveResults.length > 1) {
        result += "(?:" + positiveResults.join('|') + ")";
    }
    else if (positiveResults.length === 1) {
        result += positiveResults[0];
    }
    else if (result.length) {
        result += convert('**', options, true);
    }
    return "^" + result + "$";
}
function isMatch(regexp, sample) { if (typeof sample !== 'string') {
    throw new TypeError("Sample must be a string, but " + typeof sample + " given");
} return regexp.test(sample); }
/**
 * Compiles one or more glob patterns into a RegExp and returns an isMatch function.
 * The isMatch function takes a sample string as its only argument and returns true
 * if the string matches the pattern(s).
 *
 * ```js
 * outmatch('src/*.js')('src/index.js') //=> true
 * ```
 *
 * ```js
 * const isMatch = outmatch('*.example.com', '.')
 * isMatch('foo.example.com') //=> true
 * isMatch('foo.bar.com') //=> false
 * ```
 */
function outmatch(pattern, options) {
    if (typeof pattern !== 'string' && !Array.isArray(pattern)) {
        throw new TypeError("The first argument must be a single pattern string or an array of patterns, but " + typeof pattern + " given");
    }
    if (typeof options === 'string' || typeof options === 'boolean') {
        options = { separator: options };
    }
    if (arguments.length === 2 &&
        !(typeof options === 'undefined' ||
            (typeof options === 'object' && options !== null && !Array.isArray(options)))) {
        throw new TypeError("The second argument must be an options object or a string/boolean separator, but " + typeof options + " given");
    }
    options = options || {};
    if (options.separator === '\\') {
        throw new Error('\\ is not a valid separator');
    }
    var regexpPattern = compile(pattern, options);
    var regexp = new RegExp(regexpPattern, options.flags);
    var fn = isMatch.bind(null, regexp);
    fn.options = options;
    fn.pattern = pattern;
    fn.regexp = regexp;
    return fn;
}

var Settings$5 = ($settings = {}) => {
  const Settings = {
    enable: false,
    accessors: [accessors.default],
    propertyDirectory: { scopeKey: $settings.scopeKey, maxDepth: 10 },
    assign: 'addEventListener', deassign: 'removeEventListener', transsign: 'dispatchEvent',
    bindListener: true,
    scopeKey: ':scope',
    errorLog: false,
    methods: {
      assign: {
        addEventListener: function addEventListener($eventDefinition, $target) {
          const { type, listener, settings } = $eventDefinition;
          const { options, useCapture } = settings;
          return $target['addEventListener'](type, listener, options || useCapture)
        },
        on: function on($eventDefinition, $target) {
          const { type, listener } = $eventDefinition;
          return $target['on'](type, listener)
        },
        once: function once($eventDefinition, $target) {
          const { type, listener } = $eventDefinition;
          return $target['once'](type, listener)
        },
      }, 
      deassign: {
        removeEventListener: function removeEventListener($eventDefinition, $target) {
          const { type, listener, settings } = $eventDefinition;
          const { options, useCapture } = settings;
          return $target['removeEventListener'](type, listener, options || useCapture)
        },
        off: function off($eventDefinition, $target) {
          const { type, listener } = $eventDefinition;
          return $target['off'](type, listener)
        },
      },
      transsign: {
        dispatchEvent: function dispatchEvent($eventDefinition, $target, $event) {
          return $target['dispatchEvent']($event)
        },
        emit: function emit($eventDefinition, $target, $type, ...$arguments) {
          return $target['emit']($type, ...$arguments)
        },
      },
    },
  };
  for(const [$settingKey, $settingValue] of Object.entries($settings)) {
    switch($settingKey) {
      case 'propertyDirectory':
        Settings[$settingKey] = Object.assign(Settings[$settingKey], $settingValue);
        break
      case 'accessors':
        Settings[$settingKey] = $settingValue;
        Settings.propertyDirectory[$settingKey] = $settingValue;
        break
      case 'methods': 
        Settings[$settingKey] = recursiveAssign$f(Settings[$settingKey], $settingValue);
        break
      case 'enableEvents': break
      default: 
        Settings[$settingKey] = $settingValue;
        break
    }
  }
  return Settings
};

class EventDefinition {
  #settings
  #context
  #listener
  #enable = false
  #path
  #assigned = []
  #deassigned = []
  #transsigned = []
  #nontranssigned = []
  #_targets = []
  #_assign
  #_deassign
  #_transsign
  constructor($settings, $context) { 
    if(!$settings || !$context) { return this }
    this.#settings = Settings$5($settings);
    this.#context = $context;
    this.enable = this.settings.enable;
  }
  get settings() { return this.#settings }
  get path() { return this.settings.path }
  get type() { return this.settings.type }
  get listener() {
    if(this.#listener !== undefined) { return this.#listener }
    const listener = this.settings.listener;
    if(this.settings.bindListener === true) {
      this.#listener = listener.bind(this.#context);
    }
    else { this.#listener = listener; }
    return this.#listener
  }
  get enable() { return this.#enable }
  set enable($enable) {
    const targets = this.#targets;
    const assigned = this.#assigned;
    const deassigned = this.#deassigned;
    assigned.length = 0;
    deassigned.length = 0;
    iterateTargetElements: 
    for(const $targetElement of targets) {
      const { path, target, enable } = $targetElement;
      this.settings;
      if(enable === $enable) { continue iterateTargetElements }
      if($enable === true) {
        try {
          this.#assign(target);
          $targetElement.enable = $enable;
          assigned.push($targetElement);
          
        }
        catch($err) { if(this.settings.errorLog) { console.error($err); } }
      }
      else if($enable === false) {
        try {
          this.#deassign(target);
          $targetElement.enable = $enable;
          deassigned.push($targetElement);
        }
        catch($err) { if(this.settings.errorLog) { console.error($err); } }
      }
    }
    this.#enable = $enable;
  }
  get assigned() { return this.#assigned }
  get deassigned() { return this.#deassigned }
  get #target() { return this.settings.target }
  get #targets() {
    const pretargets = this.#_targets;
    const targets = [];
    if(this.#target) {
      for(const $target of [].concat(this.#target)) {
        const pretargetElement = pretargets.find(
          ($pretarget) => $pretarget?.path === this.path
        );
        if(pretargetElement !== undefined) {
          targets.push(pretargetElement);
        }
        else if(pretargetElement === undefined) {
          targets.push({
            path: this.path,
            target: $target,
            enable: false,
          });
        }
      }
    }
    else if(typeOf$6(this.path) === 'string') {
      const targetPaths = [];
      if(this.path === this.#scopeKey) {
        const targetElement = {
          path: this.path,
          target: this.#context,
          enable: false,
        };
        targets.push(targetElement);
      }
      else {
        if(this.settings.propertyDirectory) {
          const propertyDirectory = this.#propertyDirectory;
          const propertyPathMatcher = outmatch(this.path, {
            separator: '.',
          });
          for(const $propertyPath of propertyDirectory) {
            const propertyPathMatch = propertyPathMatcher($propertyPath);
            if(propertyPathMatch === true) { targetPaths.push($propertyPath); }
          }
          if(this.path.charAt(0) === '*') {
            targetPaths.unshift(this.#scopeKey);
          }
        }
        else {
          targetPaths.push(this.path);
        }
        for(const $targetPath of targetPaths) {
          const pretargetElement = pretargets.find(
            ($pretarget) => $pretarget.path === $targetPath
          );
          let target = this.#context;
          let targetElement;
          const pathKeys = $targetPath.split('.');
          let pathKeysIndex = 0;
          iterateTargetPathKeys: 
          while(pathKeysIndex < pathKeys.length) {
            let pathKey = pathKeys[pathKeysIndex];
            if(pathKey === this.#scopeKey) { break iterateTargetPathKeys }
            iterateTargetAccessors: 
            for(const $targetAccessor of this.settings.accessors) {
              try { target = $targetAccessor(target, pathKey); }
              catch($err) { if(this.settings.errorLog) { console.error($err); } }
              if(target !== undefined) { break iterateTargetAccessors }
            }
            pathKeysIndex++;
          }
          if(target !== undefined) {
            if(target === pretargetElement?.target) {
              targetElement = pretargetElement;
            }
            else if(typeof target === 'object') {
              targetElement = {
                path: $targetPath,
                target: target,
                enable: false,
              };
            }
          }
          if(targetElement !== undefined) { targets.push(targetElement); }
        }
      }
    }
    this.#_targets = targets;
    return this.#_targets
  }
  get #scopeKey() { return this.settings.scopeKey }
  get #assign() {
    if(this.#_assign !== undefined) { return this.#_assign }
    this.#_assign = this.settings.methods.assign[this.settings.assign].bind(null, this);
    return this.#_assign
  }
  get #deassign() {
    if(this.#_deassign !== undefined) { return this.#_deassign }
    this.#_deassign = this.settings.methods.deassign[this.settings.deassign].bind(null, this);
    return this.#_deassign
  }
  get #transsign() {
    if(this.#_transsign !== undefined) { return this.#_transsign }
    this.#_transsign = this.settings.methods.transsign[this.settings.transsign].bind(null, this);
    return this.#_transsign
  }
  get #methods() { return this.settings.methods }
  get #propertyDirectory() {
    if(!this.settings.propertyDirectory) { return null }
    const propertyDirectorySettings = ({
      accessors: this.settings.accessors
    }, this.settings.propertyDirectory);
    return propertyDirectory(this.#context, propertyDirectorySettings)
  }
  emit() {
    const targets = this.#targets;
    const transsigned = this.#transsigned;
    const nontranssigned = this.#nontranssigned;
    transsigned.length = 0;
    nontranssigned.length = 0;
    for(const $targetElement of targets) {
      const { target } = $targetElement;
      try {
        this.#transsign(target, ...arguments);
        transsigned.push($targetElement);
      }
      catch($err) { nontranssigned.push($targetElement); }
    }
    return this
  }
}

class Core extends EventTarget {
  static implement = function ($target, $settings) {
    if(!$target || !$settings) { return undefined }
    const settings = Settings$1$1($settings);
    const events = [];
    Object.defineProperties($target, {
      [settings.propertyDefinitions.getEvents]: {
        enumerable: false, writable: false, 
        value: function getEvents() {
          if(!arguments[0]) { return events }
          const getEvents = [];
          const $filterEvents = [].concat(arguments[0]);
          for(const $filterEvent of $filterEvents) {
            for(const $event of events) {
              let match;
              iterateEventFilterProperties: 
              for(const [
                $filterEventPropertyKey, $filterEventPropertyValue
              ] of Object.entries($filterEvent)) {
                let eventFilterMatch;
                if($filterEventPropertyKey === 'listener') {
                  eventFilterMatch = (
                    $event.settings[$filterEventPropertyKey] === $filterEventPropertyValue
                  );
                }
                else {
                  eventFilterMatch = (
                    $event[$filterEventPropertyKey] === $filterEventPropertyValue
                  );
                }
                if(match !== false) { match = eventFilterMatch; }
                else { break iterateEventFilterProperties }
              }
              if(match === true) { getEvents.push($event); }
            }
          }
          return getEvents
        }
      },
      [settings.propertyDefinitions.addEvents]: {
        enumerable: false, writable: false, 
        value: function addEvents() {
          if(!arguments.length) { return $target }
          let $addEvents = expandEvents(arguments[0], settings.scopeKey);
          let $enableEvents = arguments[1] || false;
          for(let $addEvent of $addEvents) {
            const event = {};
            for(const $settingKey of [
              'accessors', 'assign', 'deassign', 'transsign', 'propertyDirectory'
            ]) {
              const settingValue = settings[$settingKey];
              if(settingValue !== undefined) { event[$settingKey] = settingValue; }
            }
            recursiveAssign$f(event, $addEvent);
            const eventDefinition = new EventDefinition(event, $target);
            if($enableEvents) { eventDefinition.enable = true; }
            events.push(eventDefinition);
          }
          return $target
        },
      },
      [settings.propertyDefinitions.removeEvents]: {
        enumerable: false, writable: false, 
        value: function removeEvents() {
          const $events = $target[settings.propertyDefinitions.getEvents](arguments[0]);
          if($events.length === 0) return $target
          let eventsIndex = events.length - 1;
          while(eventsIndex > -1) {
            const event = events[eventsIndex];
            if($events.includes(event)) {
              event.enable = false;
              events.splice(eventsIndex, 1);
            }
            eventsIndex--;
          }
          return $target
        }
      },
      [settings.propertyDefinitions.enableEvents]: {
        enumerable: false, writable: false, 
        value: function enableEvents() {
          const $events = $target[settings.propertyDefinitions.getEvents](arguments[0]);
          if($events.length === 0) return $target
          for(const $event of $events) { $event.enable = true; }
          return $target
        },
      },
      [settings.propertyDefinitions.disableEvents]: {
        enumerable: false, writable: false, 
        value: function disableEvents() {
          const $events = $target[settings.propertyDefinitions.getEvents](arguments[0]);
          if($events.length === 0) return $target
          for(const $event of $events) { $event.enable = false; }
          return $target
        },
      },
      [settings.propertyDefinitions.reenableEvents]: {
        enumerable: false, writable: false, 
        value: function reenableEvents() {
          const $events = $target[settings.propertyDefinitions.getEvents](arguments[0]);
          for(const $event of $events) {
            $event.enable = false;
            $event.enable = true;
          }
          return $target
        },
      },
      [settings.propertyDefinitions.emitEvents]: {
        enumerable: false, writable: false, 
        value: function emitEvents($filterEvents, ...$eventParameters) {
          const $events = $target[settings.propertyDefinitions.getEvents]($filterEvents);
          for(const $event of $events) {
            $event.emit(...$eventParameters);
          }
          return $target
        },
      },
    });
    if(settings.events) { $target[settings.propertyDefinitions.addEvents](settings.events); }
    if(settings.enableEvents === true) { $target[settings.propertyDefinitions.enableEvents](); }
    return $target
  }
  constructor($settings = {}) {
    super();
    return Core.implement(this, $settings)
  }
}

class Verification extends EventTarget {
  constructor($settings) {
    super();
    const settings = Object.assign({}, $settings);
    Object.defineProperties(this, {
      'type': { value: settings.type },
      'key': { value: settings.key },
      'value': { value: settings.value },
      'message': { configurable: true, get() {
        let message;
        if(this.pass !== undefined) {
          message = settings.messages[String(this.pass)](this);
          Object.defineProperty(this, 'message', { value: message });
        }
        return message
      } },
      'pass': { writable: true, 
        set pass($pass) {
          Object.defineProperty(this, 'pass', { value: $pass });
        },
      },
    });
  }
}

const { typedObjectLiteral: typedObjectLiteral$d } = index;
const Messages$1 = {
  'true': ($validation) => `${$validation.valid}`,
  'false': ($validation) => `${$validation.valid}`,
};
function report($format = "expand", $prevalidation) {
  const prevalidation = $prevalidation || this;
  const schema = prevalidation.schema;
  const validations = [].concat(
    prevalidation.advance, prevalidation.deadvance, prevalidation.unadvance
  );
  if($format === "expand") {
    const _report = typedObjectLiteral$d(schema.type);
    for(const $validation of validations) {
      const verifications = [].concat(
        $validation.advance, $validation.deadvance, $validation.unadvance
      );
      _report[$validation.key] = {};
      for(const $verification of verifications) {
        _report[$validation.key][$verification.type] = {};
        if($verification.validation) {
          _report[$validation.key][$verification.type] = this.report($format, $verification.validation);
        }
        else {
          _report[$validation.key][$verification.type] = $verification;
        }
      }
    }
    return _report
  }
  if($format === "impand") {
    if(prevalidation.valid === false) { return false }
    const _report = typedObjectLiteral$d(schema.type);
    for(const $validation of validations) {
      const verifications = [].concat(
        $validation.advance, $validation.deadvance, $validation.unadvance
      );
      let reportValue;
      iterateVerifications: 
      for(const $verification of verifications) {
        if($verification.type === 'type') {
          if($verification.validation && $validation.valid) {
            reportValue = this.report($format, $verification.validation);
          }
          break iterateVerifications
        }
      }
      if(!reportValue) { reportValue = $validation.valid; }
      _report[$validation.key] = reportValue;
    }
    return _report
  }
}
class Validation extends EventTarget {
  constructor($settings = {}, $schema) {
    super();
    const settings = Object.assign({ messages: Messages$1 }, $settings);
    let valid;
    const advance = [];
    const deadvance = [];
    const unadvance = [];
    Object.defineProperties(this, {
      'schema': { value: $schema },
      'verificationType': { value: settings.verificationType },
      'required': { value: settings.required },
      'definition': { value: settings.definition },
      'key': { value: settings.key },
      'value': { value: settings.value },
      'advance': { value: advance },
      'deadvance': { value: deadvance },
      'unadvance': { value: unadvance },
      'valid': {
        writable: true,
        get valid() { return valid },
        set valid($valid) { Object.defineProperty(this, 'valid', { value: $valid }); }
      },
      'report': { configurable: true, get() {
        const _report = report.bind(this);
        Object.defineProperty(this, 'report', { value: _report });
        return _report
      } },
    });
  }
}

const { recursiveAssign: recursiveAssign$e } = index;
const Messages = {
  'true': ($verification) => `${$verification.pass}`,
  'false': ($verification) => `${$verification.pass}`,
};
class Validator extends EventTarget {
  constructor($definition = {}, $schema) {
    super();
    const definition = Object.freeze(
      Object.assign({ messages: Messages }, $definition)
    );
    Object.defineProperties(this, {
      'definition': { value: definition },
      'schema': { value: $schema },
      'type': { value: definition.type },
      'messages': { value: definition.messages },
      'validate': { configurable: true, get() {
        function validate($key, $value, $source, $target) {
          const { definition, messages, type } = this;
          let verification = new Verification({
            type: type,
            key: $key,
            value: definition.value,
            messages: recursiveAssign$e({}, messages, definition.messages),
          });
          const validation = definition.validate(...arguments);
          if(typeof validation === 'object') {
            verification.validation = validation;
            verification.pass = validation.valid;
          }
          else { verification.pass = validation; }
          return verification
        }
        const boundValidate = validate.bind(this);
        Object.defineProperty(this, 'validate', {
          value: boundValidate
        });
        return boundValidate
      } },
    });
  }
}

const { recursiveAssign: recursiveAssign$d, typedObjectLiteral: typedObjectLiteral$c } = index;
class RequiredValidator extends Validator {
  constructor($definition, $schema) {
    super(Object.assign({}, $definition, {
      type: 'required',
      validate: ($key, $value, $source, $target) => {
        const { requiredProperties, requiredPropertiesSize, type } = $schema;
        const corequiredProperties = Object.assign({}, requiredProperties);
        let corequiredPropertiesSize = requiredPropertiesSize;
        Object.assign(typedObjectLiteral$c(type), $source, $target);
        this.definition;
        let pass;
        if(!requiredPropertiesSize) { pass = true; }
        else {
          if(Object.hasOwn(corequiredProperties, $key)) {
            delete corequiredProperties[$key];
            corequiredPropertiesSize--;
          }
          if(corequiredPropertiesSize) {
            const coschema = new Schema(corequiredProperties, {
              path: $schema.path,
              parent: $schema.parent,
            });
            const comodel = Object.assign({}, $target, $source);
            const covalidation = coschema.validate(comodel);
            pass = covalidation.valid;
          }
        }
        return pass
      }
    }), $schema);
  }
}

const { typeOf: typeOf$5, variables: variables$1 } = index;
const { ObjectKeys, TypeKeys } = variables$1;
class TypeValidator extends Validator {
  constructor($definition = {}, $schema) {
    super(Object.assign({}, $definition, {
      type: 'type',
      validate: ($key, $value, $source, $target) => {
        let pass;
        const definition = this.definition;
        let typeOfDefinitionValue = typeOf$5(definition.value);
        if(typeOfDefinitionValue === 'function') {
          typeOfDefinitionValue = typeOf$5(definition.value());
        }
        else if(definition.value instanceof Schema) {
          typeOfDefinitionValue = definition.value.type;
        }
        else {
          typeOfDefinitionValue = typeOf$5(definition.value);
        }
        if(TypeKeys.includes(typeOfDefinitionValue)) {
          const typeOfValue = typeOf$5($value);
          if(typeOfValue === 'undefined') { pass = false; }
          else if(typeOfDefinitionValue === 'undefined') { pass = true; }
          else if(definition.value instanceof Schema) {
            const validation = definition.value.validate($value, $source);
            pass = validation;
          }
          else { pass = (typeOfDefinitionValue === typeOfValue); }
        }
        else { pass = false; }
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

const { recursiveAssign: recursiveAssign$c } = index;
var Options$1$1 = (...$options) => Object.assign({
  required: false,
  verificationType: 'all', 
  // verificationType: 'one',
  strict: false,
  properties: {
    type: 'type',
    value: 'value',
  },
}, ...$options);

const { typedObjectLiteral: typedObjectLiteral$b, typeOf: typeOf$4, variables } = index;

class Schema extends EventTarget {
  constructor($properties = {}, $options = {}) {
    super();
    Object.defineProperties(this, {
      'options': { value: Options$1$1($options) },
      'type': { value: typeOf$4($properties) },
      'parent': { configurable: true, get() {
        const { options } = this;
        const parent = (options.parent) ? options.parent : null;
        Object.defineProperty(this, 'parent', { value: parent });
        return parent
      } },
      'root': { configurable: true, get() {
        let root = this;
        iterateParents: 
        while(root) {
          if([undefined, null].includes(root.parent)) { break iterateParents }
          root = root.parent;
        }
        return root
      } },
      'key': { configurable: true, get() {
        const { path } = this;
        const key = (path) ? path.split('.').pop() : null;
        Object.defineProperty(this, 'key', { value: key });
        return key
      } },
      'path': { configurable: true, get() {
        const { options } = this;
        const path = (options.path)
          ? String(options.path)
          : null;
        Object.defineProperty(this, 'path', { value: path });
        return path
      } },
      'required': { configurable: true, get() {
        const required = this.options.required;
        Object.defineProperty(this, 'required', { value: required });
        return required
      } },
      'requiredProperties': { configurable: true, get() {
        const requiredProperties = typedObjectLiteral$b(this.type);
        for(const [$propertyKey, $propertyDefinition] of Object.entries(this.target)) {
          if($propertyDefinition.required?.value === true) {
            requiredProperties[$propertyKey] = $propertyDefinition;
          }
        }
        Object.defineProperty(this, 'requiredProperties', { value: Object.freeze(requiredProperties) });
        return requiredProperties
      } },
      'requiredPropertiesSize': { configurable: true, get() {
        const requiredPropertiesSize = Object.keys(this.requiredProperties).length;
        Object.defineProperty(this, 'requiredPropertiesSize', { value: requiredPropertiesSize });
        return requiredPropertiesSize
      } },
      'verificationType': { configurable: true, get() {
        const verificationType = this.options.verificationType;
        Object.defineProperty(this, 'verificationType', { value: verificationType });
        return verificationType
      } },
      'target': { configurable: true, get() {
        let properties;
        const type = this.type;
        if(type === 'array') { properties = $properties.slice(0, 1); }
        else if(type === 'object') { properties = $properties; }
        const target = parseProperties(properties, this);
        Object.defineProperty(this, 'target', { value: target });
        return target
      } },
      'validate': { value: function(...$arguments) {
        let { $sourceName, $source, $target } = parseValidateArguments(...$arguments);
        $target = $target || typedObjectLiteral$b($source);
        const { target, path, required, type, verificationType } = this;
        let validation = new Validation({
          required, verificationType,
          definition: target,
          key: $sourceName, 
          value: $source,
        }, this);
        const sourceProperties = Object.entries($source);
        let sourcePropertyIndex = 0;
        while(sourcePropertyIndex < sourceProperties.length) {
          const [$sourceKey, $sourceValue] = sourceProperties[sourcePropertyIndex];
          const propertyValidation = this.validateProperty($sourceKey, $sourceValue, $source, $target);
          if(propertyValidation.valid === true) { validation.advance.push(propertyValidation); } 
          else if(propertyValidation.valid === false) { validation.deadvance.push(propertyValidation); } 
          else if(propertyValidation.valid === undefined) { validation.unadvance.push(propertyValidation );}
          sourcePropertyIndex++;
        }
        if(validation.advance.length) { validation.valid = true; }
        else if(validation.deadvance.length) { validation.valid = false; }
        else if(validation.unadvance.length) { validation.valid = undefined; }
        else { validation.valid = true; }
        return validation
      } },
      'validateProperty': { value: function() {
        const { $key, $value, $source, $target } = parseValidatePropertyArguments(...arguments);
        const { target, path, required, schema, type, verificationType } = this;
        let propertyDefinition;
        if(type === 'array') { propertyDefinition = target[0]; }
        else if(type === 'object') { propertyDefinition = target[$key]; }
        const propertyValidation = new Validation({
          required,
          verificationType,
          definition: propertyDefinition,
          key: $key,
          value: $value,
        }, this);
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
        else {
          iteratePropertyDefinitionValidators:
          for(const [$validatorIndex, $validator] of Object.entries(propertyDefinition.validators)) {
            const verification = $validator.validate($key, $value, $source, $target);
            if(verification.pass === true) { propertyValidation.advance.push(verification); }
            else if(verification.pass === false) { propertyValidation.deadvance.push(verification); }
            else if(verification.pass === undefined) { propertyValidation.unadvance.push(verification); }
            if(this.verificationType === 'one' && propertyValidation.deadvance.length) {
              break iteratePropertyDefinitionValidators
            }
          }
        }
        if(propertyValidation.deadvance.length) { propertyValidation.valid = false; }
        else if(propertyValidation.advance.length) { propertyValidation.valid = true; }
        else if(propertyValidation.unadvance.length) { propertyValidation.valid = false; }
        return propertyValidation
      } },
    });
  }
}
function parseValidateArguments(...$arguments) {
  let $sourceName, $source, $target;
  if($arguments.length === 1) {
    $sourceName = null; $source = $arguments.shift(); $target = null;
  }
  else if($arguments.length === 2) {
    if(['number', 'string'].includes(typeof $arguments[0])) {
      $sourceName = $arguments.shift(); $source = $arguments.shift(); $target = null;
    }
    else if($arguments[0] && typeof $arguments[0] === 'object') {
      $sourceName = null; $source = $arguments.shift(); $target = $arguments.shift();
    }
  }
  else if($arguments.length === 3) {
    if(['number', 'string'].includes(typeof $arguments[0])) {
      $sourceName = $arguments.shift(); $source = $arguments.shift(); $target = $arguments.shift();
    }
  }
  return { $sourceName, $source, $target }
}
function parseValidatePropertyArguments(...$arguments) {
  let [$key, $value, $source, $target] = $arguments;
  return { $key, $value, $source, $target }
}
function parseProperties($properties, $schema) {
  const properties = typedObjectLiteral$b($properties);
  if(_isPropertyDefinition($properties, $schema)) { return $properties }
  for(const [
    $propertyKey, $propertyValue
  ] of Object.entries($properties)) {
    let propertyDefinition = {};
    typeOf$4($propertyValue);
    const isPropertyDefinition = _isPropertyDefinition($propertyValue, $schema);
    if(variables.TypeValues.includes($propertyValue)) {
      Object.assign(propertyDefinition, { type: { value: $propertyValue } });
    }
    else if(variables.TypeKeys.includes($propertyValue)) {
      Object.assign(propertyDefinition, { type: { value: variables.Types[$propertyValue] } });
    }
    else if(!isPropertyDefinition) {
      const subpropertyPath = ($schema.path) ? [$schema.path, $propertyKey].join('.') : $propertyKey;
      Object.assign(propertyDefinition, {
        type: { type: 'type', value: new Schema($propertyValue, Object.assign({}, $schema.options, {
          parent: $schema,
          path: subpropertyPath
        })) }
      });
    }
    else if(isPropertyDefinition) {
      for(const [$propertyValidatorName, $propertyValidator] of Object.entries($propertyValue)) {
        const isValidatorDefinition = _isValidatorDefinition($propertyValidator, $schema);
        if(!isValidatorDefinition) {
          let propertyValidator;
          if($propertyValidatorName === 'type') {
            if($propertyValidator && typeof $propertyValidator === 'object') {
              const subpropertyPath = ($schema.path) ? [$schema.path, $propertyKey].join('.') : $propertyKey;
              propertyValidator = new Schema($propertyValidator, Object.assign({}, $schema.options, {
                parent: $schema, 
                path: subpropertyPath,
              }));
            }
            else {
              propertyValidator = $propertyValidator;
            }
          }
          else {
            propertyValidator = $propertyValidator;
          }
          propertyDefinition[$propertyValidatorName] = {
            type: $propertyValidatorName, value: propertyValidator
          };
        }
        else if(isValidatorDefinition) {
          propertyDefinition[$propertyValidatorName] = $propertyValidator;
        }
      }
    }
    propertyDefinition.validators = [];
    properties[$propertyKey] = propertyDefinition;
    const validators = new Map();
    validators.set('type', Object.assign({}, {
      type: 'type', validator: TypeValidator, value: propertyDefinition.type.value
    }));
    validators.set('required', Object.assign({}, {
      type: 'required', validator: RequiredValidator, value: propertyDefinition.required?.value || false
    }));
    if(propertyDefinition.range) { validators.set('range', Object.assign({}, propertyDefinition.range, {
      type: 'range', validator: RangeValidator
    })); }
    else if(propertyDefinition.min || propertyDefinition.max) { validators.set('range', Object.assign({}, {
      type: 'range', min: propertyDefinition.min, max: propertyDefinition.max, validator: RangeValidator
    })); }
    if(propertyDefinition.length) { validators.set('length', Object.assign({}, propertyDefinition.length, {
      type: 'length', validator: LengthValidator
    })); }
    else if(propertyDefinition.minLength || propertyDefinition.maxLength) { validators.set('length', Object.assign({}, {
      type: 'length', min: propertyDefinition.minLength, max: maxLength, validator: LengthValidator
    })); }
    if(propertyDefinition.enum) { validators.set('enum', Object.assign({}, propertyDefinition.enum, {
      type: 'enum', validator: EnumValidator
    })); }
    if(propertyDefinition.match) { validators.set('match', Object.assign({}, propertyDefinition.match, {
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
      propertyDefinition.validators.push(new ValidatorClass($validatorSettings, $schema));
    }
  }
  return properties
}
function _isPropertyDefinition($object, $schema) {
  if(!$object || $object instanceof Schema) { return false }
  const typeKey = $schema.options.properties.type;
  return Object.hasOwn($object, typeKey)
}
function _isValidatorDefinition($object, $schema) {
  if(!$object) { return false }
  const valueKey = $schema.options.properties.value;
  return Object.hasOwn($object, valueKey)
}

const { recursiveAssign: recursiveAssign$b } = index;
var Options$5 = ($options) => {
  const Options = recursiveAssign$b({
    path: null, 
    parent: null, 
    enableEvents: false,
    enableValidation: true, 
    validationEvents: {
      'validProperty:$key': true,
      'validProperty': true,
      'nonvalidProperty:$key': true,
      'nonvalidProperty': true,
    },
    pathkey: true,
    subpathError: false,
    assignObject: 'set', 
    assignArray: 'set', 
    methods: {
      map: {
        get: {
          mutatorEvents: {
            'get': true,
            'getProperty': true,
            'getProperty:$key': true,
          },
        },
        set: {
          recursive: true,
          mutatorEvents: {
            'set': true,
            'setProperty': true,
            'setProperty:$key': true,
          },
        },
        delete: {
          mutatorEvents: {
            'delete': true,
            'deleteProperty': true,
            'deleteProperty:$key': true,
          },
        },
      },
      array: {
        concat: {
          mutatorEvents: {
            'concatElement:$index': true,
            'concatElement': true,
            'concat': true,
          }
        },
        copyWithin: {
          mutatorEvents: {
            'copyWithinElement:$index': true,
            'copyWithinElement': true,
            'copyWithin': true,
          }
        },
        fill: {
          lengthen: true,
          mutatorEvents: {
            'fillElement:$index': true,
            'fillElement': true,
            'fill': true,
          }
        },
        pop: {
          mutatorEvents: { 'pop': true  },
        },
        push: {
          mutatorEvents: {
            'pushElement:$index': true,
            'pushElement': true,
            'push': true,
          }
        },
        reverse: {
          mutatorEvents: { 'reverse': true  },
        },
        shift: {
          mutatorEvents: { 'shift': true  },
        },
        splice: {
          mutatorEvents: {
            'spliceDeleteElement:$index': true,
            'spliceDeleteElement': true,
            'spliceAddElement:$index': true,
            'spliceAddElement': true,
            'splice': true,
          }
        },
        unshift: {
          mutatorEvents: {
            'unshiftElement:$index': true,
            'unshiftElement': true,
            'unshift': true,
          }
        },
      },
      object: {
        assign: {
          sourceTree: true,
          mutatorEvents: {
            'assignSourceProperty:$key': true,
            'assignSourceProperty': true,
            'assignSource': true,
            'assign': true,
          },
        },
        defineProperties: {
          descriptorTree: true,
          mutatorEvents: { 'defineProperties': true },
        },
        defineProperty: {
          descriptorTree: true,
          mutatorEvents: {
            'defineProperty': true,
            'defineProperty:$key': true,
          },
        },
        freeze: {
          recursive: true,
          mutatorEvents: {
            'freezeProperty': true,
            'freeze': true,
          },
        },
        seal: {
          recursive: true,
          mutatorEvents: {
            'sealProperty': true,
            'seal': true,
          },
        },
      },
    },
  }, $options);
  return Options
};

class ModelEvent extends CustomEvent {
  constructor($type, $settings, $model) {
    super($type, $settings);
    Object.defineProperties(this, {
      'model': { get () { return $model } },
      'key': { configurable: true, get () {
        const key = (this.path) ? this.path.split('.').pop() : null;
        Object.defineProperty(this, 'key', { value: key });
        return key
      } },
      'change': { configurable: true, get () {
        const change = $settings.change;
        Object.defineProperty(this, 'change', { value: change });
        return change
      } },
      'value': { configurable: true, get () {
        const value = $settings.value;
        Object.defineProperty(this, 'value', { value: value });
        return value
      } },
      'path': { configurable: true, get () {
        const path = $settings.path;
        Object.defineProperty(this, 'path', { value: path });
        return path
      } },
      'detail': { configurable: true, get () {
        const detail = $settings.detail;
        Object.defineProperty(this, 'detail', { value: detail });
        return detail
      } },
    });
  }
}

class Change {
  #_keyter = false 
  #_preter = false 
  #_anter = false 
  #_conter = false
  #keyter
  #preter
  #anter
  #conter
  constructor($settings = {}) {
    for(const [$key, $value] of Object.entries($settings)) { this[$key] = $value; }
  }
  get preter() { return this.#preter }
  set preter($preter) {
    if(this.#_preter === true) { return this.#preter }
    this.#preter = $preter?.valueOf();
    this.#_preter = true;
  }
  get anter() { return this.#anter }
  set anter($anter) {
    if(this.#_anter === true) { return this.#anter }
    this.#anter = $anter?.valueOf();
    this.#_anter = true;
  }
  get conter() {
    if(
      this.#_conter === true ||
      [this.#_preter, this.#_anter].includes(false)
    ) { return this.#conter }
    const preter = JSON.stringify(this.preter);
    const anter = JSON.stringify(this.anter);
    let conter;
    if(anter !== preter) { conter = true; }
    else { conter = false; }
    this.#conter = conter;
    this.#_conter = true;
    return this.#conter
  }
}

let ValidatorEvent$1 = class ValidatorEvent extends CustomEvent {
  constructor($type, $settings, $model) {
    super($type);
    Object.defineProperties(this, {
      'key': { configurable: true, get () {
        const key = $settings.key;
        Object.defineProperty(this, 'key', { value: key });
        return key
      } },
      'path': { configurable: true, get () {
        const path = ($model.path)
          ? [$model.path, $settings.key].join('.')
          : $settings.key;
        Object.defineProperty(this, 'path', { value: path });
        return path
      } },
      // 'value': { configurable: true, get () {
      //   const value = $settings.value
      //   Object.defineProperty(this, 'value', { value: value, })
      //   return value
      // } },
      'valid': { configurable: true, get () {
        const valid = $settings.valid;
        Object.defineProperty(this, 'valid', { value: valid });
        return valid
      } },
    });
  }
};

const { recursiveAssign: recursiveAssign$a, typedObjectLiteral: typedObjectLiteral$a } = index;
function assign($model, $options, ...$sources) {
  const options = Object.assign({}, $options);
  const assignObject = 'assign';
  const assignArray = options.assignArray || 'assign';
  const { path, schema, source, target } = $model;
  const { enableValidation, mutatorEvents, required, sourceTree, validationEvents } = options;
  const assignedSources = [];
  const assignChange = new Change({ preter: $model });
  for(let $source of $sources) {
    let assignedSource;
    const assignSourceChange = new Change({ preter: $model });
    if(Array.isArray($source)) { assignedSource = []; }
    else if($source && typeof $source === 'object') { assignedSource = {}; }
    let validObject;
    if(enableValidation && schema) {
      validObject = schema.validate($source, $model.valueOf());
      validObject.report();
    }
    iterateSourceProperties:
    for(let [$sourceKey, $sourceValue] of Object.entries($source)) {
      const assignSourcePropertyChange = new Change({ preter: target[$sourceKey] });
      const assignSourcePropertyKeyChange = new Change({ preter: target[$sourceKey] });
      if(schema && enableValidation) {
        const validatorTarget = $model.valueOf();
        const validatorSource = $source;
        const validSourceProperty = schema.validateProperty($sourceKey, $sourceValue, validatorSource, validatorTarget);
        if(validationEvents) {
          let type, propertyType;
          if(validSourceProperty.valid) {
            type = 'validProperty';
            propertyType = ['validProperty', $sourceKey].join(':');
          }
          else {
            type = 'nonvalidProperty';
            propertyType = ['nonvalidProperty', $sourceKey].join(':');
          }
          for(const $eventType of [type, propertyType]) {
            $model.dispatchEvent(new ValidatorEvent$1($eventType, validSourceProperty, $model));
          }
        }
        if(!validSourceProperty.valid) { continue iterateSourceProperties }
      }
      let sourceValue;
      if($sourceValue && typeof $sourceValue === 'object') {
        if($sourceValue instanceof $model.constructor) {
          sourceValue = $sourceValue.valueOf();
        }
        let subschema;
        if(schema?.type === 'array') { subschema = schema.target[0].type.value; }
        else if(schema?.type === 'object') { subschema = schema.target[$sourceKey].type.value; }
        else { subschema = null; }
        const modelPath = (path)
          ? [path, $sourceKey].join('.')
          : String($sourceKey);
        if(sourceTree === false) {
          const suboptions = recursiveAssign$a({}, options, {
            path: modelPath,
            parent: $model,
          });
          sourceValue = new $model.constructor($sourceValue, subschema, suboptions);
          const assignment = { [$sourceKey]: sourceValue };
          Object.assign(target, assignment);
          Object.assign(assignedSource, assignment);
        }
        else {
          if(target[$sourceKey] instanceof $model.constructor) {
            sourceValue = target[$sourceKey];
          }
          else {
            const subproperties = typedObjectLiteral$a($sourceValue);
            const suboptions = recursiveAssign$a({}, options, {
              path: modelPath,
              parent: $model,
            });
            sourceValue = new $model.constructor(subproperties, subschema, suboptions);
          }
          const assignment = { [$sourceKey]: sourceValue };
          Object.assign(target, assignment);
          Object.assign(assignedSource, assignment);
          $model.retroReenableEvents();
          if(sourceValue.type === 'array') {
            if(['push', 'unshift'].includes(assignArray)) { sourceValue[assignArray](...$sourceValue); }
            else { sourceValue[assignArray]($sourceValue); }
          }
          else if(sourceValue.type === 'object') { sourceValue[assignObject]($sourceValue); }
        }
      }
      else {
        sourceValue = $sourceValue;
        const assignment = { [$sourceKey]: sourceValue };
        Object.assign(target, assignment);
        Object.assign(assignedSource, assignment);
      }
      if(mutatorEvents) {
        const modelEventPath = (path) ? [path, $sourceKey].join('.') : String($sourceKey);
        if(mutatorEvents['assignSourceProperty:$key']) {
          const type = ['assignSourceProperty', $sourceKey].join(':');
          assignSourcePropertyKeyChange.anter = target[$sourceKey];
          $model.dispatchEvent(
            new ModelEvent(type, {
              path: modelEventPath,
              value: sourceValue,
              change: assignSourcePropertyKeyChange,
              detail: {
                source: assignedSource,
              }
            }, $model)
          );
        }
        if(mutatorEvents['assignSourceProperty']) {
          assignSourcePropertyChange.anter = target[$sourceKey];
          $model.dispatchEvent(
            new ModelEvent('assignSourceProperty', {
              path: modelEventPath,
              value: sourceValue,
              change: assignSourcePropertyChange,
              detail: {
                source: assignedSource,
              }
            }, $model)
          );
        }
      }
    }
    assignedSources.push(assignedSource);
    if(mutatorEvents && mutatorEvents['assignSource']) {
      assignSourceChange.anter = $model;
      $model.dispatchEvent(
        new ModelEvent('assignSource', {
          path,
          change: assignSourceChange,
          detail: {
            source: assignedSource,
          },
        }, $model)
      );
    }
  }
  if(mutatorEvents && mutatorEvents['assign']) {
    assignChange.anter = $model;
    $model.dispatchEvent(
      new ModelEvent('assign', { 
        path,
        change: assignChange,
        detail: {
          sources: assignedSources,
        },
      }, $model)
    );
  }
  return $model
}

const { typedObjectLiteral: typedObjectLiteral$9 } = index;
function defineProperties($model, $options, $propertyDescriptors) {
  const { path, schema } = $model;
  let {
    enableValidation, mutatorEvents, required, 
    validation, validationEvents, validationReport
  } = $options;
  const propertyDescriptorEntries = Object.entries($propertyDescriptors);
  const definePropertiesChange = new Change({ preter: $model });
  for(const [
    $propertyKey, $propertyDescriptor
  ] of propertyDescriptorEntries) {
    $model.defineProperty($propertyKey, $propertyDescriptor, Object.assign({}, $options, {
      validation, validationReport
    }));
  }
  if(mutatorEvents && mutatorEvents['defineProperties']) {
    definePropertiesChange.anter = $model;
    $model.dispatchEvent(
      new ModelEvent(
        'defineProperties',
        {
          path,
          value: $model.valueOf(),
          detail: {
            descriptors: $propertyDescriptors,
          },
        },
        $model
      )
    );
  }
  return $model
}

const { impandTree, recursiveAssign: recursiveAssign$9, typedObjectLiteral: typedObjectLiteral$8 } = index;
function defineProperty($model, $options, $propertyKey, $propertyDescriptor) {
  const options = Object.assign({}, $options);
  const assignObject = 'defineProperties';
  const assignArray = options.assignArray || 'defineProperties';
  const {
    descriptorTree, enableValidation, mutatorEvents, 
    validation, validationEvents, validationReport
  } = options;
  const { target, path, schema } = $model;
  const propertyValue = $propertyDescriptor.value;
  const targetPropertyDescriptor = Object.getOwnPropertyDescriptor(target, $propertyKey) || {};
  const targetPropertyValue = targetPropertyDescriptor.value;
  const definePropertyChange = new Change({ preter: targetPropertyValue });
  const definePropertyKeyChange = new Change({ preter: targetPropertyValue });
  const targetPropertyValueIsModelInstance = targetPropertyValue instanceof $model.constructor;
  if(schema && enableValidation) {
    const validProperty = schema.validateProperty(
      $propertyKey, 
      impandTree(propertyValue, 'value') || propertyValue,
      {},
      $model.valueOf()
    );
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
        $model.dispatchEvent(new ValidatorEvent$1($eventType, validProperty, $model));
      }
    }
    if(!validProperty.valid) { return $model }
  }
  if(propertyValue && typeof propertyValue === 'object') {
    const modelPath = (path)
      ? [path, $propertyKey].join('.')
      : String($propertyKey);
    if(targetPropertyValueIsModelInstance) {
      if(descriptorTree === true) {
        targetPropertyValue.defineProperties($propertyDescriptor);
      }
      else {
        Object.defineProperty(target, $propertyKey, $propertyDescriptor);
      }
    }
    else {
      let subschema;
      if(schema) {
        if(schema.type === 'array') { subschema = schema.target[0].type.value; }
        else if(schema.type === 'object') { subschema = schema.target[$propertyKey].type.value; }
        else { subschema = undefined; }
      }
      let subtarget = typedObjectLiteral$8(propertyValue);
      const suboptions = recursiveAssign$9({}, options, {
        path: modelPath,
        parent: $model,
      });
      const submodel = new $model.constructor(
        subtarget, subschema, suboptions
      );
      if(descriptorTree === true) {
        target[$propertyKey] = submodel;
        $model.retroReenableEvents();
        if(submodel.type === 'array') {
          if(['push', 'unshift'].includes(assignArray)) { submodel[assignArray](...propertyValue); }
          else { submodel[assignArray](propertyValue); }
        }
        else if(submodel.type === 'object') { submodel[assignObject](propertyValue); }
      }
      else if(descriptorTree === false) {
        Object.defineProperty(target, $propertyKey, $propertyDescriptor);
      }
    }
  }
  else {
    Object.defineProperty(target, $propertyKey, $propertyDescriptor);
  }
  if(mutatorEvents) {
    const modelEventPath = (path)
      ? [path, $propertyKey].join('.')
      : String($propertyKey);
    if(mutatorEvents['defineProperty:$key']) {
      definePropertyKeyChange.anter = target[$propertyKey];
      const type = ['defineProperty', $propertyKey].join(':');
      $model.dispatchEvent(
        new ModelEvent(type, {
          path: modelEventPath,
          value: propertyValue,
          change: definePropertyKeyChange,
          detail: {
            prop: $propertyKey,
            descriptor: $propertyDescriptor,
          },
        }, $model
      ));
    }
    if(mutatorEvents['defineProperty']) {
      definePropertyChange.anter = target[$propertyKey];
      $model.dispatchEvent(
        new ModelEvent('defineProperty', {
          path: modelEventPath,
          value: propertyValue,
          change: definePropertyChange,
          detail: {
            prop: $propertyKey,
            descriptor: $propertyDescriptor,
          },
        }, $model
      ));
    }
  }
  return $model
}

function freeze($model, $options) {
  const { recursive, mutatorEvents } = $options;
  const { target } = $model;
  if(recursive === true) {
    for(const [
      $propertyKey, $propertyValue
    ] of Object.entries(target)) {
      if($propertyValue instanceof $model.constructor) {
        $propertyValue.freeze();
        if(mutatorEvents && mutatorEvents['freezeProperty']) {
          $model.dispatchEvent(
            new ModelEvent(
              'freezeProperty',
              { path: $propertyValue.path },
              $model
            )
          );
        }
      }
    }
  }
  Object.freeze(target);
  if(mutatorEvents && mutatorEvents['freeze']) {
    $model.dispatchEvent(
      new ModelEvent(
        'freeze',
        { path: $model.path },
        $model
      )
    );
  }
  return $model
}

function seal($model, $options) {
  const { recursive, mutatorEvents } = $options;
  const { target } = $model;
  if(recursive === true) {
    for(const [
      $propertyKey, $propertyValue
    ] of Object.entries(target)) {
      if($propertyValue instanceof $model.constructor) {
        $propertyValue.seal();
        if(mutatorEvents && mutatorEvents['sealProperty']) {
          $model.dispatchEvent(
            new ModelEvent(
              'sealProperty',
              { path: $propertyValue.path },
              $model
            )
          );
        }
      }
    }
  }
  Object.seal(target);
  if(mutatorEvents && mutatorEvents['seal']) {
    $model.dispatchEvent(
      new ModelEvent(
        'seal',
        { path: $model.path },
        $model
      )
    );
  }
  return $model
}

var ObjectProperty = {
  assign,
  defineProperties,
  defineProperty,
  freeze,
  seal,
};

const { typedObjectLiteral: typedObjectLiteral$7 } = index;
function concat($model, $options) {
  const { target, path, schema } = $model;
  const { enableValidation, mutatorEvents, source, validationEvents } = $options;
  const $arguments = [].concat(...arguments);
  let valueIndex = target.length;
  const values = [];
  let targetConcat = [...Array.from(target)];
  let model;
  iterateValues: 
  for(let $value of $arguments) {
    if(schema && enableValidation) {
      const validatorTarget = $model.valueOf();
      const validatorSource = source || typedObjectLiteral$7(validatorTarget);
      const validValue = schema.validateProperty(valueIndex, $subvalue, validatorSource, validatorTarget);
      if(schema &&validationEvents) {
        let type, propertyType;
        if(validValue.valid) {
          type = 'validProperty';
          propertyType = ['validProperty', valueIndex].join(':');
        }
        else {
          type = 'nonvalidProperty';
          propertyType = ['nonvalidProperty', valueIndex].join(':');
        }
        for(const $eventType of [type, propertyType]) {
          $model.dispatchEvent(new ValidatorEvent$1($eventType, validValue, $model));
        }
      }
      if(!validValue.valid) { valueIndex++; continue iterateValues }
    }
    const modelPath = (path)
      ? [path, valueIndex].join('.')
      : String(valueIndex);
    if($value && typeof $value === 'object') {
      if($value instanceof $model.constructor) { $value = $value.valueOf(); }
      let subschema = schema?.target[0].type.value || null;
      const submodel = typedObjectLiteral$7($value);
      let value = new $model.constructor(submodel, subschema, {
        path: modelPath,
        parent: $model,
      });
      value.concat($value);
      values[valueIndex] = value;
    }
    else {
      values[valueIndex] = $value;
    }
    targetConcat = Array.prototype.concat.call(targetConcat, values[valueIndex]);
    if(mutatorEvents) {
      const modelEventPath = (path)
        ? [path, valueIndex].join('.')
        : String(valueIndex);
      if(mutatorEvents['concatElement']) {
        $model.dispatchEvent(
          new ModelEvent('concatElement', {
            path: modelEventPath,
            value: values[valueIndex],
            detail: {
              valueIndex,
              value: values[valueIndex],
            },
          }, $model)
        );
      }
      if(mutatorEvents['concatElement:$index']) {
        $model.dispatchEvent(
          new ModelEvent('concatElement', {
            path: modelEventPath,
            value: values[valueIndex],
            detail: {
              valueIndex,
              value: values[valueIndex],
            },
          }, $model)
        );
      }
    }
    valueIndex++;
  }
  model = new $model.constructor(targetConcat, schema, $model.options);
  if(mutatorEvents && mutatorEvents['concat']) {
    $model.dispatchEvent(
      new ModelEvent('concat', {
        path,
        detail: {
          values: model,
        },
      }, $model)
    );
  }
  return model
}

function copyWithin($model, $options) {
  const { target, path } = $model;
  const { enableValidation, validationEvents, mutatorEvents } = $options;
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
    $model.retroReenableEvents();
    if(mutatorEvents) {
      const modelEventPath = (path)
        ? [path, copyIndex].join('.')
        : String(copyIndex);
      if(mutatorEvents['copyWithinElement']) {
        $model.dispatchEvent(
          new ModelEvent(
            'copyWithinElement',
            {
              path: modelEventPath,
              value: copyItem,
              detail: {
                target: targetIndex,
                start: copyIndex,
                end: copyIndex + 1,
                item: copyItem,
              },
            },
            $model
          )
        );
      }
      if(mutatorEvents['copyWithinElement:$index']) {
        const type  = ['copyWithinElement', ':', copyIndex].join('');
        $model.dispatchEvent(
          new ModelEvent(
            type,
            {
              path: modelEventPath,
              value: copyItem,
              detail: {
                target: targetIndex,
                start: copyIndex,
                end: copyIndex + 1,
                item: copyItem,
              },
            },
            $model
          )
        );
      }
    }
    copyIndex++;
    targetIndex++;
  }
  // Array Copy Within Event
  if(mutatorEvents && mutatorEvents['copyWithin']) {
    $model.dispatchEvent(
      new ModelEvent(
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
        $model
      )
    );
  }
  return $model
}

const { typedObjectLiteral: typedObjectLiteral$6 } = index;
function fill($model, $options, ...$arguments) {
  const options = Object.assign({}, $options);
  const { target, path, schema } = $model;
  const assignObject = options.assignObject;
  const assignArray = options.assignArray || assignObject;
  const { enableValidation, lengthen, mutatorEvents, validationEvents } = options;
  const filled = [];
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
  if(lengthen && target.length < $end) { target.length = $end; }
  let fillIndex = $start;
  iterateFillIndexes: 
  while(
    fillIndex < target.length &&
    fillIndex < $end
  ) {
    if(schema && enableValidation) {
      let validValue = schema.validate(validValue, $model.valueOf());
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
          $model.dispatchEvent(new ValidatorEvent$1($eventType, validValue, $model));
        }
      }
      if(!validValue.valid) { continue iterateFillIndexes }
    }
    const modelPath = (path)
      ? [path, fillIndex].join('.')
      : String(fillIndex);
    let $value = $arguments[0];
    let value;
    if($value && typeof $value === 'object') {
      if($value instanceof $model.constructor) { $value = $value.valueOf(); }
      const subschema = schema?.target[0].type.value || null;
      const subproperties = typedObjectLiteral$6($value);
      const suboptions = Object.assign({}, options, {
        path: modelPath,
        parent: $model,
      });
      value = new $model.constructor(subproperties, subschema, suboptions);
    }
    Array.prototype.fill.call(target, value, fillIndex, fillIndex + 1);
    $model.retroReenableEvents();
    if(value.type === 'array') {
      if(['push', 'unshift'].includes(assignArray)) { value[assignArray](...$value); }
      else { value[assignArray]($value); }
    }
    else if(value.type === 'object') { value[assignObject]($value); }
    filled.push(value);
    if(mutatorEvents) {
      const modelEventPath = (path)
        ? [path, fillIndex].join('.')
        : String(fillIndex);
      if(mutatorEvents['fillElement']) {
        $model.dispatchEvent(
          new ModelEvent('fillElement', {
            path: modelEventPath, 
            value: value,
            detail: {
              start: fillIndex,
              end: fillIndex + 1,
              value,
            },
          }, $model)
        );
      }
      if(mutatorEvents['fillElement:$index']) {
        const type = ['fillElement', ':', fillIndex].join('');
        $model.dispatchEvent(
          new ModelEvent(type, {
            path: modelEventPath, 
            detail: {
              start: fillIndex,
              end: fillIndex + 1,
              value,
            },
          }, $model)
        );
      }
    }
    fillIndex++;
  }
  if(mutatorEvents && mutatorEvents['fill']) {
    $model.dispatchEvent(
      new ModelEvent('fill', {
        path,
        detail: {
          start: $start,
          end: $end,
          filled,
        },
      },
      $model)
    );
  }
  return $model
}

function pop($model, $options) {
  const { mutatorEvents } = $options;
  const { target, path } = $model;
  const popElement = Array.prototype.pop.call(target);
  const popElementIndex = target.length - 1;
  $model.retroReenableEvents();
  if(mutatorEvents && mutatorEvents['pop']) {
    const modelEventPath = (path)
      ? [path, popElementIndex].join('.')
      : String(popElementIndex);
      $model.dispatchEvent(
      new ModelEvent(
        'pop',
        {
          path: modelEventPath,
          value: popElement,
          detail: {
            elementIndex: popElementIndex,
            element: popElement,
          },
        },
        $model
      )
    );
  }
  return popElement
}

const { recursiveAssign: recursiveAssign$8, typedObjectLiteral: typedObjectLiteral$5, typeOf: typeOf$3 } = index;
function push($model, $options, ...$elements) {
  const options = Object.assign({}, $options);
  const assignArray = 'push';
  const assignObject = options.assignObject;
  const { enableValidation, mutatorEvents, source, validationEvents } = options;
  const { target, path, schema } = $model;
  const elements = [];
  let elementsIndex = 0;
  for(let $element of $elements) {
    let element;
    if(schema && enableValidation) {
      const validatorTarget = $model.valueOf();
      const validatorSource = source || typedObjectLiteral$5(validatorTarget);
      const validElement = schema.validateProperty(elementsIndex, $element, validatorSource, validatorTarget);
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
          $model.dispatchEvent(new ValidatorEvent$1($eventType, validElement, $model));
        }
      }
      if(!validElement.valid) { return target.length }
    }
    const modelPath = (path)
      ? [path, elementsIndex].join('.')
      : String(elementsIndex);
    if($element && typeof $element === 'object') {
      $element = ($element instanceof $model.constructor) ? $element.valueOf() : $element;
      const subschema = schema?.target[0].type.value || null;
      const subproperties = typedObjectLiteral$5(typeOf$3($element));
      const submodelOptions = Object.assign({}, options, {
        path: modelPath,
        parent: $model,
      });
      element = new $model.constructor(subproperties, subschema, submodelOptions);
      Array.prototype.push.call(target, element);
      $model.retroReenableEvents();
      if(element.type === 'array') {
        if(['push', 'unshift'].includes(assignArray)) { element[assignArray](...$element); }
        else { element[assignArray]($element); }
      }
      else if(element.type === 'object') { element[assignObject]($element); }
    }
    else {
      element = $element;
      Array.prototype.push.call(target, element);
    }
    elements.push(element);
    if(mutatorEvents) {
      const modelEventPath = (path)
        ? [path, '.', elementsIndex].join('')
        : String(elementsIndex);
      if(mutatorEvents['pushElement']) {
        $model.dispatchEvent(
          new ModelEvent('pushElement', {
            path: modelEventPath,
            value: elements[elementsIndex],
            detail: {
              elementsIndex,
              element: elements[elementsIndex],
            },
          }, $model)
        );
      }
      if(mutatorEvents['pushElement:$index']) {
        const type = ['pushElement', ':', elementsIndex].join('');
        $model.dispatchEvent(
          new ModelEvent(type, {
            path: modelEventPath,
            value: elements[elementsIndex],
            detail: {
              elementsIndex,
              element: elements[elementsIndex],
            },
          }, $model)
        );
      }
    }
    elementsIndex++;
  }
  if(mutatorEvents && mutatorEvents['push']) {
    $model.dispatchEvent(
      new ModelEvent('push', {
        path,
        detail: {
          elements,
        },
      }, $model)
    );
  }
  return target.length
}

function reverse($model, $options) {
  const { mutatorEvents } = $options;
  const { target, path } = $model;
  Array.prototype.reverse.call(target, ...arguments);
  $model.retroReenableEvents();
  if(mutatorEvents && mutatorEvents['reverse']) {
    $model.dispatchEvent(
      new ModelEvent(
        'reverse',
        {
          path,
          detail: {
            reference: target
          },
        },
        $model
      )
    );
  }
  return $model
}

function shift($model, $options) {
  const { mutatorEvents } = $options;
  const { target, path } = $model;
  const shiftElement = Array.prototype.shift.call(target);
  const shiftElementIndex = 0;
  $model.retroReenableEvents();
  if(mutatorEvents && mutatorEvents['shift']) {
    const modelEventPath = (path)
      ? [path, shiftElementIndex].join('.')
      : String(shiftElementIndex);
    $model.dispatchEvent(
      new ModelEvent(
        'shift',
        {
          path: modelEventPath,
          value: shiftElement,
          detail: {
            elementIndex: shiftElementIndex,
            element: shiftElement,
          },
        },
        $model
      )
    );
  }
  return shiftElement
}

const { typedObjectLiteral: typedObjectLiteral$4 } = index;
function splice($model, $options) {
  const options = Object.assign({}, $options);
  const assignObject = options.assignObject;
  const assignArray = options.assignArray || assignObject;
  const { mutatorEvents, source } = options;
  const { target, path, schema } = $model;
  const { enableValidation, validationEvents } = options;
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
    if(mutatorEvents) {
      const modelEventPath = (path)
        ? [path, deleteItemsIndex].join('.')
        : String(deleteItemsIndex);
      if(mutatorEvents['spliceDeleteElement']) {
        $model.dispatchEvent(
          new ModelEvent('spliceDeleteElement', {
            path: modelEventPath,
            value: deleteItem,
            detail: {
              index: $start + deleteItemsIndex,
              deleteIndex: deleteItemsIndex,
              deleteItem: deleteItem,
            },
          }, $model)
        );
      }
      if(mutatorEvents['spliceDeleteElement:$index']) {
        const type = ['spliceDeleteElement', ':', deleteItemsIndex].join('');
        $model.dispatchEvent(
          new ModelEvent(type, {
            path: modelEventPath,
            value: deleteItem,
            detail: {
              index: $start + deleteItemsIndex,
              deleteIndex: deleteItemsIndex,
              deleteItem: deleteItem,
            },
          }, $model)
        );
      }
    }
    deleteItemsIndex++;
  }
  let addItemsIndex = 0;
  spliceAdd: 
  while(addItemsIndex < addCount) {
    let addItem = $addItems[addItemsIndex];
    if(schema && enableValidation) {
      const validatorTarget = $model.valueOf();
      const validatorSource = source || typedObjectLiteral$4(validatorTarget);
      const validAddItem = schema.validateProperty(elementIndex, element, validatorSource, validatorTarget);
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
          $model.dispatchEvent(new ValidatorEvent($eventType, validAddItem, $model));
        }
      }
      if(!validAddItem.valid) { addItemsIndex++; continue spliceAdd }
    }
    const modelPath = (path)
      ? [path, addItemsIndex].join('.')
      : String(addItemsIndex);
    let startIndex = $start + addItemsIndex;
    if(addItem && typeof addItem === 'object') {
      if(addItem instanceof $model.constructor) { addItem = addItem.valueOf(); }
      const subschema = schema?.target[0].type.value || null;
      const subproperties = typedObjectLiteral$4(addItem);
      const suboptions = recursiveAssign({}, options, {
        path: modelPath,
        parent: $model,
      });
      addItem = new $model.constructor(subproperties, subschema, suboptions);
      Array.prototype.splice.call(target, startIndex, 0, addItem);
      $model.retroReenableEvents();
      if(addItem.type === 'array') {
        if(['push', 'unshift'].includes(assignArray)) { addItem[assignArray](...$value); }
        else { addItem[assignArray]($value); }
      }
      else if(addItem.type === 'object') { addItem[assignObject]($value); }
    }
    else {
      Array.prototype.splice.call(target, startIndex, 0, addItem);
    }
    if(mutatorEvents) {
      const modelEventPath = (path)
        ? [path, addItemsIndex].join('.')
        : String(addItemsIndex);
      if(mutatorEvents['spliceAddElement']) {
        $model.dispatchEvent(
          new ModelEvent('spliceAddElement', {
            path: modelEventPath,
            value: addItem,
            detail: {
              index: $start + addItemsIndex,
              addIndex: addItemsIndex,
              addItem: addItem,
            },
          }, $model)
        );
      }
      if(mutatorEvents['spliceAddElement:$index']) {
        const type = ['spliceAddElement', ':', addItemsIndex].join('');
        $model.dispatchEvent(
          new ModelEvent(type, {
            path: modelEventPath,
            value: addItem,
            detail: {
              index: $start + addItemsIndex,
              addIndex: addItemsIndex,
              addItem: addItem,
            },
          }, $model)
        );
      }
    }
    addItemsIndex++;
  }
  if(mutatorEvents && mutatorEvents['splice']) {
    $model.dispatchEvent(
      new ModelEvent('splice', {
        path,
        detail: {
          $start,
          deleted: deleteItems,
          added: $addItems,
          length: target.length,
        },
      },
      $model)
    );
  }
  return deleteItems
}

const { recursiveAssign: recursiveAssign$7, typedObjectLiteral: typedObjectLiteral$3, typeOf: typeOf$2 } = index;
function unshift($model, $options, ...$elements) {
  const options = Object.assign({}, $options);
  const assignArray = 'unshift';
  const assignObject = options.assignObject;
  const { enableValidation, mutatorEvents, source, validationEvents } = options;
  const { target, path, schema } = $model;
  const elements = [];
  let elementsIndex = 0;
  for(let $element of $elements) {
    let element;
    if(schema && enableValidation) {
      const validatorTarget = $model.valueOf();
      const validatorSource = source || typedObjectLiteral$3(validatorTarget);
      const validElement = schema.validateProperty(elementsIndex, $element, validatorSource, validatorTarget);
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
          $model.dispatchEvent(new ValidatorEvent($eventType, validElement, $model));
        }
      }
      if(!validElement.valid) { return target.length }
    }
    const modelPath = (path)
      ? [path, elementsIndex].join('.')
      : String(elementsIndex);
    if($element && typeof $element === 'object') {
      $element = ($element instanceof $model.constructor) ? $element.valueOf() : $element;
      const subschema = schema?.target[0].type.value || null;
      const subproperties = typedObjectLiteral$3(typeOf$2($element));
      const submodelOptions = Object.assign({}, options, {
        path: modelPath,
        parent: $model,
      });
      element = new $model.constructor(subproperties, subschema, submodelOptions);
      Array.prototype.unshift.call(target, element);
      $model.retroReenableEvents();
      if(element.type === 'array') { element[assignArray](...$element); }
      else if(element.type === 'object') { element[assignObject]($element); }
    }
    else {
      element = $element;
      Array.prototype.unshift.call(target, element);
    }
    elements.unshift(element);
    if(mutatorEvents) {
      const modelEventPath = (path)
        ? [path, '.', elementsIndex].join('')
        : String(elementsIndex);
      if(mutatorEvents['unshiftElement']) {
        $model.dispatchEvent(
          new ModelEvent('unshiftElement', {
            path: modelEventPath,
            value: elements[elementsIndex],
            detail: {
              elementsIndex,
              element: elements[elementsIndex],
            },
          }, $model)
        );
      }
      if(mutatorEvents['unshiftElement:$index']) {
        const type = ['unshiftElement', ':', elementsIndex].join('');
        $model.dispatchEvent(
          new ModelEvent(type, {
            path: modelEventPath,
            value: elements[elementsIndex],
            detail: {
              elementsIndex,
              element: elements[elementsIndex],
            },
          }, $model)
        );
      }
    }
    elementsIndex++;
  }
  if(mutatorEvents && mutatorEvents['unshift']) {
    $model.dispatchEvent(
      new ModelEvent('unshift', {
        path,
        detail: {
          elements,
        },
      }, $model)
    );
  }
  return target.length
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

function getContent($model, $options) {
  const { path } = $model;
  const { mutatorEvents } = $options;
  if(mutatorEvents && mutatorEvents['get']) {
    $model.dispatchEvent(
      new ModelEvent('get', {
        path,
        value: $model.valueOf(),
        detail: {
          value: $model.valueOf()
        }
      }, $model)
    );
  }
  return $model
}

const { regularExpressions: regularExpressions$2} = index;
function getContentProperty($model, $options, $path) {
  const { target, path } = $model;
  const { mutatorEvents, pathkey, subpathError } = $options;
  if(pathkey === true) {
    const subpaths = $path.split(new RegExp(regularExpressions$2.quotationEscape));
    const propertyKey = subpaths.shift();
    let propertyValue = target[propertyKey];
    if(subpaths.length) {
      if(subpathError === false && propertyValue === undefined) { return undefined }
      return propertyValue.get(subpaths.join('.'), $options)
    }
    if(mutatorEvents) {
      if(mutatorEvents['getProperty']) {
        $model.dispatchEvent(
          new ModelEvent('getProperty', {
            path,
            value: propertyValue,
            detail: {
              key: propertyKey,
              value: propertyValue,
            }
          }, $model)
        );
      }
      if(mutatorEvents['getProperty:$key']) {
        const type = ['getProperty', propertyKey].join(':');
        const _path = [path, propertyKey].join('.');
        $model.dispatchEvent(
          new ModelEvent(type, {
            path: _path,
            detail: {
              value: propertyValue,
            }
          }, $model)
        );
      }
    }
    return propertyValue
  }
  else if(pathkey === false) {
    const propertyValue = target[propertyKey];
    return propertyValue
  }
}

const { recursiveAssign: recursiveAssign$6 } = index;
function getProperty($model, $options, ...$arguments) {
  let getProperty;
  const options = $options;
  if(typeof $arguments[0] === 'string') {
    if($arguments.length === 2) { recursiveAssign$6(options, $arguments[1]); }
    getProperty = getContentProperty($model, options, ...$arguments);
  }
  else {
    if($arguments.length === 1) { recursiveAssign$6(options, $arguments[0]); }
    getProperty = getContent($model, options, ...$arguments);
  }
  return getProperty
}

function setContent($model, $options, $properties) {
  const { path, schema } = $model;
  let { enableValidation, mutatorEvents, required, validationEvents  } = $options;
  for(const [$propertyKey, $propertyValue] of Object.entries($properties)) {
    $model.set($propertyKey, $propertyValue, Object.assign($options, {
      source: $properties,
    }));
  }
  if(mutatorEvents && mutatorEvents['set']) {
    $model.dispatchEvent(
      new ModelEvent('set', {
        path,
        value: $model.valueOf(),
        detail: {
          value: $model.valueOf()
        }
      }, $model)
    );
  }
  return $model
}

const { recursiveAssign: recursiveAssign$5, regularExpressions: regularExpressions$1, typedObjectLiteral: typedObjectLiteral$2, typeOf: typeOf$1 } = index;
function setContentProperty($model, $options, $path, $value) {
  const options = Object.assign({}, $options);
  const assignObject = 'set';
  const assignArray = options.assignArray || 'set';
  const { target, path, schema } = $model;
  const {
    enableValidation, mutatorEvents, pathkey, 
    recursive, subpathError, 
    validationEvents, source, 
  } = options;
  if(pathkey === true) {
    const subpaths = $path.split(new RegExp(regularExpressions$1.quotationEscape));
    const propertyKey = subpaths.shift();
    let propertyValue;
    const typeOfPropertyValue = typeOf$1($value);
    const modelPath = (path)
      ? [path, propertyKey].join('.')
      : String(propertyKey);
    if(subpaths.length) {
      if(recursive && target[propertyKey] === undefined) {
        let subschema;
        if(schema?.type === 'array') { subschema = schema.target[0].type.value; }
        else if(schema?.type === 'object') { subschema = schema.target[propertyKey].type.value; }
        else { subschema = undefined; }
        let submodel;
        if(typeOfPropertyValue === 'array') { submodel = []; }
        else if(typeOfPropertyValue === 'object') { submodel = {}; }
        else {
          if(isNaN(Number(propertyKey))) { submodel = {}; }
          else { submodel = []; }
        }
        const submodelOptions = recursiveAssign$5({}, options, {
          path: modelPath,
          parent: $model,
        });
        propertyValue = new $model.constructor(submodel, subschema, submodelOptions);
      }
      else {
        propertyValue = target[propertyKey];
      }
      if(subpathError === false && propertyValue === undefined) { return undefined }
      if(propertyValue.type === 'array') {
        if(['push', 'unshift'].includes(assignArray)) { propertyValue[assignArray](...$value); }
        else { propertyValue[assignArray]($value); }
      }
      else if(propertyValue.type === 'object') { propertyValue[assignObject](subpaths.join('.'), $value, options); }
      return propertyValue
    }
    if(schema && enableValidation) {
      const validatorTarget = $model.valueOf();
      const validatorSource = source || typedObjectLiteral$2(validatorTarget);
      const validTargetProp = schema.validateProperty(propertyKey, $value, validatorSource, validatorTarget);
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
          $model.dispatchEvent(new ValidatorEvent$1($eventType, validTargetProp, $model));
        }
      }
      if(!validTargetProp.valid) { return }
    }
    if($value && typeof $value === 'object') {
      if($value instanceof $model.constructor) { $value = $value.valueOf(); }
      const typeOfPropertyValue= typeOf$1($value);
      let subschema;
      let submodel;
      if(schema?.type === 'array') { subschema = schema.target[0].type.value; }
      else if(schema?.type === 'object') { subschema = schema.target[propertyKey].type.value; }
      else { subschema = undefined; }
      if(typeOfPropertyValue === 'array') { submodel = []; }
      else if(typeOfPropertyValue === 'object') { submodel = {}; }
      else {
        if(isNaN(Number(propertyKey))) { submodel = {}; }
        else { submodel = []; }
      }
      const submodelOptions = recursiveAssign$5({}, options, {
        path: modelPath,
        parent: $model,
      });
      propertyValue = new $model.constructor(submodel, subschema, submodelOptions);
      target[propertyKey] = propertyValue;
      $model.retroReenableEvents();
      if(propertyValue.type === 'array') {
        if(['push', 'unshift'].includes(assignArray)) { propertyValue[assignArray](...$value); }
        else { propertyValue[assignArray]($value); }
      }
      else if(propertyValue.type === 'object') { propertyValue[assignObject]($value); }
    }
    else {
      propertyValue = $value;
      target[propertyKey] = propertyValue;
    }
    // const _propertyValue = (propertyValue === null) ? null : propertyValue.valueOf()
    const _propertyValue = propertyValue.valueOf();
    if(mutatorEvents) {
      const modelEventPath = (path)
        ? [path, propertyKey].join('.')
        : String(propertyKey);
      if(mutatorEvents['setProperty']) {
        $model.dispatchEvent(
          new ModelEvent('setProperty', {
            path: modelEventPath, 
            value: _propertyValue,
            detail: {
              key: propertyKey,
              value: _propertyValue,
            }
          }, $model)
        );
      }
      if(mutatorEvents['setProperty:$key']) {
        const type = ['setProperty', ':', propertyKey].join('');
        $model.dispatchEvent(
          new ModelEvent(type, {
            path: modelEventPath, 
            value: _propertyValue,
            detail: {
              value: _propertyValue,
            }
          }, $model)
        );
      }
    }
    return propertyValue
  }
  else if(pathkey === false) {
    let propertyKey = $path;
    if($value && typeof $value === 'object') {
      if($value instanceof $model.constructor) { $value = $value.valueOf(); }
      const typeOfPropertyValue = typeOf$1($value);
      let subschema;
      let submodel;
      if(schema?.type === 'array') {
        subschema = schema.target[0].type.value;
      }
      if(schema?.type === 'object') {
        subschema = schema.target[propertyKey].type.value;
      }
      else { subschema = undefined; }
      if(typeOfPropertyValue === 'array') { submodel = []; }
      else if(typeOfPropertyValue === 'object') { submodel = {}; }
      else {
        if(isNaN(Number(propertyKey))) { submodel = {}; }
        else { submodel = []; }
      }
      const modelPath = (path)
        ? [path, propertyKey].join('.')
        : String(propertyKey);
      const submodelOptions = recursiveAssign$5({}, options, {
        path: modelPath,
        parent: $model,
      });
      propertyValue = new $model.constructor(submodel, subschema, submodelOptions);
      target[propertyKey] = propertyValue;
      $model.retroReenableEvents();
      if(propertyValue.type === 'array') {
        if(['push', 'unshift'].includes(assignArray)) { propertyValue[assignArray](...$value); }
        else { propertyValue[assignArray]($value); }
      }
      else if(propertyValue.type === 'object') { propertyValue[assignObject]($value); }
    }
    else {
      propertyValue = $value;
      target[propertyKey] = propertyValue;
    }
    if(mutatorEvents) {
      const modelEventPath = (path)
        ? [path, propertyKey].join('.')
        : String(propertyKey);
      if(mutatorEvents['setProperty']) {
        $model.dispatchEvent(
          new ModelEvent('setProperty', {
            path: modelEventPath, 
            value: _propertyValue,
            detail: {
              key: propertyKey,
              value: _propertyValue,
            },
          }, $model)
        );
      }
      if(mutatorEvents['setProperty:$key']) {
        const type = ['setProperty', ':', propertyKey].join('');
        $model.dispatchEvent(
          new ModelEvent(type, {
            path: modelEventPath, 
            value: _propertyValue,
            detail: {
              value: _propertyValue,
            }
          }, $model)
        );
      }
    }
    return propertyValue
  }
}

const { recursiveAssign: recursiveAssign$4 } = index;
function setProperty($model, $options, ...$arguments) {
  let setProperty;
  const options = $options;
  if(typeof $arguments[0] === 'string') {
    if($arguments.length === 3) { recursiveAssign$4(options, $arguments[2]); }
    setProperty = setContentProperty($model, options, ...$arguments);
  }
  else {
    if($arguments.length === 2) { recursiveAssign$4(options, $arguments[1]); }
    setProperty = setContent($model, options, ...$arguments);
  }
  return setProperty
}

function deleteContent($model, $options) {
  const { target } = $model;
  for(const [$targetPropertyKey, $targetPropertyValue] of Object.entries(target)) {
    $model.delete($targetPropertyKey, $options);
  }
  const { path } = $model;
  const { mutatorEvents } = $options;
  if(mutatorEvents && mutatorEvents['delete']) {
    $model.dispatchEvent(
      new ModelEvent('delete', {
        path,
        detail: {
          value: $model.valueOf()
        }
      }, $model)
    );
  }
  return $model
}

const { regularExpressions} = index;
function deleteContentProperty($model, $options, $path) {
  const { target, path, schema } = $model;
  const { mutatorEvents, pathkey, subpathError, enableValidation, validationEvents } = $options;
  if(pathkey === true) {
    const subpaths = $path.split(new RegExp(regularExpressions.quotationEscape));
    const propertyKey = subpaths.shift();
    let propertyValue = target[propertyKey];
    if(subpaths.length) {
      if(subpathError === false && propertyValue === undefined) { return undefined }
      return propertyValue.delete(subpaths.join('.'), $options)
    }
    if(schema && enableValidation) {
      const differedPropertyProxy = $model.valueOf();
      delete differedPropertyProxy[propertyKey];
      const validTargetProp = schema.validate(propertyKey, differedPropertyProxy, {}, $model.valueOf());
      if(validationEvents) {
        let type, propertyType;
        const validatorEventPath = (path)
          ? [path, propertyKey].join('.')
          : String(propertyKey);
        if(validTargetProp.valid) {
          type = 'validProperty';
          propertyType = ['validProperty', propertyKey].join(':');
        }
        else {
          type = 'nonvalidProperty';
          propertyType = ['nonvalidProperty', propertyKey].join(':');
        }
        for(const $eventType of [type, propertyType]) {
          $model.dispatchEvent(
            new ValidatorEvent$1($eventType, Object.assign(validTargetProp, {
              path: validatorEventPath
            }), $model)
          );
        }
      }
      if(!validTargetProp.valid) { return }
    }
    if(propertyValue && typeof propertyValue === 'object') {
      propertyValue.delete($options);
    }
    delete target[propertyKey];
    if(mutatorEvents) {
      if(mutatorEvents['deleteProperty']) {
        $model.dispatchEvent(
          new ModelEvent('deleteProperty', {
            path,
            value: propertyValue,
            detail: {
              key: propertyKey,
              value: propertyValue,
            }
          }, $model)
        );
      }
      if(mutatorEvents['deleteProperty:$key']) {
        const type = ['deleteProperty', propertyKey].join(':');
        const _path = [path, propertyKey].join('.');
        $model.dispatchEvent(
          new ModelEvent(type, {
            path: _path,
            value: propertyValue,
            detail: {
              value: propertyValue,
            }
          }, $model)
        );
      }
    }
    return undefined
  }
  else if(pathkey === false) {
    const propertyKey = $path;
    const propertyValue = target[propertyKey];

    if(schema && enableValidation) {
      const differedPropertyProxy = $model.valueOf();
      delete differedPropertyProxy[propertyKey];
      const validTargetProp = schema.validate(propertyKey, differedPropertyProxy, $model.valueOf());
      if(validationEvents) {
        let type, propertyType;
        if(validTargetProp.valid) {
          type = 'validProperty';
          propertyType = ['validProperty', propertyKey].join(':');
        }
        else {
          type = 'nonvalidProperty';
          propertyType = ['nonvalidProperty', propertyKey].join(':');
        }
        for(const $eventType of [type, propertyType]) {
          $model.dispatchEvent(
            new ValidatorEvent$1($eventType, validTargetProp, $model)
          );
        }
      }
      if(!validTargetProp.valid) { return }
    }
  
    if(propertyValue instanceof $model.constructor) {
      propertyValue.delete($options);
    }
    delete target[propertyKey];
    if(mutatorEvents) {
      if(mutatorEvents['deleteProperty']) {
        $model.dispatchEvent(
          new ModelEvent('deleteProperty', {
            path,
            value: propertyValue,
            detail: {
              key: propertyKey,
              value: propertyValue,
            }
          }, $model)
        );
      }
      if(mutatorEvents['deleteProperty:$key']) {
        const type = ['deleteProperty', propertyKey].join(':');
        const _path = [path, propertyKey].join('.');
        $model.dispatchEvent(
          new ModelEvent(type, {
            path: _path,
            value: propertyValue,
            detail: {
              value: propertyValue,
            }
          }, $model)
        );
      }
    }
    return undefined
  }
}

const { recursiveAssign: recursiveAssign$3 } = index;
function deleteProperty($model, $options, ...$arguments) {
  let deleteProperty;
  const options = $options;
  if(typeof $arguments[0] === 'string') {
    if($arguments.length === 2) { recursiveAssign$3(options, $arguments[1]); }
    deleteProperty = deleteContentProperty($model, options, ...$arguments);
  }
  else {
    if($arguments.length === 1) { recursiveAssign$3(options, $arguments[0]); }
    deleteProperty = deleteContent($model, options, ...$arguments);
  }
  return deleteProperty
}

var MapProperty = {
  get: getProperty,
  set: setProperty,
  delete: deleteProperty,
};

const { recursiveAssign: recursiveAssign$2, recursiveFreeze } = index;
const Defaults = Object.freeze({
  object: [{
    keys: ['valueOf'],
    methodDescriptor: function($methodName, $model) {
      return { value: function valueOf() { return $model.parse({ type: 'object' }) } }
    },
  }, {
    keys: ['toString'],
    methodDescriptor: function($methodName, $model) {
      return { value: function toString($parseSettings = {}) {
        const replacer = ($parseSettings.replacer !== undefined)
          ? $parseSettings.replacer : null;
        const space = ($parseSettings.space !== undefined)
          ? $parseSettings.space : 0;
        return $model.parse({ type: 'string', replacer, space })
      } }
    }, 
  }, {
    keys: [
      'entries', 'fromEntries', 'getOwnPropertyDescriptors', 
      'getOwnPropertyDescriptor', 'getOwnPropertyNames', 
      /* 'getOwnPropertySymbols', */ 'groupBy', 'hasOwn', 'is', 
      'getPrototypeOf', 'isExtensible', 'isFrozen', 'isSealed', 
      'keys', 'preventExtensions', 'values',
    ],
    methodDescriptor: function($methodName, $model) {
      return { value: Object[$methodName].bind(null, $model.valueOf()) }
    },
  }, {
    keys: ['propertyIsEnumerable', 'hasOwnProperty'], 
    methodDescriptor: function($methodName, $model) {
      return { value: () => $model.parse({ type: 'object' })[$methodName] }
    },
  }, {
    type: 'mutators',
    keys: Object.keys(ObjectProperty), 
    methodDescriptor: function($methodName, $model, $options) {
      return { value: ObjectProperty[$methodName].bind(null, $model, $options) }
    }
  }],
  array: [{
    keys: ['length'], 
    methodDescriptor: function($propertyName, $model, $options) {
      return {
        get() { return $model.target.length },
        set($propertyValue) { $model.target.length = $propertyValue; },
      }
    }
  }, {
    keys: [
      'from', 'fromAsync', 'isArray', 'of', 
    ], 
    methodDescriptor: function($methodName, $model) {
      return { value: Array[$methodName] }
    }, 
  }, {
    keys: [
      'at', 'every', 'filter', 'find', 'findIndex', 'findLast',
      'findLastIndex', 'flat', 'flatMap', 'forEach', 'includes', 
      'indexOf', 'join', 'lastIndexOf', 'map', 'reduce', 'reduceRight', 
      'slice', 'some', 'sort', 'toReversed',  'toSorted', 'toSpliced', 
      'with', 
    ], 
    methodDescriptor: function($methodName, $model) {
      return { value: Array.prototype[$methodName].bind(null, $model) }
    }
  }, {
    type: 'mutators',
    keys: Object.keys(ArrayProperty), 
    methodDescriptor: function($methodName, $model, $options) {
      return { value: ArrayProperty[$methodName].bind(null, $model, $options) }
    }
  }],
  map: [{
    type: 'mutators',
    keys: Object.keys(MapProperty),
    methodDescriptor: function($methodName, $model, $options) {
      return { value: MapProperty[$methodName].bind(null, $model, $options) }
    }
  }]
});
function Methods($model) {
  // Object, Array, Map
  for(const [$propertyClassName, $propertyClasses] of Object.entries(Defaults)) {
    for(const $propertyClass of $propertyClasses) {
      const { keys, methodDescriptor, type } = $propertyClass;
      for(const $methodName of keys) {
        if($propertyClassName === 'map' || type === 'mutators') {
          const modelMethodOptions = structuredClone(
            $model.options.methods[$propertyClassName][$methodName]
          );
          const methodOptions = Object.assign({}, $model.options, modelMethodOptions);
          delete methodOptions.mutatorEvents;
          methodOptions.mutatorEvents = modelMethodOptions.mutatorEvents;
          Object.defineProperty(
            $model, $methodName, methodDescriptor($methodName, $model, methodOptions)
          );
        }
        else {
          Object.defineProperty(
            $model, $methodName, methodDescriptor($methodName,  $model)
          );
        }
      }
    }
  }
  return $model
}

const { recursiveAssign: recursiveAssign$1, typedObjectLiteral: typedObjectLiteral$1 } = index;
const ValidArrayAssigmentMethods = Object.freeze(
  ['push', 'unshift']
);
const ValidObjectAssigmentMethods = Object.freeze(
  ['assign', 'defineProperties', 'set']
);

function Assign($model, $properties, $options) {
  const { type } = $model;
  const { assignObject, assignArray } = $options;
  if(type === 'array' && ValidArrayAssigmentMethods.includes(assignArray)) {
    $model[assignArray](...$properties);
  }
  else if(['array', 'object'].includes(type) && ValidObjectAssigmentMethods.includes(assignObject)) {
    $model[assignObject]($properties);
  }
  return $model
}

const { typedObjectLiteral, typeOf } = index;

let Model$1 = class Model extends Core {
  static accessors = Object.freeze([($target, $property) => {
    if($property === undefined) { return $target.target }
    else { return $target.get($property) }
  }, ($target, $property) => {
    if($property === undefined) { return $target }
    else { return $target[$property] }
  }])
  constructor($properties = {}, $schema = null, $options = {}) {
    super({ accessors: Model.accessors });
    const properties = ($properties instanceof Model) ? $properties.valueOf() : $properties;
    Object.defineProperty(this, 'options', { configurable: true, get() {
      const options = Options$5($options);
      if(options.events) {
        this.addEvents(options.events);
        delete options.events;
      }
      if(options.enableEvents) {
        const typeofEnableEvents = typeof options.enableEvents;
        if(typeofEnableEvents === 'boolean') { this.enableEvents(); }
        else if(typeofEnableEvents === 'object') { this.enableEvents(options.enableEvents); }
      }
      Object.defineProperty(this, 'options', { value: options });
      return options
    } });
    Object.defineProperty(this, 'target', { configurable: true, get() {
      const target = typedObjectLiteral(properties);
      Object.defineProperty(this, 'target', { value: target });
      return target
    } });
    Object.defineProperty(this, 'type', { configurable: true, get() {
      const type = typeOf(this.target);
      Object.defineProperty(this, 'type', { value: type });
      return type
    } });
    Object.defineProperty(this, 'schema', { configurable: true, get() {
      const typeOfSchema = typeOf($schema);
      let schema;
      if(['undefined', 'null'].includes(typeOfSchema)) { schema = null; }
      else if($schema instanceof Schema) { schema = $schema; }
      else if(['array', 'object'].includes(typeOfSchema)) { schema = new Schema($schema); }
      Object.defineProperty(this, 'schema', { value: schema });
      return schema
    } });
    Object.defineProperty(this, 'parent', { configurable: true, get() {
      const options = this.options;
      const parent = (options.parent) ? options.parent : null;
      Object.defineProperty(this, 'parent', { value: parent });
      return parent
    } });
    Object.defineProperty(this, 'path', { configurable: true, get() {
      const options = this.options;
      let path = (options.path) ? String(options.path) : null;
      Object.defineProperty(this, 'path', { value: path });
      return path
    } });
    Object.defineProperty(this, 'key', { configurable: true, get() {
      let key = (this.path) ? this.path.split('.').pop() : null;
      Object.defineProperty(this, 'key', {
         value: key
      });
      return key
    } });
    Object.defineProperty(this, 'root', { get() {
      let root = this;
      iterateParents: 
      while(root) {
        if([undefined, null].includes(root.parent)) { break iterateParents }
        root = root.parent;
      }
      return root
    } });
    Methods(this);
    Assign(this, properties, this.options);
  }
  retroReenableEvents() {
    let model = this;
    while(model) {
      model.reenableEvents({ enable: true });
      model = model.parent;
    }
    return this
  }
  parse($settings = { type: 'object', replacer: null, space: 0 }) {
    let parsement = typedObjectLiteral(this.type);
    for(const [
      $propertyDescriptorName, $propertyDescriptor
    ] of Object.entries(
      Object.getOwnPropertyDescriptors(this.target))
    ) {
      let { enumerable, value, writable, configurable } = $propertyDescriptor;
      if(value instanceof Model) {
        Object.defineProperty(parsement, $propertyDescriptorName, {
          enumerable, value: value.valueOf(), writable, configurable
        });
      }
      else {
        Object.defineProperty(parsement, $propertyDescriptorName, {
          enumerable, value, writable, configurable
        });
      }
    }
    let { type, replacer, space } = $settings;
    if(type === 'object') { return parsement }
    else if(type === 'string') { return JSON.stringify(parsement, replacer, space) }
    else { return undefined }
  }
};

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
    catch($err) { console.error($err); }
    return
  }
  set($content) {
    try { return this.#db.setItem(this.path, JSON.stringify($content)) }
    catch($err) { console.error($err); }
    return
  }
  remove() {
    try { return this.#db.removeItem(this.path) }
    catch($err) { console.error($err); }
    return
  }
}

class Model extends Model$1 {
  #schema
  #content
  #localStorage
  #changeEvents
  constructor($settings, $options) {
    super($settings.properties, $settings.schema, $options);
  }
  get localStorage() {
    if(this.#localStorage !== undefined) { return this.#localStorage }
    const { localStorage } = this.settings;
    let path;
    if(localStorage) {
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
  save() {
    if(this.localStorage) {
      this.localStorage.set(this.content.valueOf());
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
    if($enable === this.#enable) return
    if($enable === true) {
      const { context, name, method, selector } = this;
      Object.defineProperty(context.querySelectors, name, {
        configurable: true, enumerable: true, 
        get() { return context[method](selector) }
      });
    }
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

var Settings$4 = (...$settings) => recursiveAssign$g({
  // parentElement: undefined, // HTML Element
  scope: 'template', // 'parent',
  templates: {},
  querySelectors: {},
}, ...$settings);

var Options$4 = (...$options) => Object.assign({
  enableEvents: true,
  enableQuerySelectors: true,
  // propertyDirectory: {}
}, ...$options);

class View extends MVCFrameworkCore {
  #templates
  #scope
  #parentElement
  #_template
  #children
  // #querySelectors = {}
  constructor($settings = {}, $options = {}) {
    super(Settings$4($settings), Options$4($options));
    Object.defineProperties(this, {
      _querySelectors: {
        enumerable: false, writable: false, configurable: false,
        value: {},
      },
      querySelectors: {
        enumerable: true,
        get() { return this._querySelectors },
      },
      qs: {
        enumerable: true,
        get() { return this.querySelectors },
      },
    });
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
    this.disableQuerySelectors();
    this.#template.innerHTML = $templateString;
    this.children = this.#template.content.children;
    this.parentElement.append(...this.children.values());
    this.enableQuerySelectors();
    this.reenableEvents({ enable: true });
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

var Settings$3 = ($settings) => {
  return Object.assign({
    models: {},
    views: {},
    controls: {},
    fetchRouters: {},
    locationRouters: {},
  }, $settings)
};

var Options$3 = (...$options) => {
  const options = Object.assign({}, ...$options);
  return options
};

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
            .catch(($err) => { /* console.error($err) */ });
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

var Settings$2 = (...$settings) => Object.assign({}, ...$settings);

var Options$2 = (...$options) => Object.assign({
  enableEvents: true
}, ...$options);

class FetchRouter extends MVCFrameworkCore {
  #scheme
  #domain
  #port
  #_authority
  #_origin
  #routes = {}
  constructor($settings, $options) {
    super(Settings$2($settings), Options$2($options));
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

class RouteEvent extends CustomEvent {
  #options
  constructor($type, $options) {
    super($type, $options);
    this.#options = $options;
  }
  get path() { return this.#options.path }
  get route() { return this.#options.route }
  get location() { return this.#options.location }
}

var Settings$1 = (...$settings) => Object.assign({
  routes: {}
}, ...$settings);

var Options$1 = (...$options) => Object.assign({
  enableEvents: true
}, ...$options);

class LocationRouter extends MVCFrameworkCore {
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
    super(Settings$1($settings), Options$1($options));
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
    const routeSettings = recursiveAssign$g({
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

var Settings = (...$settings) => Object.assign({
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
}, ...$settings);

var Options = (...$options) => Object.assign({
  enableEvents: true, // Boolean
}, ...$options);

class SocketRouter extends MVCFrameworkCore {
  #webSocket
  #active = false
  #messageAdapters
  #url
  #boundMessage
  constructor($settings = {}, $options = {}) {
    super(Settings($settings), Options($options));
    this.#boundMessage = this.#message.bind(this);
    Object.defineProperties(this, {
      webSocket: {
        enumerable: true,
        get() {
          if(this.#webSocket !== undefined) return this.#webSocket
          this.#webSocket = new WebSocket(this.url);
          this.#webSocket.addEventListener('message', this.#boundMessage);
          return this.#webSocket
        },
      }
    });
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

function Instate($propertyClass, $property, $value) {
  const { Class } = $propertyClass;
  return new Class(...$value)
}
function Deinstate($propertyClass, $property) {}

class Control extends MVCFrameworkCore {
  static propertyClasses = [{
    name: "models", definitionValue: 'Object',
    administer: "addModels", deadminister: "removeModels",
    instate: Instate, deinstate: Deinstate,
    Class: Model,
  }, {
    name: "views", definitionValue: 'Object',
    administer: "addViews", deadminister: "removeViews",
    instate: Instate, deinstate: Deinstate,
    Class: View,
  }, {
    name: "controls", definitionValue: 'Object',
    administer: "addControls", deadminister: "removeControls",
    instate: Instate, deinstate: Deinstate,
    Class: Control,
  }, {
    name: "locationRouters", definitionValue: 'Object',
    administer: "addLocationRouters", deadminister: "removeLocationRouters",
    instate: Instate, deinstate: Deinstate,
    Class: LocationRouter,
  }, {
    name: "fetchRouters", definitionValue: 'Object',
    administer: "addFetchRouters", deadminister: "removeFetchRouters",
    instate: Instate, deinstate: Deinstate,
    Class: FetchRouter,
  }, {
    name: "socketRouters", definitionValue: 'Object',
    administer: "addSocketRouters", deadminister: "removeSocketRouters",
    instate: Instate, deinstate: Deinstate,
    Class: SocketRouter,
  }]
  constructor($settings = {}, $options = {}) {
    super(
      Settings$3(Object.assign({
        propertyClasses: Control.propertyClasses,
      }, $settings)),
      Options$3($options),
    );
    const { enableEvents } = this.options;
    if(enableEvents) this.enableEvents();
  }
}

export { Control, MVCFrameworkCore as Core, index$2 as Coutil, FetchRouter, LocationRouter, MessageAdapter, Model, SocketRouter, Validation, Validator, Verification, View };
//# sourceMappingURL=mvc-framework.js.map
