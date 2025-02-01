import Core from '../../Core/index.js'
import MessageAdapter from './MessageAdapter/index.js'
export default class SocketRouter extends Core {
  #webSocket
  #active = false
  #messageAdapters
  #url
  #boundOpen
  #boundClose
  #boundError
  #boundMessage
  constructor($settings, $options) {
    super(...arguments)
    // this.#boundOpen = this.#open.bind(this)
    // this.#boundClose = this.#close.bind(this)
    // this.#boundError = this.#error.bind(this)
    this.#boundMessage = this.#message.bind(this)
    this.active = this.settings.active
  }
  get active() { return this.#active }
  set active($active) {
    if(this.#active === $active) { return }
    if($active === true) {
      this.webSocket
    }
    else if($active === false) {
      this.#webSocket = undefined
    }
    this.#active = $active
  }
  get path() { return this.settings.path }
  get url() {
    if(this.#url !== undefined) { return this.#url }
    console.log(this.settings)
    let { protocol, host, port } = this.settings
    let base
    if(protocol && host && port) {
        base = [protocol, '//', host, ':', port].join('')
      }
    else {
      base = window.location.url.origin
    }
    this.#url = new URL(this.path, base)
    console.log(this.#url)
    return this.#url
  }
  get webSocket() {
    if(this.#webSocket !== undefined) return this.#webSocket
    this.#webSocket = new WebSocket(this.url)
    // this.#webSocket.addEventListener('open', this.#boundOpen)
    // this.#webSocket.addEventListener('close', this.#boundClose)
    // this.#webSocket.addEventListener('error', this.#boundError)
    this.#webSocket.addEventListener('message', this.#boundMessage)
    return this.#webSocket
  }
  // #open($event) { /*this.dispatchEvent($event)*/ }
  // #close($event) { /*this.dispatchEvent($event)*/ }
  // #error($event) { /*this.dispatchEvent($event)*/ }
  #message($data, $isBinary) {
    iterateAdapters: 
    for(const [
      $messageAdapterName, $messageAdapter
    ] of this.messageAdapters) {
      try {
        const message = $messageAdapter.message($data, $isBinary)
        console.log(message.constructor.name)
        const { type, detail } = message(this.webSocket, $data, $isBinary)
        const messageEvent = new CustomEvent(type, { detail })
        this.dispatchEvent(messageEvent)
      }
      catch($err) { /* console.log($err) */ }
    }
  }
  get messageAdapters() {
    if(this.#messageAdapters !== undefined) { return this.#messageAdapters }
    const messageAdapters = []
    for(const [$adapterName, $adapter] of this.settings.messageAdapters) {
      const adapter = new MessageAdapter($adapter, this)
      messageAdapters.push([$adapterName, adapter])
    }
    this.#messageAdapters = messageAdapters
    return this.#messageAdapters
  }
}