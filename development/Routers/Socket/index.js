import { recursiveAssignConcat } from '../../Coutil/index.js'
import SocketEvent from './Event/index.js'
import Core from '../../Core/index.js'
import MessageAdapter from './MessageAdapter/index.js'
import Settings from './Settings/index.js'
import Options from './Options/index.js'
export default class SocketRouter extends Core {
  #webSocket
  #active = false
  #messageAdapters
  #url
  #boundMessage
  constructor($settings = {}, $options = {}) {
    super(
      recursiveAssignConcat(Settings, $settings), 
      Object.assign(Options, $options),
    )
    this.#boundMessage = this.#message.bind(this)
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
  get webSocket() {
    if(this.#webSocket !== undefined) return this.#webSocket
    this.#webSocket = new WebSocket(this.url)
    this.#webSocket.addEventListener('message', this.#boundMessage)
    return this.#webSocket
  }
  #message($data, $isBinary) {
    iterateAdapters: 
    for(const [
      $messageAdapterName, $messageAdapter
    ] of this.messageAdapters) {
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
    for(const [$adapterName, $adapter] of this.settings.messageAdapters) {
      const adapter = new MessageAdapter($adapter, this)
      messageAdapters.push([$adapterName, adapter])
    }
    this.#messageAdapters = messageAdapters
    return this.#messageAdapters
  }
  send() { this.webSocket.send(...arguments) }
}