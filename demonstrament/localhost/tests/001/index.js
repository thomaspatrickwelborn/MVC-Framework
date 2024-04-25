import Application from './application/index.js'

function DOMContentLoaded($event) {
	const application = new Application()
}

document.addEventListener('DOMContentLoaded', DOMContentLoaded)
