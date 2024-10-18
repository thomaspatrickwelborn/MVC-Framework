import { typeOf, parseShortenedEvents } from '../../Coutil/index.js'
import Core from '../../Core/index.js'
const Settings = {
	routes: {},
}
const Options = {
	enable: true,
}
export default class LocationRouter extends Core {
	constructor($settings = Settings, $options = Options) {
		super(...arguments)
		this.routes = $settings.routes
		if($options.enable === true) this.enable()
	}
	#_route
	get route() { return this.#_route }
	set route($route) {
		this.#_route = $route
		this.dispatchEvent(new CustomEvent('routeChange', {
			detail: $route
		}))
	}
	#_routes = {}
	get routes() { return this.#_routes }
	set routes($routes) {
		const _routes = this.#_routes
		for(const [
			$routeName, $routeSettings
		] of Object.entries($routes)) {
			_routes[$routeName] = $routeSettings
		}
	}
	#_hashChange
	#hashChange($event) {
		const _routes = this.#_routes
		const { newURL, oldURL } = $event
		const newURLHash = newURL.split('#')[1]
		const oldURLHash = oldURL.split('#')[1]
		const routeData = _routes[newURLHash]
		if(routeData === undefined) return
		this.route = routeData
	}
	enable() {
		window.addEventListener('hashchange', this.#hashChange.bind(this))
	}
	disable() {
		window.removeEventListener('hashchange', this.#hashChange.bind(this))
	}
}