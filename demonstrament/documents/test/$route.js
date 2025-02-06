export default {
  active: false,
  name: 'Test',
  path: '/test',
  source: 'documents/test',
  target: 'localhost/test',
  middlewares: [
    // $path, $options
    ['static', ['static', {}]],
    ['static', ['localhost', {}]],
  ],
  methods: [
    ['get', function getIndex($request, $response, $next) {
      $response.send("HELLO ALL DOGS")
    }]
  ],
}