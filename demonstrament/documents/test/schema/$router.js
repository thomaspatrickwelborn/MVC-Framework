export default {
  active: false,
  name: 'Test | Schema',
  path: '/test/schema',
  source: 'documents/test/schema',
  target: 'localhost/test/schema',
  middlewares: [
    // $path, $options
    // ['static', ['static', {}]],
    // ['static', ['localhost', {}]],
  ],
  methods: [
    // ['get', function getIndex($request, $response, $next) {
    //   console.log($request)
    //   $response.send("HELLO ALL DOGS")
    // }]
  ],
}