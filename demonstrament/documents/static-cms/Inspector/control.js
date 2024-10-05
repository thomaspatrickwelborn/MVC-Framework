import { IPHostValidator } from '../Coutil/Validators/index.js'
import Template from './template.js'
// Static CMS | Inspector
export default ($viewParent) => [{
  // Models
  models: {
    // Device Model
    device: [{
      schema: {
        legend: { type: String },
        resource: { type: {
          textContent: { type: String },
          href: { type: String },
        } },
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
        resource: {
          textContent: 'Node Inspector | Open',
          href: 'https://nodejs.org/api/inspector.html#inspectoropenport-host-wait'
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
    }],
    // Database Model
    database: {
      schema: {
        port: { type: Number },
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
        },
      }
    },
  },
  events: {
    'models.database.content valid:err': function ($event) {
      console.log($event.type, $event.detail)
    },
    'views.default.querySelectors.inputPort change': function ($event) {
      $event.preventDefault()
      const { value } = $event.currentTarget
      // this.models.database.content.port = Number(value)
    },
    'views.default.querySelectors.inputHost change': function ($event) {
      $event.preventDefault()
      const { value } = $event.currentTarget
      this.models.database.content.host = String(value)
    },
  },
  start() {
    this.views.default.render({
      device: this.models.device.parse(),
      database: this.models.database.parse(),
    }, 'default')
    this.enableEvents()
    return this
  }
}, { validSettings: ['start'] }]