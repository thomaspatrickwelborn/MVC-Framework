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

class DynamicEventTargetEvent extends Event {
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
            new DynamicEventTargetEvent(
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

class Trap {
  constructor($methods, $aliases, $options = {}) {
    for(let [
      $methodName, $createPropertyMethod
    ] of Object.entries($methods)) {
      const methodOptions = $options[$methodName] || {};
      $createPropertyMethod(
        this, $methodName, $aliases, methodOptions
      );
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

function Assign(
  $trap, $trapPropertyName, $aliases, $options
) {
  const { merge, events } = $options;
  const {
    basename, 
    eventTarget, 
    path, 
    root, 
    rootAlias, 
  } = $aliases;
  return Object.defineProperty(
    $trap, $trapPropertyName, {
      value: function() {
        const sources = [...arguments];
        // Iterate Sources
        for(let $source of sources) {
          // Iterate Source Props
          for(let [
            $sourcePropKey, $sourcePropVal
          ] of Object.entries($source)) {
            // Assign Root DET Property
            if(
              isDirectInstanceOf(
                $sourcePropVal, [Object, Array/*, Map*/]
              )
            ) {
              // Merge
              if(merge === true) {
                // Assign Existent Root DET Property
                if(
                  root[$sourcePropKey]
                  ?.constructor.name === 'bound DynamicEventTarget'
                ) {
                  root[$sourcePropKey].assign($sourcePropVal);
                } else 
                // Assign Non-Existent Root DET Property
                {
                  const _basename = $sourcePropKey;
                  const _path = (
                    path !== null
                  ) ? path.concat('.', $sourcePropKey)
                    : $sourcePropKey;
                  const detObject = new DynamicEventTarget$1(
                    $sourcePropVal, {
                      basename: _basename,
                      parent: eventTarget,
                      path: _path,
                      rootAlias,
                    }
                  );
                  Object.assign(root, {
                    [$sourcePropKey]: detObject
                  });
                }
              } else
              // No Merge
              if(merge === false) {
                const _basename = $sourcePropKey;
                const _path = (
                  path !== null
                ) ? path.concat('.', $sourcePropKey)
                  : $sourcePropKey;
                const detObject = new DynamicEventTarget$1(
                  $sourcePropVal, {
                    basename: _basename,
                    parent: eventTarget,
                    path: _path,
                    rootAlias,
                  }
                );
                Object.assign(root, {
                  [$sourcePropKey]: detObject
                });
              }
            } else 
            // Assign Root Property
            {
              Object.assign(root, {
                [$sourcePropKey]: $sourcePropVal
              });
            }
            // Assign Source Property Event
            if(events.includes('assignSourceProperty')) {
              eventTarget.dispatchEvent(
                new DynamicEventTargetEvent(
                  'assignSourceProperty',
                  {
                    basename,
                    path,
                    detail: {
                      key: $sourcePropKey,
                      val: $sourcePropVal,
                      source: $source,
                    }
                  },
                  eventTarget
                )
              );
            }
          }
          // Assign Source Event
          if(events.includes('assignSource')) {
            eventTarget.dispatchEvent(
              new DynamicEventTargetEvent(
                'assignSource',
                {
                  basename,
                  path,
                  detail: {
                    source: $source,
                  },
                },
                eventTarget
              )
            );
          }
        }
        // Assign Event
        if(events.includes('assign')) {
          eventTarget.dispatchEvent(
            new DynamicEventTargetEvent(
              'assign',
              { 
                basename,
                path,
                detail: {
                  sources
                },
              },
              eventTarget
            )
          );
        }
        return root
      }
    }
  )
}

function DefineProperties(
  $trap, $trapPropertyName, $aliases, $options
) {
  const { events } = $options;
  const {
    proxy,
    eventTarget, 
    root, 
    rootAlias, 
    basename,
    path, 
  } = $aliases;
  return Object.defineProperty(
    $trap, $trapPropertyName, {
      value: function() {
        const $propertyDescriptors = arguments[0];
        // Iterate Property Descriptors
        for(const [
          $propertyKey, $propertyDescriptor
        ] of Object.entries($propertyDescriptors)) {
          // Property Descriptor Value Is Direct Instance Of Array/Object/Map
          $trap.defineProperty($propertyKey, $propertyDescriptor);
        }
        // Define Properties Event
        if(events.includes('defineProperties')) {
          eventTarget.dispatchEvent(
            new DynamicEventTargetEvent(
              'defineProperties',
              {
                basename,
                path,
                detail: {
                  descriptors: $propertyDescriptors,
                },
              },
              eventTarget
            )
          );
        }
        return root
      }
    }
  )
}

function DefineProperty(
  $trap, $trapPropertyName, $aliases, $options
) {
  const { descriptorValueMerge, descriptorTree, events } = $options;
  const {
    eventTarget, 
    root, 
    rootAlias, 
    basename,
    path, 
  } = $aliases;
  return Object.defineProperty(
    $trap, $trapPropertyName, {
      value: function() {
        const propertyKey = arguments[0];
        const propertyDescriptor = arguments[1];
        // Property Descriptor Value Is Direct Instance Of Array/Object/Map
        if(isDirectInstanceOf(
          propertyDescriptor.value, [Object, Array/*, Map*/]
        )) {
          const rootPropertyDescriptor = Object.getOwnPropertyDescriptor(
            root, propertyKey
          ) || {};
          // Descriptor Value Merge
          if(descriptorValueMerge === true) {
            // Root Property Descriptor Value Is Existent DET Instance
            if(
              rootPropertyDescriptor.value // instanceof DynamicEventTarget
              ?.constructor.name === 'bound DynamicEventTarget'
            ) {
              // Root Define Properties, Descriptor Tree
              if(descriptorTree === true) {
                rootPropertyDescriptor.value.defineProperties(
                  propertyDescriptor.value
                );
              } else
              // Root Define Properties, No Descriptor Tree
              {
                Object.defineProperty(
                  root, propertyKey, propertyDescriptor
                );
              }
            }
            // Root Property Descriptor Value Is Non-Existent DET Instance
            else {
              const _basename = propertyKey;
              const _path = (
                path !== null
              ) ? path.concat('.', propertyKey)
                : propertyKey;
              const _root = (
                typeOf(
                  propertyDescriptor.value
                ) === 'object'
              ) ? {}
                : (
                typeOf(
                  propertyDescriptor.value
                ) === 'array'
              ) ? []
              //   : typeOf(
              //   propertyDescriptor.value
              // ) === 'map'
              //   ? new Map()
                : {};
              const detObject = new DynamicEventTarget$1(
                _root, {
                  basename: _basename,
                  parent: eventTarget,
                  path: _path,
                  rootAlias,
                }
              );
              // Root Define Properties, Descriptor Tree
              if(descriptorTree === true) {
                detObject.defineProperties(
                  propertyDescriptor.value
                );
                root[propertyKey] = detObject;
              } else 
              // Root Define Properties, No Descriptor Tree
              if(descriptorTree === false) {
                Object.defineProperty(
                  root, propertyKey, propertyDescriptor
                );
              }
            }
          } else
          // No Descriptor Value Merge
          if(descriptorValueMerge === false) {
            const _basename = propertyKey;
            const _path = (
              path !== null
            ) ? path.concat('.', propertyKey)
              : propertyKey;
            const _root = (
              typeOf(
                propertyDescriptor.value
              ) === 'object'
            ) ? {}
              : (
              typeOf(
                propertyDescriptor.value
              ) === 'array'
            ) ? []
            //   : typeOf(
            //   propertyDescriptor.value
            // ) === 'map'
            //   ? new Map()
              : {};
            const detObject = new DynamicEventTarget$1(
              _root, {
                basename: _basename,
                parent: eventTarget,
                path: _path,
                rootAlias,
              }
            );
            // Root Define Properties, Descriptor Tree
            if(descriptorTree === true) {
              detObject.defineProperties(
                propertyDescriptor.value
              );
              root[propertyKey] = detObject;
            } else
            // Root Define Properties, No Descriptor Tree
            if(descriptorTree === false) {
              Object.defineProperty(
                root, propertyKey, propertyDescriptor
              );
            }
          }
        } else
        // Property Descriptor Value Not Array/Object/Map
        {
          Object.defineProperty(
            root, propertyKey, propertyDescriptor
          );
        }
        // Define Property Event
        if(events.includes('defineProperty')) {
          eventTarget.dispatchEvent(
            new DynamicEventTargetEvent(
              'defineProperty',
              {
                basename,
                path,
                detail: {
                  prop: propertyKey,
                  descriptor: propertyDescriptor,
                },
              },
              eventTarget
            )
          );
        }
        return root
      }
    }
  )
}

function Entries$1(
  $trap, $trapPropertyName, $aliases
) {
  const { eventTarget, root } = $aliases;
  return Object.defineProperty(
    $trap, $trapPropertyName, {
      value: function() {
        return Object.entries(root)
      }
    }
  )
}

function Freeze(
  $trap, $trapPropertyName, $aliases, $options
) {
  const { recurse, events } = $options;
  const {
    eventTarget, 
    root, 
    rootAlias, 
    basename,
    path,
  } = $aliases;
  return Object.defineProperty(
    $trap, $trapPropertyName, {
      value: function () {
        if(recurse === true) {
          for(const [
            $propertyKey, $propertyValue
          ] of Object.entries(this)) {
            if(
              $propertyValue.constructor.name === 'bound DynamicEventTarget'
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
              eventTarget.dispatchEvent(
                new DynamicEventTargetEvent(
                  'freeze',
                  {
                    path: _path,
                    basename: _basename,
                  },
                  eventTarget
                )
              );
            }
          }
        }
        Object.freeze(this);
        return root
      }
    }
  )
}

function FromEntries(
  $trap, $trapPropertyName, $aliases
) {
  const { eventTarget, root } = $aliases;
  return Object.defineProperty(
    $trap, $trapPropertyName, {
      value: function() {
        return Object[$trapPropertyName](
          Object.entries(root)
        )
      }
    }
  )
}

function GetOwnPropertyDescriptor(
  $trap, $trapPropertyName, $aliases
) {
  const { eventTarget, root } = $aliases;
  return Object.defineProperty(
    $trap, $trapPropertyName, {
      value: function() {
        return Object.getOwnPropertyDescriptor(root, ...arguments)
      }
    }
  )
}

function GetOwnPropertyDescriptors(
  $trap, $trapPropertyName, $aliases
) {
  const { eventTarget, root } = $aliases;
  return Object.defineProperty(
    $trap, $trapPropertyName, {
      value: function() {
        return Object.getOwnPropertyDescriptors(root)
      }
    }
  )
}

function GetOwnPropertyNames(
  $trap, $trapPropertyName, $aliases
) {
  const { eventTarget, root } = $aliases;
  return Object.defineProperty(
    $trap, $trapPropertyName, {
      value: function() {
        return Object.getOwnPropertyNames(root)
      }
    }
  )
}

function GetOwnPropertySymbols(
  $trap, $trapPropertyName, $aliases
) {
  const { eventTarget, root } = $aliases;
  return Object.defineProperty(
    $trap, $trapPropertyName, {
      value: function() {
        return Object.getOwnPropertySymbols(root)
      }
    }
  )
}

function GetPrototypeOf(
  $trap, $trapPropertyName, $aliases
) {
  const { eventTarget, root } = $aliases;
  return Object.defineProperty(
    $trap, $trapPropertyName, {
      value: function() {
        return Object.getPrototypeOf(root)
      }
    }
  )
}

function GroupBy(
  $trap, $trapPropertyName, $aliases
) {
  const { eventTarget, root } = $aliases;
  return Object.defineProperty(
    $trap, $trapPropertyName, {
      value: function() {
        return Object.groupBy(root, ...arguments)
      }
    }
  )
}

function HasOwn(
  $trap, $trapPropertyName, $aliases
) {
  const { eventTarget, root } = $aliases;
  return Object.defineProperty(
    $trap, $trapPropertyName, {
      get() {
        return Object.hasOwn(root, ...arguments)
      },
      set($method) {
        root[$method] = $method;
      },
    }
  )
}

function HasOwnProperty(
  $trap, $trapPropertyName, $aliases
) {
  const { eventTarget, root } = $aliases;
  return Object.defineProperty(
    $trap, $trapPropertyName, {
      value: function() {
        return Object.prototype.hasOwnProperty.call(
          root, ...arguments
        )
      }
    }
  )
}

function Is(
  $trap, $trapPropertyName, $aliases
) {
  const { eventTarget, root } = $aliases;
  return Object.defineProperty(
    $trap, $trapPropertyName, {
      value: function() {
        return Object.is(root, ...arguments)
      }
    }
  )
}

function IsExtensible(
  $trap, $trapPropertyName, $aliases
) {
  const { eventTarget, root } = $aliases;
  return Object.defineProperty(
    $trap, $trapPropertyName, {
      value: function() {
        return Object.isExtensible(root)
      }
    }
  )
}

function IsFrozen(
  $trap, $trapPropertyName, $aliases
) {
  const { eventTarget, root } = $aliases;
  return Object.defineProperty(
    $trap, $trapPropertyName, {
      value: function() {
        return Object.isFrozen(root)
      }
    }
  )
}

function IsSealed(
  $trap, $trapPropertyName, $aliases
) {
  const { eventTarget, root } = $aliases;
  return Object.defineProperty(
    $trap, $trapPropertyName, {
      value: function() {
        return Object.isSealed(root)
      }
    }
  )
}

function IsPrototypeOf(
  $trap, $trapPropertyName, $aliases
) {
  const { eventTarget, root } = $aliases;
  return Object.defineProperty(
    $trap, $trapPropertyName, {
      value: function() {
        return Object.prototype.isPrototypeOf.call(
          root, ...arguments
        )
      }
    }
  )
}

function Keys$1(
  $trap, $trapPropertyName, $aliases
) {
  const { eventTarget, root } = $aliases;
  return Object.defineProperty(
    $trap, $trapPropertyName, {
      value: function() {
        return Object.keys(root)
      }
    }
  )
}

function PreventExtensions(
  $trap, $trapPropertyName, $aliases
) {
  const { eventTarget, root } = $aliases;
  return Object.defineProperty(
    $trap, $trapPropertyName, {
      value: function() {
        return Object.preventExtensions(root)
      }
    }
  )
}

function PropertyIsEnumerable(
  $trap, $trapPropertyName, $aliases
) {
  const { eventTarget, root } = $aliases;
  return Object.defineProperty(
    $trap, $trapPropertyName, {
      value: function() {
        return Object.prototype.propertyIsEnumerable.call(
          root, ...arguments
        )
      }
    }
  )
}

function Seal(
  $trap, $trapPropertyName, $aliases, $options
) {
  const { recurse, events } = $options;
  const {
    eventTarget, 
    root, 
    rootAlias, 
    basename,
    path,
  } = $aliases;
  return Object.defineProperty(
    $trap, $trapPropertyName, {
      value: function () {
        if(recurse === true) {
          for(const [
            $propertyKey, $propertyValue
          ] of Object.entries(this)) {
            if(
              $propertyValue.constructor.name === 'bound DynamicEventTarget'
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
              eventTarget.dispatchEvent(
                new DynamicEventTargetEvent(
                  'seal',
                  {
                    path,
                    basename,
                  },
                  eventTarget
                )
              );
            }
          }
        }
        Object.seal(this);
        return root
      }
    }
  )
}

function SetPrototypeOf(
  $trap, $trapPropertyName, $aliases
) {
  const {
    eventTarget, 
    root, 
    rootAlias, 
    basename,
    path, 
  } = $aliases;
  return Object.defineProperty(
    $trap, $trapPropertyName, {
      value: function () {
        const prototype = arguments[0];
        Object.setPrototypeOf(root, prototype);
        eventTarget.dispatchEvent(
          new DynamicEventTargetEvent(
            'setPrototypeOf',
            {
              basename,
              path,
              detail: {
                prototype
              },
            },
            eventTarget
          )
        );
        return root
      }
    }
  )
}

function ToString$1(
  $trap, $trapPropertyName, $aliases
) {
  const { eventTarget, root } = $aliases;
  return Object.defineProperty(
    $trap, $trapPropertyName, {
      get() {
        return root['toString'](...arguments)
      },
      set($method) {
        root[$method] = $method;
      },
    }
  )
}

function ToLocaleString(
  $trap, $trapPropertyName, $aliases
) {
  const { eventTarget, root } = $aliases;
  return Object.defineProperty(
    $trap, $trapPropertyName, {
      get() {
        return root['toLocaleString'](...arguments)
      },
      set($method) {
        root[$method] = $method;
      },
    }
  )
}

function Values$1(
  $trap, $trapPropertyName, $aliases
) {
  const { eventTarget, root } = $aliases;
  return Object.defineProperty(
    $trap, $trapPropertyName, {
      value: function() {
        return Object.values(root)
      }
    }
  )
}

function ValueOf(
  $trap, $trapPropertyName, $aliases
) {
  const { eventTarget, root } = $aliases;
  return Object.defineProperty(
    $trap, $trapPropertyName, {
      get() {
        return root['valueOf'](...arguments)
      },
      set($method) {
        root[$method] = $method;
      },
    }
  )
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

function At(
  $trap, $trapPropertyName, $aliases
) {
  const { root } = $aliases;
  return Object.defineProperty(
    $trap, $trapPropertyName, {
      value: function() {
        return Array.prototype.pop.call(root, ...arguments)
      }
    }
  )
}

function CopyWithin(
  $trap, $trapPropertyName, $aliases, $options
) {
  const { events } = $options;
  const {
    eventTarget, 
    root, 
    rootAlias, 
    basename,
    path, 
  } = $aliases;
  return Object.defineProperty(
    $trap, $trapPropertyName, {
      value: function() {
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
            eventTarget.dispatchEvent(
              new DynamicEventTargetEvent(
                'copyWithinIndex',
                {
                  basename: eventTarget.basename,
                  path: eventTarget.path,
                  detail: {
                    target: targetIndex,
                    start: copyIndex,
                    end: copyIndex + 1,
                    item: copyItem,
                  },
                },
                eventTarget
              )
            );
          }
          copyIndex++;
          targetIndex++;
        }
        // Array Copy Within Event
        if(events.includes('copyWithin')) {
          eventTarget.dispatchEvent(
            new DynamicEventTargetEvent(
              'copyWithin',
              {
                basename: eventTarget.basename,
                path: eventTarget.path,
                detail: {
                  target: target,
                  start: start,
                  end: end,
                  items: copiedItems,
                },
              },
              eventTarget
            )
          );
        }
      }
    }
  )
}

function Concat(
  $trap, $trapPropertyName, $aliases
) {
  const { root } = $aliases;
  return Object.defineProperty(
    $trap, $trapPropertyName, {
      value: function() {
        return Array.prototype.concat.call(root, ...arguments)
      }
    }
  )
}

function Entries(
  $trap, $trapPropertyName, $aliases
) {
  const { root } = $aliases;
  return Object.defineProperty(
    $trap, $trapPropertyName, {
      value: function() {
        return Array.prototype.entries.call(root)
      }
    }
  )
}

function Every(
  $trap, $trapPropertyName, $aliases
) {
  const { root } = $aliases;
  return Object.defineProperty(
    $trap, $trapPropertyName, {
      value: function() {
        return Array.prototype.every.call(root, ...arguments)
      }
    }
  )
}

function Fill(
  $trap, $trapPropertyName, $aliases, $options
) {
  const { events } = $options;
  const {
    $eventTarget, 
    root, 
    rootAlias, 
    basename,
    path, 
  } = $aliases;
  return Object.defineProperty(
    $trap, $trapPropertyName, {
      value: function() {
        const $arguments = [...arguments];
        let value = $arguments[0];
        if(isDirectInstanceOf(
          value, [Object, Array/*, Map*/]
        )) {
          value = new DynamicEventTarget$1(value, {
            rootAlias: rootAlias,
          });
        }
        let start;
        if(
          typeof $arguments[1] === 'number'
        ) {
          start = (
            $arguments[1] >= 0
          ) ? $arguments[1]
            : root.length + $arguments[1];
        } else {
          start = 0;
        }
        let end;
        if(
          typeof $arguments[2] === 'number'
        ) {
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
            $eventTarget.dispatchEvent(
              new DynamicEventTargetEvent(
                'fillIndex',
                {
                  basename: _basename,
                  path: _path,
                  detail: {
                    start: fillIndex,
                    end: fillIndex + 1,
                    value,
                  },
                },
                $eventTarget
              )
            );
          }
          fillIndex++;
        }
        // Array Fill Event
        if(events.includes('fill')) {
          $eventTarget.dispatchEvent(
            new DynamicEventTargetEvent(
              'fill',
              {
                basename,
                path,
                detail: {
                  start,
                  end,
                  value,
                },
              },
              $eventTarget
            )
          );
        }
        return root
      }
    }
  )
}

function Filter(
  $trap, $trapPropertyName, $aliases
) {
  const { root } = $aliases;
  return Object.defineProperty(
    $trap, $trapPropertyName, {
      value: function() {
        return Array.prototype.filter.call(root, ...arguments)
      }
    }
  )
}

function Find(
  $trap, $trapPropertyName, $aliases
) {
  const { root } = $aliases;
  return Object.defineProperty(
    $trap, $trapPropertyName, {
      value: function() {
        return Array.prototype.find.call(root, ...arguments)
      }
    }
  )
}

function FindIndex(
  $trap, $trapPropertyName, $aliases
) {
  const { root } = $aliases;
  return Object.defineProperty(
    $trap, $trapPropertyName, {
      value: function() {
        return Array.prototype.findIndex.call(root, ...arguments)
      }
    }
  )
}

function FindLast(
  $trap, $trapPropertyName, $aliases
) {
  const { root } = $aliases;
  return Object.defineProperty(
    $trap, $trapPropertyName, {
      value: function() {
        return Array.prototype.findLast.call(root, ...arguments)
      }
    }
  )
}

function FindLastIndex(
  $trap, $trapPropertyName, $aliases
) {
  const { root } = $aliases;
  return Object.defineProperty(
    $trap, $trapPropertyName, {
      value: function() {
        return Array.prototype.findLastIndex.call(root, ...arguments)
      }
    }
  )
}

function Flat(
  $trap, $trapPropertyName, $aliases
) {
  const { root } = $aliases;
  return Object.defineProperty(
    $trap, $trapPropertyName, {
      value: function() {
        return Array.prototype.flat.call(root, ...arguments)
      }
    }
  )
}

function FlatMap(
  $trap, $trapPropertyName, $aliases
) {
  const { root } = $aliases;
  return Object.defineProperty(
    $trap, $trapPropertyName, {
      value: function() {
        return Array.prototype.flatMap.call(root, ...arguments)
      }
    }
  )
}

function ForEach(
  $trap, $trapPropertyName, $aliases
) {
  const { root } = $aliases;
  return Object.defineProperty(
    $trap, $trapPropertyName, {
      value: function() {
        return Array.prototype.forEach.call(root, ...arguments)
      }
    }
  )
}

function From(
  $trap, $trapPropertyName, $aliases
) {
  const { root } = $aliases;
  return Object.defineProperty(
    $trap, $trapPropertyName, {
      value: function() {
        return Array.from.call(root, root, ...arguments)
      },
    }
  )
}

function IndexOf(
  $trap, $trapPropertyName, $aliases
) {
  const { root } = $aliases;
  return Object.defineProperty(
    $trap, $trapPropertyName, {
      value: function() {
        return Array.prototype.indexOf.call(root, ...arguments)
      }
    }
  )
}

function IsArray(
  $trap, $trapPropertyName, $aliases
) {
  const { root } = $aliases;
  return Object.defineProperty(
    $trap, $trapPropertyName, {
      value: function() {
        return Array.isArray.call(root)
      },
    }
  )
}

function Join(
  $trap, $trapPropertyName, $aliases
) {
  const { root } = $aliases;
  return Object.defineProperty(
    $trap, $trapPropertyName, {
      value: function() {
        return Array.prototype.join.call(root)
      },
    }
  )
}

function Keys(
  $trap, $trapPropertyName, $aliases
) {
  const { root } = $aliases;
  return Object.defineProperty(
    $trap, $trapPropertyName, {
      value: function() {
        return Array.prototype.keys.call(root)
      },
    }
  )
}

function LastIndexOf(
  $trap, $trapPropertyName, $aliases
) {
  const { root } = $aliases;
  return Object.defineProperty(
    $trap, $trapPropertyName, {
      value: function() {
        return Array.prototype.lastIndexOf.call(root)
      },
    }
  )
}

function _Map(
  $trap, $trapPropertyName, $aliases
) {
  const { root } = $aliases;
  return Object.defineProperty(
    $trap, $trapPropertyName, {
      value: function() {
        return Array.prototype.map.call(root, ...arguments)
      }
    }
  )
}

function Of(
  $trap, $trapPropertyName, $aliases
) {
  const { root } = $aliases;
  return Object.defineProperty(
    $trap, $trapPropertyName, {
      value: function() {
        return Array.of.call(
          root, ...Object.values(root)
        )
      },
    }
  )
}

function Pop(
  $trap, $trapPropertyName, $aliases, $options
) {
  const { events } = $options;
  const {
    eventTarget, 
    root, 
    rootAlias, 
    basename,
    path, 
  } = $aliases;
  return Object.defineProperty(
    $trap, $trapPropertyName, {
      value: function() {
        const popElement = Array.prototype.pop.call(root);
        const popElementIndex = root.length - 1;
        const basename = popElementIndex;
        const path = (
          path !== null
        ) ? path.concat('.', popElementIndex)
          : popElementIndex;
        // Array Pop Event
        if(events.includes('pop')) {
          eventTarget.dispatchEvent(
            new DynamicEventTargetEvent(
              'pop',
              {
                basename,
                path,
                detail: {
                  element: popElement,
                  elementIndex: popElementIndex,
                },
              },
              eventTarget
            )
          );
        }
        return popElement
      }
    }
  )
}

function Push(
  $trap, $trapPropertyName, $aliases, $options
) {
  const { events } = $options;
  const {
    eventTarget, 
    root, 
    rootAlias, 
    basename,
    path, 
  } = $aliases;
  return Object.defineProperty(
    $trap, $trapPropertyName, {
      value: function() {
        const elements = [];
        let elementIndex = 0;
        for(let $element of arguments) {
          const _basename = elementIndex;
          const _path = (
            path !== null
          ) ? path.concat('.', elementIndex)
            : elementIndex;
          // Push Prop Event
          if(isDirectInstanceOf(
            $element, [Object, Array/*, Map*/]
          )) {
            $element = new DynamicEventTarget$1($element, {
              basename: _basename,
              path: _path,
              rootAlias: rootAlias,
            });
          }
          elements.push($element);
          Array.prototype.push.call(root, $element);
          if(events.includes('pushProp')) {
            eventTarget.dispatchEvent(
              new DynamicEventTargetEvent(
                'pushProp',
                {
                  basename: _basename,
                  path: _path,
                  detail: {
                    elementIndex, 
                    element: $element,
                  },
                },
                eventTarget
              )
            );
          }
          elementIndex++;
        }
        // Push Event
        if(events.includes('push')) {
          eventTarget.dispatchEvent(
            new DynamicEventTargetEvent(
              'push',
              {
                basename,
                path,
                detail: {
                  elements,
                },
              },
              eventTarget
            )
          );
        }
        return root.length
      }
    }  
  )
}

function Reduce(
  $trap, $trapPropertyName, $aliases
) {
  const { root } = $aliases;
  return Object.defineProperty(
    $trap, $trapPropertyName, {
      value: function() {
        return Array.prototype.reduce.call(root, ...arguments)
      }
    }
  )
}

function ReduceRight(
  $trap, $trapPropertyName, $aliases
) {
  const { root } = $aliases;
  return Object.defineProperty(
    $trap, $trapPropertyName, {
      value: function() {
        return Array.prototype.reduceRight.call(root, ...arguments)
      }
    }
  )
}

function Reverse(
  $trap, $trapPropertyName, $aliases, $options
) {
  const { events } = $options;
  const {
    eventTarget, 
    root, 
    rootAlias, 
    basename,
    path, 
  } = $aliases;
  return Object.defineProperty(
    $trap, $trapPropertyName, {
      value: function() {
        Array.prototype.reverse.call(root, ...arguments);
        if(events.includes('reverse')) {
          eventTarget.dispatchEvent(
            new DynamicEventTargetEvent(
              'reverse',
              {
                basename,
                path,
                detail: {
                  reference: root
                },
              },
              eventTarget
            )
          );
        }
        return root
      }
    }
  )
}

function Shift(
  $trap, $trapPropertyName, $aliases, $options
) {
  const { events } = $options;
  const {
    eventTarget, 
    root, 
    rootAlias, 
    basename,
    path, 
  } = $aliases;
  return Object.defineProperty(
    $trap, $trapPropertyName, {
      value: function() {
        const shiftElement = Array.prototype.shift.call(root);
        const shiftElementIndex = 0;
        const basename = shiftElementIndex;
        const path = (
          path !== null
        ) ? path.concat('.', shiftElementIndex)
          : shiftElementIndex;
        // Array Shift Event
        if(events.includes('shift')) {
          eventTarget.dispatchEvent(
            new DynamicEventTargetEvent(
              'shift',
              {
                basename,
                path,
                detail: {
                  element: shiftElement,
                  elementIndex: shiftElementIndex,
                },
              },
              eventTarget
            )
          );
        }
        return shiftElement
      }
    }
  )
}

function Some(
  $trap, $trapPropertyName, $aliases
) {
  const { root } = $aliases;
  return Object.defineProperty(
    $trap, $trapPropertyName, {
      value: function() {
        return Array.prototype.some.call(root, ...arguments)
      }
    }
  )
}

function Sort(
  $trap, $trapPropertyName, $aliases
) {
  const { root } = $aliases;
  return Object.defineProperty(
    $trap, $trapPropertyName, {
      value: function() {
        return Array.prototype.sort.call(root, ...arguments)
      }
    }
  )
}

function Splice(
  $trap, $trapPropertyName, $aliases, $options
) {
  const { events } = $options;
  const {
    eventTarget, 
    root, 
    rootAlias, 
    basename,
    path, 
  } = $aliases;
  return Object.defineProperty(
    $trap, $trapPropertyName, {
      value: function() {
        const $arguments = [...arguments];
        const start = (
          $arguments[0] >= 0
        ) ? $arguments[0]
          : root.length + $arguments[0];
        const deleteCount = (
          $arguments[1] <= 0
        ) ? 0
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
          const _path = (
            path !== null
          ) ? path.concat('.', deleteItemsIndex)
            : deleteItemsIndex;
          if(events.includes('spliceDelete')) {
            eventTarget.dispatchEvent(
              new DynamicEventTargetEvent(
                'spliceDelete',
                {
                  _basename,
                  _path,
                  detail: {
                    index: start + deleteItemsIndex,
                    deleteIndex: deleteItemsIndex,
                    deleteItem: deleteItem,
                  },
                },
                eventTarget
              )
            );
          }
          deleteItemsIndex++;
        }
        let addItemsIndex = 0;
        while(addItemsIndex < addCount) {
          const addItem = addItems[addItemsIndex];
          Array.prototype.splice.call(
            root, start + addItemsIndex, 0, addItem
          );
          const basename = addItemsIndex;
          const path = (
            path !== null
          ) ? path.concat('.', addItemsIndex)
            : addItemsIndex;
          // Array Splice Add Event
          if(events.includes('spliceAdd')) {
            eventTarget.dispatchEvent(
              new DynamicEventTargetEvent(
                'spliceAdd',
                {
                  basename,
                  path,
                  detail: {
                    index: start + addItemsIndex,
                    addIndex: addItemsIndex,
                    addItem: addItem,
                  },
                },
                eventTarget
              )
            );
          }
          addItemsIndex++;
        }
        // Array Splice Event
        if(events.includes('splice')) {
          eventTarget.dispatchEvent(
            new DynamicEventTargetEvent(
              'splice',
              {
                basename,
                path: path,
                detail: {
                  start,
                  deleted: deleteItems,
                  added: addItems,
                  length: root.length,
                },
              },
              eventTarget
            )
          );
        }
        return deleteItems
      }
    }
  )
}

function ToLocalString(
  $trap, $trapPropertyName, $aliases
) {
  const { root } = $aliases;
  return Object.defineProperty(
    $trap, $trapPropertyName, {
      value: function() {
        return Array.prototype.toLocalString.call(root, ...arguments)
      }
    }
  )
}

function ToReversed(
  $trap, $trapPropertyName, $aliases
) {
  const { root } = $aliases;
  return Object.defineProperty(
    $trap, $trapPropertyName, {
      value: function() {
        return Array.prototype.toReversed.call(root, ...arguments)
      }
    }
  )
}

function ToSpliced(
  $trap, $trapPropertyName, $aliases
) {
  const { root } = $aliases;
  return Object.defineProperty(
    $trap, $trapPropertyName, {
      value: function() {
        return Array.prototype.toSpliced.call(root, ...arguments)
      }
    }
  )
}

function ToSorted(
  $trap, $trapPropertyName, $aliases
) {
  const { root } = $aliases;
  return Object.defineProperty(
    $trap, $trapPropertyName, {
      value: function() {
        return Array.prototype.toSorted.call(root, ...arguments)
      }
    }
  )
}

function ToString(
  $trap, $trapPropertyName, $aliases
) {
  const { root } = $aliases;
  return Object.defineProperty(
    $trap, $trapPropertyName, {
      value: function() {
        return Array.prototype.toString.call(root, ...arguments)
      }
    }
  )
}

function Unshift(
  $trap, $trapPropertyName, $aliases, $options
) {
  const { events } = $options;
  const {
    eventTarget, 
    root, 
    rootAlias, 
    basename,
    path, 
  } = $aliases;
  return Object.defineProperty(
    $trap, $trapPropertyName, {
      value: function() {
        const $arguments = [...arguments];
        const elements = [];
        const elementsLength = $arguments.length;
        let elementIndex = elementsLength - 1;
        while(elementIndex > -1) {
        $arguments.length;
          const element = $arguments[elementIndex];
          const _basename = elementIndex;
          const _path = (
            $path !== null
          ) ? $path.concat('.', elementIndex)
            : elementIndex;
          if(isDirectInstanceOf(
            element, [Object, Array/*, Map*/]
          )) {
            element = new DynamicEventTarget(element, {
              basename: _basename,
              path: _path,
              rootAlias: rootAlias,
            });
          }
          elements.unshift(element);
          Array.prototype.unshift.call(root, element);
          // Array Unshift Prop Event
          if(events.includes('unshiftProp')) {
            eventTarget.dispatchEvent(
              new DynamicEventTargetEvent(
                'unshiftProp',
                {
                  basename: _basename,
                  path: _path,
                  detail: {
                    elementIndex, 
                    element: element,
                  },
                },
                eventTarget
              )
            );
          }
          elementIndex--;
        }
        // Array Unshift Event
        const _basename = elementIndex;
        const _path = (
          $path !== null
        ) ? $path.concat('.', elementIndex)
          : elementIndex;
        if(events.includes('unshift')) {
          eventTarget.dispatchEvent(
            new DynamicEventTargetEvent(
              'unshift',
              {
                basename: _basename,
                path: _path,
                detail: {
                  elements,
                },
              },
              eventTarget
            )
          );
        }
        return root.length
      }
    }  
  )
}

function Values(
  $trap, $trapPropertyName, $aliases
) {
  const { root } = $aliases;
  return Object.defineProperty(
    $trap, $trapPropertyName, {
      value: function() {
        return Array.prototype.values.call(root)
      }
    }
  )
}

function With(
  $trap, $trapPropertyName, $aliases
) {
  const { root } = $aliases;
  return Object.defineProperty(
    $trap, $trapPropertyName, {
      value: function() {
        return Array.prototype.with.call(root, ...arguments)
      }
    }
  )
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

var PropertyClasses = {
  Object: ObjectProperty,
  Array: ArrayProperty,
};

class Traps {
  Object
  Array
  // Map
  constructor($settings, $options) {
    // Iterate Property Classes
    for(let [
      PropertyClassName, PropertyClassMethods
    ] of Object.entries(PropertyClasses)) {
      const trapOptions = $options[PropertyClassName.toLowerCase()];
      const trap = new Trap(PropertyClassMethods, $settings, trapOptions);
      Object.defineProperty(
        this, PropertyClassName, {
          value: trap
        }
      );
    }
  }
}

class Handler {
  #settings
  #options
  traps
  constructor($settings, $options) {
    this.#settings = $settings;
    this.#options = $options;
    this.traps = new Traps(this.#settings, $options.traps);
    return this
  }
  // Get Property
  get get() {
    const $this = this;
    const {
      basename,
      eventTarget, 
      path, 
      root, 
      rootAlias, 
    } = this.#settings;
    return function get($target, $property, $receiver) {
      // Root Property
      if(this.#isRootProperty($property)) {
        return this.proxy
      } else
      // Event Target/Dynamic Event Target Property
      if(this.#isEventTargetOrDynamicEventTargetProperty($property)) {
        if(typeof eventTarget[$property] === 'function') {
          return eventTarget[$property].bind(eventTarget)
        }
        return eventTarget[$property]
      } else  
      // Object Property Traps
      if(this.#isObjectProperty($property)) {
        return $this.traps['Object'][$property] || root[$property]
      } else
      // Array Property Traps
      if(this.#isArrayProperty($property)) {
        return $this.traps['Array'][$property] || root[$property]
      }
      // Root Property
      else {
        return root[$property]
      }
    }
  }
  get set() {
    const $this = this;
    const {
      eventTarget, 
      root, 
      rootAlias, 
    } = this.#settings;
    let {
      basename,
      path,
    } = this.#settings;
    this.#options.traps.properties.set;
    return function set($target, $property, $value, $receiver) {
      // Object Property
      if(this.#isObjectProperty($property)) {
        $this.traps['Object'][$property] = $value;
      } else
      // Array, Array Prototype Property
      if(this.#isArrayProperty($property)) {
        $this.traps['Array'][$property] = $value;
      } else
      // Dynamic Event Target Property
      if(typeof $value === 'object') {
        $value = new DynamicEventTarget$1(
          $value, {
            basename,
            parent: eventTarget,
            path,
            rootAlias,
          }
        );
      }
      // Property Assignment
      root[$property] = $value;
      basename = $property;
      path = (
        path !== null
      ) ? path.concat('.', $property)
        : $property;
      eventTarget.dispatchEvent(
        new DynamicEventTargetEvent(
          'set',
          {
            basename,
            path,
            detail: {
              property: $property,
              value: $value,
            },
          },
          eventTarget
        )
      );
      return true
    }
  }
  get deleteProperty() {
    const {
      eventTarget, 
      root, 
      rootAlias, 
    } = this.#settings;
    let {
      basename,
      path,
    } = this.#settings;
    this.#options.traps.properties.set;
    return function deleteProperty($target, $property) {
      delete root[$property];
      eventTarget.dispatchEvent(
        new DynamicEventTargetEvent(
          'delete',
          {
            basename,
            path,
            detail: {
              property: $property
            },
          },
          eventTarget
        )
      );
      return true
    }
  }
  #isRootProperty($property) {
    return ($property === this.#settings.rootAlias)
  }
  #isDynamicEventTargetProperty($property) {
    return (
      (
        Object.getOwnPropertyNames(EventTarget.prototype)
        .includes($property) ||
        Object.getOwnPropertyNames(DynamicEventTarget$1.prototype)
        .includes($property)
      )
    )
  }
  #isEventTarget($property) {
    return (
      (
        Object.getOwnPropertyNames(EventTarget.prototype)
        .includes($property) ||
        Object.getOwnPropertyNames(DynamicEventTarget$1.prototype)
        .includes($property)
      )
    )
  }
  #isEventTargetOrDynamicEventTargetProperty($property) {
    return (
      (
        this.#isEventTarget($property) ||
        this.#isDynamicEventTargetProperty($property)
      )
    )
  }
  #isObjectProperty($property) {
    return (
      (
        Object.getOwnPropertyNames(Object)
        .includes($property)
      )
    )
  }
  #isArrayProperty($property) {
    return (
      (
        Object.getOwnPropertyNames(Array.prototype)
        .includes($property) ||
        Object.getOwnPropertyNames(Array)
        .includes($property)
      )
    )
  }
  #isFunctionProperty($property) {
    return (
      Object.getOwnPropertyNames(Function.prototype)
      .includes($property)
    )
  }
}

