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
            img: function photoImgTemplate($img) { return `<img src="${
              $img.src
            }" alt="${
              $img.alt
            }" width="${
              $img.width
            }" height="${
              $img.height
            }" />` },
            photoEditorImg: function photoEditorImgTemplate($photo) {
              return `<photo-editor-img>${
                this.templates.img($photo.img)
              }</photo-editor-img>`
            },
            photoEditorAlt: function photoEditorAltTemplate($photo) {
              return `<photo-editor-alt>${$photo.img.alt}</photo-editor-alt>`
            },
            photoEditorDimensions: function photoEditorDimensionsTemplate($photo) {
              return [
                `<photo-editor-width>${$photo.img.width}</photo-editor-width>`,
                `<photo-editor-height>${$photo.img.height}</photo-editor-height>`
              ].join('\n') 
            },
            photo: function photoTemplate($photo) {
              console.log($photo)
              return [
                this.templates.photoEditorImg($photo),
                this.templates.photoEditorAlt($photo),
                this.templates.photoEditorDimensions($photo),
              ].join('\n')
            },
            photoEditor: function photoEditorTemplate($photo) {
              return `<photo-editor>${
                this.templates.photo($photo)
              }</photo-editor>`
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
        // A. Default Fetch Router Events
        // A.1. Default Fetch Router Photo Route Get Status 200
        'routers.fetch.default.routes.photo get:status:200':
        async function defaultFetchRouterPhotoGetStatus200($event) {
          const photo = await $event.detail.response.json()
          this.models.default.content.assign({ photo })
        },
        // B. Default Model Events
        // B.1. Default Model Content Assign Source Property "ID"
        'models.default.content assignSourceProperty:_id': 
        function defaultModelAssignSourcePropertyID($event) {
          this.routers.fetch.default.routes.photo.get(`/services/photos/${$event.detail.val}`)
        },
        // B.1. Default Model Content Assign Source Property ID
        'models.default.content assignSourceProperty:photo': 
        function defaultModelAssignSourcePhoto($event) {
          this.views.default.renderElement({
            templateName: 'default', 
            content: $event.detail.val,
          })
        },
      },
    }), Object.assign($options, {}))
  }
  start() {
    return this
  }
} 