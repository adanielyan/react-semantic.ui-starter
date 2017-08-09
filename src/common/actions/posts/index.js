import { getTemplates, getTemplate, resultOK } from 'api'

// Define action types
export const GET_POSTS_SUCCESS = 'GET_POSTS_SUCCESS'
export const GET_POSTS_FAIL = 'GET_POSTS_FAIL'
export const GET_POSTS_PENDING = 'GET_POSTS_PENDING'

export const GET_POST_SUCCESS = 'GET_POST_SUCCESS'
export const GET_POST_FAIL = 'GET_POST_FAIL'
export const GET_POST_PENDING = 'GET_POST_PENDING'

export const GET_POSTS = async (payload) => {
	const result = await getTemplates(payload)
	if (!result) {
		return {type: GET_POSTS_FAIL, errors: 'No templates found'}
	}
	return {type: GET_POSTS_SUCCESS, result}
}

export const GET_POST = async (payload) => {
	const result = await getTemplate(payload)
	if (!resultOK(result)) {
		return {type: GET_POST_FAIL, errors: 'Template not found'}
	}
	return {type: GET_POST_SUCCESS, result}
}
