export default class SocketEvent extends CustomEvent {
  #settings
  #socket
  constructor($type, $settings, $socket) {
    super($type, $settings)
    this.#settings = $settings
    this.#socket = $socket
  }
  get message() { return this.#settings.message }
  get detail() { return this.#settings.detail }
}