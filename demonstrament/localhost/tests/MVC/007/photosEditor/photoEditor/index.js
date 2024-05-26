import { Control } from '/mvc-framework/index.js'
export default class PhotoEditor extends Control {
  constructor($settings = {}, $options = {}) {
    super(Object.assign($settings, {
      models: {
        default: {
          content: {
            _id: '',
            photo: {},
          },
        },
      },
      views: {
        default: {
          type: 'dynamic', 
          templates: {
            photo: function photoTemplate($content) {
              return `<photo-editor-img>PHOTO-EDITOR-IMG</photo-editor-img>
              <photo-editor-alt>PHOTO-EDITOR-ALT</photo-editor-alt>
              <photo-editor-width>PHOTO-EDITOR-WIDTH</photo-editor-width>
              <photo-editor-height>PHOTO-EDITOR-HEIGHT</photo-editor-height>`
            },
            photoEditor: function photoEditorTemplate($content) {
              return `<photo-editor></photo-editor>`
            },
            default: function defaultTemplate($content) {
              return this.templates.photoEditor($content)
            },
          },
        }
      },
      routers: { fetch: {
        // Photos Editor Router
        default: {
          scheme: 'http',
          domain: 'demonstrament.mvc-framework',
          port: 3000,
          routes: {
            '/services/photos/:_id': {
              name: 'photo',
              methods: {
                // Photos GET Method
                get: {
                  method: 'get',
                },
                // Photos POST Method
                post: {
                  method: 'post',
                  headers: {
                    "Content-Type": "application/json",
                  },
                },
              },
            }
          },
        }
      }},
      events: {
        'routers.fetch.default.routes.photo get:status:200':
        function defaultFetchRouterPhotoGetStatus200($event) {
          console.log($event)
        },
        'models.default.content assignSourceProperty:_id': 
        function defaultModelAssignSourcePropertyID($event) {
          console.log($event)
          this.routers.fetch.default.routes.photo.get(`/services/photos/${$event.detail.val}`)
        }
      },
    }), Object.assign($options, {}))
  }
  start() {
    return this
  }
} 