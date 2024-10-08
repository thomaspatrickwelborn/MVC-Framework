import DefaultTemplate from './template.js'
const BrowserSyncControl = [{
  models: {
    device: [{
      content: {
        legend: 'Browser Sync',
        port: {
          label: 'Port',
        },
        host: {
          label: 'Host',
        },
        https: {
          legend: 'HTTPS',
          key: {
            label: 'Key'
          },
          cert: {
            label: 'Key'
          },
        },
      },
    }],
    database: [{
      schema: {
        port: Number,
        host: String,
        https: {
          key: String,
          cert: String,
        },
        files: [String],
      },
      content: {},
    }],
  },
  views: {
    default: [{
      templates: {
        default: DefaultTemplate,
      },
    }, {}],
  },
}, {}]
export default BrowserSyncControl