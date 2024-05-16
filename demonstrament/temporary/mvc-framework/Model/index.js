import { typeOf } from '../Utils/index.js'
import Core from '../Core/index.js'

export default class Model extends Core {
	constructor($settings = {
		schema: {},
		content: {},
	}, $options = {
		enable: true,
		freeze: false,
	}) {
		super(...arguments)
		this.events = $settings.events
		if($options.enable === true) this.enableEvents(this.events)
		if($options.freeze === true) Object.freeze(this)
	}
}