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
}

export default Events