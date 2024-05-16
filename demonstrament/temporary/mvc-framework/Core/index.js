import { typeOf } from '../Utils/index.js'
import EventSystem from './DynamicEventTarget/index.js'
const Settings = {}
const Options = { eventTargetRoot: {} }

export default class Core extends EventSystem {
	constructor($settings = Settings, $options = Options) {
		super($options.eventTargetRoot)
		this.options = Object.assign(Options, $options)
		this.settings = Object.assign(Settings, $settings)
		this.events = $settings.events
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
	}
}