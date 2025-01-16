import { Core } from '/dependencies/mvc-framework.js'
const PropertyClasses = {
  divisions: {
    Class: HTMLElement,
    ClassValidator: function($propertyClass, $property, $value) {},
    ClassInstantiator: function($propertyClass, $property, $value) {
      let division
      if($value instanceof $propertyClass.Class) { division = $value }
      else { division = document.createElement("div") }
      const [$attributes, $styles] = $value
      for(const [$attributeKey, $attributeValue] of Object.entries($attributes)) {
        division.setAttribute($attributeKey, $attributeValue)
      }
      for(const [$styleKey, $styleValue] of Object.entries($styles)) {
        division.style[$styleKey] = $styleValue
      }
      return division
    },
    ClassDeinstantiator: function($propertyClass, $property) {
      division.parentElement.removeChild(division)

    },
    Names: {
      Monople: { Formal: "Division", Nonformal: "division" },
      Multiple: { Formal: "Divisions", Nonformal: "divisions" },
    },
    Events: { Assign: "addEventListener", Deassign: "removeEventListener" },
  },
}
function htmlClick($event) {
  console.log("htmlClick", $event.type)
}
function htmlClickBubble($event) {
  console.log("htmlClickBubble", $event.type)
  this.dispatchEvent(new CustomEvent($event.type, { detail: $event }))
}

class CoreG extends Core {
  constructor($settings = {}, $options = {}) {
    super(Object.assign({
      propertyClasses: PropertyClasses
    }, $settings), Object.assign({
      enableEvents: true,
      defineProperties: {
        html: { value: document.querySelector('html') },
      }
    }, $options))
  }
  insertDivisions() {
    for(const $division of Object.values(this.divisions)) {
      this.html.querySelector('index').insertAdjacentElement('beforeend', $division)
    }
    return this
  }
}
const coreG = new CoreG({
  events: {
    // 'html click': htmlClick,
  }
})
coreG.addDivisions({
  divisionA: [{ "id": "divisionA" }, {
    "backgroundColor": "blue",
    "display": "flex",
    "flex-wrap": "nowrap",
    "height": "1em",
    "width": "100%",
  }],
  divisionB: [{ "id": "divisionB" }, {
    "backgroundColor": "red",
    "display": "flex",
    "flex-wrap": "nowrap",
    "height": "1em",
    "width": "100%",
  }],
})
coreG.insertDivisions()
coreG.addEvents({
  "divisions.divisionA click": function divisionAClick($event) { console.log($event.type, $event) },
  "divisions.divisionB click": function divisionBClick($event) { console.log($event.type, $event) },
})
coreG.enableEvents([{ "path": "divisions.divisionA" }, { "path": "divisions.divisionB" }])
coreG.divisions.divisionA.dispatchEvent(new CustomEvent("click", { detail: "divisionA:click" }))
coreG.divisions.divisionB.dispatchEvent(new CustomEvent("click", { detail: "divisionB:click" }))
coreG.disableEvents([{ "path": "divisions.divisionA" }, { "path": "divisions.divisionB" }])
coreG.divisions.divisionA.dispatchEvent(new CustomEvent("click", { detail: "divisionA:click" }))
coreG.divisions.divisionB.dispatchEvent(new CustomEvent("click", { detail: "divisionB:click" }))
const coreF = new Core({
  propertyClasses: PropertyClasses,
  events: { 'html click': htmlClick },
}, {
  enableEvents: true,
  defineProperties: {
    html: { value: document.querySelector('html') },
  },
})
coreF.addDivisions({
  divisionA: [{ "id": "divisionA" }, { "backgroundColor": "blue" }],
  divisionB: [{ "id": "divisionB" }, { "backgroundColor": "red" }],
})
const coreE = new Core({
  events: {
    'html click': htmlClickBubble,
    'click': htmlClick,
  }
}, {
  enableEvents: true,
  defineProperties: {
    html: { value: document.querySelector('html') },
  },
})

const coreD = new Core({
  events: {
    'html click': htmlClickBubble,
    'click': htmlClick,
  }
}, {
  defineProperties: {
    html: { value: document.querySelector('html') },
  },
}).enableEvents()

const coreC = new Core({
  events: {
    'html click': htmlClick,
  }
}, {
  defineProperties: {
    html: { value: document.querySelector('html') },
  },
}).enableEvents()

const coreB = new Core({
  events: {
    'html click': htmlClick,
  }
}, {
  defineProperties: {
    start: { value: function() {
      this.enableEvents()
    } },
    html: { value: document.querySelector('html') },
  },
}).start()

const coreA = new Core({}, {
  defineProperties: {
    start: {
      value: function() {
        this.addEvents({
          'html click': this.htmlClick,
        })
        this.enableEvents()
      }
    },
    htmlClick: { value: htmlClick },
    html: { value: document.querySelector('html') },
  },
}).start()
