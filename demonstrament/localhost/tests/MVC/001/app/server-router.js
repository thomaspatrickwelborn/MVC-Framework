const settings = {
  scheme: 'http',
  domain: 'demonstrament.mvc-framework',
  port: 3000,
  routes: {
    '/services/topics': {
      name: 'topics',
      methods: {
        get: {
          method: 'get',
        }
      }
    }
  }
}
const options = {}
export default [settings, options]