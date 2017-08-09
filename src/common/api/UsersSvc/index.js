import { usersService } from 'api/utils'

export async function getUsers (payload) {
	try {
		return await usersService.find(payload)
	} catch (err) {
		return []
	}
}

export async function getUser (payload) {
	try {
		return await usersService.get(payload)
	} catch (err) {
		return {}
	}
}

export async function createUser (payload) {
	try {
		return await usersService.create(payload)
	} catch (err) {
		return {}
	}
}
