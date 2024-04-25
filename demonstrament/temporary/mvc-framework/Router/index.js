import { Core } from '/mvc-framework/index.js'
const Settings = {
	routes: {},
}
const Options = {
	enable: false,
}
export default class StaticRouter extends Core {
	constructor($settings = Settings, $options = Options) {
		super(...arguments)
		this.routes = $settings.routes
		this.navigate(window.location.hash)
		if($options.enable === true) this.enable()
	}
	#_route
	get route() { return this.#_route }
	set route($route) {
		this.#_route = $route
		console.log(this.#_route)
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
	navigate($hash) {
		window.dispatchEvent(new HashChangeEvent('hashchange', {
			oldURL: null,
			newURL: $hash
		}))
	}
	enable() {
		window.addEventListener('hashchange', this.#hashChange.bind(this))
	}
	disable() {
		window.removeEventListener('hashchange', this.#hashChange.bind(this))
	}
}