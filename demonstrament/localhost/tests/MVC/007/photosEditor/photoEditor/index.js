import { typeOf } from '/mvc-framework/Utils/index.js'
import { Control } from '/mvc-framework/index.js'
export default class PhotoEditor extends Control {
  constructor($settings = {}, $options = {}) {
    super(Object.assign({
      models: {
        uploadForm: {
          content: {
            files: [],
          },
        },
        default: {
          content: {
            _id: '',
            photo: {},
          },
        },
      },
      views: {
        uploadFormImage: {
          type: 'dynamic',
          templates: {
            default: function defaultTemplate($content) {
              return `<img src="${
                URL.createObjectURL($content)
              }" alt="${
                $content.name
              }" />`
            },
          },
          selectors: { img: 'img' },
          events: {
            'img load': function imgLoad($event) {
              console.log($event.type, $event)
            },
          },
        },
        uploadForm: {
          type: 'dynamic',
          templates: {
            formInput: function formInputTemplate($content) {
              return `<input type="file" accept=".jpg, .jpeg, .png"/>`
            },
            form: function formTemplate($content) {
              return `<form enctype="multipart/form-data">${
                this.templates.formInput($content)
              }</form>`
            },
            photoForm: function photoFormTemplate($content) {
              return `<photo-form>${
                this.templates.form($content)
              }</photo-form>`
            },
            default: function defaultTemplate($content) {
              return [                
                this.templates.photoForm($content)
              ].join('\n')
            },
          },
          selectors: {
            photoForm: 'photo-form',
            form: 'photo-form > form',
            formInput: 'photo-form > form > input',
          },
        },
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
              return 
            },
            photoEditor: function photoEditorTemplate($photo) {
              return `<photo-editor>${[
                this.templates.photoEditorImg($photo),
                this.templates.photoEditorAlt($photo),
                this.templates.photoEditorDimensions($photo),
              ].join('\n')}</photo-editor>`
            },
            default: function defaultTemplate($content) {
              return [
                this.templates.photoEditor($content),
              ].join('\n')
            },
          },
          selectors: {
            img: 'img',
            photoEditor: 'photo-editor',
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
          this.views.uploadForm.renderElement({
            templateName: 'default',
            content: $event.detail.val,
          })
          this.views.default.selectors.photoEditor.prepend(
            ...this.views.uploadForm.element.content.children
          )
          this.enableEvents(
            this.getEvents({
              type: 'change',
              target: 'views.uploadForm.selectors.formInput',
            })
          )
        },
        // B.2. Upload Form Model Files Push Element
        'models.uploadForm.content.files pushProp': 
        function uploadFormModelPhotosPushProp($event) {
          console.log($event.detail.element)
          this.views.uploadFormImage.renderElement({
            templateName: 'default',
            content: $event.detail.element,
          })
          this.views.default.selectors.img.replaceWith(
            this.views.uploadFormImage.element.content.children[0]
          )
        },
        // C. Upload Form View Events
        // C.1. 
        'views.uploadForm.selectors.formInput change': 
        function uploadFormViewSelectorFormInputChange($event) {
          for(const $file of $event.target.files) {
            // console.log()
            this.models.uploadForm.content.files.push($file)
            // {
            //   src: File.createObjectURL($file),
            //   alt: $file.name,
            // }
          }
        },
      },
    }, $settings), Object.assign({}, $options))
  }
  start() {
    return this
  }
} 