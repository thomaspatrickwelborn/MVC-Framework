const settings = {
  scheme: 'http',
  domain: 'demonstrament.mvc-framework',
  port: 3000,
  routes: {
    'topics': {
      path: '/services/topics',
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