const Events = {
  // Fetch Response Interface Events
  // OK
  'ok': ($response, $requestMethod) => {
    const eventType = `${$requestMethod}:ok`
    const event = new CustomEvent(eventType, {
      detail: {
        response: $response,
      },
    })
    return event
  },
  // Status
  'status': ($response, $requestMethod) => {
    const eventType = `${$requestMethod}:status`
    const event = new CustomEvent(eventType, {
      detail: {
        response: $response,
      },
    })
    return event
  },
  // Status Code
  'statusCode': ($response, $requestMethod) => {
    const eventType = `${$requestMethod}:status:${$response.status}`
    const event = new CustomEvent(eventType, {
      detail: {
        response: $response,
      },
    })
    return event
  },
  // Status Text
  'statusText': ($response, $requestMethod) => {
    const eventType = `${$requestMethod}:statusText`
    const event = new CustomEvent(eventType, {
      detail: {
        response: $response,
      },
    })
    return event
  },
  // Status Text Message
  'statusTextMessage': ($response, $requestMethod) => {
    const eventType = `${$requestMethod}:statusText:${$response.statusText}`
    const event = new CustomEvent(eventType, {
      detail: {
        response: $response,
      },
    })
    return event
  },
  // Abort
  'abort': ($abortController) => {
    const eventType = 'abort'
    const event = new CustomEvent(eventType, {
      detail: {
        abortController: $abortController,
      },
    })
    return event
  },
}

export default Events