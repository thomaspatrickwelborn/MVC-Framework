import { FetchRouter } from '/dependencies/mvc-framework.js'
export default class PhotosRouter extends FetchRouter {
  constructor($settings = {}, $options = {}) {
    super(Object.assign({
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
    }, $settings), $options)
    console.log(this)
  }
}
