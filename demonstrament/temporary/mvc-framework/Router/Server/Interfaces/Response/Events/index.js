const Events = {
  // Fetch Response Interface Events
  // OK
  'ok': ($response) => new CustomEvent(
    'ok', {
      detail: $response,
    }
  ),
  // Status
  'status': ($response) => new CustomEvent(
    `status`, {
      detail: $response,
    }
  ),
  // Status Code
  'statusCode': ($response) => new CustomEvent(
    `status:${$response.status}`, {
      detail: $response,
    }
  ),
  // Status Text
  'statusText': ($response) => new CustomEvent(
    `statusText`, {
      detail: $response,
    }
  ),
  // Status Text Message
  'statusTextMessage': ($response) => new CustomEvent(
    `statusText:${$response.statusText}`, {
      detail: $response,
    }
  ),
  // Abort
  'abort': ($abortController) => new CustomEvent(
    'abort', {
      detail: $abortController,
    }
  )
}

export default Events