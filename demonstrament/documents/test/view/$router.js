export default {
  active: true,
  name: 'Test | View',
  path: '/test/view',
  source: 'documents/test/view',
  target: 'localhost/test/view',
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