var Options$4 = {
  rootAlias: 'content',
  traps: {
    properties: {
      set: {
        merge: true,
        events: ['setProperty', 'set'],
      },
    },
    object: {
      assign: {
        merge: true,
        events: ['assignSourceProperty', 'assignSource', 'assign'],
      },
      defineProperties: {
        events: ['defineProperties'],
      },
      defineProperty: {
        descriptorValueMerge: true,
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
        events: ['copyWithinIndex', 'copyWithin']
      },
      unshift: {
        events: ['unshiftProp', 'unshift']
      },
      splice: {
        events: ['spliceDelete', 'spliceAdd', 'splice']
      },
      shift: {
        events: ['shift']
      },
      reverse: {
        events: ['reverse']
      },
      push: {
        events: ['pushProp', 'push']
      },
      pop: {
        events: ['pop']
      },
      fill: {
        events: ['fillIndex', 'fill']
      },
    }
  }
};

let DynamicEventTarget$1 = class DynamicEventTarget extends EventTarget {
  #settings
  #options
  #_type // 'object' // 'array' // 'map'
  #_rootAlias
  #_root
  #_parent
  #_basename
  #_path
  #_proxy
  #_handler
  #_aliases
  constructor($settings = {}, $options = {}) {
    super();
    this.#settings = $settings;
    this.#options = Object.assign(
      {}, Options$4, $options
    );
    return this.proxy
  }
  // Type
  get type() {
    if(this.#_type !== undefined) return this.#_type
    this.#_type = typeOf$1(this.#settings);
    return this.#_type
  }
  get parent() {
    if(this.#_parent !== undefined)  return this.#_parent
    this.#_parent = (
      this.#options.parent !== undefined
    ) ? this.#options.parent
      : null;
    return this.#_parent
  }
  get basename() {
    if(this.#_basename !== undefined)  return this.#_basename
    this.#_basename = (
      this.#options.basename !== undefined
    ) ? this.#options.basename
      : null;
    return this.#_basename
  }
  get path() {
    if(this.#_path !== undefined)  return this.#_path
    this.#_path = (
      this.#options.path !== undefined
    ) ? this.#options.path
      : null;
    return this.#_path
  }
  // Root Alias
  get #rootAlias() {
    if(this.#_rootAlias !== undefined) return this.#_rootAlias
    this.#_rootAlias = (
      typeof this.#options.rootAlias === 'string' &&
      this.#options.rootAlias.length > 0
    ) ? this.#options.rootAlias
      : Options$4.rootAlias;
    return this.#_rootAlias
  }
  // Root
  get #root() {
    if(this.#_root !== undefined) return this.#_root
    this.#_root = (
      typeOf$1(this.#settings) === 'object'
    ) ? {}
      : (
      typeOf$1(this.#settings) === 'array'
    ) ? []
      : {};
    return this.#_root
  }
  // Proxy
  get proxy() {
    if(this.#_proxy !== undefined) return this.#_proxy
    this.#_proxy = new Proxy(this.#root, this.#handler);
    this.#handler.proxy = this.proxy;
    if(this.type === 'object') {
      this.#_proxy.assign(this.#settings);
    } else
    if(this.type === 'array') {
      this.#_proxy.assign(this.#settings);
    }
    return this.#_proxy
  }
  // Handler
  get #handler() {
    if(this.#_handler !== undefined) return this.#_handler
    this.#_handler = new Handler(this.#aliases, {
      traps: this.#options.traps
    });
    return this.#_handler
  }
  // Aliases
  get #aliases() {
    if(this.#_aliases !== undefined) return this.#_aliases
    this.#_aliases = Object.defineProperties({}, {
      eventTarget: { value: this },
      basename: { value: this.basename },
      path: { value: this.path },
      parent: { value: this.parent },
      rootAlias: { value: this.#rootAlias },
      root: { value: this.#root },
      type: { value: this.type },
    });
    return this.#_aliases
  }
  parse($settings = {
    type: 'object', // 'json',
  }) {
    let parsement = (
      this.type === 'object'
    ) ? {}
      : (
      this.type === 'array'
    ) ? []
      : {};
    if(this.type !== 'map') {
      for(const [$key, $val] of Object.entries(this.#root)) {
        if(
          $val !== null &&
          typeof $val === 'object'
        ) {
          parsement[$key] = $val.parse();
        } else (
          parsement[$key] = $val
        );
      }
    }
    if(
      $settings.type === 'object' || 
      $settings.type === 'Object'
    ) {
      return parsement
    } else if(
      $settings.type === 'json' || 
      $settings.type === 'JSON' 
    ) {
      return JSON.stringify(parsement, null, 2)
    }
    return undefined
  }
};

