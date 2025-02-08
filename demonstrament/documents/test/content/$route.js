export default {
  active: true,
  name: 'Test | Content',
  path: '/test/content',
  source: 'documents/test/content',
  target: 'localhost/test/content',
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