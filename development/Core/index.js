import { typeOf } from '../Coutil/index.js'
import DynamicEventSystem from './DynamicEventSystem/index.js'
const Settings = {}
const Options = {
  validSettings: [],
  enableEvents: true,
}
export default class Core extends DynamicEventSystem {
  settings
  options
  constructor($settings = Settings, $options = Options) {
    super($settings.events, $options.enable)
    this.options = Object.assign({}, Options, $options)
    this.settings = Object.assign({}, Settings, $settings)
    for(const $validSetting of this.options.validSettings) {
      Object.defineProperty(
        this, $validSetting, { value: this.settings[$validSetting] },
      )
    }
  }
}