class DynamicEventSystemEvent {
  constructor($settings) { 
    this.settings = $settings;
  }
  #_settings = {}
  get settings() { return this.#_settings }
  set settings($settings) {
    const _settings = this.#_settings;
    const {
      context, type, target, callback, enable
    } = $settings;
    _settings.context = context;
    this.context = context;
    _settings.type = type;
    this.type = type;
    _settings.target = target;
    this.target = target;
    _settings.callback = callback;
    this.callback = callback;
    _settings.enable = enable;
    this.enable = enable;

  }
  #_context
  get context() { return this.#_context }
  set context($context) { this.#_context = $context; }
  #_type
  get type() { return this.#_type }
  set type($type) { this.#_type = $type; }
  #_path = ''
  get path() { return this.#_path }
  set path($path) { this.#_path = $path; }
  get target() {
    let target = this.context;
    for(const $targetPathKey of this.path.split('.')) {
      if($targetPathKey === ':scope') break
      if(target[$targetPathKey] === undefined) return undefined
      target = target[$targetPathKey];
    }
    return target
  }
  set target($target) { this.path = $target; }
  #_callback
  get callback() {
    return this.#_callback
  }
  set callback($callback) {
    this.#_callback = $callback.bind(this.context);
  }
  #_enable = false
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
        this.#_enable = $enable;
      }
    } else if(this.target instanceof EventTarget) {
      this.target[eventAbility](this.type, this.callback);
      this.#_enable = $enable;
    } else {
      try {
        this.target[eventAbility](this.type, this.callback);
        this.#_enable = $enable;
      } catch($err) { /* console.log(this.type, this.path, eventAbility) */ }
    }
  }
}

class DynamicEventSystem extends EventTarget {
  constructor($events, $enable) {
    super();
    this.events = $events;
  }
  #_events = []
  get events() { return this.#_events }
  set events($events) { this.addEvents($events); }
  getEvents($event = {}) {
    const _events = this.#_events;
    const events = [];
    for(const _event of _events) {
      if(((
        $event.type !== undefined &&
        $event.path === undefined &&
        $event.callback === undefined
      ) && ($event.type === _event.type)) || 
      ((
        $event.type !== undefined &&
        $event.path !== undefined &&
        $event.callback === undefined
      ) && (
        $event.type === _event.type &&
        $event.path === _event.target
      )) || ((
        $event.type !== undefined &&
        $event.path !== undefined &&
        $event.callback !== undefined
      ) && (
        $event.type === _event.type &&
        $event.path === _event.target &&
        $event.callback === _event.callback
      ))) {
        events.push(_event);
      }
    }
    return events
  }
  addEvents($events = {}, $enable = false) {
  	const _events = this.events;
  	for(const $event of parseShortenedEvents($events)) {
  		Object.assign($event, {
  			context: this,
  			enable: $event.enable || $enable,
  		});
  		_events.push(new DynamicEventSystemEvent($event));
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
    $events = (
      typeof $events === 'object'
    ) ? parseShortenedEvents($events)
      : this.events;
    return this.#toggleEventAbility('addEventListener', $events)
  }
  disableEvents($events) {
    $events = (
      typeof $events === 'object'
    ) ? parseShortenedEvents($events)
      : this.events;
    return this.#toggleEventAbility('removeEventListener', $events)
  }
  #toggleEventAbility($eventListenerMethod, $events) {
    const enability = (
      $eventListenerMethod === 'addEventListener'
    ) ? true
      : (
      $eventListenerMethod === 'removeEventListener'
    ) ? false
      : undefined;
    if(enability === undefined) return this
    $events = $events || this.events;
    for(const $event of $events) {
      $event.enable = enability;
    }
    return this
  }
}

const Settings$3 = {};
const Options$3 = {
  validSettings: [],
  enableEvents: true,
};
class Core extends DynamicEventSystem {
  settings
  options
  constructor($settings = Settings$3, $options = Options$3) {
    super($settings.events, $options.enable);
    this.options = Object.assign({}, Options$3, $options);
    this.settings = Object.assign({}, Settings$3, $settings);
    for(const $validSetting of this.options.validSettings) {
      Object.defineProperty(
        this, $validSetting, { value: this.settings[$validSetting] },
      );
    }
  }
}

class Model extends Core {
  #_content
	constructor($settings = {}, $options = {}) {
		super($settings, $options);
    if(this.options.enableEvents === true) this.enableEvents();
	}
  get content() {
    if(this.#_content !== undefined) return this.#_content
    this.#_content = new DynamicEventTarget$1(this.settings.content, this.options.content);
    return this.#_content
  }
  parse() { return this.content.parse() }
}

const Settings$2 = {
  templates: { default: () => `` },
  querySelectors: {},
  events: {},
};
const Options$2 = {};
class View extends Core {
  #_parent
  #_element
  #_template
  #_querySelectors
  #_isRendered = false
  constructor($settings = {}, $options = {}) {
    super(
      Object.assign({}, Settings$2, $settings),
      Object.assign({}, Options$2, $options),
    );
  }
  get parent() { return this.settings.parent }
  get template() {
    if(this.#_template !== undefined) return this.#_template
    this.#_template = document.createElement('template');
    return this.#_template
  }
  get querySelectors() {
    if(this.#_querySelectors !== undefined) return this.#_querySelectors
    const $this = this;
    this.#_querySelectors = {};
    for(const [
      $querySelectorMethod, $querySelectors
    ] of Object.entries(this.settings.querySelectors)) {
      for(const [
        $querySelectorName, $querySelector
      ] of Object.entries($querySelectors)) {
        Object.defineProperty(this.#_querySelectors, $querySelectorName, {
          get() {
            return $this.parent[$querySelectorMethod]($querySelector)
          }
        });
      }
    }
    return this.#_querySelectors
  }
  autoinsert() {
    try {
      const { target, position } = this.settings.autoinsert;
      target.insertAdjacentElement(position, this.parent);
    } catch($err) {}
    return this
  }
  autoremove() {
    try {
      this.parent.parentElement.removeChild(this.parent);
    } catch($err) {}
    return this
  }
  render($model, $template = 'default') {
    this.disableEvents();
    this.template.innerHTML = this.settings.templates[$template]($model);
    this.parent.replaceChildren();
    this.parent.appendChild(this.template.content);
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
  constructor($settings = {}, $options = { enableEvents: false }) {
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

// Classes
// Class Aliases
const DET = DynamicEventTarget$1;
const DES = DynamicEventSystem;

export { Control, Core, DES, DET, DynamicEventSystem, DynamicEventTarget$1 as DynamicEventTarget, FetchRouter, Model, StaticRouter, View };
//# sourceMappingURL=mvc-framework.js.map
