export default {
  active: false,
  name: 'Test | Draft 6',
  path: '/test/draft/6',
  source: 'documents/test/draft/6',
  target: 'localhost/test/draft/6',
  middlewares: [
    ['static', ['static', {}]],
    ['static', ['localhost', {}]],
  ],
  methods: [
    ['get', function getIndex($request, $response, $next) {
      $response.send("HELLO ALL DOGS")
    }]
  ],
}