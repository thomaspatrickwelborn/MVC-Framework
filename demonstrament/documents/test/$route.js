export default {
  active: false,
  name: 'Test',
  path: '/test',
  source: 'documents/test',
  target: 'localhost/test',
  methods: [
    ['get', function getIndex($request, $response, $next) {
      $response.send("HELLO ALL DOGS")
    }]
  ],
}