import { FetchRouter } from '/mvc-framework/index.js'
export default class PhotosRouter extends FetchRouter {
  constructor($settings = {}, $options = {}) {
    super(Object.assign($settings, {
      scheme: 'http',
      domain: 'demonstrament.mvc-framework',
      port: 3000,
      routes: {
        '/services/photos': {
          name: 'photos',
          methods: {
            get: {
              method: 'get',
            }
          }
        }
      },
    }), $options)
  }
}
