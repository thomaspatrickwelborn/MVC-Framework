import { IPHostValidator } from '../Coutil/Validators/index.js'
import Template from './template.js'
// Static CMS | Inspector
export default ($viewParent) => [{
  // Models
  models: {
    // Device Model
    device: [
      {
        schema: {
          legend: { type: String },
          resources: { type: {
            name: { type: String },
            active: { type: Boolean },
            items: { type: [{ type: {
              textContent: { type: String },
              href: { type: String },
            }
            }]
            } }
          },
          port: { type: {
            label: { type: String },
            detail: { type: String },
          } },
          host: { type: {
            label: { type: String },
            detail: { type: String },
          } },
        },
        content: {
          legend: 'Node Inspector',
          resources: {
            name: "Resources",
            active: false,
            items: [{
              textContent: 'Node Inspector Documentation',
              href: 'https://nodejs.org/api/inspector.html#inspectoropenport-host-wait'
            }]
          },
          port: {
            label: 'Port',
            detail: 'Example: 9000',
          },
          host: {
            label: 'Host',
            detail: 'Example: 127.0.0.1',
          },
        }
      }, {
        assign: {
          toggleResourcesActive: function() {
            this.content.set("resources.active", !this.content.get("resources.active"))
          }
        }
      }
    ],
    // Database Model
    database: {
      schema: {
        port: {
          type: Number,
          min: 0,
          max: 65535,
        },
        host: {
          type: String,
          validators: [new IPHostValidator()],
        },
      },
      content: {},
    },
  },
  // Views
  views: {
    // Default View
    default: {
      parent: $viewParent,
      templates: { default: Template },
      querySelectors: {
        querySelector: {
          inputPort: '[data-id="inspector"] [data-id="port"] > input',
          inputHost: '[data-id="inspector"] [data-id="host"] > input',
          resources: 'fieldset > resources',
          resourcesButton: 'fieldset > resources > header > button',
          resourcesMain: 'fieldset > resources > main',
          resourceAnchor: 'fieldset > resources > main > resource > a',
        }
      }
    },
  },
  events: {
    'models.database.content nonvalidProperty:host': function ($event) {
      console.log($event.type, $event.detail)
    },
    'models.device.content.resources setProperty:active': function ($event) {
      const { resources } = this.views.default.qs 
      resources.setAttribute('data-active', $event.detail.value)
    },
    "views.default.qs.resourceAnchor click": function ($event) {
      this.models.device.content.set("resources.active", false)
    },
    "views.default.qs.resourcesButton click": function ($event) {
      this.models.device.toggleResourcesActive()
    },
    'views.default.qs.inputPort change': function ($event) {
      $event.preventDefault()
      const { content } = this.models.database
      const { value } = $event.currentTarget
      content.set('port', Number(value))
    },
    'views.default.qs.inputHost change': function ($event) {
      $event.preventDefault()
      const { content } = this.models.database
      const { value } = $event.currentTarget
      content.set('host', String(value))
    },
  },
}, { defineProperties: {
  start: { value: function () {
    this.views.default.render({
      device: this.models.device.content,
      database: this.models.database.content,
    }, 'default')
    this.enableEvents()
    return this
  } }
} }]