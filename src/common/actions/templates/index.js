import { getTemplates, getTemplate, resultOK } from 'api'

// Define action types
export const GET_TEMPLATES_SUCCESS = 'GET_TEMPLATES_SUCCESS'
export const GET_TEMPLATES_FAIL = 'GET_TEMPLATES_FAIL'
export const GET_TEMPLATES_PENDING = 'GET_TEMPLATES_PENDING'

export const GET_TEMPLATE_SUCCESS = 'GET_TEMPLATE_SUCCESS'
export const GET_TEMPLATE_FAIL = 'GET_TEMPLATE_FAIL'
export const GET_TEMPLATE_PENDING = 'GET_TEMPLATE_PENDING'

export const GET_TEMPLATES = async (payload) => {
	const result = await getTemplates(payload)
	if (!result) {
		return {type: GET_TEMPLATES_FAIL, errors: 'No templates found'}
	}
	return {type: GET_TEMPLATES_SUCCESS, result}
}

export const GET_TEMPLATE = async (payload) => {
	const result = await getTemplate(payload)
	if (!resultOK(result)) {
		return {type: GET_TEMPLATE_FAIL, errors: 'Template not found'}
	}
	return {type: GET_TEMPLATE_SUCCESS, result}
}
