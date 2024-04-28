export default class SchemaArray extends Array {
	constructor() {
		super()
		this.#validProps = arguments[0]
	}
	#_validProps = {}
	get #validProps() { return this.#_validProps }
	set #validProps($validProps) {
		this.addProps($validProps)
	}
	addProps() {
		const _validProps = this.#_validProps
		const validProps = arguments[0] || {}
		for(const [
			$validPropKey, $validProp
		] of Object.entries(validProps)) {
			_validProps[$validPropKey] = $validProp
		}
	}
	removeProps() {
		const _validProps = this.#_validProps
		const validProps = arguments[0] || this.#_validProps
		for(const $validPropKey of Object.keys(validProps)) {
			delete _validProps[$validPropKey]
		}
	}
}