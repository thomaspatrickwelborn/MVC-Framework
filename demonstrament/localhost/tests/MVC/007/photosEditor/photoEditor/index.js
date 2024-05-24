import { Control } from '/mvc-framework/index.js'
export default class PhotoEditor extends Control {
  constructor($settings = {}, $options = {}) {
    super(Object.assign($settings, {
      views: {
        photoEditorView: {
          type: 'dynamic', 
          templates: {
            default: ($content) => `<photo-editor>
              <photo-editor-img>PHOTO-EDITOR-IMG</photo-editor-img>
              <photo-editor-alt>PHOTO-EDITOR-ALT</photo-editor-alt>
              <photo-editor-width>PHOTO-EDITOR-WIDTH</photo-editor-width>
              <photo-editor-height>PHOTO-EDITOR-HEIGHT</photo-editor-height>
            </photo-editor>`
          },
        },
        routers: { fetch: {
          // Photos Editor Router
          default: {
            scheme: 'http',
            domain: 'demonstrament.mvc-framework',
            port: 3000,
            routes: {
              '/services/photos': {
                name: 'photos',
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
      },
    }), Object.assign($options, {}))
  }
  start() {}
} 