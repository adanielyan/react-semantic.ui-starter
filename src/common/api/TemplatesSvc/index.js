import { templatesService } from 'api/utils'

export async function getTemplates (payload) {
	try {
		return templatesService.find(payload)
	} catch (err) {
		return []
	}
}

export async function getTemplate (payload) {
	try {
		return templatesService.get(payload)
	} catch (err) {
		return {}
	}
}
