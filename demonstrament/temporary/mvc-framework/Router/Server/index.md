# MVC Framework Server Router Class
MVC Framework Server Router Class configures Fetch API for transactions between a client and server. 

## Settings
```
{
  scheme: String,
  domain: String,
  port: Number
  routes: Object {
    [$resource]: Object {
      [$resourceMethod]: Object {}
    }
  }
}
```

## Options

## Declarator
```
class ServerRouter extends Core {}
```
MVC ServerRouter Class extends MVC Core Class.  

## Constructor
```
constructor($settings, $options) {
  super(...arguments)
  Object.assign({}, Settings, $settings)
  const { routes } = $settings
  this.#routes = routes
}
```
## Methods
### addRoutes
```
ServerRouter.addRoutes($routes)
```
Add Routes to Server Router Class Instances. 

#### routes
```
{
	[$resource]: Resource {
		[$resourceMethod]: Options {}
	},
}
```
##### Resource
###### Property Key
###### Property Value
- `$resource` is String value formatted as resource URI.
- `Resource {}` is Object value containing "Method" definitions. 

```

```

##### $method
Property key is String value of a custom method name that is same as Fetch Options "method" property, or customized name describing method's specific action. 
```
{
	[]
}
```

##### Options
[Fetch API Options](https://developer.mozilla.org/en-US/docs/Web/API/fetch#options)
```
- body
- cache
- credentials
  - omit
  - same-origin
  - include
- headers
- integrity
- keepalive
- method
- mode
- priority
  - high
  - low
  - auto
- redirect
  - follow
  - error
  - manual
- referrer
- referrerPolicy
- signal
```

### Remove Routes

## Properties
### Routes

## Events
### Fetch
### Fetch Method