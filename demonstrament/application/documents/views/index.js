import path from 'node:path'
import beautify from 'js-beautify'
import ejs from 'ejs'

async function View($settings = {}) {
	const { viewModel } = $settings
	const viewTemplatePath = path.join(
		process.env.PWD,
		'application/documents/templates/html5/index.ejs'
	)
	const pageView = await ejs.renderFile(
		viewTemplatePath, 
		viewModel, {
			localsName: '$data',
			async: true,
		}
	)
	// Page View Beautify
	const viewBeautify = beautify.html(pageView, {
		indent_size: 2,
		indent_char: " ",
		max_preserve_newlines: 0,
		brace_style: 'collapse',
	})
	return viewBeautify
}

export { View }