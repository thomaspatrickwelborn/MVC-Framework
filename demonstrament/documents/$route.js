export default {
  active: true,
  name: 'Index',
  path: '/',
  source: 'documents',
  target: 'localhost',
  methods: [
    ['get', function getIndex($request, $response, $next) {
      $response.send("HELLO ALL DOGS")
    }]
  ],
}