import * as Schemata from '../schemata/index.js'

function Control($options) {
  const { routePath, routeActions, databaseConnection } = $options
  const TopicModel = databaseConnection.model('Topic', Schemata.Topic)
  const ControlMethods = {
    '/services/photos': {
      get: function getPhotos($request, $response, $next) {
        const topicCollection = TopicModel
        .find()
        .then($topicCollection => $topicCollection.map(
          $topicDocument => $topicDocument.toJSON()
        ))
        .then($topicCollection => $response.send($topicCollection))
      }
    },
    '/services/topics': {
      get: function getTopics($request, $response, $next) {
        const topicCollection = TopicModel
        .find()
        .then($topicCollection => $topicCollection.map(
          $topicDocument => $topicDocument.toJSON()
        ))
        .then($topicCollection => $response.send($topicCollection))
      }
    },
  }
  const control = {}
  for(const $routeAction of routeActions) {
    control[$routeAction] = ControlMethods[routePath][$routeAction]
  }
  return control
}

export { Control }