import { typeOf } from '../../Utils/index.js'
import Schema from '../Schema/index.js'
import Content from '../Content/index.js'
export default function Validate($settings = {}) {
	const {
		schemaKey, schemaVal,
		contentKey, contentVal,
	} = $settings
	const typeOfSchemaVal = (
		schemaVal instanceof Schema
	) ? 'object'
	  : (
	  	schemaVal === undefined
  	) ? 'undefined'
  	  : typeOf(schemaVal())
	const typeOfContentVal = (
		contentVal instanceof Content
	) ? 'object'
	  : (
	  	contentVal === undefined
  	) ? 'undefined'
	    : typeOf(contentVal)
	return {
		type: {
			schemaVal: typeOfSchemaVal,
			contentVal: typeOfContentVal,
			valid: (typeOfSchemaVal === typeOfContentVal),
		},
	}
}
