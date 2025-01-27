export default {
  active: true,
  name: 'Test | Schema',
  path: '/test/schema',
  source: 'documents/test/schema',
  target: 'localhost/test/schema',
  methods: [
    ['get', function getIndex($request, $response, $next) {
      $response.send("HELLO ALL DOGS")
    }]
  ],
}