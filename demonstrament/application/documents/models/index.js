import path from 'node:path'
import { readFile } from 'node:fs/promises'

async function Model($settings = {}) {
	const { viewPath } = $settings
	const modelPath = path.join(
		process.env.PWD,
		`${viewPath}/index.json`
	)
	const model = await readFile(modelPath).then(
		($data) => JSON.parse($data.toString())
	)
	return model
}

export { Model }