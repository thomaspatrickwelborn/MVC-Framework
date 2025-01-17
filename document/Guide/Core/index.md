# Core Guide
**MVC Framework \| Guide \| *Core***  
See Also: [**Core Class**](../../ClassSystem/Core/index.md)  

MVC Framework `Core` extends `EventTarget` class and is extended by `Model`, `View`, `Control`, `FetchRouter`, and `LocationRouter` primary classes. It ministrates scoped property events and serializable property class instances. It maintains a traversible property class instance tree through `path`, `parent`, and `root` properties. 
 - [Core Class Importation](#core-class-importation)
 - [Core Class Extension](#core-class-extension)
 - [Core Class Instantiation](#core-class-instantiation)
 - [Core Event Ministration](#core-event-ministration)
 - [Core Property Class Ministration](#core-property-class-ministration)

## `Core` Class Importation
```
import { Core } from '/dependencies/mvc-framework.js'
```

## `Core` Class Extension
### Default Extended `Core`
```
class CustomCore extends Core {
  constructor() { super(...arguments) }
}
```

### Override Default Extended `Core` `constructor` Arguments
#### ...With Object Assignment
```
class CustomCore extends Core {
  constructor($settings, $options) { super(
    Object.assign({ events: {
      'customCoreEvent': function customCoreEvent($event) { console.log($event) }
    } }, $settings),
    Object.assign({ enableEvents: true }, $options)
  ) }
}
```
#### ...With Recursive Object Assignment
```
import { Coutil } from '/dependencies/mvc-framework.js' 
const {
  recursiveAssign, // Assigns Properties Recursively
  recursiveAssignConcat, // Assign Properties Recursively, Concatenating Arrays
} = Coutil
```
*...*  
```
class CustomCore extends Core {
  constructor($settings, $options) { super(
    recursiveAssignConcat({ events: [{
      type: 'customCoreEvent',
      path: 'property.path',
      listener: function customCoreEvent($event) { console.log($event) },
    }] }, $settings),
    recursiveAssign({ enableEvents: true }, $options)
  ) }
}
```


### Extended `Core` Properties, Methods
```
class CustomCore extends Core {
  constructor() { super(...arguments) }
  #customProperty
  get customProperty() { return this.#customProperty }
  set customProperty($customProperty) { this.#customProperty = $customProperty }
  customMethod() { console.log("customMethod") }
}
```

## Core Class Instantiation
### Default Instantiated `Core`
```
const core = new Core()
```

### Core Instantiated With `settings`, `options` Parameters
```
const settings = { events: { "customCoreEvent": function($event) {} } }
const options = { eventsEnabled: true }
const core = new Core(settings, options)
```

### Core Instantiated With Defined, Assigned Properties
```
const core = new Core({
  events: { 'body click': function bodyClick($event) {
    this.clicks++; console.log(`this.clicks: ${this.clicks}`)
  } }
}, {
  enableEvents: true,
  assign: { clicks: 0 },
  defineProperties: {
    body: { get() { return document.querySelector('body') } }
  }
})
```

## Core Event Ministration
Add, remove, enable, disable, and filter events mapped to `Core` properties that are EventTarget instances. 
```
const core = new Core({
  events: { 'body click': function bodyClick($event) {
    this.clicks++; console.log(`this.clicks: ${this.clicks}`)
  } }
}, {
  assign: { clicks: 0 },
  defineProperties: {
    body: { get() { return document.querySelector('body') } }
  }
})
```
### `addEvents` Method
#### Add Impanded Events
```
core.addEvents({
  'body click': function bodyClick($event) {
    this.clicks++; console.log(`this.clicks: ${this.clicks}`)
  }
})
```
#### Add Expanded Events
```
core.addEvents([{
  path: 'body',
  type: 'click',
  listener: function bodyClick($event) {
    this.clicks++; console.log(`this.clicks: ${this.clicks}`)
  },
  enable: true,
}])
```
### `getEvents` Method
#### All Events  
```
core.getEvents()
```
#### Events where `path` is `"body"`  
```
core.getEvents({
  path: 'body'
})
```
#### Events where `enabled` is `false`  
```
core.getEvents({
  enabled: false
})
```
#### Events where `type` is `"click"`  
```
core.getEvents({
  type: 'click'
})
```
#### Events where `type` is `"click"`, `enabled` is `true`, and `path` is `"body"`  
```
core.getEvents({
  path: 'body',
  enabled: true,
  type: 'click',
})
```
### `enableEvents`, `disableEvents`, and `removeEvents` Methods
Each method performs action based on zero or one argument: 
 - When ZERO arguments provided, action performed on ALL events.  
 - When ONE argument provided, action performed on FILTERED events.  
#### Enable All Events
```
core.enableEvents()
```
#### Enable Disabled Events
```
core.enableEvents({ enable: false })
```
#### Disable Click Events
```
core.disableEvents({ type: 'click' })
```
#### Disable All Events
```
core.disableEvents()
```
#### Remove Pathed Events
```
core.removeEvents({ path: 'buttons.button' })
```
#### Remove All Events
```
core.removeEvents()
```

## `Core` Property Class Ministration
Add, remove classified properties from `Core` instances using customizable prototype Class, Class Instantiator/Deinstantiator, and plural/singular Names for adding/removing class instances and events. 
### `Core` Property Classes
#### `propertyClasses` Settings
```
const propertyClasses = [{
  Class: SomeClass,
  ClassInstantiator: function($propertyClass, $property, $value) {
    const { target, Class, Names } = $propertyClass
    const targetPropertyClasses = target[Names.Multiple.Nonformal]
    targetPropertyClasses[$property] = new Class($value)
    return targetPropertyClasses[$property]
  },
  ClassDeinstantiator: function($propertyClass, $property) {
    const { target, Names } = $propertyClass
    return delete target[Names.Multiple.Nonformal][$property]
  },
  Names: {
    Monople: {
      Formal: "SomeClass"
      Nonformal: "someClass"
      },
    Multiple: {
      Formal: "SomeClasses",
      Nonformal: "someClasses",
    },
    Minister: {
      Ad: { Formal: "Add", Nonformal: "add" }
      Dead: { Formal: "Remove", Nonformal: "remove" },
    },
  },
  Events: {
    Assign: "addEventListener",
    Deassign: "removeEventListener",
  },
}]
```
#### ...With Property Classes
```
export default class CustomCore extends Core {
  constructor($settings, $options) {
    super(
      recursiveAssignConcat({
        propertyClasses
      }, $settings),
      Object.assign({}, $options)
    )
  }
}

```
#### ...With Static Property Classes
```
export default class CustomCore extends Core {
  static propertyClasses = propertyClasses
  constructor($settings, $options) {
    super(
      recursiveAssignConcat({
        propertyClasses: CustomCore.propertyClasses
      }, $settings),
      Object.assign({}, $options)
    )
  }
}
```
#### Custom Core Instantiation
```
const customCore = new CustomCore({
  someClasses: {
    someClassA: { someSetting: "777" },
    someClassB: { someSetting: "333" },
  }
})
```
#### Add Multiple Property Class Instances
```
customCore.addSomeClasses({
  someClassC: { someSetting: "555" },
  someClassD: { someSetting: "777" },
})
```
#### Add Single Property Class Instances
```
customCore.addSomeClasses("someClassC", { someSetting: "555" },
customCore.addSomeClasses("someClassD", { someSetting: "777" },
```
#### Remove All Property Class Instances
```
customCore.removeSomeClasses()
```
#### Remove Some Property Class Instances By Keys
```
customCore.removeSomeClasses(["someClassC", "someClassD"])
```
#### Remove Some Property Class Instance By Key
```
customCore.removeSomeClasses("someClassA")
```