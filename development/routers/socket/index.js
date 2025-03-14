import SocketEvent from './event/index.js'
import Core from '../../core/index.js'
import MessageAdapter from './messageAdapter/index.js'
import Settings from './settings/index.js'
import Options from './options/index.js'
export default class SocketRouter extends Core {
  #webSocket
  #active = false
  #messageAdapters
  #url
  #boundMessage
  constructor($settings = {}, $options = {}) {
    super(Settings($settings), Options($options))
    this.#boundMessage = this.#message.bind(this)
    Object.defineProperties(this, {
      webSocket: {
        enumerable: true,
        get() {
          if(this.#webSocket !== undefined) return this.#webSocket
          this.#webSocket = new WebSocket(this.url)
          this.#webSocket.addEventListener('message', this.#boundMessage)
          return this.#webSocket
        },
      }
    })
    this.active = this.settings.active
    if(this.options.enableEvents === true) { this.enableEvents() }
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
    let { protocol, host, port } = this.settings
    let base
    if(protocol && host && port) {
        base = [protocol, '//', host, ':', port].join('')
      }
    else {
      base = window.location.url.origin
    }
    this.#url = new URL(this.path, base)
    return this.#url
  }
  #message($data, $isBinary) {
    iterateAdapters: 
    for(const $messageAdapter of this.messageAdapters) {
      try {
        const message = $messageAdapter.message($data, $isBinary)
        const { type, detail } = message
        const messageEvent = new SocketEvent(type, {
          detail, message: $data, isBinary: $isBinary
        }, this)
        this.webSocket.dispatchEvent(messageEvent)
      }
      catch($err) {  console.error($err)  }
    }
  }
  get messageAdapters() {
    if(this.#messageAdapters !== undefined) { return this.#messageAdapters }
    const messageAdapters = []
    for(const $adapter of this.settings.messageAdapters) {
      let adapter
      if($adapter instanceof MessageAdapter) { adapter = adapter }
      else { adapter = new MessageAdapter($adapter, this) }
      messageAdapters.push(adapter)
    }
    this.#messageAdapters = messageAdapters
    return this.#messageAdapters
  }
  send() { this.webSocket.send(...arguments) }
}