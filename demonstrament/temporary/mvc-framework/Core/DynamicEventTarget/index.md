# Dynamic Event Target

## Events


### Object Events
#### "Assign" Event
```
{
	type: 'assign', 
	detail: {
		pretarget, target
	},
}
```
#### "Assign Source" Event
```
{
	type: `assign:source, 
	detail: {
		pretarget, target, source
	},
}
```
#### "Assign Source Property" Event
```
{
	type: 'assign:source:${key}', 
	detail: {
		path, key, val, pretarget, target, source
	},
}
```
#### "Define Properties" Event
```
{
	type: 'defineProperties',
	detail: {
    pretarget, target
	},
}
```
#### "Define Property" Event
```
{
	type: `defineProperty`,
	detail: {
		path, key, val, pretarget, target
	},
}
```
#### "Freeze" Event
```
{
	type: 'freeze',
	detail: {
		path, key, predescriptor, descriptor
	},
}
```
#### "Seal" Event
```
{
	type: 'seal',
	detail: {
		path, key, predescriptor, descriptor
	},
}
```
#### "Set Prototype Of" Event
```
{
	type: 'setPrototypeOf',
	detail: {
		path, key, preprototype, prototype
	},
}
```


### Array Events
#### "Copy Within" Event
```
{
	type: 'copyWithin',
	detail: {
		start, end, items, 
		precopy, copy
	},
}
```
#### "Fill" Event
```
{
	type: 'fill',
	detail: {
		start, end, items, 
		prelength, length
	},
}
```
#### "Length" Event
```
{
	type: 'length',
	detail: {
		prelength, length
	},
}
```
#### "Push" Event
```
{
	type: 'push',
	detail: {
		elements, 
		prelength, length
	},
}
```
#### "Pop" Event
```
{
	type: 'pop',
	detail: {
		removedElement, 
		prelength, length
	},
}
```
#### "Reverse" Event
```
{
	type: 'reverse',
	detail: {
		preverse, reverse
	},
}
```
#### "Shift" Event
```
{
	type: 'shift',
	detail: {
		removedElement, 
		prelength, length
	},
}
```
#### "Sort" Event
```
{
	type: 'sort',
	detail: {
		presort, sort,
	},
}
```
#### "Splice" Event
```
{
	type: 'splice',
	detail: {
		start, stop, deleted, added, 
		prelength, length
	},
}
```
#### "Unshift" Event
```
{
	type: 'unshift',
	detail: {
		elements, 
		prelength, length
	},
}
```


### Map Events
#### "Clear" Event
```
{
	type: 'clear',
	detali: {
		presize, size,
	},
}
```
#### "Delete" Event
```
{
	type: 'delete',
	detail: {
		path, key, preval
	},
}
```
#### "Delete Property" Event
```
{
	type: `delete:${key}`,
	detail: {
		path, key, preval
	},
}
```
#### "Get" Event
```
{
	type: 'get',
	detail: {
		path, key, val
	},
}
```
#### "Get Property" Event
```
{
	type: `get:${key}`,
	detail: {
		path, key, val
	},
}
```
#### "Set" Event
```
{
	type: 'set',
	detail: {
		path, key, val, preval
	},
}
```
#### "Set Property" Event
```
{
	type: `set:${key},
	detail: {
		path, key, val, preval
	},
}
```
