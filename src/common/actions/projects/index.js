import { getProjects, getProject } from 'api'

// Define action types
export const GET_PROJECTS_SUCCESS = 'GET_PROJECTS_SUCCESS'
export const GET_PROJECTS_FAIL = 'GET_PROJECTS_FAIL'
export const GET_PROJECTS_PENDING = 'GET_PROJECTS_PENDING'

export const GET_PROJECT_SUCCESS = 'GET_PROJECT_SUCCESS'
export const GET_PROJECT_FAIL = 'GET_PROJECT_FAIL'
export const GET_PROJECT_PENDING = 'GET_PROJECT_PENDING'

export const GET_PROJECTS = async (payload) => {
	const result = await getProjects(payload)
	if (!result) {
		return {type: GET_PROJECTS_FAIL, errors: 'No projects found'}
	}
	return {type: GET_PROJECTS_SUCCESS, result}
}

export const GET_PROJECT = async (payload) => {
	const result = await getProject(payload)
	if (!result) {
		return {type: GET_PROJECT_FAIL, errors: 'Project not found'}
	}
	return {type: GET_PROJECT_SUCCESS, result}
}
