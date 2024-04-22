import { Control, Model } from '/mvc-framework/index.js'
import Application from './application/index.js'

function DOMContentLoaded($event) {
	const application = new Application()
}

document.addEventListener('DOMContentLoaded', DOMContentLoaded)
