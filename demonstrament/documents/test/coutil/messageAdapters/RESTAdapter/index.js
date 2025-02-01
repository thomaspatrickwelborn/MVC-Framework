import stringifyBuffer from '../../stringifyBuffer/index.js'
import { MessageAdapter } from '/dependencies/mvc-framework.js'
export default class RESTAdapter extends MessageAdapter {
  constructor($settings = {}, $options = {}) {
    super(Object.assign({
      name: 'RESTAdapter',
      message: function message($data, $isBinary) {
        try {
          const [$type, $detail] = [].concat(stringifyBuffer($data))
          return { type: 'get', detail: $detail }
        }
        catch($err) { console.log($err) }
      },
      messages: ['get', 'post', 'delete'],
    }, $settings), Object.assign({}, $options))
  }
}