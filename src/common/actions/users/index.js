import {resultOK, getUsers, getUser} from 'api'

// Define action types
export const GET_USERS_SUCCESS = 'GET_USERS_SUCCESS'
export const GET_USERS_FAIL = 'GET_USERS_FAIL'
export const GET_USERS_PENDING = 'GET_USERS_PENDING'

export const GET_USER_SUCCESS = 'GET_USER_SUCCESS'
export const GET_USER_FAIL = 'GET_USER_FAIL'
export const GET_USER_PENDING = 'GET_USER_PENDING'

export const GET_USERS = async () => {
	const result = await getUsers()
	if (!result) {
		return {type: GET_USERS_FAIL, errors: 'No users found'}
	}
	return {type: GET_USERS_SUCCESS, result}
}

export const GET_USER = async id => {
	const result = await getUser(id)
	if (!result) {
		return {type: GET_USER_FAIL, errors: 'User not found'}
	}
	return {type: GET_USER_SUCCESS, result}
}
