import { projectsService } from 'api/utils'

export async function getProjects (payload) {
	try {
		return projectsService.find(payload)
	} catch (err) {
		return []
	}
}

export async function getProject (payload) {
	try {
		return projectsService.get(payload)
	} catch (err) {
		return {}
	}
}
