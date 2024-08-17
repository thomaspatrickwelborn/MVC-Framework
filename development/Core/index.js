import { typeOf } from '../Coutil/index.js'
import DynamicEventSystem from './DynamicEventSystem/index.js'
const Settings = {}
const Options = {}

export default class Core extends DynamicEventSystem {
	constructor($settings = Settings, $options = Options) {
		super($settings.events, $options.enable)
		this.options = Object.assign({}, Options, $options)
		this.settings = Object.assign({}, Settings, $settings)
	}
	#_settings = {}
	get settings() { return this.#_settings }
	set settings($settings) {
		const _settings = this.#_settings
		for(const [
			$settingKey, $settingVal
		] of Object.entries($settings)) {
			_settings[$settingKey] = $settingVal
		}
		Object.freeze(_settings)
	}
	#_options = {}
	get options() { return this.#_options }
	set options($options) {
		const _options = this.#_options
		for(const [
			$optionKey, $optionVal
		] of Object.entries($options)) {
			_options[$optionKey] = $optionVal
		}
		Object.freeze(_options)
	}
}